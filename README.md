# Chef's Menu Manager

A React Native application built with Expo for managing a restaurant menu.

## Run the application

Install the project dependencies, then start Expo:

```sh
npm install
npm start
```

Use the Expo terminal options to open the app on Android, iOS, or web.

## Features

- View the menu and search dishes by name, course, or description.
- Filter dishes by Starter, Main Course, or Dessert, and clear filters to show the full menu.
- Add dishes with a name, course, price, description, and optional photo.
- Edit or delete existing dishes.
- View live statistics for total dishes, average price, and the number of dishes in each course.
- Select dish photos from the device's media library.
- Validate dish details and prices and show user feedback for invalid input and successful saves.

The initial menu includes Grilled Salmon, Grilled Chicken, Beef Stew, Inyama Yentloko, Crab Croquettes, Peri-Peri Chicken Livers, Biscoff Banana Pudding, and Greek Yogurt Dessert.

## Change log since Part 2

### Menu management

- Added the ability to select a menu item and open it in the edit form.
- Added editing of a dish's name, course, price, description, and photo.
- Added deletion of menu items with a confirmation prompt.
- Updated the menu immediately after an item is added, edited, or deleted.
- Kept a dish's existing photo when editing without selecting a replacement.

### Search and course filters

- Added live text search across dish names, courses, and descriptions.
- Added course filters for Starter, Main Course, and Dessert.
- Combined text search and course filters so both can be applied at the same time.
- Added controls to clear the search and filters and show the full menu again.
- Added a helpful message when no dishes match the active search or filter.

### Menu statistics and dishes

- Added live statistics for the total number of dishes and the average menu price.
- Added a count of dishes in each course.
- Added Crab Croquettes (R 90.00) and Peri-Peri Chicken Livers (R 110.00) as starters.
- Added Biscoff Banana Pudding (R 115.00) and Greek Yogurt Dessert (R 90.00) as desserts.
- Added the four dish photos to the app's assets and menu.

### Forms and user experience

- Added course selection for Starter, Main Course, and Dessert in both add and edit forms.
- Added photo selection from the device's media library for new and existing dishes.
- Added validation for required dish names and descriptions.
- Added price validation requiring a positive amount with up to two decimal places.
- Added clear feedback for missing details, invalid prices, successful saves, and delete confirmation.
- Added helpful empty-menu messaging and kept form controls and styling consistent across screens.

## Refactoring and project updates

- Extracted the shared `CourseSelector` component so add and edit forms use the same course-selection UI.
- Added `components/menuUtils.ts` to share course normalization and price parsing/formatting logic.
- Derived the menu statistics and filtered results from the current dish list so they stay in sync after changes.
- Normalized course names and price formatting for the initial and newly added dishes.
- Aligned Expo, React Native, image picker, status bar, and React type package versions with the Expo SDK installed in the project.
- Verified the project with the TypeScript compiler and Expo Android and iOS bundle exports.

## Submission links

- GitHub repository: https://github.com/wamachumangqandu/chefs-corner-one
- Feature demonstration video: add an accessible video URL here.
