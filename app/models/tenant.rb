class Tenant < ApplicationRecord
    validates :username, presence: true 
    validates :username, uniqueness: true
    validates :password, length: {minimum: 5}

    has_secure_password

    belongs_to :lease 
    has_many :reviews
    has_one_attached :avatar
end
