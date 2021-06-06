const getData = async (API_URL) => {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
};

const printData = async (API_URL) => {
  const data = await getData(API_URL);
  const results = await data.results;

  results.forEach((r) => {
    // Nodos de la grilla de Bootstrap
    const divElement = document.createElement("div");
    divElement.className = "col";
    const rowElement = document.querySelector("div.row");

    const name = r.name;
    const specie = r.species;
    const gender = r.gender;
    const location = r.location.name;
    const image = r.image;

    divElement.innerHTML = `<div class="card" style="width: 18rem;">
      <img src="${image}" class="card-img-top" alt="...">
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
  const startButton = document.querySelector(".navbar-brand");
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");

  if (page === 1) {
    prev.disabled = true;
  } else {
    prev.disabled = false;
  }

  startButton.addEventListener("click", () => {
    page = 1;

    const nodeList = document.querySelectorAll("div.col");
    nodeList.forEach((e) => {
      e.remove();
    });

    main();
  });

  next.addEventListener("click", async () => {
    // Se elimina el contenido de las columnas de la grilla de Bootstrap, para refrescar al cambiar de página
    const nodeList = document.querySelectorAll("div.col");
    nodeList.forEach((e) => {
      e.remove();
    });

    const data = await getData(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    const API_URL = data.info.next;
    printData(API_URL);

    page += 1;

    if (page === 1) {
      prev.disabled = true;
    } else {
      prev.disabled = false;
    }
  });

  prev.addEventListener("click", async () => {
    // Se elimina el contenido de las columnas de la grilla de Bootstrap, para refrescar al cambiar de página
    const nodeList = document.querySelectorAll("div.col");
    nodeList.forEach((e) => {
      e.remove();
    });

    const data = await getData(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const API_URL = data.info.prev;
    printData(API_URL);

    page -= 1;

    if (page === 1) {
      prev.disabled = true;
    } else {
      prev.disabled = false;
    }
  });
};

const search = async (API_URL) => {
  const searchButton = document.querySelector(".btn-outline-success");
  const form = document.querySelector(".form-control");
  let data = await getData(API_URL);
  let characters = [];

  // Guardar todos los personajes en el Array characters
  for (let i = 0; i < 33; i++) {
    data.results.forEach((c) => {
      characters.push(c);
    });
    data = await getData(data.info.next);
  }

  searchButton.addEventListener("click", () => {
    const formValue = document.forms[0].elements[0].value;

    characters.forEach((c) => {
      if (c.name == formValue) {
        // Eliminamos todo el contenido
        const nodeList = document.querySelectorAll("div.col");
        const buttonsBottom = document.querySelector(".btn-group"); // Botones de Anterior y Siguiente

        nodeList.forEach((e) => {
          e.remove();
        });
        
        buttonsBottom.remove();

        // Se muestra el personaje que se intenta buscar
        const divElement = document.createElement("div");
        divElement.className = "col";
        const rowElement = document.querySelector("div.row");

        const name = c.name;
        const specie = c.species;
        const gender = c.gender;
        const location = c.location.name;
        const image = c.image;

        divElement.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Especie: ${specie}</p>
            <p class="card-text">Género: ${gender}</p>
            <p class="card-text">Ubicación: ${location}</p>
          </div>
        </div>`;

        rowElement.append(divElement);
      }
    });
  });
};

const main = () => {
  const API_URL = "https://rickandmortyapi.com/api/character";

  printData(API_URL);
  pagination();
  search(API_URL);
};

main();
