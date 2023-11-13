package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionService {

    Submission createSubmission(Submission submission);

     List<Submission> getSubmissionList(Integer studentId);


    List<Submission> getSubmissionList(Integer studentId,Integer AssignmentId);

}
