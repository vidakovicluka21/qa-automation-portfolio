# QA Automation Portfolio

[![Playwright Tests](https://github.com/vidakovicluka21/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/vidakovicluka21/qa-automation-portfolio/actions/workflows/playwright.yml)

Playwright + TypeScript automation portfolio showcasing practical UI and API testing, reusable test architecture, and continuous integration.

## What this project shows

- **UI tests** against [Sauce Demo](https://www.saucedemo.com/) — login, cart, checkout (happy path + validation)
- **API tests** against JSONPlaceholder / httpbin — CRUD, auth, schema, data-driven, performance smoke
- **Page Object Model** for UI flows
- **Custom fixtures** for API clients and fixture dependencies
- **Environment config** via `.env.dev` / `.env.staging`
- **CI** with GitHub Actions

## Stack

- Playwright Test
- TypeScript
- Node.js
- GitHub Actions

## Project structure

```text
api/                 API client (PostsApi)
fixtures/            Custom Playwright fixtures
pages/               Page Object Model
test-data/           Reusable test data
types/               TypeScript interfaces
tests/
  ui/login|cart|checkout
  api/
  fixtures-demos/    Small fixture dependency example
.github/workflows/   CI pipeline
```

## Setup

```bash
npm install
npx playwright install
cp .env.example .env.dev
```

`.env.dev` / `.env.staging` should contain:

```env
API_BASE_URL=https://jsonplaceholder.typicode.com
```

## Run tests

```bash
npm run test:dev          # chromium, env=dev
npm run test:ui           # UI only
npm run test:api          # API only
npm test                  # all projects (chromium, firefox, webkit)
npm run report            # open HTML report
```

## Learning vs portfolio

Day-to-day practice lives in a separate **qa-automation-learning** repository.  
This portfolio repo is the curated set of examples suitable for job applications. Selected improvements from learning are periodically promoted here.
