function executeAttack(attacker, defender, move) {

  if (move.pp <= 0) {
    console.log(` ${move.name} has no PP left`);
    return;
  }

  move.pp--;

  const random = Math.floor(Math.random() * 100);

  if (random > move.accuracy) {
    console.log(` ${attacker.name} missed!`);
    return;
  }

  defender.hp -= move.power;

  console.log(` ${attacker.name} used ${move.name} → ${move.power} damage`);
}

function playTurn(player, bot, playerMove, botMove) {

  console.log(`\n ${player.name} vs ${bot.name}`);

  //  règle du TP : comparaison PP
  if (playerMove.pp < botMove.pp) {
    console.log(" Player attack blocked (lower PP)");
  } else {
    executeAttack(player, bot, playerMove);
  }

  if (botMove.pp < playerMove.pp) {
    console.log(" Bot attack blocked (lower PP)");
  } else {
    executeAttack(bot, player, botMove);
  }
}

module.exports = { playTurn };