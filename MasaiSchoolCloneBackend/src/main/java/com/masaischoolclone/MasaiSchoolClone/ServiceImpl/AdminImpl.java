package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Admin;
import com.masaischoolclone.MasaiSchoolClone.exception.EmailException;
import com.masaischoolclone.MasaiSchoolClone.repository.AdminRepo;
import com.masaischoolclone.MasaiSchoolClone.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public Admin getAdmin(String email) {
        Optional<Admin> optionalAdmin = adminRepo.findByEmail(email);
        if(optionalAdmin.isPresent()){
            return optionalAdmin.get();
        }
        throw new EmailException("Email does not exist");
    }

    @Override
    public Admin createAdmin(Admin admin) {
        Optional<Admin> optionalAdmin = adminRepo.findByEmail(admin.getEmail());
        if(optionalAdmin.isPresent()){
            throw new EmailException("Email Already exist");

        }

        return adminRepo.save(admin);
    }

    @Override
    public Admin loginAdmin(String email, String password) {
        Optional<Admin> optionalAdmin = adminRepo.findByEmail(email);
        if(optionalAdmin.isPresent()){
            if(optionalAdmin.get().getPassword().equals(password)){
                return optionalAdmin.get();
            }else{
                throw new EmailException("Password does not match");
            }

        }
        throw new EmailException("Email does not exist");
    }
}
