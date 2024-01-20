package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.dto.InstructorDTO;
import com.masaischoolclone.MasaiSchoolClone.entity.*;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.exception.CategoryException;
import com.masaischoolclone.MasaiSchoolClone.exception.InstructorException;
import com.masaischoolclone.MasaiSchoolClone.exception.InstructorException;
import com.masaischoolclone.MasaiSchoolClone.repository.DepartmentRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.InstructorRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.UserRepo;
import com.masaischoolclone.MasaiSchoolClone.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class InstructorServiceImpl implements InstructorService {
    
    @Autowired
    private InstructorRepo instructorRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DepartmentRepo departmentRepo;
    
    @Override
    public Instructor createInstructor(String email,Instructor instructor,Integer departId) {

        Optional<User> userOptional = userRepo.findByEmail(email);
        Optional<Department> optionalDepartment = departmentRepo.findById(departId);
        Optional<Instructor> instructorOptional = instructorRepo.findByContactNumber(instructor.getContactNumber());
        if(instructorOptional.isPresent()){
            throw new InstructorException("Instructor Already exist with given number");
        }
        if(optionalDepartment.isPresent()){
            if(userOptional.isPresent()){
                instructor.setDepartment(optionalDepartment.get());
                instructor.setUser(userOptional.get());
                return instructorRepo.save(instructor);
            }else{
                throw new InstructorException("No User exist with given email "+email);
            }

        }else{
            throw new InstructorException("No Department exist with given id "+departId);
        }

    }

    @Override
    public List<Instructor> getInstructors() {
        
        
        return instructorRepo.findAll();
    }

    @Override
    public Instructor updateInstructor(Integer instructorId, Instructor updatedInstructor) {
        Optional<Instructor> instructorOptional = instructorRepo.findById(instructorId);
        if(instructorOptional.isPresent()){

            Instructor updatableInstructor = instructorOptional.get();

            updatableInstructor.setName(updatedInstructor.getName());
            updatableInstructor.setDepartment(updatedInstructor.getDepartment());
            updatableInstructor.setDateOfBirth(updatedInstructor.getDateOfBirth());
            updatableInstructor.setExperience(updatedInstructor.getExperience());
            updatableInstructor.setExpectedSalary(updatedInstructor.getExpectedSalary());
            updatableInstructor.setExpertise(updatedInstructor.getExpertise());
            updatableInstructor.setQualification(updatedInstructor.getQualification());
            updatableInstructor.setGender(updatedInstructor.getGender());

          updatableInstructor.setContactNumber(updatedInstructor.getContactNumber());
          updatableInstructor.setEmail(updatedInstructor.getEmail());
          updatableInstructor.setPassword(updatedInstructor.getPassword());

          return instructorRepo.save(updatableInstructor);


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

//            System.out.println("==============="+instructorOptional.get().getDepartment().getName());
//            System.out.println(instructorOptional.get());

            return instructorOptional.get();
        }
        throw new InstructorException("Instructor can not be fetched, given id does not exist");
    }


    @Override
    public Department getDepartment(Integer ins_id) {
        Optional<Instructor> instructorOptional = instructorRepo.findById(ins_id);
        if(instructorOptional.isPresent()){

            return instructorOptional.get().getDepartment();
        }
        throw new InstructorException("Instructor can not be fetched, given id does not exist");
    }

    @Override
    public Instructor getInstructorByUser(Integer userID) {

        Optional<User> optionalUser = userRepo.findById(userID);
        return optionalUser.map(user -> instructorRepo.findByUser(user)).orElse(null);

    }

    @Override
    public Set<Instructor> getAllInstructor(Integer departmentId) {
        Optional<Department> optionalDepartment = departmentRepo.findById(departmentId);
        if (optionalDepartment.isPresent()){
            return instructorRepo.findAllByDepartment(optionalDepartment.get());
        }else{
            throw new InstructorException("departmentId is not available");
        }

    }
}
