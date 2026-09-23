# Technique Detail Contract

This document defines the minimum product contract for DojoMap's v0.3.0 technique-detail experience. It describes observable behavior and information requirements without choosing the final domain shape, component structure, or visual treatment.

The model evolution that supports this contract belongs to DM-046. The complete release scope is defined in [`V0.3.0.md`](../V0.3.0.md).

## Purpose

Technique detail supplements the curriculum map with focused instructional context. It does not replace the curriculum, become a technique library, or attempt to record a student's progress.

The experience must answer three questions:

1. What is this technique?
2. Where does it appear in the current curriculum?
3. What supporting material is available?

## Eligibility

A curriculum item has exactly one of these interaction outcomes:

| Item state | Required behavior |
| --- | --- |
| Technique with a resolvable internal detail reference | Opens the technique-detail experience. |
| Item whose defined destination is an external resource | Continues to open that external resource safely. |
| Item without an available destination | Remains readable, non-interactive curriculum content. |
| Internal reference that cannot be resolved | Remains non-interactive; it must not open an empty or broken detail experience. |

Form and knowledge items do not gain detail behavior in v0.3.0.

## Minimum Resolved Detail

Before the detail experience opens, the application must be able to resolve:

- a stable technique identifier;
- the technique name;
- a concise, student-facing description;
- the curriculum rank identifier and display name where the selected item appears;
- the belt identity needed to communicate that rank visually; and
- an ordered collection of zero or more supported resources.

Rank context is derived from the selected curriculum occurrence. It is not copied into the technique definition.

## Supported Resources

Resources retain their dataset order. The experience supports:

- **Video** — displays a descriptive label and opens its valid HTTP(S) URL as a safe external link.
- **Article** — displays a descriptive label and opens its valid HTTP(S) URL as a safe external link.
- **Note** — displays its text inline and never receives link styling or link semantics.

A technique may contain several resources of the same or different types. Rendering one resource must not replace, hide, or reorder another.

A technique with no resources still renders its name, description, and rank context as a complete detail experience. It must not show broken links, disabled resource controls, or an empty resource container.

Embedded video, media hosting, downloads, and resource editing are not part of this contract.

## Opening Behavior

- An eligible technique has visible hover, focus, active, and touch feedback.
- It uses a native interactive control appropriate for an in-page action.
- Pointer activation, touch activation, Enter, and Space select the same technique.
- Opening details does not navigate to another page, change the URL, or reset the curriculum.
- Only one technique is selected at a time.
- The detail experience displays information resolved from the selected data; technique names do not trigger hard-coded component branches.

## Detail Lifecycle

- Opening a different eligible technique replaces the selected detail rather than layering another detail experience.
- Closing clears the current selection.
- Reopening a technique resolves its current data and does not reuse stale information from a previous selection.
- The browser's curriculum scroll position remains unchanged throughout opening and closing.
- Dismissal does not change the active rank or progression state.
- Focus returns to the technique control that opened the detail when that control is still available.

## Dismissal

The experience provides an explicitly labeled close control. It can also be dismissed with Escape.

If the final presentation is modal, standard modal expectations apply: focus enters the experience, remains contained while it is open, background content is not interactive, and the accessible modal state is communicated. If the presentation is non-modal, focus order and landmarks must still make the relationship between the selected control and its details clear.

The implementation must not add a browser-history entry merely to open or close details.

## Presentation and Responsive Behavior

- Technique name is the primary heading.
- Rank context is visible without competing with the technique name.
- Description precedes optional supporting resources.
- The presentation uses DojoMap's existing typography, belt identity, spacing, and interaction language.
- Content can scroll within the detail experience when necessary.
- On phone-sized screens, the heading, content, resources, and close control remain reachable without horizontal page overflow.
- The mobile treatment accounts for safe areas and does not place dismissal controls behind browser or device chrome.
- Motion respects the user's reduced-motion preference.

## Accessibility Requirements

- The detail experience has an accessible name derived from its visible heading.
- The close control has an unambiguous accessible name.
- Resource type is not communicated through color alone.
- External-resource behavior is communicated in the accessible link name or surrounding text.
- Focus is visible for every interactive element.
- Keyboard behavior matches pointer and touch behavior.
- Opening and closing do not cause unexpected page navigation or scroll movement.

## State Ownership Boundary

The page-level curriculum experience owns the selected technique state. Curriculum item controls request selection, and the detail component receives resolved data plus a dismissal callback. The detail component must not maintain a second authoritative selected-technique state.

The exact implementation of this boundary belongs to DM-047.

## Explicit Exclusions

This contract does not introduce:

- standalone technique routes or deep links;
- a searchable or browsable technique library;
- accounts, authentication, or permissions;
- progress or completion tracking;
- databases or persistence;
- technique or curriculum editing;
- administration tools;
- analytics requirements;
- AI-generated instruction; or
- detail experiences for forms or knowledge items.

## Acceptance Checklist

DM-045 is satisfied when this contract is sufficient to evaluate later implementation work:

- [x] Minimum technique information is defined.
- [x] Eligibility and non-eligibility behavior are defined.
- [x] Video, article, note, multiple-resource, and missing-resource behavior are defined.
- [x] Opening, switching, closing, focus restoration, and scroll preservation are defined.
- [x] Desktop, mobile, keyboard, and accessibility expectations are defined.
- [x] Editing, authentication, accounts, persistence, and other scope expansion are explicitly excluded.
