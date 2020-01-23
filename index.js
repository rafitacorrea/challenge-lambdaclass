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
    document.querySelector('.search-group-dropdown-content').innerHTML += names
        .map((n, i) => `<li class="character"><input id="input${i}" type="checkbox" name="checkbox-character"><label for="input${i}">${n}</label></li>`)
        .join('');
};

const namesSelected = () => {
    document.querySelector('.movie-list-li').innerHTML = ``;
    characters = [];
    let checkboxes = document.getElementsByName('checkbox-character');
    checkboxes.forEach(c => {
        if (c.checked) {
            characters.push(c.parentNode.innerText);
        }
    });
    console.log(characters);
    createMovieList();
    searchMovie();
};

const searchMovie = () => {
    results.forEach(r => {
        if (characters.indexOf(r.name) >= 0) {
            films.push(r.films);
        }
    });
    let filmsReduce = films.flat().reduce((acum, f) => {
        if (acum[f]) {
            acum[f]++;
        } else {
            acum[f] = 1;
        }
        return acum;
    }, {});
    console.log(filmsReduce);
    films.flat().forEach(f => {
        if (filmsReduce[f] > 1) {
            axios.get(f).then(response => {
                document.querySelector('.movie-list-ul').innerHTML = `<ul class="movie-list-ul"></ul>`;
                const titles = response.data;
                filmsTitles = titles.title;
                console.log(filmsTitles);
                document.querySelector('.movie-list-li').innerHTML += `<li class="movie-list-li">${titles.title}</li>`;
            });
        }
    });
};

const createMovieList = () => {
    document.querySelector('.movie-list-title').innerHTML = `<h3 class="movie-list-title">Movies</h3>
    <ul class="movie-list-ul">
    </ul>`;
};

loadData();

console.log(names);
