export const client = {
    id:    'swingtools--imgviewer',
    title: 'Image Viewer',
    icon:  'image-outline',
    size: {
        preset: 'default'
    },
    content: `
        <div class="container d-flex flexdir-col ai-center jc-center p-3">
            <span class="instructions">Use the "Open" option above to open an image.</span>
            
            <img class="image-box" alt="Shown Image" style="display: none" />
        </div>
    `,
    menubar: [
        {
            name:  'File',
            items: [
                { name: 'Open...', command: openFile }
            ]
        }
    ]
}

function openFile(clientId, api, _args) {
    api.create.messageBox({
        type:    'ask',
        title:   'Open image...',
        message: {
            icon:        'document-outline',
            heading:     'Choose a file name to open',
            description: 'Type the filename for the image or directory to open.',
            submit:      'Open',
            cancel:      'Cancel'
        },
        onSubmit: (filename) => {
            let container = document.querySelector(`${clientId} > .content > .container`)
            container.querySelector('.instructions').style.display = 'none'
            container.querySelector('.image-box').src = api.fs.getUserFile(filename)
        },
        onCancel: (_filename) => {}
    })
}
