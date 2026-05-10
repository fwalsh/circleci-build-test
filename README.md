# CircleCI Build & Test — Support Engineer Take-Home

A monorepo demo submission for the CircleCI Support Engineer take-home challenge.

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/YaD4tLBMN2kXHnvkmQ2cXB/PLACEHOLDER/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/YaD4tLBMN2kXHnvkmQ2cXB/PLACEHOLDER/tree/main)
<!-- Replace PLACEHOLDER with the project slug from CircleCI → Project Settings → Status Badges -->

## What this satisfies

The "trivial web application with a single page and a button" from the brief is **`project-a/`**. Clicking the button reveals live CircleCI status text fetched from `status.circleci.com/api/v2/status.json`. The required test (`e2e/project-a.spec.ts`) verifies the new text appears on click.

`project-b/` and the dynamic path-filtering pipeline are **supplementary content** that demonstrates CircleCI's dynamic-config / path-filtering capability — the same pattern that answers Part 3 of this take-home.

## How to run locally

```bash
npm install
npx playwright install chromium
npm test                    # run all tests
npm run test:project-a      # run project-a tests only
```

The `webServer` in `playwright.config.ts` starts `serve` automatically on port 3000 before tests run.

## Repo structure

```
project-a/   # the brief's "single page with a button" — fetches live CircleCI status
project-b/   # supplementary About page — demonstrates path-filtering routing
shared/      # fetchStatus() helper + shared CSS (changes here trigger both test workflows)
e2e/         # Playwright tests
.circleci/
  config.yml          # setup workflow — runs path-filtering orb
  continue-config.yml # real test workflows, gated by path-filtering parameters
```

## CI pipeline

Uses CircleCI's [dynamic config / path-filtering](https://circleci.com/docs/dynamic-config/) to route changes to the right workflow:

| Changed path | Workflow triggered |
|---|---|
| `project-a/**` | `project-a-tests` |
| `project-b/**` | `project-b-tests` |
| `shared/**` | both workflows |

## Links

- Private gist (AI usage log + write-up): _link TBD_
