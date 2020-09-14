const form = () => document.querySelector('form');
const jokeContent = () => document.querySelector('textarea#joke-content');
const jokeList = () => document.getElementById('joke-list');

const jokes = [];
const baseUrl = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", callOnLoad);

function callOnLoad() {
    loadJokes()
    form().addEventListener('submit', createJoke);
}

function loadJokes() {
    console.log('a');

    fetch(baseUrl + '/jokes') //connects to our rails api and gives us index of all data
    .then(resp => { //responce from the server when ^ comes back
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        console.log('b')
        return resp.json()
    })
    .then(data => displayJokes(data))

    console.log('e')
    
}

function createJoke(j) {
    j.preventDefault();

    const joke = {
        content: jokeContent().value
    }
    jokes.push(joke);
    
    displayJoke(joke);
    resetInput();
}

function displayJokes(joke) {
    jokes.forEach(joke => displayJoke(joke));
}

function displayJoke(joke) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    p.innerText = joke.content;

    div.appendChild(p);

    jokeList().appendChild(p);
}

function resetInput() {
    jokeContent().value = "";
}