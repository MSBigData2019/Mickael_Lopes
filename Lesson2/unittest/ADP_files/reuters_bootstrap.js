(function() {
	var gdprAppliesGlobally = false;
	// based on the IAB spec this frame is required so advertisers running in child frames can // look for IAB support. The frame itself doesn't do anything, it just acts as a marker.
	function addFrame() {
		if (!window.frames['__cmpLocator']) {
			if (document.body) {
				var body = document.body,
					iframe = document.createElement('iframe');
				iframe.style.cssText = 'display:none';
				iframe.name = '__cmpLocator';
				body.appendChild(iframe);
			} else {
				// In the case where this stub is located in the head,
				// this allows us to inject the iframe more quickly than
				// relying on DOMContentLoaded or other events.
				setTimeout(addFrame, 5);
			}
		}
	}
	// init the add frame call
	addFrame();
	
	// this creates the stub implementation of the __cmp object. With this
	// implementation the calls from advertisers are stored in an array which
	// is processed by the evidon-cmp script when it loads.
	function stubCMP() {
		var args = arguments;
		// console.log('stubCMP', args);
		__cmp.a = __cmp.a || [];

		if (!args.length) return __cmp.a;
		else if (args[0] === 'ping') {
			args[2]({
				"gdprAppliesGlobally": gdprAppliesGlobally,
				"cmpLoaded": false
			}, true);
		} else {
			__cmp.a.push([].slice.apply(args));
		}
	}
	// this creates the message handler that handles calls from child frames where
	// they are not able to access the __cmp api directly.
	function cmpMsgHandler(event) {
		var msgIsString = typeof event.data === "string";
		var json = msgIsString ? JSON.parse(event.data) : event.data;
		if (!json.__cmpCall) return;
		var call = json.__cmpCall;
		window.__cmp(call.command, call.parameter, function(retValue, success) {
			var returnMsg = {
				"__cmpReturn": {
					"returnValue": retValue,
					"success": success,
					"callId": call.callId
				}
			};
			event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
		});
	}
	// this looks to see if the __cmp is present or not on the page. If not
	// we add the stub.
	if (typeof(__cmp) !== 'function') {
		window.__cmp = stubCMP;
		__cmp.msgHandler = cmpMsgHandler;
		if (window.addEventListener) window.addEventListener('message', cmpMsgHandler, false);
		else
			window.attachEvent('onmessage', cmpMsgHandler);
	}
})();!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){B=t}function r(t){G=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof z?function(){z(a)}:c()}function s(){var t=0,e=new J(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<W;t+=2){var e=V[t],n=V[t+1];e(n),V[t]=void 0,V[t+1]=void 0}W=0}function f(){try{var t=Function("return this")().require("vertx");return z=t.runOnLoop||t.runOnContext,i()}catch(e){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[Z]&&O(r);var o=n._state;if(o){var i=arguments[o-1];G(function(){return P(o,r,i,n._result)})}else E(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return nt.error=e,nt}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){G(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===tt?S(t,e._result):e._state===et?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===nt?(j(t,nt.error),nt.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===$&&(t._result=e,t._state=tt,0!==t._subscribers.length&&G(T,t))}function j(t,e){t._state===$&&(t._state=et,t._result=e,G(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+tt]=n,o[i+et]=r,0===i&&t._state&&G(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?P(n,r,o,i):o(i);t._subscribers.length=0}}function M(t,e){try{return t(e)}catch(n){return nt.error=n,nt}}function P(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=M(r,o),s===nt?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==$||(i&&c?g(n,s):a?j(n,u):t===tt?S(n,s):t===et&&j(n,s))}function x(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function C(){return rt++}function O(t){t[Z]=rt++,t._state=void 0,t._result=void 0,t._subscribers=[]}function k(){return new Error("Array Methods must be provided an Array")}function F(t){return new ot(this,t).promise}function Y(t){var e=this;return new e(U(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function q(t){var e=this,n=new e(p);return j(n,t),n}function D(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function K(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function L(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=it}var N=void 0;N=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var U=N,W=0,z=void 0,B=void 0,G=function(t,e){V[W]=t,V[W+1]=e,W+=2,2===W&&(B?B(a):X())},H="undefined"!=typeof window?window:void 0,I=H||{},J=I.MutationObserver||I.WebKitMutationObserver,Q="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),R="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,V=new Array(1e3),X=void 0;X=Q?o():J?s():R?u():void 0===H&&"function"==typeof require?f():c();var Z=Math.random().toString(36).substring(2),$=void 0,tt=1,et=2,nt={error:null},rt=0,ot=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[Z]||O(this.promise),U(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&S(this.promise,this._result))):j(this.promise,k())}return t.prototype._enumerate=function(t){for(var e=0;this._state===$&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==$)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===it){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===$&&(this._remaining--,t===et?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(tt,e,t)},function(t){return n._settledAt(et,e,t)})},t}(),it=function(){function t(e){this[Z]=C(),this._result=this._state=void 0,this._subscribers=[],p!==e&&("function"!=typeof e&&D(),this instanceof t?x(this,e):K())}return t.prototype["catch"]=function(t){return this.then(null,t)},t.prototype["finally"]=function(t){var e=this,n=e.constructor;return e.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){throw e})})},t}();return it.prototype.then=l,it.all=F,it.race=Y,it.resolve=h,it.reject=q,it._setScheduler=n,it._setAsap=r,it._asap=G,it.polyfill=L,it.Promise=it,it.polyfill(),it});// Media.Net wrapper
function setupMediaDotNet(gdpr_should_apply, consent, consent_data) {
  window.advBidxc = window.advBidxc || {};
  window.advBidxc.startTime = new Date().getTime();
  window.advBidxc.version = 4.1;
  window.advBidxc.section = TR3.extractDartZone(); //extract zone
  window.advBidxc.customerId = "8CUF1VN4G"; //Media.net Customer ID
  window.advBidxc.domain = window.location.hostname;
  window.advBidxc.exec = window.advBidxc.exec || [];
  window.advBidxc.exec.push(function() {
      window.advBidxc.setGDPRApplicable(gdpr_should_apply);
      if (gdpr_should_apply) {
        if (consent) {
          if (consent_data) {
            window.advBidxc.setGDPRConsent(consent_data);
            console.log('Setup media.net with GDPR applied, acquired consent data:', consent_data);
          } else {
            window.advBidxc.consentExists(true);
            console.log('Setup media.net with GDPR applied, acquired global consent');
          }
        } else {
          window.advBidxc.consentExists(false);
          console.log('Setup media.net with GDPR applied, acquired no consent');
        }
      } else {
        console.log('Setup media.net without GDPR');
      }
  });

  function loadScript(tagSrc) {
    if (tagSrc.substr(0, 4) !== 'http') {
      var isSSL = 'https:' == document.location.protocol;
      tagSrc = (isSSL ? 'https:' : '') + tagSrc;
    }
    var scriptTag = document.createElement('script'),
      placeTag = document.getElementsByTagName("script")[0];
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = tagSrc;
    placeTag.parentNode.insertBefore(scriptTag, placeTag);
  }

  var isSSL = 'https:' == document.location.protocol;
  var mnSrc = (isSSL ? 'https:' : 'http:') + '//contextual.media.net/bidexchange.js?cid=' + window.advBidxc.customerId + '&dn=' + window.advBidxc.domain + '&version=' + window.advBidxc.version + (isSSL ? '&https=1' : '');
  loadScript(mnSrc);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function to gather ad variables and define ad slot
displayAd = function(pDivId, pSite, pSize, pTarget) {
  promisifySetupAd(function() {
    if (TR3.data.GlobalAdsAllowed) {
      pDivId = pDivId.trim();
      var dzn = pSite.split(";");

      //--> Admantx Begin
      pTarget += ";admant=" + TR3.data.admantx;
      //--> Admantx End


      //--> Add template variable to ad call Begin
      if (dzn[0] == 'us.reuters/home') {
        pTarget += ";template=home";
      } else if (dzn[0].indexOf("article") > -1) {
        if (dzn[0].indexOf("article_archive") == -1) {
          pTarget += ";template=article";
        }
      }
      //--> Add template variable to ad call Begin

      //--> Adslot declaration Begin
      if (!!pDivId) {
        //define slot
        if (pDivId == 'div_gpt_intro') {
          gptadslots[pDivId] = googletag.defineOutOfPageSlot("/4735792/" + pSite, pDivId).addService(googletag.pubads());
        } else {
          gptadslots[pDivId] = googletag.defineSlot("/4735792/" + pSite, pSize, pDivId).addService(googletag.pubads());
        }

        //add the targetting
        if (!!pTarget) {
          var t = pTarget.split(";");
          for (var k = 0; k < t.length; k++)
            if (t[k].indexOf("=") > 0) {
              gptadslots[pDivId].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            } else {
              console.error("Targeting string index of = " + pTarget + " in Error for " + pDivId);
            }
        } else {
          console.error("Targeting string not target " + pTarget + " in Error." + pDivId);
        }

        // display the ad
        googletag.display(pDivId);
        console.log("Display Ad via GPT: Site:" + pSite + " Target:" + pTarget + " Div Slot:" + pDivId);
      }
      //--> Adslot declaration End

      //--> Native Ad Setup Begin
      if (pDivId == 'div_gpt_bi_content_landing') {
        $('#div_gpt_bi_content_landing').insertAfter($('#moreSectionNews').find('.feature')[2]);
      }

      if (pDivId == 'div_gpt_bi_video') {
        $('#div_gpt_bi_video').insertAfter($('#moreVideos').find('.feature')[3]);
      }

      if (pDivId == 'div_gpt_bi_feature') {

        setTimeout(function() {

          $('#div_gpt_bi_feature').css('position', 'absolute');
          $('#div_gpt_bi_feature').css('z-index', '9');
          var lt = $('.featured-module.left').last().offset();
          var rt = $('#div_gpt_bi_feature').offset();
          var newt = lt.top - rt.top;
          $('#div_gpt_bi_feature').css('margin-top', newt);
          $('#div_gpt_bi_feature').css('right', '334px');
          var newh = $('.featured-module.left').last().height();
          $('.featured-module.right').last().css('height', newh + 'px');
          $('.featured-module.right').last().css('background', '#f5f5f5');


        }, 1000);

      }

      if (pDivId == 'div_gpt_bi_video_landing') {
        $('#moreVideoStrip .columnRight').hide();
        $('#div_gpt_bi_video_landing').insertAfter($('#moreVideoStrip .columnCenter'));
        $('#div_gpt_bi_video_landing').addClass('columnRight');

        setTimeout(function() {
          if ($("#div_gpt_bi_video_landing").css('display') == 'none') {
            $('#div_gpt_bi_video_landing').removeClass('columnRight');
            $('#moreVideoStrip .columnRight').show();
          }
        }, 3000);

      }

      if (pDivId == 'sponsored_content_gpt') {
        $('#ad-replacement-video').html('')
        $('#ad-replacement-video').append($('#sponsored_content_gpt'));
      }

      if (pDivId == 'div_gpt_ntent') {

        $('#div_gpt_ntent').insertAfter($('.news-horizontal-tri').find('article')[1]);
        $('.news-horizontal-tri').find('article')[2].hide();

      }


      //--> Native Ad Setup End 
    }
  });
};

displayAd_sync = function(pSite, pTarget) {
  promisifySetupAd(function() {
    if (TR3.data.GlobalAdsAllowed) {

      //--> Admantx Begin
      pTarget += ";admant=" + TR3.data.admantx;
      //--> Admantx End    



      var dzn = pSite.split(";");

      //--> Add template variable to ad call Begin
      if (dzn[0] == 'us.reuters/home') {
        pTarget += ";template=home";
      } else if (dzn[0].indexOf("article") > -1) {
        if (dzn[0].indexOf("article_archive") == -1) {
          pTarget += ";template=article";
        }
      }
      //--> Add template variable to ad call Begin


      //--> Adslot 1 declaration
      var bidxc = typeof window.advBidxc === "object" ? '1' : '0';

      gptadslots[1] = googletag.defineSlot('/4735792/' + pSite, [
        [728, 90],
        [970, 250],
        [970, 90],
        [970, 66],
        [940, 230],
        [1, 1]
      ], 'div_gpt_lb').setTargeting('type', ['leaderboard']).setTargeting('bidxc', [bidxc]).addService(googletag.pubads());
      console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboard;" + pTarget + " Div Slot: div_gpt_lb" + " Sync");

      //--> Adslot 2 declaration
      gptadslots[2] = googletag.defineSlot('/4735792/' + pSite, [
        [300, 250],
        [1, 1],
        [300, 600],
        [300, 1050],
        [160, 600]
      ], 'div_gpt_mpu').setTargeting('type', ['mpu']).addService(googletag.pubads());
      console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpu;" + pTarget + " Div Slot: div_gpt_mpu" + " Sync");

      //--> Adslot 3 declaration
      gptadslots[3] = googletag.defineSlot('/4735792/' + pSite, [
        [300, 250],
        [1, 1],
        [300, 600]
      ], 'div_gpt_mpulow').setTargeting('type', ['mpulow']).addService(googletag.pubads());
      console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpulow;" + pTarget + " Div Slot: div_gpt_mpulow" + " Sync");

      if (TR3.extractDartZone().indexOf("reuters/home") > -1 || TR3.extractDartZone().indexOf("reuters.de/home") > -1) {
        //--> Adslot 4 declaration 
        gptadslots[4] = googletag.defineSlot('/4735792/' + pSite, [
          [728, 90],
          [970, 250],
          [970, 90],
          [970, 66],
          [940, 230],
          [1, 1]
        ], 'div_gpt_lb_center').setTargeting('type', ['leaderboardcenter']).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboardcenter;" + pTarget + " Div Slot: div_gpt_lb_center" + " Sync ");

        //--> Adslot 5 declaration 
        gptadslots[5] = googletag.defineSlot('/4735792/' + pSite, [
          [728, 90],
          [970, 250],
          [970, 90],
          [970, 66],
          [940, 230],
          [1, 1]
        ], 'div_gpt_lb_low').setTargeting('type', ['leaderboardlow']).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboardlow;" + pTarget + " Div Slot: div_gpt_lb_low" + " Sync");
      }


      //add the targetting
      if (!!pTarget) {
        var t = pTarget.split(";");
        for (var k = 0; k < t.length; k++) {
          if (t[k].indexOf("=") > 0) {
            gptadslots[1].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            gptadslots[2].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            gptadslots[3].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));

            if (TR3.extractDartZone().indexOf("reuters/home") > -1 || TR3.extractDartZone().indexOf("reuters.de/home") > -1) {
              gptadslots[4].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
              gptadslots[5].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            }
          } else {
            console.error("Targeting string index of = " + pTarget);
          }
        }
      }

      googletag.display('div_gpt_lb');
      googletag.display('div_gpt_mpu');
      googletag.display('div_gpt_mpulow');

      if (TR3.extractDartZone().indexOf("reuters/home") > -1 || TR3.extractDartZone().indexOf("reuters.de/home") > -1) {
        googletag.display('div_gpt_lb_center');
        googletag.display('div_gpt_lb_low');
      }

    }
  });
};

