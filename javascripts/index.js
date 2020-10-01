const jokeContent = () => document.querySelector('textarea#joke-content'); //these r node getters in the global scope
// const tagContent = () => document.getElementById('tag-list');
const jokeList = () => document.getElementById('joke-list');
//const submitButton = () => document.getElementById('submit-joke');
const button = document.querySelector('.container button');


button.addEventListener('click', getJoke); //calling the function def

function getJoke() {
    const jokeText = document.querySelector('.container p'); // in the local scope
    fetch('https://icanhazdadjoke.com/', { //returns a promise to chain .then on
        headers: {
            'Accept': 'application/json'
       }
    }).then(responce => responce.json()) //gets the object, runs bc fetch was successful
    .then(obj => jokeText.innerText = obj.joke); //adding to the html on the dom
}

const baseUrl = 'http://localhost:3000'
// let editing = false;
// let editedJokeId = null;

document.addEventListener("DOMContentLoaded", callOnLoad); //on page load 

function callOnLoad() {
    const form = () => document.querySelector('form'); //arrow function 
    loadJokes();
    form().addEventListener('submit', Joke.createFromForm);
    dropdownMenu();
   
}

function loadJokes() {
    fetch(baseUrl + '/jokes') //connects to our rails api and gives us index of all data in an object / makes a GET request by default
    .then(resp => { //responce from the server when ^ comes back / whats going to happen after the fetch request is done
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        return resp.json() //returns the responce as json
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
    let tagList = document.getElementById('tag-list');
    
    fetch(baseUrl + '/tags' )
    .then(resp => {
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        return resp.json()
    })
    .then(data => { 
            data.forEach(tag => {  tagList.innerHTML += ` 
             <label> 
                <input type="checkbox" name="${tag.name}" id="${tag.id}" value="${tag.id}"> </input>---------------
                 <span id="${tag.id}">${tag.name}</span> </label>`
            }); // use += for -adding to- instead of -changing- it completly 
        });
    }
           
