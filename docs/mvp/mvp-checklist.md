# MVP Completion Checklist

## Evidence Requirements
| Evidence | Location | Status |

| **GitHub Project Board** | [Link to Board](https://github.com/orgs/Georgia-Southwestern-State-Univeristy/projects/25/views/1) | [x] Linked |
| **Board Screenshot** | `docs/images/board-midterm.png` | [ ] Attached |
| **CI Passing Screenshot** | [https://github.com/Georgia-Southwestern-State-Univeristy/term-project-group-3/actions]  | [ ] Attached |

---

## MVP Story Status
*Definition of "Done": Merged to main via PR, reviewed, CI passing, and runnable locally.*

| MVP Story                  | Status   | Acceptance Criteria / Notes |
| **Workout Logging**        | **Done** | Users can record an activity type and duration successfully. PR merged, CI passing. |
| **Workout Viewing**        | **Done** | Users can view a list of previously recorded activities. PR merged, CI passing. |
| **Local Data Persistence** | **Done** | Data is saved to `localStorage` and remains available after browser refresh. PR merged, CI passing. |
| **Workout Editing**        | **Done** | UI integration implemented. Deferred to Beta. |
| **Workout Deletion**       | **Done** | UI integration implemented. Deferred to Beta. |
| **Basic Summary Display**  | **Done** | Feature implemented. Deferred to Beta. |

---

## Top 3 Risks Heading into Beta
| #     | Risk                           | Severity | Mitigation Plan                                                                                        | Owner |
| **1** | **Client-Side Data Integrity** | High     | Implement strict input validation and standardized data models before storage.                         | @[Assignee] |
| **2** | **Integration Conflicts**      | Medium   | Use small pull requests, require CI checks to pass before merging, and clearly define data boundaries. | @[Assignee] |
| **3** | **localStorage Capacity**      | Low      | Keep MVP dataset small, structure JSON efficiently, and consider data pruning limits for the Beta.     | @[Assignee] |

---

## Team Sign-Off
|Name         | GitHub             | Reviewed Code | Can Demo App | Sign-Off Date |
|Gary Tates   | @C0D3-Y            |      Yes      |      Yes     | 2026-03-07 |
|Misbah Vahora| @MV-codes1         |      Yes      |      Yes     | 2026-03-07 |
|Khoa Nguyen  | @khoavannguyen1194 |      Yes      |      Yes     | 2026-03-07 |


**Certification Statement:**
By signing above, we certify that "Done" means the code is merged to main via PR, reviewed, CI is passing, and the application is runnable locally.
