package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.dto.InstructorDTO;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface InstructorService {

    Instructor createInstructor(Instructor instructor,Integer departId);

    List<Instructor> getInstructors();

    Instructor updateInstructor(Integer instructorId, InstructorDTO updatedInstructor);

    Integer deleteInstructor(Integer insId);

    Instructor getInstructor(Integer id);

    Instructor getInstructorByUser(Integer userID);

    Set<Instructor> getAllInstructor(Integer departmentId);

}
