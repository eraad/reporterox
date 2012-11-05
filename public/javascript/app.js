$(document).ready(function() {
    var demoSlider = Sliderman.slider({
        container: 'SliderName_2',
        width: 695,
        height: 325,
        display: {
            autoplay: 3000,
            loading: {background: '#000000', opacity: 0.5, image: '../images/loading.gif'},
            description: {background: '#000', opacity: 0.5, height: 50, position: 'bottom'},
            buttons: {
                hide: false,
                opacity: 1,
                prev: {className: 'SliderNamePrev_2', label: ''},
                next: {className: 'SliderNameNext_2', label: ''}
            },
            navigation: {container: 'SliderNameNavigation_2', label: '&nbsp;'}
        }
    });
});
