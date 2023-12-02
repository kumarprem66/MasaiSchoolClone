package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface InstructorRepo extends JpaRepository<Instructor,Integer> {


    Instructor findByUser(User user);

    Set<Instructor> findAllByDepartment(Department department);

    Instructor findByEmail(String email);

    Instructor findByContactNumber(String number);
}
