class ApartmentSerializer < ActiveModel::Serializer
  attributes :id, :number, :reviews, :tenants, :leases, :lease_id
  has_many :leases 
  has_many :tenants, through: :leases 
  has_many :reviews

  def lease_id
    object.leases.pluck(:id)
  end

  
end
