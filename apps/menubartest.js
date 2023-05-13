export const client = {
    id: 'menubar-test',
    title: 'Menubar Test',
    size: {
        preset: 'default'
    },
    icon: 'bug-outline',
    content: `<p>Content!</p>`,
    menubar: [
        {
            name: 'File',
            items: [
                { name: 'Import', command: function (clientId, api) {
                    alert('import')
                }},
                { name: 'Export', command: function (clientId, api) {
                    alert('export')
                }},
                { name: 'SWING_SEPERATOR' },
                { name: 'Reset', command: function (clientId, api) {
                    alert('reset')
                }}
            ]
        }
    ]
}