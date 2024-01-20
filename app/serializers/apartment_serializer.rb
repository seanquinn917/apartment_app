class ApartmentSerializer < ActiveModel::Serializer
  attributes :id
  has_many :leases 
  has_many :tenants, through: :leases 

  

end
