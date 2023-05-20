export const client = {
    id: 'ivy--docs',
    title: 'Swing Docs',
    size: {
        width: '1200px',
        height: '800px'
    },
    pref: {
        'no-padding': true
    },
    noPadding: true,
    icon: 'book-outline',
    content: function (_clientId, _api) {
        const accentColor = encodeURIComponent(document.body.style.getPropertyValue('--accent'))
        const highlight = encodeURIComponent(document.body.style.getPropertyValue('--highlight'))
        const fontFamily = encodeURIComponent(document.body.style.getPropertyValue('--fontselection'))
        const fontMono = encodeURIComponent(document.body.style.getPropertyValue('--font-monospace'))
        return `<iframe src="/apps/docs/main.html?accent=${accentColor}&fontFamily=${fontFamily}&highlight=${highlight}&fontMono=${fontMono}" title="docs iframe" style="width: 100%; height: 100%" />`
    }
}
