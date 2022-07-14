var mongoose = require('mongoose');
var validation = require('../utils/validation');
var uniqueValidator = require('mongoose-unique-validator');
var Bcrypt = require('bcryptjs');
var moment = require('moment');

var Name = "User";

var Schema = new mongoose.Schema({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    grade: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, default: false },
}, { collection: Name, versionKey: false });

Schema.virtual('user_id')
    .get(function () {
        return this._id;
    });

Schema.virtual('full_name')
    .get(function () {
        return this.first_name + " " + this.last_name;
    });

// virtual di ubah jadi object dan json
Schema.set('toObject', { virtuals: true })
// pada saat toJson _id, isDeleted dihapus 
Schema.set('toJSON', { virtuals: true, transform: function (doc, ret) { delete ret._id; delete ret.isDeleted; } })

Schema.pre('save', function (next) {
    const data = this;
    if (data.password)
        data.password = Bcrypt.hashSync(data.password, 10);
    next();
});

Schema.pre('findOneAndUpdate', function (next) {
    const data = this._update;
    if (data.password)
        data.password = Bcrypt.hashSync(data.password, 10);
    next();
});

// Schema.path('email').validate(function (value) {
//     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
// }, 'Invalid email format');

// Schema.plugin(uniqueValidator, { message: validation('unique') });

mongoose.model(Name, Schema);


module.exports = mongoose.model(Name);

