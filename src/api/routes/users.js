const express = require("express");
const router = express.Router();
const User = require("../../models/users");
module.exports = app => {
    app.use("/users", router);

    /* 
        Get route to handle requests like
            1. fetch list of all users - pagination
            2. fetch nearby users given certain coordinates
    */ 
    router.get("/",
        async (req, res) => {
            try {
                const {
                    type,
                    offset,
                    limit,
                    latitude,
                    longitude
                } = req.query;
                let users;
                console.log(offset)
                console.log(type)
                if (offset && limit) {
                    const query = type === "new" ? {
                        userId: {
                            $gt: offset
                        }
                    } : {
                        userId: {
                            $lt: offset
                        }
                    }
                    users = await User.find(query).sort({
                        createdAt: -1
                    }).limit(limit)
                    return res.status(200).json(users);
                } else if (latitude && longitude) {
                    users = await User.aggregate([{
                        $geoNear: {
                            near: {
                                type: "Point",
                                coordinates: [-14.7678342, 23.164836],
                                spherical: true,
                                distanceField: "calcDistance"
                            }
                        }
                    }])
                    return res.status(200).json(users);
                } else {
                    users = await User.find({});
                    return res.status(200).json(users);
                }
            } catch (error) {
                return res.status(500).send(error);
            }
        }
    );

    /* Create a new user */ 
    router.post("/", async (req, res) => {
        try {
            const {
                name,
                email,
                mobile,
                address
            } = req.body;
            const {
                street,
                locality,
                city,
                state,
                pincode,
                location
            } = address;
            const {
                type,
                coordinates
            } = location;
            const newUser = await User.create({
                name,
                email,
                mobile,
                address: {
                    street,
                    locality,
                    city,
                    state,
                    pincode,
                    location: {
                        type,
                        coordinates
                    }
                }
            });
            console.log(newUser);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).send(error);
        }
    });

    /* Update user details */
    router.patch("/:userId", async (req, res) => {
        try {
            const {
                userId
            } = req.params;
            const updatedUserDetails = await User.findOneAndUpdate({
                userId
            }, {
                $set: req.body
            }, {
                new: true
            });
            return res.status(200).json(updatedUserDetails);
        } catch (error) {
            return res.status(500).send(error);
        }
    });

    /* delete a user based on the userId */
    router.delete("/:userId", async (req, res) => {
        try {
            const {
                userId
            } = req.params;
            const deleteUser = await User.remove({
                userId
            });
            return res.status(204).json(deleteUser);
        } catch (error) {
            return res.status(500).send(error);
        }
    });
};