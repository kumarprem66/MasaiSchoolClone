import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent {

  currentAssign :any

  constructor(private route:ActivatedRoute,private assinSer:AssignmentService){

  }

  ngOnInit():void{

    this.route.queryParams.subscribe((params) => {
      const id = params['aid'];
      console.log(id);
      const  token = localStorage.getItem("masaischoolclone")
    
      if(token != null && id != null){

      this.getAssignment(parseInt(id),token)
        

      }
    });

    
    

  }



  getAssignment(aid:number,token:string){


    this.assinSer.getAssignment(aid,token).subscribe((response:any)=>{

      this.currentAssign = response;
    },error=>{
      console.log(error);
    })

  }

 

}
