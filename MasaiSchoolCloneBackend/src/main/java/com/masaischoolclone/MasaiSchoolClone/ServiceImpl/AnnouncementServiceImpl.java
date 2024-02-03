package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;


import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.exception.AnnouncementException;
import com.masaischoolclone.MasaiSchoolClone.repository.AnnounementRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.DepartmentRepo;
import com.masaischoolclone.MasaiSchoolClone.service.AnnounceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AnnouncementServiceImpl implements AnnounceService {

    @Autowired
    private AnnounementRepo announementRepo;

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private DepartmentRepo departmentRepo;

    @Override
    public Announcement announceCreate(Integer departId, Integer courseId,Announcement announcement) {



        Optional<Department> optionalDepartment = departmentRepo.findById(departId);
        Optional<Course> optionalCourse = courseRepo.findById(courseId);


            if(optionalDepartment.isPresent() && optionalCourse.isPresent()){

                Department department = optionalDepartment.get();
                Course course = optionalCourse.get();


                if(!courseRepo.findAllByDepartment(department).contains(course)){
                    throw new AnnouncementException("Course does not belongs to the department");
                }
                announcement.setCourse(optionalCourse.get());
                announcement.setDepartment(optionalDepartment.get());
                return announementRepo.save(announcement);


        }else{
                throw new AnnouncementException("Course or department does not exist");
            }



    }

    @Override
    public Set<Announcement> announceListOfCourse(Integer courseId) {
        Optional<Course> optionalCourse = courseRepo.findById(courseId);
        if(optionalCourse.isPresent()){
            Set<Announcement> announcements = announementRepo.findAllByCourse(optionalCourse.get());
            return announcements;
        }else{
            throw new AnnouncementException("Announcement with this id does not exist");
        }
    }

    @Override
    public List<Announcement> announceList() {


        return announementRepo.findAll();


    }

    @Override
    public Set<Announcement> announceListOfDepartAndCourse(Integer courseId, Integer departmentId) {
        return null;
    }

    @Override
    public Set<Announcement> announceListOfDepart(Integer departmentId) {
        return null;
    }

    @Override
    public Announcement announceUpdate(Integer announceId, Announcement announcement) {
        Optional<Announcement> optionalAnnouncement = announementRepo.findById(announceId);

        if(optionalAnnouncement.isPresent()){
            Announcement updatedAnn = optionalAnnouncement.get();
            updatedAnn.setTitle(announcement.getTitle());
            updatedAnn.setDescription(announcement.getDescription());
            updatedAnn.setPublishDate(announcement.getPublishDate());

            return announementRepo.save(updatedAnn);
        }else{
            throw new AnnouncementException("Announcement is already exist with given id");
        }
    }

    @Override
    public int announceDelete(Integer announceId) {
        Optional<Announcement> optionalAnnouncement = announementRepo.findById(announceId);

        if(optionalAnnouncement.isPresent()){
            announementRepo.deleteById(announceId);
            return announceId;
        }else{
            throw new AnnouncementException("Announcement does not exist with given id");
        }
    }
}
