class CreateLeases < ActiveRecord::Migration[7.1]
  def change
    create_table :leases do |t|
      t.string :content
      t.integer :rent
      t.integer :apartment_id
      t.timestamps
    end
  end
end
