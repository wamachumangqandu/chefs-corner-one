# Chef's Menu Manager

Chef's Menu Manager is a React Native mobile application built with Expo. It helps a chef manage a restaurant menu by adding, viewing, searching, filtering, editing, and deleting dishes.

## Table of contents

- [Project requirements](#project-requirements)
- [Features](#features)
- [Initial menu](#initial-menu)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Change log since Part 2](#change-log-since-part-2)
- [Refactoring and quality improvements](#refactoring-and-quality-improvements)
- [Verification](#verification)
- [Submission checklist](#submission-checklist)

## Project requirements

The final application addresses the assignment requirements as follows:

1. **Manage menu items:** Select an existing dish to edit it, update its details, or delete it after confirming. Changes are reflected in the menu immediately.
2. **Search and filter:** Search by dish name, course, or description; filter by Starter, Main Course, or Dessert; and clear search and course filters to show the full menu again.
3. **Display menu statistics:** View the total number of dishes, the average price, and the number of dishes in each course. Statistics update when the menu changes.
4. **Enhance the application:** Use reusable course selection and shared helper functions, consistent screen styling, and clear empty states.
5. **User experience:** Navigate between menu, add, and edit screens; receive validation and confirmation messages; and use forms that validate dish names, descriptions, and prices.

## Features

- **View the menu:** See each dish's photo, course, name, description, quantity, and price.
- **Search dishes:** Results update as you type and match dish names, courses, and descriptions.
- **Filter by course:** Choose All, Starter, Main Course, or Dessert. Search and course filters can be used together.
- **Clear filters:** Restore the complete menu with one action.
- **Add dishes:** Enter a name, course, price, and description, and optionally choose a photo from the device's media library.
- **Edit dishes:** Update a dish's name, course, price, description, or photo. The existing photo is kept if no replacement is selected.
- **Delete dishes:** Confirm before removing a dish.
- **View statistics:** See the menu item count, average price, and per-course counts.
- **Validate input:** Dish names and descriptions cannot be blank; prices must be greater than zero and have no more than two decimal places.
- **Receive feedback:** Forms report missing details or invalid prices, saves confirm success, and deletion requires confirmation.
- **Handle empty results:** Helpful messages appear when no dishes exist or when no dishes match the active filters.

## Initial menu

| Dish | Course | Price |
|---|---|---:|
| Grilled Salmon | Main Course | R 120.00 |
| Grilled Chicken | Main Course | R 160.00 |
| Beef Stew | Main Course | R 110.00 |
| Inyama Yentloko | Main Course | R 90.00 |
| Crab Croquettes | Starter | R 90.00 |
| Peri-Peri Chicken Livers | Starter | R 110.00 |
| Biscoff Banana Pudding | Dessert | R 115.00 |
| Greek Yogurt Dessert | Dessert | R 90.00 |

## Getting started

### Requirements

- Node.js and npm
- Expo-compatible development environment or Expo Go

### Install and run

From the project directory, install dependencies and start Expo:

```sh
npm install
npm start
```

Use the Expo terminal options to open the app on Android, iOS, or web. Platform-specific start commands are also available:

```sh
npm run android
npm run ios
npm run web
```

## Project structure

```text
.
├── App.tsx
├── app.json
├── assets/
├── components/
│   ├── AddDishScreen.tsx
│   ├── CourseSelector.tsx
│   ├── EditDishScreen.tsx
│   ├── MenuScreen.tsx
│   ├── TopNavBar.tsx
│   └── menuUtils.ts
├── index.ts
├── package.json
└── tsconfig.json
```

- `App.tsx` holds the app's screen state, menu data, and add, edit, and delete handlers.
- `components/MenuScreen.tsx` displays the menu, search, course filters, and statistics.
- `components/AddDishScreen.tsx` and `components/EditDishScreen.tsx` contain the dish forms.
- `components/CourseSelector.tsx` provides the shared course-selection control.
- `components/menuUtils.ts` contains shared course and price helpers.
- `components/TopNavBar.tsx` provides navigation between app screens.
- `assets/` contains the menu photos and app graphics.

## Change log since Part 2

- Added editing and deletion of existing menu items, including delete confirmation.
- Added live menu search and course filtering, with a way to clear both.
- Added live statistics for total dishes, average price, and counts by course.
- Added Starter, Main Course, and Dessert selection to the add and edit forms.
- Added input validation and user feedback for missing fields and invalid prices.
- Added Crab Croquettes, Peri-Peri Chicken Livers, Biscoff Banana Pudding, and Greek Yogurt Dessert with their images.
- Improved empty-result messages and consistency across the application screens.

## Refactoring and quality improvements

- Extracted `CourseSelector` for consistent course selection across add and edit forms.
- Extracted shared course normalization and price parsing/formatting into `menuUtils.ts`.
- Derived search results and statistics from the current menu state so they stay in sync with menu changes.
- Normalized course names and price formatting.
- Aligned Expo-related dependency versions with the Expo SDK configured in the project.

## Verification

Run the TypeScript check:

```sh
npx tsc --noEmit
```

Check Expo package compatibility:

```sh
npx expo install --check
```

The application has also been bundled for Android and iOS with Expo.

## Submission checklist

- [x] Application source and assets are in the GitHub repository.
- [x] README documents the features, changes since Part 2, and refactoring.
- [ ] Add a publicly accessible video link demonstrating the application:

  **Video URL:** _Add your video link here._

## Repository

[https://github.com/wamachumangqandu/chefs-corner-one](https://github.com/wamachumangqandu/chefs-corner-one)
