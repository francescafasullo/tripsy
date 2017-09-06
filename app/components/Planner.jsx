import React, { Component } from 'react'
import { mapKey } from '../../secrets.js'
import { withGoogleMap, GoogleMap, InfoWindow, Marker, DirectionRenderer, places } from 'react-google-maps'
import SearchBox from '../../node_modules/react-google-maps/lib/places/SearchBox.js'
import store from '../store'
import { Button } from 'react-bootstrap'

let userLat, userLong, map, markers, markerObjs

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
    {
      markerObjs && markerObjs.map((marker, index) => (
        <Marker
          key={index}
          {...marker}
        />
      ))
    }
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.trip.currentDay) {
      const hotelPlaces = nextProps.trip.currentDay.hotels.map(hotel => hotel.location)
      const restaurantPlaces = nextProps.trip.currentDay.restaurants.map(restaurant => restaurant.location)
      const activityPlaces = nextProps.trip.currentDay.activities.map(activity => activity.location)
      markers = hotelPlaces.concat(restaurantPlaces).concat(activityPlaces)
      markerObjs = markers.map(marker => {
        return new google.maps.Marker({
          position: {lat: marker[0], lng: marker[1]},
          map: map
        })
      })
    }
  }

  render() {
    console.log('planner props', this.props)
    let numDays = this.props.trip ? this.props.trip.days.length : null
    console.log('how many days', numDays)
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
            >
            </InitialMap>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="itinerary-selector panel panel-dafault">
              <form>
                <div className="form-group">
                  <label for="hotel-select">Hotels</label>
                  <select className="form-control" id="hotel-select">
                    {
                      this.props.trip ? this.props.trip.trip.hotels.map(hotel => {
                        return (
                          <option key={hotel.id} value={hotel.name}>{hotel.name}</option>
                        )
                      }) : null
                    }
                  </select>
                  <button data-action="add" className="btn btn-primary btn-circle pull-right">+</button>
                </div>
                <div className="form-group">
                  <label for="hotel-select">Restaurants</label>
                  <select className="form-control" id="restaurant-select">
                    {
                      this.props.trip ? this.props.trip.trip.restaurants.map(restaurant => {
                        return (
                          <option key={restaurant.id} value={restaurant.name}>{restaurant.name}</option>
                        )
                      }) : null
                    }
                  </select>
                  <button data-action="add" className="btn btn-primary btn-circle pull-right">+</button>
                </div>
                <div className="form-group">
                  <label for="activity-select">Activities</label>
                  <select className="form-control" id="activity-select">
                    {
                      this.props.trip ? this.props.trip.trip.activities.map(activity => {
                        return (
                          <option key={activity.id} value={activity.name}>{activity.name}</option>
                        )
                      }) : null
                    }
                  </select>
                  <button data-action="add" className="btn btn-primary btn-circle pull-right">+</button>
                </div>
              </form>
            </div>
            <div className="itinerary panel panel-dafault">
              <h3>Itinerary</h3>
              <div className="panel-heading">
                <div className="day-buttons">
                  {
                    this.props.trip ? this.props.trip.days.map(day => {
                      return (
                        <Button key={day.id} className="btn btn-circle day-btn">{day.number}</Button>
                      )
                    }) : null
                  }
                  <Button className="btn btn-circle day-btn" id="day-add" onClick={() => this.props.addDayToTrip(this.props.trip.trip.id, numDays + 1)}>+</Button>
                </div>
              </div>
              <div className="panel-body">
                <h3>Hotel</h3>
                  {
                    this.props.trip ? this.props.trip.currentDay.hotels.map(hotel => {
                      return (
                        <h5 key={hotel.id}>{hotel.name}</h5>
                      )
                    }) : null
                  }
                <h3>Restaurants</h3>
                  {
                    this.props.trip ? this.props.trip.currentDay.restaurants.map(restaurant => {
                      return (
                        <h5 key={restaurant.id}>{restaurant.name}</h5>
                      )
                    }) : null
                  }
                <h3>Activities</h3>
                  {
                    this.props.trip ? this.props.trip.currentDay.activities.map(activity => {
                      return (
                        <h5 key={activity.id}>{activity.name}</h5>
                      )
                    }) : null
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
