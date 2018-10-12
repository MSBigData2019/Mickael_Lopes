var init = true;

window.TR3 = {};
TR3.logEnabled = 1;
TR3.logs = [];
TR3.intervals = {};
TR3.tagEvents = {};
TR3.sync = {};
TR3.tags = {};
TR3.counters = {};
TR3.data = {};
TR3.Ads = {};
TR3.data.adslots = [];

TR3.data.ord = Math.floor(Math.random() * 10e12);

window.WT = window.WT || {};

//DFP Premimum code
TR3.data.GlobalAdsAllowed = true;
TR3.data.sites = {};
TR3.data.sites = {
  'www.reuters.com': {
    'enabled': true,
    'tier2': false,
    'rubicon': true
  },
  'uk.reuters.com': {
    'enabled': true,
    'tier2': false,
    'rubicon': true
  },
  'live.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'ca.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'cn.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'in.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'jp.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'blogs.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'mx.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'lta.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'ar.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'br.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'es.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'ru.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'ara.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'fr.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'de.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'it.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'borsaitaliana.it.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'af.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  'olyadmin.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'betaus.admin.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'brazil-soccer.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'winter-games.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'live.jp.reuters.com': {
    'enabled': true,
    'tier2': true
  },
  '10.90.23.211': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.142': {
    'enabled': true,
    'tier2': false
  },
  '10.90.43.101': {
    'enabled': true,
    'tier2': false,
    'rubicon': true
  },
  '10.90.43.102': {
    'enabled': true,
    'tier2': false
  },
  '10.90.22.173': {
    'enabled': true,
    'tier2': false
  },
  '10.90.22.174': {
    'enabled': true,
    'tier2': false
  },
  '10.90.22.116': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.118': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.119': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.120': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.121': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.122': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.123': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.124': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.125': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.126': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.179': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.175': {
    'enabled': true,
    'tier2': true
  },
  '10.90.43.115': {
    'enabled': true,
    'tier2': true
  },
  '10.90.43.117': {
    'enabled': true,
    'tier2': true
  },
  '10.90.0.13': {
    'enabled': true,
    'tier2': false
  },
  'betacn.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  '10.90.43.107': {
    'enabled': true,
    'tier2': true
  },
  '10.90.22.166': {
    'enabled': true,
    'tier2': false
  },
  '10.90.22.167': {
    'enabled': true,
    'tier2': false
  },
  '10.90.22.141': {
    'enabled': true,
    'tier2': false
  },
  '10.90.22.206': {
    'enabled': true,
    'tier2': false
  },
  'betajp.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'funds.us.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'funds.uk.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'funds.in.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'portfolio.us.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'portfolio.uk.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'portfolio.in.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'alerts.us.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'alerts.uk.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'alerts.in.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'stockscreener.us.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'stockscreener.uk.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'stockscreener.in.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  'betade.reuters.com': {
    'enabled': true,
    'tier2': false
  },
  '10.90.22.207': {
    'enabled': true,
    'tier2': false
  },
  '10.90.23.207': {
    'enabled': true,
    'tier2': false
  },
  '10.35.60.43': {
    'enabled': true,
    'tier2': true
  },
  '10.35.60.44': {
    'enabled': true,
    'tier2': true
  },
  '10.35.60.45': {
    'enabled': true,
    'tier2': true
  },
  '10.35.60.50': {
    'enabled': true,
    'tier2': true
  },
  '10.35.60.42': {
    'enabled': true,
    'tier2': true
  },
  '10.35.60.19': {
    'enabled': true,
    'tier2': true
  },
  'live.special.reuters.com': {
    'enabled': true,
    'tier2': false
  }

};

TR3.data.DFPEnabled = !!TR3.data.sites[window.location.hostname]['enabled'] && TR3.data.GlobalAdsAllowed;

TR3.log = function(msgs) {
  TR3.logs.push([new Date()].concat(Array.prototype.slice.call(arguments)));
  if (TR3.logEnabled === 1) {
    return window.console && console.log &&
      Function.apply.call(console.log, console, arguments);
  }
};

TR3.checkHosts = function(hosts) {
  for (var i = hosts.length - 1; i >= 0; i--) {
    if (window.location.hostname.indexOf(hosts[i]) >= 0) {
      return true;
    }
  }
  return false;
};

