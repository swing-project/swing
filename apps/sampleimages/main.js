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
        <img class="one"   src="/media/resources/sample-images/roonz-nl-ATgfRqpFfFI-unsplash.jpg"        style="display: block" />
        <img class="two"   src="/media/resources/sample-images/steven-kamenar-MMJx78V7xS8-unsplash.jpg"  style="display: none"  />
        <img class="three" src="/media/resources/sample-images/thomas-vimare-IZ01rjX0XQA-unsplash.jpg"   style="display: none"  />
    </div>
    `,
    menubar: [
        {
            name: 'Images',
            items: [
                // need to figure out a way to DRY this,
                // but because everything is executed in one place
                // it's hard to define functions that work properly
                // isolation needed!
                { name: 'Image 1', command: function (clientId, _api) {
                    const container = document.getElementById(clientId).querySelector('.content > .container')
                    container.querySelectorAll('img').forEach((element) => element.style.display = 'none')
                    container.querySelector('img.one').style.display = 'block'
                }},
                { name: 'Image 2', command: function (clientId, _api) {
                    const container = document.getElementById(clientId).querySelector('.content > .container')
                    container.querySelectorAll('img').forEach((element) => element.style.display = 'none')
                    container.querySelector('img.two').style.display = 'block'
                }},
                { name: 'Image 3', command: function (clientId, _api) {
                    const container = document.getElementById(clientId).querySelector('.content > .container')
                    container.querySelectorAll('img').forEach((element) => element.style.display = 'none')
                    container.querySelector('img.three').style.display = 'block'
                }}
            ]
        }
    ]
}

function switchImage(className, clientId) {
    const container = document.getElementById(clientId).querySelector('.content > .container')
    
    container.querySelectorAll(`img.${className}`).style.display = 'block'
}
