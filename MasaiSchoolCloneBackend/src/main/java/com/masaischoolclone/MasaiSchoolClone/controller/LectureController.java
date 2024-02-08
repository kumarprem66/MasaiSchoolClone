package com.masaischoolclone.MasaiSchoolClone.controller;


import com.masaischoolclone.MasaiSchoolClone.entity.*;
import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import com.masaischoolclone.MasaiSchoolClone.service.CourseService;
import com.masaischoolclone.MasaiSchoolClone.service.InstructorService;
import com.masaischoolclone.MasaiSchoolClone.service.LectureService;
import com.masaischoolclone.MasaiSchoolClone.utility.Common;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/lecture")
public class LectureController {

    @Autowired
    private LectureService lectureService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private InstructorService instructorService;
    @PostMapping("/create/{courseId}/{instructorId}")
    public ResponseEntity<Lecture> createLecture(@RequestBody Lecture lecture,
                                                 @PathVariable Integer courseId,
                                                 @PathVariable Integer instructorId,
                                                 HttpServletRequest request){

        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Instructor instructor = instructorService.getInstructor(instructorId);
            if(instructor.getUser().getEmail().equals(userName) || instructor.getUser().getUsername().equals(userName)){
                Lecture lecture1 = lectureService.createLecture(lecture,courseId,instructorId);
                return new ResponseEntity<>(lecture1,HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @GetMapping("/fetch-all")
    public ResponseEntity<List<Lecture>> getLectures(){

        try {

            List<Lecture> lectureList = lectureService.getLectures();
            return new ResponseEntity<>(lectureList,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PutMapping("/update/{lectureId}")
    public ResponseEntity<Lecture> updateLecture(@PathVariable Integer lectureId,@RequestBody Lecture updatedLecture,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Instructor instructor = lectureService.getInstructor(lectureId);
            User user = instructor.getUser();
            if(user.getRole().equals("ROLE_INSTRUCTOR")){
                if(instructor.getUser().getEmail().equals(userName) || instructor.getUser().getUsername().equals(userName)){
                    return new ResponseEntity<>(lectureService.updateLecture(lectureId,updatedLecture),HttpStatus.ACCEPTED);

                }else{
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            }else{
                return new ResponseEntity<>(lectureService.updateLecture(lectureId,updatedLecture),HttpStatus.ACCEPTED);

            }



        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }


    @DeleteMapping("/delete/{lectureId}")
    public ResponseEntity<Integer> deleteLecture(@PathVariable Integer lectureId,HttpServletRequest request){

        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Instructor instructor = lectureService.getInstructor(lectureId);
            User user = instructor.getUser();
            if(user.getRole().equals("ROLE_INSTRUCTOR")){
                if(instructor.getUser().getEmail().equals(userName) || instructor.getUser().getUsername().equals(userName)){
                    return new ResponseEntity<>(lectureService.deleteLecture(lectureId),HttpStatus.OK);

                }else{
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            }else{

                return new ResponseEntity<>(lectureService.deleteLecture(lectureId),HttpStatus.OK);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }


    }

    @GetMapping("/fetch/{id}")
    public ResponseEntity<Lecture> getLecture(@PathVariable Integer id){
        try {

            Lecture lecture = lectureService.getLecture(id);
            return new ResponseEntity<>(lecture,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/lecture-of-course/{courseId}")
    public ResponseEntity<List<Lecture>> getLectureCourse(@PathVariable Integer courseId){

        try {

//

            List<Lecture> lectures= lectureService.getLectureCourse(courseId);
            return new ResponseEntity<>(lectures,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/lecture-of-course-instructor/{instructorId}/{courseId}")
    public ResponseEntity<List<Lecture>> getInstructorLecture(@PathVariable Integer instructorId,
                                                              @PathVariable Integer courseId, HttpServletRequest request){

        try {

//            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
//            Instructor instructor = instructorService.getInstructor(instructorId);
//            User user = instructor.getUser();
//            System.out.println(user.getRole());
//            System.out.println(user.getUsername());
//            if(user.getRole().equals("ROLE_INSTRUCTOR")){
//                System.out.println("===================================================================================");
//                if(instructor.getUser().getEmail().equals(userName) || instructor.getUser().getUsername().equals(userName)){
//                    List<Lecture> lectures = lectureService.getInstructorLecture(instructorId,courseId);
//                    System.out.println("1==================================================================================");
//
//                    return new ResponseEntity<>(lectures,HttpStatus.OK);
//
//                }else{
//                    System.out.println("2==================================================================================");
//
//                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//                }
//            }else{
//
//                System.out.println("3==================================================================================");
//
//
//            }
            List<Lecture> lectures = lectureService.getInstructorLecture(instructorId,courseId);
            return new ResponseEntity<>(lectures,HttpStatus.OK);

        } catch (Exception e) {

            System.out.println("4==================================================================================");

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }

    @GetMapping("/course-of-lecture/{lectureId}")
    public ResponseEntity<Course> getCourseFromLecture(@PathVariable Integer lectureId){

        try {

            Course course = lectureService.getCourse(lectureId);
            return new ResponseEntity<>(course,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }

    @GetMapping("/instructor-of-lecture/{lectureId}")
    public ResponseEntity<Instructor> getInstructorByLecture(@PathVariable Integer lectureId){

        try {

            Instructor instructor = lectureService.getInstructor(lectureId);

            return new ResponseEntity<>(instructor,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }
    @GetMapping("/lecture-of-course-instructor/{instructorId}")
    public ResponseEntity<List<Lecture>> getInstructorLecture(@PathVariable Integer instructorId){

        try {

            List<Lecture> lectures = lectureService.getInstructorLecture(instructorId);

            return new ResponseEntity<>(lectures,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }
    @GetMapping("/assignment-of-lecture/{lectureId}")
    public ResponseEntity<Set<Assignment>> getAssignmentsLecture(@PathVariable Integer lectureId){

        try {

            Set<Assignment> assignments = lectureService.getLectureAssignment(lectureId);

            return new ResponseEntity<>(assignments,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }



}
