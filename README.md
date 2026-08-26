# v0-cyberwater

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_hl3Yp1yBdNducmy2JedvzJQqVtzU)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

## 构建与部署（静态网站）

本站采用 Next.js **静态导出（`output: 'export'`）**，产物为纯 HTML + 静态资源，无需 Node 服务器，可部署到任意静态托管（如阿里云虚拟主机站点根目录）。

### 1. 配置静态导出

`next.config.mjs` 已启用 `output: 'export'`：

```js
const nextConfig = {
  output: 'export',
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}
```

> 注意：本项目使用**绝对根路径**引用资源（如 `src="/icons/val-symbiosis.png"`），因此产物必须部署在**站点根目录**，否则本地用 WebStorm（重项目根预览）会 404——这是预览方式问题，非打包问题。

### 2. 安装依赖

```bash
pnpm install
```

> 若 `pnpm run build` 因 `sharp`/`msw` 构建脚本被忽略（`ERR_PNPM_IGNORED_BUILDS`）而报错退出，可跳过 pnpm 的依赖检查，直接用本地二进制构建：

```bash
npx next build
```

### 3. 编译成静态文件

```bash
npx next build
```

构建产物输出到 **`out/`** 目录（全部为静态文件）。

### 4. 本地验证（可选）

把 `out/` 作为站点根目录启动本地服务：

```bash
npx serve out
# 或
cd out && python3 -m http.server 8088
```

访问 `http://localhost:8088/` 即可预览。若按上面方式以 `out/` 为根访问，资源均返回 200，`build/_vercel/insights/script.js` 的 404 为 Vercel 分析脚本所致，静态托管上无害，可忽略。

### 5. 打包 zip（内容平铺，不含外层目录）

```bash
cd out
zip -qr ../site.zip . -x '*.DS_Store'
```

### 6. 部署到阿里云虚拟主机

1. 登录[主机管理控制台](https://cp.aliyun.com/)
2. 进入菜单 **文件管理 - 文件管理器**，点击进入 **站点根目录**
3. 点击 **上传文件**，选择上面生成的 `site.zip` 上传
4. 上传完成后点击 **解压** 覆盖到站点根目录
   - 注意：`out/` 产物**不含 `favicon.ico`**，解压前删除旧文件时请**保留 `favicon.ico`**，避免站点图标丢失。
