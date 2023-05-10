const hver = {
	'id': 'hver',
	'title': 'hver',
	'size': {
		'preset': 'mini'
	},
	'icon': 'cog-outline',
	'content': `
	humanOS-frontend 2023.5a
	`
}

window.onload = function() {
	if (localStorage.getItem('not-first-time') != 'true') {
		localStorage.setItem('not-first-time', 'true')

		// set settings to defaults
		resetSettings()

		// first time notification
		desktopNotification({
			'title': 'Welcome to humanOS!',
			'description': 'humanOS is an online operating system designed for productivity and effeciency.<br />Click on this notification bubble to learn more!',
			'action': () => createExternalWindow('/apps/learnHuman.js'),
			'playSound': false
		})
	}

	findNewSettings()
	refresh()
	repopulateAppGrid()

	if (localStorage.getItem('setting-behavior-startup-open-bugman') === 'true') {
		createWindow(bugman)
	}
}

// List of setting names and default values
const settingsList = {
	'configured-apps': {
		'default': `[]`,
		'settingInput': {
			'name': 'configured-apps',
			'type': 'text'
		}
	},
	'custom-styles': {
		'default': ``,
		'settingInput': {
			'name': 'custom-styles',
			'type': 'text'
		}
	},
	'setting-color-accent': {
		'default': `#ff7800`,
		'settingInput': {
			'name': 'color-accent',
			'type': 'text'
		}
	},
	'setting-color-accent-light': {
		'default': `#ffc999`,
		'settingInput': {
			'name': 'color-accent-light',
			'type': 'text'
		}
	},
	'setting-font-selection': {
		'default': `'FiraGO', 'Fira Sans', 'Noto Sans', sans-serif`,
		'settingInput': {
			'name': 'input-font-selection',
			'type': 'text'
		}
	},
	'setting-font-monospace': {
		'default': `'Fira Mono', Menlo, Consolas, monospace`,
		'settingInput': {
			'name': 'input-font-monospace',
			'type': 'text'
		}
	},
	'setting-wallpaper-location': {
		'default': `url('/wallpapers/unsplash-collection/photo-1458501534264-7d326fa0ca04.jpeg')`,
		'settingInput': {
			'name': 'input-wallpaper-location',
			'type': 'text'
		}
	},
	'meta-key': {
		'default': 'altopt',
		'settingInput': {
			'name': 'behavior-meta-key',
			'type': 'select'
		}
	},
	'setting-behavior-menu-applications': {
		'default': 'app-menu',
		'settingInput': {
			'name': 'behavior-menu-applications',
			'type': 'select'
		}
	},
	'setting-behavior-startup-open-bugman': {
		'default': false,
		'settingInput': {
			'name': 'behavior-startup-open-bugman',
			'type': 'checkbox'
		}
	},
	'setting-behavior-close-applist': {
		'default': false,
		'settingInput': {
			'name': 'behavior-close-applist',
			'type': 'checkbox'
		}
	}
}

const wallpaperList = [
    {
        name: 'Night',
        path: '/wallpapers/unsplash-collection/benjamin-voros-phIFdC6lA4E-unsplash.jpg',
    },
    {
        name: 'Road',
        path: '/wallpapers/unsplash-collection/cristina-gottardi-84RNIdh3EwU-unsplash.jpg',
    },
    {
        name: 'Beach',
        path: '/wallpapers/unsplash-collection/iswanto-arif-OJ74pFtrYi0-unsplash.jpg',
    },
    {
        name: 'Wave',
        path: '/wallpapers/unsplash-collection/jeremy-bishop-cEeEtjedNls-unsplash.jpg',
    },
    {
        name: 'Terrain',
        path: '/wallpapers/unsplash-collection/kai-oberhauser-BKAaLmT0tIs-unsplash.jpg',
    },
    {
        name: 'Maple',
        path: '/wallpapers/unsplash-collection/lyndon-li-zrT1tjnxJKQ-unsplash.jpg',
    },
    {
        name: 'Lavender',
        path: '/wallpapers/unsplash-collection/photo-1544892504-5a42d285ab6f.jpeg',
    },
    {
        name: 'Rocks',
        path: '/wallpapers/unsplash-collection/photo-1458501534264-7d326fa0ca04.jpeg',
    },
    {
        name: 'Mountain',
        path: '/wallpapers/unsplash-collection/photo-1472396961693-142e6e269027.jpeg',
    },
    {
        name: 'Peak',
        path: '/wallpapers/unsplash-collection/photo-1489619243109-4e0ea59cfe10.jpeg',
    },
	{
		name: 'Reflection',
		path: 'https://malwarewatch.org/images/wallpapers/Reflection.jpg',
	}
]

