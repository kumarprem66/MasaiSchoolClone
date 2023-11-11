package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Announcement;

import java.util.List;
import java.util.Set;

public interface AnnounceService {

    Announcement announceCreate(Announcement announcement);

    Set<Announcement> announceList(Integer courseId);

    Announcement announceUpdate(Integer announceId,Announcement announcement);

    int announceDelete(Integer announceId);
}
