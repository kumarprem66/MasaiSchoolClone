package com.masaischoolclone.MasaiSchoolClone.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.sql.ast.tree.expression.Summarization;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Assignment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer anId;
    private String title;
    private String description;
    private String instruction;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date dueDate;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @JsonIgnore
    @OneToMany(mappedBy = "assignment",cascade = CascadeType.ALL)
    private Set<Submission> submissions;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;



}
