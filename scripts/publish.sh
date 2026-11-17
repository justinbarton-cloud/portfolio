#!/usr/bin/env bash
# Publishes the site to GitHub Enterprise Pages, behind Toast sign-in:
#   https://pages.github.toasttab.com/justinbarton-toast/portfolio/
#
# Personal GHE repos get no Actions runners, so there's no deploy workflow.
# This builds the static site under the Pages path, then pushes out/ to the
# gh-pages branch, which Pages serves. Run it from main after committing:
#
#   npm run publish
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain)" ]; then
  echo "Commit or stash your changes first, so what's published is what's on main."
  exit 1
fi

node scripts/registry.mjs
PAGES_BASE_PATH=/justinbarton-toast/portfolio npx next build
touch out/.nojekyll

site=$(mktemp -d)
if git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
  git fetch -q origin gh-pages
  git worktree add -q "$site" origin/gh-pages --detach
else
  git worktree add -q --detach "$site"
  (cd "$site" && git checkout -q --orphan gh-pages && git rm -rqf . && git clean -fdq)
fi
rsync -a --delete --exclude .git out/ "$site/"
(
  cd "$site"
  git add -A
  if git diff --cached --quiet; then
    echo "Nothing changed since the last publish."
  else
    git commit -qm "Publish $(git -C "$OLDPWD" rev-parse --short HEAD)"
    git push -q origin HEAD:gh-pages
    echo "Published. Live in a minute at https://pages.github.toasttab.com/justinbarton-toast/portfolio/"
  fi
)
git worktree remove --force "$site"
