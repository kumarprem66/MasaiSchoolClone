package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;
import com.masaischoolclone.MasaiSchoolClone.service.LectureService;

import java.util.List;

public class LectureServiceImpl implements LectureService {
    @Override
    public Lecture createLecture(Lecture lecture) {
        return null;
    }

    @Override
    public List<Lecture> getLectures() {
        return null;
    }

    @Override
    public Instructor updateInstructor(Integer lectureId, Lecture updatedLecture) {
        return null;
    }

    @Override
    public Integer deleteLecture(Integer lectureId) {
        return null;
    }

    @Override
    public Instructor getLecture(Integer id) {
        return null;
    }

    @Override
    public List<Course> getLectureCourse(Integer courseId) {
        return null;
    }

    @Override
    public List<Course> getInstructorLecture(Integer instructorId, Course courseId) {
        return null;
    }
}
