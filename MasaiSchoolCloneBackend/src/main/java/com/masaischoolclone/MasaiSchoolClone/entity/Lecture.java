package com.masaischoolclone.MasaiSchoolClone.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Lecture {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
//    private String courseName;
    private String topicTitle;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timing;

    @URL(message = "Enter valid url")
    private String meetingUrl;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;

//    @JsonIgnore
//    @OneToMany(mappedBy = "lecture",cascade = CascadeType.ALL)
//    private Set<Submission> submissions;

    @JsonIgnore
    @OneToMany(mappedBy = "lecture",cascade = CascadeType.ALL)
    private Set<Assignment> assignments;
}
