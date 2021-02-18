'use strict'
const db = require("../models");

async function all(req,res){
    try{
        return res.status(200).send({
            message:'Listado de inscripciones',
            data:await db.Enrollment.find().populate('students').populate('course')
        })
    }catch(error){
        console.log("error:",error)
    }  
}
async function add(req,res){
    try{
        let course= await db.Course.findById(req.params.course_id);
        if(!course) return res.status(404).send({message:`Curso no existente`})

        let student= await db.Student.findById(req.params.student_id);
        if(!student) return res.status(404).send({message:`Estudiante no existente`})

        let enrollment= await db.Enrollment.findOne({course:req.params.course_id});

        let element=null;
        if(!enrollment){
            element = await db.Enrollment.create({
                course:course._id,
            });
            await db.Enrollment.findByIdAndUpdate(element._id,
                { $push: { students: student._id } },{ new: true, useFindAndModify: false }
            );
        }else{
            element= await db.Enrollment.findByIdAndUpdate(enrollment._id,
                { $push: { students: student._id } },{ new: true, useFindAndModify: false }
            );
        }
        
        return res.status(200).send({
            message:'Inscripción registrada satisfactoriamente',
            data:await db.Enrollment.findById(element._id).populate({path:'students',select:'name credit'}).populate('course')
        })
    }catch(error){
        console.log("error:",error)
    }  
}
module.exports={
    all,
    add,
}