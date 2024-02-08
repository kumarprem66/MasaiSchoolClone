package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @PostMapping("/create")
//    public ResponseEntity<Map<String,String>> createAdmin(@RequestBody Admin admin){
//        try {
//            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
//            admin.setRole("ROLE_ADMIN");
//            adminService.createAdmin(admin);
//            return ResponseEntity.ok(Map.of("message", "Admin Created Successful"));
//        } catch (RegisterException e) {
//            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(Map.of("error", e.getMessage()));
//        }
//    }
//
//    @GetMapping("/getAdmin/{email}")
//    public ResponseEntity<Admin> getAdmin(@PathVariable String email) {
//        try {
//            Admin admin = adminService.getAdmin(email);
//            return ResponseEntity.ok(admin);
//        } catch (RegisterException e) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @GetMapping("/login/{email}/{password}")
//    ResponseEntity<Map<String,String>> loginUser(@PathVariable String email,@PathVariable String password){
//        try {
//
//            adminService.loginAdmin(email,password);
//
//            return ResponseEntity.ok(Map.of("message", "Admin Login Successful"));
//        } catch (RegisterException e) {
//
//
//
//            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(Map.of("error", e.getMessage()));
//
//        }
//    }
}
