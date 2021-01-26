import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Project } from '../../models/project';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  title: string;
  project: Project;
  registerForm: FormGroup;
  submitted = false;
  status: string;
  filesToUpload: Array<File>;
  constructor(private formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar Proyecto";
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required],
        year: ['', Validators.required],
        langs: ['', Validators.required]
      });
      this.getProject(id);

    });
  }

  getProject(id: string){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project=response.project;

        this.registerForm.setValue({
          name: this.project.name,
          description: this.project.description,
          year: this.project.year,
          category: this.project.category,
          langs: this.project.langs
        });
      },
      error =>{
        console.log(<any>error);
      }

    )
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.registerForm.valid);
    if (!this.registerForm.valid) {
      return;
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
