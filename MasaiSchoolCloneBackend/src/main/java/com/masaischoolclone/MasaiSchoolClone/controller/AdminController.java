package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.dto.LoginDto;
import com.masaischoolclone.MasaiSchoolClone.entity.Admin;
import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.exception.RegisterException;
import com.masaischoolclone.MasaiSchoolClone.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/create")
    public ResponseEntity<Map<String,String>> createAdmin(@RequestBody Admin admin){
        try {
            adminService.createAdmin(admin);
            return ResponseEntity.ok(Map.of("message", "Admin Created Successful"));
        } catch (RegisterException e) {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/getAdmin/{email}")
    public ResponseEntity<Admin> getAdmin(@PathVariable String email) {
        try {
            Admin admin = adminService.getAdmin(email);
            return ResponseEntity.ok(admin);
        } catch (RegisterException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/login/{email}/{password}")
    ResponseEntity<Map<String,String>> loginUser(@PathVariable String email,@PathVariable String password){
        try {

            adminService.loginAdmin(email,password);

            return ResponseEntity.ok(Map.of("message", "Admin Login Successful"));
        } catch (RegisterException e) {



            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(Map.of("error", e.getMessage()));

        }
    }
}
