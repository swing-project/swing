export const client = {
    id: 'ivy:web-searcher',
    title: 'Web Searcher',
    icon: 'search-outline',
    size: {
        height: '92px',
        width: '250px',
        rigid: 'true',
    },
    content: `
    <input type="text" id="%human%-input" placeholder="Search for anything..." />
    `,
    options: [
        {
            name: 'Cancel',
            message: 'closeSelf',
        },
        {
            name: 'Search',
            message: 'script',
            messagescript: function (clientId, _api) {
                return function () {
                    const searchQuery = document.getElementById(`${clientId}-input`).value
                    if (searchQuery !== '' && searchQuery !== null && searchQuery !== undefined && /\S/.test(searchQuery)) {
                        window.open(`https://duckduckgo.com/?q=${searchQuery}`)
                    }
                }
            }
        }
    ]
}
