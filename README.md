## Automated testing Project
Practice 3

This project is a demo for automated UI testing (playwright).

---
### Requirements

* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) (version 22.14.0).
* npm or yarn
* Chrome browser installed

#### Useful links:
- Playwright https://playwright.dev/
- Node https://nodejs.org/en
---


### Installation

Clone this repository and install dependencies:
```bash
git clone https://github.com/rap1dity/testing-ui.git
```

Install dependencies:
```bash
npm install
```

### Running tests
Run all tests:
```bash
npm run test
```

---

Launch GUI mode:
```bash
npm run test-ui
```
---

Launch by tag @form
```bash
npx playwright test --grep "form"
```

Custom command line to launch test
```bash
npx cross-env VIEWPORT_WIDTH=1920 VIEWPORT_HEIGHT=1080  npx playwright test --grep "form" --headed --workers=2 --project='firefox' 
```
Where:

`npx cross-env VIEWPORT_WIDTH=1920 VIEWPORT_HEIGHT=1080` - window size.

`--grep "form"` - specific tag.

`--headed` - mode with launching browser.

`--workers=2` - launch tests in parallel with 2 queue.

`--project='firefox'` - launch tests in firefox browsers. Firefox and chrome available.

---

### Project Structure
-`/common` - contain common files

-`/common/utils` - contain auxiliary functions

-`/src` - root folder

-`/src/pages` - contain page object files

-`/tests` - contain tests files

---

### Test Reports
After each test run, a detailed report is generated