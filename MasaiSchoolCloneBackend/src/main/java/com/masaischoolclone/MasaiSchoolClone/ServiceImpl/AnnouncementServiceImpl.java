package com.masaischoolclone.MasaiSchoolClone.ServiceImpl;


import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;
import com.masaischoolclone.MasaiSchoolClone.entity.Course;
import com.masaischoolclone.MasaiSchoolClone.exception.AnnouncementException;
import com.masaischoolclone.MasaiSchoolClone.exception.CourseException;
import com.masaischoolclone.MasaiSchoolClone.repository.AnnounementRepo;
import com.masaischoolclone.MasaiSchoolClone.repository.CourseRepo;
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

    @Override
    public Announcement announceCreate(Announcement announcement) {

        Optional<Announcement> optionalAnnouncement = announementRepo.findById(announcement.getAid());

        if(optionalAnnouncement.isPresent()){
            throw new AnnouncementException("Announcement is already exist with given id");
        }else{
            return announementRepo.save(announcement);
        }



    }

    @Override
    public Set<Announcement> announceList(Integer courseId) {

        Optional<Course> courseOptional = courseRepo.findById(courseId);
        if(courseOptional.isPresent()){
            return courseOptional.get().getAnnouncements();
        }else {
            throw new CourseException("Course not available with given id "+courseId);
        }

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
