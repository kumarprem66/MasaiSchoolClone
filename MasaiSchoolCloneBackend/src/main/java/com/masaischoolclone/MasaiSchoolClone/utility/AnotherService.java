package com.masaischoolclone.MasaiSchoolClone.utility;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnotherService {

    private final DepartmentService departmentService;

    @Autowired
    public AnotherService(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    public void someMethod() {
        // Create a new department

        Department newDepartment = departmentService.createDepartment(new Department("project manager"));


        // You can now work with the new department entity as needed
    }
}
