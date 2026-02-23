import { Component, inject, WritableSignal, signal} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser, IUSER_DEFAULT } from '../../interfaces/iuser';
import { Service } from '../../services/service';

@Component({
  selector: 'app-formulary',
  imports: [ReactiveFormsModule],
  templateUrl: './formulary.html',
  styleUrl: './formulary.css',
})
export class Formulary {
  private clientHttp = inject(Service)
  private user_id = inject(ActivatedRoute);

  title: WritableSignal<string>;
  button_text: WritableSignal<string>;
  form: FormGroup;
  onSubmit: Function;

  constructor(){
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

      ]),
    })
  }

  ngOnInit(): void {
    console.log()
    if(this.user_id.routeConfig?.path === "newuser") {
      this.title.set("NUEVO USUARIO");
      this.button_text.set("Guardar");
      this.onSubmit = this.guardar;
    } else {
      this.user_id.params.subscribe(params => {
          this.title.set("ACTUALIZAR USUARIO");
          this.button_text.set("Actualizar");
          this.onSubmit = this.actualizar;
          const id: string = params['id'];
          console.log(params)

          this.clientHttp.getUserById(id).subscribe( ( data:IUser ) => {
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
    console.log('guardar')
  }

  private actualizar(){
    console.log('actualizar')
  }

}
