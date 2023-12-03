import { SlashCommandBuilder } from "discord.js";
import * as framedata from "../../framedata/index"

let characterChoices = [
    { name: "Bowser", value: "Bowser" },
    { name: 'Captain Falcon', value: 'CaptainFalcon' },
    { name: 'Donkey Kong', value: 'DonkeyKong' },
    { name: 'Dr. Mario', value: 'DrMario' },
    { name: 'Falco', value: 'Falco' },
    { name: 'Fox', value: 'Fox' },
    { name: 'Game & Watch', value: 'GameWatch' },
    { name: 'Ganondorf', value: 'Ganondorf' },
    { name: 'Nana', value: 'Nana' },
    { name: 'Popo', value: 'Popo' },
    { name: 'Jigglypuff', value: 'Jigglypuff' },
    { name: 'Kirby', value: 'Kirby' },
    { name: 'Link', value: 'Link' },
    { name: 'Luigi', value: 'Luigi' },
    { name: 'Mario', value: 'Mario' },
    { name: 'Marth', value: 'Marth' },
    { name: 'Mewtwo', value: 'Mewtwo' },
    { name: 'Ness', value: 'Ness' },
    { name: 'Peach', value: 'Peach' },
    { name: 'Pichu', value: 'Pichu' },
    { name: 'Pikachu', value: 'Pikachu' },
    { name: 'Roy', value: 'Roy' },
    { name: 'Samus', value: 'Samus' },
    { name: 'Sheik', value: 'Sheik' },
    { name: 'Yoshi', value: 'Yoshi' },
    { name: 'Young Link', value: 'YoungLink' },
    { name: 'Zelda', value: 'Zelda' }
]

module.exports = {
	data: new SlashCommandBuilder()
		.setName('framedata')
        .setDescription('Get Melee character framedata')
        .addStringOption(input => 
            input.setName("character")
            .setDescription("The Character whose data you'd like to view")
            .setAutocomplete(true)
            //.addChoices(...characterChoices.filter((val, index) => {
            //    if (index < 25) return val
            //}))
        ),

    async autocomplete(interaction: any) {
        const focusedValue = interaction.options.getFocused();
        const filtered = characterChoices.filter(choice => choice.name.startsWith(focusedValue));
        //console.log(filtered)
        await interaction.respond(filtered);
    },
        
	async execute(interaction: any) {
        const character = interaction.options.getString('character')

        await interaction.reply('Pong!');
	},
};