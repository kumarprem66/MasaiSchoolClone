package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;

import java.util.List;

public interface AnnouncementService {

    Announcement announceCreate(Announcement announcement);

    List<Announcement> announceList();

    Announcement announceUpdate(Integer announceId,Announcement announcement);

    int announceDelete(Integer announceId);


}
