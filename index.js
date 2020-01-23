let results = [];
let names = [];
let characters = [];
let films = [];
let filmsTitles = [];
let filmsReduceFiltered = [];
let filmsTitlesOk = [];
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
        .map(
            (n, i) =>
                `<li class="character" onclick="changeColor(${i})"><input class="input" id="input${i}" type="checkbox" name="checkbox-character"><label  for="input${i}">${n}</label></li>`
        )
        .join('');
};

const changeColor = id => {
    if (document.querySelector(`#input${id}`).checked) {
        document.querySelector(`#input${id}`).parentNode.classList.add('character-selected');
    } else {
        document.querySelector(`#input${id}`).parentNode.classList.remove('character-selected');
    }
};

const namesSelected = () => {
    document.querySelector('.movie-list-li').innerHTML = ``;
    characters = [];
    films = [];
    console.log(characters);
    console.log(films);
    let checkboxes = document.getElementsByName('checkbox-character');
    checkboxes.forEach(c => {
        if (c.checked) {
            characters.push(c.parentNode.innerText);
        }
    });
    document.querySelector('.search-group-dropdown-content').innerHTML = '';
    createList();
    searchMovie();
    createMovieList();
};

const searchMovie = () => {
    results.forEach(r => {
        if (characters.indexOf(r.name) >= 0) {
            films.push(r.films);
        }
    });
    films = films.flat();
    if (characters.length > 1) {
        let filmsReduce = films.reduce((acum, f) => {
            if (acum[f]) {
                acum[f]++;
            } else {
                acum[f] = 1;
            }
            return acum;
        }, {});
        films.forEach(f => {
            if (filmsReduce[f] > 1) {
                filmsReduceFiltered.push(f);
                const uniqueSet = new Set(filmsReduceFiltered);
                filmsTitlesOk = [...uniqueSet];
            }
        });
    } else {
        filmsTitlesOk = films;
    }
};

const createMovieList = () => {
    document.querySelector('.movie-list-title').innerHTML = `<h3 class="movie-list-title">Movies</h3>
    <ul class="movie-list-ul">
    </ul>`;
    filmsTitlesOk.forEach(ft => {
        axios.get(ft).then(response => {
            document.querySelector('.movie-list-ul').innerHTML = `<ul class="movie-list-ul"></ul>`;
            const titles = response.data;
            filmsTitles = titles.title;
            document.querySelector('.movie-list-li').innerHTML += `<li class="movie-list-li">${titles.title}</li>`;
        });
    });
};

loadData();
