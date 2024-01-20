class AddPasswordToTenants < ActiveRecord::Migration[7.1]
  def change
    add_column :tenants, :password_digest, :string
  end
end
