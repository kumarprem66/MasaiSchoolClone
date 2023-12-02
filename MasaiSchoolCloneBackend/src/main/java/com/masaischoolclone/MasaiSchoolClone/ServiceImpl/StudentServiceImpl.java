package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.exception.StudentException;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.StudentRepo;
import com.masaischoolclone.MasaiSchoolClone.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private CourseRepo courseRepo;
    
    @Override
    public Student createdStudent(Student student) {
//        Optional<Student> student1 = studentRepo.findById(student.getId());

//        if(student1.isPresent()){
//            throw new StudentException("Student already exist with this name");
//        }else{
            return studentRepo.save(student);

//        }
    }

    @Override
    public List<Student> getStudentList() {
        return studentRepo.findAll();
    }

    @Override
    public Student updateStudent(Integer studentId, Student updatedStudent) {
        Optional<Student> studentOptional = studentRepo.findById(studentId);
        if(studentOptional.isPresent()){

            Student updatableStudent = studentOptional.get();
            updatableStudent.setContactNumber(updatedStudent.getContactNumber());
            updatableStudent.setDateOfBirth(updatedStudent.getDateOfBirth());


            return updatableStudent;


        }
        throw new StudentException("Student can not be updated,given id does not exist");
    }

    @Override
    public Integer deleteStudent(Integer studentId) {
        Optional<Student> studentOptional = studentRepo.findById(studentId);
        if(studentOptional.isPresent()){
            studentRepo.deleteById(studentId);
            return studentId;
        }
        throw new StudentException("Student can not be deleted, given id does not exist");
    }

    @Override
    public Student getStudent(Integer studentId) {
        Optional<Student> studentOptional = studentRepo.findById(studentId);
        if(studentOptional.isPresent()){

            return studentOptional.get();
        }
        throw new StudentException("Student can not be fetched, given id does not exist");
    }


    public List<Student> getStudentByCourse(Integer courseId) {
        Optional<Course> courseOptional = courseRepo.findById(courseId);

        if(courseOptional.isPresent()){

            Course course = courseOptional.get();
            return course.getStudents();

        }
        throw new StudentException("Student can not be fetched, given id does not exist");
    }

    @Override
    public void enrollInCourse(Integer studentId, Integer courseId) {


            Optional<Student> optionalStudent = studentRepo.findById(studentId);
            Optional<Course> optionalCourse = courseRepo.findById(courseId);

            if (optionalStudent.isPresent() && optionalCourse.isPresent()) {
                Student student = optionalStudent.get();
                Course course = optionalCourse.get();

                // Check if the student is not already enrolled in the course
                if (!student.getCourses().contains(course)) {
                    // Enroll the student for the course
                    student.getCourses().add(course);
                    studentRepo.save(student);

                    // Ensure that the course also knows about the student
                    course.getStudents().add(student);
                    courseRepo.save(course);
                } else {
                    // Handle case where the student is already enrolled in the course
                    throw new RuntimeException("Student is already enrolled in the course");
                }
            } else {
                // Handle case where student or course is not found
                throw new RuntimeException("Student or course not found");
            }
        }



}
