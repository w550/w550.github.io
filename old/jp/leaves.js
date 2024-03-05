define( 'page', ['../lib/js/config/config'], function( require, exports, module){
    require('../lib/js/config/config');
    function init() {
        /* Get a reference to the element that will contain the leaves */
        var container = document.getElementById('yinghua');
        /* Fill the empty container with new leaves */
        for (var i = 0; i < 3; i++) {
            container.appendChild(createALeaf());
        }
    }


    /*
        Receives the lowest and highest values of a range and
        returns a random integer that falls within that range.
    */
    function randomInteger(low, high) {
        return low + Math.floor(Math.random() * (high - low));
    }


    /*
       Receives the lowest and highest values of a range and
       returns a random float that falls within that range.
    */
    function randomFloat(low, high) {
        return low + Math.random() * (high - low);
    }


    /*
        Receives a number and returns its CSS pixel value.
    */
    function pixelValue(value) {
        return value + '%';
    }


    /*
        Returns a duration value for the falling animation.
    */

    function durationValue(value) {
        return value + 's';
    }


    /*
        Uses an img element to create each leaf. "Leaves.css" implements two spin 
        animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
        function determines which of these spin animations should be applied to each leaf.
        
    */
    function createALeaf() {
        /* Start by creating a wrapper div, and an empty img element */
        var leafDiv = document.createElement('div');
        var image = document.createElement('img');

        /* Randomly choose a leaf image and assign it to the newly created element */
        image.src = OP_CDN_PREFIX+'images/yinghua' + randomInteger(1, 3) + '.png';

        leafDiv.style.top = "-20px";

        /* Position the leaf at a random location along the screen */
        leafDiv.style.left = pixelValue(randomInteger(10, 80));


        /* Randomly choose a spin animation */
        var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';

        /* Set the -webkit-animation-name property with these values */
        leafDiv.style.webkitAnimationName = 'fade, drop';
        image.style.webkitAnimationName = spinAnimationName;

        /* Figure out a random duration for the fade and drop animations */
        var fadeAndDropDuration = durationValue(randomFloat(2, 11));

        /* Figure out another random duration for the spin animation */
        var spinDuration = durationValue(randomFloat(4, 42));
        /* Set the -webkit-animation-duration property with these values */
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

        var leafDelay = durationValue(randomFloat(0, 2));
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

        image.style.webkitAnimationDuration = spinDuration;

        // add the <img> to the <div>
        leafDiv.appendChild(image);

        /* Return this img element so it can be added to the document */
        return leafDiv;
    }
     window.addEventListener('load', init, false);
    module.exports = init;
});

/* Calls the init function when the "Falling Leaves" page is full loaded */
// window.addEventListener('load', init, false);

// define({

// 	DOMAIN_SERVER: 'http://test.117go.wang:8011',
// 	MYHOST: 'http://test.117go.wang:8011',
// 	OP_CDN_PREFIX: 'http://555.117go.wang:8011/jp20151223/',
// 	LIB_PREFIX: 'http://555.117go.wang:8011/lib/',
// 	OP_DATA_PREFIX: 'http://555.117go.wang:8011/jp20151223/',
	
// 	//提示语
// 	SYSTEM_ERROR_MSG: '系统繁忙，请稍后重试！'
// });
define( '../lib/js/config/config', [], function( require, exports, module){


	DOMAIN_SERVER = 'http://test.117go.wang:8011';
	MYHOST = 'http://test.117go.wang:8011';
	MYHOSTPAY = 'http://test.117go.wang:8011';
	OP_CDN_PREFIX = 'http://555.117go.wang:8011/jp20151223/';
	LIB_PREFIX = 'http://555.117go.wang:8011/lib/';
	OP_DATA_PREFIX = 'http://555.117go.wang:8011/jp20151223/';
	
	//提示语
	SYSTEM_ERROR_MSG = '系统繁忙，请稍后重试！';
});


