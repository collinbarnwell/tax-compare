function moneyPrint(x) {
    return '$' + Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calcEffectiveRate(income, bracket) {
  var taxesPaid = 0.0;
  var prevCap = 0.0;
  for (var i = 0; i < bracket.length; i++) {
    var cap = bracket[i][1];
    var rate = bracket[i][0];
    var topPay = Math.min(cap, income);

    taxesPaid += (topPay - prevCap) * rate;

    if (income < cap) { break; }
    prevCap = cap;
  }
  return (taxesPaid/income);
}

function displayCountryInfo(countryName) {
  var info = $('#info');
  for (var i = 0; i < COUNTRIES.length; i++) {
    if (COUNTRIES[i]['name'] != countryName) { continue; }
    country = COUNTRIES[i];

    info.html('<p>' + country.desc + '</p>');
    var sources = '<br/><h3>Sources:</h3><ol>';
    for (var j = 0; j < country.sources.length; j++)
      sources += '<li><a href="' + country.sources[j] + '">' + country.sources[j] + '</a></li>';
    sources += '</ol></small>';
    info.append(sources);
    return;
  }
}

function buildGraph(income) {
  var spacer = '<div class="graph-column"></div>';
  var labelSpacer = '<div class="graph-label"></div>';
  var graph = $('#graph-area');
  var labels = $('#graph-labels');
  var emH = parseFloat($("body").css("font-size"));
  graph.append(spacer);
  labels.append(labelSpacer);

  for (var i=0; i < COUNTRIES.length; i++) {
    var country = COUNTRIES[i];
    var graphBarsString = '';
    var totalEffectiveRate = 0.0;

    for (var j = 0; j < country.brackets.length; j++) {
      var convertedIncome = income/(country.dollarsPerUnit || 1.0);
      var effectiveRate = calcEffectiveRate(convertedIncome, country.brackets[j][1]);
      totalEffectiveRate += effectiveRate;
      var h = String(Math.floor(effectiveRate * GRAPH_HEIGHT));

      graphBarsString += '<div class="graph-bar" style="height:' + h +
	'px;background:' + COLORS[j];
      var emHeight =  h / emH;
      if (emHeight < 1.0)
	graphBarsString += ';font-size:'+ String(h) + 'px';
      graphBarsString += ';"><p>' + country.brackets[j][0] + '</p></div>';
    }
    graphBarsString += '<div class="bar-remainder"><p>After Tax Income: <br/>' +
      '<span class="after-tax">' + moneyPrint((1-totalEffectiveRate)*income) +
      '</span></div>';
    graph.append('<div class="graph-column">' +  graphBarsString + '</div>');
    graph.append(spacer);
    labels.append('<div class="graph-label real-label"><h2>' + country.name + '</h2></div>');
    labels.append(labelSpacer);
  }
}


function buildScale(income) {
  var scale  = '';
  var scaleAmount = income/10;
  for (var i = 10; i > -.5; i--) {
    scale += '<div class="side-amount">' + moneyPrint(scaleAmount*i) + ' </div>';
  }
  $('.side-panel').html(scale);
}

$(document).ready(function() {
  GRAPH_HEIGHT = $('#graph-area').height();
  buildGraph(100000);
  buildScale(100000);
  $('.real-label').click(function () {
    $('.real-label').css('background-color', 'white');
    $(this).css('background-color', 'grey');
    displayCountryInfo($(this).text());
  });
  $('.real-label')[0].click();
  $(".real-label").click(function() {
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  });
});
