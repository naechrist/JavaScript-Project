class Joke < ApplicationRecord
    has_many :joke_tags
    has_many :tags, through: :joke_tags
end
