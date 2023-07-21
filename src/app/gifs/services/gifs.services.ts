import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService{

  private _tagsHistory: string[] = [];
  private apiKey: string = 'cLgPg353vTJuP6ovG01ShuIqpnL7uYWv';
  private serviceUrl : string='https://api.giphy.com/v1/gifs';
  public gifsList:Gif [] = []
  /*
  * en el constructor inyectamos Http
  */
  constructor(private http:HttpClient){
  /*
  Aplicamos el "loadLocalStorage()" para recuperar los datos
  */
    this.loadLocalStorage();
    console.log('Este servicio esta listo');

  }


  get tagsHistory(){
    /*
    * Cuando aplicas "[...this._tagsHistory]" hace referencias a todos los elementos que contiene el array.
    */
    return [...this._tagsHistory];
  }

  private organizateHistory(tag:string){

    tag=tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      /*
       el "filter" hace que regrese el array pero solo las funciones que da verdadero
      */
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !==tag)
    }
    this._tagsHistory.unshift(tag);
    /*
    splice limita el array
    */
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  public searchTag(tag: string):void{

    if(tag.length===10)return;
    this.organizateHistory(tag)

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe((resp:SearchResponse)=>{
      console.log(resp );
      this.gifsList = resp.data;
      //console.log({gifs :this.gifsList});
    })
    /*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=cLgPg353vTJuP6ovG01ShuIqpnL7uYWv=valorant&limit=10')
    .then(resp=> resp.json())
    .then(data=>console.log(data))
    */
  }

  /*
  * Este metodo lo utilizamos para guardar los datos en localStorage del navegador que posteriormente luego aplicamos en el metodo "organizateHistory()"
  */
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }
  /*
  * Este metodo lo utilizamos para guardar los datos en localStorage del navegador"
  */
  private loadLocalStorage():void{

    if( !localStorage.getItem('history')) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
  }
}
