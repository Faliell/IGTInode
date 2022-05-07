import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("digite um numero:", (numero) => {
  console.log(numero);
  rl.close();
});
