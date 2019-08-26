import { ActionTypes, CardFactory } from 'botbuilder';

export const IntroCard = CardFactory.heroCard(
	'Cornerstone Support Bot',
	'Welcome to the Cornerstone support bot!  - Ask me a question or use one of the buttons below to for a guided experience.',
	[
		'https://www.cornerstone.org.uk/app_assets/frontend/logos/logo-e6e89d88f1ddc34f534f4b0d0cb71a4304ed250a8119316a9836592b5479deab.svg'
	],
	[
		{
			type: ActionTypes.OpenUrl,
			title: 'Ask a question',
			value: 'https://stackoverflow.com/questions/tagged/botframework'
		},
		{
			type: ActionTypes.OpenUrl,
			title: 'Request Training',
			value:
				'https://teams.microsoft.com/l/entity/81fef3a6-72aa-4648-a763-de824aeafb7d/_djb2_msteams_prefix_3555937488?context=%7B%22subEntityId%22%3Anull%2C%22canvasUrl%22%3A%22https%3A%2F%2Fforms.office.com%2FPages%2FTeamsResponsePage.aspx%3FHost%3DTeams%26lang%3D%7Blocale%7D%26groupId%3D%7BgroupId%7D%26tid%3D%7Btid%7D%26teamsTheme%3D%7Btheme%7D%26upn%3D%7Bupn%7D%26id%3D8FQ7frUoAEaiyml4MU6QHA9vIy8L3o5It71U9XlJ1kBUOThJVlZXTldHMUhDUVQwNDdZMEZMMk1OVC4u%22%2C%22channelId%22%3A%2219%3A738a8a2faa19474587977e5afa87fba1%40thread.skype%22%7D&groupId=94e422f0-e8ac-48e6-a3db-7a72ba6da855&tenantId=7e3b54f0-28b5-4600-a2ca-6978314e901c'
		},
		{
			type: ActionTypes.OpenUrl,
			title: 'Bot Help',
			value: 'https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0'
		}
	]
);
