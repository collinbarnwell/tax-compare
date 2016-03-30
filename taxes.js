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

    info.html('<h2>Country Info</h2>');
    info.append(country.desc);

    if (country.mill_p != '')
      info.append('<p>Population with more than $1M in assets: ' + country.mill_p + '%</p>');

    info.append('<p># of people per billionaire: ' + country.ppb + '</p>');
    var sources = '<h2>Sources</h2><ol>';
    for (var j = 0; j < country.sources.length; j++)
      sources += '<li><a href="' + country.sources[j] + '">' + country.sources[j] + '</a></li>';
    sources += '</ol></small>';
    info.append(sources);
    info.append("<h2>Disclaimers and Methodology</h2> <p>It's very hard to find consistent data on wealth levels.  I did the best that I could.<br/>Effective tax rates are an approximation; tax credits, refunds, capital gains tax, and many other things are not calculated.</p><p>Taxes calculated in USD according to early 2016 exchange rates.</p>");
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
      '</span><br/><small>Taxes paid: ' + moneyPrint(totalEffectiveRate*income) + '</small></div>';
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

function logslider(position) {
  // http://stackoverflow.com/questions/846221/logarithmic-slider
  // position will be between 0 and 100
  var minp = 0;
  var maxp = 500;
  // The result should be between 100 an 1 000 000 000
  var minv = Math.log(10000);
  var maxv = Math.log(1000000001);
  var scale = (maxv-minv) / (maxp-minp);
  return Math.exp(minv + scale*(position-minp));
}

function initLabels() {
  $('.real-label').click(function () {
    $('.real-label').css('background-color', 'inherit');
    $(this).css('background-color', '#337F86');
    displayCountryInfo($(this).text());
  });
  $('.real-label')[0].click();
  $(".real-label").click(function() {
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  });
}

$(document).ready(function() {
  var defaultVal = 100;
  var defaultIncome = logslider(defaultVal);
  GRAPH_HEIGHT = $('#graph-area').height();

  buildGraph(defaultIncome);
  buildScale(defaultIncome);
  initLabels();

  $( "#slider" ).slider({
    range: "min",
    value: defaultVal,
    min: 1,
    max: 500,
    slide: function( event, ui ) {
      var logVal = logslider(ui.value);
      $( "#slider-val" ).html( moneyPrint(logVal) );
      $('#graph-area').html('');
      $('#graph-labels').html('');
      buildGraph(logVal);
      buildScale(logVal);
      initLabels();
    }
  });

  var slideVal = $( "#slider" ).slider( "value" );
  $( "#slider-val" ).html( moneyPrint( logslider(slideVal) ) );
});
