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
    'name': 'United States (not including state income tax)',
    'details': 'single-filing status',
    'brackets': [
      ['National Income Tax', US_Income],
      ['Social Security', US_SocialSec],
      ['Medicare', US_Medicare]
    ],
    'desc': "Income-tax free states include Alaska, Florida, Nevada, South Dakota, Texas, Washington, and Wyoming.  New Hampshire and Tennessee don't tax wage income, but do tax interest and capital gains.</p><p>In the United States, the wealthiest 10 percent own roughly 75 percent of the personal wealth, but earn just under 50 percent of income.  In the US, tax revenue is 26.9% of GDP.  The US has a long-term capital gains tax rate of 15-20%.",
    'ppb': '599,569',
    'mill_p': '4.5',
    'sources': [
      'http://taxfoundation.org/article/2016-tax-brackets',
      'https://www.ssa.gov/news/press/factsheets/colafacts2016.html',
      'http://www.businessinsider.com/countries-ranked-by-billionaires-in-proportion-to-population-2015-7?r=UK&IR=T',
      'https://ttlc.intuit.com/questions/1901267-which-states-don-t-have-income-tax',
      'https://www.washingtonpost.com/opinions/robert-samuelson-the-millionaires-club-expands/2014/10/22/04fcd128-5a01-11e4-8264-deed989ae9a2_story.html'
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
    'desc': 'While CA has the highest maximum income tax rate of any US state, all but 9 US states have some income tax.',
    'ppb': '349,550',
    'mill_p': '',
    'sources': [
      'http://taxfoundation.org/article/2016-tax-brackets',
      'http://www.tax-brackets.org/californiataxtable',
      'https://www.ssa.gov/news/press/factsheets/colafacts2016.html',
      'https://en.wikipedia.org/wiki/List_of_U.S._states_by_the_number_of_billionaires'
    ],
  },
  {
    'name': 'Sweden',
    'brackets': [
      ['National Income Tax', [[0, 413200], [.2, 591600], [.25, INF]]],
      ['Municipality Tax at 28.89% (can be 28.89-34.32 depending on municipality)', [[.2889, INF]]],
    ],
    'dollarsPerUnit': .12,
    'ppb': '425,411',
    'mill_p': '14.3',
    'desc': 'The wealthiest 10% own 69% of personal wealth.  In Sweden, tax revenue is 45.8% of GDp.  Sweden also has a flat capital gains tax of 30%.  They also have a high value added tax (similar to sales tax) of 25% for most goods, 12% for food and services.',
    'sources': [
      'https://sweden.se/society/why-swedes-are-okay-with-paying-taxes/',
      'http://www.businessinsider.com/countries-ranked-by-billionaires-in-proportion-to-population-2015-7?r=UK&IR=T',
      'https://www.washingtonpost.com/opinions/robert-samuelson-the-millionaires-club-expands/2014/10/22/04fcd128-5a01-11e4-8264-deed989ae9a2_story.html',
      'http://sverigesradio.se/sida/artikel.aspx?programid=2054&artikel=5568950',
      'https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=sweden%20sales%20tax'
    ]
  },
  {
    'name': 'Canada',
    'brackets': [
      ['National Income Tax', [[.15, 45282], [.205, 90563], [.26, 140388],
			      [.29, 200000], [.33, INF]]],
      ['Ontario Provincial Tax', [[.0505, 40120], [.0915, 80242],
				 [.1116, 150000], [.1216, 220000], [.1316, INF]]]
    ],
    'dollarsPerUnit': .77,
    'desc': 'Canada has a flat captial gains tax of 50%.  Tax revenue is 32% of GDP.',
    'ppb': '901,538',
    'mill_p': '1.4',
    'sources': [
      'http://turbotax.intuit.ca/tax-resources/taxes-ontario.jsp',
      'https://en.wikipedia.org/wiki/List_of_countries_by_the_number_of_US_dollar_billionaires',
      'http://www.bloomberg.com/news/photo-essays/2011-06-02/twenty-countries-with-the-highest-proportion-of-millionaires'
    ]
  },
  // {
  //   'name': 'France',
  //   'brackets': [
  //     ['National Income Tax', [[0, 14704], [.14, 26791], [.3, 71826], [.41, 152108], [.45, INF]]],
  //     ['Additional Income Tax', [[0, 250000], [.03, 500000], [.04, INF]]],
  //     ['Social Charges', [[.08, INF]]],
  //   ],
  //   'dollarsPerUnit': 1.13,
  //   'desc': 'French tax law includes many tax breaks and minimum thresholds such that, in practice, ewer than 50% of people living in France pay any income tax at all. French municipaliteis and provincial income taxes are not included, but they appear to be very small compared to the National Income tax.',
  //   'ppb': '1,404,893',
  //   'mill_p': '',
  //   'sources': [
  //     'https://en.wikipedia.org/wiki/List_of_countries_by_the_number_of_US_dollar_billionaires',
  //     'http://www.french-property.com/guides/france/finance-taxation/taxation/calculation-tax-liability/rates/',
  //   ]
  // },
  // {
  //   'name': 'Australia',
  //   'brackets': [

  //   ],
  //   'dollarsPerUnit': 1,
  //   'desc': '',
  //   'ppb': '856,667',
  //   'mill_p': '',
  //   'sources': [
  //     'https://en.wikipedia.org/wiki/List_of_countries_by_the_number_of_US_dollar_billionaires',
  //   ]
  // },
];
