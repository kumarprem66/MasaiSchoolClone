package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.exception.StudentException;
import com.masaischoolclone.MasaiSchoolClone.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/create/{email}")
    ResponseEntity<?> createStudent(@PathVariable String email,@RequestBody Student student){
        try {

            return new ResponseEntity<>(studentService.createdStudent(email,student), HttpStatus.CREATED);
        } catch (StudentException e) {

            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/login/{mob}")
    ResponseEntity<?> loginStudent(@PathVariable String mob){
        try {

            return new ResponseEntity<>(studentService.loginStudent(mob), HttpStatus.ACCEPTED);
        } catch (StudentException e) {

            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/fetch-all")
    ResponseEntity<List<Student>> getStudentList(){
        try {

            return new ResponseEntity<>(studentService.getStudentList(), HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
    }

    @GetMapping("/fetch-all-courses/{stu_id}")
    ResponseEntity<Set<Course>> getStudentList(@PathVariable Integer stu_id){
        try {

            Set<Course> courses = new HashSet<>(studentService.getAllCourses(stu_id));
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
    }

    @GetMapping("/fetch-by-user-id/{userId}")
    ResponseEntity<Student> getStudentByUserID(@PathVariable Integer userId){
        try {

            return new ResponseEntity<>(studentService.getStudentByUser(userId), HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @PutMapping("/update/{studentId}/{userId}")
    ResponseEntity<Student> updateStudent(@PathVariable Integer studentId,@PathVariable Integer userId,@RequestBody Student updatedStudent){
        try {

            return new ResponseEntity<>(studentService.updateStudent(studentId,userId,updatedStudent), HttpStatus.ACCEPTED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> deleteStudent(@PathVariable Integer id){
        try {

            Integer id1 = studentService.deleteStudent(id);
            return new ResponseEntity<>(id1, HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/fetch/{studentId}")
    public ResponseEntity<Student> getStudent(@PathVariable Integer studentId){
        try {

            return new ResponseEntity<>(studentService.getStudent(studentId), HttpStatus.OK);
        } catch (Exception e) {


            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PutMapping("/enroll/{studentId}/{courseId}")
   public ResponseEntity<String> enrollInCourse(@PathVariable Integer studentId,@PathVariable Integer courseId){
        try {

            studentService.enrollInCourse(studentId,courseId);
            return new ResponseEntity<>("Successfully enrolled", HttpStatus.ACCEPTED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
   }
}
