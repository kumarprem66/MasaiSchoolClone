package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService courseService;
    @PostMapping("/create/{departID}/{ins_id}/{categoryId}")
    public ResponseEntity<Course> createCourse(@PathVariable Integer departID,@PathVariable Integer ins_id,@PathVariable Integer categoryId,@RequestBody Course course){
        try {

            return ResponseEntity.ok(courseService.createCourse(departID,ins_id,categoryId,course));
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
    @GetMapping("/fetch-all-sorted/{pageNumber}/{sortingStr}/{sortDir}")
    public ResponseEntity<List<Course>> getCourseListPage(@PathVariable Integer pageNumber,
                                                          @PathVariable String sortingStr,
                                                          @PathVariable String sortDir){

        try {

            System.out.println("called bro");
            return ResponseEntity.ok(courseService.getSortedCourseList(sortingStr,pageNumber,sortDir));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PutMapping("/update/{updateId}")
    ResponseEntity<Course> updateCourse(@PathVariable Integer updateId, @RequestBody Course updatedCourse){
        try {

            return ResponseEntity.ok(courseService.updateCourse(updateId,updatedCourse));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }


    @PutMapping("/update-depart/{departId}/{courseId}")
    public ResponseEntity<Course> changeDepartment(@PathVariable Integer departId,@PathVariable Integer courseId){
        try {

            return ResponseEntity.ok(courseService.changeDepartment(courseId,departId));
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

    @GetMapping("fetch/{courseId}")
    public ResponseEntity<Course> getCourse(@PathVariable Integer courseId){
        try {

            return ResponseEntity.ok(courseService.getCourse(courseId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
    @GetMapping("fetch-all/{departmentID}")
    public ResponseEntity<Set<Course>> getCourseOfDepartment(@PathVariable Integer departmentID){
        try {

            return ResponseEntity.ok(courseService.getAllCourses(departmentID));
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

    @GetMapping("/course-by-category-and-instructor")
    public ResponseEntity<List<Course>> courseByCategory(@RequestParam Integer categoryId,@RequestParam Integer instructorId){

        try {

            return ResponseEntity.ok(courseService.getCourseList(instructorId,categoryId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }

    @PutMapping("/assign-to-instructor/{instructorId}/{courseId}")
    public ResponseEntity<String> assignCourseToInstructor(@PathVariable Integer instructorId,@PathVariable Integer courseId){
        try {

            return ResponseEntity.ok(courseService.assignCourseToInstructor(instructorId,courseId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/get-inst/{courseId}")
    public ResponseEntity<Instructor> getCourseInstructor(@PathVariable Integer courseId){
        try {

            return ResponseEntity.ok(courseService.getInstructor(courseId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/get-cat/{courseId}")
    public ResponseEntity<Category> getCourseCategory(@PathVariable Integer courseId){
        try {

            return ResponseEntity.ok(courseService.getCategory(courseId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/get-dept/{courseId}")
    public ResponseEntity<Department> getCourseDepartment(@PathVariable Integer courseId){
        try {

            return ResponseEntity.ok(courseService.getDepartment(courseId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/rate/{courseId}/{rating}")
    public ResponseEntity<Map<String,String>> rateCourse(@PathVariable Integer courseId,@PathVariable Integer rating){
        try {


            return ResponseEntity.ok(Map.of("message",courseService.rateCourse(courseId,rating)));
        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error",e.getMessage()));

        }
    }
}
