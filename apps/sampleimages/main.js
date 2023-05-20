export const client = {
    id: 'samrland--sampleimages',
    title: 'Sample Images',
    disallowMultiple: true,
    icon: 'images-outline',
    size: {
        width: '900px',
        height: '600px',
        rigid: true
    },
    content: `
    <div class="container d-flex ai-center jc-center">
        <img alt="Sample Image 1" class="one"   src="/media/resources/sample-images/roonz-nl-ATgfRqpFfFI-unsplash.jpg"        style="display: block" />
        <img alt="Sample Image 2" class="two"   src="/media/resources/sample-images/steven-kamenar-MMJx78V7xS8-unsplash.jpg"  style="display: none"  />
        <img alt="Sample Image 3" class="three" src="/media/resources/sample-images/thomas-vimare-IZ01rjX0XQA-unsplash.jpg"   style="display: none"  />
    </div>
    `,
    menubar: [
        {
            name: 'Images',
            items: [
                { name: 'Image 1', command: (clientId, _api, _args) => switchImage('one',   clientId) },
                { name: 'Image 2', command: (clientId, _api, _args) => switchImage('two',   clientId) },
                { name: 'Image 3', command: (clientId, _api, _args) => switchImage('three', clientId) }
            ]
        }
    ]
}

function switchImage(className, clientId) {
    const container = document.getElementById(clientId).querySelector('.content > .container')
    container.querySelectorAll('img').forEach((element) => element.style.display = 'none')
    container.querySelectorAll(`img.${className}`)[0].style.display = 'block'
}
