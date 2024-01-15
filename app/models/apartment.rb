class Apartment < ApplicationRecord
    has_many :leases 
    has_many :tenants, through: :leases 
    has_many :reviews, through: :tenants 
end
