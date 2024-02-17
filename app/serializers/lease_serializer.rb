class LeaseSerializer < ActiveModel::Serializer
  attributes :id, :content, :rent, :apartment_id
  has_many :tenants
  belongs_to :apartment


  def apartment_id
    object.apartment_id
  end
  
  
end
