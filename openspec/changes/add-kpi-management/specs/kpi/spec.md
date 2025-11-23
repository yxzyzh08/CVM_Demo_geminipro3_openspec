# KPI Management Specification

## ADDED Requirements

### Requirement: KPI Definition and Creation
系统 SHALL 提供 KPI 定义和创建功能，允许营销人员创建、编辑和删除关键绩效指标，每个 KPI 包含唯一标识、名称、Indicator type、描述、当前值、目标值和截止日期。

#### Scenario: Create new KPI
- **WHEN** 需要创建新的 KPI 指标时
- **THEN** 系统 SHALL 提供 KPI 创建表单，包含名称、指标类型类型选择、目标值和截止日期输入字段

#### Scenario: Create sub KPI
- **WHEN** 营销人员选中一个存在的KPI后，需要创建Sub KPI 指标时
- **THEN** 系统 SHALL 提供 KPI 创建表单，包含名称、指标类型类型选择、目标值和截止日期输入字段

#### Scenario: KPI Center View
1： KPI 列表是 树形结构，显示在左侧 
2： 默认进入后，右侧显示第一个KPI的详情，左侧默认选中第一个KPI 
3： KPI的布局和风格必须遵守 openspec/add-ui-style-guidelines/spec/ui-style/spec.md

#### Scenario: Edit existing KPI
- **WHEN** 营销人员需要修改 KPI 的目标值或截止日期时
- **THEN** 系统 SHALL 允许编辑 KPI 属性

#### Scenario: Delete KPI
- **WHEN** 营销人员删除不再需要的 KPI 时
- **THEN** 系统 SHALL 要求确认删除操作

### Requirement: Indicator Type Support
1-系统 SHALL 支持电信行业常用的 KPI 类型，包括 ARPU（Average Revenue Per User）、Churn Rate（流失率） 
2-指标类型是预先定义好的 ,定义 ， 它的价值也是提前计算好的，在项目初始化时候，利用 预先模拟生成的事件，计算出来的
3-数据源来自CDP模块  

#### Scenario: ARPU indicator type
- **WHEN** 创建 ARPU 类型的 KPI 时
- **THEN** 系统 SHALL 使用货币单位显示当前值和目标值，货币单位是美元

#### Scenario: Churn Rate indicator type
- **WHEN** 创建 Churn Rate 类型的 KPI 时
- **THEN** 系统 SHALL 使用百分比格式显示，并支持季度或月度粒度

### Requirement: KPI Target and Deadline Management
系统 SHALL 允许为每个 KPI 设置目标值和截止日期，支持绝对值目标（如"ARPU 达到 50 元"）和相对值目标（如"流失率降低 2 个百分点"）。

#### Scenario: Set absolute target value
- **WHEN** 营销人员为 ARPU 设置目标值 50 时
- **THEN** 系统 SHALL 记录目标值，并在 KPI 详情中显示当前值与目标值的差距

#### Scenario: Set relative target value
- **WHEN** 营销人员为 Churn Rate 设置"降低 2 pp"目标时
- **THEN** 系统 SHALL 基于起始值计算目标值，并跟踪相对变化


### Requirement: KPI Current Value Tracking
系统 SHALL 从 CDP 数据平台自动获取 KPI 的当前值，支持定时自动刷新，刷新时间间隔不超过 5 秒（在 10 万条客户数据规模下）。

#### Scenario: Automatic value refresh
- **WHEN** 用户打开 KPI 详情页面时
- **THEN** 系统 SHALL 自动从 CDP 获取档期 KPI 的最新当前值并显示


### Requirement: KPI Historical Trend Visualization
系统 SHALL 可以显示 KPI 的历史值变化，并提供趋势图表可视化，支持按日、周、月粒度查看历史趋势 ，数据来CDP 获取

#### Scenario: View KPI trend chart
- **WHEN** 用户在 KPI 详情页查看趋势图表时
- **THEN** 系统 SHALL 使用 ECharts 折线图显示历史值变化，包含目标值基准线

#### Scenario: Historical data recording
- **WHEN** KPI 当前值发生变化时
- **THEN** 系统 SHALL 记录时间戳和新值到历史记录表

#### Scenario: Query KPI by Date 
1：支持指定某一天查询KPI ，可以查询未来的某一天，因为数据是模拟的，所以可能有未来的数据

### Requirement: KPI Achievement Status Evaluation
系统 SHALL 自动评估 KPI 达成状态，根据当前值、目标值和截止日期计算完成进度，并使用语义色彩标识状态（达成/进行中/风险/逾期）。

