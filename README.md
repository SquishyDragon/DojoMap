# DojoMap

DojoMap is a simple curriculum map for martial arts students. It presents an ordered path through ranks so students can see what they are learning now, what each rank requires, and what comes next.

[View the live app](https://dojomap.natetread.chatgpt.site/)

## v0.1.0 scope

This first release is a focused, read-only demonstration that:

- displays a five-rank sample karate curriculum in progression order;
- gives every rank a clear belt indicator and categorized requirements;
- makes the progression between ranks visible;
- adapts to phone and desktop widths without horizontal page overflow; and
- handles missing or empty curriculum data with an intentional message.

The included curriculum is illustrative sample data, not an official or universal karate syllabus.

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

The test suite covers the curriculum model, sample data, rank rendering, ordering, progression cues, requirement content, and empty/error-safe states.

## Project structure

```text
src/app/          Page, metadata, and global styles
src/components/   Curriculum and rank UI components
src/data/         Sample curriculum data
src/types/        Curriculum domain model
```

The production build is configured as a static export in `next.config.ts`; generated files are written to `out/`.

## Release plan

The complete v0.1.0 work items and their testable outcomes are tracked in [V0.1.0.md](./V0.1.0.md).
