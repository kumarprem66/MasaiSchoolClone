package com.masaischoolclone.MasaiSchoolClone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Instructor extends User{


    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String name;

    @Temporal(TemporalType.DATE)
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
