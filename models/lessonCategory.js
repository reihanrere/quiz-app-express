var mongoose = require('mongoose');

var Name = "LessonCategory";

var Schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, default: false },
}, { collection: Name, versionKey: false });

Schema.virtual('lesson_category_id')
    .get(function () {
        return this._id;
    });

// virtual di ubah jadi object dan json
Schema.set('toObject', { virtuals: true })
// pada saat toJson _id, isDeleted dihapus 
Schema.set('toJSON', { virtuals: true, transform: function (doc, ret) { delete ret._id; delete ret.isDeleted; } })

mongoose.model(Name, Schema);

module.exports = mongoose.model(Name);