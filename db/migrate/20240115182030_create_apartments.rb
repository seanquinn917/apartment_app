class CreateApartments < ActiveRecord::Migration[7.1]
  def change
    create_table :apartments do |t|

      t.timestamps
    end
  end
end
