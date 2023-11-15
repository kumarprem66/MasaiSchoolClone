package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface AssignmentRepo extends JpaRepository<Assignment,Integer> {

    Set<Assignment> findAllByCourse(Course course);

    Set<Assignment> findAllByCourseAndLecture(Course course, Lecture lecture);




}