// See if a setting entry is missing, and if so, create it with the default value
function findNewSettings()
{
	for (const settingName in settingsList)
	{
		if (Object.hasOwnProperty.call(settingsList, settingName))
		{
			const settingAttributes = settingsList[settingName]
			if (localStorage.getItem(settingName) === null)
			{
				localStorage.setItem(settingName, settingAttributes.default)
			}
		}
	}
}

// Reset all settings to their defaults
function resetSettings()
{
	for (const settingName in settingsList)
	{
		if (Object.hasOwnProperty.call(settingsList, settingName))
		{
			const settingAttributes = settingsList[settingName]
			localStorage.setItem(settingName, settingAttributes.default)
		}
	}
}

// set styles
function refresh()
{
	document.body.style = localStorage.getItem('custom-styles')

	document.body.style.setProperty('--accent', localStorage.getItem("setting-color-accent"))
	document.body.style.setProperty('--highlight', localStorage.getItem("setting-color-accent-light"))
	document.body.style.setProperty("--fontselection", localStorage.getItem("setting-font-selection"))
	document.body.style.setProperty("--font-monospace", localStorage.getItem("setting-font-monospace"))
	document.body.style.setProperty("--wallpaper-location", localStorage.getItem("setting-wallpaper-location"))
}

async function repopulateAppGrid()
{
	document.querySelector('body > #app-grid > .grid').innerHTML = ''

	// shownApps is defined at end due to limitations in the thing
	for (const key in shownApps)
	{
		const element = await shownApps[key]()

		const icon = document.createElement('div')
		icon.className = 'icon'
		icon.title = element.id
		icon.onclick = () => {
			createWindow(element)
			closeAppGrid()
		}

		const ionicon = document.createElement('ion-icon')
		if (element.icon !== undefined && element.icon !== null && element.icon !== '')
		{
			ionicon.name = element.icon
		}
		else
		{
			ionicon.name = 'document-outline'
		}

		const label = document.createElement('span')
		label.className = 'label'
		label.innerText = element.title

		icon.appendChild(ionicon)
		icon.appendChild(label)

		document.querySelector('body > #app-grid > .grid').appendChild(icon)
	}
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function setSystemMenuDate()
{
	const currentDate = new Date()
	const currentTime = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	document.getElementById('datetime-label').innerText = (months[currentDate.getMonth()]) + ' ' + currentDate.getDate() + ' ' + currentTime
	setInterval(setSystemMenuDate, 1000)
}

setSystemMenuDate()

function characterControl(e)
{
	const metaPressed = (
		(localStorage.getItem('meta-key') == 'altopt' && e.altKey) ||
		(localStorage.getItem('meta-key') == 'ctrl' && e.ctrlKey)
	)
	const menuPressed = (
		(localStorage.getItem('meta-key') == 'altopt' && e.ctrlKey) ||
		(localStorage.getItem('meta-key') == 'ctrl' && e.altKey)
	)

	// if (e.altKey) {
	// 	console.log('meta key pressed')
	// }

	if (metaPressed && e.key == '/')
	{
		openShortcutCheatSheet()
	}

	if (metaPressed && e.key == 'a')
	{
		openApps()
	}

	// note to self: modified combinations need to be before parent
	if (metaPressed && menuPressed && e.key == 'q')
	{
		deleteAll()
	}

	if (metaPressed && e.key == 'q')
	{
		deleteFocus()
	}

	if (metaPressed && e.key == 'r')
	{
		openRun()
	}

	if (metaPressed && e.key == 'n')
	{
		notificationDismissAll()
	}

	if (metaPressed && e.key == 'i')
	{
		createWindow(settingsWindow)
	}

	if (metaPressed && e.key == '\\')
	{
		createWindow(bugman)
	}
}

const shortcutCheatSheet = {
    id: 'shortcut-cheat-sheet',
    title: 'Shortcut Cheat Sheet',
    size: {
        preset: 'small',
    },
    icon: 'laptop-outline',
    content: `
	<p style="font-size: 0.7rem; color: grey;">NOTE: meta is the Alt key on most machines and Option on Apple keyboards. menu is Control. You can change these in Settings.</p>

	<div class="columns-2">
 		<div class="column">
			<p><kbd>meta+/</kbd>: Shortcut Cheat Sheet</p>
			<p><kbd>meta+a</kbd>: Applications Menu</p>
			<p><kbd>meta+i</kbd>: Open Settings</p>
			<p><kbd>meta+\\</kbd>: Open Bugman</p>
			<p><kbd>meta+r</kbd>: Run</p>
			<p><kbd>meta+q</kbd>: Quits the currently focused window</p>
	 		<p><kbd>meta+menu+q</kbd>: Quit all open windows</p>
			<p><kbd>meta+n</kbd>: Dismiss all notifications</p>
		</div>
	</div>
	`
}

function setHeightWidth(windowNode, height, width)
{
	windowNode.style.height = height
	windowNode.style.width = width
}

const api = {
    create: {
        window: createWindow,
        externalWindow: createExternalWindow,
        dialog: createDialog,
        notification: desktopNotification,
        sound: playInternalSound,
    },
    refresh: refresh,
    removeWindow: removeWindow,
    exportFile: exportFile,
    readOut: readOutExternalResource,
}

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

	// * menubar (title bar)
	const menubarObject = document.createElement('div')
	menubarObject.className = 'menubar'
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

	windowObject.appendChild(menubarObject)
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
	const currentWindowMenuBar = currentWindow.getElementsByClassName('menubar')[0]
		
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

function playInternalSound(name)
{
	let audio = new Audio(`/sounds/${name}`)
  	audio.play()
}

function desktopNotification(object)
{
	const title = object['title'], description = object['description']
	const action = object['action'] ? object['action'] : function(){}
	const playSound = (object['playSound'] != (null || undefined)) ? object['playSound'] : true
	
	const notification = document.createElement('div')
	notification.className = 'desktop-notification'
	notification.innerHTML = `<h3>${title}</h3><p>${description}</p>`
	notification.onclick = action
	notification.addEventListener('click', () => notification.remove())
	document.getElementById('notification-area').appendChild(notification)
	playSound ? playInternalSound('pop-2.mp3') : function(){}() // i can't think of a single other way to do this
}

/**
 * Dismiss all notifications on the desktop at the current point in time.
 */
function notificationDismissAll()
{
	document.querySelectorAll('#notification-area > .desktop-notification').forEach(function(currentValue, _currentIndex, _listObj) { currentValue.remove() })
}

/**
 * Load an external window in JSON format as an object. This was used when humanOS windows did not have functions. Please use `loadExternalObject` instead.
 * @deprecated Do not use under ANY circumstances.
 */
function loadExternalWindowAsJson(objectLocation)
{
	fetch(objectLocation)
		.then((response) => response.json())
		.then((json) => createWindow(json))
}

/**
 * Returns the contents of a file on the internet.
 * 
 * @async
 * 
 * @param {string} fileUrl the URL to the file to read from.
 */
async function readOutExternalResource(fileUrl)
{
	try
	{
		return await fetch(fileUrl)
	}
	catch (e)
	{
		console.error("couldn't fetch file")
	}
}

/**
 * Used to load a window config from a URL.
 * @async
 */
async function loadExternalObject(objectLocation)
{
	try
	{
		const module = await import(objectLocation)
		return module.client
	}
	catch (e)
	{
		console.error("couldn't fetch object")
	}
}

/**
 * Used to create a window from a window config - see `loadExternalObject`
 */
async function createExternalWindow(objectLocation)
{
	const object = await loadExternalObject(objectLocation)
	createWindow(object)
}

function openShortcutCheatSheet()
{
	createWindow(shortcutCheatSheet)
}

function openApps()
{
	if (localStorage.getItem('setting-behavior-menu-applications') == 'app-menu')
	{
		switchAppGrid()
	}
	else if (localStorage.getItem('setting-behavior-menu-applications') == 'app-list')
	{
		createWindow(clientAppList)
	}
	else
	{
		switchAppGrid()
	}
}

function openRun()
{
	createWindow(runWindow)
}

/**
 * Used to create a dialog banner overlaying the entire screen.
 * 
 * @param {object} object A JSON object following the `ivy:dialog` syntax.
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

/**
 * Used to switch the app grid open and close. See `closeAppGrid` and `openAppGrid`.
 */
function switchAppGrid()
{
	if (document.getElementById('app-grid').style.display == 'flex')
	{
		closeAppGrid()
	}
	else
	{
		openAppGrid()
	}
}

/**
 * Used to close the app grid.
 * @internal This is for internal purposes only.
 */
function closeAppGrid()
{
	document.getElementById('app-grid').style.display = 'none'
	document.querySelector('body > #system-menu').setAttribute('popup-open', false)
}

/**
 * Used to open the app grid.
 * @internal This is for internal purposes only.
 */
function openAppGrid()
{
	document.getElementById('app-grid').style.display = 'flex'
	document.querySelector('body > #system-menu').setAttribute('popup-open', true)
	onClickOutsideRemoveAfterDone(document.getElementById('app-grid'), function(_element) {
		closeAppGrid()
	}, [
		'system-menu',
		'applications-newwindow',
		'applications-newwindow__tag'
	])
}

function exportFile(type, name, blobarray) {
	let fileAsBlob = new Blob(blobarray, { type: type })
	
    let downloadLink       = document.createElement('a')
    downloadLink.download  = name
    downloadLink.innerText = 'Download File'

    if (window.webkitURL != null)
	{
		// chromium allows clicking a url without being appended to the DOM
        downloadLink.href = window.webkitURL.createObjectURL(fileAsBlob)
    }
	else
	{
        downloadLink.href          = window.URL.createObjectURL(fileAsBlob)
        downloadLink.onclick       = destroyClickedElement
        downloadLink.style.display = 'none'

        document.body.appendChild(downloadLink)
    }

    downloadLink.click()
}

function exportSettings() {
	exportFile('text/plain', 'human-settings.json', [ JSON.stringify(localStorage) ])
}

function importSettings(file) {
	if (file !== undefined && file !== null) {
		const reader = new FileReader()

		reader.onload = function () {
			// localStorage = JSON.parse(reader.result) // turning localStorage into a JSON string works, not vice versa
			for (const [key, value] of Object.entries(JSON.parse(reader.result))) {
				localStorage.setItem(key, value)
			}
		}

		reader.readAsText(file)
	}
}

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )

