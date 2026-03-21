# FitTrack MVP Demo Readiness Checklist

**Version:** 1.0  
**Last Updated:** 2026-02-28  
**Demo Duration:** 5-6 minutes  
**Target Audience:** Dr. Hobbs, peers

---

## 1. Demo Overview

**Application:** FitTrack - Simple Fitness Activity Logger  
**Core Value Proposition:** "Log any activity in 10 seconds, no signup required"

**Live URLs:**

- Local: `http://localhost:3000` (or your port)
- Deployed: [Your Netlify/Vercel URL here]

**Demo Flow (5 minutes):**

- **0:00-0:30** Introduction & Seeded State
- **0:30-1:30** Add First Workout (with notes)
- **1:30-2:30** Add 2 More Workouts (build data)
- **2:30-3:30** Weekly Summary View
- **3:30-4:00** Edit Feature Demo
- **4:00-4:30** Delete Feature Demo
- **4:30-5:00** Persistence Proof (refresh)
- **5:00-5:30** Q&A Buffer

---

## 2. Pre-Demo Checklist (5 Minutes Before)

### Environment Setup

- [ ] Open Chrome/Firefox in **Incognito/Private** window
- [ ] Navigate to app URL
- [ ] Open DevTools (F12) → Console tab (clear it)
- [ ] Open DevTools → Application → LocalStorage (keep handy)

### Quick Data Reset

Run in console before each demo:

```javascript
localStorage.clear();
location.reload();

---


---

## 3. Known Issues & Mitigation

| Issue | Likelihood | Impact | Mitigation |
|-------|------------|--------|------------|
| localStorage blocked in Private/Incognito mode | Medium | High | Switch to regular browser window; mention "in production this would use a database" |
| Date picker shows wrong format (US vs EU) | Low | Medium | Use calendar picker instead of typing; show ISO format |
| Edit feature doesn't save changes | Low | High | Demonstrate add/delete instead (core MVP); show code logic in VS Code |
| Weekly Summary empty/incorrect math | Low | Medium | Pre-seed 3+ entries before demo; have screenshot ready |
| Form validation fails silently | Medium | High | Always fill ALL fields; check console for errors |
| Page refresh wipes data | Medium | CRITICAL | Have localStorage tab open in DevTools to prove persistence |

---

## 4. Seed Data Plan

**Purpose:** Ensure consistent demo experience regardless of previous usage.

// Seed data for demo reliability
function seedDemoData() {
  if (!localStorage.getItem('workouts') || JSON.parse(localStorage.getItem('workouts')).length === 0) {
    const demoData = [
      { id: 1, date: '2026-02-25', activity: 'Running', duration: 30, notes: 'Morning jog' },
      { id: 2, date: '2026-02-26', activity: 'Weights', duration: 45, notes: 'Upper body' },
      { id: 3, date: '2026-02-27', activity: 'Yoga', duration: 20, notes: 'Stretching' }
    ];
    localStorage.setItem('workouts', JSON.stringify(demoData));
  }
}
// Call on app load
seedDemoData();

---

## 5. Fallback Plan

| Failure Scenario | Backup Action | What to Say |
|------------------|---------------|-------------|
| localStorage completely broken | Open VS Code → Show code | "In production this uses a database. Here's the localStorage implementation." |
| Cannot add/edit/delete (JS error) | Show console error → Explain | "This error handling shows what went wrong—here's our try-catch block." |
| Screen goes blank (white page) | Hard refresh (Ctrl+F5) | "Let me clear cache and reload. This demonstrates error recovery." |
| Weekly Summary shows NaN | Skip to persistence demo | "Let's verify the core feature—data persistence across sessions." |
| Demo exceeds 7 minutes | Jump to persistence proof | "Let me fast-forward to our key MVP feature." |
| Laptop dies/crashes | Phone screenshot backup | "I have a screenshot backup—here's the working app." |

### Nuclear Option (Total App Failure):
If app won't load at ALL:
1. Open `index.html` and `app.js` in VS Code
2. Walk through code showing:
   - How data is captured (form event listeners)
   - How it's stored (`localStorage.setItem`)
   - How it's retrieved (`localStorage.getItem`)
   - How it's displayed (DOM manipulation)
3. Run `localStorage.setItem('test', 'works')` in browser console to prove concept

---

## 6. Detailed Step-by-Step Script (Granular Actions)

| Step | Time | Action | Exact Clicks/Text | Expected Result | Plan B if Fail |
|------|------|--------|-------------------|-----------------|----------------|
| 1 | 0:00 | Open app | Navigate to URL | Empty form + empty list visible | Show VS Code source |
| 2 | 0:30 | Add Entry #1 | Click "Add" → Activity: "Running" → Duration: "30" → Date: Today → Save | Entry appears in list | Check console for errors |
| 3 | 1:30 | Add Entry #2 | Click "Add" → Activity: "Cycling" → Duration: "45" → Save | 2 entries in list | Skip to Edit demo |
| 4 | 2:30 | Add Entry #3 | Activity: "Swimming" → Duration: "20" → Save | 3 entries, summary updates | Show seed data instead |
| 5 | 3:00 | Edit Demo | Click "Edit" on Entry #1 → Change duration to "35" → Save | Entry updates, summary recalculates | Skip to Delete |
| 6 | 3:30 | Delete Demo | Click "Delete" on Entry #2 → Confirm | Entry 2 removed, list reorders | Show delete code in VS Code |
| 7 | 4:00 | Persistence Proof | Press F5 to refresh | All 2 remaining entries still visible | Show Application → LocalStorage in DevTools |
| 8 | 4:30 | Verify Storage | Open DevTools → Application → LocalStorage | Show JSON data stored | Run `localStorage.getItem('workouts')` in console |
| 9 | 5:00 | Q&A Buffer | Ask for questions | - | - |
```
