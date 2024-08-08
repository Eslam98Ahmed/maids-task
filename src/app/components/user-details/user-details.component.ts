import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  loading:boolean = true;

  constructor(private route: ActivatedRoute , private userService:UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.fetchUserDetails(userId);
    });
  }

  fetchUserDetails(id: number) {
    this.loading = true;
    this.userService.getUserInfo(id).subscribe(res => {
      this.user = res.data;      
      this.loading = false;
    });
  }

}
