import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, from } from 'rxjs';
import { DalService } from './dal.service';
import { BaseDataItem } from '../models/BaseDataItem';
import {map, filter, toArray, } from 'rxjs/operators'


export class BaseDataService<T extends BaseDataItem> {

  private _data:T[]
  private _sub:BehaviorSubject<T[]>
  public dataObs:Observable<T[]>
  //public dataObs:Observable<T>

  /* using BehaviorSubject as a "backend" data storage forces the use of <T[]>
     but makes sorting easier and enables .subscribes for changing components and static data  */
  constructor(private key:string, private dal:DalService) {
    this._data = dal.get(this.key)
    this._sub = new BehaviorSubject<T[]>(this._data)
    this.dataObs = this._sub.asObservable()
    //this.dataObs = from(this._data)

  }

  clearObservablePipes(){
    this.dataObs = this._sub.asObservable()
  }

  setFilter(filterFn:(item) => boolean):void{
    this.dataObs = this._sub.pipe(map(items => items.filter(filterFn)))
    //this.dataObs = this._sub.pipe(filter(filterFn))
  }

  setSort(sortFn:(a,b) => number):void{
    this.dataObs = this._sub.pipe(map(items => items.sort(sortFn)))
  }

  add(item: T): void {
    //current convention that id increments, and app handles all inserts to data
    //therefor the last item always has highest id
    //otherwise we could always implement "equal" interface
    let id = this._data.length > 0 ? this._data[ this._data.length - 1 ].id : 0
    item.id = ++id
    this._data.push(item)
    this.updateDataChange()
  }

  remove(items: T[]): void {
    items.forEach(item => {
      let index = this._data.findIndex(i => i.id == item.id)
      this._data.splice(index, 1)
    })
    this.updateDataChange()
  }

  update(item: T): void {
    let index = this._data.findIndex(i => i.id == item.id)
    this._data[index] = item
    this.updateDataChange()
  }

  private updateDataChange():void{
    this._sub.next(this._data)
    this.dal.set(this.key, this._data)
  }

  getItemById(id:number):T{
    return this._data.find(e => e.id == id)
  }

}




export interface IDataActions {

  connect():Observable<any[]>
  add(item:any):void
  remove(item:any):void
  update(item:any):void

}
