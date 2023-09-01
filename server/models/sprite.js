const mongoose = require("mongoose")

const SpriteSchema = new mongoose.Schema({
    sprite_name : {
        type : String,
        requried : true
    },
    owner_name : {
        type : String,
        required : true
    }
});

mongoose.model("Sprite", SpriteSchema)