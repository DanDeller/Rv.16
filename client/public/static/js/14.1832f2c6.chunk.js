(this.webpackJsonptinyWeather=this.webpackJsonptinyWeather||[]).push([[14],{140:function(e,t,a){},170:function(e,t,a){"use strict";a.r(t);var n=a(34),c=a(15),r=a(0),i=a.n(r),s=a(138),l=a.n(s);a(140),a(141);t.default=function(){var e=Object(c.c)(),t=Object(c.d)((function(e){return e.currentWeather})),a=Object(c.d)((function(e){return e.fiveDayForecast})),s=t.setCity.length?"hide":"show";Object(r.useEffect)((function(){var c=a.fetchFlag,r=t.setCity;t.setCity.length&&!c&&(e(n.a(r)),e(n.b(!!a.fetchFlag)))}),[]);var o=a.days.map((function(e,a){return i.a.createElement("div",{className:"day ".concat(0===t.setCity.length?"hide":"show"),key:a},i.a.createElement("p",null,i.a.createElement(l.a,{format:"dddd"},e.dt_txt.split(" ")[0]),i.a.createElement("span",null,e.dt_txt.split(" ")[0])),i.a.createElement("p",null,e.main.temp.toFixed(0)),i.a.createElement("p",null,"".concat(e.weather[0].description[0].toUpperCase()).concat(e.weather[0].description.slice(1))))}));return i.a.createElement("section",{className:"container"},i.a.createElement("div",{className:"weather-main body-text"},i.a.createElement("h1",{className:"page-header"},"Forecast for the next five days"),i.a.createElement("div",{className:"day-hold"},i.a.createElement("h3",{className:"hide forgot-city ".concat(s)},"Go lookup a city first!"),o)))}}}]);
//# sourceMappingURL=14.1832f2c6.chunk.js.map