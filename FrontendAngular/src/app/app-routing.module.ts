import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesAllComponent } from './courses-all/courses-all.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminCreateAnnouncementComponent } from './admin-create-announcement/admin-create-announcement.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { InstructorAssignmentComponent } from './instructor-assignment/instructor-assignment.component';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketComponent } from './ticket/ticket.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCreateLectureComponent } from './admin-create-lecture/admin-create-lecture.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AboutComponent } from './about/about.component';
import { StudentRegsiterComponent } from './student-regsiter/student-regsiter.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:"login",component:UserAuthComponent},
  {path:"register",component:UserRegisterComponent},
  {path:"courses-all",component:CoursesAllComponent},
  {path:"admin-add-course",component:AddCourseComponent},
  {path:"admin-create-announcement",component:AdminCreateAnnouncementComponent},
  {path:"announcement",component:AdminCreateAnnouncementComponent},
  {path:"admin-dashboard",component:AdminDashboardComponent},
  {path:"instructor-dashboard",component:AdminDashboardComponent},
  {path:"student_dashboard",component:StudentDashboardComponent},
  {path:"admin-create-lecture",component:AdminCreateLectureComponent},
  {path:"lecture",component:AdminCreateLectureComponent},
  {path:"contact",component:ContactComponent},
  {path:"courses",component:CoursesComponent},
  {path:"instruc-assignment",component:InstructorAssignmentComponent},
  {path:"assignment",component:InstructorAssignmentComponent},
  {path:"instruc-register",component:InstructorRegisterComponent},
  {path:"profile",component:ProfileComponent},
  {path:"ticket",component:TicketComponent},
  {path:"admin-auth",component:AdminAuthComponent},
  {path:"course-detail",component:CourseDetailComponent},
  {path:"about",component:AboutComponent},
  {path:"student-register",component:StudentRegsiterComponent},
  {path:"payment",component:PaymentComponent},








  

  {path:"assignment-details",component:CoursesAllComponent},





  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
