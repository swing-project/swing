export const client = {
    testingNew: true,
    id:         'samrland-WindowAPITest',
    title:      'WindowAPI Test',
    size:       {
        preset: 'small'
    },
    content:    function (api) {
        return `<p class="text">Hello, World! You are taking a look at ${api.clientId}.</p>`
    },
    menubar: [
        {
            name: 'Things',
            items: [
                { name: 'Add to content',       command: addToContent },
                { name: 'Try accessing window', command: tryIt        }
            ]
        }
    ]
}

function addToContent(api) {
    api.window.select('.text').innerText = 'Wow! Text changes!'
}

function tryIt(api) {
    window.alert('This does not work :(')
}
