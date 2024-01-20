import { Component,OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css','../header/headers.scss']
})
export class HeroSectionComponent  implements OnInit{




  constructor(private course_ser:CourseService){

  }


  ngOnInit(): void {
    
    // this.getAllCourses();
  }

  getAllCourses(searched_word:string){

   
  
    this.course_ser.getcourses().subscribe((response:any)=>{
      

      let course_names: any[] = [];

      response.forEach((element:any) => {
        course_names.push(element.courseName)
       
      });

      const isMatch = course_names.some(item => item.toLowerCase().includes(searched_word));

      if (isMatch) {
        alert('Course Available! start exloring');
        
      } else {
        alert('No Course found.');
        
      }
     
      
    
    })

  }

  searchCourse(event:any) {
    
    event.preventDefault();

    let inputValue = event.target.value;

    if(inputValue != "" || inputValue != null){
      inputValue = inputValue.toLowerCase();
      this.getAllCourses(inputValue);
    }
   
    


  }


 
}


  


  


// function searchCourse(event: Event | undefined, KeyboardEvent: { new(type: string, eventInitDict?: KeyboardEventInit | undefined): KeyboardEvent; prototype: KeyboardEvent; readonly DOM_KEY_LOCATION_STANDARD: 0; readonly DOM_KEY_LOCATION_LEFT: 1; readonly DOM_KEY_LOCATION_RIGHT: 2; readonly DOM_KEY_LOCATION_NUMPAD: 3; }) {
//   throw new Error('Function not implemented.');
// }

