class Joke {
    static all = [];
    constructor(id, content) {
        this.id = id;
        this.content = content; 
    }

    static createJokes(jokesData) {
        jokesData.forEach(jokeData => Joke.createJokes(data.id, data.content));
    }

    static create(id, content) {
        let joke = new Joke(id, content);

        Joke.call.push(joke);
    }

}