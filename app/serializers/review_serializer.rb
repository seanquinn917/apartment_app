class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :tenant_id, :apartment_id, :username




  def username 
    object.tenant.username
  end

end
