document.write('<div id="portfolioWidget"></div>');
Reuters.section.loadPortfolioWidget=function(b){if(document.getElementById("portfolioWidget")&&b.portfoliosHolding!=null&&b.portfoliosHolding!="--"){var a='<div class="module"><div class="moduleHeader"><h3>Portfolios</h3></div><div class="moduleBody">';a+='<p class="portfolioHold">'+b.portfoliosHolding+' portfolios hold <a href="/finance/stocks/overview?symbol='+b.symbol+'">'+b.symbol+"</a></p>";a+='<div class="recentActivity">';a+="<h3>Recent Activity</h3>";a+='<div class="buys"><span class="activityCount"><strong>'+
b.activity.period90day.buys+'</strong></span><span class="activityLabel"> Buys</span></div>';a+='<div class="sells"><span class="activityCount"><strong>'+b.activity.period90day.sells+'</strong></span><span class="activityLabel"> Sells</span></div>';a+="</div>";a+='<div class="otherStocks">';a+="<p>People who have "+b.symbol+" also have:</p>";for(i=0;i<b.commonlyHeld.holding.length;i++)a+='<a href="/finance/stocks/overview?symbol='+b.commonlyHeld.holding[i]+'">'+b.commonlyHeld.holding[i]+"</a>",i<
b.commonlyHeld.holding.length-1&&(a+=" &nbsp;|&nbsp; ");a+="</div>";a+='<div class="moreLink"><a href="https://commerce.us.reuters.com/login/pages/login/portfolioLogin.do?go=http://portfolio.us.reuters.com/US/public/index.asp&go_withoutlogin=http://portfolio.us.reuters.com/US/public/index.asp">&#187; View public portfolios</a></div>';a+='<div class="moreLink"><a href="https://commerce.us.reuters.com/login/pages/login/portfolioLogin.do?go=http://portfolio.us.reuters.com/US/create.asp">&#187; Make your own</a></div>';
a+="</div></div>";document.getElementById("portfolioWidget").innerHTML=a}};Reuters.section.initPortfolioWidget=function(b){Reuters.utils.loadStylesheet("portfolioCSS","/resources_v2/css/widget-portfolio.css");Reuters.utils.loadScript("portfolioJS","http://portfolio.us.reuters.com/us/api/PortfolioSpy.asp?symbol="+b+"&format=json&callback=Reuters.section.loadPortfolioWidget&host=http://www")};