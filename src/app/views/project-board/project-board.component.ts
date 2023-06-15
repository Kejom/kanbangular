import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css']
})
export class ProjectBoardComponent implements OnInit {
  isDevops = false;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.isDevops = this.authService.isAdmin() || this.authService.isDevops();
  }
}
