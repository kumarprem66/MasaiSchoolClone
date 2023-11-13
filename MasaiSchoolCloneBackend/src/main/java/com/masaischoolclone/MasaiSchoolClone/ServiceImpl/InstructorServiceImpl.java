package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.dto.InstructorDTO;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.exception.CategoryException;
import com.masaischoolclone.MasaiSchoolClone.exception.InstructorException;
import com.masaischoolclone.MasaiSchoolClone.exception.InstructorException;
import com.masaischoolclone.MasaiSchoolClone.repository.InstructorRepo;
import com.masaischoolclone.MasaiSchoolClone.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorServiceImpl implements InstructorService {
    
    @Autowired
    private InstructorRepo instructorRepo;
    
    @Override
    public Instructor createInstructor(Instructor instructor) {
        Optional<Instructor> instructor1 = instructorRepo.findById(instructor.getId());

        if(instructor1.isPresent()){
            throw new InstructorException("Instructor already exist with this name");
        }else{
            return instructorRepo.save(instructor);
            
        }
    }

    @Override
    public List<Instructor> getInstructors() {
        
        
        return instructorRepo.findAll();
    }

    @Override
    public Instructor updateInstructor(Integer instructorId, InstructorDTO updatedInstructor) {
        Optional<Instructor> instructorOptional = instructorRepo.findById(instructorId);
        if(instructorOptional.isPresent()){

            Instructor updatableInstructor = instructorOptional.get();
          updatableInstructor.setContactNumber(updatedInstructor.getContactNumber());
          updatableInstructor.setEmail(updatedInstructor.getEmail());
          updatableInstructor.setPassword(updatedInstructor.getPassword());

          return updatableInstructor;


        }
        throw new InstructorException("Instructor can not be updated,given id does not exist");
    }

    @Override
    public Integer deleteInstructor(Integer instructorId) {
        Optional<Instructor> instructorOptional = instructorRepo.findById(instructorId);
        if(instructorOptional.isPresent()){
            instructorRepo.deleteById(instructorId);
            return instructorId;
        }
        throw new InstructorException("Instructor can not be deleted, given id does not exist");
    }

    @Override
    public Instructor getInstructor(Integer id) {
        Optional<Instructor> instructorOptional = instructorRepo.findById(id);
        if(instructorOptional.isPresent()){

            return instructorOptional.get();
        }
        throw new InstructorException("Instructor can not be fetched, given id does not exist");
    }
}
