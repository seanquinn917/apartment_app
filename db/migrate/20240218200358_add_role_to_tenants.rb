class AddRoleToTenants < ActiveRecord::Migration[7.1]
  def change
    add_column :tenants, :role, :string
  end
end
