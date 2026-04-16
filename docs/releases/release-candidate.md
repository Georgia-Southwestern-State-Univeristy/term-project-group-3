# Release Candidate Summary

## Release Candidate Information
- **Release Candidate Tag:** `rc-v0.9`
- **Release Date:** April 16, 2026
- **Release Artifact / GitHub Release:** [Release Candidate v0.9]https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/releases/tag/rc-v0.9

## Overview
This release candidate represents the near-final state of the FitTrack Activity Logger. At this stage, the core user workflows are expected to be stable, documented, and ready for final verification before the final release. The system remains a browser-based single-page application built with HTML, CSS, and JavaScript, with workout data persisted locally through the Web Storage API.

## Core Workflows Expected to Be Stable
The following workflows are expected to be stable in this release candidate:

1. **Log a workout**
   - User enters workout details such as activity type, duration, and date
   - Workout is saved to browser localStorage
   - New record appears in the workout list

2. **View saved workouts**
   - User can view previously entered workout entries
   - Data remains available after page refresh because it is stored locally

3. **Edit a workout**
   - User can update an existing workout entry
   - Changes are reflected in the interface and persisted in storage

4. **Delete a workout**
   - User can remove an existing workout entry
   - Deleted entry is removed from both the UI and localStorage

5. **Basic summary and feedback behavior**
   - Workout data is re-rendered after changes
   - Empty-state messaging and validation behavior improve usability

## Major Differences from Beta
Compared with the Beta release, this release candidate reflects a more stable and polished product state.

Major differences from Beta include:
- improved reliability of core workout workflows
- stronger validation for workout input fields
- improved storage error handling and safer localStorage interactions
- clearer user feedback for empty states and invalid input
- additional workflow verification and near-final documentation
- improved repository readiness for final review

## Remaining Known Risks Before Final Release
Although the system is close to final, several risks remain:
- the application still depends entirely on browser localStorage
- there is no multi-device sync or user account support
- large volumes of stored workout data may reduce performance over time
- there is no backend recovery path if browser storage is cleared
- final integration and polish issues may still be discovered during final verification

## What Must Still Be Completed in Week 15–16
The following items must still be completed before final release:
- final bug triage fixes for remaining critical and important issues
- final repository cleanup and documentation alignment
- final walkthrough and presentation readiness checks
- final validation that all core workflows pass the documented run path
- final review of release notes, handoff material, and reviewer guidance

## Release Readiness Statement
This release candidate should be understood as a near-final build rather than an early milestone. The product’s primary user workflows are implemented and expected to function reliably for evaluation. Remaining work is focused on final bug fixing, documentation alignment, and presentation readiness rather than major feature expansion.