"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { geoMercator, type GeoProjection } from "d3-geo"
import { MapPin } from "lucide-react"
import { cases, caseCoords } from "@/lib/cases"

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
    properties: { name?: string }
    geometry: Geometry
  }>
}

// 手动把多边形环投影成 SVG 路径（绕过 d3 geoPath 的球面裁剪，
// 该数据集环绕方向不规范会导致 geoPath 填满整个画布）
function featureToPath(geometry: Geometry, projection: GeoProjection): string {
  const polygons =
    geometry.type === "Polygon"
      ? [geometry.coordinates as Position[][]]
      : (geometry.coordinates as Position[][][])

  let d = ""
  for (const polygon of polygons) {
    for (const ring of polygon) {
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

export function CasesMap() {
  const router = useRouter()
  const [geo, setGeo] = useState<GeoFeatureCollection | null>(null)
  const [active, setActive] = useState<string | null>(null)

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

  // 过滤掉南海诸岛（九段线会撑大边界，影响拟合）
  const mainland = useMemo<GeoFeatureCollection | null>(() => {
    if (!geo) return null
    return {
      type: "FeatureCollection",
      features: geo.features.filter((f) => f.properties?.name !== "南海诸岛"),
    }
  }, [geo])

  // 投影：固定中心与比例（该数据多边形环绕方向不规范，fitExtent 不可用）
  const projection = useMemo<GeoProjection>(() => {
    return geoMercator()
      .center([104, 36])
      .scale(760)
      .translate([WIDTH / 2, HEIGHT / 2])
  }, [])

  // 把案例按坐标聚合到标记点
  const markers = useMemo(() => {
    return cases
      .map((c) => {
        const coord = caseCoords[c.slug]
        if (!coord) return null
        const point = projection(coord)
        if (!point) return null
        return { ...c, x: point[0], y: point[1] }
      })
      .filter((m): m is NonNullable<typeof m> => m !== null)
  }, [projection])

  const activeCase = markers.find((m) => m.slug === active) ?? null

  return (
    <div className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-card/60 p-4 sm:p-6">
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

            {/* 省界 */}
            {mainland?.features.map((f, i) => (
              <path
                key={i}
                d={featureToPath(f.geometry, projection)}
                fill="oklch(0.28 0.04 235 / 0.55)"
                stroke="oklch(0.6 0.12 220 / 0.55)"
                strokeWidth={0.7}
              />
            ))}

            {/* 项目标记点 */}
            {markers.map((m) => {
              const isActive = m.slug === active
              return (
                <g
                  key={m.slug}
                  transform={`translate(${m.x}, ${m.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(m.slug)}
                  onFocus={() => setActive(m.slug)}
                  onClick={() => router.push(`/cases/${m.slug}`)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${m.title}，位于${m.location}`}
                >
                  {/* 脉冲圈 */}
                  <circle
                    r={isActive ? 14 : 10}
                    className="fill-primary/20"
                    style={{ transition: "r 200ms ease" }}
                  />
                  <circle r={5} className="fill-primary" />
                  <circle r={2} className="fill-primary-foreground" />
                </g>
              )
            })}
          </svg>
        </div>

        {/* 右侧项目信息 / 列表 */}
        <div className="flex flex-col">
          {activeCase ? (
            <div className="rounded-xl border border-primary/30 bg-background/60 p-5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {activeCase.location}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{activeCase.title}</h3>
              <p className="mt-1 text-xs text-primary">{activeCase.product}</p>
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
              将鼠标悬停或点击地图上的标记点，查看对应项目详情。
            </div>
          )}

          {/* 全部项目快捷列表 */}
          <div className="mt-4 grid max-h-[320px] gap-1.5 overflow-y-auto pr-1">
            {markers.map((m) => (
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
                <span className="truncate font-medium">{m.title}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{m.location}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
