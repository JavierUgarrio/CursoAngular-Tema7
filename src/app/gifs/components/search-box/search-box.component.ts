import { Component,ViewChild,ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.services';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  /*
  * Inyecto el servicio en el constructor para poder utilizarlo en el componente
  */

  constructor(private gifService : GifsService){}


  /*
  El "@ViewChild" nos permite coger una referencia en el html
  */
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

 searchTag():void{
  const newTag = this.tagInput.nativeElement.value;

  this.gifService.searchTag(newTag);

  this.tagInput.nativeElement.value='';

}

}
