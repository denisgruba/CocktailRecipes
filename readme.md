
## Cocktail Database

[http://ocasta.denisgruba.me/](http://ocasta.denisgruba.me/)

Uses [TheCocktailDB](http://www.thecocktaildb.com/) API to list and filter Cocktail recipes. Allows to save drinks as Favorite.

- List Cocktails by Alcoholic and Non Alcoholic
- Filter Out Items that are missing pictures
- See the recipe details
- Add recipe to Favorites
- Favorite Recipes are stored in browser's Local Storage
- Search for Recipes by their name

## Details about the code

Uses [Vue 2](https://vuejs.org/) JavaScript framework for:

- Single Page App functionality
- Dynamic data binding
- Filtering data
- Templates

[Webpack](https://webpack.js.org/) is used to compile SCSS and JS.

I planned on using [Laravel](https://laravel.com/) as a back-end framework at the beginning, but my Web Host doesn't support SSH composer commands for PHP7, so I've decided to make this site Front-End only.

I'm using [MaterializeCSS](http://materializecss.com/) as a css framework.

## File Locations

- Build files can be found in the "Resources/Assets" folder
- Compiled files are inside "Public" folders

## Run Build

- Make sure to run the "npm install" command from the root folder.
- Use "npm run dev" or "npm run watch" to compile.
- View site from the public folder.
