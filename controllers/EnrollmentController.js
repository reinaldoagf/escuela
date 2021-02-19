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
        let course= await db.Course.findById(req.body.course);
        if(!course) return res.status(404).send({message:`Curso no existente`})

        let enrollment= await db.Enrollment.findOne({course:req.params.course_id});

        if(!enrollment){
            enrollment = await db.Enrollment.create({
                course:course._id,
            });
        }

        for(let _student of req.body.students){
            let student= await db.Student.findById(_student.id);
            if(!student) return res.status(404).send({message:`Estudiante no existente`})

            let studentCredit = await db.StudentCredit.create({
                student:student._id,
                credit:1
            });

            await db.Enrollment.findByIdAndUpdate(enrollment._id,
                { $push: { students: studentCredit._id } },{ new: true, useFindAndModify: false }
            );
        }

        return res.status(200).send({
            message:'Inscripción registrada satisfactoriamente',
            data: await db.Enrollment.findById(enrollment._id).populate({
                path:"students",
                populate:{
                    path:"student"
                }
            }).populate('course')
        })
    }catch(error){
        console.log("error:",error)
    }  
}
module.exports={
    all,
    add,
}