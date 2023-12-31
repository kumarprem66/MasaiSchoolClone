package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LectureRepo extends JpaRepository<Lecture,Integer> {


    List<Lecture> findAllByCourse(Course course);
//    Optional<Lecture> findByCourse(Course course);

    List<Lecture> findAllByInstructor(Instructor instructor);

    List<Lecture> findAllByInstructorAndCourse(Instructor instructor, Course course);


}