function onClickOutside(element, removeAfterDone, action, omitted)
{
    const outsideClickListener = event => {
		if (!element.contains(event.target) &&  !omitted.includes(event.target.id) && isVisible(element))
		{
			if (action === undefined && action === null)
			{
				action = (element) => element.style.display = 'none'
			}
			action(element)
			if (removeAfterDone)
			{
				removeClickListener()
			}
        }
    }

	const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}

function onClickOutsideRemoveAfterDone(element, action, omitted)
{
    const outsideClickListener = event => {
		if (!element.contains(event.target) && /* !Array(document.querySelectorAll(ommited)).includes(event.target) */ !omitted.includes(event.target.id) && isVisible(element))
		{
			if (action === undefined && action === null)
			{
				action = (element) => element.style.display = 'none'
			}
			action(element)
			removeClickListener()
        }
    }

	const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}

onClickOutsideRemoveAfterDone(document.getElementById('app-grid'), function(_element) {
	closeAppGrid()
}, [
	'system-menu',
	'applications-newwindow',
	'applications-newwindow__tag'
])

/* idea: add a default option (OK), and on enter commit the action for that button. following code is for textboxes, but make a way for the entire window on focus
const node = document.getElementById('co');
node.addEventListener('keydown', function onEvent(event) {
    if (event.key === "Enter") {
        return false;
    }
});
*/
const runWindow = {
	'id': 'ivy:run',
	'title': 'Run',
	'size': {
		'height': '92px',
		'width': '200px',
		'rigid': 'true'
	},
	'icon': 'terminal-outline',
	'content': `
 	<input type="text" id="%human-id%-input-value" placeholder="What is your intention?" />
 	`,
	'options': [
		{
			'name': 'Cancel',
			'message': 'closeSelf'
		},
		{
			'name': 'OK',
			'message': 'script',
			'messagescript': function(clientId, api) {
				return function() {
					const errorNotification = {
						'title': 'Run Error',
						'description': 'Could not find resource.',
						'playSound': true
					}

					const input = document.getElementById(`${clientId}-input-value`).value
					let workedUntilProvenBroken = true
					try {
						if (input.indexOf('/') > -1) {
							// contains slash, is most likely a path
							if (input.indexOf('.js') > -1) {
								// contains .js extension, most likely a client config
                            	api.create.externalWindow(input)
							}
						} else if (eval(input)?.id !== undefined) {
							// is a value, most likely an internal client config
							api.create.window(eval(input))
						}
					} catch (_) {
                        api.create.notification(errorNotification)
						workedUntilProvenBroken = false
					}

					if (workedUntilProvenBroken) {
						api.removeWindow(clientId)
					}
				}
			}
		}
	]
}

