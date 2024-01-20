package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.User;
import com.masaischoolclone.MasaiSchoolClone.exception.RegisterException;
import com.masaischoolclone.MasaiSchoolClone.repository.UserRepo;
import com.masaischoolclone.MasaiSchoolClone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User adduser(User user) {
        Optional<User> userOptional = userRepo.findByEmail(user.getEmail());
        Optional<User> userOptional2 = userRepo.findByusername(user.getUsername());
        if(userOptional.isPresent()){
            throw new RegisterException("User with this email already registered");
        }
        if(userOptional2.isPresent()){
            throw new RegisterException("this username is already in use try changing the username");
        }
        return userRepo.save(user);
    }

    @Override
    public User getUser(Integer user_id) {
        Optional<User> userOptional = userRepo.findById(user_id);

        if(userOptional.isPresent()){
            return userOptional.get();
        }
        throw new RegisterException("User with this email already registered");
    }
    @Override
    public User getUser(String email) {
        Optional<User> userOptional = userRepo.findByusername(email);

        if(userOptional.isPresent()){
           return userOptional.get();
        }
        throw new RegisterException("User with this email does not registered");
    }

    @Override
    public User loginUser(String email,String password) {
        Optional<User> userOptional = userRepo.findByEmail(email);

        if(userOptional.isPresent()){
            if(userOptional.get().getPassword().equals(password)){
                return userOptional.get();
            }else{

                throw new RegisterException("Wrong Password");
            }


        }else{
            throw new RegisterException("User with this email does not registered");
        }

    }
}
