package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/fetch-all/{numberOfRecords}")
    ResponseEntity<List<Department>> getDepartmentList(@PathVariable Integer numberOfRecords){

        try {

            return ResponseEntity.ok(departmentService.getDepartmentList(numberOfRecords));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


    @PostMapping("/create")
    ResponseEntity<Department> createDepartment(@RequestBody Department department){
        try {

            return ResponseEntity.ok(departmentService.createDepartment(department));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
}
