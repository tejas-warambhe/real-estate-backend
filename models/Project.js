const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    property_thumbnail: {

        type: String
    },
    description: {

        type: String
    },
    type_of_property: {

        type: String
    },
    area: {

        type: String
    },
    floor: {

        type: String
    },
    pricing: {

        type: String
    },

    floor_plan_array: {

        type: Array
    },
    isometric_view_array: {

        type: Array
    },
    maharera_no: {

        type: String
    },
    property_vide: {

        type: String
    },
    property_map: {

        type: String
    },
    gallery_array: {

        type: String
    }
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project