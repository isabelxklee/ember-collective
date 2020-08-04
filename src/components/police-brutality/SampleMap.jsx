import React, {Component} from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import {ReactMapboxGlCluster} from 'react-mapbox-gl-cluster';
import {data} from './data'
 
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY
});
 
const mapProps = {
  center: [-95.7129, 37.0902],
  zoom: [3],
  style: 'mapbox://styles/mapbox/streets-v8',
};
 
class SampleMap extends Component {
  getEventHandlers() {
    return {
      onClick: (properties, coords, offset) =>
        console.log(`Receive event onClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
      onMouseEnter: (properties, coords, offset) =>
        console.log(`Receive event onMouseEnter at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
      onMouseLeave: (properties, coords, offset) =>
        console.log(`Receive event onMouseLeave at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
      onClusterClick: (properties, coords, offset) =>
        console.log(`Receive event onClusterClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`),
    };
  }
 
  render() {
    return (
      <div className="App">
        <Map {...mapProps} onStyleLoad={this.onStyleLoad}>
          <ReactMapboxGlCluster data={data} {...this.getEventHandlers()} />
        </Map>
      </div>
    );
  }
}

export default SampleMap