import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HeroSection2Component } from './hero-section2/hero-section2.component';
import { MyswiperComponent } from './myswiper/myswiper.component';
import { IonicModule } from '@ionic/angular';
import { HeroSection3Component } from './hero-section3/hero-section3.component';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { StudentSaysComponent } from './student-says/student-says.component';
import { CategoriesComponent } from './categories/categories.component';
import { HeroInstructorComponent } from './hero-instructor/hero-instructor.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesBannerComponent } from './courses-banner/courses-banner.component';
import { CoursesAllComponent } from './courses-all/courses-all.component';
import { ContactComponent } from './contact/contact.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TicketComponent } from './ticket/ticket.component';
import { AssignmentDetailsComponent } from './assignment-details/assignment-details.component';
import { AssignmentHeaderComponent } from './assignment-header/assignment-header.component';
import { InstructorAssignmentComponent } from './instructor-assignment/instructor-assignment.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AdminCreateAnnouncementComponent } from './admin-create-announcement/admin-create-announcement.component';
import { InstructorRegisterComponent } from './instructor-register/instructor-register.component';
import { AdminCreateLectureComponent } from './admin-create-lecture/admin-create-lecture.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { AboutComponent } from './about/about.component';
import { StudentRegsiterComponent } from './student-regsiter/student-regsiter.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroSectionComponent,
    HeroSection2Component,
    MyswiperComponent,
    HeroSection3Component,
    BestSellingComponent,
    StudentSaysComponent,
    CategoriesComponent,
    HeroInstructorComponent,
    FooterComponent,
    CoursesComponent,
    CoursesBannerComponent,
    CoursesAllComponent,
    ContactComponent,
    UserAuthComponent,
    UserRegisterComponent,
    ProfileComponent,
    StudentDashboardComponent,
    TicketComponent,
    AssignmentDetailsComponent,
    AssignmentHeaderComponent,
    InstructorAssignmentComponent,
    AddCourseComponent,
    AdminCreateAnnouncementComponent,
    InstructorRegisterComponent,
    AdminCreateLectureComponent,
    AdminDashboardComponent,
    DashboardComponent,
    AdminAuthComponent,
    CourseDetailComponent,
    AboutComponent,
    StudentRegsiterComponent,
    PaymentComponent,



    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FormsModule,
    BsDatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
    CommonModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
