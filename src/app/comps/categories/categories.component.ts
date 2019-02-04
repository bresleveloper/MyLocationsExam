import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { MyLocation } from 'src/app/models/location';
import { LocationsService } from 'src/app/services/locations.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {

  @ViewChild('newCat') newCat:ElementRef;
  @ViewChild('filterCat') filterCat:ElementRef;
  savedItem:Category
  closeFormEmitter = new EventEmitter()
  closeFilterEmitter = new EventEmitter()
  currentLocations:MyLocation[]
  
  constructor(public svc:CategoriesService, svcLocations:LocationsService, private router:Router) {
    svcLocations.dataObs.subscribe(locations => this.currentLocations = [...locations])
    //console.log('currentLocations')
    //console.log(this.currentLocations)
    //this.theBoundCallback = this.theCallback.bind(this);
  }

  openCategoriesFilters(){
    //console.log('openCategoriesFilters')
    setTimeout(() => {
      this.filterCat.nativeElement.focus();
      let filterCat = this.filterCat.nativeElement as HTMLInputElement
      filterCat.value = ''
    })
  }

  closeFilter(){
    this.svc.clearObservablePipes()
    this.closeFilterEmitter.emit() 
  }

  openCategoryForm(itemToEditFromMatList:Category):void{
    this.savedItem = itemToEditFromMatList //can be null

    setTimeout(() => {
      this.newCat.nativeElement.focus();
      let newcatInput = this.newCat.nativeElement as HTMLInputElement
      newcatInput.value = this.savedItem ? this.savedItem.name : ''
    })
  }

  filterCategory(val:string){
    this.svc.setFilter((c:Category) => c.name.includes(val))
  }
  
  addCategory(name:string):void{
    if (!name) { return }

    if (this.savedItem) {
      this.savedItem.name = name
      this.svc.update(this.savedItem)
      this.savedItem = null
    } else {
      let c = new Category()
      c.name = name
      this.svc.add(c)
    }

    //this.showAddItem = false
    this.closeFormEmitter.emit() 
  }

  getLocationCount(c:Category):string{
    //debugger
    let cCount = this.currentLocations.filter(l => l.categories.find(_c => _c.id == c.id) ).length
    return `(${cCount})`
  }

  gotoLocationByCategory(c:Category):void{
    this.router.navigateByUrl('/locations/' + c.id)
  }


}
