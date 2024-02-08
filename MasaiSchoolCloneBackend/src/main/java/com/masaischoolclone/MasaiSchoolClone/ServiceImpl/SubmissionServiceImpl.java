package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.*;
import com.masaischoolclone.MasaiSchoolClone.exception.StudentException;
import com.masaischoolclone.MasaiSchoolClone.repository.*;
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

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private LectureRepo lectureRepo;

    @Override
    public Submission createSubmission(Integer studentId,Integer assignmentId, Submission submission) {
        // Fetch entities from repositories
        Optional<Student> optionalStudent = studentRepo.findById(studentId);
//        Optional<Course> optionalCourse = courseRepo.findById(courseId);
//        Optional<Lecture> optionalLecture = lectureRepo.findById(lectureId);
        Optional<Assignment> optionalAssignment = assignmentRepo.findById(assignmentId);

        if (optionalStudent.isPresent()  && optionalAssignment.isPresent()) {
            Student student = optionalStudent.get();

            Assignment assignment = optionalAssignment.get();

            // Validate that the student belongs to the course
//            if (!course.getStudents().contains(student)) {
//                throw new RuntimeException("Student does not belong to the course");
//            }

            // Validate that the lecture is associated with the course
//            if (!course.getLectures().contains(lecture)) {
//                throw new RuntimeException("Lecture is not associated with the course");
//            }

            // Validate that the assignment is associated with the course and lecture
//            if (!assignmentRepo.findAllByCourseAndLecture(course,lecture).contains(assignment)) {
//                throw new RuntimeException("assignment is not associated with the lecture");
//            }
            // Set associations
            submission.setStudent(student);
            submission.setAssignment(assignment);


            // Save the submission


            return  submissionRepo.save(submission);
        } else {
            throw new RuntimeException("Student, Course, or Lecture not found");
        }
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
