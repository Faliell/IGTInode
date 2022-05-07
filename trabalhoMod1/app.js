import express from "express";
import { promises } from "fs";

const { readFile } = promises;
const app = express();
app.use(express.json());

global.fileName = "cars.json";

app.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("cars.json"));
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/:brand", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("cars.json"));
    const car = data.cars.find((bra) => bra.brand == req.params.brand);
    res.send(car);
  } catch (err) {
    console.log(err);
  }
});

app.get("/brands/moreModels/:showNumber?", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("cars.json"));

    let showNumber = req.params.showNumber || data.cars.length;
    showNumber > data.cars.length && (showNumber = data.cars.length);

    data.cars.forEach((element) => {
      const sizeModel = element.models.length;
      element.size = sizeModel;
    });
    data.cars.sort((a, b) => {
      if (a.brand < b.brand) {
        return -1;
      } else {
        return true;
      }
    });

    data.cars.sort((a, b) => {
      if (a.size > b.size) {
        return -1;
      } else {
        return true;
      }
    });

    const showList = [];
    data.cars.forEach((element) => {
      showList.push(`${element.brand} - ${element.size}`);
    });
    res.send(showList.slice(0, showNumber));
  } catch (err) {
    console.log(err);
  }
});

app.get("/brands/lessModels/:showNumber?", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("cars.json"));

    let showNumber = req.params.showNumber || data.cars.length;
    showNumber > data.cars.length && (showNumber = data.cars.length);

    data.cars.forEach((element) => {
      const sizeModel = element.models.length;
      element.size = sizeModel;
    });
    data.cars.sort((a, b) => {
      if (a.brand < b.brand) {
        return -1;
      } else {
        return true;
      }
    });

    data.cars.sort((a, b) => {
      if (a.size < b.size) {
        return -1;
      } else {
        return true;
      }
    });

    const showList = [];
    data.cars.forEach((element) => {
      showList.push(`${element.brand} - ${element.size}`);
    });
    res.send(showList.slice(0, showNumber));
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server port 3000");
});
