/* Elementos a manipular */
const habilidadesContainer = document.querySelector(".row");
const imgPokemon = document.querySelector("#imgPokemon");
const nombrePokemon = document.querySelector("#nombrePokemon");
const pesoPokemon = document.querySelector("#pesoPokemon");
const alturaPokemon = document.querySelector("#alturaPokemon");

/* Obtenemos el Id en contexto y evaluamos que no este vacio */
var id = getId();
/* Si el Id no existe se obtiene un -1 y el Id 0 no existe en la API.
Por tanto si el id retornado es mayor a cero debe existir obligatoriamente dicho Id*/
if(id > 0){
    fetchPokemon(id);
} else {
    nombrePokemon.textContent = "No se ha seleccionado un pokemon";
}

/* Consumo de la API mediante Id */
function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      setDetails(data);
    });
}

/* Asignamos los valores del pokemon en cuestion */
function setDetails(pokemon) {  
  imgPokemon.src = pokemon.sprites.front_default;  
  nombrePokemon.textContent = pokemon.name;
  pesoPokemon.textContent = "Peso: " + pokemon.weight + " KG";
  alturaPokemon.textContent = "Altura: " + pokemon.height + " M";
  /* Obtenemos la cantidad de habilidades del pokemon */
  var cantAbilities = pokemon.abilities.length;
  /* Recorremos el array y generamos las cartas necesarios */
  for(let i = 0; i < cantAbilities; i++){
    /* Obtenemos la habilidad en dicha posicion */
    var habilidad = pokemon.abilities[i].ability.name;
    /* Creamos los elementos necesarios */
    const columna = document.createElement("div");
    columna.classList.add("column");
    const carta = document.createElement("div");
    carta.classList.add("card");
    const textoCarta = document.createElement("h4");
    textoCarta.textContent = habilidad;
    columna.appendChild(carta);
    carta.appendChild(textoCarta);
    habilidadesContainer.appendChild(columna);
  }
}

/* Obtenemos el Id del Pokemon de la URL
*  Si encuentra el Id lo retorna
*  Si no lo encuenrtra retorna -1 */
function getId() {
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split ("&");
    var params = {};
    for (var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    if (params['id']) {
        return params['id'];
    } else {
        return -1;
    }
}


