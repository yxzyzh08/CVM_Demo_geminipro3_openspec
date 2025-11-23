## ADDED Requirements

### Requirement: Global Layout and Navigation
应用 MUST (必须) 使用响应式布局，并包含可折叠的侧边导航菜单。

#### Scenario: Menu Structure
- **WHEN** 用户访问应用时
- **THEN** 侧边导航菜单 MUST (必须) 可见，且包含 "KPI Center", "Marketing Plan", "Campaign Execution", "Reporting", 和 "CDP"
- **AND** 当处于 "Marketing Plan" (营销策划) 的任何子步骤时，该菜单项 SHOULD (应) 处于高亮/激活状态

#### Scenario: Header Information
- **WHEN** 用户浏览任何页面时
- **THEN** 顶部 Header MUST (必须) 显示当前用户 Profile 和一个全局的 "AI Assistant" (AI 助手) 切换按钮

### Requirement: KPI Center UI
KPI Center 界面 MUST (必须) 采用卡片式布局来展示关键绩效指标，并包含趋势可视化。

#### Scenario: KPI Card Display
- **WHEN** 用户浏览 KPI Center 时
- **THEN** 每个 KPI (例如 ARPU, Churn Rate) MUST (必须) 展示在独立的卡片 (Card) 中
- **AND** 卡片 MUST (必须) 显示 "Current Value" (当前值), "Target Value" (目标值), 并根据差距显示进度条或红/绿状态指示器

### Requirement: Marketing Campaign Flow UI
Marketing Campaign 模块 MUST (必须) 使用分步向导界面 (Step Bar) 来引导用户完成 PDCA 策划阶段。

#### Scenario: Step Navigation
- **WHEN** 用户创建或编辑 Campaign Plan 时
- **THEN** 顶部 MUST (必须) 显示水平的 Step Bar，包含: "1. Insights" -> "2. Segments" -> "3. Strategy" -> "4. Campaign"
- **AND** 当前所处的步骤 MUST (必须) 在视觉上显示为激活状态

#### Scenario: AI Interaction in Wizard
- **WHEN** 用户处于任何步骤中 (例如 "Step 1: Insights" 或 "Step 2: Segments")
- **THEN** 界面 MUST (必须) 突出显示 "Auto-Generate" 或 "AI Suggestion" 按钮
- **AND** 点击该按钮后，SHOULD (应) 填充表单或展示 AI 生成的详细内容 (参考 `AI_Create_campaign_step_*.png`)

### Requirement: AI Assistant UI
AI Assistant MUST (必须) 提供一个具备上下文感知能力的对话式交互界面。

#### Scenario: Floating Assistant
- **WHEN** 点击 AI 机器人图标时
- **THEN** 聊天面板 MUST (必须) 从屏幕右侧滑入或作为悬浮窗弹出
- **AND** 面板 MUST (必须) 显示对话历史记录，以及用于输入新 Prompt 的区域