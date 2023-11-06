package com.masaischoolclone.MasaiSchoolClone.repository;

import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureRepo extends JpaRepository<Lecture,Integer> {
}
