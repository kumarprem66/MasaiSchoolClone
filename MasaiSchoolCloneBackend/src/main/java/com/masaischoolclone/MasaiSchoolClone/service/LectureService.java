package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Assignment;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;

import java.util.List;
import java.util.Set;

public interface LectureService {

    Lecture createLecture(Lecture lecture,Integer course_id,Integer instructor_id);

    List<Lecture> getLectures();

    Course getCourse(Integer lectureId);
    Lecture updateLecture(Integer lectureId,Lecture updatedLecture);

    Integer deleteLecture(Integer lectureId);

    Lecture getLecture(Integer id);

    Instructor getInstructor(Integer lectureId);
    List<Lecture> getLectureCourse(Integer courseId);

    List<Lecture> getInstructorLecture(Integer instructorId);
    List<Lecture> getInstructorLecture(Integer instructorId,Integer courseId);

    Set<Assignment> getLectureAssignment(Integer lectureId);

}
