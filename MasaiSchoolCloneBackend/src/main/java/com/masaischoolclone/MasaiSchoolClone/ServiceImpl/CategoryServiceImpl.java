package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.exception.CategoryException;
import com.masaischoolclone.MasaiSchoolClone.exception.CategoryException;
import com.masaischoolclone.MasaiSchoolClone.repository.CategoryRepo;
import com.masaischoolclone.MasaiSchoolClone.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    
    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public Category categoryCreate(Category category) {
        Optional<Category> category1 = categoryRepo.findById(category.getCid());

        if(category1.isPresent()){
            throw new CategoryException("Category already exist with this name");

        }else{
            return categoryRepo.save(category);

        }
    }

    @Override
    public List<Category> getCategoryList() {

        return categoryRepo.findAll();
    }

    @Override
    public Category updateCategory(Integer updateId, Category updatedCategory) {
        Optional<Category> categoryOptional = categoryRepo.findById(updateId);
        if(categoryOptional.isPresent()){

            Category updatableCategory = categoryOptional.get();
            updatableCategory.setName(updatedCategory.getName());


            categoryRepo.save(updatableCategory);
            return updatableCategory;


        }
        throw new CategoryException("Category can not be updated,given id does not exist");
    }

    @Override
    public Integer deleteCategory(Integer categoryId) {
        Optional<Category> categoryOptional = categoryRepo.findById(categoryId);
        if(categoryOptional.isPresent()){
            categoryRepo.deleteById(categoryId);
            return categoryId;
        }
        throw new CategoryException("Category can not be deleted, given id does not exist");
    }
}
