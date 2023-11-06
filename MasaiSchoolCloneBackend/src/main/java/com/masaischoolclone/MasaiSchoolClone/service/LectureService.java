package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureService {

    Lecture createLecture(Lecture lecture);

    List<Lecture> getLectures();

    Instructor updateInstructor(Integer lectureId,Lecture updatedLecture);

    Integer deleteLecture(Integer lectureId);

    Instructor getLecture(Integer id);

    List<Course> getLectureCourse(Integer courseId);

    List<Course> getInstructorLecture(Integer instructorId,Course courseId);

}
