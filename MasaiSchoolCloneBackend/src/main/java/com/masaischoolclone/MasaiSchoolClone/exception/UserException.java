package com.masaischoolclone.MasaiSchoolClone.exception;

import com.masaischoolclone.MasaiSchoolClone.entity.User;

public class UserException extends RuntimeException{

    public UserException(){

    }
    public UserException(String msg){
        super(msg);
    }

}
