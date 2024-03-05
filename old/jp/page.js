define( 'page', ['../lib/js/modules/Swiper/swiper', 'jquery.bpopup.min', 'jquery.mobile-events.min', 'leaves', '../lib/js/config/config', 'prefixfree.min', 'yanhua', 'Snow', 'ThreeCanvas', 'playSnow'], function( require, exports, module){



    var Swiper = require('../lib/js/modules/Swiper/swiper');
    require('./jquery.bpopup.min');
    require('./jquery.mobile-events.min');

    /*树叶*/
    require('./leaves');

    /*烟花*/
    require('./prefixfree.min');
    require('./yanhua');

    //雪花特效
    require('./Snow');
    var Snow = require('./playSnow');


    window.onload = function() {

        Snow();
    }


    $(document).ready(function() {

        //分享功能
        var webconfig = {
            'gobackFunc': 'window.goback()',
            'sns': {
                'enableMore': 1,
                'sina': 1,
                'weChat': 1,
                'weMoments': 1,
                'zls': 1,
                'qq': 1,
                'qZone': 1,
                'clipBoard': 1,
                'sms': 0
            }
        };
        travo(webconfig);
        var shareObj = {};
        shareObj.shareTitle = '旅行中该怎么“日”？';
        shareObj.shareTxt = '超级达人力荐4条日本路线，教你一步步从头到尾玩透日本。';
        shareObj.shareUrl = 'http://tao.117go.com/japan-strategy?refer=zlswx';
        shareObj.sharePic = OP_CDN_PREFIX + 'images/share.jpg';
        travo.setShareParam(shareObj.shareTitle, shareObj.sharePic, shareObj.shareUrl, shareObj.shareTxt);



        $("a").on('click', function(e) {
            //e.preventDefault(); 
            var $this = $(this);
            localStorage.setItem($this.attr('href'), true);
            $this.addClass('visited');
        });

        $("a").each(function(index, elem) {
            var item = $(elem);
            if (localStorage.getItem(item.attr('href'))) {
                item.addClass('visited');
            }
        });

        $('html').css({
            "font-size": 20 / 320 * $window.width()
        });

        
        var swiper = new Swiper('.swiper-container');
        
        $('.role').tap(function() {
            $('.role_pop').bPopup();
        })
        $('.role_pop button').tap(function() {
            $('.b-modal').click();
        })

        $('.egg').click(function() {
            $('.zaozhidao').bPopup();
        })
        $('.zaozhidao button').tap(function() {
            $('.b-modal').click();
        })


    })


});

/**
 * Swiper 3.0.8
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: June 14, 2015
 */
define( '../lib/js/modules/Swiper/swiper', [], function( require, exports, module){
// (function () {
    'use strict';
    /*===========================
    Swiper
    ===========================*/
    var Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            // Hash Navigation
            hashnav: false,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            // Pagination
            pagination: null,
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // NS
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slidePrevClass: 'swiper-slide-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationHiddenClass: 'swiper-pagination-hidden',
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Version
        s.version = '3.0.8';
        
        // Params
        s.params = params;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        var $;
        if (typeof Dom7 === 'undefined') {
            $ = window.Dom7 || window.Zepto || window.jQuery;
        }
        else {
            $ = Dom7;
        }
        if (!$) return;
        
        // Export it to Swiper instance
        s.$ = $;
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            s.container.each(function () {
                new Swiper(this, params);
            });
            return;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push('swiper-container-' + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push('swiper-container-free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push('swiper-container-no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push('swiper-container-3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push('swiper-container-' + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
            s.params.setWrapperSize = false;
        }
        if (s.params.effect === 'fade') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.paginationClickable) {
                s.paginationContainer.addClass('swiper-pagination-clickable');
            }
        }
        
        // Is Horizontal
        function isH() {
            return s.params.direction === 'horizontal';
        }
        
        // RTL
        s.rtl = isH() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push('swiper-container-rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push('swiper-container-multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push('swiper-container-android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        // Locks, unlocks
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
        };
        
        
        /*=========================
          Set grab cursor
          ===========================*/
        if (s.params.grabCursor) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = '-webkit-grab';
            s.container[0].style.cursor = '-moz-grab';
            s.container[0].style.cursor = 'grab';
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    image.src = src;
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, s.params.autoplay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && isH() || height === 0 && !isH()) {
                return;
            }
            s.width = width;
            s.height = height;
            s.size = isH() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = 0,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css({
                            'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        })
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (isH()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size);
        
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (isH()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) > Math.floor(s.snapGrid[s.snapGrid.length - 1])) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (isH()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = isH() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = s.params.centeredSlides ? -translate + s.size / 2 : -translate;
            if (s.rtl) offsetCenter = s.params.centeredSlides ? translate - s.size / 2 : translate;
        
            // Visible Slides
            var containerBox = s.container[0].getBoundingClientRect();
            var sideBefore = isH() ? 'left' : 'top';
            var sideAfter = isH() ? 'right' : 'bottom';
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideCenterOffset = (s.params.centeredSlides === true) ? slide.swiperSlideSize / 2 : 0;
                var slideProgress = (offsetCenter - slide.swiperSlideOffset - slideCenterOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset - slideCenterOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
        
            // Pagination
            if (s.bullets && s.bullets.length > 0) {
                s.bullets.removeClass(s.params.bulletActiveClass);
                var bulletIndex;
                if (s.params.loop) {
                    bulletIndex = Math.ceil(s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup;
                    if (bulletIndex > s.slides.length - 1 - s.loopedSlides * 2) {
                        bulletIndex = bulletIndex - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (bulletIndex > s.bullets.length - 1) bulletIndex = bulletIndex - s.bullets.length;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        bulletIndex = s.snapIndex;
                    }
                    else {
                        bulletIndex = s.activeIndex || 0;
                    }
                }
                if (s.paginationContainer.length > 1) {
                    s.bullets.each(function () {
                        if ($(this).index() === bulletIndex) $(this).addClass(s.params.bulletActiveClass);
                    });
                }
                else {
                    s.bullets.eq(bulletIndex).addClass(s.params.bulletActiveClass);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton) {
                    if (s.isBeginning) {
                        $(s.params.prevButton).addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.prevButton));
                    }
                    else {
                        $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.prevButton));
                    }
                }
                if (s.params.nextButton) {
                    if (s.isEnd) {
                        $(s.params.nextButton).addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.nextButton));
                    }
                    else {
                        $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.nextButton));
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var bulletsHTML = '';
                var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                for (var i = 0; i < numberOfBullets; i++) {
                    if (s.params.paginationBulletRender) {
                        bulletsHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
                    }
                    else {
                        bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>';
                    }
                }
                s.paginationContainer.html(bulletsHTML);
                s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            function forceSetTranslate() {
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated, newTranslate;
                if (s.params.freeMode) {
                    forceSetTranslate();
                }
                else {
                    if (s.params.slidesPerView === 'auto' && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
        
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            else {
                s.updateClasses();
                if (s.params.slidesPerView === 'auto' && s.isEnd && !s.params.centeredSlides) {
                    s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    s.slideTo(s.activeIndex, 0, false, true);
                }
            }
        
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
        if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
        else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
                }
                if (params.simulateTouch && !s.device.ios && !s.device.android) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton) {
                $(s.params.nextButton)[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) $(s.params.nextButton)[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton) {
                $(s.params.prevButton)[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) $(s.params.prevButton)[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                $(s.paginationContainer)[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function (detach) {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex;
                if (s.params.loop) {
                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
                    if (slideToIndex > s.slides.length - s.params.slidesPerView) {
                        s.fixLoop();
                        slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]').eq(0).index();
                        setTimeout(function () {
                            s.slideTo(slideToIndex);
                        }, 0);
                    }
                    else if (slideToIndex < s.params.slidesPerView - 1) {
                        s.fixLoop();
                        var duplicatedSlides = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]');
                        slideToIndex = duplicatedSlides.eq(duplicatedSlides.length - 1).index();
                        setTimeout(function () {
                            s.slideTo(slideToIndex);
                        }, 0);
                    }
                    else {
                        s.slideTo(slideToIndex);
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
            isTouched = true;
            isMoved = false;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) return;
            if (s.params.onlyExternal) {
                isMoved = true;
                s.allowClick = false;
                return;
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
        
            s.emit('onTouchMove', s, e);
        
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                isScrolling = isH() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving && s.browser.ieTouch) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor) {
                    s.container[0].style.cursor = 'move';
                    s.container[0].style.cursor = '-webkit-grabbing';
                    s.container[0].style.cursor = '-moz-grabbin';
                    s.container[0].style.cursor = 'grabbing';
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
            if (!s.params.followFinger) return;
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[isH() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[isH() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            s.emit('onTouchEnd', s, e);
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched) {
                s.container[0].style.cursor = 'move';
                s.container[0].style.cursor = '-webkit-grab';
                s.container[0].style.cursor = '-moz-grab';
                s.container[0].style.cursor = 'grab';
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < 0.02) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                return false;
            }
        
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            for (var i = 0; i < s.slidesGrid.length; i++) {
                if (- translate >= s.slidesGrid[i]) {
                    slideIndex = i;
                }
            }
        
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
        
            if (translate === s.translate) {
                s.updateClasses();
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
            var translateX = isH() ? translate : 0, translateY = isH() ? 0 : translate;
            if (speed === 0) {
                s.setWrapperTransition(0);
                s.setWrapperTranslate(translate);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTransition(speed);
                s.setWrapperTranslate(translate);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                }
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                }
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (isH()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = isH() ? x : y;
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = isH() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!isH()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (isH()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
                        
                        if (!isH()) {
                            ty = tx;
                            tx = 0;
                        }
                        
                        var transform = 'rotateX(' + (isH() ? 0 : -slideAngle) + 'deg) rotateY(' + (isH() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            var shadowOpacity = slide[0].progress;
                            if (shadowBefore.length) shadowBefore[0].style.opacity = -slide[0].progress;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = slide[0].progress;
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
                        
                    if (s.params.cube.shadow) {
                        if (isH()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (isH() ? 0 : wrapperRotate) + 'deg) rotateY(' + (isH() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !isH()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = isH() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = isH() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = isH() ? rotate * offsetMultiplier : 0;
                        var rotateX = isH() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = isH() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = isH() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
                
                var slide = s.slides.eq(index);
                var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
                if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
                    img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass('swiper-lazy-loading');
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src');
                    s.loadImage(_img[0], (src || background), false, function () {
                        if (background) {
                            _img.css('background-image', 'url(' + background + ')');
                            _img.removeAttr('data-background');
                        }
                        else {
                            _img.attr('src', src);
                            _img.removeAttr('data-src');
                        }
                            
                        _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
                        slide.find('.swiper-lazy-preloader, .preloader').remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
                    
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
                    
            },
            load: function () {
                var i;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (s.params.slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);    
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (s.params.slidesPerView > 1) {
                        // Next Slides
                        for (i = s.activeIndex + s.params.slidesPerView; i < s.activeIndex + s.params.slidesPerView + s.params.slidesPerView; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = s.activeIndex - s.params.slidesPerView; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = isH() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
                
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (isH()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
                
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && isH()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (isH()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');   
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');   
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            setTranslate: function (translate, byController) {
                var controlled = s.params.control;
                var multiplier, controlledTranslate;
                function setControlledTranslate(c) {
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                    controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
                }
                if (s.isArray(controlled)) {
                    for (var i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTranslate(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTranslate(controlled);
                }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            c.onTransitionEnd();
                        });
                    }
                }
                if (s.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            init: function () {
                if (!s.params.hashnav) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (!hash) return;
                var speed = 0;
                for (var i = 0, length = s.slides.length; i < length; i++) {
                    var slide = s.slides.eq(i);
                    var slideHash = slide.attr('data-hash');
                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                        var index = slide.index();
                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                    }
                }
            },
            setHash: function () {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || '';
            }
        };

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (isH() && kc === 39 || !isH() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (isH() && kc === 37 || !isH() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.swiper-slide').length > 0 && s.container.parents('.swiper-slide-active').length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
                    ) {
                        inView = true;
                    }
        
                }
                if (!inView) return;
            }
            if (isH()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            }
            else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
        }
        s.disableKeyboardControl = function () {
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            $(document).on('keydown', handleKeyboard);
        };
        

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        if (s.params.mousewheelControl) {
            if (document.onmousewheel !== undefined) {
                s.mousewheel.event = 'mousewheel';
            }
            if (!s.mousewheel.event) {
                try {
                    new window.WheelEvent('wheel');
                    s.mousewheel.event = 'wheel';
                } catch (e) {}
            }
            if (!s.mousewheel.event) {
                s.mousewheel.event = 'DOMMouseScroll';
            }
        }
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var we = s.mousewheel.event;
            var delta = 0;
            //Opera & IE
            if (e.detail) delta = -e.detail;
            //WebKits
            else if (we === 'mousewheel') {
                if (s.params.mousewheelForceToAxis) {
                    if (isH()) {
                        if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX;
                        else return;
                    }
                    else {
                        if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
                        else return;
                    }
                }
                else {
                    delta = e.wheelDelta;
                }
            }
            //Old FireFox
            else if (we === 'DOMMouseScroll') delta = -e.detail;
            //New FireFox
            else if (we === 'wheel') {
                if (s.params.mousewheelForceToAxis) {
                    if (isH()) {
                        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX;
                        else return;
                    }
                    else {
                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
                        else return;
                    }
                }
                else {
                    delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? - e.deltaX : - e.deltaY;
                }
            }
        
            if (s.params.mousewheelInvert) delta = -delta;
        
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if (!s.isEnd) s.slideNext();
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                    else {
                        if (!s.isBeginning) s.slidePrev();
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
        
            }
            else {
                //Freemode or scrollContainer:
        
                var position = s.getWrapperTranslate() + delta;
        
                if (position > 0) position = 0;
                if (position < s.maxTranslate()) position = s.maxTranslate();
        
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
        
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                }
        
                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }
            if (s.params.autoplay) s.stopAutoplay();
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            s.container.off(s.mousewheel.event, handleMousewheel);
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            s.container.on(s.mousewheel.event, handleMousewheel);
            return true;
        };

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (isH()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress + '%';
            }
            else {
                pX = pX * progress + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }   
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
                    
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };

        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el[0].tabIndex = '0';
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMsg);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMsg);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMsg);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMsg);
                    }
                }
            },
        
            liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton) {
                    var nextButton = $(s.params.nextButton);
                    s.a11y.makeFocusable(nextButton);
                    s.a11y.addRole(nextButton, 'button');
                    s.a11y.addLabel(nextButton, s.params.nextSlideMsg);
                }
                if (s.params.prevButton) {
                    var prevButton = $(s.params.prevButton);
                    s.a11y.makeFocusable(prevButton);
                    s.a11y.addRole(prevButton, 'button');
                    s.a11y.addLabel(prevButton, s.params.prevSlideMsg);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        

    
        // Return swiper instance
        return s;
    };
    

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipad,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                    }
                    catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }
                    else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
    
        return $;
    })();
    

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    for (var i = 0; i < swiperDomPlugins.length; i++) {
        if (window[swiperDomPlugins[i]]) {
            addLibraryPlugin(window[swiperDomPlugins[i]]);
        }
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
        domLib = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
        domLib = Dom7;
    }
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
    }
        
    module.exports = Swiper;

    // window.Swiper = Swiper;
