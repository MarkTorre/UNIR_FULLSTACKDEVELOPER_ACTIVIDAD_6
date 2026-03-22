import { Component, inject, WritableSignal, signal, input,} from '@angular/core';
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
  private readonly regex_email = /^[\w.]+\@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/
  private readonly regex_image = /https?:\/\//i

  private clientHttp = inject(Service)
  private user_id: string;

  public readonly isNew = input<boolean>(false);
  public readonly id = input<string>("");   // Recibe automáticamente el :id de la URL

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
        Validators.pattern(this.regex_email)
      ]),
      imagen: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex_image)
      ]),
    }, [])
  }

  async ngOnInit(): Promise<void> {
    if(this.isNew()) {
      this.title.set("NUEVO USUARIO");
      this.button_text.set("Guardar");
      this.onSubmit = this.guardar;
    } else {
      this.user_id = this.id();
      if(this.user_id) {
        this.title.set("ACTUALIZAR USUARIO");
        this.button_text.set("Actualizar");
        this.onSubmit = this.actualizar;
        try {
          let response: IUser  = await this.clientHttp.getUserById(this.user_id);
          this.form.setValue({
            nombre: response.first_name,
            apellido: response.last_name,
            email: response.email,
            imagen: response.image
          })

          if (!response.hasOwnProperty('error')) {
            console.log(`GET ${response.first_name}`);
          } else {
            console.log(`GET ERROR`);
          }
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  public checkControlInvalid(name:string): boolean {
    return(this.form.controls[name].touched && this.form.controls[name].invalid);
  }

  private async guardar() {
    const new_user: RequestNewUser = {
      first_name: this.form.value.nombre,
      last_name: this.form.value.apellido,
      email: this.form.value.email,
      username: this.form.value.email,
      password: ""
    }

    try {
      let response: IUser = await this.clientHttp.createNewUser(new_user);
      console.log(`POST ${response.first_name}`);
      console.log(response)
    } catch (error) {
      console.log(error)

    }

  }

  private async actualizar() {
    const update_user: RequestUpdateUser = {
      first_name: this.form.value.nombre,
      username: this.form.value.username
    }

    try {
      let response: IUser = await this.clientHttp.updateUser(this.user_id ,update_user);
      if (!response.hasOwnProperty('error')) {
        console.log(`PUT ${response.first_name}`);
      } else {
        console.log(`PUT ERROR`);
      }
      console.log(response);
    } catch (error) {
      console.log(error)
    }

  }

}
