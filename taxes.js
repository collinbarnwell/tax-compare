var GRAPH_HEIGHT;
var COLORS = ['green', 'red', 'blue', 'yellow', 'cyan'];

var INF = 1000000000000000; // one quadrillion
var US_Income = [[.1, 9275], [.15, 37650], [.25, 91150], [.28, 190150],
	    [.33, 413350], [.35, 415050], [.396, INF]];
var US_SocialSec = [[.0620, 118500]];
var US_Medicare = [[.0145, 200000], [.0235, INF]];

var Cal_Income = [];


var COUNTRIES = [
  {
    'name': 'United States (no State income tax)',
    'details': 'single-filing status',
    'brackets': [
      ['National Income Tax', US_Income],
      ['Social Security', US_SocialSec],
      ['Medicare', US_Medicare]
    ],
    'desc': '',
    'sources': [
      'http://taxfoundation.org/article/2016-tax-brackets',
      'https://www.ssa.gov/news/press/factsheets/colafacts2016.html'
    ],
  },
  // {
  //   'name': 'United States (California - highest income tax)',
  //   'brackets': [],
  //   'desc': ['http://taxfoundation.org/article/2016-tax-brackets'],
  // },
  {
    'name': 'Sweden',
    'brackets': [
      ['National Income Tax', [[0, 413200], [.2, 591600], [.25, INF]]],
      ['Municipality Tax at 28.89% (can be 28.89-34.32 depending on municipality)', [[.2889, INF]]],
    ],
    'dollarsPerUnit': .12,
    'desc': '',
    'sources': ['https://sweden.se/society/why-swedes-are-okay-with-paying-taxes/']
  },
  {
    'name': 'Canada (Ontario)',
    'brackets': [
      ['National Income Tax', [[.15, 45282], [.205, 90563], [.26, 140388],
			      [.29, 200000], [.33, INF]]],
      ['Ontario Provincial Tax', [[.0505, 40120], [.0915, 80242],
				 [.1116, 150000], [.1216, 220000], [.1316, INF]]]
    ],
    'dollarsPerUnit': .77,
    'desc': [],
    'sources': ['http://turbotax.intuit.ca/tax-resources/taxes-ontario.jsp', ]
  },
  // Australia
];

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
	'px;background:' + COLORS[j] + ';">';
      var emHeight =  h / emH;
      if (emHeight >= 1.0)
	graphBarsString += '<p>' + country.brackets[j][0] + '</p></div>';
      else
	graphBarsString += '</div>';

    }
    graphBarsString += '<div class="bar-remainder"><p>After Tax Income: <br/>' +
      '<span class="after-tax">' + moneyPrint((1-totalEffectiveRate)*income) +
      '</span></div>';
    graph.append('<div class="graph-column">' +  graphBarsString + '</div>');
    graph.append(spacer);
    labels.append('<div class="graph-label">' + country.name + '</div>');
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
});
