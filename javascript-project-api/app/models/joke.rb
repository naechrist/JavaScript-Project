class Joke < ApplicationRecord
    has_many :joke_tags, :dependent => :destroy
    has_many :tags, through: :joke_tags
end
