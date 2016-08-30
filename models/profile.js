var mongoose = require('mongoose'),

    bcrypt = require('bcryptjs'),
    ProfileSchema = new mongoose.Schema({
        rate: Number,
        phone: String,
        description: String,
        titleDescription: String,
        typeEquipment: String,
        profilePic: String,
        zipCode: String,
        city: String,
        state: String,
        photo: String,

    });

module.exports = mongoose.model('Profile', ProfileSchema);
