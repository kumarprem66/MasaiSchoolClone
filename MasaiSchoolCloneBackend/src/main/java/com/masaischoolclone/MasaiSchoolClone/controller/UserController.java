package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.dto.LoginDto;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.exception.RegisterException;
import com.masaischoolclone.MasaiSchoolClone.service.StudentService;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    ResponseEntity<Map<String,String>> registerUser(@RequestBody User user){
//        try {
//
//            userService.adduser(user);
//            return new ResponseEntity<>("Registration Successful", HttpStatus.CREATED);
//        } catch (RegisterException e) {
//
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.ALREADY_REPORTED);
//
//        }

        try {
            userService.adduser(user);
            return ResponseEntity.ok(Map.of("message", "Registration Successful"));
        } catch (RegisterException e) {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    ResponseEntity<User> loginUser(@RequestBody LoginDto user){
        try {

            return new ResponseEntity<>(userService.loginUser(user.getEmail(),user.getPassword()), HttpStatus.ACCEPTED);
        } catch (RegisterException e) {


            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/get_user/{email}")
    ResponseEntity<User> getUser(@PathVariable String email){
        try {

            return new ResponseEntity<>(userService.getUser(email), HttpStatus.ACCEPTED);
        } catch (RegisterException e) {


            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

}
