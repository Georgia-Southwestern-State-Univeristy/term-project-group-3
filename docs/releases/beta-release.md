# FitTrack Beta Release v0.1

## Release Information
- **Release Name:** FitTrack Beta
- **Tag:** beta-v0.1
- **Release Date:** 2026-04-03
- **GitHub Release Link:** [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/releases/tag/beta-v0.1]

---

## Overview

This Beta release represents a stable version of the FitTrack Activity Logger, a browser-based single-page application designed to help users log, track, and manage fitness activities. The system emphasizes simplicity, offline-first functionality, and ease of use.

---

## Major Features & Workflows

- Log a workout (type, duration, timestamp)
- View saved workouts in a list
- Edit existing workout entries
- Delete workout entries
- Persistent storage using browser localStorage
- Weekly summary view of workouts
- Data persists after page refresh

---

## Important Fixes (Since Week 10–11)

- Fixed issues with localStorage persistence reliability
- Resolved data loading issues on page initialization
- Improved edit workflow to correctly update existing entries
- Added handling for missing or corrupted localStorage data
- Stabilized CI pipeline (tests + formatting checks)

---

## Known Limitations

- No backend or database (data stored only in browser)
- No user authentication or multi-device sync
- Limited storage capacity (~5–10MB localStorage limit)
- Performance may degrade with large datasets
- No advanced filtering or analytics

---

## Notes for Reviewers

This Beta release is focused on demonstrating a complete, working workflow:
User logs workout → data is saved → displayed → edited → persists after refresh.

The system is intentionally designed as a lightweight, client-only application.

---

## Architecture Summary

FitTrack uses a simple SPA architecture:

- Frontend: HTML, CSS, JavaScript
- Storage: Browser localStorage (Web Storage API)
- CI/CD: GitHub Actions

Data Flow:
User Input → UI → localStorage → UI Display