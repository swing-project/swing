export const client = {
    id:    'ivy--markrender',
    title: 'MarkRender',
    icon:  'logo-markdown',
    size:  { preset: 'default' },
    content: `<div class="output" style="height: 100%; width: 100%; position: absolute;">No file open. Use the options above to open a file.</div>`,
    menubar: [
        {
            name: 'File',
            items: [
                { name: 'Open...',       command: openFile    },
                { name: 'Open in Write', command: openInWrite },
            ]
        }
    ]
}

function setOutput(clientId, filename) {
    const outputBox = document.getElementById(clientId).querySelector('.output')
    outputBox.innerHTML = marked.parse(api.fs.getUserFile(filename))
    outputBox.setAttribute('data-open-file-name', filename)
}

function openFile(clientId, _api, _args) {
    api.create.messageBox(clientId, {
        type: 'ask',
        title: 'Open file...',
        message: {
            icon:        'document-outline',
            heading:     'Select a file name',
            description: 'To open a file, use the filename for it.',
            submit:      'Open',
            cancel:      'Cancel'
        },
        onSubmit: (filename) => {
            if (api.fs.getUserFile(filename) !== undefined) {
                setOutput(clientId, filename)
            } else {
                api.create.messageBox(clientId, {
                    type: 'message',
                    title: 'Save as...',
                    message: {
                        icon:        'alert-circle-outline',
                        heading:     'This file does not exist.',
                        description: "The file name you just entered does not exist. Make sure that you spelled it right.",
                        submit:      'OK',
                        cancel:      'Cancel'
                    },
                    onSubmit: () => {},
                    onCancel: () => {}
                })
            }
        },
        onCancel: (_filename) => {}
    })
}

function openInWrite(clientId, api, _args) {
    api.create.externalWindow(
        '/apps/write/write.js',
        { '@fromMarkRender': true, 'filename': document.getElementById(clientId).querySelector('.output').getAttribute('data-open-file-name') }
    )
}
