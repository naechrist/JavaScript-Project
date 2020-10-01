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
        deleteButton.classList.add('btn'); //b/c of materialize 
        deleteButton.innerText = 'delete';
        deleteButton.id = this.id; //delete/joke/ID (ex.1, 2, 3, ... )
        
        deleteButton.addEventListener('click', Joke.deleteJoke) //the action once clicked

        h6.innerText = this.tags.map(t => t.name); //gets names out of each object in array [{...}, {...}, {...}]
        li.innerText = this.content;

        div.appendChild(h6);
        div.appendChild(li);
        div.appendChild(deleteButton);
        jokeList().appendChild(div); //div is a parentNode
    }

    static createJokes(jokesData) {     //class method
        jokesData.forEach(data => Joke.create(data.id, data.content, data.tags)); 
    }

    static create(id, content, tags) {
        let joke = new Joke(id, content, tags); //new JS object
        Joke.all.push(joke);
        return joke;
    }
    
    static createFromForm(j) {
        //  j.preventDefault(); //to prevent the page from reloading completly
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
            method: "POST",
            headers: { //how we want to receive the responce
                "Accept": "application/json", //accept back json
                "Content-Type": "application/json" //sending json
            },
            body: JSON.stringify(strongParams) //how we r going to send of the json -> into string
        })
        .then(resp => resp.json()) //send back responce as an object and getting json out of it
        .then(data => { 
            let joke = Joke.create(data.id, data.content, data.tags);
            joke.display();
        })
        resetInput();
    }  

    static deleteJoke(d) {
        this.id //id of joke
        this.parentNode //div for removing from front end - parentNode is the entire div tha contains everything to that specific joke

        fetch(baseUrl + '/jokes/' + this.id, { 
            method: "DELETE" //change from GET(default) to DELETE
        })
        .then(resp => resp.json()) //getting json out of our responce we got back
        .then(data => { //get our data from ^ responce
            Joke.all = Joke.all.filter(joke => joke.id !== data.id); //filter does not effect the og array, instead it returns a new array, return false so doesnt create new array
            Joke.displayJokes();
        })
    }

    static displayJokes() {
        jokeList().innerHTML = '';
        Joke.all.sort(function(a, b){return a.content.length-b.content.length});
        Joke.all.forEach(joke => joke.display())
    }
}