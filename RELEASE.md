# 发布指南

本项目使用 GitHub Actions 实现自动构建和发布。

## 快速发布

发布新版本只需三步：

```bash
# 1. 更新版本号
npm run version 1.0.1

# 2. 提交更改
git add package.json manifest.json
git commit -m "chore: bump version to 1.0.1"
git push

# 3. 创建发布标签（自动触发构建）
npm run release
```

## 详细说明

### 1. 本地构建

```bash
# 安装依赖
npm install

# 构建扩展（生成 dist/markdown-viewer-mermaid-plus.zip）
npm run build
```

### 2. 版本管理

```bash
# 更新版本号（同时更新 package.json 和 manifest.json）
npm run version <version>

# 例如：
npm run version 1.1.0  # 主版本
npm run version 1.0.1  # 补丁版本
```

### 3. 发布新版本

```bash
# 自动创建标签并推送，触发 GitHub Actions 构建
npm run release
```

## GitHub Actions 工作流

- **触发条件**：
  - 推送标签：`git push origin v1.0.0`
  - 手动触发：在 GitHub Actions 页面手动运行

- **自动化流程**：
  1. 检出代码
  2. 安装依赖
  3. 构建扩展
  4. 创建 GitHub Release
  5. 上传打包文件

## 手动触发发布

如果需要手动触发构建（不创建 Git 标签）：

1. 访问 https://github.com/xiaozhuang0433/markdown-viewer-mermaid-plus/actions
2. 选择 "Build and Release" 工作流
3. 点击 "Run workflow"
4. 输入版本号（如 v1.0.0）
5. 点击运行

## 发布检查清单

- [ ] 更新版本号
- [ ] 测试所有功能
- [ ] 更新 CHANGELOG.md（如果有）
- [ ] 提交所有更改
- [ ] 创建并推送标签
- [ ] 验证 GitHub Actions 构建成功
- [ ] 下载并测试构建的扩展
