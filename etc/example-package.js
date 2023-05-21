/*
 * this is a package for humanOS using the ivy infrastructure.
 * the way that packages will work is that user will specify an id which directly corresponds to a url.
 * if this file was stored at https://example.com/ivy/example-plugin.js, the id will be `example.com:example-plugin`, using the domain name.
 * plugins developed by the humanOS authors will be under domain `ivy` due to the fact that there currently is no domain name for humanOS.
 * standalone windows will also use these ids.
 * windows inside of packages are a bit trickier, but they go something like this:
 * `example.com:example-plugin.basic-app` would be the id for the singular window in this package.
 */

export const ivy = {}

ivy.title = 'Example Plugin'
ivy.author = 'samrland'
ivy.version = 'v1.0.0'

ivy.onload = function (api) {
    api.addApplicationsEntry({
        'name': 'Basic App',
        'icon': 'bug-outline',
        'window': ivy.apps.basic
    })
}

ivy.apps = {}

ivy.apps.basic = {
    id: 'basic-app',
    title: 'Basic App',
    size: {
        preset: 'mini'
    },
    content: `
    <p>This app was imported from the example-plugin plugin.</p>
    `
}

ivy.scripts = {}