// bugmantime (special shortcut because sometimes i don't want to use symbol search and my mind is just stuck to using find)
const bugman = {
	'id': 'ivy:bugman',
	'title': 'Bugman',
	'size': {
		'preset': 'small'
	},
	'icon': 'bug-outline',
	'content': `
	<p>(This operating system is an accessibility nightmare)</p>

	<h2>Information</h2>
	<p id="%human-id%-info-ua">User agent string: </p>

	<h2>WIP Features</h2>
	<p>Some of the features (marked <code>testwin</code>) require <a href="javascript:createExternalWindow('/apps/testwin.js')">testwin</a> to be open.</p>

	<div class="list">
		<p><a href="javascript:toggleMaximize('ivy:testwin')">Toggle maximize</a> (testwin)</p>
	</div>

	<h2>Hidden Apps</h2>
	<div class="list">
		<p><a href="javascript:createWindow(hver)">hver</a></p>
		<p><a href="javascript:createWindow(clientAppList)">Client App List</a></p>
		<p><a href="javascript:createExternalWindow('/apps/debugAppList.js')">Debugging App List</a></p>
		<p><a href="javascript:createWindow(externalLoaderWindow)">External Loader</a></p>
	</div>

	<h2>WIP Apps</h2>
	<div class="list">
		<p><a href="javascript:createExternalWindow('/apps/write.js')">Write</a></p>
		<p><a href="javascript:createExternalWindow('/apps/web-searcher.js')">Web Searcher</a></p>
	</div>

	<h2>New Button</h2>
	<div class="p-bot-64">
		<button class="new">Test Button</button>
	</div>
	`,
	'onload': function (clientId) {
		return function () {
			// set information
			document.getElementById(`${clientId}-info-ua`).innerText = `User agent string: ${window.navigator.userAgent}`
		}
	}
}

