# SEO 与可访问性 (SEO & Accessibility)

> 本文件对应需求文档 §11。
> 涵盖 SEO 要求与 A11y（无障碍）要求。

---

## 1. SEO（§11.1）

### 1.1 必须包含

| 项目 | 要求 |
| --- | --- |
| `<title>` | 羚境 Lingscape - 让 AI 进入真实产业情境 |
| `<meta name="description">` | 存在，且契合 B 端行业 |
| Open Graph | 标题、描述、图片均存在 |
| 页面语种 | `zh-CN`（`<html lang="zh-CN">`） |
| H1/H2/H3 层级 | 合理，无跳跃 |
| 公司主体名称 | "湖北奥羚技术有限公司"出现 |

### 1.2 关键词覆盖

必须覆盖以下关键词：
- AI 解决方案
- 产业智能
- 企业知识库
- 模型治理
- 数字化转型
- 文旅
- 风控
- 数字乡村

### 1.3 结构化数据
- 使用语义化 HTML 标签（`<header>`、`<nav>`、`<main>`、`<section>`、`<article>`、`<footer>`）。
- H1 全页仅一个，位于首屏 Hero。
- H2 为区块标题，H3 为区块内子标题，不得跳跃层级。

---

## 2. 可访问性 A11y（§11.2）

### 2.1 对比度
- 文字与背景对比度符合可读性要求。
- 不能把正文放在低对比纹理或动效上。
- `--ink-soft (#A0AABA)` 用于正文和说明文字，`--muted (#566171)` 仅用于弱提示。

### 2.2 键盘聚焦
- 所有 `<button>` 和 `<a>` 可键盘聚焦。
- 所有可交互元素的 `:focus-visible` 必须有清晰焦点指示。
- 推荐使用 `2px solid --accent` 描边并保留足够 offset。

### 2.3 Canvas 与媒体
- 动态 canvas 设置 `aria-hidden="true"`。
- 关键内容不能只存在于图片或 canvas。
- 图片需提供 `alt` 文本（装饰性图片可用 `alt=""`）。

### 2.4 触控区域
- 移动端按钮触控区域不低于 `44px`。
- 按钮高度不低于 `44px`。

### 2.5 减少动态偏好
- 支持 `prefers-reduced-motion`。
- 用户开启减少动态时，应降低或关闭动画。
- Canvas 应停止复杂绘制并取消位移动画。
- 所有核心内容在 JS 失败时仍应可见。

---

## 3. 校验清单

QA Agent 必须按以下清单校验（完整 QA 清单见 [docs/COMPLIANCE.md](./COMPLIANCE.md)）：

### SEO 校验
- [ ] `<title>` 为"羚境 Lingscape - 让 AI 进入真实产业情境"
- [ ] `<meta name="description">` 存在且契合 B 端行业
- [ ] Open Graph 标题、描述、图片存在
- [ ] 页面语种 `zh-CN`
- [ ] 关键词覆盖（AI 解决方案、产业智能、企业知识库、模型治理、数字化转型、文旅、风控、数字乡村）
- [ ] 公司主体名称"湖北奥羚技术有限公司"出现
- [ ] H1/H2/H3 层级合理无跳跃

### A11y 校验
- [ ] 文字与背景对比度符合可读性要求
- [ ] 所有 `<button>` 和 `<a>` 可键盘聚焦
- [ ] `:focus-visible` 有清晰焦点指示（`2px solid --accent` + offset）
- [ ] 首屏 Canvas 带有 `aria-hidden="true"`
- [ ] 关键内容不只存在于图片或 canvas
- [ ] 移动端按钮触控区域不低于 44px
- [ ] 支持 `prefers-reduced-motion`
