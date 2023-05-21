export const client = {
    id: 'ivy--docs',
    title: 'Swing Docs',
    size: {
        width: '1200px',
        height: '800px'
    },
    pref: {
        'no-padding': true // need to fix pref and stop stuffing everything into the top-level
    },
    noPadding: true,
    icon: 'book-outline',
    content: `<iframe src="/apps/docs/main.html" title="docs iframe" style="width: 100%; height: 100%" />`,
    onload: function (clientId, _api, _args) {
        const leIframe = document.getElementById(clientId).querySelector('.content > iframe').contentWindow

        leIframe.onload = () => leIframe.setUserPreferences({
            accent:     document.body.style.getPropertyValue('--accent'),
            highlight:  document.body.style.getPropertyValue('--highlight'),
            fontFamily: document.body.style.getPropertyValue('--fontselection'),
            fontMono:   document.body.style.getPropertyValue('--font-monospace')
        })
    }
}
