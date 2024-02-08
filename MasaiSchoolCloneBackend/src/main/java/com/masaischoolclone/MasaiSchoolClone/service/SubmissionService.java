package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Submission;

import java.util.List;

public interface SubmissionService {

     Submission createSubmission(Integer studentId, Integer assignmentId, Submission submission);

     List<Submission> getSubmissionList(Integer studentId);


    List<Submission> getSubmissionList(Integer studentId,Integer AssignmentId);

}
