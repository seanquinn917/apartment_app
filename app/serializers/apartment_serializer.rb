class ApartmentSerializer < ActiveModel::Serializer
  attributes :id, :number, :reviews
  has_many :leases 
  has_many :tenants, through: :leases 
  has_many :reviews

 

  

end
