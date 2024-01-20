package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/depart")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/fetch-all")
    ResponseEntity<List<Department>> getDepartmentList(){

        try {

            return ResponseEntity.ok(departmentService.getDepartmentList());
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

    @GetMapping("/get/{department_id}")
    ResponseEntity<Department> getDepartment(@PathVariable Integer department_id){
        try {

            return ResponseEntity.ok(departmentService.getDepartment(department_id));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
}
