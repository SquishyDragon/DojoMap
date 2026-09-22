# DojoMap

DojoMap is a guided curriculum map for martial arts students. It turns a dojo's ordered ranks and requirements into a clear journey from the first lesson toward black belt.

[View the live app](https://dojomap.ninja/)

## v0.2.0 experience

DojoMap v0.2.0 is a focused, read-only experience that:

- opens with the student's dojo identity and an invitation to begin;
- presents every rank as a full-screen, vertically snapping section;
- keeps the complete belt path visible in a synchronized progression navigator;
- supports direct belt links and Arrow/Page Up and Down keyboard navigation;
- displays categorized curriculum requirements for every rank;
- exposes valid external learning resources while leaving unavailable or future internal content as normal text;
- concludes the current curriculum map intentionally; and
- remains usable on phone and desktop widths, with reduced-motion support and intentional empty/error states.

The included curriculum is illustrative sample data, not an official or universal karate syllabus.

## Curriculum data

Curriculum data lives in `src/data` and is validated by the models in `src/domain`. Each curriculum contains ordered ranks, and each rank contains categorized requirement items.

An item may optionally define a resource:

```ts
type CurriculumResource =
  | { type: "external"; url: string }
  | { type: "internal"; slug: string };

type CurriculumItem = {
  id: string;
  name: string;
  type: "form" | "technique" | "knowledge";
  resource?: CurriculumResource;
};
```

Valid HTTP(S) external resources render as links. Internal resource metadata establishes a future destination but is deliberately not linked in v0.2.0 because no detail pages exist yet. Items without an available destination remain ordinary curriculum entries.

## Stack

- [Next.js](https://nextjs.org/) App Router
- [React](https://react.dev/) and TypeScript
- CSS Modules
- [Vitest](https://vitest.dev/), Testing Library, and jsdom
- Static export deployed with OpenAI Sites

## Local setup

You will need a current Node.js LTS release and npm.

```bash
git clone https://github.com/SquishyDragon/DojoMap.git
cd DojoMap
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Quality checks

Run each project check independently:

```bash
npm run lint
npm test
npm run build
```

The test suite covers dojo identity, curriculum models and data, rank ordering and rendering, synchronized navigation, keyboard behavior, supported resource links, the final journey state, and empty/error-safe rendering.

## Project structure

```text
src/app/          Page, metadata, and global styles
src/components/   Dojo, curriculum, rank, and navigation UI
src/data/         Dojo and sample curriculum data
src/domain/       TypeScript domain models
```

The production build is configured as a static export in `next.config.ts`; generated files are written to `out/`.

## Scope boundary

Version 0.2.0 does not include content detail pages, a technique library, search, accounts, progress tracking, authentication, a database, admin or editing tools, multiple selectable dojos, or AI features. Internal resource slugs are data only; they do not create routes.

The project will be used in its current form before the scope of v0.3.0 is decided.

## Release documentation

- [v0.2.0 work items and acceptance criteria](./V0.2.0.md)
- [v0.1.0 work items and acceptance criteria](./V0.1.0.md)
