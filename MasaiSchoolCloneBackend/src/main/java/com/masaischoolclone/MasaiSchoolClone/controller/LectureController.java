package com.masaischoolclone.MasaiSchoolClone.controller;


import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;
import com.masaischoolclone.MasaiSchoolClone.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lecture")
public class LectureController {

    @Autowired
    private LectureService lectureService;

    @PostMapping("/create/{courseId}/{instructorId}")
    public ResponseEntity<Lecture> createLecture(@RequestBody Lecture lecture,@PathVariable Integer courseId,@PathVariable Integer instructorId){

        try {

            return new ResponseEntity<>(lectureService.createLecture(lecture,courseId,instructorId),HttpStatus.CREATED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @GetMapping("/fetch-all")
    public ResponseEntity<List<Lecture>> getLectures(){

        try {

            return new ResponseEntity<>(lectureService.getLectures(),HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PutMapping("/update/{lectureId}")
    public ResponseEntity<Lecture> updateLecture(@PathVariable Integer lectureId,@RequestBody Lecture updatedLecture){
        try {

            return new ResponseEntity<>(lectureService.updateLecture(lectureId,updatedLecture),HttpStatus.ACCEPTED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }


    @DeleteMapping("/delete/{lectureId}")
    public ResponseEntity<Integer> deleteLecture(@PathVariable Integer lectureId){

        try {

            return new ResponseEntity<>(lectureService.deleteLecture(lectureId),HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }


    }

    @GetMapping("/fetch/{id}")
    public ResponseEntity<Lecture> getLecture(@PathVariable Integer id){
        try {

            return new ResponseEntity<>(lectureService.getLecture(id),HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/lecture-of-course/{courseId}")
    public ResponseEntity<List<Lecture>> getLectureCourse(@PathVariable Integer courseId){

        try {

            return new ResponseEntity<>(lectureService.getLectureCourse(courseId),HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/lecture-of-course-instructor/{instructorId}/{courseId}")
    public ResponseEntity<List<Lecture>> getInstructorLecture(@PathVariable Integer instructorId,@PathVariable Integer courseId){

        try {

            return new ResponseEntity<>(lectureService.getInstructorLecture(instructorId,courseId),HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }

}
