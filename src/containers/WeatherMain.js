import React from 'react';
import style from '../assets/styles/style.less';
import WeatherForm from '../components/weather-form/WeatherForm';
import WeatherList from '../components/weather/WeatherList';
import Sidebar from '../components/sidebar/Sidebar';
import ErrorModal from '../components/modal/Modal';
import WeatherVideo from '../components/weather-video/WeatherVideo';
import WeatherIcons from '../components/weather/WeatherIcons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import Spinner from '../components/spinner/Spinner';

class WeatherMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {myRefs: ''};
    this.updateInputValue = this.updateInputValue.bind(this);
    this.getRefsFromChild = this.getRefsFromChild.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.getWeather = this.getWeather.bind(this);
  } 

  componentDidMount() {
    this.props.dispatch(actions.fetchRecentCities());
  }

  updateInputValue = (e) => {
    this.props.dispatch(actions.setCity(e.target.value));
  }

  resetSearch = () => {
    const refs = {...this.state.myRefs};
    refs.current.value = '';
    this.props.dispatch(actions.isOpen(true));
    this.props.dispatch(actions.setVideo(''));
    this.props.dispatch(actions.setCity(''));
  }

  closeModal = (e) => {
    e.preventDefault();
    const refs = {...this.state.myRefs};
    refs.current.value = '';
    this.props.dispatch(actions.visible(false));
    this.props.dispatch(actions.setCity(''));
    this.props.dispatch(actions.fetchOrdersSuccess());
  }

  getWeather = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.getWeather(this.props.city));
  }

  getRefsFromChild = (childRefs) => {
    this.setState({
      myRefs: childRefs
    });
  }

  render() {
    return (
      <section className={style.container}>
        <Spinner 
          loading={this.props.loading}
        />
        <ErrorModal 
          visible={this.props.visible} 
          closeModal={this.closeModal} 
        />
        <div className={`${style.weatherMain} ${style.bodyText}`}>
          <h1 className={style.pageHeader}>Search a city to check the weather</h1>
          <div className={style.hold}>
            <div className={style.weatherLeft}>
              <WeatherVideo 
                setVideo={this.props.setVideo}  
              />
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
            <div className={style.weatherRight}>
              <Sidebar
                recentCities={this.props.recentCities}
                visible={this.props.visible}
              />
            </div>
          </div>
        </div>
        <WeatherIcons 
          animate={false} 
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.currentWeather.setCity,
    setVideo: state.currentWeather.setVideo,
    recentCities: state.currentWeather.recentCities,
    cityDetails: state.currentWeather.cityDetails,
    isOpen: state.currentWeather.isOpen,
    visible: state.currentWeather.visible,
    loading: state.currentWeather.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

WeatherMain.propTypes = {
  recentCities: PropTypes.array,
  cityDetails: PropTypes.array,
  setVideo: PropTypes.string,
  dispatch: PropTypes.func,
  visible: PropTypes.bool,
  isOpen: PropTypes.bool,
  city: PropTypes.string,
  loading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherMain);