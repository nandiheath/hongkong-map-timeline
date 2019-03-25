import { observer } from 'mobx-react';
import React, { Children } from 'react';
import { Map, View, Feature } from 'ol';
import { Point } from 'ol/geom';
import { transform } from 'ol/proj';
import * as control from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import * as ol from 'ol';
import OSM from 'ol/source/OSM';


type MyProps = {
};

class OLMap extends React.Component<MyProps> {

  public componentDidMount() {
    const map = new Map({
      target: this.refs.mapContainer,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      controls: control.defaults({
        attribution: false,
        zoom: false,
      }),
      view: new View({
        center: [114.160147, 22.35201],
        projection: 'EPSG:4326',
        zoom: 11,
      })
    });

    map.on('moveend', this.onMoveEnd);
  }

  private async onMoveEnd(evt) {
    const map = evt.map;
    const center = map.getView().getCenter();


    const res = await fetch(`http://localhost:1337/place?lat=${center[1]}&lng=${center[0]}&r=1000`);
    const { data: {
      places,
    } } = await res.json();
    const features = places.map(place => new Feature({
      geometry: new Point(transform([place.lng, place.lat], 'EPSG:4326',     
      'EPSG:3857')),
      name: place.name.zh_hk
    }))

    const vectorSource = new ol.source.Vector({
      features //add an array of features
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource      
    });
    map.addLayer(vectorLayer);
  }

  public componentDidUpdate() {
  }

  public render() {

    return (
      <div ref="mapContainer"> </div>);


  }
}

export default observer(OLMap);