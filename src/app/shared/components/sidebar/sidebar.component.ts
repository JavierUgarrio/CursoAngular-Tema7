import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.services';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  /*
  Para inyectar un servicio hay que metero en el constructor y si es privado crear una funcion "get" y enlazarlo con la funcion del servicio
  */
  constructor(private gifsService :GifsService){}

  get tags(){
    return this.gifsService.tagsHistory
  }

  buscarTag( tag: string ):void {
    this.gifsService.searchTag(tag);
  }


}
