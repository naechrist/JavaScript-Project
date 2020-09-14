document.addEventListener('DOMContentLoaded', callOnLoad);

const content = () => document.getElementById("content");
const form = () => document.querySelector('form');
const jokeContent = () => document.querySelector('textarea#joke-content');
const jokeList = () => document.getElementById('joke-list');

const jokes = [];

function callOnLoad() {

}

// function handleEvents() {
//     loadJokes();
// }

// function loadJokes() {
//     fetch('http://localhost:3000/jokes') //connects to our rails api
//     .then(function (resp) { //responce from the server
//         return resp.json();
//     })
//     .then(function (joke) { //give us our data
//         loadJokes.forEach(function (joke) {
//             displayJoke(joke);
//         })
//     }) 
// }

// function displayJoke(joke) {
//     const main = document.querySelector('div#main')
//     const div = document.createElement('div')
//     div.innerHTML = `<p>${joke.content}</p>` //add to the div we created 
//     main.appendChild(div); // add to main
// }

function createJoke() {
    const joke = {
        content: jokeContent().value 
    }

    jokes.push(joke);

    displayJoke(joke);

    resetInput();
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