class TenantSerializer < ActiveModel::Serializer

  
  attributes :id, :name, :age, :username, :lease_id, :lease_content, :rent, :apartment_id, :avatar
  belongs_to :lease


  def lease_content
    object.lease ? object.lease.content : nil
  end

  def rent
   object.lease&.rent
  end

  def apartment_id
    object.lease&.apartment_id
  end

  
end
