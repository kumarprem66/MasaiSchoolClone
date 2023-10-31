import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{

  ticketForm:FormGroup

  is_instructor:boolean  = true
  list_ticket:any[] = []

  constructor(private tick_ser:TicketService,private fb:FormBuilder){

    this.ticketForm = fb.group({
      title:['',Validators.required],
      reason:['',Validators.required],
      description:['',Validators.required],
      attachment:[null],
      studentId:['',Validators.required],
      instructorId:['',Validators.required]

    })
  }

  ngOnInit(): void {
    
    const who = localStorage.getItem("who_is_login")
    if(who == "student"){

      this.is_instructor = false
    }
   this.getAllTicketOfInstructor(1)
  }

  createTickets(){
    if(this.ticketForm.valid){
      const ticket = this.ticketForm.value
      console.log(ticket)
      this.tick_ser.createTicket(ticket).subscribe((response)=>{
        console.log(response)
      })
    }
    
  }

  getAllTicketOfInstructor(ins_id:number){
    this.tick_ser.getTicketsOfInstructor(ins_id).subscribe((response:any)=>{
      this.list_ticket = response
    })
  }


}
