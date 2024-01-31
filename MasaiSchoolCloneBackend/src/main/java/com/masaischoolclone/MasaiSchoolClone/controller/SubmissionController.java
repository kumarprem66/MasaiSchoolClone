package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Submission;
import com.masaischoolclone.MasaiSchoolClone.service.SubmissionService;
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

    @PostMapping("/create")
    public ResponseEntity<Submission> createSubmission(@RequestParam Integer studentId,@RequestParam Integer courseId, @RequestParam Integer lectureId, @RequestParam Integer assignmentId,@RequestBody Submission submission){

        try {

            return new ResponseEntity<>(submissionService.createSubmission(studentId,courseId,lectureId,assignmentId,submission), HttpStatus.CREATED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }


    @GetMapping("/fetch-all")
    public ResponseEntity<List<Submission>> getSubmissionList(Integer studentId){

        try {

            return new ResponseEntity<>(submissionService.getSubmissionList(studentId), HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }


    @GetMapping("/fetch-all-assignment")
    public ResponseEntity<List<Submission>> getSubmissionList(Integer studentId,Integer assignmentId){

        try {

            return new ResponseEntity<>(submissionService.getSubmissionList(studentId,assignmentId), HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

}
