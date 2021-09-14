// model class represents the data
class Joke {
    static all = [];

    constructor(id, content, tags) { //the class attributes 
        this.id = id;
        this.content = content; 
        this.tags = tags;
    }

    display() {    // instance method
        const div = document.createElement('div');
        const li = document.createElement('li');
        const h6 = document.createElement('h6');
        
        const deleteButton = document.createElement('button'); //create button
        const checkButton = document.createElement('button');
        checkButton.classList.add('btn')
        checkButton.innerText = '✓';
        checkButton.id = this.id;

        deleteButton.classList.add('btn'); //b/c of materialize 
        deleteButton.innerText = 'delete';
        deleteButton.id = this.id; //delete/joke/ID (ex.1, 2, 3, ... )
        deleteButton.style.backgroundColor = '#FF6961';
        deleteButton.addEventListener('click', Joke.deleteJoke) //the action once clicked
        checkButton.addEventListener('click', Joke.changeToGreen);

        h6.innerText = this.tags.map(t => t.name); //gets names out of each object in array [{...}, {...}, {...}]
        li.innerText = this.content;

        div.appendChild(h6);
        div.appendChild(li);
        div.appendChild(deleteButton);
        div.appendChild(checkButton);
        jokeList().appendChild(div); //div is a parentNode
    }

    static changeToGreen() {
        const h6 = this.parentElement.querySelector('h6')
        const li = this.parentElement.querySelector('li')
        if (li.style.color === "black" && h6.style.color === "black") {
            li.style.color = "#00FF00"
            h6.style.color = "#00FF00"
        } else {
            li.style.color = "black"
            h6.style.color = "black"
        }
    }
    
    static createJokes(jokesData) {     //class method
        jokesData.forEach(data => Joke.create(data.id, data.content, data.tags)); 
    }

    static create(id, content, tags) {
        let joke = new Joke(id, content, tags); //new JS object
        Joke.all.push(joke);
        return joke;
    }
    
    static createFromForm() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const tag_ids = [];
        const tag_names = []
        checkboxes.forEach(box => {
            if (box.checked) {
                tag_ids.push(box.id);
                tag_names.push(box.name);
            }});
        const strongParams = {
            joke: {
                content: jokeContent().value,
                tag_ids: tag_ids
            }
        }
        fetch(baseUrl + '/jokes.json', {
            method: "POST", //send to the back-end 
            headers: { //how we want to receive the response
                "Accept": "application/json", //accept back json
                "Content-Type": "application/json" //sending json
            }, 
            body: JSON.stringify(strongParams) //how we r going to send of the json obj -> into string - do this every time u POST
        }) //JSON allows us to communicate to and from the rails back-end 
        .then(resp => resp.json()) //send back response as an object and getting json out of it
        .then(data => { 
            let joke = Joke.create(data.id, data.content, data.tags);
            joke.display();
        })
        resetInput();
    }  

    static deleteJoke(d) {
        this.id //id of joke
        this.parentNode //div for removing from front-end - parentNode is the entire div that contains everything to that specific joke

        fetch(baseUrl + '/jokes/' + this.id, { 
            method: "DELETE" //change from GET(default) to DELETE
        })
        .then(resp => resp.json()) //getting json out of our response we got back
        .then(data => { //get our data from ^ response
            Joke.all = Joke.all.filter(joke => joke.id !== data.id); //filter does not effect the og array, instead it returns a new array, return false so doesn't create new array
            Joke.displayJokes();
        })
    }

    static displayJokes() {
        jokeList().innerHTML = '';
        Joke.all.sort(function(a, b){return a.content.length-b.content.length});
        Joke.all.forEach(joke => joke.display())
    }

    static search_joke() { 
        searchBar.addEventListener("click", e => { //click on search butt
            const searchString = e.target.previousElementSibling.value.toLowerCase(); //what was typed in search box
            let filterJokes = Joke.all.filter(joke => {
                joke.tags.forEach(function (a) {
                    ['name'].forEach(function (k) {
                        if (typeof a[k] === 'string') {
                            a[k] = a[k].toLowerCase();
                        }
                    });
                });
                for(let i = 0; i < joke.tags.length; i++) { // joke.tags is an array of objects go through each one with the loop 
                    if (joke.tags[i].name.includes(searchString)) { //if it includes what was typed in... 
                        return(joke.tags[i].name) // ... return that joke into filteredJoke variable
                    }
                };
                    return(joke.valueOf().content.toLocaleLowerCase().includes(searchString)); // does the content contain what was typed in? true or false on each joke     
            }); 
            const node = document.getElementById('joke-list');
            node.textContent = ''; //clear the list 
            for (let i = 0; i < filterJokes.length; i++) {
                filterJokes[i].display(); //display only the filteredJokes 
            }
        })
    }

}