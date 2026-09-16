# 开发复盘

## 2026-09-16：彻底移除旧客户 Logo 源文件

- 问题：线上旧图片地址已经返回 `404`，但源码目录仍残留未被页面引用的 `/partners/bewg-shixi.jpg`，后续完整部署可能把它重新发布。
- 处理：从 `public/partners` 删除该孤立客户 Logo，并重新执行生产构建，确保静态产物不再包含同名文件。
- 验证：生产构建完成 39/39 个静态页面；源码、首页静态 HTML 和构建产物均不再包含 `bewg-shixi`、“北控石犀”或“石犀”引用。
- 后续：在百度搜索资源平台重新提交首页与 Sitemap，等待百度更新历史搜索摘要缓存；搜索结果图片仍由百度最终决定。

### 资产分类

- **Knowledge**：补充“未引用但仍位于 `public` 的历史资产也会被重新部署”的治理记录。
- **Asset**：删除孤立的旧客户 Logo，无需新增替代资产；现有云建标官方 Logo 与品牌主图继续作为唯一品牌信号。
- **Component / Service / Script / Template / Skill / Rule**：本次无需新增。

## 2026-09-14：百度仍显示旧客户缩略图的二次治理

- 问题：9 月 11 日版本已经上线且首页不再引用“北控石犀”，但百度结果仍显示旧客户 Logo。
- 根因：百度仍使用历史抓取缓存；同时旧图片文件 `/partners/bewg-shixi.png` 在线上仍可直接访问，OpenGraph 与 Organization 的图片也偏向产品截图或深色站点 Logo，不是适合白底搜索结果的品牌资产。
- 处理：删除旧客户 Logo 文件；使用现有官方彩色 Logo 等比例生成百度要求的 `121×75`、`200×150` 两个提交文件；新增 `1200×630` 品牌分享图；将 OpenGraph、Twitter Card 和 Organization JSON-LD 全部改为云建标彩色品牌资产。
- 验证：生产构建后检查静态首页不含“北控石犀”文字或图片地址，OpenGraph 与 Organization 图片均指向云建标品牌文件，并核对百度提交图像像素尺寸。
- 后续：部署后在百度搜索资源平台的“搜索展现 → 站点属性”上传两个标准尺寸 Logo，并重新提交首页抓取。百度最终展示及更新时点仍由其系统决定。

### 资产分类

- **Knowledge**：记录百度旧缩略图缓存与站点 Logo 专用资产的治理方法。
- **Asset**：新增百度 PC/移动端 Logo 及通用品牌分享图，均由官方彩色 Logo 等比例生成。
- **Route / Asset**：新增品牌化 Web App Manifest、标准尺寸 favicon、Apple Touch Icon 与应用图标；移除未被引用的 V0 建站模板图标及占位 Logo。
- **Component / Service / Script / Template / Skill / Rule**：本次无需新增。

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
