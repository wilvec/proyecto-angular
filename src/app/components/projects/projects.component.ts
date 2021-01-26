import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  url:string;
  constructor(private _projectService: ProjectService) {
    this.url=Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      response => {
        this.projects = response.projects;
      },
      error => {
        console.log(error);
      }
    );
  }
}
