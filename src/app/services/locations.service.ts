import { Injectable } from '@angular/core';

import { DalService } from './dal.service';
import { BaseDataService } from './base-data-service.service';
import { MyLocation } from '../models/location';


@Injectable({
  providedIn: 'root'
})
export class LocationsService  extends BaseDataService<MyLocation> {
  constructor(dal: DalService) {
    super('myLocation_LocationsDataArray', dal)
  }
}


