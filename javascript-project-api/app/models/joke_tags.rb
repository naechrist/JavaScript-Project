class Joke_Tags < ActiveRecord
    belongs_to :jokes 
    belongs_to :tags 
end 