# Spec Delta

## Purpose

Shows every visitor one calm Ukrainian weather joke in the page footer. On a given day everyone sees the same joke, and it is served from content bundled with the app, with no network calls or tracking (FR-JOKES-01).

## ADDED Requirements

### Requirement: Footer shows one weather joke
The page footer SHALL show exactly one Ukrainian weather-themed joke from the bundled list on every page, whether or not a location is selected.

#### Scenario: Joke on first load
- **WHEN** a visitor opens the app with no location selected
- **THEN** the footer shows one joke from the bundled list

#### Scenario: Footer is a landmark
- **WHEN** an assistive technology lists the page landmarks
- **THEN** the footer is exposed as the content-info landmark and its text is the joke

### Requirement: Joke is chosen by UTC calendar date
The joke SHALL be a deterministic function of the current UTC calendar date. The same date gives the same joke for every visitor, and each following date gives the next joke in list order, wrapping after the last.

#### Scenario: Same day, same joke
- **WHEN** two visitors load the app at different times on the same UTC date
- **THEN** both see the same joke

#### Scenario: Next day, next joke
- **GIVEN** the footer shows the joke at position N on one UTC date
- **WHEN** a visitor loads the app on the next UTC date
- **THEN** the footer shows the joke at position N + 1, allowing up to about an hour after UTC midnight for cached pages to refresh

#### Scenario: Wrap around the list
- **GIVEN** the footer shows the last joke in the list on one UTC date
- **WHEN** the date advances by one day
- **THEN** the footer shows the first joke in the list

#### Scenario: Any date maps to a joke
- **WHEN** the joke is chosen for any valid date, including dates before 1970
- **THEN** the result is one of the bundled jokes

### Requirement: Jokes follow the brand voice
Every bundled joke SHALL be one or two short sentences in Ukrainian, at most 120 characters long. Jokes SHALL contain no exclamation marks and no emoji. The apostrophe SHALL be `ʼ` (U+02BC) and quotation marks SHALL be «». Jokes SHALL be about weather or forecasts, never about real people or politics.

#### Scenario: Content rules hold for every joke
- **WHEN** the bundled list is checked
- **THEN** every joke has one or two sentences and at most 120 characters, with no `!`, no emoji, no ASCII apostrophe and no straight double quotes

#### Scenario: Two weeks without a repeat
- **WHEN** the bundled list is checked
- **THEN** it holds at least 14 distinct jokes, so no joke repeats within any 14 consecutive days

### Requirement: No external requests, tracking or storage
Showing the joke SHALL NOT make any network request. It SHALL NOT read or write cookies or browser storage, and it SHALL NOT send any analytics or identifying data (BC-PRIVACY-01, BC-PRIVACY-03).

#### Scenario: Offline content
- **WHEN** a page with the footer loads
- **THEN** no network request is made to fetch or report the joke, and no cookie or storage entry is created for it

### Requirement: Joke renders without client-side work
The joke SHALL be present in the server-rendered HTML, so it is visible with JavaScript disabled. Rendering it SHALL NOT produce browser console warnings or errors, including hydration mismatches (NFR-OBS-01).

#### Scenario: JavaScript disabled
- **WHEN** a visitor loads the app with JavaScript disabled
- **THEN** the footer still shows the joke

#### Scenario: Silent console
- **WHEN** a visitor loads the app in a healthy session
- **THEN** the browser console shows no warning or error related to the footer
