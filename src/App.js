import WeatherLookupSpinner from './components/spinner/WeatherLookupSpinner';
import WeatherIcons from './components/weather/WeatherIcons';
import style from './assets/styles/styles-default.scss';
import Header from './components/header-footer/Header';
import Footer from './components/header-footer/Footer';
import ErrorModal from './components/modal/Modal';
import { connect } from 'react-redux';
import Main from './Main';
import React from 'react';

class App extends React.Component {
  render () {
    return (
      <div className={style.wrap}>
        <Header isAuth={this.props.isAuth} />
        <Main />
        <Footer />
        <WeatherLookupSpinner />
        <ErrorModal />
        <WeatherIcons animate={true} />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuth: state.isAuthenticated.isAuthenticated
  }
};

export default connect(mapStateToProps)(App);