// GPT End// Fastlane function load LB, MPU, MPULow 

displayAd_sync_fastlane = function(pSite, pTarget) {
  promisifySetupAd(function() {
    if (TR3.data.GlobalAdsAllowed) {

      //--> Admantx Begin 
      pTarget += ";admant=" + TR3.data.admantx;
      //--> Admantx End 


      var dzn = pSite.split(";");
      //--> Add template variable to ad call Begin 

      if (dzn[0] == 'us.reuters/home') {
        pTarget += ";template=home";
      } else if (dzn[0].indexOf("article") > -1) {
        if (dzn[0].indexOf("article_archive") == -1) {
          pTarget += ";template=article";
        }
      }

      //--> Add template variable to ad call End

      // start gpt
      //--> Adslot 1 declaration 
      var bidxc = typeof window.advBidxc === "object" ? '1' : '0';

      gptadslots[0] = googletag.defineSlot('/4735792/' + pSite, [
        [728, 90],
        [970, 250],
        [970, 90],
        [970, 66],
        [940, 230],
        [1, 1]
      ], 'div_gpt_lb').setTargeting('type', ['leaderboard']).setTargeting('bidxc', [bidxc]).addService(googletag.pubads());
      console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboard;" + pTarget + " Div Slot: div_gpt_lb" + " Sync FL");

      if (TR3.extractDartZone().indexOf("jp.reuters") > -1) {
        //--> Adslot 2 declaration 
        gptadslots[1] = googletag.defineSlot('/4735792/' + pSite, [
          [300, 250],
          [1, 1],
          [300, 600],
          [300, 1050]
        ], 'div_gpt_mpu').setTargeting('type', ['mpu']).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpu;" + pTarget + " Div Slot: div_gpt_mpu" + " Sync FL");

      } else {
        //--> Adslot 2 declaration 
        gptadslots[1] = googletag.defineSlot('/4735792/' + pSite, [
          [300, 250],
          [1, 1],
          [300, 600],
          [300, 1050],
          [160, 600]
        ], 'div_gpt_mpu').setTargeting('type', ['mpu']).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpu;" + pTarget + " Div Slot: div_gpt_mpu" + " Sync FL");

      }
      //--> Adslot 3 declaration 
      gptadslots[2] = googletag.defineSlot('/4735792/' + pSite, [
        [300, 250],
        [1, 1],
        [300, 600]
      ], 'div_gpt_mpulow').setTargeting('type', ['mpulow']).addService(googletag.pubads());
      console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpulow;" + pTarget + " Div Slot: div_gpt_mpulow" + " Sync FL");
      
      if ((TR3.extractDartZone() == "us.reuters/home") || (TR3.extractDartZone() == "uk.reuters/home") || (TR3.extractDartZone() == "jp.reuters/home")) {
        //--> Adslot 4 declaration 
        gptadslots[3] = googletag.defineSlot('/4735792/' + pSite, [
          [728, 90],
          [970, 250],
          [970, 90],
          [970, 66],
          [940, 230],
          [1, 1]
        ], 'div_gpt_lb_center').setTargeting('type', ['leaderboardcenter']).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboardcenter;" + pTarget + " Div Slot: div_gpt_lb_center" + " Sync FL");

        //--> Adslot 5 declaration 
        gptadslots[4] = googletag.defineSlot('/4735792/' + pSite, [
          [728, 90],
          [970, 250],
          [970, 90],
          [970, 66],
          [940, 230],
          [1, 1]
        ], 'div_gpt_lb_low').setTargeting('type', ['leaderboardlow']).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboardlow;" + pTarget + " Div Slot: div_gpt_lb_low" + " Sync FL");
      }

      if ((TR3.extractDartZone().indexOf("jp.reuters") > -1) && (TR3.extractDartZone() != "jp.reuters/home")) {
        //--> Adslot 5 declaration 
        gptadslots[5] = googletag.defineSlot('/4735792/' + pSite, [
          [300, 250],
          [1, 1],
          [300, 600]
        ], 'div_gpt_mpu2').setTargeting('type', ['mpu2']).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpu2;" + pTarget + " Div Slot: div_gpt_mpu2" + " Sync FL");

      }


      //add the targetting 
      if (!!pTarget) {
        var t = pTarget.split(";");
        for (var k = 0; k < t.length; k++) {
          if (t[k].indexOf("=") > 0) {
            gptadslots[0].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            gptadslots[1].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            gptadslots[2].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            if ((TR3.extractDartZone().indexOf("jp.reuters") > -1) && (TR3.extractDartZone() != "jp.reuters/home")) {

              gptadslots[5].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            }
            if ((TR3.extractDartZone() == "us.reuters/home") || (TR3.extractDartZone() == "uk.reuters/home") || (TR3.extractDartZone() == "jp.reuters/home")) {
              gptadslots[3].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
              gptadslots[4].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
            }
          } else {
            console.error("Targeting string index of = " + pTarget);
          }
        }
      }

      googletag.display('div_gpt_lb');
      googletag.display('div_gpt_mpu');
      googletag.display('div_gpt_mpulow');

      if ((TR3.extractDartZone().indexOf("jp.reuters") > -1) && (TR3.extractDartZone() != "jp.reuters/home")) {
        googletag.display('div_gpt_mpu2');
      }

      if ((TR3.extractDartZone() == "us.reuters/home") || (TR3.extractDartZone() == "uk.reuters/home") || (TR3.extractDartZone() == "jp.reuters/home")) {
        googletag.display('div_gpt_lb_center');
        googletag.display('div_gpt_lb_low');
      }
      // end gpt

    }
  });
};
