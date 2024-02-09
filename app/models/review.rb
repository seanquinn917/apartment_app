class Review < ApplicationRecord
    validates :content, length: {minimum: 3}
    validates :content, presence:true
    
    belongs_to :tenant
    belongs_to :apartment 
end
