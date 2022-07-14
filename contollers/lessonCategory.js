var express = require('express');
const lessonCategory = require('../models/lessonCategory');
var defaultModel = require('../models/lessonCategory');
var response = require('../utils/response');

let LessonCategoryController = {};

LessonCategoryController.getData = async (req, res, next) => {
    try {
        let data = await defaultModel.find({});
        response.successWithMessage(res,data);
    } catch (error) {
        console.log(error);
        response.error(res,response.API_GENERAL_ERROR);
    }
}

LessonCategoryController.createData = async (req, res, next) => {
    try {
        let data = new defaultModel(req.body);
        data.save((error,data) => {
            if(error) {
                console.log(error);
                response.error(res, response.API_GENERAL_ERROR);
            } else {
                response.successWithMessage(res, data.id);
            }
        })
    } catch (error) {
        console.log(error);
        response.error(res, response.API_GENERAL_ERROR);
    }
};

LessonCategoryController.updateData = async (req, res, next) => {
    defaultModel.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true,rawResult:true,context: 'query' },(error, data) => {
        if(error) {
            console.log(error)
            response.error(res, response.API_GENERAL_ERROR);
        } else if (!data) {
            response.error(res, response.API_DATA_NOT_FOUND);
        } else {
            response.success(res, response.API_UPDATE_SUCCESS);
        }
    })
}

LessonCategoryController.deleteOne = async (req, res, next) => {
    defaultModel.findByIdAndRemove({_id : req.params.id}, (error, writeOpResult) => {
        if(error) {
            response.error(res, response.API_GENERAL_ERROR);
        } else if (!writeOpResult) {
            response.error(res, response.API_DATA_NOT_FOUND);
        } else {
            response.success(res, response.API_DELETE_SUCCESS);
        }
    });
}

LessonCategoryController.getById = async (req, res, next) => {
    let data = await defaultModel.findOne({ _id: req.params.id});
    response.successWithMessage(res, data);
}

module.exports = LessonCategoryController;