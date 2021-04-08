# Configuration

OS2Orgviewer configurations can be defined in environment variables prior to running a build and after.

Refer to [.env.default] for an example of configurations you can make prior to building the Node/VueJS application. 

For build configurations in VueJS, Babel, or Webpack, refer to the [Vue-CLI configuration reference](https://cli.vuejs.org/config/).

Also, check the [full documentation on setting environment variables for VueJS applications.](https://cli.vuejs.org/guide/mode-and-env.html#modes)

## 1. Pre-build configuration
First level configuration uses environment variables for setting up the application. They are usually stored in `.env` files that you can find in the [app/] directory. Naming a `.env` file with the postfix `.production` will enable a minified production build.

### Pre-build Environment variables
```
# Set production or development environment.
# Default: development
NODE_ENV=development

# Set the hostname and/or port of the OS2MO REST API you want the application to pull data from
# Default: https://moratest.magenta.dk
VUE_APP_API_BASEURL=https://moratest.magenta.dk

# Set a UUID representing whatever organisation unit you want as the default root org
# Default: none
VUE_APP_ROOT_UUID=f06ee470-9f17-566f-acbe-e938112d46d9

# Set type of relation between people and organisations [engagement|association]
# The UI will display people in organisations based on their engagement or association.
# Default: engagement
VUE_APP_ORG_PERSON_RELATION=engagement

# Set the application title. It will appear in the UI header and in the HTML document title.
# Default: Organization chart demo
VUE_APP_TITLE=Frederikshavn Kommunes MED-organisation

# Set local path to SCSS file containing custom theme and SASS variables. 
# You can make a copy of `src/assets/default-theme.scss` and edit it to create your own custom theme.
# Default: /src/assets/default-theme.scss
VUE_APP_THEME_SCSS=/src/assets/frederikshavn-med-theme.scss

# Set organization tree layout style [horizontal|vertical|hybrid]
# Default: vertical
VUE_APP_TREE_LAYOUT=vertical

# Set local or global path to image file you want as your application's branding image
# Default: none
VUE_APP_LOGO_PATH=https://frederikshavn.dk/Resources/images/frk_logo_blue.svg

# Set local or global path to image file (usually `favicon.ico`) you want as your application's favicon.
# Default: none
VUE_APP_FAVICON_PATH=https://frederikshavn.dk/Resources/images/favicon.ico?hash=/Resources/images/favicon.ico
```

## 2. Post-build configuration

If you are unable to configure the application before the build process, you may manipulate the `index.html` for the specific `/dist` that you want to serve. In `index.html` you can set specific Javascript variables that corresponds to configuration options for the application.

### Javascript variables
```
GLOBAL_API_URL // Corresponds to VUE_APP_API_BASEURL environment variable

GLOBAL_API_ROOT_UUID // Corresponds to VUE_APP_ROOT_UUID environment variable

GLOBAL_ORG_PERSON_RELATION  // Corresponds to VUE_APP_ORG_PERSON_RELATION environment variable

GLOBAL_APP_LOGO_PATH  // Corresponds to VUE_APP_LOGO_PATH environment variable

GLOBAL_APP_TITLE  // Corresponds to VUE_APP_TITLE environment variable

VUE_APP_TREE_LAYOUT // Corresponds to VUE_APP_TREE_LAYOUT environment variable
```