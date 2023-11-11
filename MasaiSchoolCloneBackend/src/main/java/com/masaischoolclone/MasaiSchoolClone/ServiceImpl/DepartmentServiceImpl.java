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

@Service
public class DepartmentServiceImpl implements DepartmentService {


    @Autowired
    private DepartmentRepo departmentRepo;

    @Override
    public List<Department> getDepartmentList(Integer numberOfRecords) {


//       provide  number of record at a time
        Pageable p = PageRequest.of(0,numberOfRecords, Sort.by("name"));

        Page<Department> departments = departmentRepo.getAllDepartment(p);
        return departments.toList();
    }

    @Override
    public Department createDepartment(Department department) {

//        Department existing_department = departmentRepo.findByName(department.getName());

        Department department1 = departmentRepo.findByName("department");

        if(department1 == null){
            return departmentRepo.save(department);
        }else{

            throw new DepartmentException("Department already exist with this name");
        }



    }


}
