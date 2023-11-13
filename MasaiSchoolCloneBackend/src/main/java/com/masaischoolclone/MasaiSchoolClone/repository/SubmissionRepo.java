package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepo extends JpaRepository<Submission,Integer> {

    List<Submission> findAllByStudent(Student student);

    List<Submission> findAllByStudentAndAssignment(Student student, Assignment assignment);
}
