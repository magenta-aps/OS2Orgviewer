# Development and configuration

Refer to the [the general README](../README.md) for setup instructions.


## Start a development server with hot reload
```
npm run serve (default)
OR
npm run serve-frederikshavn-med (with customer-specific theme and setup)
```

## Compile for production and deploy
```
npm run build
```
This command creates a build for every customer specific setup and copies them into individual directories inside the `/dist` folder. The default build resides in the the `dist/default` folder.

After compile, pick any build folder and serve `index.html` and its associated static resources. 

## Run tests
You can run Testcafe E2E tests from the command line.
```
npm run test
# or
npm run headlesstest 
```

## Customization

Configurations can be defined in environment variables prior to running a build and after.

Refer to [./app/.env.default](./app/.env.default) for an example of configurations you can make prior to building the Node/VueJS application. 

Check the [full documentation on setting environment variables for VueJS applications.](https://cli.vuejs.org/guide/mode-and-env.html#modes)


### Environment variables in .env.default
```
# NODE_ENV
# Sets production or development environment.
# Default: NODE_ENV=development

# VUE_APP_API_BASEURL
# Sets the hostname and/or port of the OS2MO REST API you want the application to pull data from
# Default: VUE_APP_API_BASEURL=https://moratest.magenta.dk

# VUE_APP_ROOT_UUID
# Set a UUID representing whatever organisation unit you want as the default root org
# Default: none

# VUE_APP_ORG_PERSON_RELATION
# Set type of relation between people and organisations [engagement|association]
# The UI will display people in organisations based on their engagement or association.
# Default: VUE_APP_ORG_PERSON_RELATION=engagement

# VUE_APP_TITLE
# Set the application title. It will appear in the UI header and in the HTML document title.
# Default: VUE_APP_TITLE=Organization chart demo

# VUE_APP_THEME_SCSS
# Set local path to SCSS file containing custom theme and SASS variables. 
# You can make a copy of `src/assets/default-theme.scss` and edit it to create your own custom theme.
# Default: VUE_APP_THEME_SCSS=/src/assets/default-theme.scss

# VUE_APP_TREE_LAYOUT
# Set organization tree layout style [horizontal|vertical|hybrid]
# Default: VUE_APP_TREE_LAYOUT=horizontal

# VUE_APP_LOGO_PATH
# Set local or global path to image file you want as your application's branding image
# Default: none

# VUE_APP_FAVICON_PATH
# Set local or global path to image file (usually `favicon.ico`) you want as your application's favicon.
# Default: none
```

For build configurations in VueJS, Babel, or Webpack, refer to the [Vue-CLI configuration reference](https://cli.vuejs.org/config/).


# REST API interfacing

orgviewer uses the [OS2MO REST API.](https://os2mo.readthedocs.io/en/development/api/rest.html)

## An overview of API requests for getting org unit info

While getting org unit information from the REST API, it is nescessary to compile the output of several requests in order to get complete data.
GET `/service/ou/[uuid]/` returns `parent` (OU object)
GET `/service/ou/ancestor-tree?uuid=[uuid]` returns a list of OUs with properties `child_count` (number) OR `children` (array of OU objects)
GET `/service/ou/[uuid]/children` returns a list of OUs with property `child_count`