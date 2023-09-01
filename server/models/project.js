const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    project_name : {
        type : String,
        required : true
    },
    owner_name : {
        type : String,
        required : true
    },

});

mongoose.model("Project", ProjectSchema)

