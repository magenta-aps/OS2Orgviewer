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

Inside the [app](/app) folder, you'll find `.env` files containing the environment variables you need to set to customize the application for specific uses. Every custom setup has two `.env` files for development and production respectively.

Below is an example of how to name `.env` files:

`.env.frederikshavn-med`
For development use. This sets the environment used by the `npm run serve-frederikshavn-med` command.

`.env.frederikshavn-med.production`
For production use. This sets the environment used by `npm run build-frederikshavn-med` command.

Check the [full documentation on setting environment variables.](https://cli.vuejs.org/guide/mode-and-env.html#modes)

### Environment variables

* `VUE_APP_API_BASEURL` - the hostname and/or port of the OS2MO REST API you want the application to pull data from.
* `VUE_APP_TITLE` - the application title. It will appear in the UI header and in the HTML document title.
* `VUE_APP_ROOT_UUID` - and UUID representing whatever organisation unit you want as the default root org. unit.
* `VUE_APP_THEME_PATH` - local path to SCSS file containing custom theme variables. You can make a copy of [./src/assets/default-theme.scss](./src/assets/default-theme.scss) and edit it to create your own custom theme.
* `VUE_APP_LOGO_PATH` - local or global path to image file you want as your application's branding image.
* `VUE_APP_FAVICON_PATH` - local or global path to image file (usually `favicon.ico`) you want as your application's favicon.


### Customizing build configuration

For build configurations, refer to the [Vue-CLI configuration reference](https://cli.vuejs.org/config/).


# REST API interfacing

orgviewer uses the OS2MO REST API 

## An overview of API requests for getting org unit info
While getting org unit information from the REST API, it is nescessary to compile the output of several requests in order to get complete data.
GET `/service/ou/[uuid]/` returns `parent` (OU object)
GET `/service/ou/ancestor-tree?uuid=[uuid]` returns a list of OUs with properties `child_count` (number) OR `children` (array of OU objects)
GET `/service/ou/[uuid]/children` returns a list of OUs with property `child_count`

