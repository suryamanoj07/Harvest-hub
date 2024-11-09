const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        default: 'manager'
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
        default: ''
    },
    admin_type: {
        type: String,
        default: 'manager'
    },
    update_product_permission: {
        type: Boolean,
        default: false
    },
    update_user_permission: {
        type: Boolean,
        default: true
    },
    delete_user_permission: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = SuperUser = mongoose.model('admin_data', AdminSchema);
