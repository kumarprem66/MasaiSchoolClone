package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseService {

    Course createCourse(Course course);

    List<Course> getCourseList();

    Course updateCourse(Integer updateId,Course updatedCourse);
    Integer deleteCourse(Integer courseId);

    Course getCourse(Integer id);

    List<Course> getInstructorCourse(Integer instructorId);

    List<Course> courseByCategory(Integer categoryId);







}
