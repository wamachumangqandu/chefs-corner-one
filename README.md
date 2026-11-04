# Hayibon

This is my Hayibon app. I built it with React Native and Expo. It helps a chef add, search, edit, and delete dishes on a menu.

## What the app can do

- Show the dishes, their courses, descriptions, photos, and prices.
- Search for a dish by its name, course, or description.
- Filter the menu by Starter, Main Course, or Dessert.
- Clear the search and filters to show all dishes again.
- Add a dish with a name, course, price, description, and optional photo.
- Edit or delete a dish.
- Show the number of menu items, the average price, and how many dishes are in each course.
- Show a message if information is missing or the price is not valid.

## Dishes in the menu

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

## How to run the app

You need Node.js and npm installed. In the project folder, run:

```sh
npm install
npm start
```

Then follow the Expo instructions to open the app. You can also use:

```sh
npm run android
npm run ios
npm run web
```

## Changes I made since Part 2

- I added the option to edit and delete dishes.
- I added search by dish name, course, and description.
- I added filters for starters, main courses, and desserts.
- I added a button to clear the search and filters.
- I added menu statistics for the total number of dishes, average price, and number of dishes in each course.
- I added course selection and checks for dish names, descriptions, and prices.
- I added four dishes with photos: Crab Croquettes, Peri-Peri Chicken Livers, Biscoff Banana Pudding, and Greek Yogurt Dessert.
- I improved the messages shown when there are no matching dishes or when information needs to be fixed.

## Code changes I made

- I made a `CourseSelector` component and reused it in the add and edit forms.
- I put shared course and price functions in `components/menuUtils.ts`.
- I made the menu statistics and search results update when the menu changes.
- I updated the Expo package versions used by the project.

## Main project files

- `App.tsx` contains the main app screens and menu updates.
- `components/MenuScreen.tsx` shows the menu, search, filters, and statistics.
- `components/AddDishScreen.tsx` is the form for adding a dish.
- `components/EditDishScreen.tsx` is the form for editing or deleting a dish.
- `components/CourseSelector.tsx` lets the user choose a course.
- `components/menuUtils.ts` contains shared course and price functions.
- `assets/` contains the dish photos and app images.

## Checks

I checked the TypeScript code with:

```sh
npx tsc --noEmit
```

I also checked the Expo package versions with:

```sh
npx expo install --check
```

The app was bundled for Android and iOS with Expo.

## Submission links

- GitHub repository: https://github.com/wamachumangqandu/chefs-corner-one
- Video showing the app: _Add your video link here._
