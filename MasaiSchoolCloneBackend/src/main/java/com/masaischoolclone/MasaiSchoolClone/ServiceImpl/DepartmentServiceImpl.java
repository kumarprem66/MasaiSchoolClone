package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.exception.DepartmentException;
import com.masaischoolclone.MasaiSchoolClone.repository.DepartmentRepo;
import com.masaischoolclone.MasaiSchoolClone.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentServiceImpl implements DepartmentService {


    @Autowired
    private DepartmentRepo departmentRepo;

    @Override
    public List<Department> getDepartmentList() {


//       provide  number of record at a time
//        Pageable p = PageRequest.of(0,numberOfRecords, Sort.by("name"));
//
//        Page<Department> departments = departmentRepo.getAllDepartment(p);
        return departmentRepo.getAllDepartment();
    }

    @Override
    public Department createDepartment(Department department) {

//        Department existing_department = departmentRepo.findByName(department.getName());

        Department department1 = departmentRepo.findByName(department.getName());

        if(department1 == null){
            department1.setRole("ROLE_ADMIN");
            return departmentRepo.save(department);
        }else{

            throw new DepartmentException("Department already exist with this name");
        }



    }

    @Override
    public Department getDepartment(Integer id) {
        Optional<Department> department1 = departmentRepo.findById(id);

        if(department1.isPresent()){
            return department1.get();
        }else{

            throw new DepartmentException("Department does not exist with this id");
        }
    }
}
