package com.masaischoolclone.MasaiSchoolClone.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date submissionDate;

    @Enumerated(EnumType.STRING)
    private Status statusChoices;

    @NotNull
    @NotEmpty
    private String remarks;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name = "lecture_id")
//    private Lecture lecture;


}
