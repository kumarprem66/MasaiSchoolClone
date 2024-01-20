package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User adduser(User user);

    User getUser(Integer user_id);

    User getUser(String email);
    User loginUser(String email,String password);
}
