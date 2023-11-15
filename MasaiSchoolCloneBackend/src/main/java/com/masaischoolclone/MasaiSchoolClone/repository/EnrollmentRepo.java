package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Enrollment;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface EnrollmentRepo extends JpaRepository<Enrollment,Integer> {

    Set<Enrollment> findAllByCourse(Course course);
    Enrollment findByStudent(Student student);
}
