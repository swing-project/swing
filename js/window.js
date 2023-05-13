function createWindow(object)
{
    const currentWindowAmount = document.getElementsByClassName('window').length

    let windowId = ''
    if (object?.disallowMultiple !== null && object?.disallowMultiple !== undefined && object.disallowMultiple) {
        if (document.getElementById(object.id) == null) {
            windowId = object.id
        } else {
            return
        }
    } else {
        windowId = 'w--' + currentWindowAmount + '--' + object.id
    }

    // const prefExists = true ? object?.pref !== null : false

    const windowObject = document.createElement('div')
    windowObject.id = windowId
    windowObject.classList.add('window')
    windowObject.onmousedown = () => { focusWindow(windowId) }
    windowObject.setAttribute('data-maximized', 'false')

    // if (prefExists && object?.pref?.noPadding) {
    // 	windowObject.classList.add('no-padding')
    // }

    // if (object?.pref !== null && object?.pref !== undefined && object.pref?.noPadding) {
    // 	windowObject.classList.add('no-padding')
    // }

    if (object?.noPadding !== null && object?.noPadding !== undefined && object.noPadding) {
        windowObject.classList.add('no-padding')
    }

    const windowLocation = 'calc(25% + ' + (currentWindowAmount * 20) + 'px'
    windowObject.style.top = windowLocation
    windowObject.style.left = windowLocation

    if (object.size.preset !== undefined && object.size.preset !== null && object.size.preset !== '' && object.size.preset !== 'none')
    {
        switch (object.size.preset)
		{
            default:
                case 'default':
                    setHeightWidth(windowObject, '325px', '550px')
				break
			case 'mini':
                setHeightWidth(windowObject, '150px', '250px')
				break
			case 'small':
                setHeightWidth(windowObject, '298px', '502px')
				break
			case 'medium':
                setHeightWidth(windowObject, '400px', '650px')
				break
			case 'large':
                setHeightWidth(windowObject, '425px', '772px')
				break
			case 'xlarge':
                setHeightWidth(windowObject, '800px', '1200px')
				break
        }
    }
	else
    {
        if (object.size.minheight)
        {
            windowObject.style.minHeight = object.size.minheight
        }
        if (object.size.minwidth)
        {
            windowObject.style.minWidth = object.size.minwidth
        }
        if (object.size.rigid)
        {
            windowObject.classList.add('rigid')
        }
        setHeightWidth(windowObject, object.size.height, object.size.width)
    }

    // * title bar
    const menubarObject = document.createElement('div')
    menubarObject.className = 'titlebar'
    menubarObject.ondblclick = () => toggleFoldWindow(windowId)

    const menubarWindowControlsObject = document.createElement('div')
    menubarWindowControlsObject.className = 'window-controls'
    // menubarWindowControlsObject.innerHTML += `<div class="window-control maximize" onclick="toggleMaximize('${windowId}')"></div>`
    menubarWindowControlsObject.innerHTML += `<div class="window-control close" onclick="removeWindow('${windowId}')"></div>`

    const menubarTitleObject = document.createElement('div')
    menubarTitleObject.className = 'title'

    const menubarTitleSpanObject = document.createElement('span')
    menubarTitleSpanObject.innerText = object.title

    menubarTitleObject.append(menubarTitleSpanObject)

    menubarObject.append(menubarWindowControlsObject)
    menubarObject.append(menubarTitleObject)

    windowObject.appendChild(menubarObject)

    // * menubar
    if (object?.menubar !== undefined && object?.menubar !== null) {
        const swingMenubar = document.createElement('div')
        swingMenubar.className = 'menubar'

        object.menubar.forEach(menu => {
            const swingMenu = document.createElement('div')
            swingMenu.className = 'menu'

            const swingMenuTitle = document.createElement('span')
            swingMenuTitle.className = 'menu-title'
            swingMenuTitle.innerText = menu.name

            const swingMenuContent = document.createElement('div')
            swingMenuContent.className = 'menu-content'

            menu.items.forEach(menuItem => {
                const swingMenuItem = document.createElement('span')
                switch (menuItem.name) {
                    case 'SWING_SEPERATOR':
                        swingMenuItem.className = 'seperator'
						break
					default:
                        swingMenuItem.innerText = menuItem.name
						swingMenuItem.onclick = () => menuItem.command(windowId, api)
						break
                }
                swingMenuContent.appendChild(swingMenuItem)
            })

            swingMenu.appendChild(swingMenuTitle)
            swingMenu.appendChild(swingMenuContent)

            swingMenubar.appendChild(swingMenu)
        })

        windowObject.appendChild(swingMenubar)
    }

    // * content
    const contentObject = document.createElement('div')
    contentObject.className = 'content'
    if (typeof object.content === 'string') {
        contentObject.innerHTML = object.content.replace(/%human-id%/g, windowId).replace(/%human%/g, windowId).replace(/%\\human%/g, '%human%').replace(/%\\human-id%/g, '%human-id%')
    } else if (typeof object.content === 'function') {
        contentObject.innerHTML = object.content(windowId, api)
    } else {
        console.error("no content given for window declaration")
    }
    if (object?.contentStyling !== null && object?.contentStyling !== undefined && object.contentStyling)
    {
        contentObject.style = object.contentStyling
    }

    windowObject.appendChild(contentObject)

    // * options
    if (object.options !== undefined && object.options !== null && object.options !== '')
    {
        const optionsObject = document.createElement('div')
        optionsObject.className = 'options'

        object.options.forEach(optionData => {
            let optionObject = document.createElement('button')
            optionObject.innerText = optionData.name

            if (optionData.message == 'script')
            {
                optionObject.addEventListener('click', optionData.messagescript(windowId, api))
            }
			else if (optionData.message == 'closeSelf')
            {
                optionObject.addEventListener('click', function() { removeWindow(windowId) })
            }

            optionsObject.appendChild(optionObject)
        })

        windowObject.appendChild(optionsObject)

        if (object?.noOptionsPadding !== null && object?.noOptionsPadding !== undefined && object.noOptionsPadding)
        {
            windowObject.classList.add('no-options-padding')
        }
    }

    // * run preload
    if (object.preload !== undefined && object.preload !== null) {
        object.preload(windowObject)
    }

    // * set attributes
    windowObject.setAttribute('data-folded', 0)

    // * append to body
    document.body.appendChild(windowObject)

    // * make draggable
    makeDraggable(windowObject)

    // * add icon to dock
    const menuIcon = document.createElement('ion-icon')
    menuIcon.className = 'icon'
    menuIcon.name = object.icon || 'copy-outline'
    menuIcon.setAttribute('data-attached-window', windowId)
    menuIcon.onclick = () => focusWindow(windowId)
    menuIcon.ondblclick = () => removeWindow(windowId)
    document.getElementById('dock').appendChild(menuIcon)

    // * focus window
    focusWindow(windowId)

    // * onload
    if (object.onload !== undefined && object.onload !== null)
    {
        object.onload(windowId, api)()
    }
}

