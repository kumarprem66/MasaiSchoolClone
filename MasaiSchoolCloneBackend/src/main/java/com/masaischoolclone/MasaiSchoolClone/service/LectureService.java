package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureService {

    Lecture createLecture(Lecture lecture,Integer course_id,Integer instructor_id);

    List<Lecture> getLectures();

    Lecture updateLecture(Integer lectureId,Lecture updatedLecture);

    Integer deleteLecture(Integer lectureId);

    Lecture getLecture(Integer id);

    List<Lecture> getLectureCourse(Integer courseId);

    List<Lecture> getInstructorLecture(Integer instructorId);
    List<Lecture> getInstructorLecture(Integer instructorId,Integer courseId);

}
