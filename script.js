const base_URL = '';
let actPokemon = [];
let pokemon = [];
let pokemonID = 0;


function init() {
    includeHTML();
    getDataForThirtyFromPokeAPI();
}

async function getDataForThirtyFromPokeAPI() {
    for (let i = pokemonID; i < 30; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        actPokemon = await response.json();
        pokemon.push(actPokemon);
        pokemonID++;

    }
    renderThirtyPokemons();
}

async function getDataForThirtyMoreFromPokeAPI() {
    let nextLength = pokemonID + 30;
    for (let i = pokemonID; i < nextLength; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        actPokemon = await response.json();
        pokemon.push(actPokemon);
        pokemonID++;

    }
    renderThirtyPokemons();
}

function renderThirtyPokemons() {

    for (let i = pokemonID - 30; i < pokemon.length; i++) {
        let type1 = pokemon[i].types[0]?.type.name ?? ''; // if there FILL -> else ''
        let type2 = pokemon[i].types[1]?.type.name ?? ''; // if there FILL -> else '' {
        document.getElementById('pokemonContainer').innerHTML +=/*html*/ `
        <div class="card ${type1}" id="card${i}" onclick="openSinglePokemon(${[i]})">
        <div class="cardPokemonId">ID:${pokemon[i]['id']}</div>
            <img src="${pokemon[i]['sprites']['front_default']}" alt="">
            <strong>${pokemon[i]['species']['name']}</strong>
            <div class="cardTypesContainer">
                <span class="${type1} cardPadding">${type1}</span>
                <span class="${type2} cardPadding">${type2}</span></div>         
        </div>
        `
    }
}

function openSinglePokemon(i) {
    console.log(i);
}


