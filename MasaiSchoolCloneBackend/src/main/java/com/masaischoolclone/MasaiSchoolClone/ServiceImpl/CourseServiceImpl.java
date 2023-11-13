package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.dto.CourseDTO;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.exception.CategoryException;
import com.masaischoolclone.MasaiSchoolClone.exception.CourseException;
import com.masaischoolclone.MasaiSchoolClone.exception.InstructorException;
import com.masaischoolclone.MasaiSchoolClone.repository.CategoryRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.InstructorRepo;
import com.masaischoolclone.MasaiSchoolClone.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private InstructorRepo instructorRepo;

    @Autowired
    private CategoryRepo categoryRepo;
    @Override
    public Course createCourse(Course course) {

        Optional<Course> courseOptional = courseRepo.findById(course.getId());
        if(courseOptional.isPresent()){
            throw new CourseException("Course already exist with given ID");
        }else{
            return courseRepo.save(course);
        }


    }

    @Override
    public List<Course> getCourseList() {


        return courseRepo.findAll();
    }

    @Override
    public Course updateCourse(Integer updateId, CourseDTO updatedCourse) {

        Optional<Course> courseOptional = courseRepo.findById(updateId);
        if(courseOptional.isPresent()){
            Course updatableCourse = courseOptional.get();
            updatableCourse.setCoursePrice(updatableCourse.getCoursePrice());
            updatableCourse.setCourseName(updatableCourse.getCourseName());
            courseRepo.save(updatableCourse);
            return updatableCourse;
        }
        throw new CourseException("Course can not be updated,given id does not exist");
    }

    @Override
    public Integer deleteCourse(Integer courseId) {
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if(courseOptional.isPresent()){
           courseRepo.deleteById(courseId);
           return courseId;
        }
        throw new CourseException("Course can not be deleted, given id does not exist");

    }

    @Override
    public Course getCourse(Integer id) {
        Optional<Course> courseOptional = courseRepo.findById(id);
        if(courseOptional.isPresent()){

            return courseOptional.get();
        }
        throw new CourseException("Course can not be fetched, given id does not exist");

    }

    @Override
    public List<Course> getInstructorCourse(Integer instructorId) {

       Optional<Instructor> instructorOptional = instructorRepo.findById(instructorId);
       if (instructorOptional.isPresent()){
           return courseRepo.findAllByInstructor(instructorOptional.get());
       }
        throw new InstructorException("No Instructor exist of given id");
    }

    @Override
    public List<Course> courseByCategory(Integer categoryId) {

        Optional<Category> categoryOptional = categoryRepo.findById(categoryId);
        if (categoryOptional.isPresent()){
            return courseRepo.findAllByCategory(categoryOptional.get());
        }
        throw new CategoryException("No Category exist of given id");

    }
}
