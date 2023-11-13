package com.masaischoolclone.MasaiSchoolClone.exception;

import com.masaischoolclone.MasaiSchoolClone.repository.CategoryRepo;

public class CategoryException extends RuntimeException{

    public CategoryException(String message){
        super(message);
    }
}
