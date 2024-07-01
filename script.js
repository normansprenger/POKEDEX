const base_URL = '';
let actPokemon = [];
let pokemon = [];
let pokemonID = 0;


function init() {
    includeHTML();
    getDataForThirtyFromPokeAPI();
}


async function getDataForThirtyFromPokeAPI() {
    showLoadingScreen();
    for (let i = pokemonID; i < 30; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        actPokemon = await response.json();
        pokemon.push(actPokemon);
        pokemonID++;
    }
    renderThirtyPokemons();
    disableLoadingScreen();
}


async function getDataForThirtyMoreFromPokeAPI() {
    showLoadingScreen();
    let nextLength = pokemonID + 30;
    for (let i = pokemonID; i < nextLength; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        actPokemon = await response.json();
        pokemon.push(actPokemon);
        pokemonID++;
    }
    renderThirtyPokemons();
    disableLoadingScreen();
    document.getElementById('search').value = '';
    filterNames();
}


function renderThirtyPokemons() {
    for (let i = pokemonID - 30; i < pokemon.length; i++) {
        let type1 = pokemon[i].types[0]?.type.name ?? ''; // if there FILL -> else ''
        let type2 = pokemon[i].types[1]?.type.name ?? ''; // if there FILL -> else ''
        let name = capitalizeFirstLetter(pokemon[i]['species']['name']);
        document.getElementById('pokemonContainer').innerHTML += renderThirtyPokemonsHTML(i, type1 , type2, name);
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function openSinglePokemon(i) {
    let type1 = pokemon[i].types[0]?.type.name ?? ''; // if there FILL -> else ''
    let name = capitalizeFirstLetter(pokemon[i]['species']['name']);
    document.getElementById('choiceContainer').style = "display: flex";
    document.getElementById('choiceContainer').innerHTML = openSinglePokemonHTML(i, type1, name);
    progressColor(i);
}


function swipeLeft(i, event) {
    event.stopPropagation();
    if (i > 0) {
        i--;
        openSinglePokemon(i);
    }
    else {
        i = pokemon.length - 1;
        openSinglePokemon(i);
    }
}


function swipeRight(i, event) {
    event.stopPropagation();
    if (i < pokemon.length - 1) {
        i++;
        openSinglePokemon(i);
    }
    else {
        i = 0;
        openSinglePokemon(i);
    }
}


function closeChoiceContainer() {
    document.getElementById('choiceContainer').style = "display: none";
}


function showLoadingScreen() {
    document.getElementById('loadingScreen').style = "display: flex";
}


function disableLoadingScreen() {
    document.getElementById('loadingScreen').style = "display: none";
}


function filterNames() {
    let search = document.getElementById('search').value.toLowerCase();
    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i]['species']['name'].includes(search)) {
            document.getElementById(`card${i}`).style = "display: flex"
        } else {
            document.getElementById(`card${i}`).style = "display: none"
        }
    }
}


function progressColor(i){
    document.getElementById('progressHealth').style = `width: ${pokemon[i]['stats'][0]['base_stat']}%;`;
    document.getElementById('progressAttack').style = `width: ${pokemon[i]['stats'][1]['base_stat']}%;`;
    document.getElementById('progressDefense').style = `width: ${pokemon[i]['stats'][2]['base_stat']}%;`;
    document.getElementById('progressSpecialAttack').style = `width: ${pokemon[i]['stats'][3]['base_stat']}%;`;
    document.getElementById('progressSpecialDefense').style = `width: ${pokemon[i]['stats'][4]['base_stat']}%;`;
    document.getElementById('progressSpeed').style = `width: ${pokemon[i]['stats'][5]['base_stat']}%;`;
}


//html


function renderThirtyPokemonsHTML(i, type1 , type2, name){
    return /*html*/ `
    <div class="card ${type1}" id="card${i}" onclick="openSinglePokemon(${[i]})">
        <div class="cardPokemonId">ID:${pokemon[i]['id']}</div>
        <img src="${pokemon[i]['sprites']['front_default']}" alt="">
        <strong class="name" >${name}</strong>
        <div class="cardTypesContainer">
            <span class="${type1} cardPadding">${type1}</span>
            <span class="${type2} cardPadding">${type2}</span>
        </div>         
    </div>
    `
}


function openSinglePokemonHTML(i, type1, name){
    return /*html*/`
    <div class="choiceCard">
        <div class="choiceId">ID:${pokemon[i]['id']}</div>
        <img class="choiceImg" src="${pokemon[i]['sprites']['front_default']}" alt="">
        <div class="choiceSubContainer">
            <span class="arrow" onclick="swipeLeft(${[i]} , event)"><</span>
            <div class="choiceName">${name}</div>
            <span class="arrow" onclick="swipeRight(${[i]}, event)">></span>
        </div>
        <div class="stats">
            <h3>Stats</h3>
            <div class="stat">
                <span>Health</span>
                <div class="progressbar">
                    <div id="progressHealth" class="${type1} progress">
                    </div>
                </div>
            </div>
            <div class="stat">
                <span>Attack</span>
                <div class="progressbar">
                    <div id="progressAttack" class="${type1} progress">
                    </div>
                </div>
            </div>
            <div class="stat">
                <span>Defense</span>
                <div class="progressbar">
                    <div id="progressDefense" class="${type1} progress">
                    </div>
                </div>
            </div>
            <div class="stat">
                <span>Special-attack</span>
                <div class="progressbar">
                    <div id="progressSpecialAttack" class="${type1} progress">
                    </div>
                </div>  
            </div>
            <div class="stat">
                <span>Special-defense</span>
                <div class="progressbar">
                    <div id="progressSpecialDefense" class="${type1} progress">
                    </div>
                </div>  
            </div>
            <div class="stat">
                <span>Speed</span>
                <div class="progressbar">
                    <div id="progressSpeed" class="${type1} progress">
                    </div>
                </div> 
            </div>
        </div>
    <div>
`
}