function settingsShowSection(cid, e) {
	Array(document.querySelectorAll(`[id='${cid}-sidebar']`)).forEach((element) => {
		e.target.style.backgroundColor = 'transparent'
	})
	e.target.style.backgroundColor = 'rgba(127, 127, 127, 0.25)'
	Array(document.querySelectorAll(`[id='${cid}-content']`)).forEach((element) => {
		element.style.display = 'none'
	})
	document.querySelector(`[id='${cid}-sidebar'] > [id='${cid}-s-${e.target.getAttribute('data-section')}']`).display = 'block'
}

const settingsWindow = {
    id: 'ivy:settings',
    title: 'Settings',
    size: {
        minheight: '500px',
        minwidth: '800px',
        height: '500px',
        width: '800px',
    },
    disallowMultiple: true,
    icon: 'cog-outline',
	noPadding: true,
    content: `
	<!--<div id="%human%-sidebar" onclick="settingsShowSection('%human%', event)" class="flex flexdir-col gap-4">

	</div>-->
	<div id="%human%-content" class="flex flexdir-col gap-16 m-auto mw-600 p-16 p-bot-64">
		<div id="%human%-s-configured-apps">
			<h2 class="flex flexdir-row gap-4 ai-center jc-center"><ion-icon name="apps-outline"></ion-icon> Configured Apps</h2>

			<div class="flex flexdir-col gap-4">
				<label for="%human%-configured-apps">
					Write a list of URLs to load apps from.
					<button class="tooltip-button"
							style="--width: 300px"
							data-tooltip-bottom="humanOS allows you to load apps from external URLs.&#xa;These will end in a '.js' extension.&#xa;Be careful, as these apps will have full access to your humanOS system.&#xa;Remember to use double quotes, not single quotes, since this is parsed as JSON.">
						<ion-icon name="help-circle-outline"></ion-icon></button>
				</label>
				<input type="text" id="%human%-configured-apps" class="monospace"></input>
			</div>
		</div>

		<div id="%human%-s-display" class="flex flexdir-col gap-8">
 			<h2 class="flex flexdir-row gap-4 ai-center jc-center"><ion-icon name="laptop-outline"></ion-icon> Display</h2>

			<div class="flex flexdir-col gap-4">
				<h3 class="ta-center">Color</h3>

				<div class="flex flexdir-col gap-4">
					<div class="flex flexdir-row gap-8 ai-center">
						<label for="%human%-color-accent" class="flex-2 ta-right">Accent Color</label>
						<input type="text" id="%human%-color-accent" class="monospace no-width-100 flex-4" />
					</div>
					<div class="flex flexdir-row gap-8 ai-center">
						<label for="%human%-color-accent-light" class="flex-2 ta-right">Highlight</label>
						<input type="text" id="%human%-color-accent-light" class="monospace no-width-100 flex-4" />
					</div>
				</div>
			</div>

			<div class="flex flexdir-col gap-4">
				<h3 class="ta-center">Fonts</h3>

				<div class="flex flexdir-col gap-4">
					<div class="flex flexdir-row gap-8 ai-center">
						<label for="%human-id%-input-font-selection" class="flex-2 ta-right">Sans Font Family</label>
						<input type="text" id="%human-id%-input-font-selection" class="monospace no-width-100 flex-4"></input>
					</div>
					<div class="flex flexdir-row gap-8 ai-center">
						<label for="%human-id%-input-font-monospace" class="flex-2 ta-right">Monospace Font Family</label>
						<input type="text" id="%human-id%-input-font-monospace" class="monospace no-width-100 flex-4"></input>
					</div>
				</div>
			</div>

			<div class="flex flexdir-col gap-4">
				<h3 class="ta-center">Wallpaper</h3>

				<label for="%human-id%-input-wallpaper-location">Wallpaper Location</label>
				<input type="text" id="%human-id%-input-wallpaper-location" class="monospace" />
			</div>
		</div>

		<div id="%human%-s-behavior" class="flex flexdir-col gap-8">
			<h2 class="flex flexdir-row gap-4 ai-center jc-center"><ion-icon name="cog-outline"></ion-icon> Behavior</h2>

			<div>
				<label for="%human%-behavior-meta-key">Select special keys:</label>
				<select id="%human%-behavior-meta-key">
					<option value="altopt">meta = Alt/Option, menu = Control</option>
					<option value="ctrl">meta = Control, menu = Alt/Option (buggy)</option>
				</select>
			</div>

			<div>
				<label for="%human-id%-behavior-menu-applications">On open of Applications menu:</label>
				<select id="%human-id%-behavior-menu-applications">
					<option value="app-menu">Open App Menu</option>
					<option value="app-list">Open App List</option>
				</select>
			</div>

			<div>
				<input type="checkbox" id="%human-id%-behavior-startup-open-bugman" />
				<label for="%human-id%-behavior-startup-open-bugman">Open Bugman on startup</label>
			</div>

			<div>
				<input type="checkbox" id="%human-id%-behavior-close-applist" />
				<label for="%human-id%-behavior-close-applist">Close App List once an app is selected (WIP)</label>
			</div>
		</div>

		<div id="%human%-s-advanced" class="flex flexdir-col gap-8">
			<h2 class="flex flexdir-row gap-4 ai-center jc-center"><ion-icon name="build-outline"></ion-icon> Advanced</h2>

			<div class="flex flexdir-col gap-4">
				<label for="%human%-custom-styles">Custom Styling (applied to body inline)</label>
				<input type="text" id="%human%-custom-styles" class="monospace"></input>
			</div>
		</div>
	</div>
 	`,
    options: [
        {
            name: 'Reset',
            message: 'script',
            messagescript: function (clientId, api) {
                return function () {
                    api.create.dialog({
                        callerId: clientId,
                        type: 'button-options',
                        title: 'Are you sure?',
                        description: "You won't be able to undo this!",
                        buttonOptions: [
                            {
                                name: 'Yes',
                                script: function (_clientId) {
                                    return function () {
                                        resetSettings();
                                        localStorage.setItem(
                                            'not-first-time',
                                            null
                                        );
                                        document
                                            .getElementById('dialog')
                                            .remove();
                                        desktopNotification({
                                            title: 'Restart System',
                                            description:
                                                'Refresh page to finish resetting.',
                                            playSound: true,
                                            action: () =>
                                                window.location.reload(),
                                        });
                                    };
                                },
                            },
                            {
                                name: 'No',
                                script: function (_clientId) {
                                    return function () {
                                        document
                                            .getElementById('dialog')
                                            .remove();
                                    };
                                },
                            },
                        ],
                    });
                };
            },
        },
        {
            name: 'Import',
            message: 'script',
            messagescript: function (clientId, api) {
                return function () {
                    api.create.window({
                        id: `ivy:${clientId}-import-dialogue`,
                        disallowMultiple: true,
                        title: 'Import Settings',
                        size: {
                            preset: 'mini',
                        },
                        icon: 'cloud-upload-outline',
                        content: `
						<label for="%human-id%-input-file">Upload a human-settings.json file:</label>
						<input type="file" id="%human-id%-input-file" />

						<p>Note: This will override your current settings.</p>
						`,
                        options: [
                            {
                                name: 'Upload',
                                message: 'script',
                                messagescript: function (clientId, _api) {
                                    return function () {
                                        const files = document.getElementById(
                                            `${clientId}-input-file`
                                        ).files;
                                        if (files.length > 0) {
                                            importSettings(files[0]);
                                            refresh();
                                            removeWindow(clientId);
                                            api.create.notification({
                                                title: 'Restart System',
                                                description:
                                                    'Refresh page to load new settings.',
                                                playSound: true,
                                                action: () =>
                                                    window.location.reload(),
                                            });
                                        } else {
                                            api.create.notification({
                                                title: 'Uploading file error',
                                                description:
                                                    'No file was selected.',
                                                playSound: true,
                                                action: () =>
                                                    window.location.reload(),
                                            });
                                        }
                                    };
                                },
                            },
                        ],
                    });
                };
            },
        },
        {
            name: 'Export',
            message: 'script',
            messagescript: function (_clientId, _api) {
                return function () {
                    exportSettings();
                };
            },
        },
        {
            name: 'Apply',
            message: 'script',
            messagescript: function (clientId, api) {
                return function () {
                    // localStorage.setItem('configured-apps',                      document.getElementById(`${clientId}-configured-apps`)             .value)
                    // localStorage.setItem('custom-styles',                        document.getElementById(`${clientId}-custom-styles`)               .value)
                    // localStorage.setItem('setting-color-accent',                 document.getElementById(`${clientId}-color-accent`)                .value)
                    // localStorage.setItem('setting-font-selection',               document.getElementById(`${clientId}-input-font-selection`)        .value)
                    // localStorage.setItem('setting-font-monospace',               document.getElementById(`${clientId}-input-font-monospace`)        .value)
                    // localStorage.setItem('setting-wallpaper-location',           document.getElementById(`${clientId}-input-wallpaper-location`)    .value)
                    // localStorage.setItem('setting-behavior-menu-applications',   document.getElementById(`${clientId}-behavior-menu-applications`)  .value)
                    // localStorage.setItem('setting-behavior-startup-open-bugman', document.getElementById(`${clientId}-behavior-startup-open-bugman`).checked)
                    // localStorage.setItem('setting-behavior-close-applist',       document.getElementById(`${clientId}-behavior-close-applist`)      .checked)
                    for (const settingName in settingsList) {
                        if (
                            Object.hasOwnProperty.call(
                                settingsList,
                                settingName
                            )
                        ) {
                            const settingAttributes = settingsList[settingName];
                            const settingInput = document.getElementById(
                                `${clientId}-${settingAttributes.settingInput.name}`
                            );
                            if (
                                settingAttributes.settingInput.type ===
                                'checkbox'
                            ) {
                                localStorage.setItem(
                                    settingName,
                                    settingInput.checked
                                );
                            } else {
                                localStorage.setItem(
                                    settingName,
                                    settingInput.value
                                );
                            }
                        }
                    }
                    api.refresh();
                    repopulateAppGrid();
                };
            },
        },
    ],
    onload: function (clientId, _api) {
        return function () {
            // Array(document.querySelectorAll(`[id='${clientId}-content'] > [id^='${clientId}-s-']`)).forEach((element) => {
            // 	element.style.display = 'block'
            // })

            // document.getElementById(`${clientId}-configured-apps`)             .value   =  localStorage.getItem('configured-apps')
            // document.getElementById(`${clientId}-custom-styles`)               .value   =  localStorage.getItem('custom-styles')
            // document.getElementById(`${clientId}-color-accent`)                .value   =  localStorage.getItem('setting-color-accent')
            // document.getElementById(`${clientId}-input-font-selection`)        .value   =  localStorage.getItem('setting-font-selection')
            // document.getElementById(`${clientId}-input-font-monospace`)        .value   =  localStorage.getItem('setting-font-monospace')
            // document.getElementById(`${clientId}-input-wallpaper-location`)    .value   =  localStorage.getItem('setting-wallpaper-location')
            // document.getElementById(`${clientId}-behavior-menu-applications`)  .value   =  localStorage.getItem('setting-behavior-menu-applications')
            // document.getElementById(`${clientId}-behavior-startup-open-bugman`).checked = (localStorage.getItem('setting-behavior-startup-open-bugman') === 'true')
            // document.getElementById(`${clientId}-behavior-close-applist`)      .checked = (localStorage.getItem('setting-behavior-close-applist') === 'true')
            for (const settingName in settingsList) {
                if (Object.hasOwnProperty.call(settingsList, settingName)) {
                    const settingAttributes = settingsList[settingName];
                    const settingInput = document.getElementById(
                        `${clientId}-${settingAttributes.settingInput.name}`
                    );
                    if (settingAttributes.settingInput.type === 'checkbox') {
                        settingInput.checked =
                            localStorage.getItem(settingName) == 'true';
                    } else {
                        settingInput.placeholder = settingAttributes.default;
                        settingInput.value = localStorage.getItem(settingName);
                    }
                }
            }
        };
    },
};

