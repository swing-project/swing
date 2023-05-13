export const client = {
	'id': 'ivy:notification-engine',
	'title': 'Notification Engine',
	'size': {
		'height': '128px',
		'width': 'fit-content',
		'rigid': true
	},
	'noOptionsPadding': true,
	'icon': 'notifications-outline',
	'contentStyling': 'padding: 8px;',
	'content': `
	<div class="flex flexdir-col gap-1 ai-end">
		<div class="flex flexdir-row gap-1 ai-center">
			<label for="%human%-title">Title</label>
 			<input type="text" class="no-width-100" id="%human%-title" />
		</div>
		<div class="flex flexdir-row gap-1 ai-center">
			<label for="%human%-description">Description</label>
			<input type="text" class="no-width-100" id="%human%-description" />
		</div>
	</div>
 	`,
	'options': [
		{
			'name': 'Submit',
			'message': 'script',
			'messagescript': function (clientId, api) {
				return function () {
					api.create.notification({
						'title': document.getElementById(`${clientId}-title`).value,
						'description': document.getElementById(`${clientId}-description`).value
					})
				}
			}
		}
	]
}
