# Nodejs Expressjs MongoDB - User Management APIs Project

## Getting started

This is a simple User Management Project. We can perform CRUD Operations on a User

## Software Requirements

- Node.js
- MongoDB
- Postman (Optional)

## How to install

### Using Git (recommended)

1.  Clone the project from github.

```bash
git clone https://github.com/Cshravani-17/mounty.git ./mounty
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd mounty
npm install
```

## How to run

### Running API server locally

```bash
npm start
```

You will know server is running by checking the output of the command `npm start`

```bash
Server running on port 3000
MongoDB Connected

Press CTRL + C to stop the process.
```

### Models

There is a user model in `src/models/` which is used in the controller section `src/api/routes/`. This user model is a schema for user collection.

### Routes

All the user related routed are handled in `src/api/routes/users.js`. This file contains different user routes like Create User, Update user details, Delete a user and Get all users.

## APIs
- Get the list of all users - pagination
- limit - no of records to fetch
- Offset - which point to fetch from
- type - [old,new] in ascending or descending order of createdAt
```
curl --location --request GET 'http://localhost:3000/api/v1/users?offset=&limit=5&type=old'
```

- Create a new user
```
curl --location --request POST 'http://localhost:3000/api/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Shravani",
    "mobile": "9270984859",
    "email": "shravani12@btg.com",
    "address": {
        "street": "Saraswathi Nagar",
        "locality": "L.B.Nagar",
        "city": "Hyderabad",
        "state": "Telangana",
        "pincode": "500074",
        "location": {
            "type": "Point",
            "coordinates": [-14.7678342, 23.164836]
        }
    }
}'
```

- Delete a user by providing his userId in the params
```
curl --location --request DELETE 'http://localhost:3000/api/v1/users/12'
```

- Update a specific user details
- It updated by userId
```
curl --location --request PATCH 'http://localhost:3000/api/v1/users/6' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Shravani",
    "mobile": "9270984859",
    "email": "shravani12@btg.com",
    "address": {
        "street": "Saraswathi Nagar",
        "locality": "L.B.Nagar",
        "city": "Hyderabad",
        "state": "Telangana",
        "pincode": "500074",
        "location": {
            "type": "Point",
            "coordinates": [-14.7678342, 23.164836]
        }
    }
}'
```

## Built With

* [mLab](https://mlab.com/) - Database