export const client = {
	id: 'ivy--debug-app-list',
	title: 'Debugging App List',
	size: {
		preset: 'small'
	},
	icon: 'bug-outline',
	content: `
 	<p>This is a list of all apps currently available in Swing. Some of these are not in the applications menu due to bugs and other problems.</p>
	<p>This is not as up to date as possible, so some of the things in here may be removed or changed names.</p>
	<p>Use Run to open these.</p>

	<br />

	<div class="list">
		<p>swingver</p>
		<p>clientAppList</p>
		<p>runWindow</p>
 		<p>settingsWindow</p>

	    <p>/apps/write/write.js</p>
		<p>/apps/markrender.js</pp>
		<p>/apps/shortcut-cheat-sheet.js</p>
		<p>/apps/learnHuman.js</p>
	    <p>/apps/notificationEngine.js</p>
		<p>/apps/debugAppList.js</p>
		<p>/apps/testwin.js</p>
		<p>/apps/web-searcher.js</p>
		<p>/apps/sampleimages/main.js</p>
		<p>/apps/welcomeApp/main.js</p>
		<p>/apps/WindowAPITest.js</p>
	</div>
 	`
}
