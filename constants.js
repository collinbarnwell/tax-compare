var GRAPH_HEIGHT;
// var COLORS = ['green', 'red', 'blue', 'yellow', 'cyan'];
var COLORS = ['#FF4017', '#12C153', '#FF8417', 'yellow', '#FF2C00', '#00E154', '#FF7800']

var INF = 1000000000000000; // one quadrillion

var US_Income = [[.1, 9275], [.15, 37650], [.25, 91150], [.28, 190150],
	    [.33, 413350], [.35, 415050], [.396, INF]];
var US_SocialSec = [[.0620, 118500]];
var US_Medicare = [[.0145, 200000], [.0235, INF]];
var US_CA = [[.01, 7582], [.02, 17976], [.04, 28371], [.06, 39384], [.08, 49774], [.093, 254250], [.103, 305100], [.113, 508500], [.123, 1000000], [.133, INF]];

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
  {
    'name': 'United States (California - highest income tax)',
    'brackets': [
      ['National Income Tax', US_Income],
      ['CA Income Tax', US_CA],
      ['Social Security', US_SocialSec],
      ['Medicare', US_Medicare],
    ],
    'desc': '',
    'sources': ['http://taxfoundation.org/article/2016-tax-brackets', 'http://www.tax-brackets.org/californiataxtable', 'https://www.ssa.gov/news/press/factsheets/colafacts2016.html'],
  },
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
