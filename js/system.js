const swingver = {
	id:    'swingver',
	title: 'swingver',
	size: {
		rigid:  true,
		height: '75px',
		width:  '330px'
	},
	icon:    'cog-outline',
	content: `
	<div class="d-flex ai-center jc-center flexdir-col">
		<span>
			swing unstable;
			last updated 2023-05-19
		</span>
		<span>copyright &copy; 2023 samrland and swing-project</span>
	</div>
	`
}

window.onload = function() {
	console.clear()
	console.info('Swing is still a work in progress. Some things may not work properly yet.')

	if (localStorage.getItem('not-first-time') !== 'true') {
		localStorage.setItem('not-first-time', 'true')

		// set settings to defaults
		resetSettings()

		// first time notification
		desktopNotification({
			'title': 'Welcome to humanOS!',
			'description': 'humanOS is an online operating system designed for productivity and effeciency.<br />Click on this notification bubble to learn more!',
			'action': () => createExternalWindow('/apps/learnHuman.js', { '@fromFirstStart': true }),
			'playSound': false
		})
	}

	findNewSettings()
	refresh()
	repopulateAppGrid()

	if (localStorage.getItem('setting-behavior-startup-open-bugman') === 'true') {
		createWindow(bugman, { '@fromStartup': true })
	}
}

// swing console
const swingConsole = {
	write: function (error, text) {
		swingConsole.text.push({
			isError: error,
			text: text
		})
	},
	text: []
}

const swingConsoleWindow = {
	id: 'ivy--console',
	title: 'Swing Console',
	icon: 'terminal-outline',
	size: {
		preset: 'default'
	},
	disallowMultiple: true,
	content: `
	<div class="wrapper w-100-pc d-flex flexdir-col">
		<div class="console">
		</div>
		<div class="input-wrapper w-100-pc d-flex flexdir-row gap-1 ai-center b-0">
			<label for="%human%-input">Execute: </label>
			<input type="text" id="%human%-input" />
			<button type="button" id="%human%-button">OK</button>
		</div>
	</div>
	`,
	styles: [
		{
			selector: '.console',
			styles: {

			}
		}
	]
}

