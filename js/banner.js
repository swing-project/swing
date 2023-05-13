
/**
 * Used to create a dialog banner overlaying the entire screen.
 * 
 * @param {object} object A JSON object following the dialog syntax.
 */
function createDialog(object) {
    // if (document.getElementById('dialog') !== null) { // need to create a way to check if there is no dialog already on screen and handle it accordingly
    const dialogObject = document.createElement('div')
    dialogObject.id = 'dialog'

    const wrapperObject = document.createElement('div')
    wrapperObject.className = 'wrapper'
    dialogObject.appendChild(wrapperObject)

    const contentObject = document.createElement('div')
    contentObject.className = 'content'
    wrapperObject.appendChild(contentObject)

    const titleObject = document.createElement('h1')
    titleObject.innerText = object.title
    contentObject.appendChild(titleObject)

    const descriptionObject = document.createElement('div')
    descriptionObject.className = 'description'
    descriptionObject.innerHTML = object.description
    contentObject.appendChild(descriptionObject)

    if (object.type == 'button-options') {
        const optionsObject = document.createElement('div')
        optionsObject.className = 'button-options'

        object.buttonOptions.forEach(optionData => {
            let optionObject = document.createElement('button')
            optionObject.innerText = optionData.name

            optionObject.addEventListener('click', optionData.script(object.callerId))

            optionsObject.appendChild(optionObject)
        })

        contentObject.appendChild(optionsObject)
    } else {
        const optionsObject = document.createElement('div')
        optionsObject.className = 'button-options'

        const optionObject = document.createElement('button')
        optionObject.innerText = 'OK'
        optionObject.addEventListener('click', () => {
            document.getElementById('dialog').remove()
        })

        optionsObject.appendChild(optionObject)
        contentObject.appendChild(optionsObject)
    }

    document.body.appendChild(dialogObject)

    // return 0
    // } else {
    // 	return 1
    // }
}