/*
function appListOpen(windowId, external, titleOrObject) {
	if (external) {
		createExternalWindow(titleOrObject)
	} else {
		createWindow(titleOrObject)
	}

	if (localStorage.getItem("setting-behavior-close-applist")) {
		removeWindow(windowId)
	}
}
*/

const clientAppList = {
	'id': 'ivy:client-app-list',
	'title': 'App List',
	'size': {
		'height': '400px',
		'width': '250px'
	},
	'icon': 'rocket-outline',
	'content': `
	<div>
 		<a href="javascript:createExternalWindow('/apps/learnHuman.js')"><ion-icon name="accessibility-outline"></ion-icon> Learn humanOS</a><br />
 		<a href="javascript:createWindow(shortcutCheatSheet)"><ion-icon name="laptop-outline"></ion-icon> Shortcut Cheat Sheet</a><br />
 		<a href="javascript:createExternalWindow('/apps/notificationEngine.js')"><ion-icon name="notifications-outline"></ion-icon> Notifcation Engine</a><br />
		<a href="javascript:createWindow(settingsWindow)"><ion-icon name="cog-outline"></ion-icon> Settings</a><br />
 		<a href="javascript:createWindow(runWindow)"><ion-icon name="terminal-outline"></ion-icon> Run</a><br />
		<a href="javascript:createWindow(bugman)"><ion-icon name="bug-outline"></ion-icon> Bugman</a><br />
	</div>
 	`
}

