'use strict'
const db = require("../models");

async function all(req,res){    
    try{
        let elements = await db.Student.find({});
        return res.status(200).send({message:'Lista de estudiantes',data:elements})
    }catch(error){
        console.log("error:",error)
        next(error)
    }  
}
async function getElement(req,res,next){
    try{
        let element= await db.Student.findById(req.params.id);
        if(!element) return res.status(404).send({message:`Estudiante no existente`})
        res.status(200).send({message:'Estudiante encontrado satisfactoriamente',data:element})
    }catch(error){
        console.log("error:",error)
        next(error)
    }  
}
async function store(req,res){
    try{
        console.log("req.body:",req.body)
        let element = await db.Student.create({
            name:req.body.name,
        });
        return res.status(200).send({
            message:'Estudiante registrado satisfactoriamente',
            data:await db.Student.findById(element._id)
        })
    }catch(error){
        console.log("error:",error)
        if(error.name==="ValidationError"){
            return res.status(422).send({message:'Entidad no procesable',errors:error.errors});
        }else{
            return next(error)
        }
    }  
}
async function update(req,res,next){
    try{
        let element = await db.Student.findByIdAndUpdate(req.params.id,req.body);
        if(!element) return res.status(404).send({message:`El estudiante no existe`});
        return res.status(200).send({
            message:'Estudiante actualizado satisfactoriamente',
            data: await db.Student.findById(element._id)
        })
    }catch(error){
        console.log("error:",error)
        next(error)
    }    
}
async function deleteElement(req,res,next){
    try{
        const element = await db.Student.findById(req.params.id);
        if(!element) return res.status(404).send({message:`El estudiante no existe`})
        await db.Student.deleteOne({ _id: req.params.id });
        return res.status(200).send({
            message:'Estudiante eliminado satisfactoriamente',
            data: element
        })
    }catch(error){
        console.log("error:",error)
        next(error)
    }    
}
module.exports={
    all,
    getElement,
    store,
    update,
    deleteElement,
}