const express = require("express");
let bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 8000;
app.use(bodyParser.json());

let humans = [];

app.get("/", (req, res) => res.send("Merhaba Dünya!"));
app.get("/humans", (req, res) => {
  res.json(humans);
});
app.post("/createHuman", (req, res) => {
  let data = req.body;
  if (data.name === undefined || data.surname === undefined) {
    res.status = 400;
    res.send("data is wrong");
    return;
  }
  data.id = uuidv4();
  humans.push(data);
  res.status = 201;
  res.json(data);
});
app.get("/humans/:id", (req, res) => {
  console.log("response params", req.params);
  let id = req.params.id;
  let obj = humans.filter((e) => e.id === id);
  if (obj.length === 0) {
    res.status = 400;
    res.send("there is no one with that id");
    return;
  }
  res.send(obj[0]);
});
app.put("/humans/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log("id-->", id, "data-->", data);
  let index = humans.findIndex((e) => e.id === id);
  console.log("index:", index);
  if (index < 0) {
    res.status = 400;
    res.send("id is wrong");
    return;
  }
  if (data.name === undefined || data.surname === undefined) {
    res.status = 400;
    res.send("data is wrong");
    return;
  }
  humans[index].name = data.name;
  humans[index].surname = data.surname;
  res.json(humans[index]);
});
app.patch("/humans/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  console.log("id-->", id, "data-->", data);
  let index = humans.findIndex((e) => e.id === id);
  console.log("index:", index);
  if (index < 0) {
    res.status = 400;
    res.send("id is wrong");
    return;
  }
  let human = humans[index];
  let newHuman = { ...human, ...data };
  humans[index] = newHuman;

  res.json(humans[index]);
});
app.delete("/humans/:id", (req, res) => {
  let id = req.params.id;
  let index = humans.findIndex((e) => e.id === id);
  console.log("index:", index);
  if (index < 0) {
    res.status = 400;
    res.send("id is wrong");
    return;
  }
  humans.splice(index, 1);
  res.status = 204;
  res.send("deleted");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
