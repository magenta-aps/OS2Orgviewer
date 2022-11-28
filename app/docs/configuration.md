# Configuration

OS2Orgviewer configurations can be defined in environment variables prior to running a build and after.

For build configurations in VueJS, Babel, or Webpack, refer to the [Vue-CLI configuration reference](https://cli.vuejs.org/config/).

Also, check the [full documentation on setting environment variables for VueJS applications.](https://cli.vuejs.org/guide/mode-and-env.html#modes)

## Option 1: Configuration for production deployments

If you are unable to configure the application before the build process, (usually the case) you may manipulate the `index.html` for the specific `/dist` that you want to serve. In `index.html` you can set specific Javascript variables that correspond to configuration options for the application.

There is a script for use in Docker containers, [30-sed-on-index-html.sh](../../docker/30-sed-on-index-html.sh). This script takes environment variables and manipulates config vars in `index.html` while the container is running.

## Option 2: Configuration for local development

Refer to [.env.example](../.env.example) for an example of environment variables you can set PRIOR TO BUILDING the Node/VueJS application.

### Pre-build Environment variables

```
# Set production or development environment.
# Default: development
NODE_ENV=production

# Set the hostname and/or port of the OS2MO REST API you want the application to pull data from
# Default: https://moratest.magenta.dk
VUE_APP_API_BASEURL=https://moratest.magenta.dk

# Set a UUID representing whatever organisation unit you want as the default root org
# Default: f06ee470-9f17-566f-acbe-e938112d46d9 (from https://moratest.magenta.dk)
VUE_APP_ROOT_UUID=f06ee470-9f17-566f-acbe-e938112d46d9

# Set type of relation between people and organisations [engagement|association]
# The UI will display people in organisations based on their engagement or association.
# Default: engagement
GLOBAL_ORG_PERSON_RELATION=engagement

# Optional list of org_unit_hierarchy uuids. Set a list of UUIDs representing the org_unit_hierarchy classes to filter organisations by.
# Default: empty list
# Example 
GLOBAL_ORG_UNIT_HIERARCHY_UUIDS= '[]'

# Set the application title. It will appear in the UI header and in the HTML document title.
# Default: Organization chart demo
VUE_APP_TITLE=Organization chart demo

# Set local path to CSS file containing custom theme styles.
# You can make a copy of `src/assets/default-theme.sss` and edit it to create your own custom theme.
# Default: Default styling
VUE_APP_THEME_CSS=my-custom-style.css

# Set organization tree layout style [horizontal|vertical]
# Default: vertical
VUE_APP_TREE_LAYOUT=vertical

# Set local or global path to image file you want as your application's branding image
# Default: none
VUE_APP_LOGO_PATH=path-to-logo/logo.svg

# Set local or global path to image file (usually `favicon.ico`) you want as your application's favicon.
# Default: none
VUE_APP_FAVICON_PATH=path-to-favicon/favicon.ico

# Set list of UUIDS of org_units you want to remove from the tree view
VUE_APP_HIDE_ORG_UNIT_UUIDS=

# True or False, hide org_units that ends with "_leder" (specific functionality for Holstebro)
VUE_APP_HIDE_MANAGER_ORG_UNITS=False
```
