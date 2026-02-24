import { Component, inject, WritableSignal, signal,} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser} from '../../interfaces/iuser';
import { RequestNewUser, RequestUpdateUser, Service } from '../../services/service';

@Component({
  selector: 'app-formulary',
  imports: [ReactiveFormsModule],
  templateUrl: './formulary.html',
  styleUrl: './formulary.css',
})
export class Formulary {
  private clientHttp = inject(Service)
  private route = inject(ActivatedRoute);
  private user_id: string;

  title: WritableSignal<string>;
  button_text: WritableSignal<string>;
  form: FormGroup;
  onSubmit: Function;

  constructor(){
    this.user_id = "";
    this.title = signal<string>("NUEVO USUARIO")
    this.button_text = signal<string>("Guardar")
    this.onSubmit = ()=>{};
    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.nullValidator

      ]),
      apellido: new FormControl('',  [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      imagen: new FormControl('', [
        Validators.required,
        Validators.pattern(/https?:\/\//i)
      ]),
    })
  }

  ngOnInit(): void {
    console.log()
    if(this.route.routeConfig?.path === "newuser") {
      this.title.set("NUEVO USUARIO");
      this.button_text.set("Guardar");
      this.onSubmit = this.guardar;
    } else {
      this.route.params.subscribe(params => {
          this.title.set("ACTUALIZAR USUARIO");
          this.button_text.set("Actualizar");
          this.onSubmit = this.actualizar;
          this.user_id = params['id'];

          this.clientHttp.getUserById(this.user_id).subscribe( ( data:IUser ) => {
            this.form.setValue({
              nombre: data.first_name,
              apellido: data.last_name,
              email: data.email,
              imagen: data.image
            });
          })
      })
    }
  }

  private guardar(){
    const new_user: RequestNewUser = {
      first_name: this.form.value.nombre,
      last_name: this.form.value.apellido,
      email: this.form.value.email,
      username: this.form.value.email,
      password: ""
    }
    this.clientHttp.createNewUser(new_user).subscribe((response)=>{
      console.log(response)
    })
  }

  private actualizar(){
    const update_user: RequestUpdateUser = {
      first_name: this.form.value.nombre,
      username: this.form.value.username
    }
    this.clientHttp.updateUser(this.user_id ,update_user).subscribe((response)=>{
      console.log(response)
    })
  }

}
