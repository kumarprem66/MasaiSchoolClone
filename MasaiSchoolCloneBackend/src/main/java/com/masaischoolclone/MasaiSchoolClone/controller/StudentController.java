package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.exception.StudentException;
import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import com.masaischoolclone.MasaiSchoolClone.service.StudentService;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import com.masaischoolclone.MasaiSchoolClone.utility.Common;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;


@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/create/{email}")
    ResponseEntity<?> createStudent(@PathVariable String email, @RequestBody Student student, HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            if(userService.getUser(email).getUsername().equals(userName) || email.equals(userName)){
                Student studentRes = studentService.createdStudent(email,student);


                return new ResponseEntity<>(studentRes, HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }


        } catch (StudentException e) {

            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

//    @GetMapping("/login/{mob}")
//    ResponseEntity<?> loginStudent(@PathVariable String mob){
//        try {
//
//            return new ResponseEntity<>(studentService.loginStudent(mob), HttpStatus.ACCEPTED);
//        } catch (StudentException e) {
//
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
//
//        }
//    }

    @GetMapping("/fetch-all/{userId}")
    ResponseEntity<List<Student>> getStudentList(@PathVariable Integer userId , HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getEmail().equals(userName) || user.getUsername().equals(userName)){
                return new ResponseEntity<>(studentService.getStudentList(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
    }

    @GetMapping("/fetch-all-courses/{stu_id}")
    ResponseEntity<Set<Course>> getStudentCourses(@PathVariable Integer stu_id,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(stu_id);
            if(student.getUser().getUsername().equals(userName) || student.getUser().getEmail().equals(userName)){
                Set<Course> courses = new HashSet<>(studentService.getAllCourses(stu_id));
                return new ResponseEntity<>(courses, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
    }

    @GetMapping("/fetch-by-user-id/{userId}")
    ResponseEntity<Student> getStudentByUserID(@PathVariable Integer userId,HttpServletRequest request){
        try {
            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);

            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return new ResponseEntity<>(studentService.getStudentByUser(userId), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @PutMapping("/update/{studentId}/{userId}")
    ResponseEntity<Student> updateStudent(@PathVariable Integer studentId,@PathVariable Integer userId,
                                          @RequestBody Student updatedStudent,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(studentId);
            if(student.getUser().getUsername().equals(userName) || student.getUser().getEmail().equals(userName)){
                return new ResponseEntity<>(studentService.updateStudent(studentId,userId,updatedStudent), HttpStatus.ACCEPTED);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }


        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable Integer studentId, HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(studentId);
            if(student.getUser().getUsername().equals(userName) || student.getUser().getEmail().equals(userName)){
                studentService.deleteStudent(studentId);
                return ResponseEntity.ok(Map.of("message","student deleted with id : "+studentId));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {



            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/fetch/{studentId}")
    public ResponseEntity<Student> getStudent(@PathVariable Integer studentId,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(studentId);
            if(student.getUser().getUsername().equals(userName) || student.getUser().getEmail().equals(userName)){

                return new ResponseEntity<>(studentService.getStudent(studentId), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {


            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/enroll/{studentId}/{courseId}")
   public ResponseEntity<Map<String,String>> enrollInCourse(@PathVariable Integer studentId, @PathVariable Integer courseId,HttpServletRequest request){
        try {


            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(studentId);
            if(student.getUser().getUsername().equals(userName) || student.getUser().getEmail().equals(userName)){

                return ResponseEntity.ok(Map.of("message",studentService.enrollInCourse(studentId,courseId)));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error",e.getMessage()));

        }
   }
}
