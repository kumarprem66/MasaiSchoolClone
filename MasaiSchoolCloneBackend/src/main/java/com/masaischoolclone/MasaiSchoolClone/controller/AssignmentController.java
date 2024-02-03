package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.service.AssignmentService;
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

    @PostMapping("/create/{courseId}/{lectureId}")
    public ResponseEntity<Assignment> assignmentCreate(@PathVariable Integer courseId, @PathVariable Integer lectureId, @RequestBody Assignment assignment){
        try {

            Assignment assignment1 = assignmentService.assignmentCreate(courseId,lectureId,assignment);
            return new ResponseEntity<>(assignment1,HttpStatus.CREATED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/fetch-all/{courseId}")
    ResponseEntity<Set<Assignment>> getAssignmentList(@PathVariable Integer courseId){
        try {

            return ResponseEntity.ok(assignmentService.getAssignementList(courseId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/fetch-all/{courseId}/{lectureId}")
    ResponseEntity<Set<Assignment>> getAssignmentList(@PathVariable Integer courseId,@PathVariable Integer lectureId){
        try {

            return ResponseEntity.ok(assignmentService.getAssignmentList(courseId,lectureId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @PutMapping("/update/{updateId}")
    ResponseEntity<Assignment> updateAssignment(@PathVariable Integer updateId,@RequestBody Assignment updatedAssignment){
        try {

            return ResponseEntity.ok(assignmentService.updateAssignment(updateId,updatedAssignment));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }

    @DeleteMapping("/delete/{assignmentId}")
    ResponseEntity<Integer> deleteAssignment(@PathVariable Integer assignmentId){
        try {

            return ResponseEntity.ok(assignmentService.deleteAssignment(assignmentId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/fetch/{assignmentId}")
    ResponseEntity<Assignment> getAssignment(@PathVariable Integer assignmentId){
        try {

            return ResponseEntity.ok(assignmentService.getAssignment(assignmentId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
}
