const { WebClient } = require( '@slack/web-api' );
const { Botkit } = require( 'botkit' );
const { SlackAdapter, SlackEventMiddleware } = require( 'botbuilder-adapter-slack' );

const dotenv = require( 'dotenv' );
dotenv.config();

const web = new WebClient( process.env.BOT_TOKEN );
const adapter = new SlackAdapter( {
	clientSigningSecret: `${ process.env.CLIENT_SECRET }`,
	botToken: `${ process.env.BOT_TOKEN }`
} );

adapter.use( new SlackEventMiddleware() );

const controller = new Botkit( {
	webhook_uri: '/api/messages',
	adapter: adapter,
} )

controller.ready(() => {
	controller.hears(
		['hello', 'hi'],
		['message', 'direct_message'],
		async ( bot, message ) => {
		await bot.reply(message, 'Meow. :smile_cat:');
	} );
});
// (async () => {

// 	// try {
// 	// 	await web.chat.postMessage( {
// 	// 		channel: '#general',
// 	// 		text: `The current time is ${currentTime}`,
// 	// 	} );
// 	// } catch (error) {
// 	// 	console.log(error);
// 	// }

// 	// console.log('Message posted!');

	

// })();