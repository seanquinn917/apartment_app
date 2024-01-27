class LeaseSerializer < ActiveModel::Serializer
  attributes :id
  has_many :tenants
  belongs_to :apartment
end
