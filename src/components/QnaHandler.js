import { QnAMaker } from 'botbuilder-ai';

export default class QnaHandler {
	constructor() {
		try {
			this.qnaMaker = new QnAMaker( {
				knowledgeBaseId: process.env.QnAKnowledgebaseId,
				endpointKey: process.env.QnAEndpointKey,
				host: process.env.QnAEndpointHostName
			} );
		} catch ( err ) {
			console.warn( `QnAMaker Exception: ${err} Check your QnAMaker configuration in .env` );
		}
	}

	async search( context ) {
		const qnaResults = await this.qnaMaker.getAnswers( context );

		if ( qnaResults[ 0 ] ) {
			await context.sendActivity( `QnAMaker returned response: ' ${qnaResults[ 0 ].answer}` );
		} else {
			await context.sendActivity( 'No QnA Maker response was returned.' );
		}
	}
}
