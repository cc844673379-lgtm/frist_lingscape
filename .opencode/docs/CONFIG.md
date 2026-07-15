# Harness 全局配置 (Environment Config)

> 本文件提供可机器读取的 YAML 配置，涵盖严格规则、内容事实源、设计 Tokens、工具链。
> 可转译为 `.cursorrules` 或框架 Context 挂载到 IDE/Agent 环境。
> 详细说明见 docs/ 下其他文档。

```yaml
project: lingscape_static_site
company_entity: 湖北奥羚技术有限公司
brand_name: 羚境 Lingscape
brand_proposition: 羚境，让 AI 进入真实产业情境
authoritative_source: 羚境官网系统需求文档.md
document_version: v1.1
document_date: 2026-07-06

# ========== 严格规则 ==========
strict_rules:
  # 技术栈约束
  - rule: "NEVER use component frameworks (React, Vue, Svelte, Angular). Native DOM only."
  - rule: "ALWAYS separate CSS files by concern (variables, grid, reset, base, components)."
  - rule: "Build tool is Vite with emptyOutDir: true. Output pure static files to /dist."
  - rule: "Static assets organized in: /assets/images, /assets/icons, /assets/fonts, /assets/scripts, /assets/styles."
  - rule: "Images use WebP/AVIF first, keep PNG/JPG fallback."

  # 视觉与品牌约束
  - rule: "NEVER use generic AI visuals: glowing brains, blue/purple abstract waves, robot icons, chip icons, cloud icons."
  - rule: "NEVER use blue-purple gradients, rainbow gradients, fluorescent particles, high-saturation multi-color icons."
  - rule: "NEVER use large-area glassmorphism cards."
  - rule: "Visual motifs MUST be: abstract antelope horn, context boundary, intelligent path."
  - rule: "Primary interactive color is strict: --accent #35D0A9. --accent-warm #C8A760 only for low-frequency industry labels, never co-occur大面积 with cyan-green."
  - rule: "Deep color region 70%, light region 30% max. --light-band only for product matrix and trust endorsement."

  # Canvas 与动效约束
  - rule: "Canvas animations MUST run in background layer (z-index < text layers). Canvas MUST have aria-hidden=true."
  - rule: "Prefer Canvas 2D. Three.js only if necessary, MUST lazy-load, MUST NOT block first-screen text/CTA."
  - rule: "Mobile MUST use simplified canvas or static path, MUST NOT load Three.js."
  - rule: "MUST implement prefers-reduced-motion. When enabled, stop canvas drawing and cancel displacement."
  - rule: "Core content MUST be visible when JS fails. Default visible, add animation initial state only after js-ready class."
  - rule: "FORBIDDEN: full-screen particle sea, 3D model as first-screen core, multi-color neon gradients, large parallax, scroll hijacking, typewriter for long text (especially hero title/subtitle), mouse-following cursor trails."
  - rule: "Canvas framerate stable 60fps. Use requestAnimationFrame + visibilitychange to pause when hidden."

  # 内容事实约束
  - rule: "If there's no real client data, fallback to capability lists (typical deliverables). DO NOT generate fake companies like Acme Corp."
  - rule: "Products are strictly: RelayAI, ShadowMind, 企业知识库. DO NOT invent other product names."
  - rule: "Industry solutions are strictly 5: 文旅/金融风控/数字乡村/企业数字化转型/AI 原生能力建设. DO NOT add/remove/replace."
  - rule: "Capability system is strictly 3 layers: 应用层/情境层/底座层. DO NOT change to 4 layers."
  - rule: "Delivery method is strictly 6-step process. DO NOT change to deliverables list."
  - rule: "Safety & governance is strictly an independent section. DO NOT merge with delivery method."
  - rule: "Company entity '湖北奥羚技术有限公司' MUST appear in About section."
  - rule: "Hero MUST include 4 business evidence modules as DOM cards: 模型网关/企业知识库/流程连接/行业助手."
  - rule: "Hero canvas MUST include 5 business boundary nodes: 文旅/风控/乡村/企业/AI 底座."
  - rule: "Page MUST NOT contain '概念稿' or 'draft' text."

  # 结构与导航约束
  - rule: "Section order is strictly 12 blocks per requirement doc §6.2. DO NOT merge/reorder/add/remove."
  - rule: "Navigation is strictly 7 items: 行业场景/能力体系/产品矩阵/案例成果/交付治理/关于羚境/联系咨询."
  - rule: "Hero height: desktop 85-90vh (expose next section >=60px), mobile 75-80vh (expose next section >=40px)."

  # 组件规范约束
  - rule: "Button border-radius MUST be 999px, height >= 44px. Button text MUST be action verbs."
  - rule: "Card border-radius MUST be 8px, border 1px solid --line. Hover only allows border highlight/background slight change, NO big shadow bounce."
  - rule: "Serif font ONLY for 3 places: '羚境' in hero title, brand philosophy core sentence (<=20 chars), footer brand name."
  - rule: "Color tokens MUST use exact names from req doc §8.2: --bg/--bg-soft/--bg-panel/--ink/--ink-soft/--muted/--line/--accent/--accent-warm/--light-band."
  - rule: "Motion tokens MUST use exact values: --motion-micro 150ms, --motion-small 300ms, --motion-medium 800ms, --ease-mapbox cubic-bezier(0.19,1,0.22,1), --ease-standard cubic-bezier(0.25,0.1,0.25,1)."
  - rule: "Grid: max-width 1280px, desktop 12 cols (gutter 24px, margin 48px), tablet 8 cols (margin 32px), mobile 4 cols (margin 20px), prose max-width 680px."
  - rule: "Font sizes: Hero desktop 72-96px/mobile 40-48px, H1 desktop 56-64px/mobile 34-40px, H2 desktop 36-44px/mobile 28-32px, Body large desktop 20-22px/mobile 17-18px, Body desktop 15-17px/mobile 14-16px, Label 11-13px. Chinese body >=14px, mobile card body >=13px. Titles left-aligned."

  # SEO 与 A11y 约束
  - rule: "<title> MUST be: 羚境 Lingscape - 让 AI 进入真实产业情境"
  - rule: "Page lang MUST be zh-CN. MUST have meta description, Open Graph (title/description/image)."
  - rule: "Keywords coverage: AI 解决方案、产业智能、企业知识库、模型治理、数字化转型、文旅、风控、数字乡村."
  - rule: "All buttons/links MUST have :focus-visible indicator (2px solid --accent + offset)."
  - rule: "Mobile touch targets >= 44px. Key content MUST NOT exist only in images or canvas."

  # 性能与兼容性约束
  - rule: "Lighthouse Performance >= 85, Accessibility >= 90."
  - rule: "No console JS errors. All nav anchors valid. No horizontal overflow."
  - rule: "Browsers: Chrome/Safari/Edge latest, mobile Safari, Android Chrome."
  - rule: "Screens: 1440px desktop, 1280px laptop, 768px tablet, 390px mobile - all without horizontal overflow."

# ========== 内容事实源 ==========
content_truth:
  company: 湖北奥羚技术有限公司
  brand: 羚境 Lingscape
  brand_proposition: 羚境，让 AI 进入真实产业情境
  business_direction: [AI, 数据工程, 行业解决方案, 企业数字化转型]

  products:
    - name: RelayAI
      role: 企业级 AI API 汇聚与治理平台
      desc: 解决模型接入、路由、权限、成本、统计和审计
    - name: ShadowMind
      role: 本地优先、对话优先的桌面 AI 工作助手
      desc: 解决长期记忆、工作区上下文和多模型接入
    - name: 企业知识库
      role: 知识资产平台
      desc: 将制度、规范、案例、项目经验和会议结论组织成可检索、可引用、可被 AI 调用的知识资产

  industries:
    - 文旅行业解决方案
    - 金融风控解决方案
    - 数字乡村解决方案
    - 企业数字化转型
    - AI 原生能力建设

  capability_layers:
    应用层: [行业助手, 管理驾驶舱, 办公 Agent, 场景应用]
    情境层: [企业知识库, Agent 编排, 流程连接, 工具插件]
    底座层: [模型网关, 权限治理, 成本控制, 调用审计]

  delivery_steps: [业务调研, 场景建模, 系统接入, 应用落地, 治理运营, 持续演进]

  governance_items:
    - 模型调用审计
    - 权限与角色控制
    - 成本统计与预算控制
    - 数据边界与企业知识治理
    - 多模型接入与路由策略
    - 可观测可追溯可持续优化

  hero_evidence_modules:
    - {name: 模型网关, desc: 多模型接入、路由、成本、审计, visual: 小型控制台卡片带调用路径和状态点}
    - {name: 企业知识库, desc: 制度、规范、案例、会议结论可检索可引用, visual: 文档节点和引用线条}
    - {name: 流程连接, desc: 工具插件、业务系统、审批/办公流程, visual: 线性流程节点}
    - {name: 行业助手, desc: 文旅、风控、乡村、企业办公等应用入口, visual: 行业边界卡片和进入路径}

  hero_canvas_business_nodes:
    - {label: 文旅, color: accent}
    - {label: 风控, color: accent}
    - {label: 乡村, color: accent}
    - {label: 企业, color: accent}
    - {label: AI 底座, color: accent-warm}

  hero_title: 羚境，让 AI 进入真实产业情境
  hero_subtitle: 以 AI、数据工程与行业知识，连接模型、系统、流程与业务现场，把 AI 从概念能力转化为可落地、可治理、可持续演进的产业智能能力。
  hero_primary_btn: 查看能力体系
  hero_secondary_btn: 进入解决方案

  philosophy_quote: 互联网连接信息，AI 连接知识、工具、流程和行动。真正的智能化，不是多一个模型，而是让 AI 进入具体业务现场。

  core_perspectives:
    - {title: 先理解现场, desc: 行业规则、组织知识、数据系统和现实约束不同，AI 不能只输出通用回答。}
    - {title: 再连接能力, desc: 模型、知识库、业务系统、工具插件和流程节点需要组织成可执行路径。}
    - {title: 最终可控演进, desc: BG 端 AI 建设必须具备权限、成本、审计、模型治理和持续运营能力。}

  contact_title: 让 AI 进入你的真实业务现场

# ========== 设计 Tokens ==========
color_tokens:
  --bg: "#0E1012"           # 全站主背景
  --bg-soft: "#15171B"      # 卡片、能力层、面板背景
  --bg-panel: "#111815"     # 情境地图和治理面板底色（略带墨绿）
  --ink: "#FFFFFF"          # 主文字
  --ink-soft: "#A0AABA"     # 正文和说明文字
  --muted: "#566171"        # 弱提示、辅助标签
  --line: "#333943"         # 分割线、卡片边界、地图网格
  --accent: "#35D0A9"       # 唯一强强调色
  --accent-warm: "#C8A760"  # 低频产业标签色
  --light-band: "#E8ECE7"   # 浅色节奏区

motion_tokens:
  --motion-micro: "150ms"
  --motion-small: "300ms"
  --motion-medium: "800ms"
  --ease-mapbox: "cubic-bezier(0.19, 1, 0.22, 1)"
  --ease-standard: "cubic-bezier(0.25, 0.1, 0.25, 1)"

grid_tokens:
  max_width: "1280px"
  desktop_cols: 12
  desktop_gutter: "24px"
  desktop_margin: "48px"
  tablet_cols: 8
  tablet_margin: "32px"
  mobile_cols: 4
  mobile_margin: "20px"
  prose_max_width: "680px"

font_tokens:
  display: "几何无衬线/黑体, weight 500-700"
  body: "现代无衬线, weight 400"
  mono: "等宽字体"
  brand_serif: "宋体/衬线, 仅用于 3 处"

font_sizes:
  hero: {desktop: "72-96px", mobile: "40-48px", line_height: "0.98-1.08"}
  h1: {desktop: "56-64px", mobile: "34-40px"}
  h2: {desktop: "36-44px", mobile: "28-32px"}
  body_large: {desktop: "20-22px", mobile: "17-18px"}
  body: {desktop: "15-17px", mobile: "14-16px"}
  label: {desktop: "11-13px", mobile: "11-12px"}
  chinese_body_min: "14px"
  mobile_card_body_min: "13px"

# ========== 工具链 ==========
tooling:
  build_tool: "Vite"
  language: "HTML5, CSS3, TypeScript"
  allowed_libraries:
    - "Canvas API (Native)"
    - "IntersectionObserver (Native)"
    - "Clipboard API (Native)"
  forbidden_libraries:
    - "React"
    - "Vue"
    - "Svelte"
    - "Angular"
    - "jQuery"
    - "Three.js (unless lazy-loaded, not in first-screen critical path)"
```

> **说明**：本 YAML 配置是 [docs/CONTENT.md](./CONTENT.md)、[docs/FRONTEND.md](./FRONTEND.md) 等文档的结构化汇总，便于 Agent 直接读取和校验。详细说明请阅读对应文档。