TR3.getURLQueryParameterByName = function(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

TR3.extractDartZone = function() {
  var m = document.getElementsByTagName('meta');
  for (i = 0; i < m.length; i++) {
    if (m[i].name == "DCSext.DartZone") {
      return m[i].content;
    }
  }
  return "undefined";
};

TR3.writeScript = function(url) {
  document.write('<scr' + 'ipt type="text/javascript" src="' + url + '"></scr' + 'ipt>');
};

TR3.addEvent = function(name) {
  TR3.log("event fired: " + name);
  TR3.tagEvents[name.toLowerCase()] = 1;
};

TR3.checkHosts = function(hosts) {
  for (var i = hosts.length - 1; i >= 0; i--) {
    if (window.location.hostname.indexOf(hosts[i]) >= 0) {
      return true;
    }
  }
  return false;
};


(function() {
  TR3.data.contentType = "landing";
  var parts = window.location.pathname.split("/");
  if (parts[1] !== null && parts[1] === "article") {
    TR3.data.contentType = "articles";
  }

})();

var adSymbol = TR3.getURLQueryParameterByName("smbl");
var adTest = TR3.getURLQueryParameterByName("adstest");
var adParams = "";
var adParams2 = "";

if (TR3.data.admantx !== "" && !!TR3.data.admantx) {
  adParams += "admant=" + TR3.data.admantx + ";";
  adParams2 += "admant=" + TR3.data.admantx + ";";
}

if (typeof(adTest) != 'undefined') {
  adParams += "adstest=" + adTest + ";";
  adParams2 += "adstest=" + adTest + ";";
}

if (window.location.href.indexOf("idUSRTX4QGTB") > -1 || window.location.href.indexOf("idINRTX4QGTB") > -1 || window.location.href.indexOf("idUKRTX4QGTB") > -1) {
  adParams += "smbl=sa";
  adParams2 += "smbl=sa";
} else {
  if (typeof(adSymbol) != 'undefined') {
    adParams += "smbl=" + adSymbol;
    adParams2 += "smbl=" + adSymbol;
  }
}

// End Setup


// GPT Begin
var gptadslots = [];
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function() {
  googletag.pubads().enableSingleRequest();
  googletag.pubads().enableAsyncRendering();
  googletag.pubads().collapseEmptyDivs(true);
  
  var aam = getCookie('aam_uuid');
  if (aam) {
    googletag.pubads().setTargeting('aam', aam);
  }
});

var can_display_ads = false;
var display_ads_resolvers = display_ads_resolvers || [];
var arrayAds = arrayAds || [];
var adParams3 = "";

// Admantx begin

function setupAdmantx() {
  /*
  if (TR3.extractDartZone() == "us.reuters/home") {
    return Promise.resolve();
  }*/

  return new Promise(function(resolve) {
    admantx_callback = function(data) {
      TR3.data.admantx = "";
      if (data && data.admants && data.status == "OK") {
        TR3.log("admantx_callback :" + data.status);
        for (var i = 0; i < data.admants.length; i++) {
          if (i > 0) TR3.data.admantx += ",";
          TR3.data.admantx += data.admants[i];
        }
        TR3.log("admantx_callback TR3.data.admantx:" + TR3.data.admantx);
      }
    };

    if (TR3.checkHosts(["www.reuters.com", "uk.reuters.com", "jp.reuters.com", "in.reuters.com"]) && (!!TR3.data.contentType)) {
      var adxsvcReq = '//async01.admantx.com/admantx/service?request=' + escape('{"key":"234330834c41105ad5ed794fa036e085b40225c44f9228bb9e2692f427917605", "decorator":"template.reuters", "filter":["default"], "method":"descriptor", "mode":"async", "type":"URL", "body":"' + encodeURIComponent(document.location.href) + '"}');
      var adxsvcSE = document.createElement('script');
      adxsvcSE.id = "adxsvcSE_2";
      adxsvcSE.type = 'text/javascript';
      adxsvcSE.async = true;
      adxsvcSE.src = adxsvcReq;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(adxsvcSE, s);
    } else {
      resolve();
    }

    setTimeout(function() {
      resolve();
    }, 500);
  });
}

// Admantx end



// Key Value Functions begin

//Admantx Begin
function returnAdmantx() {
  if (TR3.data.admantx) {
    return ";admant=" + TR3.data.admantx;
  }
}

//Admantx End    

// Key Value Functions end


// Evidon Universal Consent begin
var edition = window.location.host.split('.')[0];
var should_apply_gdpr = ['uk', 'de', 'fr', 'it', 'es'].indexOf(edition) > -1;
console.log('Should GDPR apply', should_apply_gdpr);

