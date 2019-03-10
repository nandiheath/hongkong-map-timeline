import { observer } from 'mobx-react';
import React, { Children } from 'react';
import {Map, View} from 'ol';
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
      view: new View({
        center: [0, 0],
        zoom: 0
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