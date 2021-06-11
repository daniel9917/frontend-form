import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { User, UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
}) 
export class ListComponent implements OnInit {
  closeResult = '';
  public usuarios:any = []
  form = new FormGroup({});
  public _email = false
  public _cedula = false

  constructor(private userService : UserServiceService, private  modalService: NgbModal, private formBuilder : FormBuilder,){ 
    
    userService.getListUsers().subscribe((resp:any) => {
      console.log("Usuarios: ");
      this.usuarios = resp;
    });
  }

  ngOnInit(): void {
  }

  open(content:any, user: User) {
    this.buildForm(user);
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


    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private buildForm(user:User) {
    console.log(user);
    this.form =  this.formBuilder.group({
      iden : {value : user.id, disabled : true},
      name :[user.name, Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])],
      lastName : [user.lastName, Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ])],
      cedula : [user.cedula, Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(9999999999)
      ])],

      email : [user.email, Validators.compose([
        Validators.required,
        Validators.email
      ])],

      phone : [user.phone, Validators.compose([
        Validators.required,
        Validators.min(1111111),
        Validators.max(9999999999)
      ])]
    })

  }

  save(event: Event ){
    event.preventDefault();
    const value = this.form.value;
    //console.log(value);

    const userPut = new User();
    userPut.id = this.form.get('iden')?.value, 
    userPut.setFields(this.form.get('name')?.value, 
    this.form.get('lastName')?.value, 
    this.form.get('cedula')?.value, 
    this.form.get('email')?.value, 
    this.form.get('phone')?.value);

    //console.log(userPut);

    this.userService.putUpdateUser(userPut).subscribe((resp:any)=>{
      if (resp != null){
        alert("Se ha actualizdo el perfil correctamente.");
        window.location.reload();
      }      
    });

    // this.userService.postCreateUser(userPost).subscribe((resp:any)=>{
    //     console.log(resp);
    //   });
  }

}
