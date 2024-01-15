class Lease < ApplicationRecord
    has_many :tenants 
    belongs_to :apartment
end
