import { Injectable } from '@angular/core';

import { DalService } from './dal.service';
import { BaseDataService } from './base-data-service.service';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService  extends BaseDataService<Category> {
  constructor(dal: DalService) {
    super('myLocation_CategoriesDataArray', dal)
  }
}


