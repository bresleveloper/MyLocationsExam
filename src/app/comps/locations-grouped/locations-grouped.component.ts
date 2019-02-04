import { Component, OnInit } from '@angular/core';

import { LocationsService } from 'src/app/services/locations.service';
import { MyLocation } from 'src/app/models/location';
import { Category } from 'src/app/models/category';
import { Observable } from 'rxjs';

import { groupBy, mergeMap, toArray } from 'rxjs/operators'

@Component({
  selector: 'app-locations-grouped',
  templateUrl: './locations-grouped.component.html',
  styleUrls: ['./locations-grouped.component.css']
})
export class LocationsGroupedComponent implements OnInit {

  //kvp category dictionary for locations array
  groupedDataKVP={}

  constructor(private scv:LocationsService) { }

  ngOnInit() {
    this.scv.dataObs.subscribe(locations =>{
      locations.forEach(l => {
        l.categories.forEach(c => {
          if (this.groupedDataKVP[c.name]) {
            this.groupedDataKVP[c.name].push(l)
          } else {
            this.groupedDataKVP[c.name] = [l]
          }
        })
      })
    })
  }


}


