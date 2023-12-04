import { blockQuote, EmbedBuilder, SlashCommandBuilder, userMention } from "discord.js";
import * as framedata from "../../framedata/index"

let frameMap = new Map<string, any>()
let frameVals = Object.values(framedata)
Object.keys(framedata).forEach((key, index) => {
    frameMap.set(key, frameVals[index])
})

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
        ),

    async autocomplete(interaction: any) {
        const focusedValue = interaction.options.getFocused();
        const filtered = characterChoices.filter((choice, index) => {
            if (index < 25) return choice.name.toLowerCase().startsWith(focusedValue.toLowerCase())
        });
        await interaction.respond(filtered);
    },
        
	async execute(interaction: any) {
        const character = interaction.options.getString('character')
        let moves = frameMap.get(character)

        if (moves === undefined || moves === null) {
            let characterNames = ""
            characterChoices.forEach((val, index) => {
                characterNames = characterNames + val.name
                if (index < characterChoices.length-1) characterNames = characterNames + ", "
            })
            moves = ""
            Object.keys(framedata.Bowser).forEach((key, index) => {
                moves = moves + key
                if (index < Object.keys(framedata.Bowser).length) moves = moves + ", "
            })
            let embed = new EmbedBuilder().setColor("#0000ff")
				.setTitle("Melee Moveset Frames")
				.setDescription("Provide a valid character and move to see frame data")
				.addFields(
                    { name: 'Characters:', value: blockQuote(characterNames) },
                    { name: "Moves:", value: blockQuote(moves)}
                )

            await interaction.reply({ embeds: [embed] });
            return
        }

        console.log(Object.keys(moves))

        await interaction.reply(moves.toString());
	},
};