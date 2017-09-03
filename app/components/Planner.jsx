import React, { Component } from 'react'
import { mapKey } from '../../secrets.js'
import { withGoogleMap, GoogleMap, InfoWindow, Marker, DirectionRenderer, places } from 'react-google-maps'
import SearchBox from '../../node_modules/react-google-maps/lib/places/SearchBox.js'
import store from '../store'

let userLat, userLong, map

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  font: 'Nunito'
}

const InitialMap = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapMounted}
      zoom={props.zoom}
      center={props.center}
    >
    </GoogleMap>
  )
})

export default class Planner extends Component {

  constructor() {
    super()

    this.state = {
      center: { lat: 40.7292, lng: -73.9845},
      zoom: 13,
      searchPlace: {},
      bounds: null,
    }
  }

  render() {
    console.log('PLANNER PROPS', this.props)
    return (
      <div className="container no-margin clearfix">
        <div className="row">
          <div className="col-lg-6  col-md-6  col-sm-6  col-xs-6 map-container">
            <InitialMap
              containerElement={
                <div style={{ height: '100%', width: '100%' }} />
              }
              mapElement={
                <div id="map" />
              }
              center={this.state.center}
              zoom={this.state.zoom}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="itinerary-selector panel panel-dafault">
              <h3>Hotels</h3>
              <select>
                <option value="first">First</option>
                <option value="second">Second</option>
              </select>
              <button data-action="add" className="btn btn-primary btn-circle pull-right">+</button>
              <h3>Restaurants</h3>
              <select>
                <option value="first">First</option>
                <option value="second">Second</option>
              </select>
              <button data-action="add" className="btn btn-primary btn-circle pull-right">+</button>
              <h3>Activities</h3>
              <select>
                <option value="first">First</option>
                <option value="second">Second</option>
              </select>
              <button data-action="add" className="btn btn-primary btn-circle pull-right">+</button>
            </div>
            <div className="itinerary panel panel-dafault">
              <h3>Itinerary</h3>
              <div className="panel-heading">
                <div className="day-buttons">
                  <button className="btn btn-circle day-btn">1</button>
                  <button className="btn btn-circle day-btn" id="day-add">+</button>
                </div>
              </div>
              <div className="panel-body">
                <h4>Hotel</h4>
                <h4>Restaurants</h4>
                <h4>Activities</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
