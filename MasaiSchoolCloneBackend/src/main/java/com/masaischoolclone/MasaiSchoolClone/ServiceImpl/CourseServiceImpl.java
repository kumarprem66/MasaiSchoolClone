package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Course createCourse(Integer departID,Integer ins_id,Integer categoryId,Course course) {

        Optional<Course> courseOptional = courseRepo.findByCourseName(course.getCourseName());
        Optional<Department> departOptional = departmentRepo.findById(departID);
        Optional<Category> optionalCategory = categoryRepo.findById(categoryId);
        Optional<Instructor> instructorOptional = instructorRepo.findById(ins_id);


        if(courseOptional.isPresent()){
            throw new CourseException("Course already exist with given name");
        }else{
            if(departOptional.isPresent() && optionalCategory.isPresent() && instructorOptional.isPresent()){
                course.setDepartment(departOptional.get());
                course.setCategory(optionalCategory.get());

                    course.setInstructor(instructorOptional.get());


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
    public List<Course> getSortedCourseList(String sortString,Integer pageNumber,String sortDir){
        Pageable pageable;
        if(sortString == null || sortString.equals("")){
            pageable = PageRequest.of(pageNumber-1,10);

        }else{


            Sort sort = Sort.by(sortString).ascending();

//            pageable = PageRequest.of(pageNumber,10,sort);
            pageable = PageRequest.of(pageNumber-1,10, sortDir.equals("asc") ? Sort.by(sortString). ascending() : Sort.by(sortString).descending());

        }
        Page<Course> page = courseRepo.findAll(pageable);

        return page.getContent();
    }

    @Override
    public Course updateCourse(Integer updateId, Course updatedCourse) {

        Optional<Course> courseOptional = courseRepo.findById(updateId);
        if(courseOptional.isPresent()){
            Course updatableCourse = courseOptional.get();


            updatableCourse.setCoursePrice(updatableCourse.getCoursePrice());
            updatableCourse.setCourseName(updatableCourse.getCourseName());
            updatableCourse.setCourseCode(updatedCourse.getCourseCode());
            updatableCourse.setCourseLanguage(updatedCourse.getCourseLanguage());
            updatableCourse.setDepartment(updatedCourse.getDepartment());
            updatableCourse.setInstructor(updatedCourse.getInstructor());
            updatableCourse.setCategory(updatedCourse.getCategory());
            updatableCourse.setDescription(updatedCourse.getDescription());
            updatableCourse.setDuration(updatedCourse.getDuration());
            updatableCourse.setStudentEnrolled(updatedCourse.getStudentEnrolled());
            updatableCourse.setImage(updatedCourse.getImage());
            updatableCourse.setRatingCount(updatedCourse.getRatingCount());
            updatableCourse.setIsAvailable(updatedCourse.getIsAvailable());
            updatableCourse.setRating(updatedCourse.getRating());


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
//            System.out.println(course.getInstructor());
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

    @Override
    public List<Course> getCourseList(Integer instructorId, Integer categoryId) {
        Optional<Instructor> instructorOptional = instructorRepo.findById(instructorId);
        Optional<Category> categoryOptional = categoryRepo.findById(categoryId);
        if (instructorOptional.isPresent() && categoryOptional.isPresent()){
            Instructor instructor = instructorOptional.get();
            Category category = categoryOptional.get();
//            courseRepo.findAllBycategoryAndinstructor(instructor,category);

        }
        throw new CourseException("No Course exist of given instructor id or category id..");
    }

    @Override
    public Instructor getInstructor(Integer courseId){
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if (courseOptional.isPresent()){
            Instructor instructor = courseOptional.get().getInstructor();
            return instructor;
        }

        throw new CourseException("No Course exist of given id");
    }

    @Override
    public Department getDepartment(Integer courseId){
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if (courseOptional.isPresent()){
            Department department = courseOptional.get().getDepartment();
            if(department != null){
                return department;
            }

        }

        throw new CourseException("No Department exist of given id");
    }

    @Override
    public Category getCategory(Integer courseId){
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if (courseOptional.isPresent()){
            Category category = courseOptional.get().getCategory();
            if(category != null)
             return category;
        }

        throw new CourseException("No Category exist of given id");
    }

    @Override
    public String rateCourse(Integer courseId,Integer rating){
        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if(courseOptional.isPresent()){
            Course course = courseOptional.get();
            course.setRating(course.getRating()+rating);
            course.setRatingCount(course.getRatingCount()+1);
            courseRepo.save(course);
            return course.getRatingCount()+"Thank you for the rating";
        }else{

          throw new CourseException("No Course exist of given id");
        }

    }

}
