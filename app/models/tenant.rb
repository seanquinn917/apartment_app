class Tenant < ApplicationRecord
    validates :username, presence: true 
    validates :username, uniqueness: true
    has_secure_password
    belongs_to :lease 
    has_many :reviews
    has_one_attached :image
end
