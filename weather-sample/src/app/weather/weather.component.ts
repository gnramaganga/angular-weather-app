import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { WeatherService } from "../services/weather.service";
import { Utility } from "../utility";

export class CsvData {
  public city_id: any;
  public city_name: any;
  public city_lat: any;
  public city_lon: any;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherData: any;
  public citiesData: any;
  public slicedArray: any;
  public tabIndex: any;
  public keyword: any;
  typeSelected: string;
  public tabsDisplay: boolean = true;
  filteredOptions!: Observable<any[]>;
  constructor(private formBuilder: FormBuilder, private weatherService: WeatherService, public utility: Utility, private spinnerService: NgxSpinnerService) {
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit() {
    this.getCitiesData();
    this.weatherData = [];
    this.keyword = 'city_name';
    this.tabIndex = 0;
    this.OnTabEvent(this.tabIndex);
    this.citiesData = [];
    this.slicedArray = [];
  }

  getCitiesData(){
    this.spinnerService.show();
    this.weatherService
    .getCities()
    .subscribe(data => {
      const list = data.split("\n");
      let headerLength = 7;

    for (let i = 1; i < list.length; i++) {
      let curruntRecord = (list[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        csvRecord.city_id = curruntRecord[0].trim();
        csvRecord.city_name = curruntRecord[1].trim();
        csvRecord.city_lat = curruntRecord[5].trim();
        csvRecord.city_lon = curruntRecord[6].trim();
        this.citiesData.push(csvRecord);
      }
    }
    this.slicedArray = this.citiesData.slice(0, 1000);
    this.spinnerService.hide();
     console.log(this.slicedArray);
    })
  }

  selectCity(item: any) {
    this.spinnerService.show();
    this.weatherService
    .getWeather(item.city_lat,item.city_lon)
    .subscribe(data => {
      this.weatherData = data;
      this.spinnerService.hide();
      this.tabsDisplay = false;
      console.log(this.weatherData);
    })
  }

  onChangeSearch(searchStr: string) {
    if(searchStr.length == 0){
      this.tabsDisplay = true;
    }
  }

  // onFocused(e: any) {
  //   alert('onFocused event' +e);
  // }

  OnTabEvent(a: { index: number; }){
    this.spinnerService.show();
     var lat = "-22.90";
     var lon = "-43.20";
    console.log(a.index);
    if(a.index == 1){
      lat = "39.90";
      lon = "116.39";
    }else if(a.index == 2){
      lat = "34.05";
      lon = "-118.24";
    }
    this.weatherService
    .getWeather(lat,lon)
    .subscribe(tabData => {
      this.weatherData = tabData;
      this.spinnerService.hide();
      console.log(this.weatherData);
    })
  }
}

