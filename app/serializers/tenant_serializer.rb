class TenantSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers  # Include this line
  
  attributes :id, :name, :age, :username, :lease_id, :lease_content, :rent, :apartment_id, :image
  belongs_to :lease

  def image 
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end


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
