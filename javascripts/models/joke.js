// model class represents the data
class Joke {
    static all = [];
    static editedJokeId = null;

    constructor(id, content, tags) {
        this.id = id;
        this.content = content; 
        this.tags = tags
    }

    display() {    // instance method
        const div = document.createElement('div');
        const li = document.createElement('li');
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn'); 
        deleteButton.innerText = 'delete';
        deleteButton.id = this.id;
        
        deleteButton.addEventListener('click', Joke.deleteJoke) //delete 
        
        li.innerText = this.content;
 
        div.appendChild(li);
        // div.appendChild(editButton); //actually adds button to page
        div.appendChild(deleteButton);
        
        jokeList().appendChild(div);
        
        Joke.all.sort(function(arg1, arg2) { return arg1.content.length - arg2.content.length });
    }

    static createJokes(jokesData) {     //class method
        jokesData.forEach(data => Joke.create(data.id, data.content));
    }

    static create(id, content) {
        let joke = new Joke(id, content);

        Joke.all.push(joke);
        return joke;
    }
    
    static createFromForm(j) {
         j.preventDefault();
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const tag_ids = [];
        const tag_names = []
        checkboxes.forEach(box => {
            
        if (box.checked) {
            tag_ids.push(box.id);
            tag_names.push(box.name);
        }});
    
        // if(editing) {
        //     Joke.updateJoke();
        // } else {
            const strongParams = {
                joke: {
                    content: jokeContent().value,
                    tag_ids: tag_ids
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
                let joke = Joke.create(data.id, data.content, data.tags);
                
                jokeList().append(tag_names);
                joke.display();
                
            })
            resetInput();
        // }
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

    // static editJoke(e) {
    //     editing = true;
    //     jokeContent().value = this.parentNode.querySelector('li').innerText; //displays joke back in th content section(form) to edit
    //     submitButton().value = "Edit Joke";
    
    //     Joke.editedJokeId = this.id; // temperarly storing in so it can b used in updateJoke()
    // }

    // static updateJoke(j){
    //     let content = jokeContent().value;
    
    //     const strongParams = {
    //         joke: {
    //             content: content
    //         }
    //     }
    //     fetch(baseUrl + '/jokes/' + Joke.editedJokeId, {
    //         method: "PATCH",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(strongParams)
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //         let editedJoke = Joke.all.find(joke => joke.id == data.id);
    //         editedJoke.content = data.content;
    //         Joke.displayJokes();

    //         resetInput();
    //         editing = false;
    //         Joke.editedJokeId = null;
    //         submitButton().value = "Create Joke";
    //     })
    // }

}