class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.string :content
      t.integer :tenant_id
      t.integer :apartment_id
      t.timestamps
    end
  end
end
