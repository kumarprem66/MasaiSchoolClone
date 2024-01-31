import { Injectable } from '@angular/core';
import { StudentService } from './services/student.service';
import { LecturesService } from './services/lectures.service';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { AssignmentService } from './services/assignment.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  

  constructor(private stu_ser:StudentService,private lec_ser:LecturesService,private assign_ser:AssignmentService) { 

  }


  // getStudentByUserId(id:number,token:string) : any[]{
  //   this.stu_ser.fetchStuentByUserId(id,token).subscribe((response:any)=>{

  //     let courseIds:number = response.body.id;

  //     this.getCoursesOfStudent(courseIds, token).subscribe((courses: number[]) => {
     
  //       let assignList:any[] = [];

  //       courses.forEach(element => {
          
  //         console.log(element)
        
  //         this.assign_ser.getAllAssignment(element,token).subscribe((response:any)=>{
            
        
  
  //           response.forEach((element:any) => {
              
  //             assignList.push(element)
  //           });

           
           
          
  //         })
  
  //       });

  //       return assignList;
  //     });
  
     

  //   })
  // }

  // getCoursesOfStudent(id:number,token:string):Observable<number[]>{

  //   return this.stu_ser.getCoursesOfStudent(id, token).pipe(
  //     map((response: any) => {
  //       let courses: number[] = [];
  //       if (response.body.length > 0) {
  //         response.body.forEach((element: any) => {
            
  //           courses.push(element.id);
  //         });
  //       }
  //       return courses;
  //     })
  //   );
  
  // }


  // getALLAssignmentOfStudent(userId:number,token:string):any[]{
    
  //   return this.getStudentByUserId(userId,token);

   
  // }


  getStudentByUserId(id: number, token: string): Observable<any[]> {
    return this.stu_ser.fetchStuentByUserId(id, token).pipe(
      switchMap((response: any) => {
        const courseIds: number = response.body.id;
  
        return this.getCoursesOfStudent(courseIds, token).pipe(
          switchMap((courses: number[]) => {
            const assignList: any[] = [];
  
            const assignmentObservables = courses.map(element => {
              return this.assign_ser.getAllAssignment(element, token);
            });
  
            return forkJoin(assignmentObservables).pipe(
              tap((responses: any) => {
                responses.forEach((response: any) => {
                  assignList.push(...response);
                });
              }),
              map(() => assignList)
            );
          })
        );
      })
    );
  }
  
  getCoursesOfStudent(id: number, token: string): Observable<number[]> {
    return this.stu_ser.getCoursesOfStudent(id, token).pipe(
      map((response: any) => {
        let courses: number[] = [];
        if (response.body.length > 0) {
          courses = response.body.map((element: any) => element.id);
        }
        return courses;
      })
    );
  }
  
  getALLAssignmentOfStudent(userId: number, token: string): Observable<any[]> {
    return this.getStudentByUserId(userId, token);
  }
  

}
