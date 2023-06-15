import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{
  id!: string;
  user!: User;
  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router){}

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.user = await this.usersService.getUser(this.id);
    if(!this.user)
      this.router.navigate(['/users']);
  }

  async onSubmit(){
    await this.usersService.updateUser(this.user);
    this.router.navigate(['/users']);
  }
}
