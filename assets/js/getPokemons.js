/* Elementos a manipular */
const pokemonContainer = document.querySelector(".cards");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

/* Configuramos para que solo 
muestre de 6 en 6 cartas */
let limit = 5;
let offset = 1;

/* Evento click del boton previous */
previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 6;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});

/* Evento click del boton next */
next.addEventListener("click", () => {
  offset += 6;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

/* Consumo de la API mediante Id */
function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);
    });
}

/* Obtenemos los datos de la API y los recorremos en
 la secuencia establecida en el principio */
function fetchPokemons(offset, limit) {
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

/* Renderizamos las cartas dentro del
 contenedor con los datos de la API*/
function createPokemon(pokemon) {
  const flipCard = document.createElement("div");
  flipCard.classList.add("card");
  const cardContainer = document.createElement("div");
  flipCard.appendChild(cardContainer);
  const card = document.createElement("div");
  const saltoLinea = document.createElement("br");
  const spriteContainer = document.createElement("div");
  const sprite = document.createElement("img");
  sprite.classList.add("imgRedonda");
  sprite.src = pokemon.sprites.front_default;
  spriteContainer.appendChild(sprite);
  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;
  const button = document.createElement("a");
  button.classList.add("button-card");
  /* Pasamos el Id del pokemon en la URL 
  para trabajar con el en Details */
  button.href = "./details.html?id=" + pokemon.id.toString();
  button.textContent = "Ver más"; 
  const salto = document.createElement("br");
  card.appendChild(saltoLinea);
  card.appendChild(spriteContainer);
  card.appendChild(name);
  card.appendChild(button);
  cardContainer.appendChild(card);
  cardContainer.appendChild(salto);
  pokemonContainer.appendChild(flipCard);
}

/* Eliminamnos todos los elementos 
del contenedor (cartas) */
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
/* Llamamos la funcion para establecer la secuencia
 en la que se recorreran los datos obtenidos */
fetchPokemons(offset, limit);