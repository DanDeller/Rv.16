import React from 'react';
import style from '../../assets/styles/style.less';
import PropTypes from 'prop-types';

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.city = React.createRef();
  }

  componentDidMount() {
    this.props.passRefUpward(this.city);
    this.city.current.focus();
  }

  componentDidUpdate() { 
    this.city.current.focus();
  }

  render() {
    return (
      <div className={style.weatherForm}> 
        <div className={`${(this.props.isOpen ? style.show : style.hide)}`}>
          <form action='/' method='GET'>
            <input
              ref={this.city}
              onChange={this.props.updateInputValue}
              type='text'
              placeholder='Search city'
              className={style.searchMain}
            />
            <input
              onClick={e => this.props.getWeather(e)}
              type='submit'
              value='Search'
              className='search-city'
            />
          </form>
        </div>
        <div className={`${style.resetButton} ${(this.props.isOpen ? style.hide : style.show)}`}>
          <p>Seach another city?</p>
          <button
            onClick={this.props.resetSearch}>Search
          </button>
        </div>
      </div>
    );
  }
}

WeatherForm.propTypes = {
  updateInputValue: PropTypes.func,
  passRefUpward: PropTypes.func,
  resetSearch: PropTypes.func,
  getWeather: PropTypes.func,
  isOpen: PropTypes.bool
};

export default WeatherForm;