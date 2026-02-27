# Test Automation - QA Dojo 7

This project contains automated tests developed for the **BetterBaseball** staging environment as part of the QA Dojo 7 course.

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
