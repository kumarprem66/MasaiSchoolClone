package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentService {


    Student createdStudent(String email,Student student);

    Student loginStudent(String mob);

    List<Student> getStudentList();

    Student updateStudent(Integer studentId,Student updatedStudent);

    Integer deleteStudent(Integer id);

    Student getStudent(Integer studentId);

    void enrollInCourse(Integer studentId,Integer courseId);

}