#### Scenario: Achievement status - On Track
- **WHEN** 当前值已达到目标值且未超过截止日期时
- **THEN** 系统 SHALL 显示 "Achieved" 状态，使用绿色标识

#### Scenario: Achievement status - In Progress
- **WHEN** 当前值未达到目标但且未超过截止日期时
- **THEN** 系统 SHALL 显示 "In Progress" 状态，使用蓝色标识，并显示完成百分比

#### Scenario: Achievement status - At Risk
- **WHEN** 当前值未达到目标且临近截止日期 7天之内
- **THEN** 系统 SHALL 显示 "At Risk" 状态，使用橙色告警

#### Scenario: Achievement status - Overdue
- **WHEN** 超过截止日期但未达到目标值时
- **THEN** 系统 SHALL 显示 "Overdue" 状态，使用红色标识

### Requirement: KPI Progress Indicator
系统 SHALL 提供可视化的进度指示器，显示 KPI 完成百分比、起始值、当前值、目标值和剩余时间。

#### Scenario: Progress percentage display
- **WHEN** 起始值为 45，当前值为 48，目标值为 50 时
- **THEN** 系统 SHALL 计算并显示进度为 60%（(48-45)/(50-45)）

#### Scenario: Remaining time display
- **WHEN** 截止日期为 2025-12-31，当前日期为 2025-11-01 时
- **THEN** 系统 SHALL 显示剩余时间为"60 天"或"2 个月"

#### Scenario: Visual progress bar
- **WHEN** 显示 KPI 进度时
- **THEN** 系统 SHALL 使用进度条组件，根据完成百分比填充颜色，并标注起始值、当前值和目标值位置


### Requirement: KPI Detail View
系统 SHALL 提供 KPI 详情页面，展示完整的 KPI 信息、历史趋势图表、达成状态分析和关联的营销计划。


#### Scenario: View KPI details
- **WHEN** 用户点击 KPI 列表中的某个 KPI 时
- **THEN** 系统 SHALL 显示 KPI 详情页，显示完整的 KPI 属性、趋势图表和状态评估

#### Scenario: View related marketing plans
- **WHEN** 用户在 KPI 详情页查看关联的营销计划时
- **THEN** 系统 SHALL 显示所有针对该 KPI 创建的 Marketing Plan 列表 

### Requirement: KPI Search and Navigation
系统 SHALL 提供 KPI 搜索功能，支持按 KPI 名称、Indicatory Type 搜索。

#### Scenario: Search by KPI name
- **WHEN** 用户在搜索框输入 KPI 名称关键词时
- **THEN** 系统 SHALL 实时过滤并显示名称匹配的 KPI 列表

#### Scenario: Search by Indicator Type
- **WHEN** 用户按指标类型（如 ARPU、Churn Rate）筛选时
- **THEN** 系统 SHALL 显示该类型的所有 KPI

### Requirement: KPI Data Validation
系统 SHALL 验证 KPI 输入数据的有效性，包括目标值格式、截止日期合理性和数值范围检查。

#### Scenario: Target value format validation
- **WHEN** 用户为 ARPU 类型 KPI 输入非数字的目标值时
- **THEN** 系统 SHALL 显示错误提示 "目标值必须为数字"

#### Scenario: Deadline date validation
- **WHEN** 用户设置截止日期早于当前日期时
- **THEN** 系统 SHALL 显示警告 "截止日期不能早于今天"

#### Scenario: Value range validation
- **WHEN** 用户为 Churn Rate 输入大于 100% 的目标值时
- **THEN** 系统 SHALL 显示错误 "流失率不能超过 100%"

### Requirement: KPI Data Insight
系统 SHALL 为每个 KPI 提供 "Data Insight" 按钮，链接到 Report 模块，展示这个KPI的子KPI。

#### Scenario: Navigate to Data Insight
- **WHEN** 用户点击 KPI 的 "Data Insight" 按钮时
- **THEN** 系统 SHALL 导航到 Report 模块，并显示该 KPI 的的各种维度的下钻指标


### Requirement: KPI Marketing Plan Integration
系统 SHALL 支持从 KPI 创建关联的营销计划，并自动建立 KPI 与 Marketing Plan 的关联关系。

#### Scenario: Marketing plan creation from KPI
- **WHEN** 用户从 KPI 详情页创建营销计划时
- **THEN** 系统 SHALL 自动关联该 KPI 到新创建的 Marketing Plan