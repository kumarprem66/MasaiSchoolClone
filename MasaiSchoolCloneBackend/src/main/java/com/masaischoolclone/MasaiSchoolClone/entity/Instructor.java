package com.masaischoolclone.MasaiSchoolClone.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 6, message = "Password must be at least 6 characters long")
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
