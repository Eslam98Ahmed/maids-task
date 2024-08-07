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
  loading: boolean = false;
  currentPage: number = 1;
  pages: number[] = [];
  totalPage: number =1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsersList(this.currentPage);
  }

  getUsersList(page) {
    this.loading = true;
    this.userService.getUsers(page).subscribe((res) => {
      this.users = res.data;
      this.totalPage = res.total_pages;
      this.pages = Array(this.totalPage).fill(0).map((x, i) => i + 1);
      this.loading = false;
    });
  }

  goToPage(page: number){
    this.currentPage = page;
    this.getUsersList(page);
  }

  goToUserDetails(userId: number): void {
    this.router.navigate([`/user`, userId]);
  }
}
