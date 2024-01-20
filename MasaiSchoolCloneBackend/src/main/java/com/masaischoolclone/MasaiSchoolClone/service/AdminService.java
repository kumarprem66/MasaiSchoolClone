package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Admin;

import java.util.Optional;

public interface AdminService {

    Admin getAdmin(String email);

    Admin createAdmin(Admin admin);

    Admin loginAdmin(String email,String password);
}
