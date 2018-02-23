# vue2-jquery-rangeSlider

# Project Title
Jquery range slider with Vue js 2

## Getting Started

Hi guys, this is my first repository on GitHub, I needed a component for a project I am working on. So with this component,
you can use jquery range slider with Vue JS.

### Prerequisites

You need to add JQuery, JQuery UI, JQuery UI CSS and VueJS 2.

### Installing

Example Usage

```
<range-slider 
:min="MinValue" 
:max="MaxValue" 
type="hour" 
v-model="SelectedRangeModel">
</range-slider>
```

## Types and Explanations
```
there are 3 types for now
  "hour" min and max must be like "10:00"
  "time" min and max must be like "10:00"
  "price" min and max must be convertable to int like "100"
```
```
difference with "hour" and "time" is that 
when type is "hour" return value is like :  "10:00"
when type is "time" return value is like : "10s 00dk"
s == saat == hours (saat means hour in turkish)
dk == dakika == minute (dakika means minute in turkish)
```
## Built With

* [VueJS](https://vuejs.org/v2/guide/)
* [JQuery & JQuery UI](http://jquery.com/)
## Versioning

I have no versioning because this repository will not be updated very often. I developed this for my other project and added
here so if anyone is in need a jquery range slider, can get an upgrade for their own usage.

## License

This project is not licensed at all, have fun :)

## Acknowledgments

* All kinds of feedback appreciated, thanks :)