const newScriptFormat = {
	// possible future script format?
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

// fullscreen toggle
function toggleFullscreen(elementObject)
{
    if (!document.fullscreenElement) {
        elementObject.requestFullscreen()
		// .catch((err) => {
        //     alert(
        //         `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        //     )
        // })
    } else {
        document.exitFullscreen()
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
		'default': `url('/media/resources/wallpapers/photo-1458501534264-7d326fa0ca04.jpeg')`,
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
        path: '/media/resources/wallpapers/benjamin-voros-phIFdC6lA4E-unsplash.jpg',
    },
    {
        name: 'Road',
        path: '/media/resources/wallpapers/cristina-gottardi-84RNIdh3EwU-unsplash.jpg',
    },
    {
        name: 'Beach',
        path: '/media/resources/wallpapers/iswanto-arif-OJ74pFtrYi0-unsplash.jpg',
    },
    {
        name: 'Wave',
        path: '/media/resources/wallpapers/jeremy-bishop-cEeEtjedNls-unsplash.jpg',
    },
    {
        name: 'Terrain',
        path: '/media/resources/wallpapers/kai-oberhauser-BKAaLmT0tIs-unsplash.jpg',
    },
    {
        name: 'Maple',
        path: '/media/resources/wallpapers/lyndon-li-zrT1tjnxJKQ-unsplash.jpg',
    },
    {
        name: 'Lavender',
        path: '/media/resources/wallpapers/photo-1544892504-5a42d285ab6f.jpeg',
    },
    {
        name: 'Rocks',
        path: '/media/resources/wallpapers/photo-1458501534264-7d326fa0ca04.jpeg',
    },
    {
        name: 'Mountain',
        path: '/media/resources/wallpapers/photo-1472396961693-142e6e269027.jpeg',
    },
    {
        name: 'Peak',
        path: '/media/resources/wallpapers/photo-1489619243109-4e0ea59cfe10.jpeg',
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

	if (localStorage['files/config/custom.css'] === null) {
		localStorage['files/config/custom.css'] = `/* config/custom.css: Put any custom CSS imports or rules in here. To apply changes, restart the system. */`
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
	localStorage['files/config/custom.css'] = `/* config/custom.css: Put any custom CSS imports or rules in here. To apply changes, restart the system. */`
}

// set styles
function refresh()
{
	document.body.style.setProperty('--accent',             localStorage.getItem("setting-color-accent")       )
	document.body.style.setProperty('--highlight',          localStorage.getItem("setting-color-accent-light") )
	document.body.style.setProperty("--fontselection",      localStorage.getItem("setting-font-selection")     )
	document.body.style.setProperty("--font-monospace",     localStorage.getItem("setting-font-monospace")     )
	document.body.style.setProperty("--wallpaper-location", localStorage.getItem("setting-wallpaper-location") )

	// custom css
	const customCSS         = getUserFile('config/custom.css')
	const customCSSElement  = document.createElement('style')
	const customCSSTextNode = document.createTextNode(customCSS)
	customCSSElement.appendChild(customCSSTextNode)
	document.body.appendChild(customCSSElement)
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
			createWindow(element, { '@fromAppGrid': true })
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
		(localStorage.getItem('meta-key') === 'altopt' && e.altKey) ||
		(localStorage.getItem('meta-key') === 'ctrl' && e.ctrlKey)
	)
	const menuPressed = (
		(localStorage.getItem('meta-key') === 'altopt' && e.ctrlKey) ||
		(localStorage.getItem('meta-key') === 'ctrl' && e.altKey)
	)

	// if (e.altKey) {
	// 	console.log('meta key pressed')
	// }

	if (metaPressed && e.key === '/')
	{
		openShortcutCheatSheet()
	}

	if (metaPressed && e.key === 'a')
	{
		openApps()
	}

	// note to self: modified combinations need to be before parent
	if (metaPressed && menuPressed && e.key === 'q')
	{
		deleteAll()
	}

	if (metaPressed && e.key === 'q')
	{
		deleteFocus()
	}

	if (metaPressed && e.key === 'r')
	{
		openRun()
	}

	if (metaPressed && e.key === 'n')
	{
		notificationDismissAll()
	}

	if (metaPressed && e.key === 'i')
	{
		createWindow(settingsWindow, { '@fromShortcut': true })
	}

	if (metaPressed && e.key === '\\')
	{
		createWindow(bugman, { '@fromShortcut': true })
	}
}

// the api that will be given to windows
const api = {
	create: {
		window:         createWindow,
		externalWindow: createExternalWindow,
		dialog:         createDialog,
		notification:   desktopNotification,
		sound:          playInternalSound,
		messageBox:     createMessageBox,
	},
	system: {
		refresh:      refresh,
		removeWindow: removeWindow
	},
	fs: {
		getUserFile:  getUserFile,
		saveUserFile: saveUserFile,
		userFileType: userFileType
	},
	exportFile: exportFile,
	readOut:    readOutExternalResource
}

// a possibly safer way of implementing apis that will aid in the process of switching over to sandboxed windows
class WindowAPI {
	constructor(clientId, args) {
		Object.defineProperty(this, 'clientId', {
			value:    clientId,
			writable: false
		})

		Object.defineProperty(this, 'args', {
			value:    args,
			writable: false
		})

		this.window = {
			select: function (selector) {
				let object = document.querySelectorAll(`${this.clientId} > .content > ${selector}`)
				if (object.length === 1) {
					return object[0]
				} else {
					return object
				}
			},

			quit: function () {
				removeWindow(clientId)
			}
		}

		this.create = {
			dialog:         createDialog,
			notification:   desktopNotification,
			sound:          playInternalSound,
			messageBox:     createMessageBox
		}

		this.system = {
			refresh:        refresh
		},

		this.fs = {
			getUserFile:    getUserFile,
			saveUserFile:   saveUserFile,
			userFileType:   userFileType,
			exportFile:     exportFile
		}
	}
}

// do something with the contents of a file
//function useFile(path, action) {
//	let patharr = path.split(`:`)
//	if (path.length === 2) {
//		if (patharr[0] === 'Resources') {
//      	fetch(`/media/resources` + patharr[1]).then(action)
//		} else if (patharr[0] === 'User') {
//			action(localStorage[`files` + patharr[1]])
//		}
//	} else {
//		action('%{swing::NULL}%')
//	}
//}

// get user file
function getUserFile(path) {
	return localStorage[`files/${path}`]
}

function saveUserFile(path, contents) {
	localStorage[`files/${path}`] = contents
}

function userFileType(path) {
	let object = localStorage[`files/${path}`]
	if (object) {
		return 'file' // simple enough
	} else {
		if (Object.keys(localStorage.some((k) => ~k.indexOf(`files/${path}/`)))) { // some files exist in this directory. this does create the predicament that empty directories can't exist, but that doesn't matter
			return 'directory'
		} else {
			return 'null'
		}
	}
}

function playInternalSound(name)
{
	let audio = new Audio(`/media/resources/sounds/${name}`)
  	audio.play()
}

/**
 * Load an external window in JSON format as an object. This was used when humanOS windows did not have functions. Please use `loadExternalObject` instead.
 * @deprecated Do not use under ANY circumstances. This is only here for possible future reference.
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
		const  module = await import(objectLocation)
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
async function createExternalWindow(objectLocation, args)
{
	args = args || {}
	const object = await loadExternalObject(objectLocation)
	createWindow(object, args)
}

function openShortcutCheatSheet()
{
	createWindow(shortcutCheatSheet, {})
}

function openApps()
{
	if (localStorage.getItem('setting-behavior-menu-applications') === 'app-menu')
	{
		switchAppGrid()
	}
	else if (localStorage.getItem('setting-behavior-menu-applications') === 'app-list')
	{
		createWindow(clientAppList, {})
	}
	else
	{
		switchAppGrid()
	}
}

function openRun()
{
	createWindow(runWindow, {})
}

/**
 * Used to switch the app grid open and close. See `closeAppGrid` and `openAppGrid`.
 */
function switchAppGrid()
{
	if (document.getElementById('app-grid').style.display === 'flex')
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
	document.querySelector('body > #system-menu').setAttribute('popup-open', 'false')
}

/**
 * Used to open the app grid.
 * @internal This is for internal purposes only.
 */
function openAppGrid()
{
	document.getElementById('app-grid').style.display = 'flex'
	document.querySelector('body > #system-menu').setAttribute('popup-open', 'true')
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
        downloadLink.onclick       = downloadLink.remove
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
		if (!element.contains(event.target) && !omitted.includes(event.target.id) && isVisible(element))
		{
			if (!action)
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
			if (!action)
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

* possible code?
if (button?.default !== null && button?.default !== undefined && button.default) {
	button.classList.add('default-option')
}
// ...
if (windowObject.querySelector('.options > button.default-option')) {
	windowObject.addEventListener('keydown', (e) => {
		if (event.key === 'Enter') {
			windowObject.querySelector('.options > button.default-option').click()
		}
	})
}
*/
const runWindow = {
	id:    'ivy--run',
	title: 'Run',
	size: {
		height: '92px',
		width:  '200px',
		rigid:  true
	},
	noOptionsPadding: true,
	icon:             'terminal-outline',
	content:          `
 	<input type="text" id="%human%-input" placeholder="What is your intention?" class="monospace" />
 	`,
	'options': [
		{
			'name':    'Cancel',
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

					const input = document.getElementById(`${clientId}-input`).value
					let workedUntilProvenBroken = true
					try {
						if (input.indexOf('/') > -1) {
							// contains slash, is most likely a path
							if (input.indexOf('.js') > -1) {
								// contains .js extension, most likely a client config
                            	api.create.externalWindow(input)
							}
						} else if (eval(input).id !== undefined) {
							// is a value, most likely an internal client config
							api.create.window(eval(input), { '@fromRun': true })
						}
					} catch (_) {
                        api.create.notification(errorNotification)
						workedUntilProvenBroken = false
					}

					if (workedUntilProvenBroken) {
						api.system.removeWindow(clientId)
					}
				}
			}
		}
	]
}

// // bugmantime (special shortcut because sometimes i don't want to use symbol search and my mind is just stuck to using find) // i use fleet now, ctrl+k good
const bugman = {
	'id': 'ivy--bugman',
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
	<p>Some of the features (marked <code>testwin</code>) require <a href="javascript:createExternalWindow('/apps/testwin.js', {})">testwin</a> to be open.</p>

	<div class="list">
		<p><a href="javascript:toggleMaximize('ivy--testwin')">Toggle maximize</a> (testwin)</p>
	</div>

	<h2>Hidden Apps</h2>
	<div class="list">
		<p><a href="javascript:createWindow(swingver)">swingver</a></p>
		<p><a href="javascript:createWindow(clientAppList)">Client App List</a></p>
		<p><a href="javascript:createExternalWindow('/apps/debugAppList.js', {})">Debugging App List</a></p>
		<p><a href="javascript:createWindow(externalLoaderWindow)">External Loader</a></p>
	</div>

	<h2>WIP Apps</h2>
	<div class="list">
		<p><a href="javascript:createExternalWindow('/apps/web-searcher.js', {})">Web Searcher</a></p>
	</div>

	<h2>New Button</h2>
	<div class="p-bot-64">
		<button class="new">Test Button</button>
	</div>
	`,
	'onload': function (clientId, _api, _args) {
		return function () {
			// set information
			document.getElementById(`${clientId}-info-ua`).innerText = `User agent string: ${window.navigator.userAgent}`
		}
	}
}

function settingsShowSection(cid, e) {
	Array(document.querySelectorAll(`[id='${cid}-sidebar']`)).forEach((_element) => {
		e.target.style.backgroundColor = 'transparent'
	})
	e.target.style.backgroundColor = 'rgba(127, 127, 127, 0.25)'
	Array(document.querySelectorAll(`[id='${cid}-content']`)).forEach((element) => {
		element.style.display = 'none'
	})
	document.querySelector(`[id='${cid}-sidebar'] > [id='${cid}-s-${e.target.getAttribute('data-section')}']`).display = 'block'
}

const settingsWindow = {
	id: 'ivy--settings',
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
	<!--<div id="%human%-sidebar" onclick="settingsShowSection('%human%', event)" class="flex flexdir-col gap-1">

	</div>-->
	<div id="%human%-content" class="flex flexdir-col gap-16 m-auto mw-600 p-3" style="margin-bottom: 72px;">
		<div id="%human%-s-configured-apps">
			<h2 class="flex flexdir-row gap-1 ai-center jc-center"><ion-icon name="apps-outline"></ion-icon> Configured Apps</h2>

			<div class="flex flexdir-col gap-1">
				<label for="%human%-configured-apps">
					Write a list of URLs to load apps from.
					<button class="tooltip-button"
							style="--width: 300px"
							data-tooltip-bottom="humanOS allows you to load apps from external URLs.&#xa;These will end in a '.js' extension.&#xa;Be careful, as these apps will have full access to your humanOS system.&#xa;Use double quotes, not single quotes, as this is parsed as JSON.&#xa;If you need more help, take a look at the 'Adding Apps' section of humanOS Docs.">
						<ion-icon name="help-circle-outline"></ion-icon></button>
				</label>
				<input type="text" id="%human%-configured-apps" class="monospace" />
			</div>
		</div>

		<div id="%human%-s-display" class="flex flexdir-col gap-2">
 			<h2 class="flex flexdir-row gap-1 ai-center jc-center"><ion-icon name="laptop-outline"></ion-icon> Display</h2>

			<div class="flex flexdir-col gap-1">
				<h3 class="ta-center">Color</h3>

				<div class="flex flexdir-col gap-1">
					<div class="flex flexdir-row gap-2 ai-center">
						<label for="%human%-color-accent" class="flex-2 ta-right">Accent Color</label>
						<input type="text" id="%human%-color-accent" class="monospace no-width-100 flex-4" />
					</div>
					<div class="flex flexdir-row gap-2 ai-center">
						<label for="%human%-color-accent-light" class="flex-2 ta-right">Highlight</label>
						<input type="text" id="%human%-color-accent-light" class="monospace no-width-100 flex-4" />
					</div>
				</div>
			</div>

			<div class="flex flexdir-col gap-1">
				<h3 class="ta-center">Fonts</h3>

				<div class="flex flexdir-col gap-1">
					<div class="flex flexdir-row gap-2 ai-center">
						<label for="%human-id%-input-font-selection" class="flex-2 ta-right">Sans Font Family</label>
						<input type="text" id="%human-id%-input-font-selection" class="monospace no-width-100 flex-4" />
					</div>
					<div class="flex flexdir-row gap-2 ai-center">
						<label for="%human-id%-input-font-monospace" class="flex-2 ta-right">Monospace Font Family</label>
						<input type="text" id="%human-id%-input-font-monospace" class="monospace no-width-100 flex-4" />
					</div>
				</div>
			</div>

			<div class="flex flexdir-col gap-1">
				<h3 class="ta-center">Wallpaper</h3>

				<label for="%human-id%-input-wallpaper-location">Wallpaper Location</label>
				<input type="text" id="%human-id%-input-wallpaper-location" class="monospace" />
			</div>
		</div>

		<div id="%human%-s-behavior" class="flex flexdir-col gap-2">
			<h2 class="flex flexdir-row gap-1 ai-center jc-center"><ion-icon name="cog-outline"></ion-icon> Behavior</h2>

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

		<div id="%human%-s-advanced" class="flex flexdir-col gap-2">
			<h2 class="flex flexdir-row gap-1 ai-center jc-center"><ion-icon name="build-outline"></ion-icon> Advanced</h2>

			<div class="flex flexdir-col gap-1">
				<label for="%human%-custom-styles">Custom CSS</label>
				<button type="button" onclick="createExternalWindow('/apps/write/write.js', { filename: 'config/custom.css' })"><ion-icon name="create-outline"></ion-icon> Open in Write</button>
			</div>
		</div>
	</div>
 	`,
	menubar: [
		{
			name: 'File',
			items: [
				{ name: 'Import', command: function (clientId, api, _args) {
					api.create.window({
						id: `ivy--${clientId}-import-dialogue`,
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
										const files = document.getElementById(`${clientId}-input-file`).files
										if (files.length > 0) {
											importSettings(files[0])
											refresh()
											removeWindow(clientId)
											api.create.notification({
												title: 'Restart System',
												description: 'Refresh page to load new settings.',
												playSound: true,
												action: () => window.location.reload()
											})
										} else {
											api.create.notification({
												title: 'Uploading file error',
												description: 'No file was selected.',
												playSound: true,
												action: () => window.location.reload()
											})
										}
									}
								}
							}
						]
					}, {})
				}},
				{ name: 'Export', command: function (_clientId, _api, _args) {
					exportSettings()
				}},
				{ name: 'SWING_SEPERATOR' },
				{ name: 'Reset', command: function (clientId, api, _args) {
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
										localStorage.setItem('not-first-time', null);
										document.getElementById('dialog').remove();
										desktopNotification({
											title: 'Restart System',
											description: 'Refresh page to finish resetting.',
											playSound: true,
											action: () => window.location.reload(),
										})
									}
								}
							},
							{
								name: 'No',
								script: function (_clientId) {
									return function () {
										document.getElementById('dialog').remove();
									}
								}
							}
						]
					})
				}}
			]
		},
		{
			name: 'Help',
			items: [
				{ name: 'humanOS Docs', command: function (_clientId, _api, _args) {
					createExternalWindow('/apps/docs/main.js', {})
				}}
			]
		}
	],
	options: [
		{
			name: 'Apply',
			message: 'script',
			messagescript: function (clientId, api) {
				return function () {
					for (const settingName in settingsList) {
						if (Object.hasOwnProperty.call(settingsList, settingName)) {
							const settingAttributes = settingsList[settingName]
							const settingInput = document.getElementById(`${clientId}-${settingAttributes.settingInput.name}`)

							if (settingAttributes.settingInput.type === 'checkbox') {
								localStorage.setItem(settingName, settingInput.checked)
							} else {
								localStorage.setItem(settingName, settingInput.value)
							}
						}
					}
					api.system.refresh()
					repopulateAppGrid()
				}
			}
		}
	],
	onload: function (clientId, _api, _args) {
		return function () {
			// Array(document.querySelectorAll(`[id='${clientId}-content'] > [id^='${clientId}-s-']`)).forEach((element) => {
			// 	element.style.display = 'block'
			// })
			for (const settingName in settingsList) {
				if (Object.hasOwnProperty.call(settingsList, settingName)) {
					const settingAttributes = settingsList[settingName]
					const settingInput = document.getElementById(`${clientId}-${settingAttributes.settingInput.name}`)
					if (settingAttributes.settingInput.type === 'checkbox') {
						settingInput.checked =
                            localStorage.getItem(settingName) === 'true'
					} else {
						settingInput.placeholder = settingAttributes.default
						settingInput.value = localStorage.getItem(settingName)
					}
				}
			}
		}
	}
}

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
	'id': 'ivy--client-app-list',
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
	'id': 'ivy--load-external-window',
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
					api.system.removeWindow(clientId)
				}
			}
		},
		{
			'name': 'Cancel',
			'message': 'closeSelf'
		}
	]
}

const shownApps = [
    async () => await loadExternalObject('/apps/docs/main.js'),
    async () => await settingsWindow,
	async () => await loadExternalObject('/apps/write/write.js'),
    async () => await loadExternalObject('/apps/shortcut-cheat-sheet.js'),
    async () => await loadExternalObject('/apps/welcomeApp/main.js'),
    async () => await loadExternalObject('/apps/learnHuman.js'),
    async () => await runWindow,
	async () => await swingConsoleWindow,
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
