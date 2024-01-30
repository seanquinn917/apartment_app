class TenantSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :username, :lease_id, :lease_content, :rent, :apartment_id
  belongs_to :lease


  def lease_content
    object.lease.content
  end

  def rent
   object.lease.rent
  end

  def apartment_id
    object.lease.apartment_id
  end


end
