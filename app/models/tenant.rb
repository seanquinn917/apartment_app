class Tenant < ApplicationRecord
    has_secure_password
    belongs_to :lease 
    has_many :reviews
    belongs_to :apartment
    has_one_attached :avatar
end
