# 安装指南

## Chrome / Edge 浏览器

### 第一步：确保已安装 Markdown Viewer

1. 访问 [Chrome 应用商店](https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk)
2. 安装 Markdown Viewer 插件
3. 打开 `chrome://extensions`（Edge 是 `edge://extensions`）
4. 找到 Markdown Viewer，点击"详细信息"
5. **开启"允许访问文件网址"**（这一步很重要！）

### 第二步：安装 Markdown Viewer Mermaid Plus

1. 打开浏览器扩展管理页面
   - Chrome: 地址栏输入 `chrome://extensions`
   - Edge: 地址栏输入 `edge://extensions`

2. 开启右上角的 **"开发者模式"** 开关

3. 点击 **"加载已解压的扩展程序"** 按钮

4. 在文件选择器中，选择本插件的文件夹：`markdown-viewer-mermaid-plus`

5. 安装完成！你会看到 "Markdown Viewer Mermaid Plus" 出现在扩展列表中

### 第三步：测试

1. 用浏览器打开一个包含 Mermaid 图表的 `.md` 文件
2. 等待页面加载完成
3. 鼠标悬停在 Mermaid 图表上，应该看到右上角出现 ⛶ 按钮
4. 点击按钮或双击图表，进入全屏模式

## Firefox 浏览器

1. 打开 `about:debugging#/runtime/this-firefox`
2. 点击"临时载入附加组件"
3. 选择本插件文件夹中的 `manifest.json` 文件

## 使用技巧

### 普通模式
- **缩放**：Shift + 滚轮
- **平移**：鼠标拖拽

### 全屏模式
- **进入全屏**：点击 ⛶ 按钮 或 双击图表
- **缩放**：直接滚动滚轮（无需 Shift）
- **平移**：鼠标拖拽
- **退出全屏**：ESC 键 或 再次点击 ⛶ 按钮

## 故障排除

### 问题：看不到全屏按钮

**解决方案：**
1. 确认 Markdown Viewer 已安装并启用
2. 确认文件是 `.md` 或 `.markdown` 格式
3. 等待页面完全加载
4. 刷新页面重试

### 问题：全屏后无法缩放

**解决方案：**
1. 检查浏览器控制台是否有错误（F12 打开开发者工具）
2. 确认原 Markdown Viewer 中的 Panzoom 库已加载
3. 刷新页面重试

### 问题：文件无法打开

**解决方案：**
1. 检查 Markdown Viewer 的"允许访问文件网址"是否开启
2. 检查 Chrome 的安全浏览设置（设为"标准保护"）

## 更新插件

修改代码后，在扩展管理页面点击本插件的 **"刷新"** 图标即可生效。
