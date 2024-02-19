class Tenant < ApplicationRecord
    enum role: { user: "user", admin: "admin" }, _default: "user"
    validates :username, presence: true 
    validates :username, uniqueness: true
    validates :name, presence:true
    validates :age, presence:true
    validates :age, numericality: {greater_than_or_equal_to: 18}
    has_secure_password
    belongs_to :lease 
    has_many :reviews
    has_one_attached :image
end
