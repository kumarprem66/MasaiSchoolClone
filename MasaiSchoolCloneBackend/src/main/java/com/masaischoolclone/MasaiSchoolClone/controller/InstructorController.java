package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.security.JwtTokenProvider;
import com.masaischoolclone.MasaiSchoolClone.service.DepartmentService;
import com.masaischoolclone.MasaiSchoolClone.service.InstructorService;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import com.masaischoolclone.MasaiSchoolClone.utility.Common;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/instructor")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @PostMapping("/create/{departId}/{email}")
    public ResponseEntity<Instructor> createInstructor(@Valid @RequestBody Instructor instructor, @PathVariable Integer departId, @PathVariable String email){
        try {

            return ResponseEntity.ok(instructorService.createInstructor(email,instructor,departId));
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

    @PutMapping("/update/{instructorId}")
    public ResponseEntity<Instructor> updateInstructor(@PathVariable Integer instructorId, @RequestBody Instructor updatedInstructor){

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

    @GetMapping("/fetch/{insId}")
    public ResponseEntity<Instructor> getInstructor(@PathVariable Integer insId, HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Instructor instructor = instructorService.getInstructor(insId);
            if(instructor.getUser().getEmail().equals(userName) || instructor.getUser().getUsername().equals(userName)){
                return ResponseEntity.ok(instructorService.getInstructor(insId));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }


        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
    @GetMapping("/fetch-by-user/{uid}")
    public ResponseEntity<Instructor> getInstructorByUser(@PathVariable Integer uid,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            User user = userService.getUser(uid);
            if(user.getEmail().equals(userName) || user.getUsername().equals(userName)){
                return ResponseEntity.ok(instructorService.getInstructorByUser(uid));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
    @GetMapping("/fetch-all-byDept/{departID}")
        public ResponseEntity<Set<Instructor>> getInstructorByDepart(@PathVariable Integer departID){
        try {

            return ResponseEntity.ok(instructorService.getAllInstructor(departID));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("/get_dept/{ins_id}")
    public ResponseEntity<Department> getDepartmentByInsId(@PathVariable Integer ins_id,HttpServletRequest request){
        try {

            String userName = Common.getUserNameFromRequest(request,jwtTokenProvider);
            Instructor instructor = instructorService.getInstructor(ins_id);
            if(instructor.getUser().getEmail().equals(userName) || instructor.getUser().getUsername().equals(userName)){
                return ResponseEntity.ok(instructorService.getDepartment(ins_id));
            }else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }



        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

//    @GetMapping("/login/{email}/{password}")
//    ResponseEntity<Map<String,String>> loginUser(@PathVariable String email, @PathVariable String password){
//        try {
//
//            instructorService.loginUser(email,password);
//            return  ResponseEntity.ok(Map.of("message","Login Successful"));
//
//        } catch (RegisterException e) {
//
//
//            System.out.println(e.getMessage());
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
//
//
//        }
//
//    }
}
