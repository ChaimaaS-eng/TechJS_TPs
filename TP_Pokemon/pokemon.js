const axios = require("axios"); //outil pour faire des requêtes HTTP

async function getPokemon(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = response.data; //récupère les données JSON 

    const moves = data.moves.slice(0, 5);

    let movesList = [];

    for (let move of moves) {
      const moveData = await axios.get(move.move.url);

      movesList.push({
        name: moveData.data.name,
        power: moveData.data.power || 50,
        accuracy: moveData.data.accuracy || 100,
        pp: moveData.data.pp
      });
    }

    return {
      name: data.name,
      hp: 300,
      moves: movesList
    };

  } catch (error) {
    console.log(" Pokémon not found!");
    process.exit();
  }
}

module.exports = { getPokemon };