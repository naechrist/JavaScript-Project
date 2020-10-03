const jokeContent = () => document.querySelector('textarea#joke-content'); //these r node getters in the global scope
const jokeList = () => document.getElementById('joke-list') //from index.html
const button = document.querySelector('.container button');
const searchedJokes = []

// const searchedJokesArray = []
const searchedJokesResult = []
let parsedArray = []
let obj = {}
const searchBar = document.getElementById('search')
button.addEventListener('click', getJoke); //calling the function defination


function getJoke() {
    const jokeText = document.querySelector('.container p'); // in the local scope
    fetch('https://icanhazdadjoke.com/', { //a promise is returned when fetch is initiaized and resolves once the data is returned back - to chain .then on
        headers: {
            'Accept': 'application/json' //accepting as json
       }
    }).then(responce => responce.json()) //gets the object, runs bc fetch was successful, pulls json data out of the servers responce
    .then(obj => jokeText.innerText = obj.joke); //adding to the html into the jokeText node on the dom
}

const baseUrl = 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", callOnLoad); //on page load 
document.addEventListener("click", changeToGreen);

function callOnLoad() {
    const form = () => document.querySelector('form'); //arrow function 
    loadJokes();
    form().addEventListener('submit', Joke.createFromForm);
    search_joke();
    dropdownMenu();
}

function loadJokes() {
    fetch(baseUrl + '/jokes') //connects to our rails api and gives us index of all data in an object / makes a GET request by default
    .then(resp => { //responce from the server when ^ comes back / whats going to happen after the fetch request is done
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

function changeToGreen() {
    this.parentElement.querySelector('h6').style.color = 'green'
    this.parentElement.querySelector('li').style.color = 'green'
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
                <span id="${tag.id}">${tag.name} </span> </label>`
        }); // use += for -adding to- instead of -changing- it completly 
    });
}

function search_joke() { 
    searchBar.addEventListener("click", e => {
        const searchString = e.target.previousElementSibling.value;
        console.log(searchString);
        let filterJokes = Joke.all.filter(joke => {
            debugger;
            let found = false;
            for(let i = 0; i < joke.tags.length; i++) {
                if (joke.tags[i].name.includes(searchString)) {
                    found = true;
                    
                    return(joke.tags[i].name)
                }
            }
            return (joke.content.includes(searchString))
            
            // gets all jokes that include search word in the content
        }); 
        debugger;
        filterJokes.forEach(joke => {
            let searchedJokesArray = [] 
            console.log(joke.content, joke.tags) 
            searchedJokesArray.push(joke.content, joke.tags)
            searchedJokes.push(searchedJokesArray);
            
        }) 
        for (const element of searchedJokes) {
            let newArray = []
            newArray.push(element[0])
            element[1].forEach(a=> newArray.push(a.name))
            parsedArray.push(newArray)
        }
        const div = document.createElement('div');
        const h6 = document.createElement('h6');
        h6.innerText = parsedArray.join('\n\n\n')
        div.appendChild(h6)
        const node = document.getElementById('joke-list');
        node.textContent = '';
        node.appendChild(div);
    })
}


