package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.*;
import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.exception.AssignmentException;
import com.masaischoolclone.MasaiSchoolClone.exception.CourseException;
import com.masaischoolclone.MasaiSchoolClone.exception.LectureException;
import com.masaischoolclone.MasaiSchoolClone.repository.AssignmentRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.LectureRepo;
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

    @Autowired
    private LectureRepo lectureRepo;
    
    @Override
    public Assignment assignmentCreate(Integer courseId, Integer lectureId, Assignment assignment) {



        // Fetch entities from repositories

        Optional<Course> optionalCourse = courseRepo.findById(courseId);
        Optional<Lecture> optionalLecture = lectureRepo.findById(lectureId);

        if (optionalCourse.isPresent() && optionalLecture.isPresent()) {

            Course course = optionalCourse.get();
            Lecture lecture = optionalLecture.get();


            // Validate that the lecture is associated with the course
            if (!course.getLectures().contains(lecture)) {
                throw new AssignmentException("Lecture is not associated with the course");
            }


            assignment.setCourse(course);
            assignment.setLecture(lecture);
            return assignmentRepo.save(assignment);

        }else{
            throw new AssignmentException("Course or lecture is not available");
        }

    }

    @Override
    public Set<Assignment> getAssignementList(Integer courseId) {
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if(courseOptional.isPresent()){
            return assignmentRepo.findAllByCourse(courseOptional.get());
        }else {
            throw new CourseException("Course not available with given id "+courseId);
        }
    }

    @Override
    public Set<Assignment> getAssignmentList(Integer courseId,Integer lectureId) {
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        Optional<Lecture> lectureOptional = lectureRepo.findById(lectureId);
        if(courseOptional.isPresent() && lectureOptional.isPresent()){
            return assignmentRepo.findAllByCourseAndLecture(courseOptional.get(),lectureOptional.get());
        }else {
            throw new CourseException("Course or lecture not available with given id "+courseId);
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
