"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { geoMercator, type GeoProjection } from "d3-geo"
import { ArrowRight, MapPin } from "lucide-react"
import { cases, caseCoords, categoryColor, mapMarkers, type CaseCategory } from "@/lib/cases"
import { usePauseOffscreen } from "@/hooks/use-pause-offscreen"

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
  // 性能优化：地图滚出视口 / 标签页隐藏时暂停全部 SMIL 动画（雷达脉冲等）
  const svgRef = usePauseOffscreen<SVGSVGElement>()
  // 仅地图定位点位的悬停索引（放大高亮用）
  const [hoverSimple, setHoverSimple] = useState<number | null>(null)
  // 统一悬浮浮层信息（HTML 覆盖层渲染，不随 SVG 缩放，保证清晰大号卡片）
  const [hover, setHover] = useState<{
    x: number
    y: number
    title: string
    location: string
    category: CaseCategory
    products?: string[]
    slug?: string
  } | null>(null)

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
  // 右侧列表与筛选联动（可进入详情的重点案例）
  const listMarkers = markers.filter((m) => isMatch(m.category))
  // 仅地图定位点位（与筛选联动）
  const matchedSimple = simpleMarkers.filter((m) => isMatch(m.category))

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-border bg-card/60 p-4 sm:p-6">
      <div className="grid gap-6 lg:h-[72vh] lg:min-h-[560px] lg:max-h-[720px] lg:grid-cols-[1.6fr_1fr]">
        {/* 地图 */}
        <div className="relative">
          {/* 左上角落地规模统计 */}
          <div className="pointer-events-none absolute left-2 top-2 z-10 max-w-[220px] sm:left-3 sm:top-3">
            <ul className="flex flex-col gap-1.5">
              {[
                { num: "380+", label: "座水厂" },
                { num: "2000+", label: "公里河道 / 管网" },
                { num: "1000+", label: "座泵闸 / 厂站" },
                { num: "100+", label: "项目落地" },
              ].map((s) => (
                <li key={s.label} className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-accent sm:text-lg">{s.num}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <svg
            ref={svgRef}
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

            {/* 仅地图定位点位（无详情页）：默认仅显示发光点位，悬停显示浮层卡片 */}
            {matchedSimple.map((m) => {
              const isHover = m.index === hoverSimple
              const color = categoryColor[m.category]
              return (
                <g
                  key={`simple-${m.index}`}
                  transform={`translate(${m.x}, ${m.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoverSimple(m.index)
                    setHover({ x: m.x, y: m.y, title: m.name, location: m.location, category: m.category })
                  }}
                  onMouseLeave={() => {
                    setHoverSimple((v) => (v === m.index ? null : v))
                    setHover(null)
                  }}
                  onFocus={() => {
                    setHoverSimple(m.index)
                    setHover({ x: m.x, y: m.y, title: m.name, location: m.location, category: m.category })
                  }}
                  onBlur={() => {
                    setHoverSimple((v) => (v === m.index ? null : v))
                    setHover(null)
                  }}
                  tabIndex={0}
                  aria-label={`${m.name}，位于${m.location}，${m.category}`}
                >
                  {/* 静态光晕（性能优化：58 个定位点若各带 2 个 SMIL 呼吸动画
                      会产生 100+ 常驻动画，改为静态光晕后观感接近、开销归零） */}
                  <circle r={5.5} fill={color} opacity={0.16} />
                  <circle
                    r={isHover ? 4 : 2.8}
                    fill={color}
                    style={{ transition: "r 200ms ease" }}
                  />
                  <circle r={1} className="fill-background" />
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
                  onMouseEnter={() => {
                    setActive(m.slug)
                    setHover({
                      x: m.x,
                      y: m.y,
                      title: m.title,
                      location: m.location,
                      category: m.category,
                      products: m.products,
                      slug: m.slug,
                    })
                  }}
                  onMouseLeave={() => {
                    setActive(null)
                    setHover(null)
                  }}
                  onFocus={() => setActive(m.slug)}
                  onClick={() => router.push(`/cases/${m.slug}`)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${m.title}，位于${m.location}，${m.category}`}
                >
                  {/* 呼吸脉冲圈（雷达扩散效果，标记可进入详情的重点案例） */}
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
                </g>
              )
            })}
          </svg>

          {/* 悬浮玻璃拟态项目卡片（HTML 覆盖层，清晰大号、自动避开边缘） */}
          {hover && (() => {
            const leftPct = (hover.x / WIDTH) * 100
            const topPct = (hover.y / HEIGHT) * 100
            const tx = leftPct < 22 ? "-6%" : leftPct > 78 ? "-94%" : "-50%"
            const below = topPct < 32
            const ty = below ? "16px" : "calc(-100% - 16px)"
            const color = categoryColor[hover.category]
            return (
              <div
                className="pointer-events-none absolute z-30 w-[288px]"
                style={{ left: `${leftPct}%`, top: `${topPct}%`, transform: `translate(${tx}, ${ty})` }}
              >
                <div
                  className="cw-hovercard rounded-2xl border p-4 shadow-2xl backdrop-blur-xl"
                  style={{
                    borderColor: `color-mix(in oklch, ${color} 60%, transparent)`,
                    backgroundColor: "color-mix(in oklch, var(--color-background) 85%, transparent)",
                    boxShadow: `0 12px 40px -8px color-mix(in oklch, ${color} 45%, transparent), 0 0 0 1px color-mix(in oklch, ${color} 20%, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" style={{ color }} />
                    {hover.location}
                  </div>
                  <h4 className="mt-1.5 text-balance text-base font-bold leading-snug text-foreground">
                    {hover.title}
                  </h4>
                  <span
                    className="mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      color,
                      backgroundColor: `color-mix(in oklch, ${color} 16%, transparent)`,
                    }}
                  >
                    {hover.category}
                  </span>
                  {hover.products && hover.products.length > 0 && (
                    <div className="mt-3">
                      <div className="text-[11px] font-medium text-muted-foreground">应用产品</div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {hover.products.map((p) => (
                          <span
                            key={p}
                            className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium text-primary"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {hover.slug ? (
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color }}>
                      查看项目详情
                      <ArrowRight className="size-3.5" />
                    </div>
                  ) : (
                    <div className="mt-3 text-[11px] text-muted-foreground">落地项目定位点</div>
                  )}
                </div>
              </div>
            )
          })()}

        </div>

        {/* 右侧项目信息 / 列表：与地图等高，列表占满剩余空间 */}
        <div className="flex min-h-0 flex-col">
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
              点位颜色代表解决方案类型。带雷达脉冲的重点案例可点击进入详情，其余为落地项目定位点。
            </div>
          )}

          {/* 项目列表标题 + 数量 */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">项目案例列表</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              <span className="font-mono font-bold tabular-nums">{listMarkers.length}</span>
              个可查看详情
            </span>
          </div>

          {/* 项目快捷列表（与筛选联动）：填满右侧剩余高度，内部独立滚动 */}
          <div className="mt-2.5 grid min-h-0 flex-1 content-start gap-2 overflow-y-auto pr-1.5 [scrollbar-color:var(--color-primary)_transparent] [scrollbar-width:thin]">
            {listMarkers.map((m) => {
              const isOn = m.slug === active
              return (
                <button
                  key={m.slug}
                  type="button"
                  onMouseEnter={() => setActive(m.slug)}
                  onClick={() => router.push(`/cases/${m.slug}`)}
                  className={`group/item flex items-center justify-between gap-2 rounded-lg border border-l-[3px] px-3 py-2 text-left text-xs transition-colors ${
                    isOn
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                  style={{ borderLeftColor: categoryColor[m.category] }}
                >
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: categoryColor[m.category] }}
                        aria-hidden="true"
                      />
                      <span className="truncate font-medium">{m.title}</span>
                    </span>
                    <span className="pl-4 text-[11px] text-muted-foreground">{m.location}</span>
                  </span>
                  {/* 可进入详情标识 */}
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      isOn
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover/item:bg-primary/20"
                    }`}
                  >
                    详情
                    <ArrowRight className="size-3 transition-transform group-hover/item:translate-x-0.5" />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
