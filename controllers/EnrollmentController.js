'use strict'
const db = require("../models");

async function add(req,res){
    try{
        let course= await db.Course.findById(req.params.course_id);
        if(!course) return res.status(404).send({message:`Curso no existente`})

        let student= await db.Student.findById(req.params.student_id);
        if(!student) return res.status(404).send({message:`Estudiante no existente`})

        let element = await db.Enrollment.create({
            course:course._id,
        });
        await db.Enrollment.findByIdAndUpdate(element._id,
            { $push: { students: student._id } },{ new: true, useFindAndModify: false }
        );
        return res.status(200).send({
            message:'Inscripción registrada satisfactoriamente',
            data:await db.Enrollment.findById(element._id).populate('students').populate('course')
        })
    }catch(error){
        console.log("error:",error)
        next(error)
    }  
}
module.exports={
    add,
}