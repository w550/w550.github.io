/**
 *
 * @authors 吴儒林 (49106868#qq.com)
 * @date    2015-09-13 17:05:20
 * @version $Id$
 */

$(document).ready(function () {
    // 禁用手机默认的触屏滚动行为
  document.addEventListener('touchmove', function (event) {
    event.preventDefault()
  }, false)

    // 小球随机位置
    /*  setTimeout(function() {
          $('#controlcenter .center>ul>li').each(function(index) {
              if (index < 5) {
                  var l = Math.random() * 60;
              } else {
                  var l = 160 + Math.random() * 70;
              }
              var t = Math.random() * 100;

              $(this).css({
                  top: t,
                  left: l
              })
              console.log(index)
          })
      }, 2000) */

  var options = {

        // Boolean - Whether to show lines for each scale point
    scaleShowLine: false,

        // String - 中心的五根直达中心的线
    angleLineColor: 'rgba(0,0,0,.1)',

        // Number - 中心的五根直达中心的线 的宽度
    angleLineWidth: 1,

        // Number - Point label font size in pixels
    pointLabelFontSize: 14,

        // String - Point label font colour
    pointLabelFontColor: '#ffcc2d',

        // Boolean - Whether to animate the chart
    animation: true,

        // Number - Number of animation steps
    animationSteps: 60
  }

  var charts = $('.userface').data('chart')
  var data = {
    labels: ['音准', '稳定性', '表现力', '节奏', '技法'],

    datasets: [{
      fillColor: 'rgba(0,0,0,0.2)',
      strokeColor: 'rgba(0,0,0,.0)',
      pointColor: 'rgba(0,0,0,.0)',
      pointStroke: false,
      data: [100, 100, 100, 100, 100]
    }, {
      fillColor: 'rgba(0,0,0,0.1)',
      strokeColor: 'rgba(0,0,0,.0)',
      pointColor: 'rgba(0,0,0,.0)',
      pointStroke: false,
      data: [90, 90, 90, 90, 90]
    }, {
      fillColor: '#FCD330',
      strokeColor: 'rgba(0,0,0,.0)',
      pointColor: 'rgba(0,0,0,.0)',
      pointStroke: false,
      data: [60, 50, 75, 45, 70]
    }, {
      fillColor: '#FCC828',
      strokeColor: 'rgba(0,0,0,.0)',
      pointColor: 'rgba(0,0,0,.0)',
      pointStroke: false,
      data: [50, 40, 65, 35, 60]
    }, {
      fillColor: '#FCBB1F',
      strokeColor: 'rgba(0,0,0,.0)',
      pointColor: 'rgba(0,0,0,.0)',
      pointStroke: false,
      data: [40, 30, 55, 25, 50]
    }, {
      fillColor: '#FDB017',
      strokeColor: 'rgba(0,0,0,.0)',
      pointColor: 'rgba(0,0,0,.0)',
      pointStroke: false,
      data: [30, 20, 45, 15, 40]
    }, {
      fillColor: 'rgba(253, 148, 38, 1)',
      strokeColor: 'rgba(0,0,0,.0)',
      pointColor: 'rgba(0,0,0,.0)',
      pointStroke: false,
      data: charts
    }]
  }

  var status = false

    // 显示图标工具
  function showchart () {
    $('#controlcenter .center>ul>li').attr('active', 'true')
    $('#controlcenter .center>ul>li').one('transitionend', function () {
     
    })
    setTimeout(()=>{
       $('.chart').removeClass('suoxiao').addClass('bianda')
      $('.jiantou').attr('active', 'true')
      $('.cup i').removeAttr('active')
      var ctx = document.querySelector('#chart').getContext('2d')

      new Chart(ctx).Radar(data, options)
      status = true
    }, 300)
  }

    // 显示原来的排名
  function showrank () {
    status = false

    $('#controlcenter .center > div:first-of-type >div >.red1 >.red2>.red3,#controlcenter .center > div:first-of-type >div >.red1 >.red2,#controlcenter .center > div:first-of-type >div >.red1').removeClass('suoxiao').addClass('bianda')
    $('#controlcenter .center > div:first-of-type').removeClass('suoxiao').addClass('bianda')
    $('#controlcenter .center>ul>li').removeAttr('active')
    $('.jiantou').removeAttr('active')
    $('.cup i').attr('active', 'true')
  }

    // 上滑动
  $('#controlcenter .center').swipeUp(function () {
    if (status) {
      return
    }
     showchart()
    $('#controlcenter .center > div:first-of-type >div >.red1 >.red2>.red3,#controlcenter .center > div:first-of-type >div >.red1 >.red2,#controlcenter .center > div:first-of-type >div >.red1').removeClass('bianda').addClass('suoxiao')
    $('#controlcenter .center > div:first-of-type').removeClass('bianda').addClass('suoxiao')

  /*  $('#controlcenter .center > div:first-of-type>div >.red1>.red2>.red3').one('webkitAnimationEnd AnimationEnd', function (event) {
      
    })*/
  })
  $('#controlcenter .center').swipeDown(function () {
    if (!status) {
      return
    }
    $('.chart').removeClass('bianda').addClass('suoxiao')
    showrank()
   /* $('#controlcenter .chart').one('webkitAnimationEnd AnimationEnd', function (event) {
      
    })*/
  })
})
