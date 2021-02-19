'use strict'
const db = require("../models");
const service = require('../services')
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
async function singUp(req,res){
    try{
        const user = await db.User.create({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password, salt)
        })
        return res.status(200).send({
            message:'Registro satisfactorio',
            data:{
                token:service.createToken(user),
                user:user
            }            
        })
    }catch(error){
        console.log("error:",error)
        next(error)
    }
}
async function logIn(req,res){
    try{
        let user= await db.User.findOne({email:req.body.email}).select('password');
        if(!user) return res.status(404).send({message:'Usuario no encontrado'});
        if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(404).send({message:'Contraseña incorrecta'});
        
        res.status(200).send({
            message:'Inicio de sesión satisfactorio',
            data:{
                token:service.createToken(user),
                user:user
            }
        })
    }catch(error){
        console.log("error:",error)
        next(error)
    }
}
module.exports={
    singUp,
    logIn,
}