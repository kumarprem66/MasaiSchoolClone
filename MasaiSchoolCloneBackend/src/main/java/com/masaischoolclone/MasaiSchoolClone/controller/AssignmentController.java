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

    @PostMapping("/create")
    public ResponseEntity<String> assignmentCreate(@RequestBody Assignment assignment){
        try {
            assignmentService.assignmentCreate(assignment);
            return ResponseEntity.ok("Announcement created successfully");
        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create announcement");
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

    @PutMapping("/update/{updateId}")
    ResponseEntity<Assignment> updateAssignment(@PathVariable Integer updateId,@RequestBody Assignment updatedAssignment){
        try {

            return ResponseEntity.ok(assignmentService.updateAssignment(updateId,updatedAssignment));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

    }

    @PutMapping("/delete/{assignmentId}")
    ResponseEntity<Integer> deleteAssignment(@PathVariable Integer assignmentId){
        try {

            return ResponseEntity.ok(assignmentService.deleteAssignment(assignmentId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
}
