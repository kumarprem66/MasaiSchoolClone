package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Enrollment;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.exception.EnrollmentException;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.EnrollmentRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.StudentRepo;
import com.masaischoolclone.MasaiSchoolClone.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {


    @Autowired
    private EnrollmentRepo enrollmentRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private StudentRepo studentRepo;


    public Enrollment enrollInCourse(Enrollment enrollment, Integer courseId,Integer studentId)  {

        Optional<Course> optionalCourse = courseRepo.findById(courseId);
        Optional<Student> optionalStudent = studentRepo.findById(studentId);

        if (optionalCourse.isPresent() && optionalStudent.isPresent()) {

            Course course = optionalCourse.get();
            Student student = optionalStudent.get();


            System.out.println(course.getStudents().size());


            if(course.getStudents().contains(student)){
                throw new EnrollmentException("Student already enrolled in this course");
            }

            enrollment.setCourse(course);
            enrollment.setStudent(student);
            enrollmentRepo.save(enrollment);

            return enrollment;

        } else {
            // Handle case where student or course is not found
            throw new RuntimeException("course or student not found");
        }
    }

    @Override
    public Enrollment getEnrollment(Integer studentId) {

        Optional<Student> optionalStudent = studentRepo.findById(studentId);
        if(optionalStudent.isPresent()){
            return enrollmentRepo.findByStudent(optionalStudent.get());
        }else{
            throw new EnrollmentException("Student not found with id "+studentId);
        }

    }
}
