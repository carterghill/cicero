const { Events } = require('discord.js');
const filter = require('../filter.json');

module.exports = {
	name: Events.MessageCreate,
	once: false,
	execute(message) {
		let low = message.toString().toLowerCase()
		let words = low.replace(/[.,\/?#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ")
		filter.forEach(async word => {
			if (words.includes(word)) {
				try {
					const fetchedMessage = await message.channel.messages.fetch(message.id);
					await fetchedMessage.delete();
					console.log(`Deleted message with ID ${message.id}`);
				} catch (error) {
					console.error(`Failed to delete message with ID ${message.id}: ${error}`);
				}
				return
			}
		})
	},
};