# AGENTS.md - 羚境官网多智能体协作工程 (索引)

**项目名称**：羚境 Lingscape 静态官网开发工程
**项目主体**：湖北奥羚技术有限公司
**品牌主张**：羚境，让 AI 进入真实产业情境
**Harness 目标**：通过多智能体协作，输出严格符合《羚境官网系统需求文档.md》v1.1 的静态前端产物（Vite + HTML + CSS + TS/JS）。
**核心约束**：纯静态、无 React/Vue/Angular/Svelte 框架、禁止引入服务端依赖、优先原生能力，严格遵循"产业解决方案"与"克制科技感"的设计标准。
**权威基准**：当本文件与任何泛 AI 模板或记忆冲突时，一律以《羚境官网系统需求文档.md》为准。

> 本文件是**索引与速查**。详细规范按需加载 `docs/` 下的对应文档，不要一次性全部读取。

---

## 文档目录（按需加载）

| 需要什么 | 读哪个文件 |
| --- | --- |
| **内容事实**（公司/产品/行业/能力/交付步骤/治理项/Hero 文案） | [docs/CONTENT.md](./docs/CONTENT.md) |
| **项目背景/目标用户/官网范围/对标参考/信息架构**（12 区块顺序、7 项导航） | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| **页面内容需求**（逐区块文案与布局要求） | [docs/PAGE_CONTENT.md](./docs/PAGE_CONTENT.md) |
| **前端规范**（色彩 Tokens/字体/Logo/栅格/组件/动效/静态技术） | [docs/FRONTEND.md](./docs/FRONTEND.md) |
| **安全与治理**（治理六项/治理面板规则/数据边界/合规红线） | [docs/SECURITY.md](./docs/SECURITY.md) |
| **SEO 与可访问性**（title/meta/OG/关键词/对比度/键盘聚焦/reduced-motion） | [docs/SEO_A11Y.md](./docs/SEO_A11Y.md) |
| **验收标准与清单**（内容/视觉/动效/技术四类 checklist） | [docs/COMPLIANCE.md](./docs/COMPLIANCE.md) |
| **交付物与实施路径**（P0/P1/P2 优先级、三阶段路线、风险） | [docs/DELIVERY.md](./docs/DELIVERY.md) |
| **智能体拓扑与工作流**（5 个 Agent 系统指令、4 阶段 Pipeline） | [docs/AGENTS_TOPOLOGY.md](./docs/AGENTS_TOPOLOGY.md) |
| **Harness 全局配置**（可机器读取的 YAML：strict_rules + content_truth + tokens） | [docs/CONFIG.md](./docs/CONFIG.md) |

---

## 核心速查（最常引用的约束）

### 内容红线
- **公司主体**：湖北奥羚技术有限公司（必须在关于公司区出现）
- **产品仅三个**：RelayAI / ShadowMind / 企业知识库（禁止虚构其他产品名）
- **行业仅五类**：文旅 / 金融风控 / 数字乡村 / 企业数字化转型 / AI 原生能力建设（禁止增删替换）
- **能力体系三层**：应用层 / 情境层 / 底座层（禁止改为四层）
- **交付方法六步**：业务调研 → 场景建模 → 系统接入 → 应用落地 → 治理运营 → 持续演进（禁止改为成果清单）
- **安全与治理**：独立区块，不得与交付方法合并
- **首屏 4 模块**：模型网关 / 企业知识库 / 流程连接 / 行业助手（DOM 卡片，叠加在 canvas 之上）
- **Canvas 5 节点**：文旅 / 风控 / 乡村 / 企业 / AI 底座（AI 底座用 `--accent-warm`）
- **禁止虚构**客户/数据/合作关系（如 Acme Corp 等占位符）

### 结构红线
- **导航 7 项**：行业场景 / 能力体系 / 产品矩阵 / 案例成果 / 交付治理 / 关于羚境 / 联系咨询
- **首页 12 区块顺序**：Hero → 品牌理念 → 核心观点 → 能力体系 → 解决方案 → 产品矩阵 → 交付方法 → 安全治理 → 可信背书 → 关于公司 → 联系咨询 → 页脚
- **首屏高度**：桌面 85-90vh（露出下一区块 ≥60px）/ 移动 75-80vh（露出下一区块 ≥40px）

