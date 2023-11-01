package com.masaischoolclone.MasaiSchoolClone.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Instructor {


    private User user;
    private Gender gender;
    private String name;
    private Date date_of_birth;
    private String email;
    private String contact_number;
    private String password;
    private Integer experience;
    private String Qualification;
    private String expertise;
    private String resume;
    private Integer expected_salary;

    @OneToMany(mappedBy = "instructor",cascade = CascadeType.ALL)
    private Set<Course> courses;

    @ManyToOne
    private Department department;

}
