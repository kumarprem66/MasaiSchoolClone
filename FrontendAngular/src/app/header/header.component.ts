import { Component,HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokendataService } from '../services/tokendata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','./headers.scss']
})
export class HeaderComponent implements OnInit{



  Profile:string =  "Profile";
  navbarIsSticky = false
  menuType: string = 'default'
  current_user = "Login"

  not_purchase = "Admin"

  activeItem:string = "Home"

  constructor(private router:Router,private tokenSer:TokendataService){

    
  }


  setActiveItem(itemName: string) {
    this.activeItem = itemName;
  }

//   @HostListener('window.scroll',[])
//   onWindowScroll(){

//     // console.log("scrolll")
//     this.navbarIsSticky = window.pageYOffset >= 70
//   }

  ngOnInit(): void {
   
    const JWTtoken = localStorage.getItem("masaischoolclone");
    
    if(JWTtoken != null){
      const logged_in_user_info = this.tokenSer.getUserDetailsFromToken(JWTtoken);

      

          if(this.tokenSer.tokenIsValid(JWTtoken)){
           
            this.current_user = logged_in_user_info.username;
           
            if(logged_in_user_info.authorities == "ROLE_STUDENT"){
              this.menuType = "student";
            
            }else if(logged_in_user_info.authorities == "ROLE_ADMIN"){
              this.menuType = "admin";
            }else if(logged_in_user_info.authorities == "ROLE_INSTRUCTOR"){
              this.menuType = "instructor";
            }else{
              this.menuType = "default";
            }
            this.go_home_page();
          }else{
            alert("Session Expired try login.....")
            this.router.navigate(['/login'])
          }
    }else{
      
      this.menuType = "default";
      this.go_home_page();
    
    }
      

    
   
  


  }

  go_home_page(){
   
    this.setActiveItem("Home")

    if(this.menuType == "admin"){

   
      this.router.navigate(['admin-dashboard'])

    }else if(this.menuType == "student"){
  
      this.router.navigate(['/student_dashboard'])

    }else if(this.menuType == "instructor"){

      
      this.router.navigate(['/instructor-dashboard'])

    }else{
      
      this.menuType = 'default'
      this.router.navigate([''])
      
    }
  
   
    
  }

  logout(){
    this.setActiveItem("Logout")
    const is_agree = confirm("Are you sure? want to Logout")
    if(is_agree){
      this.menuType = 'default'
      localStorage.removeItem("masaischoolclone");
      location.reload();
      this.router.navigate(['/'])
      // let local_user:any = localStorage.getItem("masaiclone-user-email")
      // local_user = JSON.parse(local_user);
      // local_user.username = null;
      // localStorage.setItem("masaiclone-user-email",JSON.stringify(local_user))

      // if(this.menuType == "admin"){

   
      //   this.router.navigate(['admin-dashboard'])
        
      // }else if(this.menuType == "student"){
    
      //   this.router.navigate(['/stu-login'])
  
      // }else if(this.menuType == "instructor"){
  
        
      //   this.router.navigate(['/login'])
  
      // }else{
        
       
      //   this.router.navigate(['/login'])
        
      // }
      
    }
   
  }

//   adminlogout()
// {

//   const is_agree = confirm("Are you sure? want to Logout")
//     if(is_agree){
//       this.menuType = 'default'
   
//       localStorage.removeItem('sparleom-admin')
//       localStorage.removeItem('who_is_login')
//       this.router.navigate(['/admin-auth'])
//     }
// }

// studentlogout(){
//   const is_agree = confirm("Are you sure? want to Logout")
//   if(is_agree){
//     this.menuType = 'default'
 
    
//     localStorage.removeItem('masaiclone-user-email')
//     this.router.navigate([''])
//   }
// }
//   instructorlogout(){

//     const is_agree = confirm("Are you sure? want to Logout")
//     if(is_agree){
//       this.menuType = 'default'
   
      
//       localStorage.removeItem('who_is_login')
//       this.router.navigate([''])
//     }
//   }


  login(){

    if(this.current_user=="Login"){
      this.router.navigate(['/login'])
    }else{
      this.router.navigate(["/profile"])
    }

  }

//   canPurchase(){
//     if(this.not_purchase=="Profile"){
//       localStorage.setItem('who_is_login',"student")
//       alert("refresh the page")
//       this.router.navigate(['/student_dashboard'])
//     }else{
//       this.router.navigate(['/profile'])
//     }
//   }

}
