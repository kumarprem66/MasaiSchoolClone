package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")

public class AuthenticationController {

    @Autowired
    private UserService userService;



    @GetMapping("/signin")
    public ResponseEntity<User> getLoggedInCustomerDetailsHandler(Authentication auth){


            System.out.println(auth);

            User customer= userService.getUserByUsername(auth.getName());

            return new ResponseEntity<>(customer, HttpStatus.ACCEPTED);



    }









}
