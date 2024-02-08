package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import com.masaischoolclone.MasaiSchoolClone.service.AnnounceService;
import com.masaischoolclone.MasaiSchoolClone.service.CourseService;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import com.masaischoolclone.MasaiSchoolClone.utility.Common;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/announce")
public class AnnouncementController {

    @Autowired
    private AnnounceService announceService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @PostMapping("/create/{userId}/{departId}/{courseId}")
    public ResponseEntity<Announcement> createAnnouncement(@PathVariable Integer userId, @PathVariable Integer departId,
                                                           @PathVariable Integer courseId, @RequestBody Announcement announcement, HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                Announcement announcement1 = announceService.announceCreate(departId,courseId,announcement);
                return new ResponseEntity<>(announcement1,HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAnnounce-list/{userId}")
    public ResponseEntity<List<Announcement>> getAnnounceList(@PathVariable Integer userId,HttpServletRequest request) {
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return ResponseEntity.ok(announceService.announceList());
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }


        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);


        }
    }
    @GetMapping("/getAnnounce-list-of-course/{userId}/{courseId}")
    public ResponseEntity<Set<Announcement>> getAnnounceList(@PathVariable Integer userId,@PathVariable Integer courseId,HttpServletRequest request) {
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                return ResponseEntity.ok(announceService.announceListOfCourse(courseId));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);


        }
    }

    @PutMapping("/update-announce/{userId}/{announceId}")
    public ResponseEntity<Announcement> announceUpdate(@PathVariable Integer userId,@PathVariable Integer announceId,
                                                       @RequestBody Announcement announcement,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                Announcement announcement1 = announceService.announceUpdate(announceId,announcement);
                return new ResponseEntity<>(announcement1,HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);


        }
    }

    @DeleteMapping("/delete-announce/{userId}/{announceId}")
    public ResponseEntity<Integer> announceDelete(@PathVariable Integer userId,@PathVariable Integer announceId,HttpServletRequest request) {

        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(userId);
            if(user.getUsername().equals(userName) || user.getEmail().equals(userName)){
                Integer announcement1 = announceService.announceDelete(announceId);
                return new ResponseEntity<>(announcement1,HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);


        }
    }
}
