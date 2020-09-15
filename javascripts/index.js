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
    fetch(baseUrl + '/jokes') //connects to our rails api and gives us index of all data
    .then(resp => { //responce from the server when ^ comes back
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        return resp.json()
    })
    .then(data => displayJokes(data))
    
}

function createJoke(j) {
    j.preventDefault();

    const strongParams = {
        joke: {
            content: jokeContent().value
        }
    }
    fetch(baseUrl + '/jokes', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(joke => {
        displayJoke(joke);
    })
    resetInput();
}

function displayJokes(jokes) {
    jokes.forEach(joke => displayJoke(joke));
}

function displayJoke(joke) {
    const div = document.createElement('div');
    const li = document.createElement('li');

    li.innerText = joke.content;

    div.appendChild(li);

    jokeList().appendChild(div);
}

function resetInput() {
    jokeContent().value = "";
}