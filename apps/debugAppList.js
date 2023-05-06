export const client = {
	'id': 'ivy:debug-app-list',
	'title': 'Debugging App List',
	'size': {
		'preset': 'small'
	},
	'icon': 'bug-outline',
	'content': `
 	<p>This is a list of all apps currently available in humanOS. Some of these are not in the applications menu due to bugs and other problems.</p>

 	<br />

	<h2>Hardcoded</h2>

	<p>These apps can be opened using Run. (meta+R)</p>

	<div class="list">
		<p>hver</p>
		<p>clientAppList</p>
		<p>shorctutCheatSheet</p>
 		<p>notificationEngine</p>
		<p>runWindow</p>
 		<p>settingsWindow</p>
		<p>externalLoaderWindow</p>
	</div>

	<h2>External</h2>

	<p>Access these with the externalLoaderWindow app and use syntax <span class="monospace">/apps/{APP NAME}.js</span>.</p>

	<div class="list">
		<p>learnHuman</p>
		<p>about</p>
		<p>help</p>
		<p>write</p>
		<p>debugAppList</p>
		<p>externalObject</p>
	</div>
 	`
}
