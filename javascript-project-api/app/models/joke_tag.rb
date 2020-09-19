class JokeTag < ApplicationRecord
    belongs_to :joke
    belongs_to :tag 
end 