class Tenant < ApplicationRecord
    belongs_to :lease 
    has_many :reviews
end
