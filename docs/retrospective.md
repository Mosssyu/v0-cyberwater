# 开发复盘

## 2026-09-11：首页搜索缩略图品牌信号优化

- 问题：搜索结果错误选取页脚合作伙伴“北控石犀”标识作为首页摘要图。
- 根因：首页缺少明确的 OpenGraph 主图与 Organization 结构化数据，品牌主图也未出现在 H1 附近；合作伙伴图片虽位于页脚，但可被爬虫识别为候选图。
- 处理：强化首屏官方 Logo 语义和加载优先级，补充 canonical、OpenGraph、Twitter Card 与 Organization JSON-LD；品牌主图仅通过元数据与结构化数据声明，不占用首屏视觉空间；合作伙伴 Logo 统一调整为低优先级懒加载，并将“北控石犀”图片从首页 DOM 完全移除。
- 验证：生产构建完成 36/36 个静态页面；静态首页产物已检查品牌 Logo、OpenGraph、canonical、Organization JSON-LD 和合作伙伴图片属性，并确认不再引用 `/partners/bewg-shixi.png`。
- 后续：部署后通过百度搜索资源平台重新提交首页 URL；搜索摘要图由搜索引擎最终判断，不能保证提交后立即替换。

### 资产分类

- **Knowledge**：本条复盘沉淀首页搜索摘要图的品牌信号优化与验证方法。
- **Component**：`SiteHeader`、`Hero`、`PartnerMarquee` 和 `SiteFooter` 延续现有组件复用，没有新增重复组件。
- **Service / Script / Template / Skill / Rule**：本次无需新增。
