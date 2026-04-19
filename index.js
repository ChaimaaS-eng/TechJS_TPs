#!/usr/bin/env node

const inquirer = require("inquirer").default;
const { getPokemon } = require("./pokemon");
const { playTurn } = require("./game");

async function startGame() {

  console.log("🎮 Welcome to Pokémon Battle!");

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "pokemon",
      message: "Choose your Pokemon:",
      choices: ["pikachu", "charizard", "bulbasaur", "squirtle"]
    }
  ]);

  const player = await getPokemon(answer.pokemon);

  const pokemons = ["pikachu", "charizard", "bulbasaur", "squirtle"];
  const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];

  const bot = await getPokemon(randomPokemon);

  console.log(`\n🤖 Bot chose: ${bot.name}`);
  console.log("\n⚔️ Battle Start!");

  while (player.hp > 0 && bot.hp > 0) {

    console.log(`\n❤️ ${player.name}: ${player.hp}`);
    console.log(`💀 ${bot.name}: ${bot.hp}`);

    const moveAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "move",
        message: "Choose your move:",
        choices: player.moves.map((m, i) => ({
          name: `${m.name} | Power:${m.power} | Acc:${m.accuracy} | PP:${m.pp}`,
          value: i
        }))
      }
    ]);

    const playerMove = player.moves[moveAnswer.move];
    const botMove = bot.moves[Math.floor(Math.random() * bot.moves.length)];

    playTurn(player, bot, playerMove, botMove);

    if (player.hp <= 0) {
      console.log("\n💀 You lose!");
      break;
    }

    if (bot.hp <= 0) {
      console.log("\n🎉 You win!");
      break;
    }
  }
}

startGame();