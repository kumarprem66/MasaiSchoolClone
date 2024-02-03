package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;

import java.util.List;

public interface StudentService {


    Student createdStudent(String email,Student student);

    Student loginStudent(String mob);

    List<Student> getStudentList();

    Student updateStudent(Integer studentId,Integer userId,Student updatedStudent);

    Integer deleteStudent(Integer id);

    Student getStudent(Integer studentId);

    void enrollInCourse(Integer studentId,Integer courseId);

     Student getStudentByUser(Integer userId);

     List<Course> getAllCourses(Integer studentId);

}
