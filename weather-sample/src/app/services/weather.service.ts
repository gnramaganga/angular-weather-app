import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(lat: string, lon: string){
    return this.http.get(
        'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&&exclude=current,minutely&appid=92aa6553a6383408837982297b6a870b'
    );
  }
  getCities(){
    return this.http.get(
        '../assets/cities_20000.csv', {responseType: 'text'}
    );
  }
}
