class Tenant < ApplicationRecord
    has_secure_password
    belongs_to :lease 
    has_many :reviews
end
