import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from './../../interfaces/user';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  currentPage: number = 1;
  pages: number[] = [];
  totalPage: number =1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    //check cashe date
    if (JSON.parse(localStorage.getItem('usersList')) && this.currentPage == 1) {
      this.getCasheUsersList()
    }else{
      this.getUsersList(this.currentPage);
    }
  }

  // fetch users list from api
  getUsersList(page) {
    this.loading = true;
    this.userService.getUsers(page).subscribe((res) => {
      this.users = res.data;
      localStorage.setItem('usersList' , JSON.stringify(this.users));
      this.totalPage = res.total_pages;
      localStorage.setItem('totalPages' ,JSON.stringify(this.totalPage));
      this.pages = Array(this.totalPage).fill(0).map((x, i) => i + 1);
      this.loading = false;
    });
  }

  // fetch users list from localStorage
  getCasheUsersList(){
    this.users = JSON.parse(localStorage.getItem('usersList'));
    this.totalPage = JSON.parse(localStorage.getItem('totalPages'));
    this.pages =  Array(this.totalPage).fill(0).map((x, i) => i + 1);
    this.loading = false;
  }

  // pagination
  goToPage(page: number){
    this.currentPage = page;
    this.getUsersList(page);
  }

  // route to user information page
  goToUserDetails(userId: number): void {
    this.router.navigate([`/user`, userId]);
  }
}
