import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Project } from '../../models/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  title: string;
  project: Project;
  registerForm: FormGroup;
  submitted = false;
  status: string;
  filesToUpload: Array<File>;
  constructor(private formBuilder: FormBuilder,
    private _serviceService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear Proyecto";
    this.project = new Project('', '', '', '', '2020', '', '');
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      year: ['', Validators.required],
      langs: ['', Validators.required]
    });
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

    this.project.name = this.registerForm.value['name'];
    this.project.description = this.registerForm.value['description'];
    this.project.year = this.registerForm.value['year'];
    this.project.category = this.registerForm.value['category'];
    this.project.langs = this.registerForm.value['langs'];

    this._serviceService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {
          //Subir la imagen
          this._uploadService.makeFileRequest(Global.url +
            "upload-image/" + response.project._id, [], this.filesToUpload, 'image')
            .then((result:any)=>{
              this.status = 'success';
              console.log(response)
              this.onReset();
            });
        } else {
          this.status = 'failed';
        }
      },
      error => { console.log(error) }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key).setErrors(null);
    });
  }

}

