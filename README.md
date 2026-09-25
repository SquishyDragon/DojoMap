# DojoMap

DojoMap is a guided curriculum map for martial arts students. It turns a dojo's ordered ranks and requirements into a clear journey from the first lesson toward black belt.

[View the live app](https://dojomap.ninja/)

## v0.4.0 experience

DojoMap v0.4.0 turns the former single-dojo application into a small discovery platform while preserving the complete v0.3.0 curriculum experience. The release:

- gives DojoMap its own landing page and identity at `/`;
- lets visitors search the static directory by dojo name, location, or discipline;
- provides a browsable dojo directory at `/dojos`;
- introduces the product to school owners at `/for-dojos` without pretending onboarding is available;
- resolves each mapped school through its canonical slug-based route;
- moves Fort Myers Karate to `/fort-myers-karate` without changing its rank journey, technique details, resources, keyboard behavior, or snap scrolling; and
- provides an intentional recovery path for unknown dojo addresses.

The directory currently contains one dojo, Fort Myers Karate. Its curriculum remains illustrative sample data, not an official or universal karate syllabus.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | DojoMap landing page and dojo search |
| `/dojos` | Directory of every mapped dojo |
| `/for-dojos` | Product overview and current onboarding status for dojo owners |
| `/fort-myers-karate` | Fort Myers Karate curriculum journey |
| `/[dojoSlug]` | Static route pattern used for directory-backed dojo pages |

Unknown dojo slugs use the branded not-found experience and return visitors to the directory or landing page. Because production is a static export, supported dojo routes are generated from the directory during the build and arbitrary slugs are not rendered dynamically.

## Directory and search architecture

`src/data/dojo-directory.ts` is the source of truth for discoverable schools. Each entry pairs a stable URL slug with a complete `Dojo` record. The same directory drives:

- landing-page search records;
- the `/dojos` discovery cards;
- static route generation; and
- slug resolution for dojo pages.

Search runs locally in the browser against a small derived record containing the dojo name, city and state, discipline, description, and canonical slug. Matching is case-insensitive and supports partial name, location, or discipline queries. Submitting the search opens the first matching canonical dojo route; an unmatched query offers a path to the complete directory.

Adding a future dojo requires a new validated `Dojo` dataset and one directory entry. The landing search, directory, and generated route then consume the same data without duplicating display or routing information.

## Fort Myers Karate journey

The v0.3.0 experience now lives behind `/fort-myers-karate`. It:

- opens with the dojo identity and an invitation to begin;
- presents every rank as a full-screen, vertically snapping section;
- keeps the belt path visible in a synchronized progression navigator;
- supports direct belt links and Arrow/Page Up and Down keyboard navigation;
- displays categorized curriculum requirements for every rank;
- lets students inspect eligible techniques without leaving the curriculum or losing their place;
- preserves external curriculum links and non-interactive unavailable items;
- concludes the currently mapped curriculum intentionally; and
- remains usable on phone and desktop widths with reduced-motion support.

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

The test suite covers directory integrity, search matching and navigation, canonical slug generation and resolution, unknown-route handling, discovery rendering, accessibility landmarks, dojo identity, curriculum models and data, rank ordering, synchronized navigation, keyboard behavior, technique selection and lifecycle, every supported resource case, external-link regressions, and empty/error-safe rendering.

## Project structure

```text
src/app/          Landing, directory, owner, dojo, not-found, and metadata routes
src/components/   Search, discovery, curriculum, navigation, and technique UI
src/data/         Directory entries, dojo records, and sample curriculum data
src/domain/       TypeScript domain models and directory utilities
```

The production build is configured as a static export in `next.config.ts`; generated files are written to `out/`.

## v0.4.0 scope boundary

Version 0.4.0 adds public discovery and canonical dojo routes. It does **not** include owner applications, dojo submission or editing, accounts, progress tracking, authentication, a database, location-aware search, map or distance features, a technique library, standalone technique routes, embedded media, admin tools, AI-generated instruction, or an attempt to map every lesson and black-belt degree.

The directory is intentionally static and contains only Fort Myers Karate in this release. The owner page communicates the future direction without exposing a nonfunctional form or signup flow. The project will be used in its deployed form before the next scope is chosen.

## Release documentation

- [v0.4.0 work items and acceptance criteria](./V0.4.0.md)
- [v0.3.0 work items and acceptance criteria](./V0.3.0.md)
- [technique-detail product contract](./docs/technique-detail-contract.md)
- [v0.2.0 work items and acceptance criteria](./V0.2.0.md)
- [v0.1.0 work items and acceptance criteria](./V0.1.0.md)
