const form = () => document.querySelector('form'); //these r node getters
const jokeContent = () => document.querySelector('textarea#joke-content');
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
    loadJokes()
    form().addEventListener('submit', Joke.createFromForm);
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

function deleteJoke(d) {
    this.id; //id of joke
    this.parentNode; // div for removing from front end

    fetch(baseUrl + '/jokes/' + this.id, {
        method: "DELETE",
    })
    .then(resp => {
        return resp.json();
    })
    .then(data => {
        this.parentNode.remove();
    })
}

