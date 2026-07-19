# Run after creating GitHub org "wikiprice-uganda" at https://github.com/organizations/plan
$ErrorActionPreference = "Stop"
$org = "wikiprice-uganda"
$oldRepo = "lynn-sketch/wikiprice"
$newRepoName = "wikiprice-uganda.github.io"

Write-Host "Checking org $org exists..."
gh api "orgs/$org" | Out-Null

Write-Host "Transferring repository to $org..."
gh api -X POST "repos/$oldRepo/transfer" -f new_owner=$org

Write-Host "Waiting for transfer to complete..."
Start-Sleep -Seconds 5

Write-Host "Renaming repo to $newRepoName..."
gh repo rename $newRepoName -R "$org/wikiprice" -y

Write-Host "Enabling GitHub Pages..."
gh api -X POST "repos/$org/$newRepoName/pages" -f build_type=workflow

Write-Host "Updating local git remote..."
git remote set-url origin "https://github.com/$org/$newRepoName.git"

Write-Host "Done. Live site: https://$org.github.io/"
