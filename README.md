# orgchart


## Project setup
```
npm update
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles for production and deploy
```
npm run build
```
After compile, serve `index.html` and associated static resources from the generated `/dist` folder.


## Customization

This project ships with a `.env` file containing the environment variables you need to set to customize the application. You should make a copy of `.env` and call it `.env.local`. Set the environment as needed for your local setup in that new file. Next time you build the project, the system will pull environment varibales from `.env.local` if it exists.

Check the [full documentation on setting environment variables.](https://cli.vuejs.org/guide/mode-and-env.html#modes)

### Environment variables

* `VUE_APP_API_BASEURL` - the hostname and/or port of the OS2MO REST API you want the application to pull data from.
* `VUE_APP_TITLE` - the application title. It will appear in the UI header and in the HTML document title.
* `VUE_APP_ROOT_UUID` - and UUID representing whatever organisation unit you want as the default root org. unit.
* `VUE_APP_THEME_PATH` - local path to SCSS file containing custom theme variables. Se [./src/assets/default-theme.scss](./src/assets/default-theme.scss) for inspiration.
* `VUE_APP_FAVICON_PATH` - local or global path to image file (usually `favicon.ico`) you want as your application's favicon.


### Customizing build configuration
For build configurations, refer to the [Vue-CLI configuration reference](https://cli.vuejs.org/config/).


## System design considerations

### Data store
All org_units' data are stored in graph array.
Every org_unit contains children and parent properties as lists of uuids
Root org_unit and current org_unit are stored as different values

### Data flow

Data flows between REST API, state graph, and tree view

1. User actions update URL query
2. Components watch for changes in URL query and dispatches state action to check for data
3. State checks if data is available or fetches it via REST API
4. Components ask state for data based on URL query