const externalLoaderWindow = {
	'id': 'ivy:load-external-window',
	'title': 'Load External Window',
	'size': {
		'height': '113px',
		'width': '500px',
		'rigid': true
	},
	'icon': 'bug-outline',
	'content': 	`
	<label for="%human-id%-input-value">External Object URL:</label>
	<input type="text" id="%human-id%-input-value" />
	`,
	'options': [
		{
			'name': 'OK',
			'message': 'script',
			'messagescript': function(clientId, api) {
				return function() {
					api.create.externalWindow(document.getElementById(`${clientId}-input-value`).value)
					api.removeWindow(clientId)
				}
			}
		},
		{
			'name': 'Cancel',
			'message': 'closeSelf'
		}
	]
}

const resetScript = {
	'id': 'ivy:reset-script',
	'title': 'Reset',
	'size': {
		'preset': 'mini'
	},
	'icon': 'document-outline',
	'content': `
	<p>Refresh page to continue.</p>
	`,
	'onload': function (_clientId) {
		return function () {
			localStorage.clear()
		}
	}
}

const newScriptFormat = {
	// needed to make resetScript, but it's a bit of a strange solution.
	// how about a proper syntax for scripts, and add some kind of command line to handle them?
	'name': 'New Script Format',
	'script': function (api, args) {
		return function () {
			api.write('This is a script!')
			args.forEach(element => {
				api.write(`arg: ${element}`)
			})
		}
	}
}

class HApp
{
	constructor(objectDefinition)
	{
		this.id = objectDefinition.id
		this.title = objectDefinition.title
		this.size = objectDefinition.size
		this.icon = objectDefinition.icon
		this.content = objectDefinition.content
		this.options = objectDefinition.options
	}
}

const shownApps = [
    async () => await loadExternalObject('/apps/docs/main.js'),
    async () => await settingsWindow,
    async () => await shortcutCheatSheet,
    async () => await loadExternalObject('/apps/welcomeApp/main.js'),
    async () => await loadExternalObject('/apps/learnHuman.js'),
    async () => await loadExternalObject('/apps/notificationEngine.js'),
    async () => await runWindow,
    async () => await bugman
] // the unnecessary use of await is because symmetry, typescript language server

// add user configured apps to list of shown apps
if (localStorage.getItem('configured-apps') !== null)
{
	const userConfiguredApps = JSON.parse(localStorage.getItem('configured-apps'))

	userConfiguredApps.forEach(element => {
		shownApps.push(async () => await loadExternalObject(element))
	})
}
