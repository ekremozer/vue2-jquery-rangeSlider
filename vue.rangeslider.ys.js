/*
author: Yunus SARIBULUT
Requires Vue js 2 and Jquery UI.
Based on Jquery Range Slider
*/

Vue.component('RangeSlider', {
    props:["min", "max", "type", "value"],
    mounted:function(){
        var $el = $(this.$el);
        this.sliderInit($el);
    },
    methods:{
        getPrice: function (pr) {
            if (pr.length == 5)
                return pr.insert(2, ".");
            else if (pr.length == 4)
                return pr.insert(1, ".");
            else
                return pr;
        },
        fixValuesForShow: function(type, min, max){
            var comp = this;
            var minVal, maxVal;

            switch(type){
                case "time":
                    minVal = min.replace(':', 's ') + 'dk';
                    maxVal = max.replace(':', 's ') + 'dk';
                    break;

                case "hour":
                    minVal = min;
                    maxVal = max;
                    break;

                case "price":
                    minVal = comp.getPrice(min);
                    maxVal = comp.getPrice(max);
                    break;

                default:break;
            }
            var values = {
                min : minVal,
                max : maxVal
            };
            return values;
        },
        convertToInt: function(type, min, max){
            var returnVals = {
                min :0,
                max: 0
            };
            if(type === 'time' || type === 'hour'){
                var minVals = min.split(':');
                var maxVals = max.split(':');
                returnVals.min = (parseInt(minVals[0]) * 60) + parseInt(minVals[1]);
                returnVals.max = (parseInt(maxVals[0]) * 60) + parseInt(maxVals[1]);
            }
            else if(type === 'price'){
                returnVals.min = parseInt(min);
                returnVals.max = parseInt(max);
            }
            return returnVals;
        },
        rangeChange:function(ui){
            var comp = this;
            var newValues = {
                min:'',
                max:''
            };
            if (comp.type === 'time' || comp.type === 'hour') {
                var hours1 = Math.floor(ui.values[0] / 60).toString();
                var minutes1 = (ui.values[0] - (hours1 * 60)).toString();

                if (hours1.length == 1)
                    hours1 = '0' + hours1;
                if (minutes1.length == 1)
                    minutes1 = '0' + minutes1;
                if (minutes1 == 0)
                    minutes1 = '00';

                var hours2 = Math.floor(ui.values[1] / 60).toString();
                var minutes2 = (ui.values[1] - (hours2 * 60)).toString();

                if (hours2.length == 1)
                    hours2 = '0' + hours2;
                if (minutes2.length == 1)
                    minutes2 = '0' + minutes2;
                if (minutes2 == 0)
                    minutes2 = '00';

                var minHour = hours1 + ':' + minutes1;
                var maxHour = hours2 + ':' + minutes2;
                newValues = comp.fixValuesForShow(comp.type, minHour, maxHour);
            }
            else if (comp.type == 'price') {
                newValues = comp.fixValuesForShow(comp.type, ui.values[0].toString(), ui.values[1].toString());
            }
            comp.$emit('input', newValues);
        },
        sliderInit: function($el){
            var comp = this;
            
            comp.$emit('input', comp.fixValuesForShow(comp.type, comp.min, comp.max));

            var conv = comp.convertToInt(comp.type, comp.min, comp.max);
            $el.slider({
                range: true,
                min: conv.min,
                max: conv.max,
                values: [conv.min, conv.max],
                slide: function (e, ui) {
                    comp.rangeChange(ui);
                },
                change: function (e, ui) {
                    comp.rangeChange(ui);
                }
            });
        }
    },
    template: `
        <div class="gidisVarisSlider rangeSlider">
            <div class="rangeVals">
                <div class="pull-left rangeValShow"><span class="minValue">{{value.min}}</span></div>
                <div class="pull-right rangeValShow"><span class="maxValue">{{value.max}}</span></div>
                <span class="arsTxt">arası</span>
            </div>
        </div>`
});