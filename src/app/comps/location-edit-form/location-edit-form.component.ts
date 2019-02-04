import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { Validators } from '@angular/forms';
import { MyLocation, Coordinates } from 'src/app/models/location';
import { LocationsService } from 'src/app/services/locations.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { Category } from 'src/app/models/category';
import { DalService } from 'src/app/services/dal.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-location-edit-form',
  templateUrl: './location-edit-form.component.html',
  styleUrls: ['./location-edit-form.component.css']
})
export class locationEditFormComponent implements OnInit {


  constructor(private fb: FormBuilder, 
    private locs:LocationsService,
    public cats:CategoriesService, //is used in html
    private dal:DalService,
    public router:Router,
    private route:ActivatedRoute) { 
    }

  @ViewChild('catSelector') catSelector:MatSelect

  locationEditForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required, Validators.minLength(3)]],
    categories: [[],Validators.required],
    lat: ['', [Validators.required , Validators.pattern("^[0-9\.]*$")  ]],
    lng: ['', [Validators.required , Validators.pattern("^[0-9\.]*$")  ]],

  })

  ngOnInit(){
    let tempV = this.dal.get(DalService.tempLocFormValueDalKey)
    if (tempV.length > 0) {
      //we're in a middle of an edit
      this.locationEditForm.setValue(tempV[1])
      this.dal.del(DalService.tempLocFormValueDalKey)
    } 
    else if (this.route.snapshot.params.id) {
      let l = this.locs.getItemById(this.route.snapshot.params.id)
      if (!l){
        this.router.navigateByUrl('/locations')
      }
      //console.log(l)
      /*
      var x = {myProp: "value"};
      var y = Object.assign({}, x); 
      y = Object.assign(Object.create(null), x); 
      */

      let v = Object.assign(Object.create(null), l)
      v.lat = l.coordinates.lat
      v.lng = l.coordinates.lng
      delete v.coordinates
      delete v.id

      this.locationEditForm.setValue(v)
    }
  }
  
  compareFnForCategories(x: Category, y: Category): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  jumpToNextInput(event){
    //is only on elements where relevant
    let myField = event.srcElement.closest('.mat-form-field')
    let sibField = myField.nextElementSibling as HTMLElement
    if (!sibField) {
      return
    }
    let sibInput = sibField.querySelector('input')
    if (sibInput) {
      sibInput.focus();   
    } else {
      //must be the mat select since i have a sib FF
      this.catSelector.focus()
    }
  }

  submitLocation() {
    //debugger
    let newLocation = true
    if (this.route.snapshot.params.id) {
      newLocation = false
    }
    //console.log('submit')
    let v = this.locationEditForm.value
    //value is the Location objs as is, just make matching props names
    let l = v as MyLocation
    
    l.coordinates = new Coordinates
    l.coordinates.lat = parseFloat(v.lat)
    l.coordinates.lng = parseFloat(v.lng)
    delete l['lat']
    delete l['lng']
    
    if (newLocation) {
      this.locs.add(l)
    } else {
      l.id = this.route.snapshot.params.id
      this.locs.update(l)
    }

    this.router.navigateByUrl('/locations')
  }


  chooseLocationFromMap(){
    let id = this.route.snapshot.params.id ? this.route.snapshot.params.id : null
    let v = this.locationEditForm.value
    this.dal.set(DalService.tempLocFormValueDalKey, [id, v])
    this.router.navigateByUrl('/mapView')
  }
}
