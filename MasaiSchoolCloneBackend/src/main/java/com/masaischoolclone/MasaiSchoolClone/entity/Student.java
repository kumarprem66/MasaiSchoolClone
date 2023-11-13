package com.masaischoolclone.MasaiSchoolClone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Student{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;
    private String contactNumber;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToMany
    private Set<Course> courses;

    @OneToMany(mappedBy = "student",cascade = CascadeType.ALL)
    private Set<Submission> submissions;
}
