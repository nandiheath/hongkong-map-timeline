import { observer } from 'mobx-react';
import React, { Children } from 'react';
import { Map, View, Feature } from 'ol';
import { Point } from 'ol/geom';
import * as control from 'ol/control';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { click, pointerMove, altKeyOnly } from 'ol/events/condition';
import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';
import Collection from 'ol/Collection';

type MyProps = {
};

class OLMap extends React.Component<MyProps> {

  private vectorLayer: VectorLayer;
  private styleCache: any;
  private overlay: Overlay;
  private popupContent: any;

  public componentDidMount() {

    // Prepare the ol map obejct
    this.styleCache = {};
    this.vectorLayer = new VectorLayer({
      source: new Cluster({
        distance: 10,
        source: new VectorSource()
      }),
      style: this.getCachedStyleForFeature.bind(this)
    });

    const container = this.refs.popup;
    this.popupContent = this.refs['popup-content'];
    

    this.overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    const map = new Map({
      target: this.refs.mapContainer,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      overlays: [this.overlay],
      controls: control.defaults({
        attribution: false,
        zoom: false,
        rotate: false,
      }),
      view: new View({
        center: [114.160147, 22.35201],
        projection: 'EPSG:4326',
        zoom: 11,

      })
    });

    map.on('moveend', this.onMoveEnd.bind(this));

    // select interaction working on "click"
    const selectClick = new Select({
      condition: click
    });

    map.addInteraction(selectClick);
    selectClick.on('select', this.onFeatureSelected.bind(this));
  }

  private onPopupCloseClicked(evt) {
    evt.stopPropagation();
    this.clearPopup();
  }

  private onFeatureSelected(evt) {
    console.log('clicked');
    const select: Select = evt.target;
    if (select === undefined) {
      
      return;
    }
    const features: Feature[] = select.getFeatures().getArray();
    if (features && features.length > 0) {
      const clusteredFeatures: Feature[] = features[0].get('features');

      // Set the popup location
      const coordinates = features[0].getGeometry().getCoordinates();
      this.overlay.setPosition(coordinates);

      // set the features
      this.setPopupText(clusteredFeatures);
    } else {
      this.clearPopup();
    }
  }

  private clearPopup() {
    this.overlay.setPosition(undefined);
  }

  private setPopupText(features) {
    let text = '';
    features.forEach( (feature, index) => {
      if (index < 5) {
        text += feature.get('name') + '<br>';
      }      
    })

    if (features.length > 5) {
      text += `...(${features.length})`
    }

    this.popupContent.innerHTML = text;
  }

  /**
   * For caching the styles used for clustered feature
   * @param feature 
   */
  private getCachedStyleForFeature(feature) {
    const size = feature.get('features').length;
    let style = this.styleCache[size];
    if (!style) {
      style = new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: '#fff'
          }),
          fill: new Fill({
            color: '#3399CC'
          })
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff'
          })
        })
      });
      this.styleCache[size] = style;
    }
    return style;
  }

  /**
   * On map relocated.
   * @param evt MapEvent
   */
  private async onMoveEnd(evt) {

    // reset the popup
    this.clearPopup();

    const map = evt.map;
    const center = map.getView().getCenter();

    const res = await fetch(`http://localhost:1337/place?lat=${center[1]}&lng=${center[0]}&r=10000`);
    const { data: {
      places,
    } } = await res.json();
    const features = places.map(place => new Feature({
      geometry: new Point([place.location.lng, place.location.lat]),
      name: place.name.zh_hk
    }))

    const source: VectorSource = this.vectorLayer.getSource().getSource();
    source.clear();
    source.addFeatures(features);
  }

  public componentDidUpdate() {
  }

  public render() {

    return (
      <div>
        <div ref="popup" className="ol-popup" >
          <a ref="popup-closer" href="#" className="ol-popup-closer" onClick={this.onPopupCloseClicked.bind(this)}></a>
          <div ref="popup-content" ></div>
        </div>
        <div ref="mapContainer" > </div>
        {/* Styled CSS */}
        <style jsx global>{`
          .ol-popup {
            position: absolute;
            background-color: white;
            color:black;
            -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
            filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #cccccc;
            bottom: 12px;
            left: -50px;
            min-width: 280px;
          }
          .ol-popup:after, .ol-popup:before {
            top: 100%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
          }
          .ol-popup:after {
            border-top-color: white;
            border-width: 10px;
            left: 48px;
            margin-left: -10px;
          }
          .ol-popup:before {
            border-top-color: #cccccc;
            border-width: 11px;
            left: 48px;
            margin-left: -11px;
          }
          .ol-popup-closer {
            text-decoration: none;
            position: absolute;
            top: 2px;
            right: 8px;
          }
          .ol-popup-closer:after {
            color: red;
            content: "✖";
          }
        `}</style>
      </div>
    );


  }
}

export default observer(OLMap);