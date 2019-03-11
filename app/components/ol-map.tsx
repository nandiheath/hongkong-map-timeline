import { observer } from 'mobx-react';
import React, { Children } from 'react';
import {Map, View } from 'ol';
import * as control from 'ol/control';
import TileLayer from 'ol/layer/Tile';
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

  }

  public componentDidUpdate() {
  }

  public render() {

    return (
      <div ref="mapContainer"> </div>);


  }


}

export default observer(OLMap);