# STAGING-BetterBaseball-auto-playwright

This project contains automated tests developed for the **BetterBaseball** staging environment

## Project Overview:

- **Automated Testing:** Developed automated tests to verify the core functionality of the e-commerce store.
- **End-to-End (E2E) Scenarios:** Implemented two full **User Journey** tests that cover the flow from product discovery to the **Checkout** page.
- Tests are organized into folders by functionality (Search, Categories, Shopping Cart).

## Design Patterns:

The project implements the **Page Object Model (POM)**:
- **`SearchComponent`**: interactions with the search input and search triggers.
- **`SearchResultPage`**:interactions and assertions for the search results display.

## Tools Used:
- Playwright
- JavaScript / TypeScript

## Basic Setup
- User needs node.js and npm in their machine

## Test Filtering (Tags)
We use tags to run specific subsets of the suite:
- `@smoke`: Critical paths. 
- `@e2e`: Full journeys crossing multiple pages.
- `@checkout`: Specific to the payment and shipping funnel.
- `@negative`: Error handling (e.g., "No results found").

## Installation
- npm i to install all
- npx playwright test to run tests

 Here is the updated Useful Commands section. I have formatted the titles as bullet points (dots) and ensured every command is inside a clean bash code block for easy copying.

## Useful Commands

- Run all tests
`npx playwright test`

- Run a specific test file
`npx playwright test staging-betterbaseball/<folder-name>`

- Run only @smoke tests
`npx playwright test --grep @smoke`

- Run a specific Test Case by ID
  `npx playwright test --grep TC-001`

- Starts the interactive UI mode
`npx playwright test --ui`

- Runs the tests in debug mode
`npx playwright test --debug`

- View the HTML test report
`npx playwright show-report`

   
