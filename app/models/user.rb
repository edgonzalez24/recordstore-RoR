class User < ApplicationRecord
  has_secure_password
  has_many :records
  validates :email, uniqueness: true
end
