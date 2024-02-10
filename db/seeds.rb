# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


d1 = Apartment.create(number: 20)
d2 = Apartment.create(number: 21)
d3 = Apartment.create(number: 22)
d4 = Apartment.create(number: 23)
d5 = Apartment.create(number: 24)
d6 = Apartment.create(number: 25)
d7 = Apartment.create(number: 26)

l1 = Lease.create(content: "This binding agreement is good for one calendar year", apartment_id: d1.id,  rent: 2300)
l2 = Lease.create(content: "This binding agreement is good for one calendar year", apartment_id: d2.id,  rent: 2200)
l3 = Lease.create(content: "This binding agreement is good for one calendar year", apartment_id: d3.id,  rent: 2400)
l4 = Lease.create(content: "This binding agreement is good for one calendar year", apartment_id: d4.id,  rent: 3200)
l5 = Lease.create(content: "This binding agreement is good for one calendar year", apartment_id: d5.id,  rent: 2950)
l6 = Lease.create(content: "This binding agreement is good for one calendar year", apartment_id: d6.id,  rent: 2900)
l7 = Lease.create(content: "This binding agreement is good for one calendar year", apartment_id: d7.id,  rent: 2500)


# t1 = Tenant.create(name: "Robbin Miller", age: 29, lease_id: l1.id, username: "RedBird")
# t2 = Tenant.create(name: "Justin Cobb", age: 37, lease_id: l2.id, username:"Timberlake")
# t3 = Tenant.create(name: "Chris Hitt", age: 19, lease_id: l3.id, username:"The_Other_Pratt")
# t4 = Tenant.create(name: "Rehna Scwhatsky", age: 35, lease_id: l4.id, username:"RussianSpy")
# t5 = Tenant.create(name: "Timber Care", age: 40, lease_id: l5.id, username:"TimberTheDog")
# t6 = Tenant.create(name: "Jen Scott", age: 21, lease_id: l6.id, username: "NotCody")
# t7 = Tenant.create(name: "Bobbie Harry", age: 29, lease_id: l7.id, username: "BobbieB")
# t8 = Tenant.create(name: "Reha bronsky", age: 29, lease_id: l7.id, username:"HockeyKid")



# Review.create({
#  content: "The managment company was super responsive and welcoming.",
#  tenant_id: t1.id,
#  apartment_id: d1.id 
# })
# Review.create({
#  content: " I really liked all of the updated apartments and felt safe.",
#  tenant_id: t2.id,
#  apartment_id: d2.id 
# })
# Review.create({
#  content: "Super easy getting all of the paperwork done.  I had the keys same day and they even let us move in early.",
#  tenant_id: t3.id,
#  apartment_id: d3.id 
# })
# Review.create({
#  content: "we had a problem with the upstairs neighbor and it was resolved so quickly with the help of management.",
#  tenant_id: t4.id,
#  apartment_id: d4.id 
# })
# Review.create!({
#  content: "We had a really positive move in experience.  The location is convenient and quiet.",
#  tenant_id: t5.id,
#  apartment_id: d5.id 
# })
# Review.create({
#  content: "We love how close the building is to everything we need.  Best grocery stores and so walkable.",
#  tenant_id: t6.id,
#  apartment_id: d6.id 
# })
# Review.create({
#  content: "We love living in this area and feel lucky to have found this building.  We plan to stay as long as we can.",
#  tenant_id: t7.id,
#  apartment_id: d7.id 
# })
# Review.create({
#  content: "The common spaces are clean and well-maintained. Any time we have had a problem, it has been resolved smoothly and efficiently.",
#  tenant_id: t8.id,
#  apartment_id: d7.id 
# })
