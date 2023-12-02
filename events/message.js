const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: true,
	execute(message) {
		console.log(`Message: ${message}`);
	},
};