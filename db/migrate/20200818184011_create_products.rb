class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name, null:false
      t.text :text, null:false
      t.integer :condition, null:false
      t.integer :price, null:false
      t.integer :trading_status, null:false
      t.datetime :completed_at
      t.references :category, null: false, foreign_key: true
      t.references :shipping, null: false, foreign_key: true
      t.references :brand, foreign_key:true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
