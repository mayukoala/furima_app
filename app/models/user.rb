class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :nickname, presence: true, uniqueness: true


  VALID_family_name_REGEX =/\A[一-龥ぁ-ん]/
  validates :family_name, {presence: true,format: { with: VALID_family_name_REGEX,message: "は全角で入力して下さい"}}
 

  VALID_first_name_REGEX =/\A[一-龥ぁ-ん]/
  validates :first_name, {presence: true,format: { with: VALID_first_name_REGEX,message: "は全角で入力して下さい"}}

  VALID_family_name_kana_REGEX =/\A[ァ-ヶー－]+\z/
  validates :family_name_kana, {presence: true,format: { with: VALID_family_name_kana_REGEX,message: "は全角カタカナのみで入力して下さい"}}


  VALID_first_name_kana_REGEX =/\A[ァ-ヶー－]+\z/
  validates :first_name_kana, {presence: true,format: { with: VALID_first_name_kana_REGEX,message: "は全角カタカナのみで入力して下さい"}}

  VALID_birth_REGEX=/\A[0-9０-９]+\z/
  validates :birth, length: { is: 8 ,presence: true,format: { with: VALID_birth_REGEX,message: "は西暦から数字８桁で入力して下さい"}}

  VALID_PASSWORD_REGEX =/\A(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])\w{7,12}\z/
  validates :password, {presence: true,format: { with: VALID_PASSWORD_REGEX,message: "は半角7~12文字英大文字・小文字・数字それぞれ１文字以上含む必要があります"}}

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, {presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }}
  
  has_many :products
  has_many :orders
  has_one :delivery_address
  has_one :credit_card
end
