# DojoMap

DojoMap is a guided curriculum map for martial arts students. It turns a dojo's ordered ranks and requirements into a clear journey from the first lesson toward black belt.

[View the live app](https://dojomap.ninja/)

## v0.3.0 experience

DojoMap v0.3.0 keeps the curriculum journey from v0.2.0 and adds focused technique details. The experience:

- opens with the student's dojo identity and an invitation to begin;
- presents every rank as a full-screen, vertically snapping section;
- keeps the complete belt path visible in a synchronized progression navigator;
- supports direct belt links and Arrow/Page Up and Down keyboard navigation;
- displays categorized curriculum requirements for every rank;
- lets students select eligible techniques without leaving the curriculum or losing their place;
- shows each selected technique's description, belt context, and available learning resources;
- preserves curriculum items that open external resources as links and leaves unavailable items as normal text;
- concludes the current curriculum map intentionally; and
- remains usable on phone and desktop widths, with reduced-motion support and intentional empty/error states.

The included curriculum is illustrative sample data, not an official or universal karate syllabus.

## Data-model evolution

Curriculum data lives in `src/data` and is validated by the models in `src/domain`. Each curriculum still owns the ordered ranks, categorized requirements, and placement of every item. Technique definitions now own reusable detail content instead of requiring that content to be duplicated at every curriculum occurrence.

The v0.2.0 model allowed one optional internal or external destination per curriculum item. v0.3.0 evolves that doorway into a reusable technique with a description and an ordered collection of typed resources:

```ts
type TechniqueResource =
  | { type: "video"; label: string; url: string }
  | { type: "article"; label: string; url: string }
  | { type: "note"; text: string };

type Technique = {
  id: string;
  name: string;
  description: string;
  resources: readonly TechniqueResource[];
};

type TechniqueCurriculumItem = {
  type: "technique";
  technique: Technique;
  resource?: { type: "external"; url: string };
};
```

Rank context is derived from the curriculum occurrence rather than copied into the technique record. A technique can therefore appear in the ordered journey while its name, description, and resources remain one coherent definition.

## Technique behavior and resources

Selecting an eligible technique opens an in-context detail panel. The curriculum page owns the single selected-technique state as a pair of stable technique and rank IDs; the panel resolves current data from that selection and does not keep competing selection state. Closing the panel preserves the current rank and scroll position, then restores focus to the control that opened it without automatically scrolling that control back into view.

Resource behavior is intentionally small and explicit:

- video and article resources with valid HTTP(S) URLs open safely in a new tab;
- notes render as inline text and are never presented as links;
- multiple resources retain their dataset order;
- techniques without resources still show a complete detail experience; and
- an external destination on a curriculum item takes precedence and continues to behave as a normal external link.

The panel is a non-modal reference surface: a side card on larger screens and a bounded bottom sheet on phones. It supports native button keyboard activation, visible focus, an explicit close control, Escape dismissal, accessible labels and landmarks, reduced motion, and internal scrolling when content is long. Opening or closing it does not create browser-history entries or change the URL.

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

The test suite covers dojo identity, curriculum models and data, rank ordering and rendering, synchronized navigation, keyboard behavior, technique selection and lifecycle, every supported resource case, external-link regressions, the final journey state, and empty/error-safe rendering.

## Project structure

```text
src/app/          Page, metadata, and global styles
src/components/   Dojo, curriculum, rank, navigation, and technique-detail UI
src/data/         Dojo and sample curriculum data
src/domain/       TypeScript domain models
```

The production build is configured as a static export in `next.config.ts`; generated files are written to `out/`.

## v0.3.0 scope boundary

Version 0.3.0 adds in-context details for curriculum techniques only. It does **not** include a technique library, technique routes or deep links, form or knowledge details, embedded media, search, accounts, progress tracking, authentication, a database, admin or editing tools, multiple selectable dojos, AI-generated instruction, or an attempt to map every lesson and black-belt degree.

The current curriculum remains a useful map, not a claim that a martial artist's entire journey has been captured. The project will be used in its current form before the scope of v0.4.0 is decided.

## Release documentation

- [v0.3.0 work items and acceptance criteria](./V0.3.0.md)
- [technique-detail product contract](./docs/technique-detail-contract.md)
- [v0.2.0 work items and acceptance criteria](./V0.2.0.md)
- [v0.1.0 work items and acceptance criteria](./V0.1.0.md)
