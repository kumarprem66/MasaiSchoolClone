package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import com.masaischoolclone.MasaiSchoolClone.service.AssignmentService;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import com.masaischoolclone.MasaiSchoolClone.utility.Common;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/assignment")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/create/{userId}/{courseId}/{lectureId}")
    public ResponseEntity<Assignment> assignmentCreate(@PathVariable Integer userId,@PathVariable Integer courseId,
                                                       @PathVariable Integer lectureId,
                                                       @RequestBody Assignment assignment,
    HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                Assignment assignment1 = assignmentService.assignmentCreate(courseId,lectureId,assignment);
                return new ResponseEntity<>(assignment1,HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/fetch-all/{userId}/{courseId}")
    ResponseEntity<Set<Assignment>> getAssignmentList(@PathVariable Integer userId,
                                                      @PathVariable Integer courseId,
                                                      HttpServletRequest request){
//        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return ResponseEntity.ok(assignmentService.getAssignementList(courseId));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }


//        } catch (Exception e) {
//
//            e.printStackTrace();
//
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//
//        }
    }

    @GetMapping("/fetch-all/{userId}/{courseId}/{lectureId}")
    ResponseEntity<Set<Assignment>> getAssignmentListL(@PathVariable Integer userId,
                                                       @PathVariable Integer courseId,
                                                       @PathVariable Integer lectureId,
                                                       HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return ResponseEntity.ok(assignmentService.getAssignmentList(courseId,lectureId));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @PutMapping("/update/{userId}/{updateId}")
    ResponseEntity<Assignment> updateAssignment(@PathVariable Integer userId,@PathVariable Integer updateId,
                                                @RequestBody Assignment updatedAssignment,
                                                HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return ResponseEntity.ok(assignmentService.updateAssignment(updateId,updatedAssignment));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }


        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }

    @DeleteMapping("/delete/{userId}/{assignmentId}")
    ResponseEntity<Integer> deleteAssignment(@PathVariable Integer userId,@PathVariable Integer assignmentId,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return ResponseEntity.ok(assignmentService.deleteAssignment(assignmentId));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/fetch/{userId}/{assignmentId}")
    ResponseEntity<Assignment> getAssignment(@PathVariable Integer userId,@PathVariable Integer assignmentId,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return ResponseEntity.ok(assignmentService.getAssignment(assignmentId));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
}
