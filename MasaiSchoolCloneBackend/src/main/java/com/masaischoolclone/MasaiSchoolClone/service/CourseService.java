package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.dto.CourseDTO;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface CourseService {

    Course createCourse(Integer departID,Integer ins_id,Integer categoryId,Course course);

    String assignCourseToInstructor(Integer instructorId,Integer courseId);
    List<Course> getCourseList(Integer instructorId,Integer categoryId);

    List<Course> getCourseList();

    Course updateCourse(Integer updateId, Course updatedCourse);
    Integer deleteCourse(Integer courseId);

    Course getCourse(Integer id);

    List<Course> getInstructorCourse(Integer instructorId);

    Course changeDepartment(Integer courseId,Integer departmentID);
    List<Course> courseByCategory(Integer categoryId);

    Set<Course> getAllCourses(Integer departmentId);

     Instructor getInstructor(Integer courseId);

    Category getCategory(Integer courseId);

    Department getDepartment(Integer courseId);



}
