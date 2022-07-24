const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    property_thumbnail: {

        type: Array
    },
    property_name: {

        type: String
    },
    property_address: {
        type: String
    },
    property_details: {

        type: String
    },
    maharera_no: {

        type: String
    },
    property_video: {

        type: String
    },
    property_map: {

        type: String
    },
    type1: {

        type: String
    },
    type2: {

        type: String
    },
    type3: {

        type: String
    },
    type4: {

        type: String
    },
    price1: {

        type: String
    },
    price2: {

        type: String
    },
    price3: {

        type: String
    },
    price4: {

        type: String
    },
    area1: {

        type: String
    },
    area2: {

        type: String
    },
    area3: {

        type: String
    },
    area4: {

        type: String
    },
    floor_no1: {

        type: String
    },
    floor_no2: {

        type: String
    },
    floor_no3: {

        type: String
    },
    floor_no4: {

        type: String
    },
    isometric1: {

        type: Array
    },
    isometric2: {

        type: Array
    },
    isometric3: {

        type: Array
    },
    isometric4: {

        type: Array
    },
    floor1: {

        type: Array
    },
    floor2: {

        type: Array
    },
    floor3: {

        type: Array
    },
    floor4: {

        type: Array
    },
    gallery_array: {

        type: Array
    },
    brochure_url: {
        type: String
    }
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;