let positionX = 0, positionY = 0, clientXPosition = 0, clientYPosition = 0

function makeDraggable(currentWindow)
{
    const currentWindowMenuBar = currentWindow.getElementsByClassName('titlebar')[0]

    currentWindowMenuBar.onmousedown = e => {
        e = e || window.event
        e.preventDefault()

        clientXPosition = e.clientX
        clientYPosition = e.clientY

        document.onmousemove = e => {
            e = e || window.event
            e.preventDefault()

            positionX = clientXPosition - e.clientX
            positionY = clientYPosition - e.clientY

            clientXPosition = e.clientX
            clientYPosition = e.clientY

            currentWindow.style.left = (currentWindow.offsetLeft - positionX) + 'px'
            currentWindow.style.top = (currentWindow.offsetTop - positionY) + 'px'
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}

function toggleFoldWindow(windowId)
{
    const windowNode = document.getElementById(windowId)
    const optionsExist = (windowNode.getElementsByClassName('options')[0] !== undefined)

    if (windowNode.getAttribute('data-folded') == 'true')
    {
        endFoldWindow(windowNode, optionsExist)
    }
	else
    {
        startFoldWindow(windowNode, optionsExist)
    }
}

function startFoldWindow(windowNode, optionsExist)
{
    windowNode.getElementsByClassName('content')[0].style.display = 'none'
    if (optionsExist) 
    {
        windowNode.getElementsByClassName('options')[0].style.display = 'none'
    }
    windowNode.setAttribute('data-folded', 'true')
}

function endFoldWindow(windowNode, optionsExist)
{
    windowNode.getElementsByClassName('content')[0].style.display = 'block'
    if (optionsExist)
    {
        windowNode.getElementsByClassName('options')[0].style.display = 'flex'
    }
    windowNode.setAttribute('data-folded', 'false')
}

function toggleMaximize(windowId)
{
    const windowNode = document.getElementById(windowId)

    if (windowNode.getAttribute('data-maximized') == ('false' || undefined))
    {
        maximizeWindow(windowId)
    }
	else
    {
        restoreWindow(windowId)
    }
}

function maximizeWindow(windowId)
{
    const windowNode = document.getElementById(windowId)

    // store information
    windowNode.setAttribute('data-original-style-top', windowNode.style.top)
    windowNode.setAttribute('data-original-style-left', windowNode.style.left)
    windowNode.setAttribute('data-original-style-height', windowNode.style.height)
    windowNode.setAttribute('data-original-style-width', windowNode.style.width)

    windowNode.style.top = '22px'
    windowNode.style.left = '0px'

    setHeightWidth(windowNode, window.innerHeight + 'px', window.innerWidth + 'px')

    windowNode.style.height = `calc(${window.innerHeight} - 22px)`

    windowNode.setAttribute('data-maximized', 'true')
}

function restoreWindow(windowId)
{
    const windowNode = document.getElementById(windowId)

    windowNode.style.top = windowNode.getAttribute('data-original-style-top')
    windowNode.style.left = windowNode.getAttribute('data-original-style-top')
    windowNode.style.height = windowNode.getAttribute('data-original-style-height')
    windowNode.style.width = windowNode.getAttribute('data-original-style-width')

    windowNode.setAttribute('data-maximized', 'false')
}

function removeWindow(windowId)
{
    document.getElementById(windowId).remove()
    document.querySelector(`#dock > .icon[data-attached-window='${windowId}']`).remove()
}

function deleteAll()
{
    document.querySelectorAll('.window').forEach(function(currentValue, _currentIndex, _listObj) { removeWindow(currentValue.id) })
}

function deleteFocus()
{
    removeWindow(document.querySelector('.window.focus').id)
    focusWindow(document.querySelector(`.window[id^='w--${document.getElementsByClassName('window').length - 1}--']`).id)
    // deleteLastWindow() // this will only be used until proper focusing is added in.
}

function deleteLastWindow()
{
    const windows = document.querySelectorAll('.window')
    const windowId = windows[windows.length - 1].id // gets last window's id
    removeWindow(windowId)
}

function focusWindow(windowId)
{
    document.querySelectorAll('.window').forEach((windowElement) => windowElement.classList.remove('focus'))
    document.getElementById(windowId).classList.add('focus')
    document.querySelectorAll(`#dock > .icon`).forEach((iconElement) => iconElement.classList.remove('focus'))
    document.querySelector(`#dock > .icon[data-attached-window='${windowId}']`).classList.add('focus')
}

function setHeightWidth(windowNode, height, width)
{
    windowNode.style.height = height
    windowNode.style.width = width
}
