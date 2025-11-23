# Change: Add UI Style Guidelines

## Why
当前项目缺乏统一的 UI 风格指南，导致开发过程中组件使用不一致，界面视觉效果参差不齐。建立统一的 UI 规范可以提升用户体验，降低沟通成本，并提高开发效率。

## What Changes
- 新增 `ui-style` capability。
- 定义全局的颜色、字体、间距等基础设计令牌 (Design Tokens)。
- 规范常用 Ant Design 组件（如 Button, Card, Table）的默认样式和扩展用法。

## Impact
- Affected specs: `ui-style` (New)
- Affected code: `src/styles/`, `src/components/`, `src/App.tsx` (Theme Config)
