var express = require("express");
var router = express.Routes();
var DS = require("../lib/data-store.js");
/*LIST OF POKEMON*/
router.get("/", function (req, res) {
  res.render("index", {
    pokemonList: DS.getAllPokemon().sort(DS.compare),
  });
});
/*CREATE POKEMON*/
router.post("/", function (req, res) {
  var newPokemon = {
    npn: Number(req.body.npn),
    name: req.body.name,
    region: req.body.region,
    typeOne: req.body.typeOne,
    typeTwo: req.body.typeTwo,
    description: req.body.description,
  };
  DS.createPokemon(newPokemon);
  res.redirect("/pokemon");
});
/* SEARCH POKEMON*/
router.post("/search", function (req, res) {
  var search = req.body.search;
  var npn = DS.getPokemonNPN(search);
  res.redirect("/pokemon/" + npn);
});
/*NEW POKEMON FORM*/
router.get("/new", function (req, res) {
  res.render("new");
});
/*INDIVIDUAL POKEMON*/
router.get("/:npn", function (req, res) {
  var npn = Number(req.params.npn);
  var pokemon = DS.getOnePokemon(npn);
  res.render("show", {
    npn: npn,
    name: pokemon.name,
    imageUrl:
      "http://img.pokemondb.net/artwork/" + pokemon.name.toLowerCase() + ".jpg",
    region: pokemon.region,
    typeOne: pokemon.typeOne,
    typeTwo: pokemon.typeTwo,
    description: pokemon.description,
  });
});
/*EDIT POKEMON FORM*/
router.get("/:npn/edit", function (req, res) {
  var npn = Number(req.params.npn);
  var pokemon = DS.getOnePokemon(npn);
  res.render("edit", {
    npn: npn,
    name: pokemon.name,
    region: pokemon.region,
    typeOne: pokemon.typeOne,
    typeTwo: pokemon.typeTwo,
    description: pokemon.description,
  });
});
/*EDIT POKEMON DATA*/
router.put("/:npn", function (req, res) {
  var updatedPokemon = {
    npn: Number(req.body.npn),
    name: req.body.name,
    region: req.body.region,
    typeOne: req.body.typeOne,
    typeTwo: req.body.typeTwo,
    description: req.body.description,
  };
  DS.updatedPokemon(Number(req.body.npm), updatedPokemon);
  res.redirect("/pokemon/" + req.body.npn);
});

/*DELETE POKEMON DATA*/
router.delete("/:npm", function (req, res) {
  DS.destroyPokemon(Number(req.params.npn));
  res.redirect("/pokemon");
});
module.exports = router;
