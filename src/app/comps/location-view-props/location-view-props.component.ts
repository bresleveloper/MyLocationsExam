import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { LocationsService } from 'src/app/services/locations.service';
import { MyLocation } from 'src/app/models/location';


import { Location } from '@angular/common';


@Component({
  selector: 'app-location-view-props',
  templateUrl: './location-view-props.component.html',
  styleUrls: ['./location-view-props.component.css']
})
export class LocationViewPropsComponent implements OnInit {

  constructor(private locs:LocationsService, 
              public location: Location, //browser location, used in html
              private router:Router, 
              private route:ActivatedRoute) { }

  l:MyLocation

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.l = this.locs.getItemById(this.route.snapshot.params.id)
      if (!this.l){
        this.router.navigateByUrl('/locations')
      }
    }
  }

  viewOnMap(){this.router.navigateByUrl('/mapView/' + this.l.id)}

  edit():void { this.router.navigateByUrl('/locationEditForm/' + this.l.id) }

}
