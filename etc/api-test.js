// api-test based on Be API
// (Haiku rocks!)
// also takes a bit from FriendOS's API

// because of the 1task==1window paradigm of swing, this is a little hard,
// but i'll try doing something

// the top-level will still be declared as `client`,
// but it does look a little different from last time
export const client = {
    clientType: 'window-api',

    // this part here is based on FriendOS, which kind of inspired this project
    "Name": "API Test",
    "Description": "A really good example app",
    "Category": "Application",
    "Version": "1.0",
    "Author": "samrland",
    // because we can't just let people run around and do whatever they want, there are permissions now
    // `applyFilter` is used to add a colour filter overlaying the screen
    // this is kinda useless currently, since client.main is still executed on that page,
    // but it'll help me try and do something in the future
    "Permissions": [ "applyFilter" ]
}

// the init function
client.main = function (api) {
    // Be API time!
    const happ = new api.HApp({
        title: api.appString('app-title'), // see client.langMap
        defaultSize: "800x500",
        minimumSize: "150x250",
        maximumSize: "1920x1080"
    })

    happ.setMenuItems([
        {
            name: api.appString('Program'),
            items: [
                { name: appString('Message'), command: 'do-something'},
                { name: 'H_SEPERATOR' },
                { name: appString('Quit'), command: 'H_QUIT'}
            ]
        },
        {
            name: api.appString('Colours'),
            items: [
                { name: appString('Red'), command: 'colour-red' }
            ]
        }
    ])

    // const menubar = new api.HMenuBar()

    // const menuItemProgram = new api.HMenuItem({
    //     name: api.appString('Program'),
    //     items: [
    //         {
    //             name: appString('Quit'),
    //             command: 'do-something'
    //         }
    //     ]
    // })

    return happ
}

// again FriendOS
client.reciever = function (message, api) {
    switch (message) {
        case "do-something":
            api.MessageBox({
                title: api.appString('Did something!'),
                size: '250x150',
                message: {
                    icon: 'information-circle-outline',
                    heading: api.appString('Did something!'),
                    label: api.appString('Yup, did something.'),
                    buttons: [
                        { title: api.appString('H_OK'), message: 'H_CLOSE_SELF' },
                        { title: api.appString('H_CANCEL'), message: 'H_CLOSE_SELF' }
                    ]
                }
            })
            break
    }
}

// this is also based on Friend
// api.appString will use this index because different languages
// because this is encoded in JSON, you don't have to use some special code, you can just use your native language for the keys
// pirate-lang courtesy of https://lingojam.com/PirateSpeak
client.langMap = {
    "app-title": {
        'en': "API Test",
        'pirate': "Yarr! This here a test for APIs!"
    },
    "Colours": {
        'en': "Colours",
        'en-us': "Colors", // you can define country codes, too
        'pirate': "Colours"
    },
    "Message": {
        'en': "Message",
        'pirate': "Parrot"
    },
    "Did something!": {
        'en': "Did something!",
        'pirate': "Did somethin'!"
    },
    "Yup, did something.": {
        'en': "Yup, did something.",
        'pirate': "Aye, did somethin'."
    }
}

// this is a feature special to swing out of Be and FriendOS, I think
// but it is very common in other operating systems
// a singular docs application!
// this is the syntax for adding to the docs application
// i'm currently not sure how to support multiple languages here, but we'll figure that out
client.docs = [
    {
        title: 'Message Button',
        content: [
            {
                type: 'paragraph',
                text: "The program menu item contains an item known as 'Message'. Clicking on this will bring up a message box that looks like this:"
            },
            {
                type: 'photograph',
                source: '' // wait how will this work with single-file applications??? this paradigm is really hard to follow
            }
        ]
    }
]
