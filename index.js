const getData = async (API_URL) => {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
};

const printData = async (API_URL) => {
  const data = await getData(API_URL);
  const characters = await data.results;

  characters.forEach((c) => {
    // Nodos creados en el DOM
    const divElement = document.createElement("div");
    divElement.className = "col";
    const rowElement = document.querySelector("div.row");

    // Atributos de la API
    const name = c.name;
    const specie = c.species;
    const gender = c.gender;
    const location = c.location.name;
    const image = c.image;

    divElement.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="${c.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">Especie: ${specie}</p>
      <p class="card-text">Género: ${gender}</p>
      <p class="card-text">Ubicación: ${location}</p>
    </div>
  </div>`;
    rowElement.append(divElement);
  });
};

const pagination = async () => {
  let page = 1;
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");

  next.addEventListener("click", async () => {
    page += 1;

    // Se elimina el contenido de la columna de la grilla de Bootstrap, para refrescar al cambiar de página
    const divColElement = document.querySelector("div.col");
    divColElement.remove();

    const data = await getData(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    console.log(`https://rickandmortyapi.com/api/character?page=${page}`);
    const API_URL = data.info.next;
    printData(API_URL);
  });

  prev.addEventListener("click", async () => {
    page -= 1;
    const divColElement = document.querySelector("div.col");
    divColElement.remove();

    const data = await getData(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const API_URL = data.info.prev;
    printData(API_URL);
  });
};

const main = () => {
  const API_URL = "https://rickandmortyapi.com/api/character";
  printData(API_URL);

  pagination();
};

main();
