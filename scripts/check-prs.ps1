# PR Checker Script
# 用于检查 GitHub PR 的 review comments

param(
    [int]$IntervalMinutes = 30,
    [switch]$OneTime
)

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  PR Review Comment Checker" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

function Check-GitHubCLI {
    try {
        $ghVersion = gh --version
        if ($ghVersion) {
            Write-Host "[OK] GitHub CLI is installed: $ghVersion" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "[ERROR] GitHub CLI not found!" -ForegroundColor Red
        Write-Host "Please install GitHub CLI from: https://github.com/cli/cli/releases" -ForegroundColor Yellow
        return $false
    }
}

function Check-GitRepo {
    try {
        $gitStatus = git status 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Git repository detected" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "[ERROR] Not a git repository!" -ForegroundColor Red
        return $false
    }
}

function Get-PRList {
    try {
        $prs = gh pr list --json number,title,state,updatedAt --limit 10
        if ($prs) {
            return $prs | ConvertFrom-Json
        }
        return @()
    } catch {
        Write-Host "[WARNING] Could not fetch PR list" -ForegroundColor Yellow
        return @()
    }
}

function Get-PRReviews($prNumber) {
    try {
        $reviews = gh pr view $prNumber --json reviews
        if ($reviews) {
            $data = $reviews | ConvertFrom-Json
            return $data.reviews
        }
        return @()
    } catch {
        return @()
    }
}

function Get-PRComments($prNumber) {
    try {
        $comments = gh pr view $prNumber --json comments
        if ($comments) {
            $data = $comments | ConvertFrom-Json
            return $data.comments
        }
        return @()
    } catch {
        return @()
    }
}

function Monitor-PRs {
    while ($true) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Host ""
        Write-Host "[$timestamp] Checking PRs..." -ForegroundColor Cyan
        
        $prs = Get-PRList
        
        if ($prs.Count -eq 0) {
            Write-Host "  No open PRs found" -ForegroundColor Gray
        } else {
            Write-Host "  Found $($prs.Count) open PR(s)" -ForegroundColor Green
            
            foreach ($pr in $prs) {
                Write-Host ""
                Write-Host "  PR #$($pr.number): $($pr.title)" -ForegroundColor White
                
                $reviews = Get-PRReviews -prNumber $pr.number
                $comments = Get-PRComments -prNumber $pr.number
                
                if ($reviews.Count -gt 0 -or $comments.Count -gt 0) {
                    Write-Host "  [ACTIVITY DETECTED]" -ForegroundColor Yellow
                    
                    if ($reviews.Count -gt 0) {
                        Write-Host "    Reviews: $($reviews.Count)" -ForegroundColor Cyan
                        foreach ($review in $reviews) {
                            Write-Host "      - $($review.author.login) [$($review.state)]" -ForegroundColor Gray
                            if ($review.body) {
                                Write-Host "        $($review.body.Substring(0, [Math]::Min(50, $review.body.Length)))" -ForegroundColor Gray
                            }
                        }
                    }
                    
                    if ($comments.Count -gt 0) {
                        Write-Host "    Comments: $($comments.Count)" -ForegroundColor Cyan
                        foreach ($comment in $comments) {
                            Write-Host "      - $($comment.author.login): $($comment.body.Substring(0, [Math]::Min(50, $comment.body.Length)))" -ForegroundColor Gray
                        }
                    }
                } else {
                    Write-Host "    No recent activity" -ForegroundColor Gray
                }
            }
        }
        
        if ($OneTime) {
            Write-Host ""
            Write-Host "One-time check complete. Exiting." -ForegroundColor Green
            break
        }
        
        Write-Host ""
        Write-Host "Waiting $IntervalMinutes minutes before next check..." -ForegroundColor Gray
        Start-Sleep -Seconds ($IntervalMinutes * 60)
    }
}

# Main execution
$ghReady = Check-GitHubCLI
$gitReady = Check-GitRepo

if ($ghReady -and $gitReady) {
    Write-Host ""
    Write-Host "All checks passed! Starting PR monitor..." -ForegroundColor Green
    Monitor-PRs
} else {
    Write-Host ""
    Write-Host "Please fix the issues above and try again." -ForegroundColor Red
    exit 1
}
