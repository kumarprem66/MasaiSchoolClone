package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Submission;
import com.masaischoolclone.MasaiSchoolClone.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/submission")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/create")
    public ResponseEntity<Submission> createSubmission(Submission submission){

        try {

            return new ResponseEntity<>(submissionService.createSubmission(submission), HttpStatus.CREATED);
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


    @GetMapping("/fetch-all-ofStudent")
    public ResponseEntity<List<Submission>> getSubmissionList(Integer studentId,Integer assignmentId){

        try {

            return new ResponseEntity<>(submissionService.getSubmissionList(studentId,assignmentId), HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

}
