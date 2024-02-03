package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.exception.StudentException;
import com.masaischoolclone.MasaiSchoolClone.exception.UserException;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.StudentRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.UserRepo;
import com.masaischoolclone.MasaiSchoolClone.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private UserRepo userRepo;
    
    @Override
    public Student createdStudent(String email,Student student) {
        Optional<Student> student1 = studentRepo.findByContactNumber(student.getContactNumber());

        Optional<User> userOptional = userRepo.findByEmail(email);


        if(student1.isPresent()){
            throw new StudentException("Student already exist with this number");

        }else if(userOptional.isPresent()){
            Optional<Student> studentOptional = studentRepo.findByUser(userOptional.get());
            if(studentOptional.isPresent()){
                throw new StudentException("User already registered as Student");
            }else{
                student.setUser(userOptional.get());
                student.getUser().setRole("ROLE_STUDENT");
                return studentRepo.save(student);
            }

        }else{
            throw new StudentException("Email does not exist");
        }


    }

    @Override
    public Student loginStudent(String mob) {
        Optional<Student> student1 = studentRepo.findByContactNumber(mob);




        if(student1.isPresent()){

            return student1.get();
        }else{
            throw new StudentException("Student does not exist with this number");
        }
    }

    @Override
    public List<Student> getStudentList() throws StudentException, AuthorizationServiceException {
        return studentRepo.findAll();
    }

    @Override
    public Student updateStudent(Integer studentId,Integer userId, Student updatedStudent) {
        Optional<Student> studentOptional = studentRepo.findById(studentId);
        Optional<User> userOptional = userRepo.findById(userId);
        if(userOptional.isPresent()){

            if(studentOptional.isPresent()){
                Student updatableStudent = studentOptional.get();
                updatableStudent.setUser(userOptional.get());
                updatableStudent.setName(updatedStudent.getName());
                updatableStudent.setContactNumber(updatedStudent.getContactNumber());
                updatableStudent.setDateOfBirth(updatedStudent.getDateOfBirth());

                studentRepo.save(updatableStudent);
                return updatedStudent;
            }else{
                throw new StudentException("Student can not be updated,given id does not exist");
            }





        }else{
            throw new UserException("You need to register as a user first");
        }

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
    public Student getStudentByUser(Integer userId){
        Optional<User> userOptional = userRepo.findById(userId);
        if(userOptional.isPresent()){
            Optional<Student> studentOptional = studentRepo.findByUser(userOptional.get());
            if (studentOptional.isPresent()){
                return studentOptional.get();
            }else {
                throw new StudentException("You are not registered as a Student");
            }
        }else{
            throw new UserException("User with this id "+userId + " does not exist");
        }

    }

    @Override
    public List<Course> getAllCourses(Integer studentId) {
        Optional<Student> studentOptional = studentRepo.findById(studentId);
        if(studentOptional.isPresent()){

            return studentOptional.get().getCourses();
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
