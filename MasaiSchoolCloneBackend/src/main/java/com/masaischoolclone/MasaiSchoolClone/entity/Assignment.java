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
public class Assignment {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer anId;
    private String title;
    private String description;
    private String instruction;
    private Date start_date;
    private Date due_date;

    private Integer lectureId;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Submission> submissions;

}
