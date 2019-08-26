const { ActivityHandler } = require( 'botbuilder' ),
	{ QnAMaker } = require( 'botbuilder-ai' );

class MyBot extends ActivityHandler {
	constructor( configuration, qnaOptions ) {
		super();

		if ( !configuration ) {
			throw new Error( '[QnaMakerBot]: Missing parameter. configuration is required' );
		}
		this.qnaMaker = new QnAMaker( configuration, qnaOptions );

		this.onMessage( async( context, next ) => {
			const qnaResults = await this.qnaMaker.getAnswers( context );

			if ( qnaResults[ 0 ] ) {
				await context.sendActivity( `QnAMaker returned response: ' ${qnaResults[ 0 ].answer}` );
			} else {
				await context.sendActivity( 'No QnA Maker response was returned.' );
			}
			await next();
		} );

		this.onMembersAdded( async( context, next ) => {
			const membersAdded = context.activity.membersAdded;

			for ( let cnt = 0; cnt < membersAdded.length; ++cnt ) {
				if ( membersAdded[ cnt ].id !== context.activity.recipient.id ) {
					await context.sendActivity( 'Hello and welcome!' );
				}
			}
			await next();
		} );
	}
}

module.exports.MyBot = MyBot;
