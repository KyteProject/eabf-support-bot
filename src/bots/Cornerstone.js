import { ActivityHandler } from 'botbuilder';
import { IntroCard } from '../components/IntroCard';
import QnaHandler from './../components/QnaHandler';

class Cornerstone extends ActivityHandler {
	constructor() {
		super();

		this.QnA = new QnaHandler();

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
					await this.QnA.search( context );
			}
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
