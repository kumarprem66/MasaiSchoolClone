package com.masaischoolclone.MasaiSchoolClone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;

    @Enumerated(EnumType.STRING)
    private REASON reason;
    private String description;
    private String attachment;

    private Integer studentId;

}
