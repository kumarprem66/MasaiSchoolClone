package com.masaischoolclone.MasaiSchoolClone.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student {

    private User user;

    private String name;
    private Gender gender;
    private Date date_of_birth;
    private String contactNumber;


    @OneToMany
    private Set<Course> courses;
}
