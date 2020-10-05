const jokeContent = () => document.querySelector('textarea#joke-content'); //these r node getters in the global scope
const jokeList = () => document.getElementById('joke-list') //from index.html
const button = document.querySelector('.container button');
const searchBar = document.getElementById('search')
button.addEventListener('click', getJoke); //calling the function defination
const jokeText = document.querySelector('.container p'); // p tag where the text will display

function getJoke() {
    fetch('https://icanhazdadjoke.com/', { //a promise is returned when fetch is initiaized and resolves once the data is returned back - to chain .then on
        headers: {
            'Accept': 'application/json' //accepting as json
       }
    }).then(responce => responce.json()) //gets the object, runs bc fetch was successful, pulls json data out of the servers responce
    .then(obj => jokeText.innerText = obj.joke); //adding to the html into the jokeText node on the dom
    addJokeButton();
}

function addJokeButton() {
    const div = document.querySelector('.container') // in the local scope
    const addJokeButton = document.createElement('button'); //create button
    addJokeButton.classList.add('butt'); //add class to that button
    addJokeButton.innerText = "Add Joke";
    div.appendChild(addJokeButton) 
    const but = document.querySelector('body > section > div > button.butt');
    but.addEventListener("click", addJokeToForm)
}

function addJokeToForm() {
    const joke = jokeText.innerText
    jokeContent().innerText = joke
}

const baseUrl = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", callOnLoad); //on page load 

function callOnLoad() {
    const form = () => document.querySelector('form'); //arrow function 
    loadJokes();
    form().addEventListener('submit', Joke.createFromForm);
    Joke.search_joke();
    dropdownMenu();
}

function loadJokes() {
    fetch(baseUrl + '/jokes') //connects to our rails api and gives us index of all data in an object / makes a GET request by default
    .then(resp => { //responce from the server when ^ comes back
        if (resp.status !== 200) { //comes back w a responce - 200 is a-ok - this is also a promise that will b resolved with the next .then
            throw new Error(resp.statusText);
        }
        return resp.json() //returns the responce as json as a promise object
    })
    .then(data => { //the object we got back 
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
        data.forEach(tag => { tagList.innerHTML += ` 
            <label>
            <input type="checkbox" name="${tag.name}" id="${tag.id}" value="${tag.id}"> </input>---------------
                <span style="color: orange" id="${tag.id}">${tag.name} </span> </label>`
        }); // use += for -adding to- instead of -changing- it completly 
    });
}
