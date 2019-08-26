require( 'dotenv' ).config();

import restify from 'restify';
import { BotFrameworkAdapter } from 'botbuilder';
import Cornerstone from './bots/Cornerstone';

// Create adapter.
const adapter = new BotFrameworkAdapter( {
	appId: process.env.MicrosoftAppId,
	appPassword: process.env.MicrosoftAppPassword
} );

// Catch-all for errors.
adapter.onTurnError = async( context, error ) => {
	console.error( `\n [onTurnError]: ${error}` );
	await context.sendActivity( 'Oops. Something went wrong!' );
};

const bot = new Cornerstone(),
	server = restify.createServer();

server.listen( process.env.port || process.env.PORT || 3978, () => {
	console.log( `\n${server.name} listening to ${server.url}` );
} );

// Listen for incoming requests.
server.post( '/api/messages', ( req, res ) => {
	adapter.processActivity( req, res, async turnContext => {
		await bot.run( turnContext );
	} );
} );
