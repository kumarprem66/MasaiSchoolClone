import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
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
import { StudentLoginComponent } from './student-login/student-login.component';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChatbotComponent } from './chatbot/chatbot.component';

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
    StudentLoginComponent,
    RatingDialogComponent,
    ChatbotComponent,



    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BsDatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('masaischoolclone');
        },
        allowedDomains: ['http://127.0.0.1:8088/'],
        disallowedRoutes: ['http://127.0.0.1:8088/auth/signin'],
      },
    }),
    BrowserAnimationsModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
