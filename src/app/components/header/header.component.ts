import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isResult:boolean = false;
  userData:User;
  inputData:number;
  
  constructor(private router: Router ,private UserService:UserService) { }

  ngOnInit(): void {
  }

  onSearch(event: any): void {
    const userId = event.target.value;
      this.UserService.getUserInfo(Number(userId)).subscribe((res)=>{
        this.userData = res.data;
        this.isResult =true
      },(error)=>{
        this.isResult =false;
      })
    }

    goToUserDetails(userId:number){
      this.router.navigate([`/user`, userId]);
      this.inputData = null;
    }
}


