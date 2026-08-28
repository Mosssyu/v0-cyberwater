import { Award, Building2, FileCheck, ShieldCheck } from "lucide-react"

const companyStats = [
  { icon: Building2, num: "2015", label: "公司成立", credential: false },
  { icon: FileCheck, num: "50+", label: "软件著作权", credential: true },
  { icon: ShieldCheck, num: "10+", label: "硬件发明专利", credential: true },
  { icon: Award, num: "AAA", label: "企业信用等级", credential: true },
]

export function CompanyStats({
  credentialsOnly = false,
  className = "",
  compact = false,
}: {
  credentialsOnly?: boolean
  className?: string
  compact?: boolean
}) {
  const stats = credentialsOnly
    ? companyStats.filter((stat) => stat.credential)
    : companyStats

  return (
    <div className={className}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-transparent p-0 text-left"
        >
          <stat.icon
            className={
              compact
                ? "size-4 text-primary"
                : "size-5 text-primary"
            }
            aria-hidden="true"
          />
          <div
            className={
              compact
                ? "mt-1.5 text-lg font-bold text-foreground"
                : "mt-2 text-xl font-bold text-foreground"
            }
          >
            {stat.num}
          </div>
          <div
            className={
              compact
                ? "text-[11px] leading-tight text-muted-foreground"
                : "text-xs text-muted-foreground"
            }
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
