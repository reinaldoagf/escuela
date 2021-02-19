'use strict'
const db = require("../models");

async function all(req,res){
    try{
        let elements = await db.Course.find({});
        return res.status(200).send({message:'Lista de cursos',data:elements})
    }catch(error){
        console.log("error:",error)
        next(error)
    }  
}
async function getElement(req,res,next){
    try{
        let element= await db.Course.findById(req.params.id);
        if(!element) return res.status(404).send({message:`Curso no existente`})
        res.status(200).send({message:'Curso encontrado satisfactoriamente',data:element})
    }catch(error){
        console.log("error:",error)
        next(error)
    }  
}
async function store(req,res){
    try{
        let element = await db.Course.create({
            name:req.body.name,
        });
        return res.status(200).send({
            message:'Curso registrado satisfactoriamente',
            data:await db.Course.findById(element._id)
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
        let element = await db.Course.findByIdAndUpdate(req.params.id,req.body);
        if(!element) return res.status(404).send({message:`El curso no existe`});
        return res.status(200).send({
            message:'Curso actualizado satisfactoriamente',
            data: await db.Course.findById(element._id)
        })
    }catch(error){
        console.log("error:",error)
        next(error)
    }    
}
async function deleteElement(req,res,next){
    try{
        const element = await db.Course.findById(req.params.id);
        if(!element) return res.status(404).send({message:`El curso no existe`})
        await db.Course.deleteOne({ _id: req.params.id });
        return res.status(200).send({
            message:'Curso eliminado satisfactoriamente',
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