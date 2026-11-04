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

- Added editing and deletion of existing menu items, with updates reflected immediately in the menu.
- Added menu search and course filtering, including a control to clear the active filters.
- Added live menu statistics: total item count, average price, and counts by course.
- Added Starter, Main Course, and Dessert selection when adding or editing a dish.
- Added validation for required dish details and positive prices with up to two decimal places.
- Added the new starter and dessert dishes and their images to the initial menu.
- Improved empty-state and validation feedback.

## Refactoring and quality improvements

- Extracted the reusable `CourseSelector` component for consistent course selection in add and edit forms.
- Added shared course normalization and price parsing/formatting helpers in `components/menuUtils.ts`.
- Aligned Expo-related dependency versions for the configured SDK.
- Verified the app with the TypeScript compiler and Expo Android/iOS bundle exports.

## Submission links

- GitHub repository: add your repository URL here.
- Feature demonstration video: add an accessible video URL here.
