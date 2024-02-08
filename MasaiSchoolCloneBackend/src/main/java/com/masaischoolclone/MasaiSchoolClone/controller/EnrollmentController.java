package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Enrollment;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import com.masaischoolclone.MasaiSchoolClone.service.EnrollmentService;
import com.masaischoolclone.MasaiSchoolClone.service.StudentService;
import com.masaischoolclone.MasaiSchoolClone.utility.Common;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/enroll/{courseId}/{studentId}")
    ResponseEntity<Enrollment> enrollInCourse(@RequestBody Enrollment enrollment,
                                              @PathVariable Integer courseId,
                                              @PathVariable Integer studentId,
                                              HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(studentId);
            if(student.getUser().getEmail().equals(userName) || student.getUser().getUsername().equals(userName)){
                return ResponseEntity.ok(enrollmentService.enrollInCourse(enrollment,courseId,studentId));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }



        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
