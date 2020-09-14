const form = () => document.querySelector('form');
const jokeContent = () => document.querySelector('textarea#joke-content');
const jokeList = () => document.getElementById('joke-list');

const baseUrl = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", callOnLoad);

function callOnLoad() {
    loadJokes();
    form().addEventListener('submit', createJoke);
}

function loadJokes() {
    fetch(baseUrl + '/blogs') //connects to our rails api and gives us index of all data
    .then(resp => { //responce from the server when ^ comes back
        console.log('responce json', resp);
        return resp.json();
    })
    .then((data => {
        displayJokes(joke);
    })
}

function createJoke(j) {
    j.preventDefault();

    const joke = {
        content: jokeContent().value 
    }
  

    displayJoke(joke);

    resetInput();
}

function displayJokes(joke) {
    jokeList.forEach(joke => displayJoke(joke));
}

function displayJoke(joke) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    p.innerText = joke.content;

    div.appendChild(p);

    jokeList().appendChild(div);
}

function resetInput() {
    jokeContent().value = "";
}