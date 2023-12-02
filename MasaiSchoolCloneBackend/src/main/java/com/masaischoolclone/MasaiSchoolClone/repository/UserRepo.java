package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {

    User findByusername(String username);

    User findByEmail(String email);
}
