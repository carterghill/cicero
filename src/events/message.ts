import { blockQuote, EmbedBuilder, Events, Message, userMention } from 'discord.js';
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

					let filteredMessage = message.toString()
					filter.forEach(w => {
						var regEx = new RegExp(w, "ig");
						filteredMessage = filteredMessage
							.toString().replace(regEx, "[REDACTED]");
					})

					let embed = new EmbedBuilder().setColor("#ff0000")
						.setTitle("Message Censored")
						.setAuthor({name: message.author.displayName, 
									iconURL: message!.author!.avatarURL()!})
						.setDescription(userMention(message.author.id) + " has spoken a forbidden word.")
						.addFields({ name: 'Amended:', value: blockQuote(filteredMessage) })

					await message.channel.send({ embeds: [embed] })

				} catch (error) {
					console.error(`Failed to delete message with ID ${message.id}: ${error}`);
				}
			}
		})
	},
};