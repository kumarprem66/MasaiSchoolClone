package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface CourseRepo extends JpaRepository<Course,Integer> {


    List<Course> findAllByInstructor(Instructor instructor);

    List<Course> findAllByCategory(Category category);

    Set<Course> findAllByDepartment(Department department);


}
