class CreateJokeTags < ActiveRecord::Migration[6.0]
  def change
    create_table :joke_tags do |t|
      t.references :joke, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
    end
  end
end
