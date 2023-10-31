import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementService } from '../services/announcement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create-announcement',
  templateUrl: './admin-create-announcement.component.html',
  styleUrls: ['./admin-create-announcement.component.css']
})
export class AdminCreateAnnouncementComponent implements OnInit{

  announceForm:FormGroup
  ann_list:any[] = []
  is_inst_is_stu:boolean = false

  constructor(private fb:FormBuilder,private ans:AnnouncementService,private router:Router){
    this.announceForm = this.fb.group({
      title : ['',Validators.required],
      description: ['', Validators.required],
      publish_date:['',Validators.required]
    })
  }

  ngOnInit(): void {

    const is_not_admin = localStorage.getItem("who_is_login")
    if(is_not_admin != "admin"){
      this.is_inst_is_stu = true
    }
    
    this.showAnnounces()
  }

  createAnnounce(){
    if(this.announceForm.valid){

      const annData = this.announceForm.value

      this.ans.createAnnounce(annData).subscribe((response)=>{
        alert("Announcement created")
        this.showAnnounces();
        // this.router.navigate(['admin-dashboard'])
      })

    }else{
      alert("Something is missing, please give all the details")
    }
  }


  showAnnounces(){
    this.ans.getAnnounces().subscribe((response:any)=>{
      
      const responseData = response.results;
      this.ann_list = responseData
      console.log(responseData)
    })
  }

  deleteAnnoun(id:number){

    console.log(id)
    const take_confirmation = confirm("Are you sure?")
    if(take_confirmation){

      this.ans.deleteAnnounce(id).subscribe((response)=>{

        alert("deleted")
        this.showAnnounces()
      })
    }
  
  }
}
