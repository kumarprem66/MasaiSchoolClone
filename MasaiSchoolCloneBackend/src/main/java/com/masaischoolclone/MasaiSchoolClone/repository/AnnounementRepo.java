package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface AnnounementRepo extends JpaRepository<Announcement,Integer> {


    Set<Announcement> findAllByCourse(Course course);
    Set<Announcement> findAllByDepartment(Department department);
    Set<Announcement> findAllByDepartmentAndCourse(Department department,Course course);

}
