const dotenv = require( 'dotenv' ),
  path = require( 'path' ),
  restify = require( 'restify' ),
  // Import required bot services.
  { BotFrameworkAdapter } = require( 'botbuilder' ),
  // This bot's main dialog.
  { MyBot } = require( './bot' );

// Import required bot configuration.
const ENV_FILE = path.join( __dirname, '.env' );

dotenv.config( { path: ENV_FILE } );

// Create HTTP server
const server = restify.createServer();

server.listen( process.env.port || process.env.PORT || 3978, () => {
  console.log( `\n${server.name} listening to ${server.url}` );
} );

// Create adapter.
const adapter = new BotFrameworkAdapter( {
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
  } ),
  configuration = {
    knowledgeBaseId: process.env.QnAKnowledgebaseId,
    endpointKey: process.env.QnAAuthKey,
    host: process.env.QnAEndpointHostName
  };

// Catch-all for errors.
adapter.onTurnError = async( context, error ) => {
  console.error( `\n [onTurnError]: ${error}` );
  await context.sendActivity( 'Oops. Something went wrong!' );
};

// Create the main dialog.
const myBot = new MyBot();

// Listen for incoming requests.
server.post( '/api/messages', ( req, res ) => {
  adapter.processActivity( req, res, async( context ) => {
    // Route to main dialog.
    await myBot.run( context );
  } );
} );
