import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { MyLocation, Coordinates } from 'src/app/models/location';

import OlMap from 'ol/Map';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlXyzSource from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';

import {Icon, Style} from 'ol/style.js'

import {fromLonLat, toLonLat} from 'ol/proj';
import { LocationsService } from 'src/app/services/locations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DalService } from 'src/app/services/dal.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {


  map: OlMap;
  vectorSource: OlVectorSource;
  vectorLayer: OlVectorLayer;
  xyzSource: OlXyzSource;
  tileLayer: OlTileLayer;
  view: OlView;
  //marker: OlFeature;


    
  constructor(  private dal:DalService,  
                private locs:LocationsService,
                private router:Router,
                private route:ActivatedRoute) {}

  ngOnInit() {
    let c
    if (this.route.snapshot.params.id) {
        c = this.locs.getItemById(this.route.snapshot.params.id).coordinates
        var iconFeature = new OlFeature(new OlPoint(fromLonLat([c.lng, c.lat ])));
        iconFeature.set('style', this.createStyle('https://openlayers.org/en/latest/examples/data/icon.png', undefined));
        /*this.marker = new OlFeature({
            // Added fromLonLat
            geometry: new OlPoint(fromLonLat([34.91084535980196 ,32.06825457046585]))
        });*/

        this.vectorSource = new OlVectorSource({
            //features: [this.marker]
            features: [iconFeature],
        });

        this.vectorLayer = new OlVectorLayer({
            source: this.vectorSource,
            style:(feature)=>feature.get('style')
        });
    }

    /* XYZ */
    this.xyzSource = new OlXyzSource({
        url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.tileLayer = new OlTileLayer({
        source: this.xyzSource
    });

    /* View and map */
    this.view = new OlView({
        center: fromLonLat( c ? [c.lng, c.lat ] : [34.91084535980196 ,32.06825457046585]),
        zoom: c ? 14 : 11
    });

    this.map = new OlMap({
        target: 'map',
        // Added both layers
        layers: c ? [this.tileLayer, this.vectorLayer] : [this.tileLayer],
        view: this.view
    });

    //this.map.on('click', (event:MapBrowserEvent) => this.onClick.next(event))
    if (!c) {
        this.map.on('click', this.mapClick.bind(this))
    }
  }

  mapClick(e){
    let lonlat = toLonLat(e.coordinate)
    //console.log(lonlat) // => // [34.88740548491477, 32.0609369287851]
    let tempV = this.dal.get(DalService.tempLocFormValueDalKey)
    tempV[1].lat = lonlat[1]
    tempV[1].lng = lonlat[0]
    this.dal.set(DalService.tempLocFormValueDalKey, tempV)
    this.router.navigateByUrl('/locationEditForm' + (tempV[0] ? '/' + tempV[0] : '') )
  }


  createStyle(src, img) {
    return new Style({
      image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
        anchor: [0.5, 0.96],
        crossOrigin: 'anonymous',
        src: src,
        img: img,
        imgSize: img ? [img.width, img.height] : undefined
      }))
    });
  }

}