function setupEvidonUniversalConsent(country_code) {
  var id = 1237;

  function append(scriptid, url, async) {
    var d = document,
      sn = 'script',
      f = d.getElementsByTagName(sn)[0];
    if (!f) f = d.head;
    var s = d.createElement(sn);
    s.async = true;
    s.id = scriptid;
    s.src = url;
    f.parentNode.insertBefore(s, f);
  }

  function getRootDomain() {
    var parts = window.location.hostname.split('.');
    if (parts.length === 2) rootDomain = parts[0];
    else if (parts.length > 2) {
      // see if the next to last value is a common tld
      var part = parts[parts.length - 2];
      if (part === 'com' || part === 'co') {
        rootDomain = parts[parts.length - 3]; // go back one more
      } else {
        rootDomain = part;
      }
    }

    return rootDomain;
  }

  window.evidon = {};
  window.evidon.id = id;
  var cdn = '//c.evidon.com/',
    rootDomain = getRootDomain(),
    noticecdn = cdn + 'sitenotice/';
  append('evidon-notice', noticecdn + 'evidon-sitenotice-tag.js', false);
    if (!country_code) {
      append('evidon-location', cdn + 'geo/country.js', true);
    } else {
      append('evidon-location', cdn + 'tag-' + country_code + '/country.js', true);
    }
  append('evidon-themes', noticecdn + id + '/snthemes.js', true);
  if (rootDomain) append('evidon-settings', noticecdn + id + '/' + rootDomain + '/settings.js', true);

  return new Promise(function(resolve) {
    __cmp('getConsentData', null, function(vendorConsentData, success) {
      console.log('getConsentData', vendorConsentData, success);
      resolve({
        success: success,
        consentData: vendorConsentData.consentData,
      });
    });

    setTimeout(function() {
      resolve({
        success: false,
        consentData: undefined,
      });
    }, 1000);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  if (should_apply_gdpr) {
    setupEvidonUniversalConsent()
      .then(function(result) {
        var success = result.success;
        var consent_data = result.consentData;
        console.log("Evidon consent", success, consent_data);

        if (!success) {
          googletag.cmd.push(function() {
            googletag.pubads().setRequestNonPersonalizedAds(1);
            console.log("GPT SET NON PERSONAL");
          });
        }

        setupAdmantx()
          .then(function() {
            console.log("FINISH ADMANTX SETUP!");
            setupMediaDotNet(true, success, consent_data);
          });

        googletag.cmd.push(function() {
          googletag.enableServices();
          console.log("GPT ENABLE SERVICES");
        });

        enableDisplayAds();
      });
  } else {
    setupAdmantx()
      .then(function() {
        console.log("FINISH ADMANTX SETUP!");
        setupMediaDotNet(false);
      });

    googletag.cmd.push(function() {
      googletag.enableServices();
      console.log("GPT ENABLE SERVICES");
    });

    enableDisplayAds();
  }
});
// Evidon Universal Consent end

function gatherAd(pDivId, pSize, pSite, headerBid, type) {
  arrayAds.push({
    'pDivId': pDivId,
    'pSite': pSite,
    'pSize': pSize,
    'phb': headerBid,
    'pType': type
  });
}

//  Gather Page Ads end

function checkHB() {
  for (var k = 0; k <= arrayAds.length; k++) {
    if (arrayAds[k].phb == 'yes') {
      //console.log('yes');
      return 'yes';
    } else {
      return 'no';
    }
  }
}


function enableDisplayAds() {
  can_display_ads = true;

  for(var i = 0; i < display_ads_resolvers.length; i++) {
    display_ads_resolvers[i]();
  };
}

function promisifySetupAd(func) {
  var promise = new Promise(function(resolve) {
    if (can_display_ads) {
      resolve();
    } else {
      display_ads_resolvers.push(resolve);
    }
  }).then(function() {
    googletag.cmd.push(func);
  });
}

function setupAd(site, size, divId, ptype) {
  promisifySetupAd(
    function() {
      //define slot
      gptadslots[divId] = googletag.defineSlot("/4735792/" + site, size, divId).setTargeting('type', [ptype]).addService(googletag.pubads());

      //add the targetting
      if (!!adParams3) {
        var t = adParams3.split(";");

        for (var k = 0; k < t.length; k++) {
          if (t[k].indexOf("=") > 0) {
            gptadslots[divId].setTargeting(t[k].substr(0, t[k].indexOf("=")), t[k].substr(t[k].indexOf("=") + 1));
          } else {
            console.error("Targeting string index of = " + adParams3 + " in Error for " + arrayAds[k].pDivId);
          }
        }
      }

      //--> Native Ad Setup Begin
      if (divId == 'div_gpt_bi_content_landing') {
        $('#div_gpt_bi_content_landing').insertAfter($('#moreSectionNews').find('.feature')[2]);
      }

      if (divId == 'div_gpt_bi_video') {
        $('#div_gpt_bi_video').insertAfter($('#moreVideos').find('.feature')[3]);
      }

      if (divId == 'div_gpt_bi_feature') {
        $('#div_gpt_bi_feature').css('visibility', 'hidden');
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
          $('article.story:nth-child(1)').css('max-height', '130px');
          $('#div_gpt_bi_feature').css('visibility', 'visible');
        }, 2000);
      }

      if (divId == 'div_gpt_bi_video_landing') {
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

      if (divId == 'sponsored_content_gpt') {
        $('#ad-replacement-video').html('');
        $('#ad-replacement-video').append($('#sponsored_content_gpt'));
      }

      if (divId == 'div_gpt_ntent') {

        $('#div_gpt_ntent').insertAfter($('.news-horizontal-tri').find('article')[1]);
        $('.news-horizontal-tri article').last().hide();

        setTimeout(function() {
          if ($('#div_gpt_ntent').css('display') == 'none') {
            $('#div_gpt_ntent').hide();
            $('.news-horizontal-tri article').last().show();
          }
        }, 3000);

      }

      if (divId == 'div_gpt_ntentc') {

        $('#div_gpt_ntentc').insertAfter($('.news-horizontal-sm').find('article')[2]);
        $('.news-horizontal-sm article').last().hide();

        setTimeout(function() {
          if ($('#div_gpt_ntentc').css('display') == 'none') {
            $('#div_gpt_ntentc').hide();
            $('.news-horizontal-sm article').last().show();
          }
        }, 3000);

      }

      //--> Native Ad Setup End

      // display ad
      googletag.display(divId);
      console.log("Display Ad via GPT: Site:" + site + " Target: type=" + ptype + ";" + adParams3 + " Div Slot:" + divId + " new_framework");
    }
  );
}

