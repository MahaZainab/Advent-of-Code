const fs = require('fs');
const filePath = 'input.txt';
const data = fs.readFileSync(filePath, 'utf-8').trim();

let gameCubes = [];

data.split('\n').forEach((line) => {
  let [_, gameData] = line.split(':');
  let ballSet = gameData.split(';');

  let R = [];
  let G = [];
  let B = [];

  for (let set of ballSet) {
    let balls = set.split(',');

    for (let ball of balls) {
      if (ball.includes('green')) {
        G.push(parseInt(ball.trim().split(' ')[0], 10));
      }
      if (ball.includes('red')) {
        R.push(parseInt(ball.trim().split(' ')[0], 10));
      }
      if (ball.includes('blue')) {
        B.push(parseInt(ball.trim().split(' ')[0], 10));
      }
    }
  }

  gameCubes.push(Math.max(...R) * Math.max(...G) * Math.max(...B));
});

let totalP2 = 0;

for (let id of gameCubes) {
  totalP2 += id;
}

console.log(totalP2);