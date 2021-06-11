import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { User, UserServiceService } from '../service/user-service.service';
import { debounceTime } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  public closeResult!: string;
  public _email = false
  public _cedula = false

  form = new FormGroup({});
  users = []


  constructor(private formBuilder : FormBuilder, private userService : UserServiceService) {
    modalService : NgbModal
    this.buildForm();
    this.form.get('email')?.valueChanges.
    pipe(
      debounceTime(1000)      
    )
    .subscribe(value =>{
      console.log(value);
      this.userService.getEmail(this.form.get('email')?.value).subscribe((resp:any) =>{
        if (resp == null){
          this._email = false;
        }else{
          this._email = true;
        }
        console.log(this._email);
      });
    });        

    this.form.get('cedula')?.valueChanges.
    pipe(
      debounceTime(1000)      
    )
    .subscribe(value =>{
      console.log(value);
      this.userService.getCedula(this.form.get('cedula')?.value).subscribe((resp:any) =>{
        if (resp == null){
          this._cedula = false;
        }else{
          this._cedula = true;
        }
      });
    }); 

  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form =  this.formBuilder.group({
      name :['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])],
      lastName : ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])],
      cedula : ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(9999999999)
      ])],

      email : ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],

      phone : ['', Validators.compose([
        Validators.required,
        Validators.min(1111111),
        Validators.max(9999999999)
      ])]
    })

  }

  onSubmit(): void {

  }

  getValues(event: Event) {
    event.preventDefault();
    console.log(this.form.get('name')?.value + " " + this.form.get('lastName')?.value);

  }

  save(event: Event ){
    event.preventDefault();
    const value = this.form.value;
    // console.log(value);

    const userPost = new User();
    userPost.setFields(this.form.get('name')?.value, 
    this.form.get('lastName')?.value, 
    this.form.get('cedula')?.value, 
    this.form.get('email')?.value, 
    this.form.get('phone')?.value);


    this.userService.postCreateUser(userPost).subscribe((resp:any)=>{
        console.log(resp);
        if(resp != null){
          alert("Se ha creado el perfil correctamente.");
          window.location.reload();
        }

      });
  }

  checkEmail(event: Event){
    event.preventDefault();

    console.log("Este es el valor del email: "+this.form.get('email')?.value);
  }

}

