package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.entity.Submission;
import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import com.masaischoolclone.MasaiSchoolClone.service.CourseService;
import com.masaischoolclone.MasaiSchoolClone.service.StudentService;
import com.masaischoolclone.MasaiSchoolClone.service.SubmissionService;
import com.masaischoolclone.MasaiSchoolClone.utility.Common;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/submission")

public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private StudentService studentService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/create/{studentId}/{assignmentId}")
    public ResponseEntity<Submission> createSubmission(@PathVariable Integer studentId,
                                                       @PathVariable Integer assignmentId,
                                                       @RequestBody Submission submission,
                                                       HttpServletRequest request){

        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(studentId);
            if(student.getUser().getEmail().equals(userName) || student.getUser().getUsername().equals(userName)){
                return new ResponseEntity<>(submissionService.createSubmission(studentId,assignmentId,submission), HttpStatus.CREATED);

            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }


    @GetMapping("/fetch-all/{studentId}")
    public ResponseEntity<List<Submission>> getSubmissionList(@PathVariable Integer studentId,HttpServletRequest request){

        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(studentId);
            if(student.getUser().getEmail().equals(userName) || student.getUser().getUsername().equals(userName)){
                return new ResponseEntity<>(submissionService.getSubmissionList(studentId), HttpStatus.OK);

            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }


    @GetMapping("/fetch-all-assignment/{studentId}/{assignmentId}")
    public ResponseEntity<List<Submission>> getSubmissionList(@PathVariable Integer studentId,@PathVariable Integer assignmentId,HttpServletRequest request){

        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Student student = studentService.getStudent(studentId);
            if(student.getUser().getEmail().equals(userName) || student.getUser().getUsername().equals(userName)){
                return new ResponseEntity<>(submissionService.getSubmissionList(studentId,assignmentId), HttpStatus.OK);

            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }



        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

}
