package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create")
    ResponseEntity<Student> createStudent(Student student){
        try {

            return new ResponseEntity<>(studentService.getStudent(student), HttpStatus.CREATED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/fetch-all")
    ResponseEntity<List<Student>> getStudentList(){
        try {

            return new ResponseEntity<>(studentService.getStudentList(), HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PutMapping("/update/{studentId}")
    ResponseEntity<Student> updateStudent(Integer studentId,Student updatedStudent){
        try {

            return new ResponseEntity<>(studentService.updateStudent(studentId,updatedStudent), HttpStatus.ACCEPTED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> deleteStudent(Integer id){
        try {

            Integer id1 = studentService.deleteStudent(id);
            return new ResponseEntity<>(id1, HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/fetch/{studentId}")
    public ResponseEntity<Student> getStudent(Integer studentId){
        try {

            return new ResponseEntity<>(studentService.getStudent(studentId), HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PutMapping("/enroll/{studentId}/{courseId}")
   public ResponseEntity<String> enrollInCourse(Integer studentId,Integer courseId){
        try {

            studentService.enrollInCourse(studentId,courseId);
            return new ResponseEntity<>("Successfully enrolled", HttpStatus.ACCEPTED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
   }
}
