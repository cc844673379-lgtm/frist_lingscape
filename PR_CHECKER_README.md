# PR 自动检查工具

本项目提供了完整的 PR review comment 自动检查方案。

## 快速开始

### 方案一：GitHub Actions（推荐，云端运行）

1. 首先安装 GitHub CLI
   - 下载地址：https://github.com/cli/cli/releases/latest
   - 下载 `.msi` 安装包并运行

2. 连接 GitHub 仓库
   ```bash
   gh auth login
   git remote add origin <你的仓库地址>
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

3. GitHub Actions 已配置完成！
   - 工作流文件位于：`.github/workflows/`
   - 每 30 分钟自动检查 PR 评论
   - 也可手动触发检查

### 方案二：本地 PowerShell 脚本

1. 安装 GitHub CLI（见方案一步骤 1）

2. 以管理员身份运行 PowerShell，执行：
   ```powershell
   cd D:\xiangling\xianglingv2
   .\scripts\check-prs.ps1
   ```

3. 可选参数：
   ```powershell
   # 单次检查
   .\scripts\check-prs.ps1 -OneTime
   
   # 自定义间隔时间（分钟）
   .\scripts\check-prs.ps1 -IntervalMinutes 60
   ```

## 文件说明

| 文件 | 说明 |
|------|------|
| `.github/workflows/pr-check.yml` | 基础 PR 检查工作流 |
| `.github/workflows/pr-monitor.yml` | 高级 PR 监控工作流 |
| `scripts/check-prs.ps1` | 本地 PowerShell 检查脚本 |

## 工作原理

- GitHub Actions：云端自动运行，无需保持电脑开机
- 本地脚本：在本地运行，可实时看到输出

## 使用前准备

1. ✅ 安装 GitHub CLI
2. ✅ 连接 GitHub 仓库
3. ✅ 创建至少一个 Pull Request

## 注意事项

- GitHub Actions 需要推送到远程仓库才会生效
- 本地脚本需要保持 PowerShell 窗口运行
- 首次使用需要用 `gh auth login` 登录 GitHub
