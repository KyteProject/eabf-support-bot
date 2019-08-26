import { ActivityHandler } from 'botbuilder';
import { IntroCard } from '../components/IntroCard';

class Cornerstone extends ActivityHandler {
	constructor() {
		super();

		/**
		|--------------------------------------------------
		| Event: Triggered when message received
		|--------------------------------------------------
		*/
		this.onMessage( async( context, next ) => {
			const text = context.activity.text.toLowerCase();

			switch ( text ) {
				case 'hello':
				case 'hi':
					await context.sendActivity( `You said "${context.activity.text}"` );
					break;
				case 'intro':
				case 'help':
					await this.sendIntroCard( context );
					break;
				default:
					await context.sendActivity(
						'This is a simple Welcome Bot sample. You can say \'intro\' to see the introduction card. If you are running this bot in the Bot Framework Emulator, press the \'Start Over\' button to simulate user joining a bot or a channel'
					);
			}

			await this.userState.saveChanges( context );
			await next();
		} );

		/**
		|--------------------------------------------------
		| Event: Triggered when a user joins the conversation
		|--------------------------------------------------
		*/
		this.onMembersAdded( async( context, next ) => {
			for ( const idx in context.activity.membersAdded ) {
				if ( context.activity.membersAdded[ idx ].id !== context.activity.recipient.id ) {
					await context.sendActivity( { attachments: [ IntroCard ] } );
				}
			}

			await next();
		} );
	}
}

export default Cornerstone;
