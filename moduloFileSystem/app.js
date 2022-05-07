import fs from "fs";
import { promises as pro } from "fs";

fs.writeFile("teste.txt", "bla bla bla", function (err) {
  if (err) {
    console.log(err);
  } else {
    fs.appendFile("teste.txt", "\nmais texto", function (err) {
      if (err) {
        console.log(err);
      } else {
        fs.readFile("teste.txt", "utf-8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});

// sincro

fs.writeFileSync("teste2.txt", "executa sincrono");

// promises
pro
  .writeFile("teste3.txt", "teste com promises")
  .then(() => {})
  .catch((err) => console.log(err));

// async

async function init() {
  try {
    await pro.writeFile("teste4.txt", "teste com async");
  } catch (err) {
    console.log(err);
  }
}

init();

// async json

async function writeReadJson() {
  try {
    const objetoCarro = { marca: "gol", ano: 2000 };
    await pro.writeFile("teste.json", JSON.stringify(objetoCarro));
    console.log(await pro.readFile("teste.json", "utf-8"));
  } catch (err) {
    console.log(err);
  }
}
writeReadJson();
