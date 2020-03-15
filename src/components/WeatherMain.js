import React from 'react';
import style from '../styles/style.less';
import ReactDOM from 'react-dom';
import WeatherForm from './WeatherForm';
import WeatherList from './WeatherList';
import Sidebar from './Sidebar';
import Modal from 'react-awesome-modal';
import Rain from '../../videos/rain.mp4';
import Clear from '../../videos/sunny.mp4';
import Clouds from '../../videos/cloudy.mp4';
import ThunderLightning from '../../videos/thunder-lightning.mp4';
import Haze from '../../videos/haze.mp4';
import Snow from '../../videos/snow.mp4';
import { connect } from 'react-redux';
import { setCity, recentCity, setDetails, isOpen, visible } from '../actions';

class WeatherMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myRefs: '',
      video: ''
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.getRefsFromChild = this.getRefsFromChild.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  updateInputValue = (e) => {
    this.props.dispatch(setCity(e.target.value));

    this.setState({
      city: e.target.value
    });
  } // end updateInputValue()

  resetSearch = () => {
    this.state.myRefs.current.value = '';

    this.props.dispatch(isOpen(true));

    this.setState({
      video: []
    });
  } // end resetSearch()

  closeModal = (e) => {
    e.preventDefault();

    this.state.myRefs.current.value = '';

    this.props.dispatch(visible(false));
  } // end closeModal()

  getWeather = (e) => {
    e.preventDefault();

    if (!this.props.city) {
       this.props.dispatch(visible(true));
    } else {
      const city = this.props.city

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6d5233c17d482d1c20dabfc48d8b3112&units=imperial`, {
        headers: {
          Accept: 'application/json',
        }
      }).then((results) => {
        if (results.status === 404) {
          this.props.dispatch(visible(true));
          return;
        } else {
          return results.json();
        }
      }).then((data) => {
        if (data) {
          const details = {
            name: data.name,
            weather: data.weather[0].main,
            temp: parseInt(data.main.temp)
          };

          const weather = details.weather.toLowerCase();

          switch(weather) {
            case 'clouds':
              this.state.video = {Clouds};
              break;
            case 'clear':
              this.state.video = {Clear};
              break;
            case 'drizzle':
            case 'rain':
              this.state.video = {Rain};
              break;
            case 'haze': 
            case 'mist':
              this.state.video = {Haze};
              break;
            case 'thunderstorm':
              this.state.video = {ThunderLightning};
              break;
            case 'snow':
              this.state.video = {Snow};
          }

          this.props.dispatch(recentCity(city));
          this.props.dispatch(setDetails(details));
          this.props.dispatch(isOpen(false));

          this.setState({
            video: Object.values(this.state.video)[0]
          });
        }
      }); // end fetch()
    } // end if/else (!this.state.city)
  } // end getWeather()

  getRefsFromChild = (childRefs) => {
    this.setState({
      myRefs: childRefs
    });
  } // end getRefsFromChild()

  render() {
    return (
      <section className={style.container}>
        <Modal
          visible={this.props.visible}
          width="400"
          height="300"
          effect="fadeInUp"
        >
          <div className={style.modal}>
            <h1>We either can't find that city or you forgot to enter a city first.</h1>
            <a href="#" onClick={this.closeModal}>Search Again?</a>
          </div>
        </Modal>
        <div className={style.weatherMain + ' ' + style.bodyText}>
          <div className={style.hold}>
            <div className={style.weatherLeft}>
              <video key={this.state.video} className={style.video} loop autoPlay muted>
                <source src={this.state.video} type="video/mp4">
                </source>
                Your browser does not support the video tag.
              </video>
              <div className={style.weatherAbove}>
                <WeatherForm
                  updateInputValue={this.updateInputValue}
                  getWeather={this.getWeather}
                  passRefUpward={this.getRefsFromChild}
                  resetSearch={this.resetSearch}
                  isOpen={this.props.isOpen}
                  city={this.props.city}
                />
                <WeatherList
                  cityDetails={this.props.cityDetails}
                  isOpen={this.props.isOpen}
                />
              </div>
            </div>
            <div className={style.weatherRight}>
              <Sidebar
                recentCities={this.props.recentCities}
              />
            </div>
            <div className={style.clear}></div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.currentWeather.setCity,
    recentCities: state.currentWeather.recentCities,
    cityDetails: state.currentWeather.cityDetails,
    isOpen: state.currentWeather.isOpen,
    visible: state.currentWeather.visible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherMain);