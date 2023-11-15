package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.entity.Enrollment;
import com.masaischoolclone.MasaiSchoolClone.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;
    @PostMapping("/enroll/{courseId}/{studentId}")
    ResponseEntity<Enrollment> enrollInCourse(@RequestBody Enrollment enrollment, @PathVariable Integer courseId,@PathVariable Integer studentId){
        try {

            return ResponseEntity.ok(enrollmentService.enrollInCourse(enrollment,courseId,studentId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
