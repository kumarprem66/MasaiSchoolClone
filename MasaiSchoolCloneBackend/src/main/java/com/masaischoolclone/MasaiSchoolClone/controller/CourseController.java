package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.dto.CourseDTO;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService courseService;
    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course course){
        try {

            return ResponseEntity.ok(courseService.createCourse(course));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/fetch-all")
    public ResponseEntity<List<Course>> getCourseList(){

        try {

            return ResponseEntity.ok(courseService.getCourseList());
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PostMapping("/update/{updateId}")
    ResponseEntity<Course> updateCourse(@PathVariable Integer updateId, @RequestBody CourseDTO updatedCourse){
        try {

            return ResponseEntity.ok(courseService.updateCourse(updateId,updatedCourse));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @DeleteMapping("/delete/{courseId}")
    public ResponseEntity<Integer> deleteCourse(@PathVariable Integer courseId){
        try {

            return ResponseEntity.ok(courseService.deleteCourse(courseId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("fetch/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Integer id){
        try {

            return ResponseEntity.ok(courseService.getCourse(id));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/instructor-course/{instructorId}")
    public ResponseEntity<List<Course>> getInstructorCourse(@PathVariable Integer instructorId){
        try {

            return ResponseEntity.ok(courseService.getInstructorCourse(instructorId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/course-by-category/{categoryId}")
    public ResponseEntity<List<Course>> courseByCategory(@PathVariable Integer categoryId){

        try {

            return ResponseEntity.ok(courseService.courseByCategory(categoryId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }
}
