import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import{ map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }


  getAlbumData(endLimit:number){
    return this.http.get(`${environment.baseUrl}albums/${endLimit}`).pipe(map(response=>response));
  }
}
