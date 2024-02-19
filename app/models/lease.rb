class Lease < ApplicationRecord
    validates :content, length: {minimum: 3}
    has_many :tenants 
    belongs_to :apartment
end
