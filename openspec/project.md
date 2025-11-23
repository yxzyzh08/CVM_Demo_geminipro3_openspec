# Project Context

## Purpose

这是一个关于 **CVM (客户价值管理系统 )**的 Demo(演示项目) ，该项目旨在为电信行业提供一个现代化的、AI 驱动的营销管理解决方案原型。

### 1. 项目目的 (Project Purpose)
该项目的核心目的是**演示如何通过数据驱动和 AI 辅助来实现电信营销的 PDCA（计划-执行-检查-行动）闭环** ,它不是真正的生产系统，仅仅是demo系统，不需要考虑性能和文档，仅仅是为了演示。

**CVM Demo** 将整个流程整合在一个统一的平台上，演示系统如何帮助营销人员从制定 KPI 开始，经过数据洞察、客户分群，策略制定、设计活动，活动执行，最终回到 KPI 验证，形成完整的价值闭环。

### 2. 核心业务流程 (Core Workflow)

系统遵循标准的 **PDCA** 循环：

1.  **Plan (策划)**: 选择 KPI -> 数据洞察 -> 客户分群 -> 制定策略 -> 设计活动。
2.  **Do (执行)**: 将活动推送到执行模块，进行（模拟）发送和触达。
3.  **Check (检查)**: 通过多层级报表查看执行结果，对比 KPI 达成情况。
4.  **Act (行动)**: 基于数据反馈，开启新一轮优化循环 (Cycle 2)。

### 3. 功能模块详解 (Detailed Functions)

#### 3.1. KPI Management (指标管理)
这是营销的起点。
*   **功能**: 允许用户定义关键绩效指标 (如 ARPU、流失率、VAS 渗透率)。
*   **特性**: 设置当前值、目标值和截止日期；查看 KPI 历史趋势。
*   **目的**: 明确营销目标，为后续策划提供导向。

#### 3.2. Marketing Plan (营销策划 - 核心模块)
这是系统最核心的部分，分为 4 个阶段 (Phases)，全程支持 **AI 辅助模式** 和 **手动模式**。

*   **Phase 1: Data Insights (数据洞察)**
    *   基于 CDP 提供的模拟指标数据， 呈现到报表系统，提供人类分析 KPI 现状。
    *   **AI 能力**: 一键生成洞察报告，基于电信数据分析和市场营销专家角色，自动发现业务机会（如“30% 用户超额使用流量”），并推荐潜在客户分群。
*   **Phase 2: Segment Selection (分群选择)**
    *   人工管理和筛选目标客户群，利用CDP 提供的客户分群管理能力，基于 规则（如 `ARPU > 50`）创建新分群，或修改分群，或删除分群
    *   **AI 能力**: 基于电信数据分析和市场营销专家角色 ，协助人类修改分群
*   **Phase 3: Strategy Design (策略设计)**
    *   为选定的分群制定高层营销策略（如“存量升档”、“流失挽留”）。
    *   **AI 能力**:基于电信数据分析和市场营销专家角色 ， 根据分群特征自动推荐差异化策略。
*   **Phase 4: Campaign Design (活动设计)**
    *   将策略落地为具体的营销活动（短信、邮件、App 推送），充值赠送，买包赠送等，还可以持基于客户特性（如“高频游戏用户”）进一步细分活动（可选）
    *   **AI 能力**:基于电信数据分析和市场营销专家角色 ， 协助为每个客户分群下的每个策略设计营销活动。

#### 3.3. Campaign Execution (活动执行模拟)
*   **功能**: 接收 Marketing Plan 设计的活动，进行模拟执行。
*   **Mock Service**: 并不真实发送短信，而是基于预设的概率模型（触达率、点击率、转化率）生成模拟的执行数据。
*   **目的**: 快速产生演示数据，供报表模块分析，无需等待真实世界的执行周期。

