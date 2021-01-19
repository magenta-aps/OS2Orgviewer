# OS2Orgviewer

This is a web application that displays a chart over an organization and its members.
You can navigate the chart, display info on individual sections and people, and search for people or units within the organisation.
It pulls organization information from OS2MO REST API.

## Project setup
Assuming you have [Node.js](https://nodejs.org/en/) installed, check out this code and install the build dependencies:
```
git clone git@git.magenta.dk:rammearkitektur/os2orgviewer.git
cd os2orgviewer/app
npm update
npm install
```

### Build and deploy quick start
Inside [os2orgviewer/app](os2orgviewer/app) directory, run any of the customized build scripts
```
npm run build (default setup)
OR 
npm run build-frederikshavn-med (example custom setup)
```

A new directory will be created in the `app/dist` folder with your custom build (example: `app/dist/frederikshavn-med`). Hook it up to a server, and you'll be good to go.


## Configuration
OS2Orgviewer has two levels of configuration. 

### Pre-build configuration
First level configuration happens i `.env` files that you can find in the [app/](app/) directory. Refer to the `script` commands in [app/package.json] to see what `.env`s are related to certain builds. There are different `.env` files for production and development builds.

`.env` files contain environment variables for setting up the application.

#### Environment variables
```
# NODE_ENV determines what optimizatinos are made during build. 
# Can be either "production" or "development"
# ex. NODE_ENV=production 

# VUE_APP_API_BASEURL is the hostname for the REST API that OS2Orgviewer uses to pull data from
# ex. VUE_APP_API_BASEURL=http://localhost:5000

# VUE_APP_ROOT_UUID is the UUID of the organisation unit you'll want as a default root in the tree view.
# ex. VUE_APP_ROOT_UUID=f06ee470-9f17-566f-acbe-e938112d46d9

# VUE_APP_ORG_PERSON_RELATION determines if people listed in the org tree are related to the org
# by employment or another relation. Can be either "engagement" or "association"
# ex. VUE_APP_ORG_PERSON_RELATION=engagement

# VUE_APP_TITLE is the title to display in the UI's header
# ex. VUE_APP_TITLE=Organization chart demo

# VUE_APP_THEME_SCSS points to a custom SCSS theme file that determines various color variables and mixins.
# ex. VUE_APP_THEME_SCSS=/src/assets/os2-theme.scss

# VUE_APP_LOGO_PATH points to an image file that will be displayed in the UI's header as a logo
# ex. VUE_APP_LOGO_PATH=https://www.mysite.com/some-logo.svg

# VUE_APP_FAVICON_PATH points to an image file that will used as a favicon
# ex. VUE_APP_FAVICON_PATH=https://www.mysite.com/favicon.ico
```

### Post-build configuration
Second level configuration can be done post-build in the `index.html` for the specific `/dist` that you want to serve. In `index.html` you can set specific Javascript variables what will be used in the application.

#### Javascript variables
```
GLOBAL_API_URL // Corresponds to VUE_APP_API_BASEURL environment variable

GLOBAL_API_ROOT_UUID // Corresponds to VUE_APP_ROOT_UUID environment variable

GLOBAL_ORG_PERSON_RELATION  // Corresponds to VUE_APP_ORG_PERSON_RELATION environment variable

GLOBAL_APP_LOGO_PATH  // Corresponds to VUE_APP_LOGO_PATH environment variable

GLOBAL_APP_TITLE  // Corresponds to VUE_APP_TITLE environment variable
```


## Development
Refer to the [app README](app/README.md) for development instructions.
