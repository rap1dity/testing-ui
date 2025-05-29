# Automated Testing Project

Practice 3

This project is a demo for automated UI testing using **Playwright** and **Cucumber (BDD)**.

---

## Requirements

- [Node.js](https://nodejs.org/en/download/) (version 22.14.0)
- npm or yarn
- Chrome browser installed

### Useful links:
- [Playwright](https://playwright.dev/)
- [Cucumber.js](https://cucumber.io/docs/guides/10-minute-tutorial/)
- [Node.js](https://nodejs.org/en)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rap1dity/testing-ui.git
cd testing-ui
npm install
```

---

## Running Tests

### Run all Playwright tests:
```bash
npm run test
```

### Run in GUI mode (with Playwright Test Runner):
```bash
npm run test-ui
```

### Run specific tag (Playwright):
```bash
npx playwright test --grep "form"
```

### Custom command:
```bash
npx cross-env VIEWPORT_WIDTH=1920 VIEWPORT_HEIGHT=1080 npx playwright test --grep "form" --headed --workers=2 --project='firefox'
```

Where:
- `VIEWPORT_WIDTH` / `VIEWPORT_HEIGHT` — set viewport resolution
- `--grep` — filter test by name/tag
- `--headed` — open browser UI
- `--workers` — number of parallel workers
- `--project` — browser to run (`chromium`, `firefox`, etc.)

---

## Running Cucumber (BDD) Tests

### Run all BDD tests:
```bash
npx cucumber-js
```

### Run only tests with tag (e.g. @date):
```bash
npx cucumber-js --tags "@date"
```

### Run and generate report:
```bash
npx cucumber-js \
  --require-module ts-node/register \
  --require src/steps/**/*.ts \
  --format progress-bar \
  --format json:test-reports/report.json \
  --tags "@checkboxes" \
  src/features/**/*.feature
```

---

## Project Structure

```
/common
  └── utils/              → Utilities (e.g. data storage)
  └── pages/              → Base page object class

/src
  └── pages/              → Page Object Models (DatePickerPage, SliderPage, etc.)
  └── features/           → BDD feature files (.feature)
  └── steps/              → Cucumber step definitions
  └── hooks.ts            → Global test lifecycle (Before/After hooks)

/tests                   → Playwright test files (non-BDD)
```

---

## Test Reports

After BDD test execution, a JSON report is saved:

```
test-reports/report.json
```