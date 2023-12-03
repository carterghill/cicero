import { Events, Message } from 'discord.js';
import filter from '../filter.json';

module.exports = {
	name: Events.MessageCreate,
	once: false,
	execute(message: Message) {
		if (message.author.tag === message.client.user.tag) {
			return
		}
		let low = message.toString().toLowerCase()
		let words = low.replace(/[.,\/?#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ")
		let skip = false
		filter.forEach(async (word: string) => {
			if (!skip && words.includes(word)) {
				skip = true
				try {
					const fetchedMessage = await message.channel.messages.fetch(message.id);
					await fetchedMessage.delete();

					let str = message.toString()
					filter.forEach(w => {
						var regEx = new RegExp(w, "ig");
						str = str.toString().replaceAll(regEx, "[REDACTED]");
					})
					
					await message.channel.send(str)

				} catch (error) {
					console.error(`Failed to delete message with ID ${message.id}: ${error}`);
				}
			}
		})
	},
};