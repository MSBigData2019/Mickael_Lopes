Reuters.namespace("company");Reuters.company.loadExchanges=function(b){if(document.getElementById("selectExchanges")){var c='<select id="changeSelectedExchange" onchange="Reuters.company.changeExchange();">',a="";for(i=0;i<b.length;i++)a=b[i].ric==Reuters.utils.getQueryStringParameter(location.href,"symbol")?" selected":"",c+='<option value="'+b[i].ric+'"'+a+">"+b[i].exchange+" ("+b[i].ric+")</option>"}};Reuters.company.changeExchange=function(){location.href="/finance/stocks/overview?symbol="+document.getElementById("changeSelectedExchange").value};
Reuters.company.showEstimatesVsActuals=function(){var b=1E8,c=0;for(i=0;i<Reuters.company.pastEstimates.length;i++){var a=Reuters.company.pastEstimates[i];if(a.high<b)b=a.high;if(a.high>c)c=a.high;if(a.low<b)b=a.low;if(a.low>c)c=a.low;if(a.actual<b)b=a.actual;if(a.actual>c)c=a.actual}for(i=0;i<Reuters.company.futureEstimates.length;i++){a=Reuters.company.futureEstimates[i];if(a.high<b)b=a.high;if(a.high>c)c=a.high;if(a.low<b)b=a.low;if(a.low>c)c=a.low;if(a.actual<b)b=a.actual;if(a.actual>c)c=a.actual}var c=
220/(c-b),d='<table width="100%" cellpadding="1" cellspacing="0" border="0" class="dataTable"><tbody class="dataSmall">';if(Reuters.company.pastEstimates.length>0){if(!Reuters.company.pastEstimatesText)Reuters.company.pastEstimatesText="Last Five Estimates";d+='<tr><th colspan="3">'+Reuters.company.pastEstimatesText+"</th></tr>";for(i=0;i<Reuters.company.pastEstimates.length;i++){var a=Reuters.company.pastEstimates[i],e=Math.ceil(c*(a.high-a.low));e==0&&(e=1);var g=Math.floor(c*(a.low-b)),f="Estimate: "+
a.low+" - "+a.high;a.low==a.high&&(f="Estimate: "+a.low);var h=Math.floor(c*(a.actual-b));d+='<tr class="dataSlick">';d+="<td>"+a.label+"</td>";d+="<td><strong>"+a.actual+"</strong></td>";d+='<td><div class="evseActual"><img src="/resources_v2/images/btn_analystRecommendations.gif" border="0" title="Actual: '+a.actual+'" style="margin-left: '+h+'px;" /></div></div>';d+='<div class="evseEstimateBox" title="'+f+'"><div class="evseEstimates" style="width:'+e+"px; margin-left: "+g+'px;" title="'+f+'"></div>'}}if(Reuters.company.futureEstimates.length>
0){if(!Reuters.company.futureEstimatesText)Reuters.company.futureEstimatesText="Future Estimates";d+='<tr><th colspan="3">'+Reuters.company.futureEstimatesText+"</th></tr>";for(i=0;i<Reuters.company.futureEstimates.length;i++)a=Reuters.company.futureEstimates[i],e=Math.ceil(c*(a.high-a.low)),e==0&&(e=1),g=Math.floor(c*(a.low-b)),f="Estimate: "+a.low+" - "+a.high,a.low==a.high&&(f="Estimate: "+a.low),d+='<tr class="dataSlick">',d+="<td>"+a.label+"</td>",d+="<td><strong>"+a.low+"</strong></td>",d+=
'<td width="226"><div class="evseActual empty"></div>',d+='<div class="evseEstimateBox" title="'+f+'"><div class="evseEstimates" style="width:'+e+"px; margin-left: "+g+'px;" title="'+f+'"></div>'}d+="</tbody></table>";document.write(d)};