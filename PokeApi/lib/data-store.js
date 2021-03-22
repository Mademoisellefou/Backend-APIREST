"use strict";
// Data Store
const pokemonList = [
  {
    npn: 25,
    name: "Pikachu",
    region: "Kanto",
    typeOne: "electric",
    typeTwo: "",
    description:
      "This Pokémon has electricity-storing pouches on its cheeks. These appear to become electrically charged during the night while Pikachu sleeps. It occasionally discharges electricity when it is dozy after waking up.",
  },
  {
    npn: 39,
    name: "Jigglypuff",
    region: "Kanto",
    typeOne: "normal",
    typeTwo: "fairy",
    description:
      "Jigglypuff's vocal cords can freely adjust the wavelength of its voice. This Pokémon uses this ability to sing at precisely the right wavelength to make its foes most drowsy.",
  },
  {
    npn: 150,
    name: "Mewtwo",
    region: "Kanto",
    typeOne: "psychic",
    typeTwo: "",
    description:
      "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.",
  },
  {
    npn: 152,
    name: "Chikorita",
    region: "Johto",
    typeOne: "grass",
    typeTwo: "",
    description:
      "In battle, Chikorita waves its leaf around to keep the foe at bay. However, a sweet fragrance also wafts from the leaf, becalming the battling Pokémon and creating a cozy, friendly atmosphere all around.",
  },
  {
    npn: 183,
    name: "Marill",
    region: "Johto",
    typeOne: "water",
    typeTwo: "fairy",
    description:
      "Marill's oil-filled tail acts much like a life preserver. If you see just its tail bobbing on the water's surface, it's a sure indication that this Pokémon is diving beneath the water to feed on aquatic plants.",
  },
  {
    npn: 249,
    name: "Lugia",
    region: "Johto",
    typeOne: "psychic",
    typeTwo: "flying",
    description:
      "Lugia is so powerful even a light fluttering of its wings can blow apart houses. As a result, it chooses to live out of sight deep under the sea.",
  },
];

const types = [
  { value: "", text: "None" },
  { value: "bug", text: "Bug" },
  { value: "dark", text: "Dark" },
  { value: "dragon", text: "Dragon" },
  { value: "electric", text: "Electric" },
  { value: "fairy", text: "Fairy" },
  { value: "fighting", text: "Fighting" },
  { value: "fire", text: "Fire" },
  { value: "flying", text: "Flying" },
  { value: "ghost", text: "Ghost" },
  { value: "grass", text: "Grass" },
  { value: "ground", text: "Ground" },
  { value: "ice", text: "Ice" },
  { value: "normal", text: "Normal" },
  { value: "poison", text: "Poison" },
  { value: "psychic", text: "Psychic" },
  { value: "rock", text: "Rock" },
  { value: "steel", text: "Steel" },
  { value: "water", text: "Water" },
];

const regions = [
  { value: "Kanto", text: "Kanto" },
  { value: "Johto", text: "Johto" },
];

const getAllPokemon = function () {
  return pokemonList.map((x) => Object.assign({}, x));
};

const getOnePokemon = function (npn) {
  var p = pokemonList.find((pokemon) => pokemon.npn === npn);
  return p ? Object.assign({}, p) : p;
};

const createPokemon = function (pokemonAtrrs) {
  if (pokemonList.find((pokemon) => pokemon.npn === pokemonAtrrs.npn)) {
    return false;
  }
  pokemonList.push(pokemonAtrrs);
  return true;
};

const updatedPokemon = function (npn, pokemonAttrs) {
  var p = pokemonList.find((pokemon) => pokemon.npn === npn);
  if (p) {
    //validate
    if (
      p.npn !== pokemonAttrs.npn &&
      pokemonList.find((pokemon) => pokemon.npn === pokemonAtrrs.npn)
    ) {
      return false;
    }
    //update
    for (let attr in pokemonAtrrs) {
      p[attr] = pokemonAtrrs[attr];
    }
    return true;
  }
  return false;
};

const destroyPokemon = function (npn) {
  var pIndex = pokemonList.findIndex((pokemon) => pokemon.npn === npn);
  if (pIndex !== -1) {
    pokemonList.splice(pIndex, 1);
  }
};

const compare = function (a, b) {
  if (a.npn < b.npn) {
    return -1;
  }
  if (a.npn > b.npn) {
    return 1;
  }
  return 0;
};

const getPokemonNPN = function (name) {
  name = name.toLowerCase().split("");
  name[0] = name[0].toUpperCase();
  name = name.join("");
  console.log(name);
  var p = pokemonList.find((pokemon) => pokemon.name === name);
  if (p) {
    return p.npn;
  }
  return "";
};

const getTypes = function () {
  return types.map((x) => x);
};

const getRegions = function () {
  return regions.map((x) => x);
};

module.exports = {
  getAllPokemon,
  getOnePokemon,
  createPokemon,
  updatePokemon,
  destroyPokemon,
  compare,
  getPokemonNPN,
  getTypes,
  getRegions,
};
