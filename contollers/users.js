var express = require('express');
var defaultModel = require('../models/users');
// const { API_GENERAL_ERROR } = require('../utils/response');
var response = require('../utils/response');

let UsersController = {};

UsersController.getList = async (req,res,next) => {
    try {
        let data = await defaultModel.find({})
        response.success(res, data)
    } catch (error) {
        console.log(error)
        response.error(res, response.API_GENERAL_ERROR)
    }
}

UsersController.createUsers = async (req, res, next) => {
    try {
        // res.json(true)
        let data = new defaultModel(req.body)
        data.save((error,data) => {
            if(error){
                console.log(error)
                response.error(res,response.API_GENERAL_ERROR)
            }else{
                response.success(res,data.id)
            }
        })
        
    } catch (error) {
        console.log(error);
        response.error(res, response.API_GENERAL_ERROR);
    }
}

UsersController.updateUsers = async (req, res, next) => {
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

UsersController.deleteOne = async (req,res,next) => {
    defaultModel.findByIdAndRemove({_id : req.params.id}, (error, writeOpResult) => {
        if(error) {
            response.error(res, response.API_GENERAL_ERROR);
        } else if (!writeOpResult) {
            response.error(res, response.API_DATA_NOT_FOUND);
        } else {
            response.success(res, response.API_DELETE_SUCCESS);
        }
    })
}

UsersController.getById = async (req, res, next) => {
    let data = await defaultModel.findOne({_id: req.params.id});

    response.successWithMessage(res, data);
}

module.exports = UsersController;