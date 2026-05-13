# CircleCI Build & Test — Support Engineer Take-Home

A small demo: click a button, see CircleCI's real system status — fetched live from `status.circleci.com/api/v2/status.json`.

This is built to demonstrate CircleCI's dynamic-config / path-filtering capability and to serve as a working preview of Part 3 of the take-home.

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/YaD4tLBMN2kXHnvkmQ2cXB/CSMqME9zYihUHPHepwW4EH/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/YaD4tLBMN2kXHnvkmQ2cXB/CSMqME9zYihUHPHepwW4EH/tree/main)

## What this satisfies

The "trivial web application with a single page and a button" from the brief is **`project-a/`** — clicking the button reveals live CircleCI status text fetched from `status.circleci.com/api/v2/status.json`.

The required test (`e2e/project-a.spec.ts`) verifies the new text appears on click.

`project-b/` and the dynamic path-filtering pipeline are **supplementary content** that demonstrates CircleCI's dynamic-config / path-filtering capability — the same pattern that answers Part 3 of this take-home.

## Prerequisites

**Node.js 20 or higher.** Check what you have installed:

```
node --version
```

If you see `v20.x.x` or higher, you're set. If the command isn't found or shows an older version, install Node.js:

- **macOS (Homebrew):** `brew install node`
- **Other platforms:** Download the installer from https://nodejs.org/

(npm comes bundled with Node.js, so no separate install needed.)

## Get the code

Provided you have git installed locally, clone the repo and cd into it:

```
git clone https://github.com/fwalsh/circleci-build-test.git
cd circleci-build-test
```

All the commands below assume you're inside the `circleci-build-test/` directory.

## Run the tests locally

```
npm install                          # install Playwright (test framework) and serve (static server)
npx playwright install chromium      # download the browser Playwright drives (one-time)
npm test                             # run all Playwright tests
npm run test:project-a               # run only the project-a test
npm run test:project-b               # run only the project-b test
```

`npm test` automatically starts a local web server (`serve`) on port 3000 via the `webServer` config in `playwright.config.ts`, then runs the tests against it. No separate "start server" step is needed for testing.

## View the app in your browser

```
npx serve -l 3000 .
```

Then open **<http://localhost:3000>** — the root redirects to `/project-a/` (the page with the button). The supplementary `/project-b/` About page is at **<http://localhost:3000/project-b/>**.

## Repo structure

```
index.html              # root redirect to /project-a/
project-a/              # the brief's "single page with a button" — fetches live CircleCI status
project-b/              # supplementary About page — demonstrates path-filtering routing
shared/                 # fetchStatus() helper + shared CSS (changes here trigger both workflows)
e2e/                    # Playwright tests
playwright.config.ts    # Playwright configuration (webServer, reporters, trace)
package.json            # npm scripts and dev dependencies
.circleci/
  config.yml            # setup workflow — runs path-filtering orb
  continue-config.yml   # real test workflows, gated by path-filtering parameters
```

## CI pipeline

Uses CircleCI's [dynamic config / path-filtering](https://circleci.com/docs/dynamic-config/) to route changes to the right workflow:

| Changed path | Workflow triggered |
| --- | --- |
| `project-a/**` | `project-a-tests` |
| `project-b/**` | `project-b-tests` |
| `shared/**` | both workflows |

