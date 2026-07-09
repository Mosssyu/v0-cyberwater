"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { geoMercator, type GeoProjection } from "d3-geo"
import { MapPin } from "lucide-react"
import { cases, caseCoords, categoryColor, mapMarkers, type CaseCategory } from "@/lib/cases"

// 仅地图定位点位的颜色（区别于可进入详情的重点案例）
const SIMPLE_MARKER_COLOR = "oklch(0.72 0.06 220)"

// 从「省·城市」格式的地址中提取常驻地图标识（优先取城市名，去掉省级前缀）
function shortLabel(location: string) {
  const parts = location.split("·")
  return parts[parts.length - 1] || location
}

const WIDTH = 800
const HEIGHT = 640

type Position = [number, number]

interface Geometry {
  type: "Polygon" | "MultiPolygon"
  coordinates: Position[][] | Position[][][]
}

interface GeoFeatureCollection {
  type: "FeatureCollection"
  features: Array<{
    type: "Feature"
    properties: { name?: string; adchar?: string }
    geometry: Geometry
  }>
}

// 手动把多边形环投影成 SVG 路径（绕过 d3 geoPath 的球面裁剪，
// 该数据集环绕方向不规范会导致 geoPath 填满整个画布）
function featureToPath(geometry: Geometry, projection: GeoProjection, minLat?: number): string {
  const polygons =
    geometry.type === "Polygon"
      ? [geometry.coordinates as Position[][]]
      : (geometry.coordinates as Position[][][])

  let d = ""
  for (const polygon of polygons) {
    for (const ring of polygon) {
      // 跳过整体位于 minLat 以南的环（南海小岛归入小图窗展示）
      if (minLat !== undefined && ring.every((c) => c[1] < minLat)) continue
      ring.forEach((coord, i) => {
        const p = projection(coord)
        if (!p) return
        d += `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`
      })
      d += "Z"
    }
  }
  return d
}

