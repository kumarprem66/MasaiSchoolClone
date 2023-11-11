package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.exception.AssignmentException;
import com.masaischoolclone.MasaiSchoolClone.exception.CourseException;
import com.masaischoolclone.MasaiSchoolClone.repository.AssignmentRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentServiceImpl implements AssignmentService {
    
    @Autowired
    private AssignmentRepo assignmentRepo;
    
    @Autowired
    private CourseRepo courseRepo;
    
    @Override
    public Assignment assignmentCreate(Assignment assignment) {

        Optional<Assignment> optionalAssignment = assignmentRepo.findById(assignment.getAnId());

        if(optionalAssignment.isPresent()){
            throw new AssignmentException("Assignment is already exist with given id");
        }else{
            return assignmentRepo.save(assignment);
        }

    }

    @Override
    public Set<Assignment> getAssignementList(Integer courseId) {
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if(courseOptional.isPresent()){
            return courseOptional.get().getAssignments();
        }else {
            throw new CourseException("Course not available with given id "+courseId);
        }
    }

    @Override
    public Assignment updateAssignment(Integer updateId, Assignment updatedAssignment) {
        Optional<Assignment> optionalAssignment = assignmentRepo.findById(updateId);

        if(optionalAssignment.isPresent()){
            Assignment updatedAss = optionalAssignment.get();
            updatedAss.setTitle(updatedAssignment.getTitle());
            updatedAss.setDescription(updatedAssignment.getDescription());
            updatedAss.setDueDate(updatedAssignment.getDueDate());
            updatedAss.setInstruction(updatedAssignment.getInstruction());
            updatedAss.setStartDate(updatedAssignment.getStartDate());

            return assignmentRepo.save(updatedAss);
        }else{
            throw new AssignmentException("Assignment is already exist with given id");
        }
    }

    @Override
    public Integer deleteAssignment(Integer assignmentId) {
        Optional<Assignment> optionalAssignment = assignmentRepo.findById(assignmentId);

        if(optionalAssignment.isPresent()){
            assignmentRepo.deleteById(assignmentId);
            return assignmentId;
        }else{
            throw new AssignmentException("Assignment does not exist with given id");
        }
    }
}
