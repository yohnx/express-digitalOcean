import express from "express";

const app = express();
const port = 3000;

let teaData = [];
let nextId = 1;

app.use(express.json());
//create
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//read-all
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//read-one
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("tea not found");
  }
  res.status(200).send(tea);
});

//update
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(400).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  res.status(204).send(teaData);
});

app.listen(port, () => {
  console.log(`server is running ar port-${port}`);
});
