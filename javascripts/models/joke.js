class Joke {
    constructor(id, content) {
        this.id = id;
        this.content = content; 
    }

    static createJokes(jokesData) {
        jokesData.forEach(jokeData => Joke.createJokes(data.id, data.content));
    }
}