### 设计 Tokens 速查
- **色彩**：`--bg #0E1012` / `--bg-soft #15171B` / `--bg-panel #111815` / `--ink #FFFFFF` / `--ink-soft #A0AABA` / `--muted #566171` / `--line #333943` / `--accent #35D0A9` / `--accent-warm #C8A760` / `--light-band #E8ECE7`
- **动效**：`--motion-micro 150ms` / `--motion-small 300ms` / `--motion-medium 800ms` / `--ease-mapbox cubic-bezier(0.19,1,0.22,1)` / `--ease-standard cubic-bezier(0.25,0.1,0.25,1)`
- **栅格**：max-width 1280px，桌面 12 列（gutter 24px/margin 48px），平板 8 列（margin 32px），移动 4 列（margin 20px），正文 680px
- **按钮**：圆角 999px，高度 ≥44px，文案必须是动作
- **卡片**：圆角 8px，边框 `1px solid --line`，hover 仅边界高亮（无大阴影弹跳）
- **宋体/衬线仅三处**：首屏"羚境"二字、品牌理念核心短句（≤20 字）、页脚品牌名

### 技术红线
- 纯静态，Vite 构建，`emptyOutDir: true`，输出到 `/dist`
- 禁止 React/Vue/Svelte/Angular/jQuery
- Canvas 优先 2D，Three.js 仅懒加载增强，不进首屏关键路径
- Canvas 必须 `aria-hidden="true"`，z-index 低于文本层
- 必须支持 `prefers-reduced-motion`，JS 失败时核心内容仍可见
- Lighthouse Performance ≥ 85，Accessibility ≥ 90

### 动效禁止项
全屏粒子海 / 复杂 3D 首屏 / 多色霓虹渐变 / 大幅视差 / 滚动劫持 / 内容默认不可见等 JS / 移动端高复杂度 canvas / 长文案打字机 / 鼠标跟随光晕

---

## 智能体拓扑速查

| Agent | 角色 | 详见 |
| --- | --- | --- |
| Architect_Agent | 架构与中枢控制 | [docs/AGENTS_TOPOLOGY.md §1](./docs/AGENTS_TOPOLOGY.md) |
| UI_Token_Agent | 设计系统与样式 | [docs/AGENTS_TOPOLOGY.md §2](./docs/AGENTS_TOPOLOGY.md) |
| DOM_Logic_Agent | 核心 DOM 与交互 | [docs/AGENTS_TOPOLOGY.md §3](./docs/AGENTS_TOPOLOGY.md) |
| Motion_Graphics_Agent | 动效与可视化 | [docs/AGENTS_TOPOLOGY.md §4](./docs/AGENTS_TOPOLOGY.md) |
| QA_Compliance_Agent | 质量保证与合规 | [docs/AGENTS_TOPOLOGY.md §5](./docs/AGENTS_TOPOLOGY.md) |

**4 阶段 Pipeline**：基础设施构建 → 核心结构与静态逻辑 → 视觉增强与动态注入 → 审查与最终输出
详见 [docs/AGENTS_TOPOLOGY.md §2](./docs/AGENTS_TOPOLOGY.md)。

---

## 阅读指引

**开始任务前**：先读本文件的「核心速查」，确认任务类型，然后按需读取对应 docs/ 文档。

**常见任务路径**：
- 写 HTML/内容 → 读 [docs/CONTENT.md](./docs/CONTENT.md) + [docs/PAGE_CONTENT.md](./docs/PAGE_CONTENT.md) + [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- 写 CSS/样式 → 读 [docs/FRONTEND.md](./docs/FRONTEND.md) + [docs/CONFIG.md](./docs/CONFIG.md)
- 写 Canvas/动效 → 读 [docs/FRONTEND.md §2](./docs/FRONTEND.md) + [docs/CONTENT.md §8](./docs/CONTENT.md)
- 做安全/治理区 → 读 [docs/SECURITY.md](./docs/SECURITY.md) + [docs/CONTENT.md §6](./docs/CONTENT.md)
- 做 SEO/A11y → 读 [docs/SEO_A11Y.md](./docs/SEO_A11Y.md)
- 做 QA 验收 → 读 [docs/COMPLIANCE.md](./docs/COMPLIANCE.md)
- 需要机器可读配置 → 读 [docs/CONFIG.md](./docs/CONFIG.md)

**权威基准声明**：本文件及其引用的 docs/ 文档均为《羚境官网系统需求文档.md》v1.1 的工程化映射，所有内容、设计、技术、验收条款均来自需求文档原文，未做删减或弱化。如存在歧义，以《羚境官网系统需求文档.md》为准。
