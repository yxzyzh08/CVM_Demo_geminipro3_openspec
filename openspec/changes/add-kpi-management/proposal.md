# Change: Add KPI Management

## Why
KPI (Key Performance Indicator) 管理是 PDCA 营销闭环的起点 (Plan 阶段)。当前系统缺乏定义和跟踪营销目标的基础能力。需要实现 KPI 的增删改查及趋势查看功能，以便为后续的洞察和策略制定提供目标指引。

## What Changes
- 新增 `kpi` capability。
- 后端：实现 KPI 数据的 CRUD 接口，使用 LowDB/JSON 存储。
- 前端：实现 KPI 管理页面，支持设置目标值、当前值、截止日期，并展示历史趋势图表。

## Impact
- Affected specs: `kpi` (New)
- Affected code: `src/server/services/kpi-service.ts`, `src/server/controllers/kpi-controller.ts`, `src/pages/kpi/`, `src/types/kpi.ts`
