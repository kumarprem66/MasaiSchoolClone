package com.masaischoolclone.MasaiSchoolClone.controller;


import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<Category> categoryCreate(@RequestBody Category category){

        try {

            return ResponseEntity.ok(categoryService.categoryCreate(category));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getCategoryList(){

        try {

            return ResponseEntity.ok(categoryService.getCategoryList());
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @GetMapping("get/{id}")
    public ResponseEntity<Category> getCategoryList(@PathVariable Integer id){

        try {

            return ResponseEntity.ok(categoryService.getCategory(id));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }


    @PutMapping("/update/{updateId}")
    public ResponseEntity<Category> updateCategory(@PathVariable Integer updateId,@RequestBody Category updatedCategory){
        try {

            return ResponseEntity.ok(categoryService.updateCategory(updateId,updatedCategory));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<Integer> deleteCategory(@PathVariable Integer categoryId){
        try {

            return ResponseEntity.ok(categoryService.deleteCategory(categoryId));
        } catch (Exception e) {

            e.printStackTrace();

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }
}
