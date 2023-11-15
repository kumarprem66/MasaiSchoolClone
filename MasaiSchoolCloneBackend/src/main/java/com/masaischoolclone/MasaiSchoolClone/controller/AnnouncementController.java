package com.masaischoolclone.MasaiSchoolClone.controller;

import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;
import com.masaischoolclone.MasaiSchoolClone.service.AnnounceService;
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



    @PostMapping("/create/{departId}/{courseId}")
    public ResponseEntity<String> createAnnouncement(@PathVariable Integer departId,@PathVariable Integer courseId,@RequestBody Announcement announcement){
        try {
            announceService.announceCreate(departId,courseId,announcement);
            return ResponseEntity.ok("Announcement created successfully");
        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create announcement");
        }
    }

    @GetMapping("/getAnnounce-list")
    public ResponseEntity<List<Announcement>> getAnnounceList() {
        try {

            return ResponseEntity.ok(announceService.announceList());
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);


        }
    }

    @PutMapping("/update-announce/{announceId}")
    public ResponseEntity<Announcement> announceUpdate(@PathVariable Integer announceId,@RequestBody Announcement announcement){
        try {

            Announcement announcement1 = announceService.announceUpdate(announceId,announcement);
            return new ResponseEntity<>(announcement1,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);


        }
    }

    @DeleteMapping("/delete-announce/{announceId}")
    public ResponseEntity<Integer> announceDelete(Integer announceId) {

        try {

            Integer announcement1 = announceService.announceDelete(announceId);
            return new ResponseEntity<>(announcement1,HttpStatus.OK);
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);


        }
    }
}
