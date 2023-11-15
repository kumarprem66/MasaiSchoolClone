package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

import com.masaischoolclone.MasaiSchoolClone.dto.CourseDTO;
import com.masaischoolclone.MasaiSchoolClone.entity.Category;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.entity.Instructor;
import com.masaischoolclone.MasaiSchoolClone.exception.CategoryException;
import com.masaischoolclone.MasaiSchoolClone.exception.CourseException;
import com.masaischoolclone.MasaiSchoolClone.exception.InstructorException;
import com.masaischoolclone.MasaiSchoolClone.repository.CategoryRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.DepartmentRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.InstructorRepo;
import com.masaischoolclone.MasaiSchoolClone.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private InstructorRepo instructorRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private DepartmentRepo departmentRepo;
    @Override
    public Course createCourse(Integer departID,Integer categoryId,Course course) {

        Optional<Course> courseOptional = courseRepo.findById(course.getId());
        Optional<Department> departOptional = departmentRepo.findById(departID);
        Optional<Category> optionalCategory = categoryRepo.findById(categoryId);
        if(courseOptional.isPresent()){
            throw new CourseException("Course already exist with given ID");
        }else{
            if(departOptional.isPresent() && optionalCategory.isPresent()){
                course.setDepartment(departOptional.get());
                course.setCategory(optionalCategory.get());
                return courseRepo.save(course);
            }else{
                throw new CourseException("department is not available");
            }

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
    public Course changeDepartment(Integer courseId,Integer departmentID){
        Optional<Department> departmentOptional = departmentRepo.findById(departmentID);
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if(departmentOptional.isPresent() && courseOptional.isPresent()){
            Course course = courseOptional.get();
            course.setDepartment(departmentOptional.get());
           return courseRepo.save(course);
        }else{
            throw new CourseException("department or course id is not available");
        }
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

    @Override
    public Set<Course> getAllCourses(Integer departmentId) {

        Optional<Department> departmentOptional = departmentRepo.findById(departmentId);
        if (departmentOptional.isPresent()){
            Department department = departmentOptional.get();
            return courseRepo.findAllByDepartment(department);
        }
        throw new CategoryException("No Course exist of given id");

    }

    @Override
    public String assignCourseToInstructor(Integer instructorId,Integer courseId) {

        Optional<Instructor> instructorOptional = instructorRepo.findById(instructorId);
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if (instructorOptional.isPresent() && courseOptional.isPresent()){
            Instructor instructor = instructorOptional.get();
            Course course = courseOptional.get();
            if(!instructor.getCourses().contains(course)){

                instructor.getCourses().add(course);
                instructorRepo.save(instructor);

                course.setInstructor(instructor);
                courseRepo.save(course);
                return "Instructor assigned successfully";
            }else {
                throw new CourseException("Course is already assigned with this instructor");
            }

        }
        throw new CourseException("No Course exist of given id");

    }
}