#### 3.4. Reporting (报表分析)
提供 **四层分析体系**，从微观到宏观全面评估效果：
1.  **Campaign 级**: 单个活动的执行数据（触达、响应）。
2.  **Strategy 级**: 策略下所有活动的汇总效果。
3.  **Segment 级**: 分群的整体转化情况。
4.  **Plan 级**: 整个策划对 KPI 的贡献（如“ARPU 提升了 5%”），直接回答“目标是否达成”。

#### 3.5. AI Assistant (AI 智能助手)
*   **技术**: 集成 Google Gemini API。
*   **功能**:
    *   **全局对话**: 悬浮窗口，随时响应用户提问。
    *   **上下文感知**: 自动读取当前页面数据（如当前 KPI 差距），无需用户重复输入。
    *   **内容生成**: 自动撰写洞察报告、自动创建客户分群，协助人类修改分群，生成策略建议、设计活动文案
    *   **决策支持**: 分析报表数据，建议是否开启下一轮循环。

#### 3.6. Customer Data Platform (CDP - 客户数据平台)
*   **功能**: 作为系统的后端数据底座。
*   **数据规模**: 内置 100,000+ 条模拟客户数据和行为事件。
*   **技术**: 使用 SQLite 嵌入式数据库，支持复杂的 SQL 查询和实时指标计算。
*   **目的**: 提供真实、丰富的数据环境，确保演示的真实感。


## Tech Stack

### Frontend (前端)
*   **核心框架**: React 18
*   **构建工具**: Vite 6
*   **开发语言**: TypeScript 5
*   **UI 组件库**: Ant Design 5
*   **状态管理**: Zustand 4
*   **路由管理**: React Router 6
*   **图表可视化**: ECharts 5
*   **HTTP 客户端**: Axios

### Backend (后端)
*   **运行环境**: Node.js 20 LTS
*   **Web 框架**: Express 4
*   **开发语言**: TypeScript 5
*   **AI 能力**: Google Gemini API (`@google/generative-ai`)
*   **数据存储**: 
    *   主要使用本地 JSON 文件 (`lowdb` 风格或直接文件读写)
    *   部分大数据量 (如客户数据) 使用 `sql.js` (SQLite)

