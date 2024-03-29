package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;

import java.util.Set;

public interface AssignmentService {

    Assignment assignmentCreate(Integer courseId, Integer lectureId, Assignment assignment);

    Set<Assignment> getAssignementList(Integer courseId);

    Assignment updateAssignment(Integer updateId,Assignment updatedAssignment);

    Integer deleteAssignment(Integer assignmentId);

    Set<Assignment> getAssignmentList(Integer courseId,Integer lectureId);

    Assignment getAssignment(Integer assignmentId);


}
