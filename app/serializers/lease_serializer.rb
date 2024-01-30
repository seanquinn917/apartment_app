class LeaseSerializer < ActiveModel::Serializer
  attributes :id, :content, :rent, :apartment_id, :apartment_number
  has_many :tenants
  belongs_to :apartment


  def apartment_id
    object.apartment_id
  end

  def apartment_number
    object.apartment.number
  end
  
end
