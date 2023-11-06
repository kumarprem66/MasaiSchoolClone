package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstructorService {

    Instructor createInstructor(Instructor instructor);

    List<Instructor> getInstructors();

    Instructor updateInstructor(Integer instructorId,Instructor updatedInstructor);

    Integer deleteInstructor(Integer insId);

    Instructor getInstructor(Integer id);


}
