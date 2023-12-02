package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.entity.Lecture;
import com.masaischoolclone.MasaiSchoolClone.exception.CourseException;
import com.masaischoolclone.MasaiSchoolClone.exception.InstructorException;
import com.masaischoolclone.MasaiSchoolClone.exception.LectureException;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.InstructorRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.LectureRepo;
import com.masaischoolclone.MasaiSchoolClone.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Service
public class LectureServiceImpl implements LectureService {


    @Autowired
    private LectureRepo lectureRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private InstructorRepo instructorRepo;

    @Override
    public Lecture createLecture(Lecture lecture,Integer course_id,Integer instructor_id) {
        Optional<Instructor> instructorOptional = instructorRepo.findById(instructor_id);
        Optional<Course> courseOptional = courseRepo.findById(course_id);
        if(instructorOptional.isPresent() && courseOptional.isPresent()){
            lecture.setCourse(courseOptional.get());
            lecture.setInstructor(instructorOptional.get());
            return lectureRepo.save(lecture);
        }else{
            throw new LectureException("Instructor or course is not available");
        }

    }

    @Override
    public List<Lecture> getLectures() {
        return lectureRepo.findAll();
    }

    @Override
    public Lecture updateLecture(Integer lectureId, Lecture updatedLecture) {
        Optional<Lecture> lectureOptional = lectureRepo.findById(lectureId);
        if(lectureOptional.isPresent()){

            Lecture updatableLecture = lectureOptional.get();
            updatableLecture.setTiming(updatedLecture.getTiming());
            updatableLecture.setMeetingUrl(updatedLecture.getMeetingUrl());
            updatableLecture.setTopicTitle(updatedLecture.getTopicTitle());

            lectureRepo.save(updatableLecture);
            return updatableLecture;


        }
        throw new LectureException("Lecture can not be updated,given id does not exist");
    }

    @Override
    public Integer deleteLecture(Integer lectureId) {
        Optional<Lecture> lectureOptional = lectureRepo.findById(lectureId);
        if(lectureOptional.isPresent()){
            instructorRepo.deleteById(lectureId);
            return lectureId;
        }
        throw new LectureException("Lecture can not be deleted, given id does not exist");
    }

    @Override
    public Lecture getLecture(Integer id) {
        Optional<Lecture> lectureOptional = lectureRepo.findById(id);
        if(lectureOptional.isPresent()){

            return lectureOptional.get();
        }
        throw new LectureException("Instructor can not be fetched, given id does not exist");
    }

    @Override
    public List<Lecture> getLectureCourse(Integer courseId) {
        Optional<Course> optionalCourse = courseRepo.findById(courseId);

        if(optionalCourse.isPresent()){
            return lectureRepo.findAllByCourse(optionalCourse.get());
        }else{
            throw new CourseException("Course with this id is not available");
        }

    }

    @Override
    public List<Lecture> getInstructorLecture(Integer instructorId, Integer courseId) {


        Optional<Instructor> optionalInstructor = instructorRepo.findById(instructorId);
        if(optionalInstructor.isPresent()){

            Optional<Course> optionalCourse =  courseRepo.findById(courseId);
            if(optionalCourse.isPresent()){
               return lectureRepo.findAllByInstructorAndCourse(optionalInstructor.get(),optionalCourse.get());
            }else{
                throw new InstructorException("No Course found with this id");
            }

        }else{
            throw new InstructorException("No Instructor found with this id of instructor");
        }

    }
}
