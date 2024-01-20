import { Component,HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router:Router){

    
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
    // if(this.menuType == 'admin'){

     
    // }

  

    const local_user = localStorage.getItem("masaiclone-user-email")
    if(local_user != null){
      let current_user_data = JSON.parse(local_user)
      // let cuseruser = JSON.parse(local_user).user
      

      if(current_user_data.username == null && current_user_data.user != null){
        this.current_user = current_user_data.name;
       
        this.menuType = 'student';
        this.Profile = current_user_data.name;
        this.router.navigate(['/student_dashboard'])
      }else if(current_user_data.username != null){
        
        this.current_user = current_user_data.username;
        this.router.navigate([''])
      }
      
    }
//     const is_purchase = localStorage.getItem("can_purchase")
//     if(is_purchase != null){
//       this.not_purchase = "Profile"
//     }


    // if(local_user != null){

    //   if(local_user == "admin"){

    //     this.menuType = "admin"
        
        
//       }else if(local_user == "student"){
//         this.menuType = "student"
//         this.router.navigate(['/student_dashboard'])

//       }else if(local_user == "instructor"){

//         this.menuType = "instructor"
//         this.router.navigate(['/instructor-dashboard'])

//       }else{
//         const userobj = localStorage.getItem("current-user")
//         if(userobj != null){
//           const parseduser = JSON.parse(userobj)
//           this.current_user = parseduser.username
//         }
//         this.router.navigate([''])
        
    //   }
    // }else{
      // this.menuType = "default"
      // this.router.navigate([''])
    // }


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
      localStorage.removeItem("masaiclone-user-email");
      // let local_user:any = localStorage.getItem("masaiclone-user-email")
      // local_user = JSON.parse(local_user);
      // local_user.username = null;
      // localStorage.setItem("masaiclone-user-email",JSON.stringify(local_user))

      if(this.menuType == "admin"){

   
        this.router.navigate(['admin-dashboard'])
        
      }else if(this.menuType == "student"){
    
        this.router.navigate(['/stu-login'])
  
      }else if(this.menuType == "instructor"){
  
        
        this.router.navigate(['/login'])
  
      }else{
        
       
        this.router.navigate(['/login'])
        
      }
      
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

studentlogout(){
  const is_agree = confirm("Are you sure? want to Logout")
  if(is_agree){
    this.menuType = 'default'
 
    
    localStorage.removeItem('masaiclone-user-email')
    this.router.navigate([''])
  }
}
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
