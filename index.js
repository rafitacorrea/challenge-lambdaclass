let results = [];
let names = [];
let characters = [];
let films = [];
let filmsTitles = [];
const loadData = () => {
    axios.get('https://swapi.co/api/people/').then(response => {
        const people = response.data;
        results = people.results;
        results.forEach(r => {
            names.push(r.name);
        });
        createList();
        document.querySelector('.search-group-button').onclick = namesSelected;
    });
};

const createList = () => {
    names.sort();
    let i = 0;
    names.forEach(n => {
        i++
        document.querySelector('.search-group-dropdown-content').innerHTML += names
            .map(n => `<li class="character"><input id="input${i}" type="checkbox" name="checkbox-character"><label for="input${i}">${n}</label></li>`)
            .join('');
    });
};

const namesSelected = () => {
    let checkboxes = document.getElementsByName('checkbox-character');
    checkboxes.forEach(c => {
        if (c.checked) {
            characters.push(document.querySelector('.character').innerText);
        }
    });

    // characters.push(document.querySelector('.character').innerText);
    console.log(characters);
    createMovieList();
    //searchMovie();
};

const searchMovie = () => {
    results.forEach(r => {
        if (characters == r.name) {
            films.push(r.films);
        }
    });
    films.forEach(f => {
        axios.get(f).then(response => {
            const titles = response.data;
            filmsTitles = titles.title;
        });
    });
    console.log(filmsTitles);
};

const createMovieList = () => {
    document.querySelector('.movie-list').innerHTML = `<h3 class="movie-list-title">Películas</h3>
    <ul class="movie-list-ul">
    </ul>`;
};

loadData();

console.log(names);
