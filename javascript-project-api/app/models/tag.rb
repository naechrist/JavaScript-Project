class Tag < ApplicationRecord
    has_many :joke_tags
    has_many :jokes, through: :joke_tags
end
