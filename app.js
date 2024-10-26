const url = 'https://rickandmortyapi.com/api/character';
const search = document.getElementById('searchCharacter');
const listCards = document.getElementById('cards');

// Función para crear los elementos del DOM para cada personaje
const makeCharacters = (myCharacter) => {
    const container = document.createElement('div');
    container.classList.add('card');

    const characterImg = document.createElement('img');
    characterImg.src = myCharacter.image;
    characterImg.alt = myCharacter.name;

    const characterName = document.createElement('h2');
    characterName.textContent = myCharacter.name;

    container.appendChild(characterImg);
    container.appendChild(characterName);

    listCards.appendChild(container);
};

// Función para obtener todos los personajes
const getCharacters = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderPage(data.results);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
};

// Función para buscar personajes por nombre
const searchCharacters = async (searchTerm) => {
    const searchUrl = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
   
        const response = await fetch(searchUrl);
        if (response.ok) {
            const data = await response.json();
            renderPage(data.results);
        } else {
            listCards.innerHTML = '<p>No characters found</p>';
        }
    
};

// Función para renderizar los personajes en la página
const renderPage = (characters) => {
    listCards.innerHTML = '';
    characters.forEach(character => makeCharacters(character));
};

// Evento para buscar personajes al escribir en el campo de búsqueda
search.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    if (searchTerm) {
        searchCharacters(searchTerm);
    } else {
        getCharacters();  // Si no hay término de búsqueda, muestra todos los personajes
    }
});

// Cargar todos los personajes al cargar la página
window.addEventListener('DOMContentLoaded', getCharacters);