const express = require("express");
const http = require("http");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shell = require("shelljs");
const prettier = require("prettier");
const fs = require("fs");
const cors = require("cors");

const Collection = require("./models/Collection");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);

const mongo_uri = "mongodb://localhost/bpGen";

mongoose.connect(
  mongo_uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  }
);

const opt = {
  useTabs: false,
  printWidth: 60,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: `typescript`,
  trailingComma: "all",
  arrowParens: "avoid",
  proseWrap: "preserve"
};
const optCss = {
  parser: `css`
};

app.post("/api/create", function(req, res) {
  const model = new Collection(req.body.data.data);
  model.save(function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(model);
    }
  });
});

app.post("/api/update", function (req, res) {
  Collection.findByIdAndUpdate(
    req.body.data.data._id,
    req.body.data.data,
    err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    }
  );
});

app.delete("/api/delete", function (req, res) {
  var myquery = { _id: req.body.data };

  Collection.deleteOne(myquery, function(error, obj) {
    if (error) {
      res.status(500).send(error);
    }
    res.json("delete success");
  });
});

app.post("/api/read", async (req, res) => {
  Collection.find({}, (error, collection) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(collection);
    }
  });
});

app.post("/api/prettify", (req, res) => {
  let newCode = [];

  req.body.code.payload.map(e => {
    let theCode = "";
    if (e.code) theCode = e.code;

    // const newOpt = e.id === "styles.css" ? optCss : opt;
    
    newCode.push({ id: e.id, code: prettier.format(theCode, opt) });
  });
  res.json(newCode);
});

app.post("/api/exportFiles", (req, res) => {
  const { id, code, dest } = req.body;

  shell.mkdir(dest);
  if (id !== 'all') {
    const finalDest = req.body.dest + `/${id}`;
    fs.writeFileSync(`${finalDest}`, code, "utf8");
  } else {
    req.body.code.map(e => {
      const finalDest = req.body.dest + `/${e.id}`;
      fs.writeFileSync(`${finalDest}`, e.code, "utf8");
    });
  }

  res.json("done");
});

const port = process.env.PORT || 5000;
server.listen(port);

console.log("App is listening on port " + port);