export function CasesMap({ activeCategory = "all" }: { activeCategory?: "all" | CaseCategory }) {
  const router = useRouter()
  const [geo, setGeo] = useState<GeoFeatureCollection | null>(null)
  const [active, setActive] = useState<string | null>(null)
  // 仅地图定位点位的悬停索引（这些点位无详情页，仅显示名称）
  const [hoverSimple, setHoverSimple] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch("/china.geo.json")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setGeo(data as GeoFeatureCollection)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  // 主图过滤九段线附图（adchar: "JD"，会撑大边界影响拟合），单独在小图窗中展示
  const mainland = useMemo<GeoFeatureCollection | null>(() => {
    if (!geo) return null
    return {
      type: "FeatureCollection",
      features: geo.features.filter((f) => f.properties?.adchar !== "JD"),
    }
  }, [geo])

  const southSea = useMemo(() => {
    return geo?.features.find((f) => f.properties?.adchar === "JD") ?? null
  }, [geo])

  // 投影：手动拟合画布（该数据多边形环绕方向不规范，d3 的 fitExtent 不可用，
  // 因此用单位投影遍历全部坐标求边界，再推导 scale/translate，保证全境完整显示）
  const projection = useMemo<GeoProjection>(() => {
    const fallback = geoMercator().center([104.5, 37.5]).scale(700).translate([WIDTH / 2, HEIGHT / 2])
    if (!mainland || mainland.features.length === 0) return fallback

    const unit = geoMercator().scale(1).translate([0, 0])
    let minX = Number.POSITIVE_INFINITY
    let minY = Number.POSITIVE_INFINITY
    let maxX = Number.NEGATIVE_INFINITY
    let maxY = Number.NEGATIVE_INFINITY
    for (const f of mainland.features) {
      const polygons =
        f.geometry.type === "Polygon"
          ? [f.geometry.coordinates as Position[][]]
          : (f.geometry.coordinates as Position[][][])
      for (const polygon of polygons) {
        for (const ring of polygon) {
          for (const coord of ring) {
            // 跳过纬度 < 18° 的南海小岛（归入小图窗），避免撑大主图边界
            if (coord[1] < 18) continue
            const p = unit(coord)
            if (!p) continue
            if (p[0] < minX) minX = p[0]
            if (p[1] < minY) minY = p[1]
            if (p[0] > maxX) maxX = p[0]
            if (p[1] > maxY) maxY = p[1]
          }
        }
      }
    }
    if (!Number.isFinite(minX)) return fallback

    const PAD = 20
    const scale = Math.min((WIDTH - PAD * 2) / (maxX - minX), (HEIGHT - PAD * 2) / (maxY - minY))
    const tx = (WIDTH - scale * (minX + maxX)) / 2
    const ty = (HEIGHT - scale * (minY + maxY)) / 2
    return geoMercator().scale(scale).translate([tx, ty])
  }, [mainland])

  // 南海诸岛小图窗投影（右下角，规范制图样式）
  const INSET = { w: 110, h: 150, x: WIDTH - 122, y: HEIGHT - 162 }
  const insetProjection = useMemo<GeoProjection | null>(() => {
    if (!southSea) return null
    const unit = geoMercator().scale(1).translate([0, 0])
    let minX = Number.POSITIVE_INFINITY
    let minY = Number.POSITIVE_INFINITY
    let maxX = Number.NEGATIVE_INFINITY
    let maxY = Number.NEGATIVE_INFINITY
    const polygons =
      southSea.geometry.type === "Polygon"
        ? [southSea.geometry.coordinates as Position[][]]
        : (southSea.geometry.coordinates as Position[][][])
    for (const polygon of polygons) {
      for (const ring of polygon) {
        for (const coord of ring) {
          const p = unit(coord)
          if (!p) continue
          if (p[0] < minX) minX = p[0]
          if (p[1] < minY) minY = p[1]
          if (p[0] > maxX) maxX = p[0]
          if (p[1] > maxY) maxY = p[1]
        }
      }
    }
    if (!Number.isFinite(minX)) return null
    const PAD = 8
    const scale = Math.min((INSET.w - PAD * 2) / (maxX - minX), (INSET.h - PAD * 2) / (maxY - minY))
    const tx = INSET.x + (INSET.w - scale * (minX + maxX)) / 2
    const ty = INSET.y + (INSET.h - scale * (minY + maxY)) / 2
    return geoMercator().scale(scale).translate([tx, ty])
  }, [southSea, INSET.w, INSET.h, INSET.x, INSET.y])

  // 把案例按坐标聚合到标记点
  const markers = useMemo(() => {
    return cases
      .map((c) => {
        const coord = caseCoords[c.slug]
        if (!coord) return null
        const point = projection(coord)
        if (!point) return null
        // 取整避免服务端/客户端浮点字符串化差异导致的水合不匹配
        return { ...c, x: Math.round(point[0] * 10) / 10, y: Math.round(point[1] * 10) / 10 }
      })
      .filter((m): m is NonNullable<typeof m> => m !== null)
  }, [projection])

  // 仅地图定位点位（无详情页），同样投影到地图坐标
  const simpleMarkers = useMemo(() => {
    return mapMarkers
      .map((m, i) => {
        const point = projection(m.coord)
        if (!point) return null
        return { ...m, index: i, x: Math.round(point[0] * 10) / 10, y: Math.round(point[1] * 10) / 10 }
      })
      .filter((m): m is NonNullable<typeof m> => m !== null)
  }, [projection])

  function isMatch(category: CaseCategory) {
    return activeCategory === "all" || activeCategory === category
  }

  const activeCase = markers.find((m) => m.slug === active) ?? null
  // 右侧列表与筛选联动
  const listMarkers = markers.filter((m) => isMatch(m.category))

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-border bg-card/60 p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* 地图 */}
        <div className="relative">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-auto w-full"
            role="img"
            aria-label="中国地图标记的项目区域分布示意图"
          >
            <defs>
              <radialGradient id="map-glow" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stopColor="oklch(0.5 0.16 230 / 0.18)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width={WIDTH} height={HEIGHT} fill="url(#map-glow)" />

            {/* 省界（悬停微亮，增强可交互感） */}
            {mainland?.features.map((f, i) => (
              <path
                key={i}
                d={featureToPath(f.geometry, projection, 18)}
                fill="oklch(0.28 0.04 235 / 0.55)"
                stroke="oklch(0.6 0.12 220 / 0.55)"
                strokeWidth={0.7}
                className="transition-[fill] duration-200 hover:fill-[oklch(0.34_0.06_230/0.65)]"
              >
                {f.properties?.name && <title>{f.properties.name}</title>}
              </path>
            ))}

            {/* 南海诸岛小图窗（规范制图样式） */}
            {insetProjection && southSea && (
              <g aria-label="南海诸岛">
                <rect
                  x={INSET.x}
                  y={INSET.y}
                  width={INSET.w}
                  height={INSET.h}
                  rx={6}
                  fill="oklch(0.2 0.03 245 / 0.5)"
                  stroke="oklch(0.6 0.12 220 / 0.45)"
                  strokeWidth={0.8}
                />
                <path
                  d={featureToPath(southSea.geometry, insetProjection)}
                  fill="none"
                  stroke="oklch(0.62 0.11 220 / 0.7)"
                  strokeWidth={0.7}
                />
                {/* 海南岛及南海诸岛 */}
                {(() => {
                  const hainan = geo?.features.find((f) => f.properties?.name === "海南省")
                  return hainan ? (
                    <path
                      d={featureToPath(hainan.geometry, insetProjection)}
                      fill="oklch(0.32 0.05 235 / 0.7)"
                      stroke="oklch(0.62 0.11 220 / 0.6)"
                      strokeWidth={0.5}
                    />
                  ) : null
                })()}
                <text
                  x={INSET.x + INSET.w / 2}
                  y={INSET.y + INSET.h - 8}
                  textAnchor="middle"
                  fill="oklch(0.62 0.05 235)"
                  style={{ fontSize: 10 }}
                >
                  南海诸岛
                </text>
              </g>
            )}

            {/* 仅地图定位点位（无详情页，悬停仅显示项目名称，不可点击进入） */}
            {activeCategory === "all" &&
              simpleMarkers.map((m) => {
                const isHover = m.index === hoverSimple
                return (
                  <g
                    key={`simple-${m.index}`}
                    transform={`translate(${m.x}, ${m.y})`}
                    className="cursor-default"
                    onMouseEnter={() => setHoverSimple(m.index)}
                    onMouseLeave={() => setHoverSimple((v) => (v === m.index ? null : v))}
                    onFocus={() => setHoverSimple(m.index)}
                    onBlur={() => setHoverSimple((v) => (v === m.index ? null : v))}
                    tabIndex={0}
                    aria-label={`${m.name}，位于${m.location}`}
                  >
                    <circle
                      r={isHover ? 8 : 5}
                      fill={SIMPLE_MARKER_COLOR}
                      opacity={isHover ? 0.35 : 0.25}
                      style={{ transition: "r 200ms ease" }}
                    />
                    <circle r={3.2} fill={SIMPLE_MARKER_COLOR} />
                    <circle r={1.2} className="fill-background" />

                    {/* 常驻地图标识：显示所在城市，悬停时高亮放大 */}
                    <text
                      x={7}
                      y={4}
                      className="pointer-events-none select-none"
                      fill={isHover ? "oklch(0.95 0.02 220)" : "oklch(0.78 0.04 220)"}
                      style={{
                        fontSize: isHover ? 13 : 11,
                        fontWeight: isHover ? 700 : 500,
                        paintOrder: "stroke",
                        stroke: "oklch(0.16 0.03 235)",
                        strokeWidth: 3,
                        strokeLinejoin: "round",
                        transition: "font-size 150ms ease",
                      }}
                    >
                      {shortLabel(m.location)}
                    </text>

                    {/* 悬停显示完整项目名称 */}
                    {isHover && (
                      <foreignObject x={-110} y={-50} width={220} height={42} style={{ overflow: "visible" }}>
                        <div className="pointer-events-none mx-auto w-fit max-w-[220px] rounded-md border border-primary/50 bg-background/95 px-3 py-1.5 text-center text-xs font-semibold text-foreground shadow-lg backdrop-blur">
                          {m.name}
                        </div>
                      </foreignObject>
                    )}
                  </g>
                )
              })}

            {/* 项目标记点（按解决方案类型着色） */}
            {markers.map((m) => {
              const isActive = m.slug === active
              const matched = isMatch(m.category)
              const color = categoryColor[m.category]
              return (
                <g
                  key={m.slug}
                  transform={`translate(${m.x}, ${m.y})`}
                  className="cursor-pointer"
                  style={{ opacity: matched ? 1 : 0.22, transition: "opacity 300ms ease" }}
                  onMouseEnter={() => setActive(m.slug)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(m.slug)}
                  onClick={() => router.push(`/cases/${m.slug}`)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${m.title}，位于${m.location}，${m.category}`}
                >
                  {/* 呼吸脉冲圈（雷达扩散效果） */}
                  {matched && (
                    <circle r={6} fill="none" stroke={color} strokeWidth={1.2} opacity={0.5}>
                      <animate attributeName="r" values="6;15" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    r={isActive ? 14 : 10}
                    fill={color}
                    opacity={0.2}
                    style={{ transition: "r 200ms ease" }}
                  />
                  <circle r={5} fill={color} />
                  <circle r={2} className="fill-background" />

                  {/* tooltip */}
                  {isActive && (
                    <foreignObject x={-110} y={-104} width={220} height={96} style={{ overflow: "visible" }}>
                      <div className="pointer-events-none rounded-lg border border-primary/40 bg-background/95 px-3 py-2 text-center shadow-lg backdrop-blur">
                        <div className="truncate text-xs font-semibold text-foreground">{m.title}</div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">
                          {m.location} · {m.category}
                        </div>
                        <div className="mt-1 flex flex-wrap justify-center gap-1">
                          {m.products.map((p) => (
                            <span
                              key={p}
                              className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] text-primary"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </foreignObject>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* 右侧项目信息 / 列表 */}
        <div className="flex flex-col">
          {activeCase ? (
            <div
              className="rounded-xl border bg-background/60 p-5"
              style={{ borderColor: `${categoryColor[activeCase.category]}` }}
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {activeCase.location}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{activeCase.title}</h3>
              <span
                className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  color: categoryColor[activeCase.category],
                  backgroundColor: `color-mix(in oklch, ${categoryColor[activeCase.category]} 15%, transparent)`,
                }}
              >
                {activeCase.category}
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {activeCase.products.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activeCase.summary}</p>
              <button
                type="button"
                onClick={() => router.push(`/cases/${activeCase.slug}`)}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                查看项目详情 →
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-background/40 p-5 text-sm text-muted-foreground">
              将鼠标悬停或点击地图上的标记点，查看对应项目详情。点位颜色代表解决方案类型。
            </div>
          )}

          {/* 项目快捷列表（与筛选联动） */}
          <div className="mt-4 grid max-h-[320px] gap-1.5 overflow-y-auto pr-1">
            {listMarkers.map((m) => (
              <button
                key={m.slug}
                type="button"
                onMouseEnter={() => setActive(m.slug)}
                onClick={() => router.push(`/cases/${m.slug}`)}
                className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                  m.slug === active
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: categoryColor[m.category] }}
                    aria-hidden="true"
                  />
                  <span className="truncate font-medium">{m.title}</span>
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{m.location}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
