package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.entity.Submission;
import com.masaischoolclone.MasaiSchoolClone.exception.StudentException;
import com.masaischoolclone.MasaiSchoolClone.repository.AssignmentRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.StudentRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.SubmissionRepo;
import com.masaischoolclone.MasaiSchoolClone.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubmissionServiceImpl  implements SubmissionService {

    @Autowired
    private SubmissionRepo submissionRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private AssignmentRepo assignmentRepo;
    @Override
    public Submission createSubmission(Submission submission) {


        return submissionRepo.save(submission);
    }

    @Override
    public List<Submission> getSubmissionList(Integer studentId) {

        Optional<Student> student = studentRepo.findById(studentId);
        if(student.isPresent()){
           return submissionRepo.findAllByStudent(student.get());
        }else{
            throw new StudentException("No student with this id is available");
        }

    }

    @Override
    public List<Submission> getSubmissionList(Integer studentId,Integer assignmentId) {
        Optional<Student> student = studentRepo.findById(studentId);
        if(student.isPresent()){
            Optional<Assignment> assignment = assignmentRepo.findById(assignmentId);
            if(assignment.isPresent()){

                return submissionRepo.findAllByStudentAndAssignment(student.get(),assignment.get());
            }else{
                throw new StudentException("No Assignment with this id is available");
            }

        }else{
            throw new StudentException("No student with this id is available");
        }
    }

}
