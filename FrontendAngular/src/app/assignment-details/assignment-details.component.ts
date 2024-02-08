import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../services/assignment.service';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent {

  currentAssign :any
  JWTtoken:any = localStorage.getItem("masaischoolclone")
  current_user_id:any = localStorage.getItem("current_user_id")
  submissionLink:string = '';
  currentDate:Date = new Date();

  current_stu_id:number = 0;

  constructor(private route:ActivatedRoute,private assinSer:AssignmentService,
    private subSer:SubmissionService){

  }

  ngOnInit():void{

    this.route.queryParams.subscribe((params) => {
      const id = params['aid'];
      this.current_stu_id = params['sid'];
      // console.log(sid);
      // console.log(id)
      const  token = localStorage.getItem("masaischoolclone")
    
      if(token != null && id != null){

      this.getAssignment(this.current_user_id,parseInt(id),token)
        

      }
    });

    this.currentDate = new Date();
    
    

  }



  getAssignment(user_id:number,aid:number,token:string){


    this.assinSer.getAssignment(user_id,aid,token).subscribe((response:any)=>{

      this.currentAssign = response;

      console.log(response)
    },error=>{
      console.log(error);
    })

  }
  isValidGitHubUrl(url: string): boolean {
    const gitHubUrlRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
    return gitHubUrlRegex.test(url);
  }
  submitAssignment(ass_id:number){
    
   if(this.isValidGitHubUrl(this.submissionLink)){
    const submission = {
      "submissionDate":this.currentDate,
      "statusChoices":this.getStatusOfSubmission(this.current_stu_id,this.currentDate,this.JWTtoken),
      "remarks": this.submissionLink
    }

    this.assignemntSubmission(this.current_stu_id,ass_id,this.JWTtoken,submission)
   }else{
    alert("please provode the valid url")
   }
  }


  getStatusOfSubmission(assign_id:number,curr_date:Date,token:string):string{

    let str:string= "LATE"


    if(this.currentAssign.dueDate<curr_date){

      str =  "GRADED"
    }else{
      str = "SUBMITTED"
    }
   

    return str;

  }
  assignemntSubmission(stu_id:number,
    assign_id:number,token:string,data:any){

      this.subSer.createSubmission(stu_id,assign_id,token,data).subscribe(response=>{
        

        alert("Your submission is "+response.statusChoices)
      },error=>{
        alert("error occured")
        console.log(error)
      })

    }

 

}
