package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;

import java.util.List;

public interface CategoryService {


    Category categoryCreate(Category category);

    List<Category> getCategoryList();

    Category updateCategory(Integer updateId,Category updatedCategory);

    Integer deleteCategory(Integer categoryId);

    Category getCategory(Integer id);
}
