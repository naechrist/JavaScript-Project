class Joke {
    static all = [];
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
        
        deleteButton.addEventListener('click', deleteJoke) //delete /blogs/1
        
        const editButton = document.createElement('button');
        editButton.classList.add('btn');
        editButton.innerText = 'edit';
        editButton.id = "edit-" + this.id;
        
        editButton.addEventListener('click', editJoke);
        
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

    static displayJokes() {
        jokeList().innerHTML = '';
        Joke.all.forEach(joke => joke.display())
    }

}