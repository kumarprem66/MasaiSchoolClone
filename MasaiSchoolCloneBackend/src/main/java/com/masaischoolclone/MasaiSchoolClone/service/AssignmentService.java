package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentService {

    Assignment assignmentCreate(Assignment assignment);

    List<Assignment> getAssignementList();

    Assignment updateAssignment(Integer updateId,Assignment updatedAssignment);

    Integer deleteAssignment(Integer assignmentId);


}
