import { Component, ViewChild, ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service';
import { MyLocation } from 'src/app/models/location';
import { Category } from 'src/app/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '../base-list/base-list.component';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, OnDestroy {

  @ViewChild('baseList') baseList:BaseListComponent

  savedItem:MyLocation
  lastClickedItem:MyLocation
  closeFormEmitter = new EventEmitter()
  pageheader:string = 'All Locations'
  //closeFilterEmitter = new EventEmitter()
  closeFilterEmitter:EventEmitter<boolean>


  constructor(public svc:LocationsService, private svcCats:CategoriesService, 
    public router:Router, public route:ActivatedRoute) {}

  ngOnInit(){
    if (this.route.snapshot.params.catid) {
      let c:Category = this.svcCats.getItemById(this.route.snapshot.params.catid)
      this.pageheader = 'Locations For ' + c.name
      this.svc.setFilter((l:MyLocation) => l.categories.find(_c => _c.id == this.route.snapshot.params.catid) != null )
      this.closeFilterEmitter = null
    } else {
      this.svc.clearObservablePipes()
      this.closeFilterEmitter = new EventEmitter()
    }
  }

  ngOnDestroy(){
    this.svc.clearObservablePipes()
  }

  sortAlpha:boolean = false
  SortAlphabetical(){
    //this.toggleGroupByCat(false)
    this.sortAlpha = !this.sortAlpha
    if (this.sortAlpha) {
      this.svc.setSort((a:MyLocation,b:MyLocation) => {
        return a.name > b.name ? 1 : -1
      })
    } else {
      this.svc.clearObservablePipes()
    }
  }

  /*
  _groupByCat:boolean = false
  toggleGroupByCat(defaultValue:boolean){
  //toggleGroupByCat(){
    this._groupByCat = defaultValue == undefined ? !this._groupByCat : defaultValue
    //this._groupByCat = !this._groupByCat 
    let list:HTMLElement = document.getElementsByClassName('cat-list')[0] as HTMLElement

    if (this._groupByCat) {
      list.style.display = 'none'
    } else {
      list.style.display = 'block'
    }
  }
  */

  openLocationEditForm(itemToEditFromMatList:MyLocation):void{
    this.savedItem = itemToEditFromMatList //can be null

    if (this.savedItem) {
      this.router.navigateByUrl('/locationEditForm/' + this.savedItem.id)
    } else {
      this.router.navigateByUrl('/locationEditForm')
    }
  }

  viewOnMap(){this.router.navigateByUrl('/mapView/' + this.lastClickedItem.id)}


  locationClick(l:MyLocation):void{
    //console.log('locationClick')
    //console.log(l)
    this.closeFilterEmitter.emit(true)
    this.lastClickedItem = l
  }

  viewLocationProps():void{
    this.router.navigateByUrl('/locationView/' + this.lastClickedItem.id)
  }


}
