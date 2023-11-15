package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.dto.InstructorDTO;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping("/create/{departId}")
    public ResponseEntity<Instructor> createInstructor(@RequestBody Instructor instructor,@PathVariable Integer departId){
        try {

            return ResponseEntity.ok(instructorService.createInstructor(instructor,departId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/fetch-all")
    public ResponseEntity<List<Instructor>> getInstructors(){
        try {

            return ResponseEntity.ok(instructorService.getInstructors());
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PutMapping("/update/{updatedInstructor}")
    public ResponseEntity<Instructor> updateInstructor(@PathVariable Integer instructorId, @RequestBody InstructorDTO updatedInstructor){

        try {

            Instructor newInstructor = instructorService.updateInstructor(instructorId,updatedInstructor);
            return ResponseEntity.ok(newInstructor);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @DeleteMapping("/delete/{insId}")
    public ResponseEntity<Integer> deleteInstructor(@PathVariable Integer insId){
        try {

            instructorService.deleteInstructor(insId);
            return new ResponseEntity<>(insId,HttpStatus.ACCEPTED);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/fetch/{id}")
    public ResponseEntity<Instructor> getInstructor(@PathVariable Integer id){
        try {

            return ResponseEntity.ok(instructorService.getInstructor(id));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

}
