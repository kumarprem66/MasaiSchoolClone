package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.exception.RegisterException;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import jakarta.validation.Valid;
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
    ResponseEntity<Map<String,String>> registerUser(@Valid @RequestBody User user){

        try {

            userService.adduser(user);

            return ResponseEntity.ok(Map.of("message", "Registration Successful"));
        } catch (RegisterException e) {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/login/{email}/{password}")
    ResponseEntity<Map<String,String>> loginUser(@PathVariable String email,@PathVariable String password){
        try {

            userService.loginUser(email,password);
            return  ResponseEntity.ok(Map.of("message","Login Successful"));

        } catch (RegisterException e) {


            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));


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

    @GetMapping("/get_user_id/{uid}")
    ResponseEntity<User> getUserById(@PathVariable Integer uid){
        try {

            return new ResponseEntity<>(userService.getUser(uid), HttpStatus.ACCEPTED);
        } catch (RegisterException e) {


            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }



}
