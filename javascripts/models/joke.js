class Joke {
    static all = [];
    static editedJokeId = null;

    constructor(id, content) {
        this.id = id;
        this.content = content; 
    }

    display() {
        const div = document.createElement('div');
        const li = document.createElement('li');
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn'); 
        deleteButton.innerText = 'delete';
        deleteButton.id = this.id;
        
        deleteButton.addEventListener('click', Joke.deleteJoke) //delete /blogs/1
        
        const editButton = document.createElement('button');
        editButton.classList.add('btn');
        editButton.innerText = 'edit';
        editButton.id = "edit-" + this.id;
        
        editButton.addEventListener('click', Joke.editJoke);
        
        li.innerText = this.content;
        
        div.appendChild(li);
        div.appendChild(editButton); //actually adds button to page
        div.appendChild(deleteButton);
        
        jokeList().appendChild(div);
    
    }

    static createJokes(jokesData) {
        jokesData.forEach(data => Joke.create(data.id, data.content));
    }

    static create(id, content) {
        let joke = new Joke(id, content);

        Joke.all.push(joke);
        return joke;
    }

    static createFromForm(j) {
        j.preventDefault();

        if(editing) {
            Joke.updateJoke();
        } else {
            const strongParams = {
                joke: {
                    content: jokeContent().value
                }
            }
            fetch(baseUrl + '/jokes.json', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(strongParams)
            })
            .then(resp => resp.json())
            .then(data => {
                let joke = Joke.create(data.id, data.content);
                joke.display();
            })
            resetInput();
        }
    }  
    

    static editJoke(e) {
        editing = true;
        jokeContent().value = this.parentNode.querySelector('li').innerText; //displays joke back in th content section(form) to edit
        submitButton().value = "Edit Joke";
    
        Joke.editedJokeId = this.id; // temperarly storing in so it can b used in updateJoke()
    }

    static updateJoke(j){
        let content = jokeContent().value;
    
        const strongParams = {
            joke: {
                content: content
            }
        }
        fetch(baseUrl + '/jokes/' + Joke.editedJokeId, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            let editedJoke = Joke.all.find(joke => joke.id == data.id);
            editedJoke.content = data.content;
            Joke.displayJokes();

            resetInput();
            editing = false;
            Joke.editedJokeId = null;
            submitButton().value = "Create Joke";
        })
    }

    static deleteJoke(d) {
        this.id //id of blog
        this.parentNode //div for removing from front end

        fetch(baseUrl + '/jokes/' + this.id, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            Joke.all = Joke.all.filter(joke => joke.id !== data.id);
            Joke.displayJokes();
        })
    }

    static displayJokes() {
        jokeList().innerHTML = '';
        Joke.all.forEach(joke => joke.display())
    }

}