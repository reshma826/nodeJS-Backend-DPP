Background of the project:

A movie rental company rents out DVDs to their customer. They do home delivery of the DVDs to their customers. Also
once the customer watch the movies, the movie rental company picks up the DVD from the customer’s door step. The
movie rental company sales representative(SR) receives the order through call, once customer confirms the movie and
the date he/she wants the movie DVD to be delivered, the SR maintains the record of the order in Microsoft Excel and on
the date of delivery he schedules the delivery through a delivery boy. Similarly on the date of return SR schedules a pick
up of the DVD from customer’s place. Now the company is getting trouble while maintaining the delivery and pick up
details. So they want to track the delivery & pickup details through a delivery portal.

Business Requirement:
The goal is to develop a delivery and pickup portal where the delivery boy can make entry of the delivery details and
pickup details. Lets say the portal name is Delivery Pickup Portal (DPP in short)

Technologies used:

1. NodeJS for backend server (Node.js 18.18.2)
2. ExpressJs (latest version)
3. PostgreSQL DB (v 15.5)
4. Sequelize ORM (latest version)
5. Firebase for Authentication
6. Postman

Requirements implemented:
Created a web server with a RESTful API, which support bellow requirements:

1. The delivery boy can should able to login to the DPP using google login (firebase login)
2. After login the user authentication mechanism should be used for each api call made
3. After login, the delivery boy should able to add the following details while doing the delivery of DVDs
   a. Each Movie Name (Customer can take multiple DVDs at once)
   b. Rent for each DVD
   c. Number of Days each DVD rented
   d. Delivery charge (Whether 1 DVD delivered or multiple DVDs delivered, the delivery charge is same)
4. Similarly while picking up the DVDs, the pickup boy shall login to the portal, search the DVDs delivered to the
   customer using customer mobile number and add each movie name to be picked up (Customer can return all the DVDs
   rented or only few of the DVDs rented).
5. Backend tracks who is the delivery boy and pickup boy for each delivery and pickup made.
   The DB schema is designed to satisfy above requirements.

List of api's created

1. LOGIN USER/DELIVERY-PARTNER - Using google signIn
   uri - http://localhost:8088/api/login/google

   payload : {
   "full_name":"Delivery Partner 2",
   "contact_number":"9888888828",
   "email":"dp2@gmail.com"
   }

   {
   "response": {
   "status": 200,
   "message": "User loged in Successfully",
   "user_id": "b49110ed-4ae7-4f5c-bf87-9c947c12eb6a"
   }
   }

2. ADD CUSTOMER
   uri - http://localhost:8088/api/customer/addCustomer

   payload : {
   "name":"Reshma M",
   "contact_number":"+917019699935",
   "email":"reshmam826@gmail.com",
   "address":"ITI layout, mallathaalli"
   }

   {
   "response": {
   "status": 200,
   "message": "Customer added Successfully",
   "customer_id": "efc3d84c-df1e-4e8c-a447-6053da6fe6e9"
   }
   }

3. ADD DVD DELIVERY DETAILS
   uri - http://localhost:8088/api/delivery/addDetails

   payload :{
   "user_id":"217fa703-d09f-477c-9774-c14761d140e3",
   "customer_id":"14d24dac-5f4b-4ae4-84dc-442f6efe18b2",
   "dvd_details":[{
   "movie_name":"A",
   "rent":"50",
   "noOfDay":"2"
   }],
   "address":"Nagarbhavi",
   "delivery_status":"Ordered",
   "delivered_date":"2023-12-15 12:34:44.664+00"
   }

   response{
   "response": {
   "status": 200,
   "message": "delivery details added Successfully",
   "delivery_id": "26b430a2-7566-47ed-977d-f16415880867"
   }
   }

4. ADD PICKUP DETAILS
   uri - http://localhost:8088/api/pickUp/addPickUpDetails

   payload:{
   "user_id":"217fa703-d09f-477c-9774-c14761d140e3",
   "customer_contact_number":"+917019699935",
   "dvd_details":[{
   "movie_name":"Animal"
   }],
   "pick_up_status":"Pick up scheduled"
   }
