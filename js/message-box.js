function createMessageBox(clientId, object) {
    const messageboxobject     = document.createElement('div')
    messageboxobject.className = 'message-box'
    messageboxobject.setAttribute('data-attached-window', clientId)
    
    const windowStyle           = getComputedStyle(document.getElementById(clientId))
    messageboxobject.style.top  = String(Number(windowStyle.top.slice(0, -2))  + (Number(windowStyle.height.slice(0, -2)) / 4)) + "px"
    messageboxobject.style.left = String(Number(windowStyle.left.slice(0, -2)) + (Number(windowStyle.width.slice(0, -2))  / 4)) + "px"
    
    // * hooray for titlebars!
    const messageboxTitlebar     = document.createElement('div')
    messageboxTitlebar.className = 'titlebar'
    messageboxobject.appendChild(messageboxTitlebar)
    
    const messageboxTitlebarTitle     = document.createElement('div')
    messageboxTitlebarTitle.className = 'title'
    messageboxTitlebar.appendChild(messageboxTitlebarTitle)
    
    const messageboxTitlebarTitleSpan     = document.createElement('span')
    messageboxTitlebarTitleSpan.innerText = object.title
    messageboxTitlebarTitle.appendChild(messageboxTitlebarTitleSpan)
    
    // * content is content
    const contentobject     = document.createElement('div')
    contentobject.className = 'content'
    messageboxobject.appendChild(contentobject)
    
    const iconrow     = document.createElement('div')
    iconrow.className = 'icon-row'
    const ionicon     = document.createElement('ion-icon')
    ionicon.name      = object.message.icon
    
    contentobject.appendChild(iconrow)
    iconrow.appendChild(ionicon)
    
    const messagepart           = document.createElement('div')
    messagepart.className       = 'message'
    const headingobject         = document.createElement('span')
    headingobject.className     = 'heading'
    headingobject.innerText     = object.message.heading
    const descriptionobject     = document.createElement('span')
    descriptionobject.className = 'description'
    descriptionobject.innerText = object.message.description
    
    contentobject.appendChild(messagepart)
    messagepart.appendChild(headingobject)
    messagepart.appendChild(descriptionobject)
    
    // * the many options
    const optionsObject     = document.createElement('div')
    optionsObject.className = 'options'
    messageboxobject.appendChild(optionsObject)
    
    const optionBase = () => { // don't want to use a variable because the DOM is weird
        const button = document.createElement('button')
        button.addEventListener('click', () => {
            messageboxobject.remove()
            document.getElementById(clientId).classList.remove('has-message-box')
        })
        return button
    }
    
    const cancelOption = optionBase()
    cancelOption.innerText = object.message.cancel
    optionsObject.appendChild(cancelOption)
    
    const submitOption = optionBase()
    submitOption.innerText = object.message.submit
    optionsObject.appendChild(submitOption)
    
    // * based on type
    switch (object.type) {
        case 'ask':
            let textInput       = document.createElement('input')
            textInput.type      = 'text'
            textInput.className = 'text-input'
            messagepart.appendChild(textInput)
            
            if (object.message.defaultValue !== undefined) {
                textInput.value = object.message.defaultValue
            }
        
            submitOption.addEventListener('click', () => object.onSubmit(textInput.value))
            cancelOption.addEventListener('click', () => object.onCancel(textInput.value))
            break
        default:
            submitOption.addEventListener('click', () => object.onSubmit())
            cancelOption.addEventListener('click', () => object.onCancel())
            break
    }
    
    // * finish
    document.getElementById(clientId).classList.add('has-message-box')
    document.body.appendChild(messageboxobject)
}

// example dialog
(() => {
    return {
        type:  'ask',
        title: 'Save as...',
        message: {
            icon:        'document-outline',
            heading:     'Choose a file name',
            description: 'To save this file, use a file name. This will be used so you can access the file later.',
            submit:      'Save',
            cancel:      'Cancel'
        },
        onSubmit: (textContents) => {
            let api = { saveUserFile: (_name, _contents) => {} } // this is only here to get language servers to stop pestering me
            let someContents = 'Wow!\nStuff!'
            api.fs.saveUserFile(textContents, someContents)
        },
        onCancel: (_textContents) => {}
    }
})()
