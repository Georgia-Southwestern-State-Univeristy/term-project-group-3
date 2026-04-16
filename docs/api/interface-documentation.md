# Interface Documentation

## Overview

FitTrack Activity Logger is a browser-based single-page application (SPA) built with HTML, CSS, and JavaScript. The system does not expose a REST API or external web service. Instead, its primary interfaces are internal browser-side modules and the browser's Web Storage API.

This document explains the major system interfaces, module responsibilities, data flow, data structures, and expected failure behaviors so that another developer can understand, extend, or integrate with the system.

## System Context

FitTrack operates entirely on the client side and includes the following main interface layers:

- **User Interface Layer**
  - browser-rendered HTML and CSS
  - collects user input and displays workout data

- **Application Logic Layer**
  - JavaScript logic in `src/app.js`
  - validates input
  - coordinates workflow behavior
  - updates the user interface
  - calls the storage module

- **Persistence Layer**
  - JavaScript storage logic in `src/storage.js`
  - persists workout data using browser localStorage through the Web Storage API

## Major Internal Interfaces

### 1. User Interface to Application Logic

**Module:** `src/app.js`

This module acts as the controller between the DOM and the storage layer.

**Responsibilities:**

- listen for user actions
- validate workout form input
- prepare workout objects
- call storage methods
- refresh displayed workout data
- update empty-state or summary feedback

**Typical events handled:**

- add workout submission
- edit workout action
- delete workout action
- page load and initial render

### 2. Application Logic to Storage Interface

**Module:** `src/storage.js`

This module provides the persistence interface used by the rest of the application.

**Storage key:**

- `fittrack_workouts_v1`

**Core interface methods:**

#### `getWorkouts()`

**Purpose:** Read all saved workouts from localStorage.

**Input:** none

**Returns:** array of workout objects

**Behavior:**

- reads stored JSON from localStorage
- returns an empty array if no data exists
- catches JSON parsing errors and safely returns an empty array

#### `saveWorkout(workout)`

**Purpose:** Save a new workout entry.

**Input example:**

```js
{
  activity: "Running",
  duration: 30,
  date: "2026-04-15"
}
```