## Project Conventions

 ### Code Style

  - 全栈 TypeScript 5，TS 配置启用 strict: true，禁止 any/隐式 any。
  - 前端：React 18 + Vite 6，Hooks 函数组件为主；组件文件 PascalCase.tsx，Zustand store 放 state/useXxxStore.ts；All CSS 通过 Ant Design + 自定义 Less 变量。
  - 后端：Express 4 单体服务，目录分层 routes/ → controllers/ → services/ → repositories/；文件命名 kebab-case.ts。
  - 统一 Prettier（2 空格、单引号、分号）+ ESLint（Airbnb base + React hooks）；提交前执行 pnpm lint && pnpm format。
  - 图表配置集中在 charts/ 工厂函数中，HTTP 调用统一封装 Axios 实例，错误处理返回统一结构。

  ### Architecture Patterns

  - 围绕 PDCA 划分模块：KPI 管理、营销策划（洞察/分群/策略/活动）、活动执行模拟、报表分析、AI 助手、CDP 数据底座。
  - 前端为单页应用（React Router 6），各阶段页面位于 pages/plan/, pages/do/, pages/check/, pages/act/，共享逻辑抽至 hooks/。
  - 后端为单体 REST API：所有写操作立即返回执行状态；活动执行模拟写入 SQLite/JSON 后由前端“手动刷新”获取最新数据（无 WebSocket）。
  - 数据持久化：配置类数据走 LowDB/JSON，小体量易编辑；大规模客户/行为数据走 sql.js (SQLite) 查询，再缓存结果文件以提速。
  - AI 能力集中在 services/ai-service.ts 调用 Google Gemini，所有 AI 产出都记录来源、可手动覆盖。
  - Demo项目，不需要考虑性能，稳定，安全，认证等技术要求和功能

  ### Testing Strategy

  - 前端：Vitest + React Testing Library 覆盖组件/Hook；关键 PDCA 流程使用 Playwright 端到端脚本。
  - 后端：Vitest（或 Jest）覆盖 service/repository 层，Mock Gemini 和数据存储读取；集成测试验证 KPI→报表闭环。
  - 每个 change 至少附带：1) 主要逻辑单测；2) 关键路径 e2e；测试数据置于 test/fixtures/。
  - CI 运行 pnpm test --runInBand，策划/执行/报表模块单测覆盖率 ≥80%。

  ### Git Workflow

  - 仅维护两条长期分支：stable（稳定演示版）与 dev（持续开发版）。stable 必须随时可运行、无已知重大缺陷；所有新特性、修复先在 dev 上完成并通过验证后，再合并到 stable。
  - 每次合并进入 stable 前，必须完成 openspec validate <change-id> --strict、自动化测试及人工演示校验，合并后立即打版本标签（如 v1.2.0）便于回滚。
  - 开发阶段以 dev 为主，如需多人并行，可在 dev 基础上短期创建 feature/<change-id> 分支，完成后通过 PR 合回 dev 并删除临时分支。
  - 若 stable 线上出现紧急问题，可直接从 stable 派生 hotfix/<issue>，修复后先合回 stable（并打标签）、再同步回 dev，保证两条分支一致。
  - Commit 信息遵循 Conventional Commits，并在标题或正文引用对应的 OpenSpec change-id（例如 feat: add-campaign-ai assistant flow）；PR 模板必须列出 change-id、测试结果及验证说明。

  ## Domain Context

  - 电信行业 CVM Demo，模拟 AI 驱动的 PDCA 闭环：从 KPI 设定 → 数据洞察 → 分群 → 策略/活动 → 活动执行模拟 → 报表复盘。
  - KPI 包括 ARPU、流失率、VAS 渗透率等；分群可基于规则（示例：ARPU > 50）或 AI 推荐；策略区分“存量升档”“流失挽留”等。
  - 活动渠道涵盖短信、邮件、App Push，执行结果以模拟概率模型生成；报表按 Campaign/Strategy/Segment/Plan 四层呈现 KPI 贡献。
  - AI 助手需读取当前页面上下文（KPI 差距、分群特征、报表结果）并提供洞察/策略/文案/复盘建议，用户可随时覆盖 AI 输出。

  ## Important Constraints

  - Demo 必须可在离线环境运行：除 Gemini API 外，其余数据读写均本地；无网络时 不支持使用AI 演示。
  - 所有数据为匿名模拟，禁止导出；日志仅写抽象指标，不含个人信息。
  - KPI/报表刷新时间 ≤2 秒（在 10 万条客户数据规模下）；活动模拟需支持并发 10 个计划，保证手动刷新时数据一致。
  - AI 建议仅供参考，界面需标注风险提示；策略/活动必须支持手动编辑覆盖。
  - 前端UI 只支持英文 ，后端数据和表的数据也都使用引文 ，仅仅是输出的文档是中文，但文档标题，文档名字，文档中术语必须是英文

  ## External Dependencies

  - Google Gemini API（@google/generative-ai）：生成洞察、策略建议、报表解读、活动文案。
  - SQLite (sql.js)：承载 100k+ 客户与行为事件，实现洞察/分群/报表的聚合查询。
  - LowDB/JSON 文件：存储 KPI 定义、策略模板、分群配置、活动记录等小体量数据。
  - Ant Design 5 + ECharts 5：前端 UI 与可视化基础。
  - Axios：前端/后端统一 HTTP 客户端；提供重试/错误拦截，方便扩展外部 webhook（若未来需要）

    ## Terminology / 术语对照
  - Campaign Plan : 营销策划，或营销计划
  - Strategy : 策略
  - Segment : 分群
  - campaign : 营销活动
  - Campaign Canvas : 营销活动列表的菜单 ，同时也是营销活动的编辑页面