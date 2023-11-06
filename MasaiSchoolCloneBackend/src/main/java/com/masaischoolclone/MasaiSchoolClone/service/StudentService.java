package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentService {


    Student getStudent(Student student);

    List<Student> getStudentList();

    Student updateStudent(Integer studentId,Student updatedStudent);

    Integer deleteStudent(Integer id);

    Student getStudent(Integer studentId);
    
    void addCourseToStudent(Integer studentId,Integer courseId);

}