// })();
});
/*===========================
Swiper AMD Export
===========================*/
// if (typeof(module) !== 'undefined')
// {
//     module.exports = window.Swiper;
// }
// else if (typeof define === 'function' && define.amd) {
//     define([], function () {
//         'use strict';
//         return window.Swiper;
//     });
// }
define( 'jquery.bpopup.min', [], function( require, exports, module){
/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.11.0.min
 ================================================================================*/
 ;(function(c){c.fn.bPopup=function(A,E){function L(){a.contentContainer=c(a.contentContainer||b);switch(a.content){case "iframe":var d=c('<iframe class="b-iframe" '+a.iframeAttr+"></iframe>");d.appendTo(a.contentContainer);t=b.outerHeight(!0);u=b.outerWidth(!0);B();d.attr("src",a.loadUrl);l(a.loadCallback);break;case "image":B();c("<img />").load(function(){l(a.loadCallback);F(c(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:B(),c('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(d,b,e){l(a.loadCallback,b);F(c(this))}).hide().appendTo(a.contentContainer)}}function B(){a.modal&&c('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+v}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);C();b.data("bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?f.scrollLeft()+w:-1*(x+u):m(!(!a.follow[0]&&n||g)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?f.scrollTop()+y:z+-1*t:p(!(!a.follow[1]&&q||g)),"z-index":a.zIndex+v+1}).each(function(){a.appending&&c(this).appendTo(a.appendTo)});G(!0)}function r(){a.modal&&c(".b-modal."+b.data("id")).fadeTo(a.speed,0,function(){c(this).remove()});a.scrollBar||c("html").css("overflow","auto");c(".b-modal."+e).unbind("click");f.unbind("keydown."+e);k.unbind("."+e).data("bPopup",0<k.data("bPopup")-1?k.data("bPopup")-1:null);b.undelegate(".bClose, ."+a.closeClass,"click."+e,r).data("bPopup",null);clearTimeout(H);G();return!1}function I(d){y=k.height();w=k.width();h=D();if(h.x||h.y)clearTimeout(J),J=setTimeout(function(){C();d=d||a.followSpeed;var e={};h.x&&(e.left=a.follow[0]?m(!0):"auto");h.y&&(e.top=a.follow[1]?p(!0):"auto");b.dequeue().each(function(){g?c(this).css({left:x,top:z}):c(this).animate(e,d,a.followEasing)})},50)}function F(d){var c=d.width(),e=d.height(),f={};a.contentContainer.css({height:e,width:c});e>=b.height()&&(f.height=b.height());c>=b.width()&&(f.width=b.width());t=b.outerHeight(!0);u=b.outerWidth(!0);C();a.contentContainer.css({height:"auto",width:"auto"});f.left=m(!(!a.follow[0]&&n||g));f.top=p(!(!a.follow[1]&&q||g));b.animate(f,250,function(){d.show();h=D()})}function M(){k.data("bPopup",v);b.delegate(".bClose, ."+a.closeClass,"click."+e,r);a.modalClose&&c(".b-modal."+e).css("cursor","pointer").bind("click",r);N||!a.follow[0]&&!a.follow[1]||k.bind("scroll."+e,function(){if(h.x||h.y){var d={};h.x&&(d.left=a.follow[0]?m(!g):"auto");h.y&&(d.top=a.follow[1]?p(!g):"auto");b.dequeue().animate(d,a.followSpeed,a.followEasing)}}).bind("resize."+e,function(){I()});a.escClose&&f.bind("keydown."+e,function(a){27==a.which&&r()})}function G(d){function c(e){b.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){K(d)})}switch(d?a.transition:a.transitionClose||a.transition){case "slideIn":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()-(u||b.outerWidth(!0))-200});break;case "slideBack":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()+w+200});break;case "slideDown":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()-(t||b.outerHeight(!0))-200});break;case "slideUp":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()+y+200});break;default:b.stop().fadeTo(a.speed,d?1:0,function(){K(d)})}}function K(d){d?(M(),l(E),a.autoClose&&(H=setTimeout(r,a.autoClose))):(b.hide(),l(a.onClose),a.loadUrl&&(a.contentContainer.empty(),b.css({height:"auto",width:"auto"})))}function m(a){return a?x+f.scrollLeft():x}function p(a){return a?z+f.scrollTop():z}function l(a,e){c.isFunction(a)&&a.call(b,e)}function C(){z=q?a.position[1]:Math.max(0,(y-b.outerHeight(!0))/2-a.amsl);x=n?a.position[0]:(w-b.outerWidth(!0))/2;h=D()}function D(){return{x:w>b.outerWidth(!0),y:y>b.outerHeight(!0)}}c.isFunction(A)&&(E=A,A=null);var a=c.extend({},c.fn.bPopup.defaults,A);a.scrollBar||c("html").css("overflow","hidden");var b=this,f=c(document),k=c(window),y=k.height(),w=k.width(),N=/OS 6(_\d)+/i.test(navigator.userAgent),v=0,e,h,q,n,g,z,x,t,u,J,H;b.close=function(){r()};b.reposition=function(a){I(a)};return b.each(function(){c(this).data("bPopup")||(l(a.onOpen),v=(k.data("bPopup")||0)+1,e="__b-popup"+v+"__",q="auto"!==a.position[1],n="auto"!==a.position[0],g="fixed"===a.positionStyle,t=b.outerHeight(!0),u=b.outerWidth(!0),a.loadUrl?L():B())})};c.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:'scrolling="no" frameborder="0"',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);
})
define( 'jquery.mobile-events.min', [], function( require, exports, module){
"use strict";!function(e){function t(){var e=s();e!==r&&(r=e,u.trigger("orientationchange"))}function a(t,a,o,n){var i=o.type;o.type=a,e.event.dispatch.call(t,o,n),o.type=i}e.attrFn=e.attrFn||{};var o=navigator.userAgent.toLowerCase(),n=o.indexOf("chrome")>-1&&(o.indexOf("windows")>-1||o.indexOf("macintosh")>-1||o.indexOf("linux")>-1)&&o.indexOf("mobile")<0&&o.indexOf("android")<0,i={tap_pixel_range:5,swipe_h_threshold:50,swipe_v_threshold:50,taphold_threshold:750,doubletap_int:500,touch_capable:"ontouchstart"in window&&!n,orientation_support:"orientation"in window&&"onorientationchange"in window,startevent:"ontouchstart"in window&&!n?"touchstart":"mousedown",endevent:"ontouchstart"in window&&!n?"touchend":"mouseup",moveevent:"ontouchstart"in window&&!n?"touchmove":"mousemove",tapevent:"ontouchstart"in window&&!n?"tap":"click",scrollevent:"ontouchstart"in window&&!n?"touchmove":"scroll",hold_timer:null,tap_timer:null};e.isTouchCapable=function(){return i.touch_capable},e.getStartEvent=function(){return i.startevent},e.getEndEvent=function(){return i.endevent},e.getMoveEvent=function(){return i.moveevent},e.getTapEvent=function(){return i.tapevent},e.getScrollEvent=function(){return i.scrollevent},e.each(["tapstart","tapend","tapmove","tap","tap2","tap3","tap4","singletap","doubletap","taphold","swipe","swipeup","swiperight","swipedown","swipeleft","swipeend","scrollstart","scrollend","orientationchange"],function(t,a){e.fn[a]=function(e){return e?this.on(a,e):this.trigger(a)},e.attrFn[a]=!0}),e.event.special.tapstart={setup:function(){var t=this,o=e(t);o.on(i.startevent,function n(e){if(o.data("callee",n),e.which&&1!==e.which)return!1;var c=e.originalEvent,s={position:{x:i.touch_capable?c.touches[0].screenX:e.screenX,y:i.touch_capable?c.touches[0].screenY:e.screenY},offset:{x:Math.round(i.touch_capable?c.changedTouches[0].pageX-o.offset().left:e.pageX-o.offset().left),y:Math.round(i.touch_capable?c.changedTouches[0].pageY-o.offset().top:e.pageY-o.offset().top)},time:Date.now(),target:e.target};return a(t,"tapstart",e,s),!0})},remove:function(){e(this).off(i.startevent,e(this).data.callee)}},e.event.special.tapmove={setup:function(){var t=this,o=e(t);o.on(i.moveevent,function n(e){o.data("callee",n);var c=e.originalEvent,s={position:{x:i.touch_capable?c.touches[0].screenX:e.screenX,y:i.touch_capable?c.touches[0].screenY:e.screenY},offset:{x:Math.round(i.touch_capable?c.changedTouches[0].pageX-o.offset().left:e.pageX-o.offset().left),y:Math.round(i.touch_capable?c.changedTouches[0].pageY-o.offset().top:e.pageY-o.offset().top)},time:Date.now(),target:e.target};return a(t,"tapmove",e,s),!0})},remove:function(){e(this).off(i.moveevent,e(this).data.callee)}},e.event.special.tapend={setup:function(){var t=this,o=e(t);o.on(i.endevent,function n(e){o.data("callee",n);var c=e.originalEvent,s={position:{x:i.touch_capable?c.changedTouches[0].screenX:e.screenX,y:i.touch_capable?c.changedTouches[0].screenY:e.screenY},offset:{x:Math.round(i.touch_capable?c.changedTouches[0].pageX-o.offset().left:e.pageX-o.offset().left),y:Math.round(i.touch_capable?c.changedTouches[0].pageY-o.offset().top:e.pageY-o.offset().top)},time:Date.now(),target:e.target};return a(t,"tapend",e,s),!0})},remove:function(){e(this).off(i.endevent,e(this).data.callee)}},e.event.special.taphold={setup:function(){var t,o=this,n=e(o),c={x:0,y:0},s=0,r=0;n.on(i.startevent,function p(e){if(e.which&&1!==e.which)return!1;n.data("tapheld",!1),t=e.target;var h=e.originalEvent,u=Date.now(),l={x:i.touch_capable?h.touches[0].screenX:e.screenX,y:i.touch_capable?h.touches[0].screenY:e.screenY},f={x:i.touch_capable?h.touches[0].pageX-h.touches[0].target.offsetLeft:e.offsetX,y:i.touch_capable?h.touches[0].pageY-h.touches[0].target.offsetTop:e.offsetY};return c.x=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0].pageX:e.pageX,c.y=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0].pageY:e.pageY,s=c.x,r=c.y,i.hold_timer=window.setTimeout(function(){var g=c.x-s,d=c.y-r;if(e.target==t&&(c.x==s&&c.y==r||g>=-i.tap_pixel_range&&g<=i.tap_pixel_range&&d>=-i.tap_pixel_range&&d<=i.tap_pixel_range)){n.data("tapheld",!0);var v=Date.now(),w={x:i.touch_capable?h.touches[0].screenX:e.screenX,y:i.touch_capable?h.touches[0].screenY:e.screenY},_={x:Math.round(i.touch_capable?h.changedTouches[0].pageX-n.offset().left:e.pageX-n.offset().left),y:Math.round(i.touch_capable?h.changedTouches[0].pageY-n.offset().top:e.pageY-n.offset().top)},T=v-u,x={startTime:u,endTime:v,startPosition:l,startOffset:f,endPosition:w,endOffset:_,duration:T,target:e.target};n.data("callee1",p),a(o,"taphold",e,x)}},i.taphold_threshold),!0}).on(i.endevent,function h(){n.data("callee2",h),n.data("tapheld",!1),window.clearTimeout(i.hold_timer)}).on(i.moveevent,function u(e){n.data("callee3",u),s=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0].pageX:e.pageX,r=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0].pageY:e.pageY})},remove:function(){e(this).off(i.startevent,e(this).data.callee1).off(i.endevent,e(this).data.callee2).off(i.moveevent,e(this).data.callee3)}},e.event.special.doubletap={setup:function(){var t,o,n,c,s=this,r=e(s),p=null,h=!1;r.on(i.startevent,function u(e){return e.which&&1!==e.which?!1:(r.data("doubletapped",!1),t=e.target,r.data("callee1",u),n=e.originalEvent,p||(p={position:{x:i.touch_capable?n.touches[0].screenX:e.screenX,y:i.touch_capable?n.touches[0].screenY:e.screenY},offset:{x:Math.round(i.touch_capable?n.changedTouches[0].pageX-r.offset().left:e.pageX-r.offset().left),y:Math.round(i.touch_capable?n.changedTouches[0].pageY-r.offset().top:e.pageY-r.offset().top)},time:Date.now(),target:e.target}),!0)}).on(i.endevent,function l(e){var u=Date.now(),f=r.data("lastTouch")||u+1,g=u-f;if(window.clearTimeout(o),r.data("callee2",l),g<i.doubletap_int&&e.target==t&&g>100){r.data("doubletapped",!0),window.clearTimeout(i.tap_timer);var d={position:{x:i.touch_capable?e.originalEvent.changedTouches[0].screenX:e.screenX,y:i.touch_capable?e.originalEvent.changedTouches[0].screenY:e.screenY},offset:{x:Math.round(i.touch_capable?n.changedTouches[0].pageX-r.offset().left:e.pageX-r.offset().left),y:Math.round(i.touch_capable?n.changedTouches[0].pageY-r.offset().top:e.pageY-r.offset().top)},time:Date.now(),target:e.target},v={firstTap:p,secondTap:d,interval:d.time-p.time};h||(a(s,"doubletap",e,v),p=null),h=!0,c=window.setTimeout(function(){h=!1},i.doubletap_int)}else r.data("lastTouch",u),o=window.setTimeout(function(){p=null,window.clearTimeout(o)},i.doubletap_int,[e]);r.data("lastTouch",u)})},remove:function(){e(this).off(i.startevent,e(this).data.callee1).off(i.endevent,e(this).data.callee2)}},e.event.special.singletap={setup:function(){var t=this,o=e(t),n=null,c=null,s={x:0,y:0};o.on(i.startevent,function r(e){return e.which&&1!==e.which?!1:(c=Date.now(),n=e.target,o.data("callee1",r),s.x=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0].pageX:e.pageX,s.y=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0].pageY:e.pageY,!0)}).on(i.endevent,function p(e){if(o.data("callee2",p),e.target==n){var r=e.originalEvent.changedTouches?e.originalEvent.changedTouches[0].pageX:e.pageX,h=e.originalEvent.changedTouches?e.originalEvent.changedTouches[0].pageY:e.pageY;i.tap_timer=window.setTimeout(function(){if(!o.data("doubletapped")&&!o.data("tapheld")&&s.x==r&&s.y==h){var n=e.originalEvent,p={position:{x:i.touch_capable?n.changedTouches[0].screenX:e.screenX,y:i.touch_capable?n.changedTouches[0].screenY:e.screenY},offset:{x:Math.round(i.touch_capable?n.changedTouches[0].pageX-o.offset().left:e.pageX-o.offset().left),y:Math.round(i.touch_capable?n.changedTouches[0].pageY-o.offset().top:e.pageY-o.offset().top)},time:Date.now(),target:e.target};p.time-c<i.taphold_threshold&&a(t,"singletap",e,p)}},i.doubletap_int)}})},remove:function(){e(this).off(i.startevent,e(this).data.callee1).off(i.endevent,e(this).data.callee2)}},e.event.special.tap={setup:function(){var t,o,n=this,c=e(n),s=!1,r=null,p={x:0,y:0};c.on(i.startevent,function h(e){return c.data("callee1",h),e.which&&1!==e.which?!1:(s=!0,p.x=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0].pageX:e.pageX,p.y=e.originalEvent.targetTouches?e.originalEvent.targetTouches[0].pageY:e.pageY,t=Date.now(),r=e.target,o=e.originalEvent.targetTouches?e.originalEvent.targetTouches:[e],!0)}).on(i.endevent,function u(e){c.data("callee2",u);var h=e.originalEvent.targetTouches?e.originalEvent.changedTouches[0].pageX:e.pageX,l=e.originalEvent.targetTouches?e.originalEvent.changedTouches[0].pageY:e.pageY,f=p.x-h,g=p.y-l;if(r==e.target&&s&&Date.now()-t<i.taphold_threshold&&(p.x==h&&p.y==l||f>=-i.tap_pixel_range&&f<=i.tap_pixel_range&&g>=-i.tap_pixel_range&&g<=i.tap_pixel_range)){for(var d=e.originalEvent,v=[],w=0;w<o.length;w++){var _={position:{x:i.touch_capable?d.changedTouches[w].screenX:e.screenX,y:i.touch_capable?d.changedTouches[w].screenY:e.screenY},offset:{x:Math.round(i.touch_capable?d.changedTouches[w].pageX-c.offset().left:e.pageX-c.offset().left),y:Math.round(i.touch_capable?d.changedTouches[w].pageY-c.offset().top:e.pageY-c.offset().top)},time:Date.now(),target:e.target};v.push(_)}a(n,"tap",e,v)}})},remove:function(){e(this).off(i.startevent,e(this).data.callee1).off(i.endevent,e(this).data.callee2)}},e.event.special.swipe={setup:function(){function t(a){s=e(a.currentTarget),s.data("callee1",t),h.x=a.originalEvent.targetTouches?a.originalEvent.targetTouches[0].pageX:a.pageX,h.y=a.originalEvent.targetTouches?a.originalEvent.targetTouches[0].pageY:a.pageY,u.x=h.x,u.y=h.y,r=!0;var o=a.originalEvent;n={position:{x:i.touch_capable?o.touches[0].screenX:a.screenX,y:i.touch_capable?o.touches[0].screenY:a.screenY},offset:{x:Math.round(i.touch_capable?o.changedTouches[0].pageX-s.offset().left:a.pageX-s.offset().left),y:Math.round(i.touch_capable?o.changedTouches[0].pageY-s.offset().top:a.pageY-s.offset().top)},time:Date.now(),target:a.target}}function a(t){s=e(t.currentTarget),s.data("callee2",a),u.x=t.originalEvent.targetTouches?t.originalEvent.targetTouches[0].pageX:t.pageX,u.y=t.originalEvent.targetTouches?t.originalEvent.targetTouches[0].pageY:t.pageY;var o,c=s.parent().data("xthreshold")?s.parent().data("xthreshold"):s.data("xthreshold"),l=s.parent().data("ythreshold")?s.parent().data("ythreshold"):s.data("ythreshold"),f="undefined"!=typeof c&&c!==!1&&parseInt(c)?parseInt(c):i.swipe_h_threshold,g="undefined"!=typeof l&&l!==!1&&parseInt(l)?parseInt(l):i.swipe_v_threshold;if(h.y>u.y&&h.y-u.y>g&&(o="swipeup"),h.x<u.x&&u.x-h.x>f&&(o="swiperight"),h.y<u.y&&u.y-h.y>g&&(o="swipedown"),h.x>u.x&&h.x-u.x>f&&(o="swipeleft"),void 0!=o&&r){h.x=0,h.y=0,u.x=0,u.y=0,r=!1;var d=t.originalEvent,v={position:{x:i.touch_capable?d.touches[0].screenX:t.screenX,y:i.touch_capable?d.touches[0].screenY:t.screenY},offset:{x:Math.round(i.touch_capable?d.changedTouches[0].pageX-s.offset().left:t.pageX-s.offset().left),y:Math.round(i.touch_capable?d.changedTouches[0].pageY-s.offset().top:t.pageY-s.offset().top)},time:Date.now(),target:t.target},w=Math.abs(n.position.x-v.position.x),_=Math.abs(n.position.y-v.position.y),T={startEvnt:n,endEvnt:v,direction:o.replace("swipe",""),xAmount:w,yAmount:_,duration:v.time-n.time};p=!0,s.trigger("swipe",T).trigger(o,T)}}function o(t){s=e(t.currentTarget);var a="";if(s.data("callee3",o),p){var c=s.data("xthreshold"),h=s.data("ythreshold"),u="undefined"!=typeof c&&c!==!1&&parseInt(c)?parseInt(c):i.swipe_h_threshold,l="undefined"!=typeof h&&h!==!1&&parseInt(h)?parseInt(h):i.swipe_v_threshold,f=t.originalEvent,g={position:{x:i.touch_capable?f.changedTouches[0].screenX:t.screenX,y:i.touch_capable?f.changedTouches[0].screenY:t.screenY},offset:{x:Math.round(i.touch_capable?f.changedTouches[0].pageX-s.offset().left:t.pageX-s.offset().left),y:Math.round(i.touch_capable?f.changedTouches[0].pageY-s.offset().top:t.pageY-s.offset().top)},time:Date.now(),target:t.target};n.position.y>g.position.y&&n.position.y-g.position.y>l&&(a="swipeup"),n.position.x<g.position.x&&g.position.x-n.position.x>u&&(a="swiperight"),n.position.y<g.position.y&&g.position.y-n.position.y>l&&(a="swipedown"),n.position.x>g.position.x&&n.position.x-g.position.x>u&&(a="swipeleft");var d=Math.abs(n.position.x-g.position.x),v=Math.abs(n.position.y-g.position.y),w={startEvnt:n,endEvnt:g,direction:a.replace("swipe",""),xAmount:d,yAmount:v,duration:g.time-n.time};s.trigger("swipeend",w)}r=!1,p=!1}var n,c=this,s=e(c),r=!1,p=!1,h={x:0,y:0},u={x:0,y:0};s.on(i.startevent,t),s.on(i.moveevent,a),s.on(i.endevent,o)},remove:function(){e(this).off(i.startevent,e(this).data.callee1).off(i.moveevent,e(this).data.callee2).off(i.endevent,e(this).data.callee3)}},e.event.special.scrollstart={setup:function(){function t(e,t){o=t,a(c,o?"scrollstart":"scrollend",e)}var o,n,c=this,s=e(c);s.on(i.scrollevent,function r(e){s.data("callee",r),o||t(e,!0),clearTimeout(n),n=setTimeout(function(){t(e,!1)},50)})},remove:function(){e(this).off(i.scrollevent,e(this).data.callee)}};var c,s,r,p,h,u=e(window),l={0:!0,180:!0};if(i.orientation_support){var f=window.innerWidth||u.width(),g=window.innerHeight||u.height(),d=50;p=f>g&&f-g>d,h=l[window.orientation],(p&&h||!p&&!h)&&(l={"-90":!0,90:!0})}e.event.special.orientationchange=c={setup:function(){return i.orientation_support?!1:(r=s(),u.on("throttledresize",t),!0)},teardown:function(){return i.orientation_support?!1:(u.off("throttledresize",t),!0)},add:function(e){var t=e.handler;e.handler=function(e){return e.orientation=s(),t.apply(this,arguments)}}},e.event.special.orientationchange.orientation=s=function(){var e=!0,t=document.documentElement;return e=i.orientation_support?l[window.orientation]:t&&t.clientWidth/t.clientHeight<1.1,e?"portrait":"landscape"},e.event.special.throttledresize={setup:function(){e(this).on("resize",x)},teardown:function(){e(this).off("resize",x)}};var v,w,_,T=250,x=function(){w=Date.now(),_=w-y,_>=T?(y=w,e(this).trigger("throttledresize")):(v&&window.clearTimeout(v),v=window.setTimeout(t,T-_))},y=0;e.each({scrollend:"scrollstart",swipeup:"swipe",swiperight:"swipe",swipedown:"swipe",swipeleft:"swipe",swipeend:"swipe",tap2:"tap"},function(t,a){e.event.special[t]={setup:function(){e(this).on(a,e.noop)}}})}(jQuery);
})
define( 'leaves', ['../lib/js/config/config'], function( require, exports, module){
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


define( 'prefixfree.min', [], function( require, exports, module){
/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */
(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=(/^[a-z]{3,10}:/.exec(i)||[""])[0],o=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(i)||[""])[0],u=/^([^?]*)\??/.exec(r)[1],a=t.parentNode,f=new XMLHttpRequest,l;f.onreadystatechange=function(){f.readyState===4&&l()},l=function(){var n=f.responseText;if(n&&t.parentNode&&(!f.status||f.status<400||f.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|#)/i.test(n)?e:/^\/\//.test(n)?'url("'+s+n+'")':/^\//.test(n)?'url("'+o+n+'")':/^\?/.test(n)?'url("'+u+n+'")':'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var l=document.createElement("style");l.textContent=n,l.media=t.media,l.disabled=t.disabled,l.setAttribute("data-href",t.getAttribute("href")),a.insertBefore(l,t),a.removeChild(t),l.media=t.media}};try{f.open("GET",r),f.send(null)}catch(n){typeof XDomainRequest!="undefined"&&(f=new XDomainRequest,f.onerror=f.onprogress=function(){},f.onload=l,f.open("GET",r),f.send(null))}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t),t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t),t.setAttribute("style",n)},process:function(){t("style").forEach(StyleFix.styleElement),t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){},10),document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})(),function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"})),e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e),e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e),e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}return r&&(e=t("selectors","","\\b",n.prefixSelector,e),e=t("atrules","@","\\b","@"+s+"$1",e)),e=e.replace(RegExp("-"+s,"g"),"-"),e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix),e},property:function(e){return(n.properties.indexOf(e)?n.prefix:"")+e},value:function(e,r){return e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e),e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e),e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-",n.Prefix=StyleFix.camelCase(n.prefix),n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin"),n.properties.sort()})(),function(){function i(e,t){return r[t]="",r[t]=e,!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","min-content":"width"};n.functions=[],n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}}(),function(){function s(e){return i.textContent=e+"{}",!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[],n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)}(),n.valueProperties=["transition","transition-property"],e.className+=" "+n.prefix,StyleFix.register(n.prefixCSS)}(document.documentElement);

})
define( 'yanhua', [], function( require, exports, module){
    var rem = function rem() {
        var html = document.getElementsByTagName('html')[0];

        return function() {
            return parseInt(window.getComputedStyle(html)['fontSize']);
        }
    }();




    var Fireworks = function() {
        /*=============================================================================*/
        /* Utility
        /*=============================================================================*/
        var self = this;
        var rand = function(rMi, rMa) {
            return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
        }
        var hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2) {
            return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
        };
        window.requestAnimFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                window.setTimeout(a, 1E3 / 60)
            }
        }();

        /*=============================================================================*/
        /* Initialize
        /*=============================================================================*/
        self.init = function() {
            self.dt = 0;
            self.oldTime = Date.now();
            self.canvas = document.createElement('canvas');
            self.canvasContainer = $('#yanhua');

            var canvasContainerDisabled = document.getElementById('canvas-container');
            self.canvas.onselectstart = function() {
                return false;
            };


            function toRem(length) {
                return (parseInt(length) / rem());
            }



            self.canvas.width = self.cw = toRem($('#yanhua').width()) * parseFloat(document.querySelector('html').style.fontSize);
            self.canvas.height = self.ch = toRem($('#yanhua').height()) * parseFloat(document.querySelector('html').style.fontSize);



            self.particles = [];
            self.partCount = 60;
            self.fireworks = [];
            self.mx = self.cw / 2;
            self.my = self.ch / 2;
            self.currentHue = 170;
            self.partSpeed = 5;
            self.partSpeedVariance = 10;
            self.partWind = 50;
            self.partFriction = 25;
            self.partGravity = 1;
            self.hueMin = 200;
            self.hueMax = 360;
            self.fworkSpeed = 2;
            self.fworkAccel = 4;
            self.hueVariance = 30;
            self.flickerDensity = 20;
            self.showShockwave = true;
            self.showTarget = false;
            self.clearAlpha = 25;

            self.canvasContainer.append(self.canvas);
            self.ctx = self.canvas.getContext('2d');
            self.ctx.lineCap = 'round';
            self.ctx.lineJoin = 'round';
            self.lineWidth = 1;
            self.bindEvents();
            self.canvasLoop();

            self.canvas.onselectstart = function() {
                return false;
            };


        };

        /*=============================================================================*/
        /* Particle Constructor
        /*=============================================================================*/
        var Particle = function(x, y, hue) {
            this.x = x;
            this.y = y;
            this.coordLast = [{
                x: x,
                y: y
            }, {
                x: x,
                y: y
            }, {
                x: x,
                y: y
            }];
            this.angle = rand(0, 360);
            this.speed = rand(((self.partSpeed - self.partSpeedVariance) <= 0) ? 1 : self.partSpeed - self.partSpeedVariance, (self.partSpeed + self.partSpeedVariance));
            this.friction = 1 - self.partFriction / 100;
            this.gravity = self.partGravity / 2;
            this.hue = rand(hue - self.hueVariance, hue + self.hueVariance);
            this.brightness = rand(50, 80);
            this.alpha = rand(40, 100) / 100;
            this.decay = rand(10, 50) / 1000;
            this.wind = (rand(0, self.partWind) - (self.partWind / 2)) / 25;
            this.lineWidth = self.lineWidth;
        };

        Particle.prototype.update = function(index) {
            var radians = this.angle * Math.PI / 180;
            var vx = Math.cos(radians) * this.speed;
            var vy = Math.sin(radians) * this.speed + this.gravity;
            this.speed *= this.friction;

            this.coordLast[2].x = this.coordLast[1].x;
            this.coordLast[2].y = this.coordLast[1].y;
            this.coordLast[1].x = this.coordLast[0].x;
            this.coordLast[1].y = this.coordLast[0].y;
            this.coordLast[0].x = this.x;
            this.coordLast[0].y = this.y;

            this.x += vx * self.dt;
            this.y += vy * self.dt;

            this.angle += this.wind;
            this.alpha -= this.decay;

            if (!hitTest(0, 0, self.cw, self.ch, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2) || this.alpha < .05) {
                self.particles.splice(index, 1);
            }
        };

        Particle.prototype.draw = function() {
            var coordRand = (rand(1, 3) - 1);
            self.ctx.beginPath();
            self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
            self.ctx.lineTo(Math.round(this.x), Math.round(this.y));
            self.ctx.closePath();
            self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
            self.ctx.stroke();

            if (self.flickerDensity > 0) {
                var inverseDensity = 50 - self.flickerDensity;
                if (rand(0, inverseDensity) === inverseDensity) {
                    self.ctx.beginPath();
                    self.ctx.arc(Math.round(this.x), Math.round(this.y), rand(this.lineWidth, this.lineWidth + 3) / 2, 0, Math.PI * 2, false)
                    self.ctx.closePath();
                    var randAlpha = rand(50, 100) / 100;
                    self.ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + randAlpha + ')';
                    self.ctx.fill();
                }
            }
        };

        /*=============================================================================*/
        /* Create Particles
        /*=============================================================================*/
        self.createParticles = function(x, y, hue) {
            var countdown = self.partCount;
            while (countdown--) {
                self.particles.push(new Particle(x, y, hue));
            }
        };

        /*=============================================================================*/
        /* Update Particles
        /*=============================================================================*/
        self.updateParticles = function() {
            var i = self.particles.length;
            while (i--) {
                var p = self.particles[i];
                p.update(i);
            };
        };

        /*=============================================================================*/
        /* Draw Particles
        /*=============================================================================*/
        self.drawParticles = function() {
            var i = self.particles.length;
            while (i--) {
                var p = self.particles[i];
                p.draw();
            };
        };

        /*=============================================================================*/
        /* Firework Constructor
        /*=============================================================================*/
        var Firework = function(startX, startY, targetX, targetY) {
            this.x = startX;
            this.y = startY;
            this.startX = startX;
            this.startY = startY;
            this.hitX = false;
            this.hitY = false;
            this.coordLast = [{
                x: startX,
                y: startY
            }, {
                x: startX,
                y: startY
            }, {
                x: startX,
                y: startY
            }];
            this.targetX = targetX;
            this.targetY = targetY;
            this.speed = self.fworkSpeed;
            this.angle = Math.atan2(targetY - startY, targetX - startX);
            this.shockwaveAngle = Math.atan2(targetY - startY, targetX - startX) + (90 * (Math.PI / 180));
            this.acceleration = self.fworkAccel / 100;
            this.hue = self.currentHue;
            this.brightness = rand(50, 80);
            this.alpha = rand(50, 100) / 100;
            this.lineWidth = self.lineWidth;
            this.targetRadius = 1;
        };

        Firework.prototype.update = function(index) {
            self.ctx.lineWidth = this.lineWidth;

            vx = Math.cos(this.angle) * this.speed,
                vy = Math.sin(this.angle) * this.speed;
            this.speed *= 1 + this.acceleration;
            this.coordLast[2].x = this.coordLast[1].x;
            this.coordLast[2].y = this.coordLast[1].y;
            this.coordLast[1].x = this.coordLast[0].x;
            this.coordLast[1].y = this.coordLast[0].y;
            this.coordLast[0].x = this.x;
            this.coordLast[0].y = this.y;

            if (self.showTarget) {
                if (this.targetRadius < 8) {
                    this.targetRadius += .25 * self.dt;
                } else {
                    this.targetRadius = 1 * self.dt;
                }
            }

            if (this.startX >= this.targetX) {
                if (this.x + vx <= this.targetX) {
                    this.x = this.targetX;
                    this.hitX = true;
                } else {
                    this.x += vx * self.dt;
                }
            } else {
                if (this.x + vx >= this.targetX) {
                    this.x = this.targetX;
                    this.hitX = true;
                } else {
                    this.x += vx * self.dt;
                }
            }

            if (this.startY >= this.targetY) {
                if (this.y + vy <= this.targetY) {
                    this.y = this.targetY;
                    this.hitY = true;
                } else {
                    this.y += vy * self.dt;
                }
            } else {
                if (this.y + vy >= this.targetY) {
                    this.y = this.targetY;
                    this.hitY = true;
                } else {
                    this.y += vy * self.dt;
                }
            }

            if (this.hitX && this.hitY) {
                var randExplosion = rand(0, 9);
                self.createParticles(this.targetX, this.targetY, this.hue);
                self.fireworks.splice(index, 1);
            }
        };

        Firework.prototype.draw = function() {
            self.ctx.lineWidth = this.lineWidth;

            var coordRand = (rand(1, 3) - 1);
            self.ctx.beginPath();
            self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
            self.ctx.lineTo(Math.round(this.x), Math.round(this.y));
            self.ctx.closePath();
            self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
            self.ctx.stroke();

            if (self.showTarget) {
                self.ctx.save();
                self.ctx.beginPath();
                self.ctx.arc(Math.round(this.targetX), Math.round(this.targetY), this.targetRadius, 0, Math.PI * 2, false)
                self.ctx.closePath();
                self.ctx.lineWidth = 1;
                self.ctx.stroke();
                self.ctx.restore();
            }

            if (self.showShockwave) {
                self.ctx.save();
                self.ctx.translate(Math.round(this.x), Math.round(this.y));
                self.ctx.rotate(this.shockwaveAngle);
                self.ctx.beginPath();
                self.ctx.arc(0, 0, 1 * (this.speed / 5), 0, Math.PI, true);
                self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + rand(25, 60) / 100 + ')';
                self.ctx.lineWidth = this.lineWidth;
                self.ctx.stroke();
                self.ctx.restore();
            }
        };

        /*=============================================================================*/
        /* Create Fireworks
        /*=============================================================================*/
        self.createFireworks = function(startX, startY, targetX, targetY) {
            self.fireworks.push(new Firework(startX, startY, targetX, targetY));
        };

        /*=============================================================================*/
        /* Update Fireworks
        /*=============================================================================*/
        self.updateFireworks = function() {
            var i = self.fireworks.length;
            while (i--) {
                var f = self.fireworks[i];
                f.update(i);
            };
        };

        /*=============================================================================*/
        /* Draw Fireworks
        /*=============================================================================*/
        self.drawFireworks = function() {
            var i = self.fireworks.length;
            while (i--) {
                var f = self.fireworks[i];
                f.draw();
            };
        };

        /*=============================================================================*/
        /* Events
        /*=============================================================================*/
        self.bindEvents = function() {
            $(window).on('resize', function() {
                clearTimeout(self.timeout);
                self.timeout = setTimeout(function() {
                    self.ctx.lineCap = 'round';
                    self.ctx.lineJoin = 'round';
                }, 100);
            });

            $(self.canvas).on('mousedown', function(e) {
                var randLaunch = rand(0, 5);
                self.mx = e.pageX - self.canvasContainer.offset().left;
                self.my = e.pageY - self.canvasContainer.offset().top;
                self.currentHue = rand(self.hueMin, self.hueMax);
                self.createFireworks(self.cw / 2, self.ch, self.mx, self.my);

                $(self.canvas).on('mousemove.fireworks', function(e) {
                    var randLaunch = rand(0, 5);
                    self.mx = e.pageX - self.canvasContainer.offset().left;
                    self.my = e.pageY - self.canvasContainer.offset().top;
                    self.currentHue = rand(self.hueMin, self.hueMax);
                    self.createFireworks(self.cw / 2, self.ch, self.mx, self.my);
                });

            });

            $(self.canvas).on('mouseup', function(e) {
                $(self.canvas).off('mousemove.fireworks');
            });

        }

        /*=============================================================================*/
        /* Clear Canvas
        /*=============================================================================*/
        self.clear = function() {
            self.particles = [];
            self.fireworks = [];
            self.ctx.clearRect(0, 0, self.cw, self.ch);
        };

        /*=============================================================================*/
        /* Delta
        /*=============================================================================*/
        self.updateDelta = function() {
            var newTime = Date.now();
            self.dt = (newTime - self.oldTime) / 16;
            self.dt = (self.dt > 5) ? 5 : self.dt;
            self.oldTime = newTime;
        }

        /*=============================================================================*/
        /* Main Loop
        /*=============================================================================*/
        self.canvasLoop = function() {
            requestAnimFrame(self.canvasLoop, self.canvas);
            self.updateDelta();
            self.ctx.globalCompositeOperation = 'destination-out';
            self.ctx.fillStyle = 'rgba(0,0,0,' + self.clearAlpha / 100 + ')';
            self.ctx.fillRect(0, 0, self.cw, self.ch);
            self.ctx.globalCompositeOperation = 'lighter';
            self.updateFireworks();
            self.updateParticles();
            self.drawFireworks();
            self.drawParticles();
        };

        self.init();

        var initialLaunchCount = 3;
        while (initialLaunchCount--) {
            setTimeout(function() {
                self.fireworks.push(new Firework(self.cw / 2, self.ch, rand(30, self.cw - 50), rand(50, self.ch / 2)));
            }, initialLaunchCount * 500);
        }

        // 各种浏览器兼容
        var hidden, state, visibilityChange;
        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
            state = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
            state = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
            state = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
            state = "webkitVisibilityState";
        }

        // 添加监听器，在title里显示状态变化
        document.addEventListener(visibilityChange, function() {
            if (document[state] == 'visible') {
                yanhua_status = setInterval(function() {
                    var cont = 3;
                    while (cont--) {
                        setTimeout(function() {
                            self.fireworks.push(new Firework(self.cw / 2, self.ch, rand(30, self.cw - 50), rand(50, self.ch / 2)));
                        }, cont * 500);
                    }
                }, 4000)
            } else {
                clearInterval(yanhua_status)
            }
        }, false);

        var yanhua_status;
        yanhua_status = setInterval(function() {
            var cont = 3;
            while (cont--) {
                setTimeout(function() {
                    self.fireworks.push(new Firework(self.cw / 2, self.ch, rand(30, self.cw - 50), rand(50, self.ch / 2)));
                }, cont * 500);
            }
        }, 4000)


    }


    setTimeout(function() {
        var fworks = new Fireworks();
    }, 1000)


})

define( 'Snow', ['ThreeCanvas'], function( require, exports, module){

	var THREE = require('./ThreeCanvas');
	Particle3D=function(material){THREE.Particle.call(this,material);this.velocity=new THREE.Vector3(0,-8,0);this.velocity.rotateX(randomRange(-45,45));this.velocity.rotateY(randomRange(0,360));this.gravity=new THREE.Vector3(0,0,0);this.drag=1;};Particle3D.prototype=new THREE.Particle();Particle3D.prototype.constructor=Particle3D;Particle3D.prototype.updatePhysics=function(){this.velocity.multiplyScalar(this.drag);this.velocity.addSelf(this.gravity);this.position.addSelf(this.velocity);}
	var TO_RADIANS=Math.PI/180;THREE.Vector3.prototype.rotateY=function(angle){cosRY=Math.cos(angle*TO_RADIANS);sinRY=Math.sin(angle*TO_RADIANS);var tempz=this.z;;var tempx=this.x;this.x=(tempx*cosRY)+(tempz*sinRY);this.z=(tempx*-sinRY)+(tempz*cosRY);}
	THREE.Vector3.prototype.rotateX=function(angle){cosRY=Math.cos(angle*TO_RADIANS);sinRY=Math.sin(angle*TO_RADIANS);var tempz=this.z;;var tempy=this.y;this.y=(tempy*cosRY)+(tempz*sinRY);this.z=(tempy*-sinRY)+(tempz*cosRY);}
	THREE.Vector3.prototype.rotateZ=function(angle){cosRY=Math.cos(angle*TO_RADIANS);sinRY=Math.sin(angle*TO_RADIANS);var tempx=this.x;;var tempy=this.y;this.y=(tempy*cosRY)+(tempx*sinRY);this.x=(tempy*-sinRY)+(tempx*cosRY);}
	function randomRange(min,max)
	{return((Math.random()*(max-min))+ min);}
	module.exports = Particle3D;
})
define( 'ThreeCanvas', [], function( require, exports, module){
var THREE=THREE||{};if(!self.Int32Array)self.Int32Array=Array,self.Float32Array=Array;THREE.Color=function(a){a!==void 0&&this.setHex(a);return this};THREE.Color.prototype={constructor:THREE.Color,r:1,g:1,b:1,copy:function(a){this.r=a.r;this.g=a.g;this.b=a.b;return this},copyGammaToLinear:function(a){this.r=a.r*a.r;this.g=a.g*a.g;this.b=a.b*a.b;return this},copyLinearToGamma:function(a){this.r=Math.sqrt(a.r);this.g=Math.sqrt(a.g);this.b=Math.sqrt(a.b);return this},setRGB:function(a,b,c){this.r=a;this.g=b;this.b=c;return this},setHSV:function(a,b,c){var d,f,e;if(c===0)this.r=this.g=this.b=0;else switch(d=Math.floor(a*6),f=a*6-d,a=c*(1-b),e=c*(1-
b*f),b=c*(1-b*(1-f)),d){case 1:this.r=e;this.g=c;this.b=a;break;case 2:this.r=a;this.g=c;this.b=b;break;case 3:this.r=a;this.g=e;this.b=c;break;case 4:this.r=b;this.g=a;this.b=c;break;case 5:this.r=c;this.g=a;this.b=e;break;case 6:case 0:this.r=c,this.g=b,this.b=a}return this},setHex:function(a){a=Math.floor(a);this.r=(a>>16&255)/255;this.g=(a>>8&255)/255;this.b=(a&255)/255;return this},getHex:function(){return~~(this.r*255)<<16^~~(this.g*255)<<8^~~(this.b*255)},getContextStyle:function(){return"rgb("+
Math.floor(this.r*255)+","+Math.floor(this.g*255)+","+Math.floor(this.b*255)+")"},clone:function(){return(new THREE.Color).setRGB(this.r,this.g,this.b)}};THREE.Vector2=function(a,b){this.x=a||0;this.y=b||0};THREE.Vector2.prototype={constructor:THREE.Vector2,set:function(a,b){this.x=a;this.y=b;return this},copy:function(a){this.x=a.x;this.y=a.y;return this},clone:function(){return new THREE.Vector2(this.x,this.y)},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;return this},divideScalar:function(a){a?(this.x/=a,this.y/=a):this.set(0,0);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){var b=this.x-a.x,a=this.y-a.y;return b*b+a*a},setLength:function(a){return this.normalize().multiplyScalar(a)},equals:function(a){return a.x===this.x&&a.y===this.y}};THREE.Vector3=function(a,b,c){this.x=a||0;this.y=b||0;this.z=c||0};THREE.Vector3.prototype={constructor:THREE.Vector3,set:function(a,b,c){this.x=a;this.y=b;this.z=c;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},clone:function(){return new THREE.Vector3(this.x,this.y,this.z)},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;return this},multiply:function(a,b){this.x=a.x*b.x;this.y=a.y*b.y;this.z=a.z*b.z;return this},multiplySelf:function(a){this.x*=a.x;this.y*=a.y;this.z*=a.z;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;return this},divideSelf:function(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;return this},divideScalar:function(a){a?(this.x/=a,this.y/=a,this.z/=a):this.z=this.y=this.x=0;return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.lengthSq())},lengthManhattan:function(){return this.x+this.y+this.z},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){return this.normalize().multiplyScalar(a)},cross:function(a,b){this.x=a.y*b.z-a.z*b.y;this.y=a.z*b.x-a.x*b.z;this.z=a.x*b.y-a.y*b.x;return this},crossSelf:function(a){var b=this.x,c=this.y,d=this.z;this.x=c*a.z-d*a.y;this.y=d*a.x-b*a.z;this.z=b*a.y-c*a.x;return this},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){return(new THREE.Vector3).sub(this,a).lengthSq()},setPositionFromMatrix:function(a){this.x=a.n14;this.y=a.n24;this.z=a.n34},setRotationFromMatrix:function(a){var b=Math.cos(this.y);this.y=Math.asin(a.n13);Math.abs(b)>1.0E-5?(this.x=Math.atan2(-a.n23/b,a.n33/b),this.z=Math.atan2(-a.n12/b,a.n11/b)):(this.x=0,this.z=Math.atan2(a.n21,a.n22))},isZero:function(){return this.lengthSq()<1.0E-4}};THREE.Vector4=function(a,b,c,d){this.x=a||0;this.y=b||0;this.z=c||0;this.w=d!==void 0?d:1};THREE.Vector4.prototype={constructor:THREE.Vector4,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w!==void 0?a.w:1},clone:function(){return new THREE.Vector4(this.x,this.y,this.z,this.w)},add:function(a,b){this.x=a.x+b.x;this.y=a.y+b.y;this.z=a.z+b.z;this.w=a.w+b.w;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-
b.z;this.w=a.w-b.w;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w;return this},multiplyScalar:function(a){this.x*=a;this.y*=a;this.z*=a;this.w*=a;return this},divideScalar:function(a){a?(this.x/=a,this.y/=a,this.z/=a,this.w/=a):(this.z=this.y=this.x=0,this.w=1);return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z+this.w*a.w},lengthSq:function(){return this.dot(this)},length:function(){return Math.sqrt(this.lengthSq())},normalize:function(){return this.divideScalar(this.length())},setLength:function(a){return this.normalize().multiplyScalar(a)},lerpSelf:function(a,b){this.x+=(a.x-this.x)*b;this.y+=(a.y-this.y)*b;this.z+=(a.z-this.z)*b;this.w+=(a.w-this.w)*b;return this}};THREE.Ray=function(a,b){function c(a,b,c){i.sub(c,a);p=i.dot(b);if(p<=0)return null;k=n.add(a,o.copy(b).multiplyScalar(p));return s=c.distanceTo(k)}function d(a,b,c,d){i.sub(d,b);n.sub(c,b);o.sub(a,b);K=i.dot(i);C=i.dot(n);Q=i.dot(o);O=n.dot(n);w=n.dot(o);F=1/(K*O-C*C);z=(O*Q-C*w)*F;D=(K*w-C*Q)*F;return z>=0&&D>=0&&z+D<1}this.origin=a||new THREE.Vector3;this.direction=b||new THREE.Vector3;this.intersectScene=function(a){return this.intersectObjects(a.children)};this.intersectObjects=function(a){var b,c,d=[];b=0;for(c=a.length;b<c;b++)Array.prototype.push.apply(d,this.intersectObject(a[b]));d.sort(function(a,b){return a.distance-b.distance});return d};var f=new THREE.Vector3,e=new THREE.Vector3,g=new THREE.Vector3,h=new THREE.Vector3,a=new THREE.Vector3,b=new THREE.Vector3,m=new THREE.Vector3,l=new THREE.Vector3,j=new THREE.Vector3;this.intersectObject=function(k){for(var i,o=[],n=0,W=k.children.length;n<W;n++)Array.prototype.push.apply(o,this.intersectObject(k.children[n]));if(k instanceof THREE.Particle){n=c(this.origin,this.direction,k.matrixWorld.getPosition());if(n===null||n>k.scale.x)return[];i={distance:n,point:k.position,face:null,object:k};o.push(i)}else if(k instanceof THREE.Mesh){n=c(this.origin,this.direction,k.matrixWorld.getPosition());if(n===null||n>k.geometry.boundingSphere.radius*Math.max(k.scale.x,Math.max(k.scale.y,k.scale.z)))return o;var p,G=k.geometry,H=G.vertices,I;k.matrixRotationWorld.extractRotation(k.matrixWorld);n=0;for(W=G.faces.length;n<W;n++)if(i=G.faces[n],a.copy(this.origin),b.copy(this.direction),I=k.matrixWorld,m=I.multiplyVector3(m.copy(i.centroid)).subSelf(a),p=m.dot(b),!(p<=0)&&(f=I.multiplyVector3(f.copy(H[i.a].position)),e=I.multiplyVector3(e.copy(H[i.b].position)),g=I.multiplyVector3(g.copy(H[i.c].position)),i instanceof THREE.Face4&&(h=I.multiplyVector3(h.copy(H[i.d].position))),l=k.matrixRotationWorld.multiplyVector3(l.copy(i.normal)),p=b.dot(l),k.doubleSided||(k.flipSided?p>0:p<0)))if(p=l.dot(m.sub(f,a))/p,j.add(a,b.multiplyScalar(p)),i instanceof THREE.Face3)d(j,f,e,g)&&(i={distance:a.distanceTo(j),point:j.clone(),face:i,object:k},o.push(i));else if(i instanceof THREE.Face4&&(d(j,f,e,h)||d(j,e,g,h)))i={distance:a.distanceTo(j),point:j.clone(),face:i,object:k},o.push(i)}return o};var i=new THREE.Vector3,n=new THREE.Vector3,o=new THREE.Vector3,p,k,s,K,C,Q,O,w,F,z,D};THREE.Rectangle=function(){function a(){e=d-b;g=f-c}var b,c,d,f,e,g,h=!0;this.getX=function(){return b};this.getY=function(){return c};this.getWidth=function(){return e};this.getHeight=function(){return g};this.getLeft=function(){return b};this.getTop=function(){return c};this.getRight=function(){return d};this.getBottom=function(){return f};this.set=function(e,g,j,i){h=!1;b=e;c=g;d=j;f=i;a()};this.addPoint=function(e,g){h?(h=!1,b=e,c=g,d=e,f=g):(b=b<e?b:e,c=c<g?c:g,d=d>e?d:e,f=f>g?f:g);a()};this.add3Points=function(e,g,j,i,n,o){h?(h=!1,b=e<j?e<n?e:n:j<n?j:n,c=g<i?g<o?g:o:i<o?i:o,d=e>j?e>n?e:n:j>n?j:n,f=g>i?g>o?g:o:i>o?i:o):(b=e<j?e<n?e<b?e:b:n<b?n:b:j<n?j<b?j:b:n<b?n:b,c=g<i?g<o?g<c?g:c:o<c?o:c:i<o?i<c?i:c:o<c?o:c,d=e>j?e>n?e>d?e:d:n>d?n:d:j>n?j>d?j:d:n>d?n:d,f=g>i?g>o?g>f?g:f:o>f?o:f:i>o?i>f?i:f:o>f?o:f);a()};this.addRectangle=function(e){h?(h=!1,b=e.getLeft(),c=e.getTop(),d=e.getRight(),f=e.getBottom()):(b=b<e.getLeft()?b:e.getLeft(),c=c<e.getTop()?c:e.getTop(),d=d>e.getRight()?d:e.getRight(),f=f>e.getBottom()?f:e.getBottom());a()};this.inflate=function(e){b-=e;c-=e;d+=e;f+=e;a()};this.minSelf=function(e){b=b>e.getLeft()?b:e.getLeft();c=c>e.getTop()?c:e.getTop();d=d<e.getRight()?d:e.getRight();f=f<e.getBottom()?f:e.getBottom();a()};this.intersects=function(a){return Math.min(d,a.getRight())-Math.max(b,a.getLeft())>=0&&Math.min(f,a.getBottom())-Math.max(c,a.getTop())>=0};this.empty=function(){h=!0;f=d=c=b=0;a()};this.isEmpty=function(){return h}};THREE.Math={clamp:function(a,b,c){return a<b?b:a>c?c:a},clampBottom:function(a,b){return a<b?b:a},mapLinear:function(a,b,c,d,f){return d+(a-b)*(f-d)/(c-b)},random16:function(){return(65280*Math.random()+255*Math.random())/65535}};THREE.Matrix3=function(){this.m=[]};THREE.Matrix3.prototype={constructor:THREE.Matrix3,transpose:function(){var a,b=this.m;a=b[1];b[1]=b[3];b[3]=a;a=b[2];b[2]=b[6];b[6]=a;a=b[5];b[5]=b[7];b[7]=a;return this},transposeIntoArray:function(a){var b=this.m;a[0]=b[0];a[1]=b[3];a[2]=b[6];a[3]=b[1];a[4]=b[4];a[5]=b[7];a[6]=b[2];a[7]=b[5];a[8]=b[8];return this}};THREE.Matrix4=function(a,b,c,d,f,e,g,h,m,l,j,i,n,o,p,k){this.set(a!==void 0?a:1,b||0,c||0,d||0,f||0,e!==void 0?e:1,g||0,h||0,m||0,l||0,j!==void 0?j:1,i||0,n||0,o||0,p||0,k!==void 0?k:1);this.flat=Array(16);this.m33=new THREE.Matrix3};THREE.Matrix4.prototype={constructor:THREE.Matrix4,set:function(a,b,c,d,f,e,g,h,m,l,j,i,n,o,p,k){this.n11=a;this.n12=b;this.n13=c;this.n14=d;this.n21=f;this.n22=e;this.n23=g;this.n24=h;this.n31=m;this.n32=l;this.n33=j;this.n34=i;this.n41=n;this.n42=o;this.n43=p;this.n44=k;return this},identity:function(){this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return this},copy:function(a){this.set(a.n11,a.n12,a.n13,a.n14,a.n21,a.n22,a.n23,a.n24,a.n31,a.n32,a.n33,a.n34,a.n41,a.n42,a.n43,a.n44);return this},lookAt:function(a,b,c){var d=THREE.Matrix4.__v1,f=THREE.Matrix4.__v2,e=THREE.Matrix4.__v3;e.sub(a,b).normalize();if(e.length()===0)e.z=1;d.cross(c,e).normalize();d.length()===0&&(e.x+=1.0E-4,d.cross(c,e).normalize());f.cross(e,d).normalize();this.n11=d.x;this.n12=f.x;this.n13=e.x;this.n21=d.y;this.n22=f.y;this.n23=e.y;this.n31=d.z;this.n32=f.z;this.n33=e.z;return this},multiply:function(a,b){var c=a.n11,d=a.n12,f=a.n13,e=a.n14,g=a.n21,h=a.n22,m=a.n23,l=a.n24,j=a.n31,i=a.n32,n=a.n33,o=a.n34,p=a.n41,k=a.n42,s=a.n43,K=a.n44,C=b.n11,Q=b.n12,O=b.n13,w=b.n14,F=b.n21,z=b.n22,D=b.n23,u=b.n24,r=b.n31,E=b.n32,N=b.n33,W=b.n34,da=b.n41,G=b.n42,H=b.n43,I=b.n44;this.n11=c*C+d*F+f*r+e*da;this.n12=c*Q+d*z+f*E+e*G;this.n13=c*O+d*D+f*N+e*H;this.n14=c*w+d*u+f*W+e*I;this.n21=g*C+h*F+m*r+l*da;this.n22=g*Q+h*z+m*E+l*G;this.n23=g*O+h*D+m*N+l*H;this.n24=g*w+h*u+m*W+l*I;this.n31=j*C+i*F+n*r+o*da;this.n32=j*Q+i*z+n*E+o*G;this.n33=j*O+i*D+n*N+o*H;this.n34=j*w+i*u+n*W+o*I;this.n41=p*C+k*F+s*r+K*da;this.n42=p*Q+k*z+s*E+K*G;this.n43=p*O+k*D+s*N+K*H;this.n44=p*w+k*u+s*W+K*I;return this},multiplySelf:function(a){return this.multiply(this,a)},multiplyToArray:function(a,b,c){this.multiply(a,b);c[0]=this.n11;c[1]=this.n21;c[2]=this.n31;c[3]=this.n41;c[4]=this.n12;c[5]=this.n22;c[6]=this.n32;c[7]=this.n42;c[8]=this.n13;c[9]=this.n23;c[10]=this.n33;c[11]=this.n43;c[12]=this.n14;c[13]=this.n24;c[14]=this.n34;c[15]=this.n44;return this},multiplyScalar:function(a){this.n11*=a;this.n12*=a;this.n13*=a;this.n14*=a;this.n21*=a;this.n22*=a;this.n23*=a;this.n24*=a;this.n31*=a;this.n32*=a;this.n33*=a;this.n34*=a;this.n41*=a;this.n42*=a;this.n43*=a;this.n44*=a;return this},multiplyVector3:function(a){var b=a.x,c=a.y,d=a.z,f=1/(this.n41*b+this.n42*c+this.n43*d+this.n44);a.x=(this.n11*b+this.n12*c+this.n13*d+this.n14)*f;a.y=(this.n21*b+this.n22*c+this.n23*d+this.n24)*f;a.z=(this.n31*b+this.n32*c+this.n33*d+this.n34)*f;return a},multiplyVector4:function(a){var b=a.x,c=a.y,d=a.z,f=a.w;a.x=this.n11*b+this.n12*c+this.n13*d+this.n14*f;a.y=this.n21*b+this.n22*c+this.n23*d+this.n24*f;a.z=this.n31*b+this.n32*c+this.n33*d+this.n34*f;a.w=this.n41*b+this.n42*c+this.n43*d+this.n44*f;return a},rotateAxis:function(a){var b=a.x,c=a.y,d=a.z;a.x=b*this.n11+c*this.n12+d*this.n13;a.y=b*this.n21+c*this.n22+d*this.n23;a.z=b*this.n31+c*this.n32+d*this.n33;a.normalize();return a},crossVector:function(a){var b=new THREE.Vector4;b.x=this.n11*a.x+this.n12*a.y+this.n13*a.z+this.n14*a.w;b.y=this.n21*a.x+this.n22*a.y+this.n23*a.z+this.n24*a.w;b.z=this.n31*a.x+this.n32*a.y+this.n33*a.z+this.n34*a.w;b.w=a.w?this.n41*a.x+this.n42*a.y+this.n43*a.z+this.n44*a.w:1;return b},determinant:function(){var a=this.n11,b=this.n12,c=this.n13,d=this.n14,f=this.n21,e=this.n22,g=this.n23,h=this.n24,m=this.n31,l=this.n32,j=this.n33,i=this.n34,n=this.n41,o=this.n42,p=this.n43,k=this.n44;return d*g*l*n-c*h*l*n-d*e*j*n+b*h*j*n+c*e*i*n-b*g*i*n-d*g*m*o+c*h*m*o+d*f*j*o-a*h*j*o-c*f*i*o+a*g*i*o+d*e*m*p-b*h*m*p-d*f*l*p+a*h*l*p+b*f*i*p-a*e*i*p-c*e*m*k+b*g*m*k+c*f*l*k-a*g*l*k-b*f*j*k+a*e*j*k},transpose:function(){var a;a=this.n21;this.n21=this.n12;this.n12=a;a=this.n31;this.n31=this.n13;this.n13=a;a=this.n32;this.n32=this.n23;this.n23=a;a=this.n41;this.n41=this.n14;this.n14=a;a=this.n42;this.n42=this.n24;this.n24=a;a=this.n43;this.n43=this.n34;this.n43=a;return this},clone:function(){var a=new THREE.Matrix4;a.n11=this.n11;a.n12=this.n12;a.n13=this.n13;a.n14=this.n14;a.n21=this.n21;a.n22=this.n22;a.n23=this.n23;a.n24=this.n24;a.n31=this.n31;a.n32=this.n32;a.n33=this.n33;a.n34=this.n34;a.n41=this.n41;a.n42=this.n42;a.n43=this.n43;a.n44=this.n44;return a},flatten:function(){this.flat[0]=this.n11;this.flat[1]=this.n21;this.flat[2]=this.n31;this.flat[3]=this.n41;this.flat[4]=this.n12;this.flat[5]=this.n22;this.flat[6]=this.n32;this.flat[7]=this.n42;this.flat[8]=this.n13;this.flat[9]=this.n23;this.flat[10]=this.n33;this.flat[11]=this.n43;this.flat[12]=this.n14;this.flat[13]=this.n24;this.flat[14]=this.n34;this.flat[15]=this.n44;return this.flat},flattenToArray:function(a){a[0]=this.n11;a[1]=this.n21;a[2]=this.n31;a[3]=this.n41;a[4]=this.n12;a[5]=this.n22;a[6]=this.n32;a[7]=this.n42;a[8]=this.n13;a[9]=this.n23;a[10]=this.n33;a[11]=this.n43;a[12]=this.n14;a[13]=this.n24;a[14]=this.n34;a[15]=this.n44;return a},flattenToArrayOffset:function(a,b){a[b]=this.n11;a[b+1]=this.n21;a[b+2]=this.n31;a[b+3]=this.n41;a[b+4]=this.n12;a[b+5]=this.n22;a[b+6]=this.n32;a[b+7]=this.n42;a[b+8]=this.n13;a[b+9]=this.n23;a[b+10]=this.n33;a[b+11]=this.n43;a[b+12]=this.n14;a[b+13]=this.n24;a[b+14]=this.n34;a[b+15]=this.n44;return a},setTranslation:function(a,b,c){this.set(1,0,0,a,0,1,0,b,0,0,1,c,0,0,0,1);return this},setScale:function(a,b,c){this.set(a,0,0,0,0,b,0,0,0,0,c,0,0,0,0,1);return this},setRotationX:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1);return this},setRotationY:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1);return this},setRotationZ:function(a){var b=Math.cos(a),a=Math.sin(a);this.set(b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1);return this},setRotationAxis:function(a,b){var c=Math.cos(b),d=Math.sin(b),f=1-c,e=a.x,g=a.y,h=a.z,m=f*e,l=f*g;this.set(m*e+c,m*g-d*h,m*h+d*g,0,m*g+d*h,l*g+c,l*h-d*e,0,m*h-d*g,l*h+d*e,f*h*h+c,0,0,0,0,1);return this},setPosition:function(a){this.n14=a.x;this.n24=a.y;this.n34=a.z;return this},getPosition:function(){return THREE.Matrix4.__v1.set(this.n14,this.n24,this.n34)},getColumnX:function(){return THREE.Matrix4.__v1.set(this.n11,this.n21,this.n31)},getColumnY:function(){return THREE.Matrix4.__v1.set(this.n12,this.n22,this.n32)},getColumnZ:function(){return THREE.Matrix4.__v1.set(this.n13,this.n23,this.n33)},getInverse:function(a){var b=a.n11,c=a.n12,d=a.n13,f=a.n14,e=a.n21,g=a.n22,h=a.n23,m=a.n24,l=a.n31,j=a.n32,i=a.n33,n=a.n34,o=a.n41,p=a.n42,k=a.n43,s=a.n44;this.n11=h*n*p-m*i*p+m*j*k-g*n*k-h*j*s+g*i*s;this.n12=f*i*p-d*n*p-f*j*k+c*n*k+d*j*s-c*i*s;this.n13=d*m*p-f*h*p+f*g*k-c*m*k-d*g*s+c*h*s;this.n14=f*h*j-d*m*j-f*g*i+c*m*i+d*g*n-c*h*n;this.n21=m*i*o-h*n*o-m*l*k+e*n*k+h*l*s-e*i*s;this.n22=d*n*o-f*i*o+
f*l*k-b*n*k-d*l*s+b*i*s;this.n23=f*h*o-d*m*o-f*e*k+b*m*k+d*e*s-b*h*s;this.n24=d*m*l-f*h*l+f*e*i-b*m*i-d*e*n+b*h*n;this.n31=g*n*o-m*j*o+m*l*p-e*n*p-g*l*s+e*j*s;this.n32=f*j*o-c*n*o-f*l*p+b*n*p+c*l*s-b*j*s;this.n33=d*m*o-f*g*o+f*e*p-b*m*p-c*e*s+b*g*s;this.n34=f*g*l-c*m*l-f*e*j+b*m*j+c*e*n-b*g*n;this.n41=h*j*o-g*i*o-h*l*p+e*i*p+g*l*k-e*j*k;this.n42=c*i*o-d*j*o+d*l*p-b*i*p-c*l*k+b*j*k;this.n43=d*g*o-c*h*o-d*e*p+b*h*p+c*e*k-b*g*k;this.n44=c*h*l-d*g*l+d*e*j-b*h*j-c*e*i+b*g*i;this.multiplyScalar(1/a.determinant());return this},setRotationFromEuler:function(a,b){var c=a.x,d=a.y,f=a.z,e=Math.cos(c),c=Math.sin(c),g=Math.cos(d),d=Math.sin(d),h=Math.cos(f),f=Math.sin(f);switch(b){case"YXZ":var m=g*h,l=g*f,j=d*h,i=d*f;this.n11=m+i*c;this.n12=j*c-l;this.n13=e*d;this.n21=e*f;this.n22=e*h;this.n23=-c;this.n31=l*c-j;this.n32=i+m*c;this.n33=e*g;break;case"ZXY":m=g*h;l=g*f;j=d*h;i=d*f;this.n11=m-i*c;this.n12=-e*f;this.n13=j+l*c;this.n21=l+j*c;this.n22=e*h;this.n23=i-m*c;this.n31=-e*d;this.n32=c;this.n33=e*g;break;case"ZYX":m=e*h;l=e*f;j=c*h;i=c*f;this.n11=g*h;this.n12=j*d-l;this.n13=m*d+i;this.n21=g*f;this.n22=i*d+m;this.n23=l*d-j;this.n31=-d;this.n32=c*g;this.n33=e*g;break;case"YZX":m=e*g;l=e*d;j=c*g;i=c*d;this.n11=g*h;this.n12=i-m*f;this.n13=j*f+l;this.n21=f;this.n22=e*h;this.n23=-c*h;this.n31=-d*h;this.n32=l*f+j;this.n33=m-i*f;break;case"XZY":m=e*g;l=e*d;j=c*g;i=c*d;this.n11=g*h;this.n12=-f;this.n13=d*h;this.n21=m*f+i;this.n22=e*h;this.n23=l*f-j;this.n31=j*f-l;this.n32=c*h;this.n33=i*f+m;break;default:m=e*h,l=e*f,j=c*h,i=c*f,this.n11=g*h,this.n12=-g*f,this.n13=d,this.n21=l+j*d,this.n22=m-i*d,this.n23=-c*g,this.n31=i-m*d,this.n32=j+l*d,this.n33=e*g}return this},setRotationFromQuaternion:function(a){var b=a.x,c=a.y,d=a.z,f=a.w,e=b+b,g=c+c,h=d+d,a=b*e,m=b*g;b*=h;var l=c*g;c*=h;d*=h;e*=f;g*=f;f*=h;this.n11=1-(l+d);this.n12=m-f;this.n13=b+g;this.n21=m+f;this.n22=1-(a+d);this.n23=c-e;this.n31=b-g;this.n32=c+e;this.n33=1-(a+l);return this},scale:function(a){var b=a.x,c=a.y,a=a.z;this.n11*=b;this.n12*=c;this.n13*=a;this.n21*=b;this.n22*=c;this.n23*=a;this.n31*=b;this.n32*=c;this.n33*=a;this.n41*=b;this.n42*=c;this.n43*=a;return this},compose:function(a,b,c){var d=THREE.Matrix4.__m1,f=THREE.Matrix4.__m2;d.identity();d.setRotationFromQuaternion(b);f.setScale(c.x,c.y,c.z);this.multiply(d,f);this.n14=a.x;this.n24=a.y;this.n34=a.z;return this},decompose:function(a,b,c){var d=THREE.Matrix4.__v1,f=THREE.Matrix4.__v2,e=THREE.Matrix4.__v3;d.set(this.n11,this.n21,this.n31);f.set(this.n12,this.n22,this.n32);e.set(this.n13,this.n23,this.n33);a=a instanceof THREE.Vector3?a:new THREE.Vector3;b=b instanceof THREE.Quaternion?b:new THREE.Quaternion;c=c instanceof THREE.Vector3?c:new THREE.Vector3;c.x=d.length();c.y=f.length();c.z=e.length();a.x=this.n14;a.y=this.n24;a.z=this.n34;d=THREE.Matrix4.__m1;d.copy(this);d.n11/=c.x;d.n21/=c.x;d.n31/=c.x;d.n12/=c.y;d.n22/=c.y;d.n32/=c.y;d.n13/=c.z;d.n23/=c.z;d.n33/=c.z;b.setFromRotationMatrix(d);return[a,b,c]},extractPosition:function(a){this.n14=a.n14;this.n24=a.n24;this.n34=a.n34;return this},extractRotation:function(a){var b=THREE.Matrix4.__v1,c=1/b.set(a.n11,a.n21,a.n31).length(),d=1/b.set(a.n12,a.n22,a.n32).length(),b=1/b.set(a.n13,a.n23,a.n33).length();this.n11=a.n11*c;this.n21=a.n21*c;this.n31=a.n31*c;this.n12=a.n12*d;this.n22=a.n22*d;this.n32=a.n32*d;this.n13=a.n13*b;this.n23=a.n23*b;this.n33=a.n33*b;return this}};THREE.Matrix4.makeInvert3x3=function(a){var b=a.m33,c=b.m,d=a.n33*a.n22-a.n32*a.n23,f=-a.n33*a.n21+a.n31*a.n23,e=a.n32*a.n21-a.n31*a.n22,g=-a.n33*a.n12+a.n32*a.n13,h=a.n33*a.n11-a.n31*a.n13,m=-a.n32*a.n11+a.n31*a.n12,l=a.n23*a.n12-a.n22*a.n13,j=-a.n23*a.n11+a.n21*a.n13,i=a.n22*a.n11-a.n21*a.n12,a=a.n11*d+a.n21*g+a.n31*l;a===0&&console.error("THREE.Matrix4.makeInvert3x3: Matrix not invertible.");a=1/a;c[0]=a*d;c[1]=a*f;c[2]=a*e;c[3]=a*g;c[4]=a*h;c[5]=a*m;c[6]=a*l;c[7]=a*j;c[8]=a*i;return b};THREE.Matrix4.makeFrustum=function(a,b,c,d,f,e){var g;g=new THREE.Matrix4;g.n11=2*f/(b-a);g.n12=0;g.n13=(b+a)/(b-a);g.n14=0;g.n21=0;g.n22=2*f/(d-c);g.n23=(d+c)/(d-c);g.n24=0;g.n31=0;g.n32=0;g.n33=-(e+f)/(e-f);g.n34=-2*e*f/(e-f);g.n41=0;g.n42=0;g.n43=-1;g.n44=0;return g};THREE.Matrix4.makePerspective=function(a,b,c,d){var f,a=c*Math.tan(a*Math.PI/360);f=-a;return THREE.Matrix4.makeFrustum(f*b,a*b,f,a,c,d)};THREE.Matrix4.makeOrtho=function(a,b,c,d,f,e){var g,h,m,l;g=new THREE.Matrix4;h=b-a;m=c-d;l=e-f;g.n11=2/h;g.n12=0;g.n13=0;g.n14=-((b+a)/h);g.n21=0;g.n22=2/m;g.n23=0;g.n24=-((c+d)/m);g.n31=0;g.n32=0;g.n33=-2/l;g.n34=-((e+f)/l);g.n41=0;g.n42=0;g.n43=0;g.n44=1;return g};THREE.Matrix4.__v1=new THREE.Vector3;THREE.Matrix4.__v2=new THREE.Vector3;THREE.Matrix4.__v3=new THREE.Vector3;THREE.Matrix4.__m1=new THREE.Matrix4;THREE.Matrix4.__m2=new THREE.Matrix4;THREE.Object3D=function(){this.name="";this.id=THREE.Object3DCount++;this.parent=void 0;this.children=[];this.up=new THREE.Vector3(0,1,0);this.position=new THREE.Vector3;this.rotation=new THREE.Vector3;this.eulerOrder="XYZ";this.scale=new THREE.Vector3(1,1,1);this.flipSided=this.doubleSided=this.dynamic=!1;this.renderDepth=null;this.rotationAutoUpdate=!0;this.matrix=new THREE.Matrix4;this.matrixWorld=new THREE.Matrix4;this.matrixRotationWorld=new THREE.Matrix4;this.matrixWorldNeedsUpdate=this.matrixAutoUpdate=!0;this.quaternion=new THREE.Quaternion;this.useQuaternion=!1;this.boundRadius=0;this.boundRadiusScale=1;this.visible=!0;this.receiveShadow=this.castShadow=!1;this.frustumCulled=!0;this._vector=new THREE.Vector3};THREE.Object3D.prototype={constructor:THREE.Object3D,translate:function(a,b){this.matrix.rotateAxis(b);this.position.addSelf(b.multiplyScalar(a))},translateX:function(a){this.translate(a,this._vector.set(1,0,0))},translateY:function(a){this.translate(a,this._vector.set(0,1,0))},translateZ:function(a){this.translate(a,this._vector.set(0,0,1))},lookAt:function(a){this.matrix.lookAt(a,this.position,this.up);this.rotationAutoUpdate&&this.rotation.setRotationFromMatrix(this.matrix)},add:function(a){if(this.children.indexOf(a)===-1){a.parent!==void 0&&a.parent.remove(a);a.parent=this;this.children.push(a);for(var b=this;b.parent!==void 0;)b=b.parent;b!==void 0&&b instanceof THREE.Scene&&b.addObject(a)}},remove:function(a){var b=this.children.indexOf(a);if(b!==-1){a.parent=void 0;this.children.splice(b,1);for(b=this;b.parent!==void 0;)b=b.parent;b!==void 0&&b instanceof THREE.Scene&&b.removeObject(a)}},getChildByName:function(a,b){var c,d,f;c=0;for(d=this.children.length;c<d;c++){f=this.children[c];if(f.name===a)return f;if(b&&(f=f.getChildByName(a,b),f!==void 0))return f}},updateMatrix:function(){this.matrix.setPosition(this.position);this.useQuaternion?this.matrix.setRotationFromQuaternion(this.quaternion):this.matrix.setRotationFromEuler(this.rotation,this.eulerOrder);if(this.scale.x!==1||this.scale.y!==1||this.scale.z!==1)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,Math.max(this.scale.y,this.scale.z));this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(a){this.matrixAutoUpdate&&this.updateMatrix();if(this.matrixWorldNeedsUpdate||a)this.parent?this.matrixWorld.multiply(this.parent.matrixWorld,this.matrix):this.matrixWorld.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,a=!0;for(var b=0,c=this.children.length;b<c;b++)this.children[b].updateMatrixWorld(a)}};THREE.Object3DCount=0;THREE.Projector=function(){function a(){var a=g[e]=g[e]||new THREE.RenderableObject;e++;return a}function b(){var a=l[m]=l[m]||new THREE.RenderableVertex;m++;return a}function c(a,b){return b.z-a.z}function d(a,b){var c=0,d=1,e=a.z+a.w,f=b.z+b.w,g=-a.z+a.w,h=-b.z+b.w;return e>=0&&f>=0&&g>=0&&h>=0?!0:e<0&&f<0||g<0&&h<0?!1:(e<0?c=Math.max(c,e/(e-f)):f<0&&(d=Math.min(d,e/(e-f))),g<0?c=Math.max(c,g/(g-h)):h<0&&(d=Math.min(d,g/(g-h))),d<c?!1:(a.lerpSelf(b,c),b.lerpSelf(a,1-d),!0))}var f,e,g=[],h,m,l=[],j,i,n=[],o,p=[],k,s,K=[],C,Q,O=[],w={objects:[],sprites:[],lights:[],elements:[]},F=new THREE.Vector3,z=new THREE.Vector4,D=new THREE.Matrix4,u=new THREE.Matrix4,r=[new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4,new THREE.Vector4],E=new THREE.Vector4,N=new THREE.Vector4;this.computeFrustum=function(a){r[0].set(a.n41-a.n11,a.n42-a.n12,a.n43-a.n13,a.n44-a.n14);r[1].set(a.n41+a.n11,a.n42+a.n12,a.n43+a.n13,a.n44+a.n14);r[2].set(a.n41+a.n21,a.n42+a.n22,a.n43+
a.n23,a.n44+a.n24);r[3].set(a.n41-a.n21,a.n42-a.n22,a.n43-a.n23,a.n44-a.n24);r[4].set(a.n41-a.n31,a.n42-a.n32,a.n43-a.n33,a.n44-a.n34);r[5].set(a.n41+a.n31,a.n42+a.n32,a.n43+a.n33,a.n44+a.n34);for(a=0;a<6;a++){var b=r[a];b.divideScalar(Math.sqrt(b.x*b.x+b.y*b.y+b.z*b.z))}};this.projectVector=function(a,b){b.matrixWorldInverse.getInverse(b.matrixWorld);D.multiply(b.projectionMatrix,b.matrixWorldInverse);D.multiplyVector3(a);return a};this.unprojectVector=function(a,b){b.projectionMatrixInverse.getInverse(b.projectionMatrix);D.multiply(b.matrixWorld,b.projectionMatrixInverse);D.multiplyVector3(a);return a};this.pickingRay=function(a,b){var c;a.z=-1;c=new THREE.Vector3(a.x,a.y,1);this.unprojectVector(a,b);this.unprojectVector(c,b);c.subSelf(a).normalize();return new THREE.Ray(a,c)};this.projectGraph=function(b,d){e=0;w.objects.length=0;w.sprites.length=0;w.lights.length=0;var g=function(b){if(b.visible!==!1){var c;if(c=b instanceof THREE.Mesh||b instanceof THREE.Line)if(!(c=b.frustumCulled===!1))a:{for(var d=b.matrixWorld,e=-b.geometry.boundingSphere.radius*Math.max(b.scale.x,Math.max(b.scale.y,b.scale.z)),h=0;h<6;h++)if(c=r[h].x*d.n14+r[h].y*d.n24+r[h].z*d.n34+r[h].w,c<=e){c=!1;break a}c=!0}c?(D.multiplyVector3(F.copy(b.position)),f=a(),f.object=b,f.z=F.z,w.objects.push(f)):b instanceof THREE.Sprite||b instanceof THREE.Particle?(D.multiplyVector3(F.copy(b.position)),f=a(),f.object=b,f.z=F.z,w.sprites.push(f)):b instanceof THREE.Light&&w.lights.push(b);c=0;for(d=b.children.length;c<d;c++)g(b.children[c])}};g(b);d&&w.objects.sort(c);return w};this.projectScene=function(a,e,f){var g=e.near,r=e.far,F,L,B,S,v,R,P,V,J,t,A,x,y,M,la,fa;Q=s=o=i=0;w.elements.length=0;e.parent===void 0&&(console.warn("DEPRECATED: Camera hasn't been added to a Scene. Adding it..."),a.add(e));a.updateMatrixWorld();e.matrixWorldInverse.getInverse(e.matrixWorld);D.multiply(e.projectionMatrix,e.matrixWorldInverse);this.computeFrustum(D);w=this.projectGraph(a,!1);a=0;for(F=w.objects.length;a<F;a++)if(J=w.objects[a].object,t=J.matrixWorld,x=J.material,m=0,J instanceof THREE.Mesh){A=J.geometry;y=J.geometry.materials;S=A.vertices;M=A.faces;la=A.faceVertexUvs;A=J.matrixRotationWorld.extractRotation(t);L=0;for(B=S.length;L<B;L++)h=b(),h.positionWorld.copy(S[L].position),t.multiplyVector3(h.positionWorld),h.positionScreen.copy(h.positionWorld),D.multiplyVector4(h.positionScreen),h.positionScreen.x/=h.positionScreen.w,h.positionScreen.y/=h.positionScreen.w,h.visible=h.positionScreen.z>g&&h.positionScreen.z<r;S=0;for(L=M.length;S<L;S++){B=M[S];if(B instanceof THREE.Face3)if(v=l[B.a],R=l[B.b],P=l[B.c],v.visible&&R.visible&&P.visible&&(J.doubleSided||J.flipSided!=(P.positionScreen.x-v.positionScreen.x)*(R.positionScreen.y-v.positionScreen.y)-(P.positionScreen.y-v.positionScreen.y)*(R.positionScreen.x-v.positionScreen.x)<0))V=n[i]=n[i]||new THREE.RenderableFace3,i++,j=V,j.v1.copy(v),j.v2.copy(R),j.v3.copy(P);else continue;else if(B instanceof THREE.Face4)if(v=l[B.a],R=l[B.b],P=l[B.c],V=l[B.d],v.visible&&R.visible&&P.visible&&V.visible&&(J.doubleSided||J.flipSided!=((V.positionScreen.x-v.positionScreen.x)*(R.positionScreen.y-v.positionScreen.y)-(V.positionScreen.y-v.positionScreen.y)*(R.positionScreen.x-v.positionScreen.x)<0||(R.positionScreen.x-P.positionScreen.x)*(V.positionScreen.y-P.positionScreen.y)-(R.positionScreen.y-P.positionScreen.y)*(V.positionScreen.x-P.positionScreen.x)<0)))fa=p[o]=p[o]||new THREE.RenderableFace4,o++,j=fa,j.v1.copy(v),j.v2.copy(R),j.v3.copy(P),j.v4.copy(V);else continue;j.normalWorld.copy(B.normal);A.multiplyVector3(j.normalWorld);j.centroidWorld.copy(B.centroid);t.multiplyVector3(j.centroidWorld);j.centroidScreen.copy(j.centroidWorld);D.multiplyVector3(j.centroidScreen);P=B.vertexNormals;v=0;for(R=P.length;v<R;v++)V=j.vertexNormalsWorld[v],V.copy(P[v]),A.multiplyVector3(V);v=0;for(R=la.length;v<R;v++)if(fa=la[v][S]){P=0;for(V=fa.length;P<V;P++)j.uvs[v][P]=fa[P]}j.material=x;j.faceMaterial=B.materialIndex!==null?y[B.materialIndex]:null;j.z=j.centroidScreen.z;w.elements.push(j)}}else if(J instanceof
THREE.Line){u.multiply(D,t);S=J.geometry.vertices;v=b();v.positionScreen.copy(S[0].position);u.multiplyVector4(v.positionScreen);L=1;for(B=S.length;L<B;L++)if(v=b(),v.positionScreen.copy(S[L].position),u.multiplyVector4(v.positionScreen),R=l[m-2],E.copy(v.positionScreen),N.copy(R.positionScreen),d(E,N))E.multiplyScalar(1/E.w),N.multiplyScalar(1/N.w),J=K[s]=K[s]||new THREE.RenderableLine,s++,k=J,k.v1.positionScreen.copy(E),k.v2.positionScreen.copy(N),k.z=Math.max(E.z,N.z),k.material=x,w.elements.push(k)}a=0;for(F=w.sprites.length;a<F;a++)if(J=w.sprites[a].object,t=J.matrixWorld,J instanceof THREE.Particle&&(z.set(t.n14,t.n24,t.n34,1),D.multiplyVector4(z),z.z/=z.w,z.z>0&&z.z<1))g=O[Q]=O[Q]||new THREE.RenderableParticle,Q++,C=g,C.x=z.x/z.w,C.y=z.y/z.w,C.z=z.z,C.rotation=J.rotation.z,C.scale.x=J.scale.x*Math.abs(C.x-(z.x+e.projectionMatrix.n11)/(z.w+e.projectionMatrix.n14)),C.scale.y=J.scale.y*Math.abs(C.y-(z.y+e.projectionMatrix.n22)/(z.w+e.projectionMatrix.n24)),C.material=J.material,w.elements.push(C);f&&w.elements.sort(c);return w}};THREE.Quaternion=function(a,b,c,d){this.set(a||0,b||0,c||0,d!==void 0?d:1)};THREE.Quaternion.prototype={constructor:THREE.Quaternion,set:function(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w;return this},setFromEuler:function(a){var b=Math.PI/360,c=a.x*b,d=a.y*b,f=a.z*b,a=Math.cos(d),d=Math.sin(d),b=Math.cos(-f),f=Math.sin(-f),e=Math.cos(c),c=Math.sin(c),g=a*b,h=d*f;this.w=g*e-h*c;this.x=g*c+h*e;this.y=d*b*e+a*f*c;this.z=a*f*e-d*b*c;return this},setFromAxisAngle:function(a,b){var c=b/2,d=Math.sin(c);this.x=a.x*d;this.y=a.y*d;this.z=a.z*d;this.w=Math.cos(c);return this},setFromRotationMatrix:function(a){var b=Math.pow(a.determinant(),1/3);this.w=Math.sqrt(Math.max(0,b+a.n11+a.n22+a.n33))/2;this.x=Math.sqrt(Math.max(0,b+a.n11-a.n22-a.n33))/2;this.y=Math.sqrt(Math.max(0,b-a.n11+a.n22-a.n33))/2;this.z=Math.sqrt(Math.max(0,b-a.n11-a.n22+a.n33))/2;this.x=a.n32-a.n23<0?-Math.abs(this.x):Math.abs(this.x);this.y=a.n13-a.n31<0?-Math.abs(this.y):Math.abs(this.y);this.z=a.n21-a.n12<0?-Math.abs(this.z):Math.abs(this.z);this.normalize();return this},calculateW:function(){this.w=-Math.sqrt(Math.abs(1-this.x*this.x-this.y*this.y-this.z*this.z));return this},inverse:function(){this.x*=-1;this.y*=-1;this.z*=-1;return this},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},normalize:function(){var a=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);a===0?this.w=this.z=this.y=this.x=0:(a=1/a,this.x*=a,this.y*=a,this.z*=a,this.w*=a);return this},multiplySelf:function(a){var b=this.x,c=this.y,d=this.z,f=this.w,e=a.x,g=a.y,h=a.z,a=a.w;this.x=b*a+f*e+c*h-d*g;this.y=c*a+f*g+d*e-b*h;this.z=d*a+f*h+b*g-c*e;this.w=f*a-b*e-c*g-d*h;return this},multiply:function(a,b){this.x=a.x*b.w+a.y*b.z-a.z*b.y+a.w*b.x;this.y=-a.x*b.z+a.y*b.w+a.z*b.x+a.w*b.y;this.z=a.x*b.y-a.y*b.x+a.z*b.w+a.w*b.z;this.w=-a.x*b.x-a.y*b.y-a.z*b.z+a.w*b.w;return this},multiplyVector3:function(a,b){b||(b=a);var c=a.x,d=a.y,f=a.z,e=this.x,g=this.y,h=this.z,m=this.w,l=m*c+g*f-h*d,j=m*d+h*c-e*f,i=m*f+e*d-g*c,c=-e*c-g*d-h*f;b.x=l*m+c*-e+j*-h-i*-g;b.y=j*m+c*-g+i*-e-l*-h;b.z=i*m+c*-h+l*-g-j*-e;return b}};THREE.Quaternion.slerp=function(a,b,c,d){var f=a.w*b.w+a.x*b.x+a.y*b.y+a.z*b.z;f<0?(c.w=-b.w,c.x=-b.x,c.y=-b.y,c.z=-b.z,f=-f):c.copy(b);if(Math.abs(f)>=1)return c.w=a.w,c.x=a.x,c.y=a.y,c.z=a.z,c;var e=Math.acos(f),f=Math.sqrt(1-f*f);if(Math.abs(f)<0.001)return c.w=0.5*(a.w+b.w),c.x=0.5*(a.x+b.x),c.y=0.5*(a.y+b.y),c.z=0.5*(a.z+b.z),c;b=Math.sin((1-d)*e)/f;d=Math.sin(d*e)/f;c.w=a.w*b+c.w*d;c.x=a.x*b+c.x*d;c.y=a.y*b+c.y*d;c.z=a.z*b+c.z*d;return c};THREE.Vertex=function(a){this.position=a||new THREE.Vector3};THREE.Face3=function(a,b,c,d,f,e){this.a=a;this.b=b;this.c=c;this.normal=d instanceof THREE.Vector3?d:new THREE.Vector3;this.vertexNormals=d instanceof Array?d:[];this.color=f instanceof THREE.Color?f:new THREE.Color;this.vertexColors=f instanceof Array?f:[];this.vertexTangents=[];this.materialIndex=e;this.centroid=new THREE.Vector3};THREE.Face4=function(a,b,c,d,f,e,g){this.a=a;this.b=b;this.c=c;this.d=d;this.normal=f instanceof THREE.Vector3?f:new THREE.Vector3;this.vertexNormals=f instanceof Array?f:[];this.color=e instanceof THREE.Color?e:new THREE.Color;this.vertexColors=e instanceof Array?e:[];this.vertexTangents=[];this.materialIndex=g;this.centroid=new THREE.Vector3};THREE.UV=function(a,b){this.u=a||0;this.v=b||0};THREE.UV.prototype={constructor:THREE.UV,set:function(a,b){this.u=a;this.v=b;return this},copy:function(a){this.u=a.u;this.v=a.v;return this},clone:function(){return new THREE.UV(this.u,this.v)}};THREE.Geometry=function(){this.id=THREE.GeometryCount++;this.vertices=[];this.colors=[];this.materials=[];this.faces=[];this.faceUvs=[[]];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphColors=[];this.skinWeights=[];this.skinIndices=[];this.boundingSphere=this.boundingBox=null;this.dynamic=this.hasTangents=!1};THREE.Geometry.prototype={constructor:THREE.Geometry,applyMatrix:function(a){var b=new THREE.Matrix4;b.extractRotation(a,new THREE.Vector3(1,1,1));for(var c=0,d=this.vertices.length;c<d;c++)a.multiplyVector3(this.vertices[c].position);c=0;for(d=this.faces.length;c<d;c++){var f=this.faces[c];b.multiplyVector3(f.normal);for(var e=0,g=f.vertexNormals.length;e<g;e++)b.multiplyVector3(f.vertexNormals[e]);a.multiplyVector3(f.centroid)}},computeCentroids:function(){var a,b,c;a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],c.centroid.set(0,0,0),c instanceof THREE.Face3?(c.centroid.addSelf(this.vertices[c.a].position),c.centroid.addSelf(this.vertices[c.b].position),c.centroid.addSelf(this.vertices[c.c].position),c.centroid.divideScalar(3)):c instanceof THREE.Face4&&(c.centroid.addSelf(this.vertices[c.a].position),c.centroid.addSelf(this.vertices[c.b].position),c.centroid.addSelf(this.vertices[c.c].position),c.centroid.addSelf(this.vertices[c.d].position),c.centroid.divideScalar(4))},computeFaceNormals:function(){var a,b,c,d,f,e,g=new THREE.Vector3,h=new THREE.Vector3;a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],d=this.vertices[c.a],f=this.vertices[c.b],e=this.vertices[c.c],g.sub(e.position,f.position),h.sub(d.position,f.position),g.crossSelf(h),g.isZero()||g.normalize(),c.normal.copy(g)},computeVertexNormals:function(){var a,b,c,d;if(this.__tmpVertices===void 0){d=this.__tmpVertices=Array(this.vertices.length);a=0;for(b=this.vertices.length;a<b;a++)d[a]=new THREE.Vector3;a=0;for(b=this.faces.length;a<b;a++)if(c=this.faces[a],c instanceof THREE.Face3)c.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];else if(c instanceof THREE.Face4)c.vertexNormals=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3]}else{d=this.__tmpVertices;a=0;for(b=this.vertices.length;a<b;a++)d[a].set(0,0,0)}a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],c instanceof THREE.Face3?(d[c.a].addSelf(c.normal),d[c.b].addSelf(c.normal),d[c.c].addSelf(c.normal)):c instanceof THREE.Face4&&(d[c.a].addSelf(c.normal),d[c.b].addSelf(c.normal),d[c.c].addSelf(c.normal),d[c.d].addSelf(c.normal));a=0;for(b=this.vertices.length;a<b;a++)d[a].normalize();a=0;for(b=this.faces.length;a<b;a++)c=this.faces[a],c instanceof THREE.Face3?(c.vertexNormals[0].copy(d[c.a]),c.vertexNormals[1].copy(d[c.b]),c.vertexNormals[2].copy(d[c.c])):c instanceof THREE.Face4&&(c.vertexNormals[0].copy(d[c.a]),c.vertexNormals[1].copy(d[c.b]),c.vertexNormals[2].copy(d[c.c]),c.vertexNormals[3].copy(d[c.d]))},computeTangents:function(){function a(a,b,c,d,e,f,D){h=a.vertices[b].position;m=a.vertices[c].position;l=a.vertices[d].position;j=g[e];i=g[f];n=g[D];o=m.x-h.x;p=l.x-h.x;k=m.y-h.y;s=l.y-h.y;K=m.z-h.z;C=l.z-h.z;Q=i.u-j.u;O=n.u-j.u;w=i.v-j.v;F=n.v-j.v;z=1/(Q*F-O*w);E.set((F*o-w*p)*z,(F*k-w*s)*z,(F*K-w*C)*z);N.set((Q*p-O*o)*z,(Q*s-O*k)*z,(Q*C-O*K)*z);u[b].addSelf(E);u[c].addSelf(E);u[d].addSelf(E);r[b].addSelf(N);r[c].addSelf(N);r[d].addSelf(N)}var b,c,d,f,e,g,h,m,l,j,i,n,o,p,k,s,K,C,Q,O,w,F,z,D,u=[],r=[],E=new THREE.Vector3,N=new THREE.Vector3,W=new THREE.Vector3,da=new THREE.Vector3,G=new THREE.Vector3;b=0;for(c=this.vertices.length;b<c;b++)u[b]=new THREE.Vector3,r[b]=new THREE.Vector3;b=0;for(c=this.faces.length;b<c;b++)e=this.faces[b],g=this.faceVertexUvs[0][b],e instanceof THREE.Face3?a(this,e.a,e.b,e.c,0,1,2):e instanceof THREE.Face4&&(a(this,e.a,e.b,e.c,0,1,2),a(this,e.a,e.b,e.d,0,1,3));var H=["a","b","c","d"];b=0;for(c=this.faces.length;b<c;b++){e=this.faces[b];for(d=0;d<e.vertexNormals.length;d++)G.copy(e.vertexNormals[d]),f=e[H[d]],D=u[f],W.copy(D),W.subSelf(G.multiplyScalar(G.dot(D))).normalize(),da.cross(e.vertexNormals[d],D),f=da.dot(r[f]),f=f<0?-1:1,e.vertexTangents[d]=new THREE.Vector4(W.x,W.y,W.z,f)}this.hasTangents=!0},computeBoundingBox:function(){var a;if(this.vertices.length>0){this.boundingBox={x:[this.vertices[0].position.x,this.vertices[0].position.x],y:[this.vertices[0].position.y,this.vertices[0].position.y],z:[this.vertices[0].position.z,this.vertices[0].position.z]};for(var b=1,c=this.vertices.length;b<c;b++){a=this.vertices[b];if(a.position.x<this.boundingBox.x[0])this.boundingBox.x[0]=a.position.x;else if(a.position.x>this.boundingBox.x[1])this.boundingBox.x[1]=a.position.x;if(a.position.y<this.boundingBox.y[0])this.boundingBox.y[0]=a.position.y;else if(a.position.y>this.boundingBox.y[1])this.boundingBox.y[1]=a.position.y;if(a.position.z<this.boundingBox.z[0])this.boundingBox.z[0]=a.position.z;else if(a.position.z>this.boundingBox.z[1])this.boundingBox.z[1]=a.position.z}}},computeBoundingSphere:function(){for(var a=0,b=0,c=this.vertices.length;b<c;b++)a=Math.max(a,this.vertices[b].position.length());this.boundingSphere={radius:a}},mergeVertices:function(){var a={},b=[],c=[],d,f=Math.pow(10,4),e,g;e=0;for(g=this.vertices.length;e<g;e++)d=this.vertices[e].position,d=[Math.round(d.x*f),Math.round(d.y*f),Math.round(d.z*f)].join("_"),a[d]===void 0?(a[d]=e,b.push(this.vertices[e]),c[e]=b.length-1):c[e]=c[a[d]];e=0;for(g=this.faces.length;e<g;e++)if(a=this.faces[e],a instanceof THREE.Face3)a.a=c[a.a],a.b=c[a.b],a.c=c[a.c];else if(a instanceof THREE.Face4)a.a=c[a.a],a.b=c[a.b],a.c=c[a.c],a.d=c[a.d];this.vertices=b}};THREE.GeometryCount=0;THREE.Camera=function(){if(arguments.length)return console.warn("DEPRECATED: Camera() is now PerspectiveCamera() or OrthographicCamera()."),new THREE.PerspectiveCamera(arguments[0],arguments[1],arguments[2],arguments[3]);THREE.Object3D.call(this);this.matrixWorldInverse=new THREE.Matrix4;this.projectionMatrix=new THREE.Matrix4;this.projectionMatrixInverse=new THREE.Matrix4};THREE.Camera.prototype=new THREE.Object3D;THREE.Camera.prototype.constructor=THREE.Camera;THREE.Camera.prototype.lookAt=function(a){this.matrix.lookAt(this.position,a,this.up);this.rotationAutoUpdate&&this.rotation.setRotationFromMatrix(this.matrix)};THREE.OrthographicCamera=function(a,b,c,d,f,e){THREE.Camera.call(this);this.left=a;this.right=b;this.top=c;this.bottom=d;this.near=f!==void 0?f:0.1;this.far=e!==void 0?e:2E3;this.updateProjectionMatrix()};THREE.OrthographicCamera.prototype=new THREE.Camera;THREE.OrthographicCamera.prototype.constructor=THREE.OrthographicCamera;THREE.OrthographicCamera.prototype.updateProjectionMatrix=function(){this.projectionMatrix=THREE.Matrix4.makeOrtho(this.left,this.right,this.top,this.bottom,this.near,this.far)};THREE.PerspectiveCamera=function(a,b,c,d){THREE.Camera.call(this);this.fov=a!==void 0?a:50;this.aspect=b!==void 0?b:1;this.near=c!==void 0?c:0.1;this.far=d!==void 0?d:2E3;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype=new THREE.Camera;THREE.PerspectiveCamera.prototype.constructor=THREE.PerspectiveCamera;THREE.PerspectiveCamera.prototype.setLens=function(a,b){this.fov=2*Math.atan((b!==void 0?b:43.25)/(a*2));this.fov*=180/Math.PI;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype.setViewOffset=function(a,b,c,d,f,e){this.fullWidth=a;this.fullHeight=b;this.x=c;this.y=d;this.width=f;this.height=e;this.updateProjectionMatrix()};THREE.PerspectiveCamera.prototype.updateProjectionMatrix=function(){if(this.fullWidth){var a=this.fullWidth/this.fullHeight,b=Math.tan(this.fov*Math.PI/360)*this.near,c=-b,d=a*c,a=Math.abs(a*b-d),c=Math.abs(b-c);this.projectionMatrix=THREE.Matrix4.makeFrustum(d+this.x*a/this.fullWidth,d+(this.x+this.width)*a/this.fullWidth,b-(this.y+this.height)*c/this.fullHeight,b-this.y*c/this.fullHeight,this.near,this.far)}else this.projectionMatrix=THREE.Matrix4.makePerspective(this.fov,this.aspect,this.near,this.far)};THREE.Light=function(a){THREE.Object3D.call(this);this.color=new THREE.Color(a)};THREE.Light.prototype=new THREE.Object3D;THREE.Light.prototype.constructor=THREE.Light;THREE.Light.prototype.supr=THREE.Object3D.prototype;THREE.AmbientLight=function(a){THREE.Light.call(this,a)};THREE.AmbientLight.prototype=new THREE.Light;THREE.AmbientLight.prototype.constructor=THREE.AmbientLight;THREE.DirectionalLight=function(a,b,c){THREE.Light.call(this,a);this.position=new THREE.Vector3(0,1,0);this.intensity=b!==void 0?b:1;this.distance=c!==void 0?c:0};THREE.DirectionalLight.prototype=new THREE.Light;THREE.DirectionalLight.prototype.constructor=THREE.DirectionalLight;THREE.PointLight=function(a,b,c){THREE.Light.call(this,a);this.position=new THREE.Vector3(0,0,0);this.intensity=b!==void 0?b:1;this.distance=c!==void 0?c:0};THREE.PointLight.prototype=new THREE.Light;THREE.PointLight.prototype.constructor=THREE.PointLight;THREE.Material=function(a){this.name="";this.id=THREE.MaterialCount++;a=a||{};this.opacity=a.opacity!==void 0?a.opacity:1;this.transparent=a.transparent!==void 0?a.transparent:!1;this.blending=a.blending!==void 0?a.blending:THREE.NormalBlending;this.depthTest=a.depthTest!==void 0?a.depthTest:!0;this.depthWrite=a.depthWrite!==void 0?a.depthWrite:!0;this.polygonOffset=a.polygonOffset!==void 0?a.polygonOffset:!1;this.polygonOffsetFactor=a.polygonOffsetFactor!==void 0?a.polygonOffsetFactor:0;this.polygonOffsetUnits=a.polygonOffsetUnits!==void 0?a.polygonOffsetUnits:0;this.alphaTest=a.alphaTest!==void 0?a.alphaTest:0;this.overdraw=a.overdraw!==void 0?a.overdraw:!1};THREE.MaterialCount=0;THREE.NoShading=0;THREE.FlatShading=1;THREE.SmoothShading=2;THREE.NoColors=0;THREE.FaceColors=1;THREE.VertexColors=2;THREE.NormalBlending=0;THREE.AdditiveBlending=1;THREE.SubtractiveBlending=2;THREE.MultiplyBlending=3;THREE.AdditiveAlphaBlending=4;THREE.LineBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.linewidth=a.linewidth!==void 0?a.linewidth:1;this.linecap=a.linecap!==void 0?a.linecap:"round";this.linejoin=a.linejoin!==void 0?a.linejoin:"round";this.vertexColors=a.vertexColors?a.vertexColors:!1;this.fog=a.fog!==void 0?a.fog:!0};THREE.LineBasicMaterial.prototype=new THREE.Material;THREE.LineBasicMaterial.prototype.constructor=THREE.LineBasicMaterial;THREE.MeshBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.map=a.map!==void 0?a.map:null;this.lightMap=a.lightMap!==void 0?a.lightMap:null;this.envMap=a.envMap!==void 0?a.envMap:null;this.combine=a.combine!==void 0?a.combine:THREE.MultiplyOperation;this.reflectivity=a.reflectivity!==void 0?a.reflectivity:1;this.refractionRatio=a.refractionRatio!==void 0?a.refractionRatio:0.98;this.fog=a.fog!==void 0?a.fog:!0;this.shading=a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:!1;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1;this.wireframeLinecap=a.wireframeLinecap!==void 0?a.wireframeLinecap:"round";this.wireframeLinejoin=a.wireframeLinejoin!==void 0?a.wireframeLinejoin:"round";this.vertexColors=a.vertexColors!==void 0?a.vertexColors:!1;this.skinning=a.skinning!==void 0?a.skinning:!1;this.morphTargets=a.morphTargets!==void 0?a.morphTargets:!1};THREE.MeshBasicMaterial.prototype=new THREE.Material;THREE.MeshBasicMaterial.prototype.constructor=THREE.MeshBasicMaterial;THREE.MeshLambertMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.ambient=a.ambient!==void 0?new THREE.Color(a.ambient):new THREE.Color(328965);this.map=a.map!==void 0?a.map:null;this.lightMap=a.lightMap!==void 0?a.lightMap:null;this.envMap=a.envMap!==void 0?a.envMap:null;this.combine=a.combine!==void 0?a.combine:THREE.MultiplyOperation;this.reflectivity=a.reflectivity!==void 0?a.reflectivity:1;this.refractionRatio=a.refractionRatio!==void 0?a.refractionRatio:0.98;this.fog=a.fog!==void 0?a.fog:!0;this.shading=a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:!1;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1;this.wireframeLinecap=a.wireframeLinecap!==void 0?a.wireframeLinecap:"round";this.wireframeLinejoin=a.wireframeLinejoin!==void 0?a.wireframeLinejoin:"round";this.vertexColors=a.vertexColors!==void 0?a.vertexColors:!1;this.skinning=a.skinning!==void 0?a.skinning:!1;this.morphTargets=a.morphTargets!==void 0?a.morphTargets:!1};THREE.MeshLambertMaterial.prototype=new THREE.Material;THREE.MeshLambertMaterial.prototype.constructor=THREE.MeshLambertMaterial;THREE.MeshPhongMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.ambient=a.ambient!==void 0?new THREE.Color(a.ambient):new THREE.Color(328965);this.specular=a.specular!==void 0?new THREE.Color(a.specular):new THREE.Color(1118481);this.shininess=a.shininess!==void 0?a.shininess:30;this.metal=a.metal!==void 0?a.metal:!1;this.perPixel=a.perPixel!==void 0?a.perPixel:!1;this.map=a.map!==void 0?a.map:null;this.lightMap=a.lightMap!==void 0?a.lightMap:null;this.envMap=a.envMap!==void 0?a.envMap:null;this.combine=a.combine!==void 0?a.combine:THREE.MultiplyOperation;this.reflectivity=a.reflectivity!==void 0?a.reflectivity:1;this.refractionRatio=a.refractionRatio!==void 0?a.refractionRatio:0.98;this.fog=a.fog!==void 0?a.fog:!0;this.shading=a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:!1;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1;this.wireframeLinecap=a.wireframeLinecap!==void 0?a.wireframeLinecap:"round";this.wireframeLinejoin=a.wireframeLinejoin!==void 0?a.wireframeLinejoin:"round";this.vertexColors=a.vertexColors!==void 0?a.vertexColors:!1;this.skinning=a.skinning!==void 0?a.skinning:!1;this.morphTargets=a.morphTargets!==void 0?a.morphTargets:!1};THREE.MeshPhongMaterial.prototype=new THREE.Material;THREE.MeshPhongMaterial.prototype.constructor=THREE.MeshPhongMaterial;THREE.MeshDepthMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.shading=a.shading!==void 0?a.shading:THREE.SmoothShading;this.wireframe=a.wireframe!==void 0?a.wireframe:!1;this.wireframeLinewidth=a.wireframeLinewidth!==void 0?a.wireframeLinewidth:1};THREE.MeshDepthMaterial.prototype=new THREE.Material;THREE.MeshDepthMaterial.prototype.constructor=THREE.MeshDepthMaterial;THREE.MeshNormalMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.shading=a.shading?a.shading:THREE.FlatShading;this.wireframe=a.wireframe?a.wireframe:!1;this.wireframeLinewidth=a.wireframeLinewidth?a.wireframeLinewidth:1};THREE.MeshNormalMaterial.prototype=new THREE.Material;THREE.MeshNormalMaterial.prototype.constructor=THREE.MeshNormalMaterial;THREE.MeshFaceMaterial=function(){};THREE.ParticleBasicMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.map=a.map!==void 0?a.map:null;this.size=a.size!==void 0?a.size:1;this.sizeAttenuation=a.sizeAttenuation!==void 0?a.sizeAttenuation:!0;this.vertexColors=a.vertexColors!==void 0?a.vertexColors:!1;this.fog=a.fog!==void 0?a.fog:!0};THREE.ParticleBasicMaterial.prototype=new THREE.Material;THREE.ParticleBasicMaterial.prototype.constructor=THREE.ParticleBasicMaterial;THREE.ParticleCanvasMaterial=function(a){THREE.Material.call(this,a);a=a||{};this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.program=a.program!==void 0?a.program:function(){}};THREE.ParticleCanvasMaterial.prototype=new THREE.Material;THREE.ParticleCanvasMaterial.prototype.constructor=THREE.ParticleCanvasMaterial;THREE.Texture=function(a,b,c,d,f,e){this.id=THREE.TextureCount++;this.image=a;this.mapping=b!==void 0?b:new THREE.UVMapping;this.wrapS=c!==void 0?c:THREE.ClampToEdgeWrapping;this.wrapT=d!==void 0?d:THREE.ClampToEdgeWrapping;this.magFilter=f!==void 0?f:THREE.LinearFilter;this.minFilter=e!==void 0?e:THREE.LinearMipMapLinearFilter;this.offset=new THREE.Vector2(0,0);this.repeat=new THREE.Vector2(1,1);this.needsUpdate=!1;this.onUpdate=null};THREE.Texture.prototype={constructor:THREE.Texture,clone:function(){var a=new THREE.Texture(this.image,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter);a.offset.copy(this.offset);a.repeat.copy(this.repeat);return a}};THREE.TextureCount=0;THREE.MultiplyOperation=0;THREE.MixOperation=1;THREE.CubeReflectionMapping=function(){};THREE.CubeRefractionMapping=function(){};THREE.LatitudeReflectionMapping=function(){};THREE.LatitudeRefractionMapping=function(){};THREE.SphericalReflectionMapping=function(){};THREE.SphericalRefractionMapping=function(){};THREE.UVMapping=function(){};THREE.RepeatWrapping=0;THREE.ClampToEdgeWrapping=1;THREE.MirroredRepeatWrapping=2;THREE.NearestFilter=3;THREE.NearestMipMapNearestFilter=4;THREE.NearestMipMapLinearFilter=5;THREE.LinearFilter=6;THREE.LinearMipMapNearestFilter=7;THREE.LinearMipMapLinearFilter=8;THREE.ByteType=9;THREE.UnsignedByteType=10;THREE.ShortType=11;THREE.UnsignedShortType=12;THREE.IntType=13;THREE.UnsignedIntType=14;THREE.FloatType=15;THREE.AlphaFormat=16;THREE.RGBFormat=17;THREE.RGBAFormat=18;THREE.LuminanceFormat=19;THREE.LuminanceAlphaFormat=20;THREE.Particle=function(a){THREE.Object3D.call(this);this.material=a};THREE.Particle.prototype=new THREE.Object3D;THREE.Particle.prototype.constructor=THREE.Particle;THREE.Line=function(a,b,c){THREE.Object3D.call(this);this.geometry=a;this.material=b;this.type=c!==void 0?c:THREE.LineStrip;this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere())};THREE.LineStrip=0;THREE.LinePieces=1;THREE.Line.prototype=new THREE.Object3D;THREE.Line.prototype.constructor=THREE.Line;THREE.Mesh=function(a,b){THREE.Object3D.call(this);this.geometry=a;this.material=b;if(b instanceof Array)console.warn("DEPRECATED: Mesh material can no longer be an Array. Using material at index 0..."),this.material=b[0];if(this.geometry&&(this.geometry.boundingSphere||this.geometry.computeBoundingSphere(),this.boundRadius=a.boundingSphere.radius,this.geometry.morphTargets.length)){this.morphTargetBase=-1;this.morphTargetForcedOrder=[];this.morphTargetInfluences=[];this.morphTargetDictionary={};for(var c=0;c<this.geometry.morphTargets.length;c++)this.morphTargetInfluences.push(0),this.morphTargetDictionary[this.geometry.morphTargets[c].name]=c}};THREE.Mesh.prototype=new THREE.Object3D;THREE.Mesh.prototype.constructor=THREE.Mesh;THREE.Mesh.prototype.supr=THREE.Object3D.prototype;THREE.Mesh.prototype.getMorphTargetIndexByName=function(a){if(this.morphTargetDictionary[a]!==void 0)return this.morphTargetDictionary[a];console.log("THREE.Mesh.getMorphTargetIndexByName: morph target "+a+" does not exist. Returning 0.");return 0};THREE.Bone=function(a){THREE.Object3D.call(this);this.skin=a;this.skinMatrix=new THREE.Matrix4};THREE.Bone.prototype=new THREE.Object3D;THREE.Bone.prototype.constructor=THREE.Bone;THREE.Bone.prototype.supr=THREE.Object3D.prototype;THREE.Bone.prototype.update=function(a,b){this.matrixAutoUpdate&&(b|=this.updateMatrix());if(b||this.matrixWorldNeedsUpdate)a?this.skinMatrix.multiply(a,this.matrix):this.skinMatrix.copy(this.matrix),this.matrixWorldNeedsUpdate=!1,b=!0;var c,d=this.children.length;for(c=0;c<d;c++)this.children[c].update(this.skinMatrix,b)};THREE.Sprite=function(a){THREE.Object3D.call(this);this.color=a.color!==void 0?new THREE.Color(a.color):new THREE.Color(16777215);this.map=a.map instanceof THREE.Texture?a.map:THREE.ImageUtils.loadTexture(a.map);this.blending=a.blending!==void 0?a.blending:THREE.NormalBlending;this.useScreenCoordinates=a.useScreenCoordinates!==void 0?a.useScreenCoordinates:!0;this.mergeWith3D=a.mergeWith3D!==void 0?a.mergeWith3D:!this.useScreenCoordinates;this.affectedByDistance=a.affectedByDistance!==void 0?a.affectedByDistance:!this.useScreenCoordinates;this.scaleByViewport=a.scaleByViewport!==void 0?a.scaleByViewport:!this.affectedByDistance;this.alignment=a.alignment instanceof THREE.Vector2?a.alignment:THREE.SpriteAlignment.center;this.rotation3d=this.rotation;this.rotation=0;this.opacity=1;this.uvOffset=new THREE.Vector2(0,0);this.uvScale=new THREE.Vector2(1,1)};THREE.Sprite.prototype=new THREE.Object3D;THREE.Sprite.prototype.constructor=THREE.Sprite;THREE.Sprite.prototype.updateMatrix=function(){this.matrix.setPosition(this.position);this.rotation3d.set(0,0,this.rotation);this.matrix.setRotationFromEuler(this.rotation3d);if(this.scale.x!==1||this.scale.y!==1)this.matrix.scale(this.scale),this.boundRadiusScale=Math.max(this.scale.x,this.scale.y);this.matrixWorldNeedsUpdate=!0};THREE.SpriteAlignment={};THREE.SpriteAlignment.topLeft=new THREE.Vector2(1,-1);THREE.SpriteAlignment.topCenter=new THREE.Vector2(0,-1);THREE.SpriteAlignment.topRight=new THREE.Vector2(-1,-1);THREE.SpriteAlignment.centerLeft=new THREE.Vector2(1,0);THREE.SpriteAlignment.center=new THREE.Vector2(0,0);THREE.SpriteAlignment.centerRight=new THREE.Vector2(-1,0);THREE.SpriteAlignment.bottomLeft=new THREE.Vector2(1,1);THREE.SpriteAlignment.bottomCenter=new THREE.Vector2(0,1);THREE.SpriteAlignment.bottomRight=new THREE.Vector2(-1,1);THREE.Scene=function(){THREE.Object3D.call(this);this.overrideMaterial=this.fog=null;this.matrixAutoUpdate=!1;this.objects=[];this.lights=[];this.__objectsAdded=[];this.__objectsRemoved=[]};THREE.Scene.prototype=new THREE.Object3D;THREE.Scene.prototype.constructor=THREE.Scene;THREE.Scene.prototype.addObject=function(a){if(a instanceof THREE.Light)this.lights.indexOf(a)===-1&&this.lights.push(a);else if(!(a instanceof THREE.Camera||a instanceof THREE.Bone)&&this.objects.indexOf(a)===-1){this.objects.push(a);this.__objectsAdded.push(a);var b=this.__objectsRemoved.indexOf(a);b!==-1&&this.__objectsRemoved.splice(b,1)}for(b=0;b<a.children.length;b++)this.addObject(a.children[b])};THREE.Scene.prototype.removeObject=function(a){if(a instanceof THREE.Light){var b=this.lights.indexOf(a);b!==-1&&this.lights.splice(b,1)}else a instanceof THREE.Camera||(b=this.objects.indexOf(a),b!==-1&&(this.objects.splice(b,1),this.__objectsRemoved.push(a),b=this.__objectsAdded.indexOf(a),b!==-1&&this.__objectsAdded.splice(b,1)));for(b=0;b<a.children.length;b++)this.removeObject(a.children[b])};THREE.CanvasRenderer=function(a){function b(a){if(C!=a)k.globalAlpha=C=a}function c(a){if(Q!=a){switch(a){case THREE.NormalBlending:k.globalCompositeOperation="source-over";break;case THREE.AdditiveBlending:k.globalCompositeOperation="lighter";break;case THREE.SubtractiveBlending:k.globalCompositeOperation="darker"}Q=a}}function d(a){if(O!=a)k.strokeStyle=O=a}function f(a){if(w!=a)k.fillStyle=w=a}var e=this,g,h,m,l=new THREE.Projector,a=a||{},j=a.canvas!==void 0?a.canvas:document.createElement("canvas"),i,n,o,p,k=j.getContext("2d"),s=new THREE.Color(0),K=0,C=1,Q=0,O=null,w=null,F=null,z=null,D=null,u,r,E,N,W=new THREE.RenderableVertex,da=new THREE.RenderableVertex,G,H,I,Y,L,B,S,v,R,P,V,J,t=new THREE.Color,A=new THREE.Color,x=new THREE.Color,y=new THREE.Color,M=new THREE.Color,la=[],fa=[],ga,ha,ea,aa,Ba,Ca,Da,Ea,Fa,Ga,ma=new THREE.Rectangle,Z=new THREE.Rectangle,X=new THREE.Rectangle,ya=!1,$=new THREE.Color,ta=new THREE.Color,ua=new THREE.Color,T=new THREE.Vector3,qa,ra,za,ba,sa,va,a=16;qa=document.createElement("canvas");qa.width=qa.height=2;ra=qa.getContext("2d");ra.fillStyle="rgba(0,0,0,1)";ra.fillRect(0,0,2,2);za=ra.getImageData(0,0,2,2);ba=za.data;sa=document.createElement("canvas");sa.width=sa.height=a;va=sa.getContext("2d");va.translate(-a/2,-a/2);va.scale(a,a);a--;this.domElement=j;this.sortElements=this.sortObjects=this.autoClear=!0;this.info={render:{vertices:0,faces:0}};this.setSize=function(a,b){i=a;n=b;o=Math.floor(i/2);p=Math.floor(n/2);j.width=i;j.height=n;ma.set(-o,-p,o,p);Z.set(-o,-p,o,p);C=1;Q=0;D=z=F=w=O=null};this.setClearColor=function(a,b){s.copy(a);K=b;Z.set(-o,-p,o,p)};this.setClearColorHex=function(a,b){s.setHex(a);K=b;Z.set(-o,-p,o,p)};this.clear=function(){k.setTransform(1,0,0,-1,o,p);Z.isEmpty()||(Z.minSelf(ma),Z.inflate(2),K<1&&k.clearRect(Math.floor(Z.getX()),Math.floor(Z.getY()),Math.floor(Z.getWidth()),Math.floor(Z.getHeight())),K>0&&(c(THREE.NormalBlending),b(1),f("rgba("+Math.floor(s.r*255)+","+Math.floor(s.g*255)+","+Math.floor(s.b*255)+","+K+")"),k.fillRect(Math.floor(Z.getX()),Math.floor(Z.getY()),Math.floor(Z.getWidth()),Math.floor(Z.getHeight()))),Z.empty())};this.render=function(a,j){function i(a){var b,c,d,e;$.setRGB(0,0,0);ta.setRGB(0,0,0);ua.setRGB(0,0,0);b=0;for(c=a.length;b<c;b++)d=a[b],e=d.color,d instanceof THREE.AmbientLight?($.r+=e.r,$.g+=e.g,$.b+=e.b):d instanceof THREE.DirectionalLight?(ta.r+=e.r,ta.g+=e.g,ta.b+=e.b):d instanceof THREE.PointLight&&(ua.r+=e.r,ua.g+=e.g,ua.b+=e.b)}function n(a,b,c,d){var e,f,g,h,k,j;e=0;for(f=a.length;e<f;e++)g=a[e],h=g.color,g instanceof THREE.DirectionalLight?(k=g.matrixWorld.getPosition(),j=c.dot(k),j<=0||(j*=g.intensity,d.r+=h.r*j,d.g+=h.g*j,d.b+=h.b*j)):g instanceof THREE.PointLight&&(k=g.matrixWorld.getPosition(),j=c.dot(T.sub(k,b).normalize()),j<=0||(j*=g.distance==0?1:1-Math.min(b.distanceTo(k)/g.distance,1),j!=0&&(j*=g.intensity,d.r+=h.r*j,d.g+=h.g*j,d.b+=h.b*j)))}function s(a,e,g){b(g.opacity);c(g.blending);var h,j,i,m,q,n;if(g instanceof THREE.ParticleBasicMaterial){if(g.map)m=g.map.image,q=m.width>>1,n=m.height>>1,g=e.scale.x*o,i=e.scale.y*p,h=g*q,j=i*n,X.set(a.x-h,a.y-j,a.x+h,a.y+j),ma.intersects(X)&&(k.save(),k.translate(a.x,a.y),k.rotate(-e.rotation),k.scale(g,-i),k.translate(-q,-n),k.drawImage(m,0,0),k.restore())}else g instanceof THREE.ParticleCanvasMaterial&&(h=e.scale.x*o,j=e.scale.y*p,X.set(a.x-h,a.y-j,a.x+h,a.y+j),ma.intersects(X)&&(d(g.color.getContextStyle()),f(g.color.getContextStyle()),k.save(),k.translate(a.x,a.y),k.rotate(-e.rotation),k.scale(h,j),g.program(k),k.restore()))}function w(a,e,f,g){b(g.opacity);c(g.blending);k.beginPath();k.moveTo(a.positionScreen.x,a.positionScreen.y);k.lineTo(e.positionScreen.x,e.positionScreen.y);k.closePath();if(g instanceof THREE.LineBasicMaterial){a=g.linewidth;if(F!=a)k.lineWidth=F=a;a=g.linecap;if(z!=a)k.lineCap=z=a;a=g.linejoin;if(D!=a)k.lineJoin=D=a;d(g.color.getContextStyle());k.stroke();X.inflate(g.linewidth*2)}}function C(a,d,f,g,h,k,i,q){e.info.render.vertices+=3;e.info.render.faces++;b(q.opacity);c(q.blending);G=a.positionScreen.x;H=a.positionScreen.y;I=d.positionScreen.x;Y=d.positionScreen.y;L=f.positionScreen.x;B=f.positionScreen.y;K(G,H,I,Y,L,B);if(q instanceof THREE.MeshBasicMaterial)if(q.map)q.map.mapping instanceof THREE.UVMapping&&(aa=i.uvs[0],Aa(G,H,I,Y,L,B,aa[g].u,aa[g].v,aa[h].u,aa[h].v,aa[k].u,aa[k].v,q.map));else if(q.envMap){if(q.envMap.mapping instanceof THREE.SphericalReflectionMapping)a=j.matrixWorldInverse,T.copy(i.vertexNormalsWorld[g]),Ba=(T.x*a.n11+T.y*a.n12+T.z*a.n13)*0.5+0.5,Ca=-(T.x*a.n21+T.y*a.n22+T.z*a.n23)*0.5+0.5,T.copy(i.vertexNormalsWorld[h]),Da=(T.x*a.n11+T.y*a.n12+T.z*a.n13)*0.5+0.5,Ea=-(T.x*a.n21+T.y*a.n22+T.z*a.n23)*0.5+0.5,T.copy(i.vertexNormalsWorld[k]),Fa=(T.x*a.n11+T.y*a.n12+T.z*a.n13)*0.5+0.5,Ga=-(T.x*a.n21+T.y*a.n22+T.z*a.n23)*0.5+0.5,Aa(G,H,I,Y,L,B,Ba,Ca,Da,Ea,Fa,Ga,q.envMap)}else q.wireframe?ja(q.color,q.wireframeLinewidth,q.wireframeLinecap,q.wireframeLinejoin):ia(q.color);else if(q instanceof THREE.MeshLambertMaterial)q.map&&!q.wireframe&&(q.map.mapping instanceof THREE.UVMapping&&(aa=i.uvs[0],Aa(G,H,I,Y,L,B,aa[g].u,aa[g].v,aa[h].u,aa[h].v,aa[k].u,aa[k].v,q.map)),c(THREE.SubtractiveBlending)),ya?!q.wireframe&&q.shading==THREE.SmoothShading&&i.vertexNormalsWorld.length==3?(A.r=x.r=y.r=$.r,A.g=x.g=y.g=$.g,A.b=x.b=y.b=$.b,n(m,i.v1.positionWorld,i.vertexNormalsWorld[0],A),n(m,i.v2.positionWorld,i.vertexNormalsWorld[1],x),n(m,i.v3.positionWorld,i.vertexNormalsWorld[2],y),A.r=Math.max(0,Math.min(q.color.r*A.r,1)),A.g=Math.max(0,Math.min(q.color.g*A.g,1)),A.b=Math.max(0,Math.min(q.color.b*A.b,1)),x.r=Math.max(0,Math.min(q.color.r*x.r,1)),x.g=Math.max(0,Math.min(q.color.g*x.g,1)),x.b=Math.max(0,Math.min(q.color.b*x.b,1)),y.r=Math.max(0,Math.min(q.color.r*y.r,1)),y.g=Math.max(0,Math.min(q.color.g*y.g,1)),y.b=Math.max(0,Math.min(q.color.b*y.b,1)),M.r=(x.r+y.r)*0.5,M.g=(x.g+y.g)*0.5,M.b=(x.b+y.b)*0.5,ea=wa(A,x,y,M),oa(G,H,I,Y,L,B,0,0,1,0,0,1,ea)):(t.r=$.r,t.g=$.g,t.b=$.b,n(m,i.centroidWorld,i.normalWorld,t),t.r=Math.max(0,Math.min(q.color.r*t.r,1)),t.g=Math.max(0,Math.min(q.color.g*t.g,1)),t.b=Math.max(0,Math.min(q.color.b*t.b,1)),q.wireframe?ja(t,q.wireframeLinewidth,q.wireframeLinecap,q.wireframeLinejoin):ia(t)):q.wireframe?ja(q.color,q.wireframeLinewidth,q.wireframeLinecap,q.wireframeLinejoin):ia(q.color);else if(q instanceof THREE.MeshDepthMaterial)ga=j.near,ha=j.far,A.r=A.g=A.b=1-na(a.positionScreen.z,ga,ha),x.r=x.g=x.b=1-na(d.positionScreen.z,ga,ha),y.r=y.g=y.b=1-na(f.positionScreen.z,ga,ha),M.r=(x.r+y.r)*0.5,M.g=(x.g+y.g)*0.5,M.b=(x.b+y.b)*0.5,ea=wa(A,x,y,M),oa(G,H,I,Y,L,B,0,0,1,0,0,1,ea);else if(q instanceof THREE.MeshNormalMaterial)t.r=pa(i.normalWorld.x),t.g=pa(i.normalWorld.y),t.b=pa(i.normalWorld.z),q.wireframe?ja(t,q.wireframeLinewidth,q.wireframeLinecap,q.wireframeLinejoin):ia(t)}function Q(a,d,f,g,h,k,i,q,o){e.info.render.vertices+=4;e.info.render.faces++;b(q.opacity);c(q.blending);if(q.map||q.envMap)C(a,d,g,0,1,3,i,q,o),C(h,f,k,1,2,3,i,q,o);else if(G=a.positionScreen.x,H=a.positionScreen.y,I=d.positionScreen.x,Y=d.positionScreen.y,L=f.positionScreen.x,B=f.positionScreen.y,S=g.positionScreen.x,v=g.positionScreen.y,R=h.positionScreen.x,P=h.positionScreen.y,V=k.positionScreen.x,J=k.positionScreen.y,q instanceof THREE.MeshBasicMaterial)O(G,H,I,Y,L,B,S,v),q.wireframe?ja(q.color,q.wireframeLinewidth,q.wireframeLinecap,q.wireframeLinejoin):ia(q.color);else if(q instanceof THREE.MeshLambertMaterial)ya?!q.wireframe&&q.shading==THREE.SmoothShading&&i.vertexNormalsWorld.length==4?(A.r=x.r=y.r=M.r=$.r,A.g=x.g=y.g=M.g=$.g,A.b=x.b=y.b=M.b=$.b,n(m,i.v1.positionWorld,i.vertexNormalsWorld[0],A),n(m,i.v2.positionWorld,i.vertexNormalsWorld[1],x),n(m,i.v4.positionWorld,i.vertexNormalsWorld[3],y),n(m,i.v3.positionWorld,i.vertexNormalsWorld[2],M),A.r=Math.max(0,Math.min(q.color.r*A.r,1)),A.g=Math.max(0,Math.min(q.color.g*A.g,1)),A.b=Math.max(0,Math.min(q.color.b*A.b,1)),x.r=Math.max(0,Math.min(q.color.r*x.r,1)),x.g=Math.max(0,Math.min(q.color.g*x.g,1)),x.b=Math.max(0,Math.min(q.color.b*x.b,1)),y.r=Math.max(0,Math.min(q.color.r*y.r,1)),y.g=Math.max(0,Math.min(q.color.g*y.g,1)),y.b=Math.max(0,Math.min(q.color.b*y.b,1)),M.r=Math.max(0,Math.min(q.color.r*M.r,1)),M.g=Math.max(0,Math.min(q.color.g*M.g,1)),M.b=Math.max(0,Math.min(q.color.b*M.b,1)),ea=wa(A,x,y,M),K(G,H,I,Y,S,v),oa(G,H,I,Y,S,v,0,0,1,0,0,1,ea),K(R,P,L,B,V,J),oa(R,P,L,B,V,J,1,0,1,1,0,1,ea)):(t.r=$.r,t.g=$.g,t.b=$.b,n(m,i.centroidWorld,i.normalWorld,t),t.r=Math.max(0,Math.min(q.color.r*t.r,1)),t.g=Math.max(0,Math.min(q.color.g*t.g,1)),t.b=Math.max(0,Math.min(q.color.b*t.b,1)),O(G,H,I,Y,L,B,S,v),q.wireframe?ja(t,q.wireframeLinewidth,q.wireframeLinecap,q.wireframeLinejoin):ia(t)):(O(G,H,I,Y,L,B,S,v),q.wireframe?ja(q.color,q.wireframeLinewidth,q.wireframeLinecap,q.wireframeLinejoin):ia(q.color));else if(q instanceof THREE.MeshNormalMaterial)t.r=pa(i.normalWorld.x),t.g=pa(i.normalWorld.y),t.b=pa(i.normalWorld.z),O(G,H,I,Y,L,B,S,v),q.wireframe?ja(t,q.wireframeLinewidth,q.wireframeLinecap,q.wireframeLinejoin):ia(t);else if(q instanceof THREE.MeshDepthMaterial)ga=j.near,ha=j.far,A.r=A.g=A.b=1-na(a.positionScreen.z,ga,ha),x.r=x.g=x.b=1-na(d.positionScreen.z,ga,ha),y.r=y.g=y.b=1-na(g.positionScreen.z,ga,ha),M.r=M.g=M.b=1-na(f.positionScreen.z,ga,ha),ea=wa(A,x,y,M),K(G,H,I,Y,S,v),oa(G,H,I,Y,S,v,0,0,1,0,0,1,ea),K(R,P,L,B,V,J),oa(R,P,L,B,V,J,1,0,1,1,0,1,ea)}function K(a,b,c,d,e,f){k.beginPath();k.moveTo(a,b);k.lineTo(c,d);k.lineTo(e,f);k.lineTo(a,b);k.closePath()}function O(a,b,c,d,e,f,g,h){k.beginPath();k.moveTo(a,b);k.lineTo(c,d);k.lineTo(e,f);k.lineTo(g,h);k.lineTo(a,b);k.closePath()}function ja(a,b,c,e){if(F!=b)k.lineWidth=F=b;if(z!=c)k.lineCap=z=c;if(D!=e)k.lineJoin=D=e;d(a.getContextStyle());k.stroke();X.inflate(b*2)}function ia(a){f(a.getContextStyle());k.fill()}function Aa(a,b,c,d,e,g,h,i,j,m,o,n,l){if(l.image.width!=0){if(l.needsUpdate==!0||la[l.id]==void 0){var p=l.wrapS==THREE.RepeatWrapping,r=l.wrapT==THREE.RepeatWrapping;la[l.id]=k.createPattern(l.image,p&&r?"repeat":p&&!r?"repeat-x":!p&&r?"repeat-y":"no-repeat");l.needsUpdate=!1}f(la[l.id]);var p=l.offset.x/l.repeat.x,r=l.offset.y/l.repeat.y,s=l.image.width*l.repeat.x,u=l.image.height*l.repeat.y,h=(h+p)*s,i=(i+r)*u,j=(j+p)*s,m=(m+r)*u,o=(o+p)*s,n=(n+r)*u;c-=a;d-=b;e-=a;g-=b;j-=h;m-=i;o-=h;n-=i;p=j*n-o*m;if(p==0){if(fa[l.id]==void 0)b=document.createElement("canvas"),b.width=l.image.width,b.height=l.image.height,a=b.getContext("2d"),a.drawImage(l.image,0,0),fa[l.id]=a.getImageData(0,0,l.image.width,l.image.height).data,delete b;b=fa[l.id];h=(Math.floor(h)+Math.floor(i)*l.image.width)*4;t.setRGB(b[h]/255,b[h+1]/255,b[h+2]/255);ia(t)}else p=1/p,l=(n*c-m*e)*p,m=(n*d-m*g)*p,c=(j*e-o*c)*p,d=(j*g-o*d)*p,a=a-l*h-c*i,h=b-m*h-
d*i,k.save(),k.transform(l,m,c,d,a,h),k.fill(),k.restore()}}function oa(a,b,c,d,e,f,g,h,i,j,l,m,o){var n,p;n=o.width-1;p=o.height-1;g*=n;h*=p;i*=n;j*=p;l*=n;m*=p;c-=a;d-=b;e-=a;f-=b;i-=g;j-=h;l-=g;m-=h;p=1/(i*m-l*j);n=(m*c-j*e)*p;j=(m*d-j*f)*p;c=(i*e-l*c)*p;d=(i*f-l*d)*p;a=a-n*g-c*h;b=b-j*g-d*h;k.save();k.transform(n,j,c,d,a,b);k.clip();k.drawImage(o,0,0);k.restore()}function wa(a,b,c,d){var e=~~(a.r*255),f=~~(a.g*255),a=~~(a.b*255),g=~~(b.r*255),h=~~(b.g*255),b=~~(b.b*255),i=~~(c.r*255),j=~~(c.g*255),c=~~(c.b*255),k=~~(d.r*255),l=~~(d.g*255),d=~~(d.b*255);ba[0]=e<0?0:e>255?255:e;ba[1]=f<0?0:f>255?255:f;ba[2]=a<0?0:a>255?255:a;ba[4]=g<0?0:g>255?255:g;ba[5]=h<0?0:h>255?255:h;ba[6]=b<0?0:b>255?255:b;ba[8]=i<0?0:i>255?255:i;ba[9]=j<0?0:j>255?255:j;ba[10]=c<0?0:c>255?255:c;ba[12]=k<0?0:k>255?255:k;ba[13]=l<0?0:l>255?255:l;ba[14]=d<0?0:d>255?255:d;ra.putImageData(za,0,0);va.drawImage(qa,0,0);return sa}function na(a,b,c){a=(a-b)/(c-b);return a*a*(3-2*a)}function pa(a){a=(a+1)*0.5;return a<0?0:a>1?1:a}function ka(a,b){var c=b.x-a.x,d=b.y-a.y,e=c*c+d*d;e!=0&&(e=1/Math.sqrt(e),c*=e,d*=e,b.x+=c,b.y+=d,a.x-=c,a.y-=d)}var xa,Ha,U,ca;this.autoClear?this.clear():k.setTransform(1,0,0,-1,o,p);e.info.render.vertices=0;e.info.render.faces=0;g=l.projectScene(a,j,this.sortElements);h=g.elements;m=g.lights;(ya=m.length>0)&&i(m);xa=0;for(Ha=h.length;xa<Ha;xa++)if(U=h[xa],ca=U.material,ca=ca instanceof THREE.MeshFaceMaterial?U.faceMaterial:ca,!(ca==null||ca.opacity==0)){X.empty();if(U instanceof THREE.RenderableParticle)u=U,u.x*=o,u.y*=p,s(u,U,ca,a);else if(U instanceof THREE.RenderableLine)u=U.v1,r=U.v2,u.positionScreen.x*=o,u.positionScreen.y*=p,r.positionScreen.x*=o,r.positionScreen.y*=p,X.addPoint(u.positionScreen.x,u.positionScreen.y),X.addPoint(r.positionScreen.x,r.positionScreen.y),ma.intersects(X)&&w(u,r,U,ca,a);else if(U instanceof THREE.RenderableFace3)u=U.v1,r=U.v2,E=U.v3,u.positionScreen.x*=o,u.positionScreen.y*=p,r.positionScreen.x*=o,r.positionScreen.y*=p,E.positionScreen.x*=o,E.positionScreen.y*=p,ca.overdraw&&(ka(u.positionScreen,r.positionScreen),ka(r.positionScreen,E.positionScreen),ka(E.positionScreen,u.positionScreen)),X.add3Points(u.positionScreen.x,u.positionScreen.y,r.positionScreen.x,r.positionScreen.y,E.positionScreen.x,E.positionScreen.y),ma.intersects(X)&&C(u,r,E,0,1,2,U,ca,a);else if(U instanceof THREE.RenderableFace4)u=U.v1,r=U.v2,E=U.v3,N=U.v4,u.positionScreen.x*=o,u.positionScreen.y*=p,r.positionScreen.x*=o,r.positionScreen.y*=p,E.positionScreen.x*=o,E.positionScreen.y*=p,N.positionScreen.x*=o,N.positionScreen.y*=p,W.positionScreen.copy(r.positionScreen),da.positionScreen.copy(N.positionScreen),ca.overdraw&&(ka(u.positionScreen,r.positionScreen),ka(r.positionScreen,N.positionScreen),ka(N.positionScreen,u.positionScreen),ka(E.positionScreen,W.positionScreen),ka(E.positionScreen,da.positionScreen)),X.addPoint(u.positionScreen.x,u.positionScreen.y),X.addPoint(r.positionScreen.x,r.positionScreen.y),X.addPoint(E.positionScreen.x,E.positionScreen.y),X.addPoint(N.positionScreen.x,N.positionScreen.y),ma.intersects(X)&&Q(u,r,E,N,W,da,U,ca,a);Z.addRectangle(X)}k.setTransform(1,0,0,1,0,0)}};THREE.RenderableVertex=function(){this.positionWorld=new THREE.Vector3;this.positionScreen=new THREE.Vector4;this.visible=!0};THREE.RenderableVertex.prototype.copy=function(a){this.positionWorld.copy(a.positionWorld);this.positionScreen.copy(a.positionScreen)};THREE.RenderableFace3=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterial=this.material=null;this.uvs=[[]];this.z=null};THREE.RenderableFace4=function(){this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.v3=new THREE.RenderableVertex;this.v4=new THREE.RenderableVertex;this.centroidWorld=new THREE.Vector3;this.centroidScreen=new THREE.Vector3;this.normalWorld=new THREE.Vector3;this.vertexNormalsWorld=[new THREE.Vector3,new THREE.Vector3,new THREE.Vector3,new THREE.Vector3];this.faceMaterial=this.material=null;this.uvs=[[]];this.z=null};THREE.RenderableObject=function(){this.z=this.object=null};THREE.RenderableParticle=function(){this.rotation=this.z=this.y=this.x=null;this.scale=new THREE.Vector2;this.material=null};THREE.RenderableLine=function(){this.z=null;this.v1=new THREE.RenderableVertex;this.v2=new THREE.RenderableVertex;this.material=null};
module.exports = THREE;
})
define( 'playSnow', [], function( require, exports, module){
    require('../lib/js/config/config'); 
    var THREE = require('./ThreeCanvas'); 

    var SCREEN_WIDTH = 200;
    var SCREEN_HEIGHT = 200;

    var container;

    var particle;

    var camera;
    var scene;
    var renderer;

    var mouseX = 0;
    var mouseY = 0;

    var windowHalfX = 200;
    var windowHalfY = 200;

    var particles = [];
    var particleImage = new Image(); //THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
    particleImage.src = OP_CDN_PREFIX + 'images/ParticleSmoke.png';



    function Snowinit() {

        container = document.createElement('div');
        document.getElementById('snow').appendChild(container);

        camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        camera.position.z = 1000;

        scene = new THREE.Scene();
        scene.add(camera);

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        var material = new THREE.ParticleBasicMaterial({
            map: new THREE.Texture(particleImage)
        });

        for (var i = 0; i < 200; i++) {

            particle = new Particle3D(material);
            particle.position.x = Math.random() * 2000 - 1000;
            particle.position.y = Math.random() * 2000 - 1000;
            particle.position.z = Math.random() * 2000 - 1000;
            particle.scale.x = particle.scale.y = 1;
            scene.add(particle);

            particles.push(particle);
        }

        container.appendChild(renderer.domElement);




        setInterval(loop, 1000 / 60);

    }

    function onDocumentMouseMove(event) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart(event) {

        if (event.touches.length == 1) {

            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    function onDocumentTouchMove(event) {

        if (event.touches.length == 1) {

            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    //

    function loop() {

        for (var i = 0; i < particles.length; i++) {

            var particle = particles[i];
            particle.updatePhysics();

            with(particle.position) {
                if (y < -1000) y += 2000;
                if (x > 1000) x -= 2000;
                else if (x < -1000) x += 2000;
                if (z > 1000) z -= 2000;
                else if (z < -1000) z += 2000;
            }
        }

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);


    }

    module.exports = Snowinit;
})


