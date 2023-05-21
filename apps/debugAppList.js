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

	<h2>Hardcoded</h2>

	<div class="list">
		<p>swingver</p>
		<p>clientAppList</p>
		<p>shorctutCheatSheet</p>
		<p>runWindow</p>
 		<p>settingsWindow</p>
	</div>

	<h2>External</h2>

	<div class="list">
	    <p>/apps/write.js</p>
		<p>/apps/learnHuman.js</p>
	    <p>/apps/notificationEngine.js</p>
		<p>/apps/about.js</p>
		<p>/apps/debugAppList.js</p>
	</div>
 	`
}
