package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;

import java.util.List;
import java.util.Set;

public interface AnnounceService {

    Announcement announceCreate(Integer departId,Integer courseId,Announcement announcement);

    Set<Announcement> announceListOfCourse(Integer courseId);
    List<Announcement> announceList();
    Set<Announcement> announceListOfDepartAndCourse(Integer courseId,Integer departmentId);
    Set<Announcement> announceListOfDepart(Integer departmentId);

    Announcement announceUpdate(Integer announceId,Announcement announcement);

    int announceDelete(Integer announceId);
}
