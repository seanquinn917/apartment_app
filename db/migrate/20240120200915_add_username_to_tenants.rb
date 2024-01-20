class AddUsernameToTenants < ActiveRecord::Migration[7.1]
  def change
    add_column :tenants, :username, :string 
  end
end
