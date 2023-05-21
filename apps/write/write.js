export const client = {
	id: 'ivy--write',
	title: 'Write',
	size: {
		'preset': 'default'
	},
	icon: 'create-outline',
	noPadding: true,
	content: `
	<textarea style="width: 100%; height: 100%; outline: none; border: none; position: absolute; padding: 8px; padding-bottom: 16px;" class="writebox" placeholder="start writing!"></textarea>
 	`,
	menubar: [
		{
			name: 'File',
			items: [
				{ name: 'Open...',    command: openToWritebox       },
				{ name: 'Save',       command: quickSave            },
				{ name: 'Save as...', command: saveWriteboxContents },
			]
		},
		{
			name: 'Format',
			items: [
				{ name: 'Typeface Monospace', command: (clientId, _api, _args) => setTypeFace('monospace', clientId) },
				{ name: 'Typeface Sans',      command: (clientId, _api, _args) => setTypeFace('sans',      clientId) },
				{ name: 'SWING_SEPERATOR' },
				{ name: 'Toggle Word Wrap',   command: toggleWordWrap                                                },
			]
		},
		{
			name: 'Theme',
			items: [
				{ name: 'Light',   command: (clientId, _api, _args) => setTheme('light',   clientId) },
				{ name: 'Neither', command: (clientId, _api, _args) => setTheme('neither', clientId) },
				{ name: 'SWING_SEPERATOR' },
				{ name: 'Dark',    command: (clientId, _api, _args) => setTheme('dark',    clientId) },
				{ name: 'Black',   command: (clientId, _api, _args) => setTheme('black',   clientId) },
			]
		}
	],
	onload: function (clientId, api, args) {
		const typeface = localStorage['app-config/ivy--write/typeface']
		if (typeface === undefined) {
			setTypeFace('sans', clientId)
		} else {
			loadTypeFace(clientId)
		}

		const theme = localStorage['app-config/ivy--write/theme']
		if (theme === undefined) {
			setTheme('light', clientId)
		} else {
			loadTheme(clientId)
		}

		const wordwrap = localStorage['app-config/ivy--write/wordwrap']
		if (wordwrap === undefined) {
			localStorage['app-config/ivy--write/wordwrap'] = 'true'
		}
		loadWordWrap(clientId)

		const writebox = document.getElementById(clientId).querySelector('.writebox')
		if (args['filename'] !== undefined) {
			writebox.value = api.fs.getUserFile(args['filename'])
			writebox.setAttribute('data-open-file', args['filename'])
		}
	}
}

// word wrap
function toggleWordWrap(clientId, _api, _args) {
	if (localStorage['app-config/ivy--write/wordwrap'] == 'true') {
		localStorage['app-config/ivy--write/wordwrap'] = 'false'
	} else {
		localStorage['app-config/ivy--write/wordwrap'] = 'true'
	}
	loadWordWrap(clientId)
}

function loadWordWrap(clientId) {
	const wordwrap = localStorage['app-config/ivy--write/wordwrap']
	const writebox = document.getElementById(clientId).querySelector('.writebox')
	if (wordwrap == 'true') {
		writebox.style.overflowWrap = 'initial'
		writebox.style.overflowX    = 'initial'
		writebox.style.whiteSpace   = 'initial'
	} else {
		writebox.style.overflowWrap = 'normal'
		writebox.style.overflowX    = 'scroll'
		writebox.style.whiteSpace   = 'pre'
	}
}

// theme related functions
function setTheme(themeName, clientId) {
	localStorage['app-config/ivy--write/theme'] = themeName
	loadTheme(clientId)
}

function loadTheme(clientId) {
	const themeName = localStorage['app-config/ivy--write/theme']
	const writebox  = document.getElementById(clientId).querySelector('.writebox')
	switch (themeName) {
		case 'dark':
			writebox.style.backgroundColor = '#111'
			writebox.style.color = '#fefefe'
			writebox.setAttribute('data-darkbg', 'true')
			break
		case 'black':
			writebox.style.backgroundColor = '#000'
			writebox.style.color = '#fff'
			writebox.setAttribute('data-darkbg', 'true')
			break
		case 'neither':
			writebox.style.backgroundColor = '#eee'
			writebox.style.color = '#222'
			writebox.setAttribute('data-darkbg', 'false')
			break
		default:
		case 'light':
			writebox.style.backgroundColor = '#fff'
			writebox.style.color = '#000'
			writebox.setAttribute('data-darkbg', 'false')
			break
	}
}

// typeface related functions
function setTypeFace(typeface, clientId) {
	localStorage['app-config/ivy--write/typeface'] = typeface
	loadTypeFace(clientId)
}

function loadTypeFace(clientId) {
	const typeface = localStorage['app-config/ivy--write/typeface']
	const writebox = document.getElementById(clientId).querySelector('.writebox')
	if (typeface === 'monospace') {
		writebox.style.fontFamily = 'var(--font-monospace)'
	} else if (typeface === 'sans') {
		writebox.style.fontFamily = 'var(--fontselection)'
	}
}

// file related functions
function saveWriteboxContents(clientId, api, _args) {
	const writebox = document.getElementById(clientId).querySelector('.writebox')
	const openFileName = writebox.getAttribute('data-open-file')
	api.create.messageBox(clientId, {
		type: 'ask',
		title: 'Save as...',
		message: {
			icon:        'document-outline',
			heading:     'Choose a file name',
			description: 'To save this file, use a file name. This will be used so you can access the file later.',
			submit:      'Save',
			cancel:      'Cancel',
			defaultValue: openFileName
		},
		onSubmit: (filename) => {
			api.fs.saveUserFile(filename, writebox.value)
		},
		onCancel: (_filename) => {}
	})
}

function quickSave(clientId, api, _args) {
	const writebox = document.getElementById(clientId).querySelector('.writebox')
	const openFileName = writebox.getAttribute('data-open-file')
	api.fs.saveUserFile(openFileName, writebox.value)
}

function openToWritebox(clientId, api, _args) {
	const writebox = document.getElementById(clientId).querySelector('.writebox')
	api.create.messageBox(clientId, {
		type: 'ask',
		title: 'Open file...',
		message: {
			icon:        'document-outline',
			heading:     'Select a file name',
			description: 'To open a file, use the filename for it.',
			submit:      'Open',
			cancel:      'Cancel'
		},
		onSubmit: (filename) => {
			let fileText = api.fs.getUserFile(filename)
			if (fileText !== undefined) {
				writebox.value = api.fs.getUserFile(filename)
				writebox.setAttribute('data-open-file', filename)
			} else {
				api.create.messageBox(clientId, {
					type: 'message',
					title: 'Save as...',
					message: {
						icon:        'alert-circle-outline',
						heading:     'This file does not exist.',
						description: "The file name you just entered does not exist. Make sure that you spelled it right.",
						submit:      'OK',
						cancel:      'Cancel'
					},
					onSubmit: () => {},
					onCancel: () => {}
				})
			}
		},
		onCancel: (_filename) => {}
	})
}
