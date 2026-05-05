#!/bin/bash
CURRENT_BRANCH="fix/repo-cleanup"

JUNK_FILES=(
  ".prettierrc.json"
  "eslintrc.json"
  ".eslintrc.json"
  "README (1).md"
  "INTERN - DELIVERABLES CHECKLIST.txt"
  "Week 7 deliverables.txt"
)

for branch in \
  "C0D3-Y-patch-3" \
  "C0D3-Y-patch-4" \
  "Part-C-Initial" \
  "WEEK16-FINAL-RELEASE-REPO-CHECK" \
  "Week-10-Auth-Access-Control" \
  "beta-bug-triage" \
  "docs/fittrack-backend-setup" \
  "docs/mvp/release-notes-midterm.md" \
  "docs/part-b-blueprints" \
  "feat/demo-path-tests" \
  "feat/logging-and-viewing" \
  "feat/mock-login" \
  "feat/workout-core-features" \
  "feature/week-12-ci-summary-triage-list" \
  "fix/format-week10-ux-md" \
  "fix/issue-2-write-failures" \
  "fix/issue-3-daily-limits" \
  "fix/issue-5-duplicate-prevention" \
  "khoa_week13" \
  "khoavannguyen1194-patch-1" \
  "khoavannguyen1194-patch-10" \
  "khoavannguyen1194-patch-11" \
  "khoavannguyen1194-patch-12" \
  "khoavannguyen1194-patch-13" \
  "khoavannguyen1194-patch-14" \
  "khoavannguyen1194-patch-15" \
  "khoavannguyen1194-patch-16" \
  "khoavannguyen1194-patch-17" \
  "khoavannguyen1194-patch-18" \
  "khoavannguyen1194-patch-19" \
  "khoavannguyen1194-patch-2" \
  "khoavannguyen1194-patch-20" \
  "khoavannguyen1194-patch-21" \
  "khoavannguyen1194-patch-22" \
  "khoavannguyen1194-patch-23" \
  "khoavannguyen1194-patch-24" \
  "khoavannguyen1194-patch-25" \
  "khoavannguyen1194-patch-26" \
  "khoavannguyen1194-patch-27" \
  "khoavannguyen1194-patch-3" \
  "khoavannguyen1194-patch-4" \
  "khoavannguyen1194-patch-5" \
  "khoavannguyen1194-patch-6" \
  "khoavannguyen1194-patch-7" \
  "khoavannguyen1194-patch-8" \
  "khoavannguyen1194-patch-9" \
  "khoaweek14/EvidencePackage" \
  "part-c-readme-final" \
  "presentationplan-week15" \
  "repo" \
  "week-13-architecture" \
  "week-14-maintenance-guide-triage" \
  "week-7-mvp-demo-readiness" \
  "week-8-mvp-demo-evidence" \
  "week10-beta" \
  "week12-beta-release" \
  "week13-quality-maintainability" \
  "week14-release-candidate-docs" \
  "week15-final-readiness" \
  "week15-final-readiness-evidence-package" \
  "week16-final-release" \
  "week7-scope-update" \
  "week8-mvp-demo-evidence"; do

  echo ""
  echo "============================================"
  echo "Cleaning: $branch"
  echo "============================================"

  git checkout "origin/$branch" -b "cleanup/$branch" 2>/dev/null || git checkout "$branch" 2>/dev/null

  if [ $? -ne 0 ]; then
    echo "  WARNING: Could not checkout $branch -- skipping"
    continue
  fi

  REMOVED=()

  for file in "${JUNK_FILES[@]}"; do
    if [ -f "$file" ]; then
      git rm "$file"
      REMOVED+=("$file")
      echo "  REMOVED: $file"
    fi
  done

  if [ ${#REMOVED[@]} -eq 0 ]; then
    echo "  INFO: No junk files found -- skipping commit"
    git checkout "$CURRENT_BRANCH" 2>/dev/null
    git branch -D "cleanup/$branch" 2>/dev/null
    continue
  fi

  git commit -m "chore: remove duplicate config and junk files

Removed: ${REMOVED[*]}

Keeping: .prettierrc (not .prettierrc.json)
Keeping: eslint.config.js (not eslintrc.json/.eslintrc.json)"

  git push origin HEAD:"$branch"
  echo "  PUSHED to origin/$branch"

  git checkout "$CURRENT_BRANCH" 2>/dev/null
  git branch -D "cleanup/$branch" 2>/dev/null
done

echo ""
echo "============================================"
echo "All done! Returning to $CURRENT_BRANCH"
echo "============================================"
git checkout "$CURRENT_BRANCH"
