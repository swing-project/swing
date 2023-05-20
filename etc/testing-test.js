// the content in this one is less function-calls-function-calls-function and more Qt-ish
// everything is in one function still called `client` but again,
// a lot of changes from the `client` we already know and love
// i honestly prefer this system over all the other ones i've come up with

export const client = function (api) {
    return {
        // keeping this. there needs to be a way to validate what type of object we're getting.
        // however, due to the fact that simple notifications and message boxes don't need entire functions like this,
        // we could probably use typeof object === 'function' since i don't know many javascript modules that have a single export called `client` of type function
        // we do need to have a way to notify the user if they insert the URL to a module rather than a task
        clientType: 'window-api',
        
        // mostly same as top-level client in api-test.js
        // permission declaration is in seperate object
        // this is now only really used as something to show to the end-user, although the version number will probably be used somewhere
        information: {
            name: 'API Test',
            description: 'A really good example app',
            category: 'Application',
            version: '1.0',
            author: 'samrland',
        },
        
        // declare permissions the app requires
        permissions: [
            'screen.filter'
        ],
        
        // this is the title for the window, not the app name shown in the app grid 
        title: api.appString('app-title'),
        
        // set the default, min, and max sizes
        size: {
            start: '800x500',
            minimum: '150x250',
            maximum: '1920x1080'
        },
        
        // menuItems is the same as the first api-test.js,
        // but system-defined things will be under "SWING.[TYPE]:[NAME]",
        // not "H_[NAME]"
        menuItems: [
            {
                name: api.appString('SWING.STR:TASK'),
                items: [
                    { name: api.appString('Message'), command: 'do-something'},
                    { name: 'SWING.STR:SEPERATOR' },
                    { name: api.appString('SWING.STR:QUIT'), command: 'SWING.CMD:QUIT'}
                ]
            } ,
            {
                name: api.appString('Colours'),
                items: [
                    { name: 'Red',   command: 'colour~>red'   },
                    { name: 'Blue',  command: 'colour~>blue'  },
                    { name: 'Green', command: 'colour~>green' }
                ]
            }
        ],
        
        // reciever is the same as the first api-test.js,
        // but this supports parameters (see `colour`)
        reciever: function (api, message, params) {
            switch (message) {
                case 'colour':
                    let color = '#f00'
                    switch (params[0]) {
                        case 'red':
                            color = '#f00'
                            break
                        case 'blue':
                            color = '#00f'
                            break
                        case 'green':
                            color = '#0f0'
                            break
                    }
                    
                    api.to('#color-box')
                        .color = color
                        .invalidate()
                    
                    break
                case 'do-something':
                    api.messageBox({
                        title: api.appString('Did something!'),
                        size: '250x150',
                        message: {
                            icon: 'information-circle-outline',
                            heading: api.appString('Did something!'),
                            label: api.appString('Yup, did something.'),
                            buttons: [
                                { name: api.appString('SWING.STR:OK'),     command: 'SWING.CMD:QUIT_SELF' },
                                { name: api.appString('SWING.STR:CANCEL'), command: 'SWING_CMD:QUIT_SELF' }
                            ]
                        }
                    })
                break
            }
        },
        
        // i personally haven't used Qt, but this seems similar based on samples i've seen
        // the `api.element` part is there because people will be able to define their own
        // componenets, just like React or Svelte i guess
        // api.element is just the built-in library of elements
        content: [
            {
                type: api.element['Label'],
                content: api.appString('label-information-text')
            },
            {
                id: 'color-box',
                type: api.element['ColorBox'],
                color: '#f00'
            }
        ],
        
        // langMap is exactly the same as api-test.js
        // for clarification, 'pirate' is going to be a test language to test this since i do not have any team members at all currently, never mind team members who can fluently speak another langauge
        langMap: {
            "app-title": {
                'en': "API Test",
                'pirate': "Yarr! This here a test for APIs!"
            },
            "label-information-text": {
                'en': 'Use the "Colours" option above to change the colour of this box.',
                'en-us': 'Use the "Colors" option above to change the color of this box.', // you can define country codes for dialects. "color" is mostly only used in us english, but "colour" is used in practically every other english-speaking country
                'pirate': `Aye, matie! Use me "Colours" option to change the colour of ye box down under.`
            },
            "Colours": {
                'en': "Colours",
                'en-us': "Colors",
                'pirate': "Colours" // i don't know any american pirates
            },
            "Message": {
                'en': "Message",
                'pirate': "Parrot"
            },
            "Did something!": {
                'en': "Did something!",
                'pirate': "Did something'!"
            },
            "Yup, did something.": {
                'en': "Yup, did something.",
                'pirate': "Aye, did somethin'."
            }
        }
    }
}
