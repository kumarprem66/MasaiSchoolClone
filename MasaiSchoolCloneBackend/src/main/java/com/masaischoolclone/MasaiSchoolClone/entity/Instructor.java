package com.masaischoolclone.MasaiSchoolClone.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Instructor{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String name;

    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    private String email;
    private String contactNumber;
    private String password;
    private Integer experience;
    private String qualification;
    private String expertise;
    private String resume;
    private Integer expectedSalary;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "instructor",cascade = CascadeType.ALL)
    private Set<Course> courses;

    @JsonIgnore
    @ManyToOne
    private Department department;

    @JsonIgnore
    @OneToMany(mappedBy = "instructor",cascade = CascadeType.ALL)
    private Set<Lecture> lectures;

}
