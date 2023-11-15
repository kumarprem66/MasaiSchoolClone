package com.masaischoolclone.MasaiSchoolClone.service;

import com.masaischoolclone.MasaiSchoolClone.entity.Enrollment;
import com.masaischoolclone.MasaiSchoolClone.entity.Student;

public interface EnrollmentService {

     Enrollment enrollInCourse(Enrollment enrollment, Integer courseId,Integer studentId);

     Enrollment getEnrollment(Integer studentId);

}
