const form = () => document.querySelector('form');
const jokeContent = () => document.querySelector('textarea#joke-content');
const jokeList = () => document.getElementById('joke-list');

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

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn'); 
    deleteButton.innerText = 'delete';
    deleteButton.id = joke.id;

    deleteButton.addEventListener('click', deleteJoke) //delete /blogs/1

    const editButton = document.createElement('button');
    editButton.classList.add('btn');
    editButton.innerText = 'edit';
    editButton.id = joke.id;

    editButton.addEventListener('click', editJoke);

    li.innerText = joke.content;

    div.appendChild(li);
    div.appendChild(editButton); //actually adds button to page
    div.appendChild(deleteButton);

    jokeList().appendChild(div);
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

function editJoke() {

}