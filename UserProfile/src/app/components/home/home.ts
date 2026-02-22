import { IPage, IPAGE_DEFAULT } from './../../interfaces/ipage';
import { Component, inject, OnInit, WritableSignal, signal} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Service } from '../../services/service';
import { Observable } from 'rxjs';
import { Caption } from '../caption/caption';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Caption],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Constantes
  public readonly NO_PAGE: number = -1;
  // Servicios
  private clientHttp = inject(Service);
  // Propiedades
  pages: Array<IPage> = [IPAGE_DEFAULT]; // Inicializamos el numero de paginas con una pagina predefinida.
  current_page: WritableSignal<number> = signal<number>(this.NO_PAGE); // Current page es la propiedad que nos indica en que pagina estamos.
                                                                       // La he creado como signal para que cuando se ejecute el ngOnInit, avise al bulce @for del html
                                                                       // de que debe ejecutarse de nuevo. Esto se debe a que la petición del cliente Http es asíncrona y justo al inicio
                                                                       // cuando se ejecuta el bucle for aún no se ha actualizado la tabla this.pages


  ngOnInit(): void {
    this.clientHttp.getAllUsers( ).subscribe( (data:IPage)=> {
      this.pages.push(data)
      this.current_page.set(data.page) // Para que se muestre la primera página
      console.log(this.pages)
      console.log(this.current_page)
    })
    console.log("ngOnInit")
  }
}
