const form = () => document.querySelector('form'); //these r node getters
const jokeContent = () => document.querySelector('textarea#joke-content');
const tagContent = () => document.getElementById('tag-list');
const jokeList = () => document.getElementById('joke-list');
const submitButton = () => document.getElementById('submit-joke');

const button = document.querySelector('.container button');
const jokeText = document.querySelector('.container p');

button.addEventListener('click', getJoke);
function getJoke() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    }).then(data => data.json()) //gets the object 
    .then(obj => jokeText.innerText = obj.joke);
}

const baseUrl = 'http://localhost:3000'
let editing = false;
let editedJokeId = null;

document.addEventListener("DOMContentLoaded", callOnLoad);

function callOnLoad() {
    loadJokes();
    // dropdownMenu();
    form().addEventListener('submit', Joke.createFromForm);
    dropdownMenu();
}

function loadJokes() {
    fetch(baseUrl + '/jokes') //connects to our rails api and gives us index of all data
    .then(resp => { //responce from the server when ^ comes back
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        return resp.json()
    })
    .then(data => {
        Joke.createJokes(data)
        Joke.displayJokes();
    })
}

function resetInput() {
    jokeContent().value = "";
}

function dropdownMenu() {
    const tagList = document.getElementById('tag-list');

    fetch(baseUrl + '/tags' )
    .then(resp => {
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        return resp.json()
    })
    .then(data => {
        
         
            data.forEach(tag => { tagList.innerHTML += ` 
            <label>
                <input type="checkbox" id="tag.id"> </input>
                <span>${tag.name}</span>
            </label>
            `
            });
        });
    }