function callAds() {

  if (TR3.data.GlobalAdsAllowed) {

    var adSymbol = TR3.getURLQueryParameterByName("smbl");

    var adTest = TR3.getURLQueryParameterByName("adstest");
    var dzn = arrayAds[0].pSite.split(";");
    var pSite = arrayAds[0].pSite;


    // adstest
    if (typeof(adTest) != 'undefined') {
      adParams3 += "adstest=" + adTest;
    }

    // symbol now smbl

    if (window.location.href.indexOf("finance/stocks/overview") > -1) {
      var getRic = window.location.href.split("/");
      var ricVal = getRic.slice(-1).pop();
      adParams3 += ";smbl=" + ricVal;
    } else {

      if (window.location.href.indexOf("idUSRTX4QGTB") > -1 || window.location.href.indexOf("idINRTX4QGTB") > -1 || window.location.href.indexOf("idUKRTX4QGTB") > -1) {
        adParams3 += ";smbl=sa";
      } else {

        if (typeof(adSymbol) != 'undefined') {
          adParams3 += ";smbl=" + adSymbol;
        }
      }

    }

    // template
    if (dzn[0] == 'us.reuters/home' || dzn[0] == 'in.reuters/home') {
      adParams3 += ";template=home";
    } else if (dzn[0].indexOf("article") > -1) {
      if (dzn[0].indexOf("article_archive") == -1) {
        adParams3 += ";template=article";
      }
    } else {
      adParams3 += ";template=other";
    }

    // article ID / story channel
    if (dzn[0].indexOf("article") > -1 && dzn[0].indexOf("archive") < -1) {
      adParams3 += ";articleID=" + Reuters.info.articleId;
      adParams3 += ";storychannel=" + Reuters.info.channel;
    }

    // Ad Refresh
    if (Reuters.refresh) {
      adParams3 += ";prefresh=" + Reuters.refresh.prefresh;
    }


    // admantx
    if (TR3.data.admantx) {
      adParams3 += returnAdmantx();
    }


    // header bidding 

    if (checkHB() == 'yes') {

      promisifySetupAd(function() {
        //--> Adslot 1 declaration 
        var bidxc = typeof window.advBidxc === "object" ? '1' : '0';

        gptadslots[0] = googletag.defineSlot('/4735792/' + pSite, [
          [728, 90],
          [970, 250],
          [970, 90],
          [970, 66],
          [970, 180],
          [940, 230],
          [1, 1]
        ], 'div_gpt_lb').setTargeting('type', ['leaderboard']).setTargeting('bidxc', [bidxc]).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboard;" + adParams3 + " Div Slot: div_gpt_lb" + " Sync FL new_framework");

        if (TR3.extractDartZone().indexOf("jp.reuters") > -1) {
          //--> Adslot 2 declaration 
          gptadslots[1] = googletag.defineSlot('/4735792/' + pSite, [
            [300, 250],
            [1, 1],
            [300, 600],
            [300, 1050]
          ], 'div_gpt_mpu').setTargeting('type', ['mpu']).addService(googletag.pubads());
          console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpu;" + adParams3 + " Div Slot: div_gpt_mpu" + " Sync FL new_framework");
        } else {
          //--> Adslot 2 declaration 
          gptadslots[1] = googletag.defineSlot('/4735792/' + arrayAds[0].pSite, [
            [300, 250],
            [1, 1],
            [300, 600],
            [300, 1050],
            [160, 600]
          ], 'div_gpt_mpu').setTargeting('type', ['mpu']).addService(googletag.pubads());
          console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpu;" + adParams3 + " Div Slot: div_gpt_mpu" + " Sync FL new_framework");
        }

        //--> Adslot 3 declaration 
        gptadslots[2] = googletag.defineSlot('/4735792/' + pSite, [
          [300, 250],
          [1, 1],
          [300, 600]
        ], 'div_gpt_mpulow').setTargeting('type', ['mpulow']).addService(googletag.pubads());
        console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpulow;" + adParams3 + " Div Slot: div_gpt_mpulow" + " Sync FL new_framework");
        if ((TR3.extractDartZone() == "us.reuters/home") || (TR3.extractDartZone() == "uk.reuters/home") || (TR3.extractDartZone() == "jp.reuters/home") || (TR3.extractDartZone().indexOf("us.reuters/tentpoles") > -1)) {
          //--> Adslot 4 declaration 
          gptadslots[3] = googletag.defineSlot('/4735792/' + pSite, [
            [728, 90],
            [970, 250],
            [970, 90],
            [970, 66],
            [940, 230],
            [1, 1]
          ], 'div_gpt_lb_center').setTargeting('type', ['leaderboardcenter']).addService(googletag.pubads());
          console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboardcenter;" + adParams3 + " Div Slot: div_gpt_lb_center" + " Sync FL new_framework");

          //--> Adslot 5 declaration 
          gptadslots[4] = googletag.defineSlot('/4735792/' + pSite, [
            [728, 90],
            [970, 250],
            [970, 90],
            [970, 66],
            [940, 230],
            [1, 1]
          ], 'div_gpt_lb_low').setTargeting('type', ['leaderboardlow']).addService(googletag.pubads());
          console.log("Display Ad via GPT: Site:" + pSite + " Target: type=leaderboardlow;" + adParams3 + " Div Slot: div_gpt_lb_low" + " Sync FL new_framework");
        }

        if ((TR3.extractDartZone().indexOf("jp.reuters") > -1) && (TR3.extractDartZone() != "jp.reuters/home")) {
          //--> Adslot 5 declaration 
          gptadslots[5] = googletag.defineSlot('/4735792/' + pSite, [
            [300, 250],
            [1, 1],
            [300, 600]
          ], 'div_gpt_mpu2').setTargeting('type', ['mpu2']).addService(googletag.pubads());
          console.log("Display Ad via GPT: Site:" + pSite + " Target: type=mpu2;" + adParams3 + " Div Slot: div_gpt_mpu2" + " Sync FL new_framework");
        }

        //add the targetting 
        if (!!adParams3) {
          var t = adParams3.split(";");
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
              console.error("Targeting string index of = " + adParams3);
            }
          }
        }

        // display
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
      });
    }

    // end header bidding

    // not header bidding
    for (var b = 0; b < arrayAds.length; b++) {
      if (arrayAds[b].phb !== 'yes') {
        setupAd(pSite, arrayAds[b].pSize, arrayAds[b].pDivId, arrayAds[b].pType);
      }
    }
  }

};
