package com.masaischoolclone.MasaiSchoolClone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String courseCode;
    private String courseName;
    private String duration;
    private Integer rating;
    private String image;
    private Boolean isAvailable;
    private String description;
    private Integer coursePrice;
    private Integer ratingCount;
    private String courseLanguage;
    private Integer studentEnrolled;


    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToMany(mappedBy = "courses",cascade = CascadeType.ALL)
    private Set<Student> students;

    @OneToMany(mappedBy = "course",cascade = CascadeType.ALL)
    private Set<Announcement> announcements;

    @OneToMany(mappedBy = "course",cascade = CascadeType.ALL)
    private Set<Assignment> assignments;

    @OneToMany(mappedBy = "course")
    private List<Lecture> lectures;

}
