package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.exception.RegisterException;
import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import com.masaischoolclone.MasaiSchoolClone.utility.Common;
import jakarta.servlet.http.HttpServletRequest;
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

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    ResponseEntity<Map<String,String>> registerUser(@Valid @RequestBody User user){

        try {

            userService.adduser(user);

            return ResponseEntity.ok(Map.of("message", "Registration Successful"));
        } catch (RegisterException e) {
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(Map.of("error", e.getMessage()));
        }
    }


    @GetMapping("/get_user/{email}")
    ResponseEntity<User> getUser(@PathVariable String email,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(email);

            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
            }else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (RegisterException e) {


            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping("/get_user_id/{uid}")
    ResponseEntity<User> getUserById(@PathVariable Integer uid, HttpServletRequest request){
        try {


            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(uid);

            if(user.getUsername().equals(userName)){
                return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
            }else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (RegisterException e) {


            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        }
    }





}
