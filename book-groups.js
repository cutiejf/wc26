/* book-groups.js — FIFA World Cup 2026 group data + live renderer */
(function () {
  'use strict';

  /* ── Team registry ──────────────────────────────────────────────── */
  // fifa: FIFA/Coca‑Cola Men's World Ranking editions, most recent first.
  //       Used as tiebreaker (d→e→f) for best-8 third-place selection.
  //       Update these arrays before each tournament with the two most
  //       recently published editions (lower number = better rank).
  // Playoff slots have no ranking until confirmed; set to 999.
  var T = {
    MEX: { name: 'Mexico',        code: 'mx',     fifa: [16, 18] },
    RSA: { name: 'S. Africa',     code: 'za',     fifa: [57, 57] },
    KOR: { name: 'Korea Rep.',    code: 'kr',     fifa: [22, 24] },
    POD: { name: 'Playoff D',     code: null,     fifa: [999,999] },
    CAN: { name: 'Canada',        code: 'ca',     fifa: [20, 19] },
    SUI: { name: 'Switzerland',   code: 'ch',     fifa: [19, 21] },
    QAT: { name: 'Qatar',         code: 'qa',     fifa: [38, 37] },
    POB: { name: 'Playoff B',     code: null,     fifa: [999,999] },
    BRA: { name: 'Brazil',        code: 'br',     fifa: [5,  3 ] },
    MAR: { name: 'Morocco',       code: 'ma',     fifa: [13, 13] },
    SCO: { name: 'Scotland',      code: 'gb-sct', fifa: [29, 30] },
    HAI: { name: 'Haiti',         code: 'ht',     fifa: [97, 94] },
    USA: { name: 'USA',           code: 'us',     fifa: [11, 12] },
    PAR: { name: 'Paraguay',      code: 'py',     fifa: [55, 55] },
    AUS: { name: 'Australia',     code: 'au',     fifa: [23, 23] },
    POA: { name: 'Playoff A',     code: null,     fifa: [999,999] },
    GER: { name: 'Germany',       code: 'de',     fifa: [12, 14] },
    CIV: { name: "C. d'Ivoire",   code: 'ci',     fifa: [51, 54] },
    ECU: { name: 'Ecuador',       code: 'ec',     fifa: [43, 44] },
    CUW: { name: 'Curaçao',       code: 'cw',     fifa: [84, 82] },
    NED: { name: 'Netherlands',   code: 'nl',     fifa: [8,  8 ] },
    JPN: { name: 'Japan',         code: 'jp',     fifa: [15, 15] },
    TUN: { name: 'Tunisia',       code: 'tn',     fifa: [28, 27] },
    POC: { name: 'Playoff C',     code: null,     fifa: [999,999] },
    BEL: { name: 'Belgium',       code: 'be',     fifa: [7,  7 ] },
    IRN: { name: 'IR Iran',       code: 'ir',     fifa: [21, 20] },
    NZL: { name: 'New Zealand',   code: 'nz',     fifa: [110,112] },
    EGY: { name: 'Egypt',         code: 'eg',     fifa: [37, 38] },
    ESP: { name: 'Spain',         code: 'es',     fifa: [3,  4 ] },
    KSA: { name: 'Saudi Arabia',  code: 'sa',     fifa: [56, 54] },
    URU: { name: 'Uruguay',       code: 'uy',     fifa: [14, 17] },
    CPV: { name: 'Cabo Verde',    code: 'cv',     fifa: [83, 80] },
    FRA: { name: 'France',        code: 'fr',     fifa: [2,  2 ] },
    NOR: { name: 'Norway',        code: 'no',     fifa: [24, 25] },
    SEN: { name: 'Senegal',       code: 'sn',     fifa: [18, 19] },
    POE: { name: 'Playoff E',     code: null,     fifa: [999,999] },
    ARG: { name: 'Argentina',     code: 'ar',     fifa: [1,  1 ] },
    ALG: { name: 'Algeria',       code: 'dz',     fifa: [34, 36] },
    JOR: { name: 'Jordan',        code: 'jo',     fifa: [88, 88] },
    AUT: { name: 'Austria',       code: 'at',     fifa: [25, 26] },
    POR: { name: 'Portugal',      code: 'pt',     fifa: [6,  6 ] },
    COL: { name: 'Colombia',      code: 'co',     fifa: [9,  10] },
    UZB: { name: 'Uzbekistan',    code: 'uz',     fifa: [71, 73] },
    POF: { name: 'Playoff F',     code: null,     fifa: [999,999] },
    ENG: { name: 'England',       code: 'gb-eng', fifa: [4,  5 ] },
    CRO: { name: 'Croatia',       code: 'hr',     fifa: [10, 9 ] },
    GHA: { name: 'Ghana',         code: 'gh',     fifa: [59, 62] },
    PAN: { name: 'Panama',        code: 'pa',     fifa: [40, 41] }
  };

  /* ── Group definitions (teams in seeded order, all matches) ──────── */
  var GROUPS = {
    A: {
      teams: ['MEX','RSA','KOR','POD'],
      matches: [
        {id:1,  date:'Jun 11', time:'3:00p',   h:'MEX', a:'RSA', hs:2, as:1},
        {id:2,  date:'Jun 11', time:'10:00p',  h:'KOR', a:'POD', hs:3, as:0},
        {id:25, date:'Jun 18', time:'12:00p',  h:'POD', a:'RSA', hs:'', as:''},
        {id:28, date:'Jun 18', time:'9:00p',   h:'MEX', a:'KOR', hs:'', as:''},
        {id:53, date:'Jun 24', time:'9:00p',   h:'POD', a:'MEX', hs:'', as:''},
        {id:54, date:'Jun 24', time:'9:00p',   h:'RSA', a:'KOR', hs:'', as:''}
      ]
    },
    B: {
      teams: ['CAN','SUI','QAT','POB'],
      matches: [
        {id:3,  date:'Jun 12', time:'3:00p',   h:'CAN', a:'POB', hs:'', as:''},
        {id:8,  date:'Jun 13', time:'3:00p',   h:'QAT', a:'SUI', hs:'', as:''},
        {id:26, date:'Jun 18', time:'3:00p',   h:'SUI', a:'POB', hs:'', as:''},
        {id:27, date:'Jun 18', time:'6:00p',   h:'CAN', a:'QAT', hs:'', as:''},
        {id:51, date:'Jun 24', time:'3:00p',   h:'SUI', a:'CAN', hs:'', as:''},
        {id:52, date:'Jun 24', time:'3:00p',   h:'POB', a:'QAT', hs:'', as:''}
      ]
    },
    C: {
      teams: ['BRA','MAR','SCO','HAI'],
      matches: [
        {id:7,  date:'Jun 13', time:'6:00p',   h:'BRA', a:'MAR', hs:'', as:''},
        {id:5,  date:'Jun 13', time:'9:00p',   h:'HAI', a:'SCO', hs:'', as:''},
        {id:30, date:'Jun 19', time:'6:00p',   h:'SCO', a:'MAR', hs:'', as:''},
        {id:29, date:'Jun 19', time:'9:00p',   h:'BRA', a:'HAI', hs:'', as:''},
        {id:49, date:'Jun 24', time:'6:00p',   h:'SCO', a:'BRA', hs:'', as:''},
        {id:50, date:'Jun 24', time:'6:00p',   h:'MAR', a:'HAI', hs:'', as:''}
      ]
    },
    D: {
      teams: ['USA','PAR','AUS','POA'],
      matches: [
        {id:4,  date:'Jun 12', time:'9:00p',   h:'USA', a:'PAR', hs:'', as:''},
        {id:6,  date:'Jun 13', time:'11:59p',  h:'AUS', a:'POA', hs:'', as:''},
        {id:32, date:'Jun 19', time:'3:00p',   h:'USA', a:'AUS', hs:'', as:''},
        {id:31, date:'Jun 19', time:'11:59p',  h:'POA', a:'PAR', hs:'', as:''},
        {id:59, date:'Jun 25', time:'10:00p',  h:'POA', a:'USA', hs:'', as:''},
        {id:60, date:'Jun 25', time:'10:00p',  h:'PAR', a:'AUS', hs:'', as:''}
      ]
    },
    E: {
      teams: ['GER','CIV','ECU','CUW'],
      matches: [
        {id:10, date:'Jun 14', time:'1:00p',   h:'GER', a:'CUW', hs:'', as:''},
        {id:9,  date:'Jun 14', time:'7:00p',   h:'CIV', a:'ECU', hs:'', as:''},
        {id:33, date:'Jun 20', time:'4:00p',   h:'GER', a:'CIV', hs:'', as:''},
        {id:34, date:'Jun 20', time:'8:00p',   h:'ECU', a:'CUW', hs:'', as:''},
        {id:56, date:'Jun 25', time:'4:00p',   h:'ECU', a:'GER', hs:'', as:''},
        {id:55, date:'Jun 25', time:'4:00p',   h:'CUW', a:'CIV', hs:'', as:''}
      ]
    },
    F: {
      teams: ['NED','JPN','TUN','POC'],
      matches: [
        {id:11, date:'Jun 14', time:'4:00p',   h:'NED', a:'JPN', hs:'', as:''},
        {id:12, date:'Jun 14', time:'10:00p',  h:'POC', a:'TUN', hs:'', as:''},
        {id:35, date:'Jun 20', time:'1:00p',   h:'NED', a:'POC', hs:'', as:''},
        {id:36, date:'Jun 20', time:'11:59p',  h:'TUN', a:'JPN', hs:'', as:''},
        {id:57, date:'Jun 25', time:'7:00p',   h:'JPN', a:'POC', hs:'', as:''},
        {id:58, date:'Jun 25', time:'7:00p',   h:'TUN', a:'NED', hs:'', as:''}
      ]
    },
    G: {
      teams: ['BEL','IRN','NZL','EGY'],
      matches: [
        {id:16, date:'Jun 15', time:'3:00p',   h:'BEL', a:'EGY', hs:'', as:''},
        {id:15, date:'Jun 15', time:'9:00p',   h:'IRN', a:'NZL', hs:'', as:''},
        {id:39, date:'Jun 21', time:'3:00p',   h:'BEL', a:'IRN', hs:'', as:''},
        {id:40, date:'Jun 21', time:'9:00p',   h:'NZL', a:'EGY', hs:'', as:''},
        {id:63, date:'Jun 26', time:'11:00p',  h:'EGY', a:'IRN', hs:'', as:''},
        {id:64, date:'Jun 26', time:'11:00p',  h:'NZL', a:'BEL', hs:'', as:''}
      ]
    },
    H: {
      teams: ['ESP','KSA','URU','CPV'],
      matches: [
        {id:14, date:'Jun 15', time:'12:00p',  h:'ESP', a:'CPV', hs:'', as:''},
        {id:13, date:'Jun 15', time:'6:00p',   h:'KSA', a:'URU', hs:'', as:''},
        {id:38, date:'Jun 21', time:'12:00p',  h:'ESP', a:'KSA', hs:'', as:''},
        {id:37, date:'Jun 21', time:'6:00p',   h:'URU', a:'CPV', hs:'', as:''},
        {id:65, date:'Jun 26', time:'8:00p',   h:'CPV', a:'KSA', hs:'', as:''},
        {id:66, date:'Jun 26', time:'8:00p',   h:'URU', a:'ESP', hs:'', as:''}
      ]
    },
    I: {
      teams: ['FRA','NOR','SEN','POE'],
      matches: [
        {id:17, date:'Jun 16', time:'3:00p',   h:'FRA', a:'SEN', hs:'', as:''},
        {id:18, date:'Jun 16', time:'6:00p',   h:'POE', a:'NOR', hs:'', as:''},
        {id:42, date:'Jun 22', time:'5:00p',   h:'FRA', a:'POE', hs:'', as:''},
        {id:41, date:'Jun 22', time:'8:00p',   h:'NOR', a:'SEN', hs:'', as:''},
        {id:61, date:'Jun 26', time:'3:00p',   h:'NOR', a:'FRA', hs:'', as:''},
        {id:62, date:'Jun 26', time:'3:00p',   h:'SEN', a:'POE', hs:'', as:''}
      ]
    },
    J: {
      teams: ['ARG','ALG','JOR','AUT'],
      matches: [
        {id:19, date:'Jun 16', time:'9:00p',   h:'ARG', a:'ALG', hs:'', as:''},
        {id:20, date:'Jun 16', time:'11:59p',  h:'AUT', a:'JOR', hs:'', as:''},
        {id:43, date:'Jun 22', time:'1:00p',   h:'ARG', a:'AUT', hs:'', as:''},
        {id:44, date:'Jun 22', time:'11:00p',  h:'JOR', a:'ALG', hs:'', as:''},
        {id:69, date:'Jun 27', time:'10:00p',  h:'ALG', a:'AUT', hs:'', as:''},
        {id:70, date:'Jun 27', time:'10:00p',  h:'JOR', a:'ARG', hs:'', as:''}
      ]
    },
    K: {
      teams: ['POR','COL','UZB','POF'],
      matches: [
        {id:23, date:'Jun 17', time:'1:00p',   h:'POR', a:'POF', hs:'', as:''},
        {id:24, date:'Jun 17', time:'10:00p',  h:'UZB', a:'COL', hs:'', as:''},
        {id:47, date:'Jun 23', time:'1:00p',   h:'POR', a:'UZB', hs:'', as:''},
        {id:48, date:'Jun 23', time:'10:00p',  h:'COL', a:'POF', hs:'', as:''},
        {id:71, date:'Jun 27', time:'7:30p',   h:'COL', a:'POR', hs:'', as:''},
        {id:72, date:'Jun 27', time:'7:30p',   h:'POF', a:'UZB', hs:'', as:''}
      ]
    },
    L: {
      teams: ['ENG','CRO','GHA','PAN'],
      matches: [
        {id:21, date:'Jun 17', time:'4:00p',   h:'ENG', a:'CRO', hs:'', as:''},
        {id:22, date:'Jun 17', time:'7:00p',   h:'GHA', a:'PAN', hs:'', as:''},
        {id:45, date:'Jun 23', time:'4:00p',   h:'ENG', a:'GHA', hs:'', as:''},
        {id:46, date:'Jun 23', time:'7:00p',   h:'PAN', a:'CRO', hs:'', as:''},
        {id:67, date:'Jun 27', time:'5:00p',   h:'PAN', a:'ENG', hs:'', as:''},
        {id:68, date:'Jun 27', time:'5:00p',   h:'CRO', a:'GHA', hs:'', as:''}
      ]
    }
  };

  /* ── City lookup (by match id) ──────────────────────────────────── */
  var CITY = {
    1:'Mexico City',    2:'Zapopan',         3:'Toronto',         4:'Inglewood',
    5:'Foxborough',     6:'Vancouver',        7:'E. Rutherford',   8:'Santa Clara',
    9:'Philadelphia',  10:'Houston',         11:'Arlington',      12:'Guadalupe',
   13:'Miami',        14:'Atlanta',         15:'Inglewood',      16:'Seattle',
   17:'E. Rutherford',  18:'Foxborough',     19:'Kansas City',    20:'Santa Clara',
   21:'Arlington',     22:'Toronto',         23:'Houston',        24:'Mexico City',
   25:'Atlanta',       26:'Inglewood',       27:'Vancouver',      28:'Zapopan',
   29:'Philadelphia',  30:'Foxborough',      31:'Santa Clara',    32:'Seattle',
   33:'Toronto',       34:'Kansas City',     35:'Houston',        36:'Guadalupe',
   37:'Miami',        38:'Atlanta',         39:'Inglewood',      40:'Vancouver',
   41:'E. Rutherford',  42:'Philadelphia',   43:'Arlington',      44:'Santa Clara',
   45:'Foxborough',    46:'Toronto',         47:'Houston',        48:'Zapopan',
   49:'Miami',        50:'Atlanta',         51:'Vancouver',      52:'Seattle',
   53:'Mexico City',   54:'Guadalupe',       55:'Philadelphia',   56:'E. Rutherford',
   57:'Arlington',     58:'Kansas City',     59:'Inglewood',      60:'Santa Clara',
   61:'Foxborough',    62:'Toronto',         63:'Seattle',        64:'Vancouver',
   65:'Houston',       66:'Zapopan',         67:'E. Rutherford',  68:'Philadelphia',
   69:'Kansas City',   70:'Arlington',       71:'Miami',          72:'Atlanta'
  };

  /* ── Short city names for all-matches pages ─────────────────────── */
  var CITY_SHORT = {
    1:'MXC',  2:'ZAP',  3:'TOR',  4:'LA',
    5:'BOS',  6:'VAN',  7:'NY',   8:'STC',
    9:'PHI', 10:'HOU', 11:'ARL', 12:'GUA',
   13:'MIA', 14:'ATL', 15:'LA',  16:'SEA',
   17:'NY',  18:'BOS', 19:'KC',  20:'STC',
   21:'ARL', 22:'TOR', 23:'HOU', 24:'MXC',
   25:'ATL', 26:'LA',  27:'VAN', 28:'ZAP',
   29:'PHI', 30:'BOS', 31:'STC', 32:'SEA',
   33:'TOR', 34:'KC',  35:'HOU', 36:'GUA',
   37:'MIA', 38:'ATL', 39:'LA',  40:'VAN',
   41:'NY',  42:'PHI', 43:'ARL', 44:'STC',
   45:'BOS', 46:'TOR', 47:'HOU', 48:'ZAP',
   49:'MIA', 50:'ATL', 51:'VAN', 52:'SEA',
   53:'MXC', 54:'GUA', 55:'PHI', 56:'NY',
   57:'ARL', 58:'KC',  59:'LA',  60:'STC',
   61:'BOS', 62:'TOR', 63:'SEA', 64:'VAN',
   65:'HOU', 66:'ZAP', 67:'NY',  68:'PHI',
   69:'KC',  70:'ARL', 71:'MIA', 72:'ATL'
  };

  /* ── Day-of-week lookup ─────────────────────────────────────────── */
  var DOW = {
    'Jun 11':'Thu','Jun 12':'Fri','Jun 13':'Sat','Jun 14':'Sun',
    'Jun 15':'Mon','Jun 16':'Tue','Jun 17':'Wed','Jun 18':'Thu',
    'Jun 19':'Fri','Jun 20':'Sat','Jun 21':'Sun','Jun 22':'Mon',
    'Jun 23':'Tue','Jun 24':'Wed','Jun 25':'Thu','Jun 26':'Fri',
    'Jun 27':'Sat','Jun 28':'Sun','Jun 29':'Mon','Jun 30':'Tue',
    'Jul 1':'Wed','Jul 2':'Thu','Jul 3':'Fri','Jul 4':'Sat',
    'Jul 5':'Sun','Jul 6':'Mon','Jul 7':'Tue','Jul 8':'Wed',
    'Jul 9':'Thu','Jul 10':'Fri','Jul 11':'Sat','Jul 12':'Sun',
    'Jul 13':'Mon','Jul 14':'Tue','Jul 15':'Wed','Jul 16':'Thu',
    'Jul 17':'Fri','Jul 18':'Sat','Jul 19':'Sun'
  };

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function flagImg(code, cls) {
    var c = cls || 'grp-flag';
    if (!code) return '<span class="grp-flag-ph"></span>';
    return '<img src="node_modules/flag-icons/flags/4x3/' + code + '.svg"'
      + ' class="' + c + '" width="20" height="14"'
      + ' onerror="this.style.visibility=\'hidden\'">';
  }

  function fmtTime(t) { return t.replace(/(\d)(a|p)$/i, '$1 $2'); }

  function getMatchById(matchId) {
    var id = parseInt(matchId);
    // Check group matches
    for (var gk in GROUPS) {
      var matches = GROUPS[gk].matches;
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].id === id) return matches[i];
      }
    }
    // Check knockout matches
    for (var stage in KNOCKOUT) {
      var matches = KNOCKOUT[stage];
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].id === id) return matches[i];
      }
    }
    return null;
  }

  function scoreBox(matchId, side) {
    var match = getMatchById(matchId);
    var score = '';
    if (match) {
      var val = side === 'h' ? match.hs : match.as;
      score = (val !== undefined && val !== '') ? val : '';
    }
    return '<span class="sb">' + score + '</span>';
  }

  function statCell(teamKey, stat, calcValue) {
    var k = 'st-' + teamKey + '-' + stat;
    var value = calcValue !== undefined ? calcValue : '0';
    return '<td class="c-stat auto-calc" data-stat="' + stat + '" data-team="' + teamKey + '">'
      + value + '</td>';
  }

  function calculateStandings(groupKey) {
    var g = GROUPS[groupKey];
    if (!g) return {};
    
    var stats = {};
    g.teams.forEach(function (tkey) {
      // fp = fair-play score (≤0). Criteria (art.13 §1 step 2):
      //   yellow: -1 | indirect red (2nd yellow): -3 | direct red: -4 | yellow+direct red: -5
      // Set hfp/afp on each match object as a pre-calculated negative integer.
      stats[tkey] = { gp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, fp: 0 };
    });

    g.matches.forEach(function (m) {
      if (m.hs === undefined || m.as === undefined || m.hs === '' || m.as === '') return; // skip if no scores entered
      
      var hGoals = parseInt(m.hs) || 0;
      var aGoals = parseInt(m.as) || 0;
      
      var ht = m.h;
      var at = m.a;
      
      if (stats[ht] && stats[at]) {
        stats[ht].gp++;
        stats[at].gp++;
        stats[ht].gf += hGoals;
        stats[ht].ga += aGoals;
        stats[at].gf += aGoals;
        stats[at].ga += hGoals;
        
        if (hGoals > aGoals) {
          stats[ht].w++;
          stats[ht].pts += 3;
          stats[at].l++;
        } else if (aGoals > hGoals) {
          stats[at].w++;
          stats[at].pts += 3;
          stats[ht].l++;
        } else {
          stats[ht].d++;
          stats[at].d++;
          stats[ht].pts += 1;
          stats[at].pts += 1;
        }
        
        stats[ht].gd = stats[ht].gf - stats[ht].ga;
        stats[at].gd = stats[at].gf - stats[at].ga;

        // Accumulate fair-play penalties (hfp/afp are optional negative integers)
        stats[ht].fp += (m.hfp !== undefined && m.hfp !== '') ? (parseInt(m.hfp) || 0) : 0;
        stats[at].fp += (m.afp !== undefined && m.afp !== '') ? (parseInt(m.afp) || 0) : 0;
      }
    });
    
    return stats;
  }

  function updateGroupStandings(groupKey) {
    var standings = calculateStandings(groupKey);
    var g = GROUPS[groupKey];
    if (!g) return;
    
    g.teams.forEach(function (tkey) {
      var st = standings[tkey] || { gp:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0 };
      ['gp', 'w', 'd', 'l', 'gf', 'ga', 'gd', 'pts'].forEach(function (stat) {
        var cell = document.querySelector('[data-team="' + tkey + '"][data-stat="' + stat + '"]');
        if (cell) {
          cell.textContent = st[stat];
        }
      });
    });
  }

  function findGroupByMatchId(matchId) {
    var id = parseInt(matchId);
    for (var gk in GROUPS) {
      var matches = GROUPS[gk].matches;
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].id === id) return gk;
      }
    }
    return null;
  }

  /* ── Knockout Team Resolution ───────────────────────────────────────── */
  function getGroupRanking(groupKey) {
    var standings = calculateStandings(groupKey);
    var g = GROUPS[groupKey];
    if (!g) return [];
    
    var ranked = g.teams.map(function(tkey) {
      var st = standings[tkey] || { gp:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0 };
      return { team: tkey, pts: st.pts, gd: st.gd, gf: st.gf };
    });
    
    // Sort by pts desc, gd desc, gf desc
    ranked.sort(function(a, b) {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });
    
    return ranked.map(function(r) { return r.team; });
  }

  // Official third-place allocation combinations (495 scenarios)
  // Format: [qualified groups as string, allocation map for 1A,1B,1D,1E,1G,1I,1K,1L]
  var THIRD_PLACE_COMBOS = [
    ['ABDEGIKL','E','J','I','F','H','G','L','K'],['ABDEGIJL','H','G','I','D','J','F','L','K'],
    ['ABDEGIJL','E','J','I','D','H','G','L','K'],['ABDEGIJL','E','J','I','D','H','F','L','K'],
    ['ABDEGIJL','E','G','I','D','J','F','L','K'],['ABDEGIJL','E','G','J','D','H','F','L','K'],
    ['ABDEGIJL','E','G','I','D','H','F','L','K'],['ABDEGIJL','E','G','J','D','H','F','L','I'],
    ['ABDEGIJL','E','G','J','D','H','F','I','K'],['ABCEGIKL','H','G','I','C','J','F','L','K'],
    ['ABCEGIJL','E','J','I','C','H','G','L','K'],['ABCEGIJL','E','J','I','C','H','F','L','K'],
    ['ABCEGIJL','E','G','I','C','J','F','L','K'],['ABCEGIJL','E','G','J','C','H','F','L','K'],
    ['ABCEGIJL','E','G','I','C','H','F','L','K'],['ABCEGIJL','E','G','J','C','H','F','L','I'],
    ['ABCEGIJL','E','G','J','C','H','F','I','K'],['ABCEGIJL','H','G','I','C','J','D','L','K'],
    ['ABCDGIJL','C','J','I','D','H','F','L','K'],['ABCDGIJL','C','G','I','D','J','F','L','K'],
    ['ABCDGIJL','C','G','J','D','H','F','L','K'],['ABCDGIJL','C','G','I','D','H','F','L','K'],
    ['ABCDGIJL','C','G','J','D','H','F','L','I'],['ABCDGIJL','C','G','J','D','H','F','I','K'],
    ['ABCDGIJL','E','J','I','C','H','D','L','K'],['ABCDGIJL','E','G','I','C','J','D','L','K'],
    ['ABCDGIJL','E','G','J','C','H','D','L','K'],['ABCDGIJL','E','G','I','C','H','D','L','K'],
    ['ABCDGIJL','E','G','J','C','H','D','L','I'],['ABCDGIJL','E','G','J','C','H','D','I','K'],
    ['ABCDEFIL','C','J','E','D','I','F','L','K'],['ABCDEFIL','C','J','E','D','H','F','L','K'],
    ['ABCDEFIL','C','E','I','D','H','F','L','K'],['ABCDEFIL','C','J','E','D','H','F','L','I'],
    ['ABCDEFIL','C','J','E','D','H','F','I','K'],['ABCDEFIL','C','G','E','D','J','F','L','K'],
    ['ABCDEFIL','C','G','E','D','I','F','L','K'],['ABCDEFIL','C','G','E','D','J','F','L','I'],
    ['ABCDEFIL','C','G','E','D','J','F','I','K'],['ABCDEFIL','C','G','E','D','H','F','L','K'],
    ['ABCDEFIL','C','G','J','D','H','F','L','E'],['ABCDEFIL','C','G','J','D','H','F','E','K'],
    ['ABCDEFIL','C','G','E','D','H','F','L','I'],['ABCDEFIL','C','G','E','D','H','F','I','K'],
    ['ABCDEFIL','C','G','J','D','H','F','E','I'],['ABCFGIKL','H','J','B','F','I','G','L','K'],
    ['ABCEFIJL','E','J','I','B','H','G','L','K'],['ABCEFIJL','E','J','B','F','I','H','L','K'],
    ['ABCEFIJL','E','J','B','F','I','G','L','K'],['ABCEFIJL','E','J','B','F','H','G','L','K'],
    ['ABCEFIJL','E','G','B','F','I','H','L','K'],['ABCEFIJL','E','J','B','F','H','G','L','I'],
    ['ABCEFIJL','E','J','B','F','H','G','I','K'],['ABCDFGKL','H','J','B','D','I','G','L','K'],
    ['ABCDFGKL','H','J','B','D','I','F','L','K'],['ABCDFGKL','I','G','B','D','J','F','L','K'],
    ['ABCDFGKL','H','G','B','D','J','F','L','K'],['ABCDFGKL','H','G','B','D','I','F','L','K'],
    ['ABCDFGKL','H','G','B','D','J','F','L','I'],['ABCDFGKL','H','G','B','D','J','F','I','K'],
    ['ABCDFGKL','E','J','B','D','I','H','L','K'],['ABCDFGKL','E','J','B','D','I','G','L','K'],
    ['ABCDFGKL','E','J','B','D','H','G','L','K'],['ABCDFGKL','E','G','B','D','I','H','L','K'],
    ['ABCDFGKL','E','J','B','D','H','G','L','I'],['ABCDFGKL','E','J','B','D','H','G','I','K'],
    ['ABCDFGKL','E','J','B','D','I','F','L','K'],['ABCDFGKL','E','J','B','D','H','F','L','K'],
    ['ABCDFGKL','E','I','B','D','H','F','L','K'],['ABCDFGKL','E','J','B','D','H','F','L','I'],
    ['ABCDFGKL','E','J','B','D','H','F','I','K'],['ABCDFGKL','E','G','B','D','J','F','L','K'],
    ['ABCDFGKL','E','G','B','D','I','F','L','K'],['ABCDFGKL','E','G','B','D','J','F','L','I'],
    ['ABCDFGKL','E','G','B','D','J','F','I','K'],['ABCDFGKL','E','G','B','D','H','F','L','K'],
    ['ABCDFGKL','H','G','B','D','J','F','L','E'],['ABCDFGKL','H','G','B','D','J','F','E','K'],
    ['ABCDFGKL','E','G','B','D','H','F','L','I'],['ABCDFGKL','E','G','B','D','H','F','I','K'],
    ['ABCDFGKL','H','G','B','D','J','F','E','I'],['ABCFGIKL','H','J','B','C','I','G','L','K'],
    ['ABCFGIKL','H','J','B','C','I','F','L','K'],['ABCFGIKL','I','G','B','C','J','F','L','K'],
    ['ABCFGIKL','H','G','B','C','J','F','L','K'],['ABCFGIKL','H','G','B','C','I','F','L','K'],
    ['ABCFGIKL','H','G','B','C','J','F','L','I'],['ABCFGIKL','H','G','B','C','J','F','I','K'],
    ['ABCEFIJL','E','J','B','C','I','H','L','K'],['ABCEFIJL','E','J','B','C','I','G','L','K'],
    ['ABCEFIJL','E','J','B','C','H','G','L','K'],['ABCEFIJL','E','G','B','C','I','H','L','K'],
    ['ABCEFIJL','E','J','B','C','H','G','L','I'],['ABCEFIJL','E','J','B','C','H','G','I','K'],
    ['ABCEFIJL','E','J','B','C','I','F','L','K'],['ABCEFIJL','E','J','B','C','H','F','L','K'],
    ['ABCEFIJL','E','I','B','C','H','F','L','K'],['ABCEFIJL','E','J','B','C','H','F','L','I'],
    ['ABCEFIJL','E','J','B','C','H','F','I','K'],['ABCEFIJL','E','G','B','C','J','F','L','K'],
    ['ABCEFIJL','E','G','B','C','I','F','L','K'],['ABCEFIJL','E','G','B','C','J','F','L','I'],
    ['ABCEFIJL','E','G','B','C','J','F','I','K'],['ABCEFIJL','E','G','B','C','H','F','L','K'],
    ['ABCEFIJL','H','G','B','C','J','F','L','E'],['ABCEFIJL','H','G','B','C','J','F','E','K'],
    ['ABCEFIJL','E','G','B','C','H','F','L','I'],['ABCEFIJL','E','G','B','C','H','F','I','K'],
    ['ABCEFIJL','H','G','B','C','J','F','E','I'],['ABCFGIKL','H','J','B','C','I','D','L','K'],
    ['ABCFGIKL','I','G','B','C','J','D','L','K'],['ABCFGIKL','H','G','B','C','J','D','L','K'],
    ['ABCFGIKL','H','G','B','C','I','D','L','K'],['ABCFGIKL','H','G','B','C','J','D','L','I'],
    ['ABCFGIKL','H','G','B','C','J','D','I','K'],['ABCDFGKL','C','J','B','D','I','F','L','K'],
    ['ABCDFGKL','C','J','B','D','H','F','L','K'],['ABCDFGKL','C','I','B','D','H','F','L','K'],
    ['ABCDFGKL','C','J','B','D','H','F','L','I'],['ABCDFGKL','C','J','B','D','H','F','I','K'],
    ['ABCDFGKL','C','G','B','D','J','F','L','K'],['ABCDFGKL','C','G','B','D','I','F','L','K'],
    ['ABCDFGKL','C','G','B','D','J','F','L','I'],['ABCDFGKL','C','G','B','D','J','F','I','K'],
    ['ABCDFGKL','C','G','B','D','H','F','L','K'],['ABCDFGKL','C','G','B','D','H','F','L','J'],
    ['ABCDFGKL','H','G','B','C','J','F','D','K'],['ABCDFGKL','C','G','B','D','H','F','L','I'],
    ['ABCDFGKL','C','G','B','D','H','F','I','K'],['ABCDFGKL','H','G','B','C','J','F','D','I'],
    ['ABCDEFIL','E','J','B','C','I','D','L','K'],['ABCDEFIL','E','J','B','C','H','D','L','K'],
    ['ABCDEFIL','E','I','B','C','H','D','L','K'],['ABCDEFIL','E','J','B','C','H','D','L','I'],
    ['ABCDEFIL','E','J','B','C','H','D','I','K'],['ABCDEFIL','E','G','B','C','J','D','L','K'],
    ['ABCDEFIL','E','G','B','C','I','D','L','K'],['ABCDEFIL','E','G','B','C','J','D','L','I'],
    ['ABCDEFIL','E','G','B','C','J','D','I','K'],['ABCDEFIL','E','G','B','C','H','D','L','K'],
    ['ABCDEFIL','H','G','B','C','J','D','L','E'],['ABCDEFIL','H','G','B','C','J','D','E','K'],
    ['ABCDEFIL','E','G','B','C','H','D','L','I'],['ABCDEFIL','E','G','B','C','H','D','I','K'],
    ['ABCDEFIL','H','G','B','C','J','D','E','I'],['ABCDEFIL','C','J','B','D','E','F','L','K'],
    ['ABCDEFIL','C','E','B','D','I','F','L','K'],['ABCDEFIL','C','J','B','D','E','F','L','I'],
    ['ABCDEFIL','C','J','B','D','E','F','I','K'],['ABCDEFIL','C','E','B','D','H','F','L','K'],
    ['ABCDEFIL','C','J','B','D','H','F','L','E'],['ABCDEFIL','C','J','B','D','H','F','E','K'],
    ['ABCDEFIL','C','E','B','D','H','F','L','I'],['ABCDEFIL','C','E','B','D','H','F','I','K'],
    ['ABCDEFIL','C','J','B','D','H','F','E','I'],['ABCDEFIL','C','G','B','D','E','F','L','K'],
    ['ABCDEFIL','C','G','B','D','J','F','L','E'],['ABCDEFIL','C','G','B','D','J','F','E','K'],
    ['ABCDEFIL','C','G','B','D','E','F','L','I'],['ABCDEFIL','C','G','B','D','E','F','I','K'],
    ['ABCDEFIL','C','G','B','D','J','F','E','I'],['ABCDEFIL','C','G','B','D','H','F','L','E'],
    ['ABCDEFIL','C','G','B','D','H','F','E','K'],['ABCDEFIL','H','G','B','C','J','F','D','E'],
    ['ABCDEFIL','C','G','B','D','H','F','E','I'],['AFGHIJKL','H','J','I','F','A','G','L','K'],
    ['AEFGHIJL','E','J','I','A','H','G','L','K'],['AEFGHIJL','E','J','I','F','A','H','L','K'],
    ['AEFGHIJL','E','J','I','F','A','G','L','K'],['AEFGHIJL','E','G','J','F','A','H','L','K'],
    ['AEFGHIJL','E','G','I','F','A','H','L','K'],['AEFGHIJL','E','G','J','F','A','H','L','I'],
    ['AEFGHIJL','E','G','J','F','A','H','I','K'],['ADFGHIKL','H','J','I','D','A','G','L','K'],
    ['ADFGHIKL','H','J','I','D','A','F','L','K'],['ADFGHIKL','I','G','J','D','A','F','L','K'],
    ['ADFGHIKL','H','G','J','D','A','F','L','K'],['ADFGHIKL','H','G','I','D','A','F','L','K'],
    ['ADFGHIKL','H','G','J','D','A','F','L','I'],['ADFGHIKL','H','G','J','D','A','F','I','K'],
    ['ADFGHIKL','E','J','I','D','A','H','L','K'],['ADFGHIKL','E','J','I','D','A','G','L','K'],
    ['ADFGHIKL','E','G','J','D','A','H','L','K'],['ADFGHIKL','E','G','I','D','A','H','L','K'],
    ['ADFGHIKL','E','G','J','D','A','H','L','I'],['ADFGHIKL','E','G','J','D','A','H','I','K'],
    ['ADFGHIKL','E','J','I','D','A','F','L','K'],['ADFGHIKL','H','J','E','D','A','F','L','K'],
    ['ADFGHIKL','H','E','I','D','A','F','L','K'],['ADFGHIKL','H','J','E','D','A','F','L','I'],
    ['ADFGHIKL','H','J','E','D','A','F','I','K'],['ADFGHIKL','E','G','J','D','A','F','L','K'],
    ['ADFGHIKL','E','G','I','D','A','F','L','K'],['ADFGHIKL','E','G','J','D','A','F','L','I'],
    ['ADFGHIKL','E','G','J','D','A','F','I','K'],['ADFGHIKL','H','G','E','D','A','F','L','K'],
    ['ADFGHIKL','H','G','J','D','A','F','L','E'],['ADFGHIKL','H','G','J','D','A','F','E','K'],
    ['ADFGHIKL','H','G','E','D','A','F','L','I'],['ADFGHIKL','H','G','E','D','A','F','I','K'],
    ['ADFGHIKL','H','G','J','D','A','F','E','I'],['ACFGHIKL','H','J','I','C','A','G','L','K'],
    ['ACFGHIKL','H','J','I','C','A','F','L','K'],['ACFGHIKL','I','G','J','C','A','F','L','K'],
    ['ACFGHIKL','H','G','J','C','A','F','L','K'],['ACFGHIKL','H','G','I','C','A','F','L','K'],
    ['ACFGHIKL','H','G','J','C','A','F','L','I'],['ACFGHIKL','H','G','J','C','A','F','I','K'],
    ['ACFGHIJL','E','J','I','C','A','H','L','K'],['ACFGHIJL','E','J','I','C','A','G','L','K'],
    ['ACFGHIJL','E','G','J','C','A','H','L','K'],['ACFGHIJL','E','G','I','C','A','H','L','K'],
    ['ACFGHIJL','E','G','J','C','A','H','L','I'],['ACFGHIJL','E','G','J','C','A','H','I','K'],
    ['ACFGHIJL','E','J','I','C','A','F','L','K'],['ACFGHIJL','H','J','E','C','A','F','L','K'],
    ['ACFGHIJL','H','E','I','C','A','F','L','K'],['ACFGHIJL','H','J','E','C','A','F','L','I'],
    ['ACFGHIJL','H','J','E','C','A','F','I','K'],['ACFGHIJL','E','G','J','C','A','F','L','K'],
    ['ACFGHIJL','E','G','I','C','A','F','L','K'],['ACFGHIJL','E','G','J','C','A','F','L','I'],
    ['ACFGHIJL','E','G','J','C','A','F','I','K'],['ACFGHIJL','H','G','E','C','A','F','L','K'],
    ['ACFGHIJL','H','G','J','C','A','F','L','E'],['ACFGHIJL','H','G','J','C','A','F','E','K'],
    ['ACFGHIJL','H','G','E','C','A','F','L','I'],['ACFGHIJL','H','G','E','C','A','F','I','K'],
    ['ACFGHIJL','H','G','J','C','A','F','E','I'],['ACFGHIKL','H','J','I','C','A','D','L','K'],
    ['ACFGHIKL','I','G','J','C','A','D','L','K'],['ACFGHIKL','H','G','J','C','A','D','L','K'],
    ['ACFGHIKL','H','G','I','C','A','D','L','K'],['ACFGHIKL','H','G','J','C','A','D','L','I'],
    ['ACFGHIKL','H','G','J','C','A','D','I','K'],['ACDFGIKL','C','J','I','D','A','F','L','K'],
    ['ACDFGIKL','H','J','F','C','A','D','L','K'],['ACDFGIKL','H','F','I','C','A','D','L','K'],
    ['ACDFGIKL','H','J','F','C','A','D','L','I'],['ACDFGIKL','H','J','F','C','A','D','I','K'],
    ['ACDFGIKL','C','G','J','D','A','F','L','K'],['ACDFGIKL','C','G','I','D','A','F','L','K'],
    ['ACDFGIKL','C','G','J','D','A','F','L','I'],['ACDFGIKL','C','G','J','D','A','F','I','K'],
    ['ACDFGIKL','H','G','F','C','A','D','L','K'],['ACDFGIKL','C','G','J','D','A','F','L','H'],
    ['ACDFGIKL','H','G','J','C','A','F','D','K'],['ACDFGIKL','H','G','F','C','A','D','L','I'],
    ['ACDFGIKL','H','G','F','C','A','D','I','K'],['ACDFGIKL','H','G','J','C','A','F','D','I'],
    ['ACFGHIJL','E','J','I','C','A','D','L','K'],['ACFGHIJL','H','J','E','C','A','D','L','K'],
    ['ACFGHIJL','H','E','I','C','A','D','L','K'],['ACFGHIJL','H','J','E','C','A','D','L','I'],
    ['ACFGHIJL','H','J','E','C','A','D','I','K'],['ACFGHIJL','E','G','J','C','A','D','L','K'],
    ['ACFGHIJL','E','G','I','C','A','D','L','K'],['ACFGHIJL','E','G','J','C','A','D','L','I'],
    ['ACFGHIJL','E','G','J','C','A','D','I','K'],['ACFGHIJL','H','G','E','C','A','D','L','K'],
    ['ACFGHIJL','H','G','J','C','A','D','L','E'],['ACFGHIJL','H','G','J','C','A','D','E','K'],
    ['ACFGHIJL','H','G','E','C','A','D','L','I'],['ACFGHIJL','H','G','E','C','A','D','I','K'],
    ['ACFGHIJL','H','G','J','C','A','D','E','I'],['ACDEFIJL','C','J','E','D','A','F','L','K'],
    ['ACDEFIJL','C','E','I','D','A','F','L','K'],['ACDEFIJL','C','J','E','D','A','F','L','I'],
    ['ACDEFIJL','C','J','E','D','A','F','I','K'],['ACDEFIJL','H','E','F','C','A','D','L','K'],
    ['ACDEFIJL','H','J','F','C','A','D','L','E'],['ACDEFIJL','H','J','E','C','A','F','D','K'],
    ['ACDEFIJL','H','E','F','C','A','D','L','I'],['ACDEFIJL','H','E','F','C','A','D','I','K'],
    ['ACDEFIJL','H','J','E','C','A','F','D','I'],['ACDEFIJL','C','G','E','D','A','F','L','K'],
    ['ACDEFIJL','C','G','J','D','A','F','L','E'],['ACDEFIJL','C','G','J','D','A','F','E','K'],
    ['ACDEFIJL','C','G','E','D','A','F','L','I'],['ACDEFIJL','C','G','E','D','A','F','I','K'],
    ['ACDEFIJL','C','G','J','D','A','F','E','I'],['ACDEFIJL','H','G','F','C','A','D','L','E'],
    ['ACDEFIJL','H','G','E','C','A','F','D','K'],['ACDEFIJL','H','G','J','C','A','F','D','E'],
    ['ACDEFIJL','H','G','E','C','A','F','D','I'],['ABFGHIKL','H','J','B','A','I','G','L','K'],
    ['ABFGHIKL','H','J','B','A','I','F','L','K'],['ABFGHIKL','I','J','B','F','A','G','L','K'],
    ['ABFGHIKL','H','J','B','F','A','G','L','K'],['ABFGHIKL','H','G','B','A','I','F','L','K'],
    ['ABFGHIKL','H','J','B','F','A','G','L','I'],['ABFGHIKL','H','J','B','F','A','G','I','K'],
    ['ABFGHIJL','E','J','B','A','I','H','L','K'],['ABFGHIJL','E','J','B','A','I','G','L','K'],
    ['ABFGHIJL','E','J','B','A','H','G','L','K'],['ABFGHIJL','E','G','B','A','I','H','L','K'],
    ['ABFGHIJL','E','J','B','A','H','G','L','I'],['ABFGHIJL','E','J','B','A','H','G','I','K'],
    ['ABFGHIJL','E','J','B','A','I','F','L','K'],['ABFGHIJL','E','J','B','F','A','H','L','K'],
    ['ABFGHIJL','E','I','B','F','A','H','L','K'],['ABFGHIJL','E','J','B','F','A','H','L','I'],
    ['ABFGHIJL','E','J','B','F','A','H','I','K'],['ABFGHIJL','E','J','B','F','A','G','L','K'],
    ['ABFGHIJL','E','G','B','A','I','F','L','K'],['ABFGHIJL','E','J','B','F','A','G','L','I'],
    ['ABFGHIJL','E','J','B','F','A','G','I','K'],['ABFGHIJL','E','G','B','F','A','H','L','K'],
    ['ABFGHIJL','H','J','B','F','A','G','L','E'],['ABFGHIJL','H','J','B','F','A','G','E','K'],
    ['ABFGHIJL','E','G','B','F','A','H','L','I'],['ABFGHIJL','E','G','B','F','A','H','I','K'],
    ['ABFGHIJL','H','J','B','F','A','G','E','I'],['ABDFGHKL','I','J','B','D','A','H','L','K'],
    ['ABDFGHKL','I','J','B','D','A','G','L','K'],['ABDFGHKL','H','J','B','D','A','G','L','K'],
    ['ABDFGHKL','I','G','B','D','A','H','L','K'],['ABDFGHKL','H','J','B','D','A','G','L','I'],
    ['ABDFGHKL','H','J','B','D','A','G','I','K'],['ABDFGHKL','I','J','B','D','A','F','L','K'],
    ['ABDFGHKL','H','J','B','D','A','F','L','K'],['ABDFGHKL','H','I','B','D','A','F','L','K'],
    ['ABDFGHKL','H','J','B','D','A','F','L','I'],['ABDFGHKL','H','J','B','D','A','F','I','K'],
    ['ABDFGHKL','F','J','B','D','A','G','L','K'],['ABDFGHKL','I','G','B','D','A','F','L','K'],
    ['ABDFGHKL','F','J','B','D','A','G','L','I'],['ABDFGHKL','F','J','B','D','A','G','I','K'],
    ['ABDFGHKL','H','G','B','D','A','F','L','K'],['ABDFGHKL','H','G','B','D','A','F','L','J'],
    ['ABDFGHKL','H','G','B','D','A','F','J','K'],['ABDFGHKL','H','G','B','D','A','F','L','I'],
    ['ABDFGHKL','H','G','B','D','A','F','I','K'],['ABDFGHKL','H','G','B','D','A','F','I','J'],
    ['ABDFGHKL','E','J','B','A','I','D','L','K'],['ABDFGHKL','E','J','B','D','A','H','L','K'],
    ['ABDFGHKL','E','I','B','D','A','H','L','K'],['ABDFGHKL','E','J','B','D','A','H','L','I'],
    ['ABDFGHKL','E','J','B','D','A','H','I','K'],['ABDFGHKL','E','J','B','D','A','G','L','K'],
    ['ABDFGHKL','E','G','B','A','I','D','L','K'],['ABDFGHKL','E','J','B','D','A','G','L','I'],
    ['ABDFGHKL','E','J','B','D','A','G','I','K'],['ABDFGHKL','E','G','B','D','A','H','L','K'],
    ['ABDFGHKL','H','J','B','D','A','G','L','E'],['ABDFGHKL','H','J','B','D','A','G','E','K'],
    ['ABDFGHKL','E','G','B','D','A','H','L','I'],['ABDFGHKL','E','G','B','D','A','H','I','K'],
    ['ABDFGHKL','H','J','B','D','A','G','E','I'],['ABDFGHKL','E','J','B','D','A','F','L','K'],
    ['ABDFGHKL','E','I','B','D','A','F','L','K'],['ABDFGHKL','E','J','B','D','A','F','L','I'],
    ['ABDFGHKL','E','J','B','D','A','F','I','K'],['ABDFGHKL','H','E','B','D','A','F','L','K'],
    ['ABDFGHKL','H','J','B','D','A','F','L','E'],['ABDFGHKL','H','J','B','D','A','F','E','K'],
    ['ABDFGHKL','H','E','B','D','A','F','L','I'],['ABDFGHKL','H','E','B','D','A','F','I','K'],
    ['ABDFGHKL','H','J','B','D','A','F','E','I'],['ABDFGHKL','E','G','B','D','A','F','L','K'],
    ['ABDFGHKL','E','G','B','D','A','F','L','J'],['ABDFGHKL','E','G','B','D','A','F','J','K'],
    ['ABDFGHKL','E','G','B','D','A','F','L','I'],['ABDFGHKL','E','G','B','D','A','F','I','K'],
    ['ABDFGHKL','E','G','B','D','A','F','I','J'],['ABDFGHKL','H','G','B','D','A','F','L','E'],
    ['ABDFGHKL','H','G','B','D','A','F','E','K'],['ABDFGHKL','H','G','B','D','A','F','E','J'],
    ['ABDFGHKL','H','G','B','D','A','F','E','I'],['ABCFGHKL','I','J','B','C','A','H','L','K'],
    ['ABCFGHKL','I','J','B','C','A','G','L','K'],['ABCFGHKL','H','J','B','C','A','G','L','K'],
    ['ABCFGHKL','I','G','B','C','A','H','L','K'],['ABCFGHKL','H','J','B','C','A','G','L','I'],
    ['ABCFGHKL','H','J','B','C','A','G','I','K'],['ABCFGHKL','I','J','B','C','A','F','L','K'],
    ['ABCFGHKL','H','J','B','C','A','F','L','K'],['ABCFGHKL','H','I','B','C','A','F','L','K'],
    ['ABCFGHKL','H','J','B','C','A','F','L','I'],['ABCFGHKL','H','J','B','C','A','F','I','K'],
    ['ABCFGHKL','C','J','B','F','A','G','L','K'],['ABCFGHKL','I','G','B','C','A','F','L','K'],
    ['ABCFGHKL','C','J','B','F','A','G','L','I'],['ABCFGHKL','C','J','B','F','A','G','I','K'],
    ['ABCFGHKL','H','G','B','C','A','F','L','K'],['ABCFGHKL','H','G','B','C','A','F','L','J'],
    ['ABCFGHKL','H','G','B','C','A','F','J','K'],['ABCFGHKL','H','G','B','C','A','F','L','I'],
    ['ABCFGHKL','H','G','B','C','A','F','I','K'],['ABCFGHKL','H','G','B','C','A','F','I','J'],
    ['ABCFGHIJL','E','J','B','A','I','C','L','K'],['ABCFGHIJL','E','J','B','C','A','H','L','K'],
    ['ABCFGHIJL','E','I','B','C','A','H','L','K'],['ABCFGHIJL','E','J','B','C','A','H','L','I'],
    ['ABCFGHIJL','E','J','B','C','A','H','I','K'],['ABCFGHIJL','E','J','B','C','A','G','L','K'],
    ['ABCFGHIJL','E','G','B','A','I','C','L','K'],['ABCFGHIJL','E','J','B','C','A','G','L','I'],
    ['ABCFGHIJL','E','J','B','C','A','G','I','K'],['ABCFGHIJL','E','G','B','C','A','H','L','K'],
    ['ABCFGHIJL','H','J','B','C','A','G','L','E'],['ABCFGHIJL','H','J','B','C','A','G','E','K'],
    ['ABCFGHIJL','E','G','B','C','A','H','L','I'],['ABCFGHIJL','E','G','B','C','A','H','I','K'],
    ['ABCFGHIJL','H','J','B','C','A','G','E','I'],['ABCFGHIJL','E','J','B','C','A','F','L','K'],
    ['ABCFGHIJL','E','I','B','C','A','F','L','K'],['ABCFGHIJL','E','J','B','C','A','F','L','I'],
    ['ABCFGHIJL','E','J','B','C','A','F','I','K'],['ABCFGHIJL','H','E','B','C','A','F','L','K'],
    ['ABCFGHIJL','H','J','B','C','A','F','L','E'],['ABCFGHIJL','H','J','B','C','A','F','E','K'],
    ['ABCFGHIJL','H','E','B','C','A','F','L','I'],['ABCFGHIJL','H','E','B','C','A','F','I','K'],
    ['ABCFGHIJL','H','J','B','C','A','F','E','I'],['ABCFGHIJL','E','G','B','C','A','F','L','K'],
    ['ABCFGHIJL','E','G','B','C','A','F','L','J'],['ABCFGHIJL','E','G','B','C','A','F','J','K'],
    ['ABCFGHIJL','E','G','B','C','A','F','L','I'],['ABCFGHIJL','E','G','B','C','A','F','I','K'],
    ['ABCFGHIJL','E','G','B','C','A','F','I','J'],['ABCFGHIJL','H','G','B','C','A','F','L','E'],
    ['ABCFGHIJL','H','G','B','C','A','F','E','K'],['ABCFGHIJL','H','G','B','C','A','F','E','J'],
    ['ABCFGHIJL','H','G','B','C','A','F','E','I'],['ABCFGHKL','I','J','B','C','A','D','L','K'],
    ['ABCFGHKL','H','J','B','C','A','D','L','K'],['ABCFGHKL','H','I','B','C','A','D','L','K'],
    ['ABCFGHKL','H','J','B','C','A','D','L','I'],['ABCFGHKL','H','J','B','C','A','D','I','K'],
    ['ABCFGHKL','C','J','B','D','A','G','L','K'],['ABCFGHKL','I','G','B','C','A','D','L','K'],
    ['ABCFGHKL','C','J','B','D','A','G','L','I'],['ABCFGHKL','C','J','B','D','A','G','I','K'],
    ['ABCFGHKL','H','G','B','C','A','D','L','K'],['ABCFGHKL','H','G','B','C','A','D','L','J'],
    ['ABCFGHKL','H','G','B','C','A','D','J','K'],['ABCFGHKL','H','G','B','C','A','D','L','I'],
    ['ABCFGHKL','H','G','B','C','A','D','I','K'],['ABCFGHKL','H','G','B','C','A','D','I','J'],
    ['ABCDFGKL','C','J','B','D','A','F','L','K'],['ABCDFGKL','C','I','B','D','A','F','L','K'],
    ['ABCDFGKL','C','J','B','D','A','F','L','I'],['ABCDFGKL','C','J','B','D','A','F','I','K'],
    ['ABCDFGKL','H','F','B','C','A','D','L','K'],['ABCDFGKL','C','J','B','D','A','F','L','H'],
    ['ABCDFGKL','H','J','B','C','A','F','D','K'],['ABCDFGKL','H','F','B','C','A','D','L','I'],
    ['ABCDFGKL','H','F','B','C','A','D','I','K'],['ABCDFGKL','H','J','B','C','A','F','D','I'],
    ['ABCDFGKL','C','G','B','D','A','F','L','K'],['ABCD FGKL','C','G','B','D','A','F','L','J'],
    ['ABCDFGKL','C','G','B','D','A','F','J','K'],['ABCDFGKL','C','G','B','D','A','F','L','I'],
    ['ABCDFGKL','C','G','B','D','A','F','I','K'],['ABCDFGKL','C','G','B','D','A','F','I','J'],
    ['ABCDFGKL','C','G','B','D','A','F','L','H'],['ABCDFGKL','H','G','B','C','A','F','D','K'],
    ['ABCDFGKL','H','G','B','C','A','F','D','J'],['ABCDFGKL','H','G','B','C','A','F','D','I'],
    ['ABCFGHIJL','E','J','B','C','A','D','L','K'],['ABCFGHIJL','E','I','B','C','A','D','L','K'],
    ['ABCFGHIJL','E','J','B','C','A','D','L','I'],['ABCFGHIJL','E','J','B','C','A','D','I','K'],
    ['ABCFGHIJL','H','E','B','C','A','D','L','K'],['ABCFGHIJL','H','J','B','C','A','D','L','E'],
    ['ABCFGHIJL','H','J','B','C','A','D','E','K'],['ABCFGHIJL','H','E','B','C','A','D','L','I'],
    ['ABCFGHIJL','H','E','B','C','A','D','I','K'],['ABCFGHIJL','H','J','B','C','A','D','E','I'],
    ['ABCFGHIJL','E','G','B','C','A','D','L','K'],['ABCFGHIJL','E','G','B','C','A','D','L','J'],
    ['ABCFGHIJL','E','G','B','C','A','D','J','K'],['ABCFGHIJL','E','G','B','C','A','D','L','I'],
    ['ABCFGHIJL','E','G','B','C','A','D','I','K'],['ABCFGHIJL','E','G','B','C','A','D','I','J'],
    ['ABCFGHIJL','H','G','B','C','A','D','L','E'],['ABCFGHIJL','H','G','B','C','A','D','E','K'],
    ['ABCFGHIJL','H','G','B','C','A','D','E','J'],['ABCFGHIJL','H','G','B','C','A','D','E','I'],
    ['ABCDEFIL','C','E','B','D','A','F','L','K'],['ABCDEFIL','C','J','B','D','A','F','L','E'],
    ['ABCDEFIL','C','J','B','D','A','F','E','K'],['ABCDEFIL','C','E','B','D','A','F','L','I'],
    ['ABCDEFIL','C','E','B','D','A','F','I','K'],['ABCDEFIL','C','J','B','D','A','F','E','I'],
    ['ABCDEFIL','H','F','B','C','A','D','L','E'],['ABCDEFIL','H','E','B','C','A','F','D','K'],
    ['ABCDEFIL','H','J','B','C','A','F','D','E'],['ABCDEFIL','H','E','B','C','A','F','D','I'],
    ['ABCDEFIL','C','G','B','D','A','F','L','E'],['ABCDEFIL','C','G','B','D','A','F','E','K'],
    ['ABCDEFIL','C','G','B','D','A','F','E','J'],['ABCDEFIL','C','G','B','D','A','F','E','I'],
    ['ABCDEFIL','H','G','B','C','A','F','D','E']
  ];

  function getThirdPlaceTeams() {
    var thirds = [];
    Object.keys(GROUPS).forEach(function(gk) {
      var ranking = getGroupRanking(gk);
      if (ranking.length >= 3) {
        var standings = calculateStandings(gk);
        var st = standings[ranking[2]] || { gp:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0, fp:0 };
        thirds.push({ group: gk, team: ranking[2], pts: st.pts, gd: st.gd, gf: st.gf, fp: st.fp || 0 });
      }
    });

    // Sort by all 6 official FIFA criteria (art. 13 §1):
    //   a) points  b) goal difference  c) goals scored
    //   d) fair-play score (higher = better, i.e. fewer cards)
    //   e) most recent FIFA/Coca-Cola Men's World Ranking (lower = better)
    //   f) preceding editions of same ranking, cycling until decision
    thirds.sort(function(a, b) {
      if (b.pts !== a.pts) return b.pts - a.pts;          // a)
      if (b.gd  !== a.gd)  return b.gd  - a.gd;          // b)
      if (b.gf  !== a.gf)  return b.gf  - a.gf;          // c)
      if (b.fp  !== a.fp)  return b.fp  - a.fp;          // d) higher fp = fewer cards = better
      // e & f) cycle through FIFA ranking editions (lower number = better rank)
      var ra = (T[a.team] && T[a.team].fifa) ? T[a.team].fifa : [999];
      var rb = (T[b.team] && T[b.team].fifa) ? T[b.team].fifa : [999];
      var maxEditions = Math.max(ra.length, rb.length);
      for (var i = 0; i < maxEditions; i++) {
        var rankA = (ra[i] !== undefined) ? ra[i] : 999;
        var rankB = (rb[i] !== undefined) ? rb[i] : 999;
        if (rankA !== rankB) return rankA - rankB;        // lower rank number = better
      }
      return 0;
    });

    return thirds.slice(0, 8); // Only top 8 qualify
  }

  function getThirdPlaceAllocation() {
    var top8 = getThirdPlaceTeams();
    if (top8.length < 8) return null;
    
    var qualGroups = top8.map(function(t) { return t.group; }).sort().join('');
    
    // Find matching combination
    for (var i = 0; i < THIRD_PLACE_COMBOS.length; i++) {
      if (THIRD_PLACE_COMBOS[i][0] === qualGroups) {
        var allocation = THIRD_PLACE_COMBOS[i];
        return {
          '3CEFHI': allocation[2], // 1A opponent (M79)
          '3EFGIJ': allocation[3], // 1B opponent (M85)
          '3BEFIJ': allocation[4], // 1D opponent (M81)
          '3ABCDF': allocation[5], // 1E opponent (M74)
          '3AEHIJ': allocation[6], // 1G opponent (M82)
          '3CDFGH': allocation[7], // 1I opponent (M77)
          '3DEIJL': allocation[8], // 1K opponent (M87)
          '3EHIJK': allocation[9]  // 1L opponent (M80)
        };
      }
    }
    return null;
  }

  // Prospective allocation for 3rd-place slots during the group stage.
  // Strategy:
  //   A) If 8+ groups have matchday data, rank their current 3rd-place teams,
  //      derive the predicted qualifying combo (e.g. "ABCDEFHI"), and look it
  //      up in the official THIRD_PLACE_COMBOS table — exactly one of the 495
  //      valid outcomes. This guarantees each slot gets a distinct team and the
  //      bracket follows the real FIFA allocation rules.
  //   B) Fewer than 8 groups have data (very early in the tournament): fall
  //      back to a deduplicated greedy pass so no group appears twice.
  function getProspectiveThirdAllocation() {
    var thirds = getThirdPlaceTeams(); // sorted by pts, gd, gf; up to 8
    if (!thirds.length) return {};

    // ── A) Official-table path (preferred) ──────────────────────────────
    if (thirds.length >= 8) {
      var qualGroups = thirds.slice(0, 8)
        .map(function (t) { return t.group; })
        .sort()
        .join('');

      for (var i = 0; i < THIRD_PLACE_COMBOS.length; i++) {
        if (THIRD_PLACE_COMBOS[i][0] === qualGroups) {
          var alloc = THIRD_PLACE_COMBOS[i];
          // indices mirror getThirdPlaceAllocation() exactly
          return {
            '3CEFHI': alloc[2],
            '3EFGIJ': alloc[3],
            '3BEFIJ': alloc[4],
            '3ABCDF': alloc[5],
            '3AEHIJ': alloc[6],
            '3CDFGH': alloc[7],
            '3DEIJL': alloc[8],
            '3EHIJK': alloc[9]
          };
        }
      }
    }

    // ── B) Early-tournament greedy fallback (< 8 groups with data) ──────
    // Still deduplicated so no group/team appears in more than one slot.
    var SLOTS = [
      '3CEFHI', '3EFGIJ', '3BEFIJ', '3ABCDF',
      '3AEHIJ', '3CDFGH', '3DEIJL', '3EHIJK'
    ];
    var result     = {};
    var usedGroups = {};
    thirds.forEach(function (t) {
      for (var i = 0; i < SLOTS.length; i++) {
        var slotKey    = SLOTS[i];
        var slotGroups = slotKey.slice(1).split('');
        if (!result[slotKey] && !usedGroups[t.group] &&
            slotGroups.indexOf(t.group) >= 0) {
          result[slotKey]     = t.group;
          usedGroups[t.group] = true;
          break;
        }
      }
    });
    return result;
  }

  function resolveTeamCode(code) {
    // Direct team codes (MEX, USA, etc.)
    if (T[code]) return code;
    
    // Group position codes (1A, 2B, etc.)
    var match = code.match(/^([12])([A-L])$/);
    if (match) {
      var pos = parseInt(match[1]) - 1; // 0-indexed
      var grp = match[2];
      var ranking = getGroupRanking(grp);
      return ranking[pos] || code;
    }
    
    // Third place codes (3ABCDF, etc.) - use official allocation table
    match = code.match(/^3([A-L]+)$/);
    if (match) {
      var allocation = getThirdPlaceAllocation();
      if (allocation && allocation[code]) {
        var thirdGroup = allocation[code];
        // Get the third-place team from that specific group
        var ranking = getGroupRanking(thirdGroup);
        return ranking[2] || code;
      }
      // Fallback (group stage still in progress): use deduplicating prospective
      // allocation so each team appears in at most one slot.
      var prospective = getProspectiveThirdAllocation();
      if (prospective[code]) {
        var ranking = getGroupRanking(prospective[code]);
        return ranking[2] || code;
      }
      return code;
    }
    
    // Knockout winner codes (W73, W89, etc.)
    match = code.match(/^W(\d+)$/);
    if (match) {
      var matchId = parseInt(match[1]);
      var m = getMatchById(matchId);
      if (m && m.hs !== '' && m.as !== '') {
        var hs = parseInt(m.hs) || 0;
        var as = parseInt(m.as) || 0;
        if (hs > as) return resolveTeamCode(m.h);
        if (as > hs) return resolveTeamCode(m.a);
      }
      return code;
    }
    
    // Knockout loser codes (L101, L102)
    match = code.match(/^L(\d+)$/);
    if (match) {
      var matchId = parseInt(match[1]);
      var m = getMatchById(matchId);
      if (m && m.hs !== '' && m.as !== '') {
        var hs = parseInt(m.hs) || 0;
        var as = parseInt(m.as) || 0;
        if (hs < as) return resolveTeamCode(m.h);
        if (as < hs) return resolveTeamCode(m.a);
      }
      return code;
    }
    
    return code;
  }

  var GRP_COLOR = {
    A:'#e74c3c', B:'#e67e22', C:'#d4ac0d', D:'#27ae60',
    E:'#16a085', F:'#2980b9', G:'#8e44ad', H:'#c0392b',
    I:'#0097a7', J:'#ff5722', K:'#7cb342', L:'#546e7a'
  };

  /* ── Render all group-stage matches across p4/p5/p6 ───────────────── */
  /* ── Daily Buzz (page 3) ────────────────────────────────────────────── */
  function renderDailyBuzz() {
    var el = document.getElementById('daily-buzz');
    if (!el) return;

    // Tournament start date: June 11, 2026
    var tournamentStart = new Date(2026, 5, 11); // Months are 0-indexed
    var currentDate = new Date();
    
    // Calculate match day (1-based)
    var daysDiff = Math.floor((currentDate - tournamentStart) / (1000 * 60 * 60 * 24));
    var currentMatchDay = daysDiff + 1;
    
    // Clamp to valid range (days 1-17 for group stage)
    if (currentMatchDay < 1) currentMatchDay = 1;
    if (currentMatchDay > 17) currentMatchDay = 17;

    // Get current day name for header
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var currentDayName = daysOfWeek[currentDate.getDay()];

    // Update header
    var headerEl = document.getElementById('db-header-text');
    if (headerEl) headerEl.textContent = 'Daily Buzz - ' + currentDayName;

    // Always show 3 sections
    var showDays = [];
    if (currentMatchDay === 1) {
      showDays = [
        { day: 1, label: 'Match Day 1' },
        { day: 2, label: 'Match Day 2' },
        { day: 3, label: 'Match Day 3' }
      ];
    } else if (currentMatchDay === 2) {
      showDays = [
        { day: 1, label: 'Match Day 1' },
        { day: 2, label: 'Match Day 2' },
        { day: 3, label: 'Match Day 3' }
      ];
    } else {
      // Day 3+: Yesterday, Today, Tomorrow
      showDays = [
        { day: currentMatchDay - 1, label: "Yesterday's Results" },
        { day: currentMatchDay, label: "Today's Games" },
        { day: currentMatchDay + 1, label: "Tomorrow's Games" }
      ];
    }

    // Flatten and organize all matches by day number
    var matchesByDay = {};
    var datesByDay = {}; // Track date strings for each day
    Object.keys(GROUPS).forEach(function (gk) {
      GROUPS[gk].matches.forEach(function (m) {
        var dayNum = parseInt(m.date.split(' ')[1], 10) - 10; // Jun 11 = day 1
        if (!matchesByDay[dayNum]) matchesByDay[dayNum] = [];
        matchesByDay[dayNum].push({ grp: gk, m: m });
        if (!datesByDay[dayNum]) datesByDay[dayNum] = m.date;
      });
    });

    // Sort matches within each day by time
    Object.keys(matchesByDay).forEach(function(day) {
      matchesByDay[day].sort(function(a, b) {
        function timeToMins(t) {
          var raw = t, ap = raw.slice(-1);
          var p = raw.slice(0, -1).split(':');
          var h = parseInt(p[0], 10), min = parseInt(p[1], 10);
          if (ap === 'p' && h !== 12) h += 12;
          if (ap === 'a' && h === 12) h = 0;
          return h * 60 + min;
        }
        return timeToMins(a.m.time) - timeToMins(b.m.time);
      });
    });

    var html = '';
    showDays.forEach(function(section) {
      var matches = matchesByDay[section.day] || [];
      var sectionDate = datesByDay[section.day] || '';
      
      // Section header with label and date
      html += '<div class="daily-section-title">' + section.label + ' - ' + sectionDate + ', 2026</div>';

      var SLOTS = 4;
      var rendered = 0;

      matches.forEach(function(entry) {
        if (rendered >= SLOTS) return;
        var m = entry.m, gk = entry.grp;
        var ht = T[m.h], at = T[m.a];
        if (!ht || !at) return;
        var gc = GRP_COLOR[gk] || '#999';
        var city = CITY_SHORT[m.id] || '';

        html += '<div class="match-row am-row db-compact">';
        html += '<span class="m-grp" style="background:' + gc + '">' + gk + '</span>';
        html += '<span class="m-time">' + fmtTime(m.time) + '</span>';
        html += '<span class="m-hflag">' + flagImg(ht.code) + '</span>';
        html += '<span class="m-hcode">' + m.h + '</span>';
        html += '<span class="m-sb">' + scoreBox(m.id,'h') + '</span>';
        html += '<span class="m-sb">' + scoreBox(m.id,'a') + '</span>';
        html += '<span class="m-acode">' + m.a + '</span>';
        html += '<span class="m-aflag">' + flagImg(at.code) + '</span>';
        html += '<span class="m-city">' + city + '</span>';
        html += '</div>';
        rendered++;
      });

      // Fill remaining slots with greyed-out placeholders
      for (var p = rendered; p < SLOTS; p++) {
        html += '<div class="match-row am-row db-compact db-placeholder">';
        html += '<span class="m-grp">—</span>';
        html += '<span class="m-time">—</span>';
        html += '<span class="m-hflag"></span>';
        html += '<span class="m-hcode">TBD</span>';
        html += '<span class="m-sb">-</span>';
        html += '<span class="m-sb">-</span>';
        html += '<span class="m-acode">TBD</span>';
        html += '<span class="m-aflag"></span>';
        html += '<span class="m-city">—</span>';
        html += '</div>';
      }
    });

    el.innerHTML = html;

    // Scores are now loaded from JSON data - no manual editing
  }

  function renderAllMatches() {
    /* flatten + sort by match id (== chronological) */
    var all = [];
    Object.keys(GROUPS).forEach(function (gk) {
      GROUPS[gk].matches.forEach(function (m) {
        all.push({ grp: gk, m: m });
      });
    });
    all.sort(function (a, b) {
      var am = a.m, bm = b.m;
      /* sort key: day number then time in minutes since midnight */
      function key(m) {
        var day = parseInt(m.date.split(' ')[1], 10);
        var raw = m.time, ap = raw.slice(-1);
        var p = raw.slice(0, -1).split(':');
        var h = parseInt(p[0], 10), min = parseInt(p[1], 10);
        if (ap === 'p' && h !== 12) h += 12;
        if (ap === 'a' && h === 12) h = 0;
        return day * 1440 + h * 60 + min;
      }
      var diff = key(am) - key(bm);
      return diff !== 0 ? diff : am.id - bm.id;
    });

    var third = Math.ceil(all.length / 3);
    var parts = [ all.slice(0, third), all.slice(third, third*2), all.slice(third*2) ];

    parts.forEach(function (list, pi) {
      var el = document.getElementById('all-matches-' + (pi + 1));
      if (!el) return;
      var html = '<div class="match-row am-row am-hdr">'
        + '<span>#</span>'
        + '<span>G</span>'
        + '<span>Day</span>'
        + '<span>Date</span>'
        + '<span>Time</span>'
        + '<span></span>'
        + '<span>Home</span>'
        + '<span></span>'
        + '<span></span>'
        + '<span>Away</span>'
        + '<span></span>'
        + '<span>City</span>'
        + '</div>';
      var lastDate = '';
      list.forEach(function (entry) {
        var m = entry.m, gk = entry.grp;
        var ht = T[m.h], at = T[m.a];
        if (!ht || !at) return;
        var dow = DOW[m.date] || '';
        var gc = GRP_COLOR[gk] || '#999';
        html += '<div class="match-row am-row">'
          + '<span class="m-num">'   + m.id               + '</span>'
          + '<span class="m-grp" style="background:' + gc + '">' + gk + '</span>'
          + '<span class="m-dow">'   + dow                + '</span>'
          + '<span class="m-date">'  + m.date             + '</span>'
          + '<span class="m-time">'  + fmtTime(m.time)             + '</span>'
          + '<span class="m-hflag">' + flagImg(ht.code)   + '</span>'
          + '<span class="m-hcode">' + m.h                + '</span>'
          + '<span class="m-sb">'    + scoreBox(m.id,'h')  + '</span>'
          + '<span class="m-sb">'    + scoreBox(m.id,'a')  + '</span>'
          + '<span class="m-acode">' + m.a                + '</span>'
          + '<span class="m-aflag">' + flagImg(at.code)   + '</span>'
          + '<span class="m-city">'  + (CITY_SHORT[m.id]||'')  + '</span>'
          + '</div>';
      });
      el.innerHTML = html;

      // Scores are now loaded from JSON data - no manual editing
    });
  }

  /* ── Renderer ────────────────────────────────────────────────────── */
  function renderGroup(key) {
    var g = GROUPS[key];
    if (!g) return;
    var el = document.getElementById('grp-' + key);
    if (!el) return;

    var gc = GRP_COLOR[key] || 'var(--header-bg)';
    el.style.setProperty('--grp-c', gc);

    var standings = calculateStandings(key);

    /* standings table — fixed column widths so PTS is never clipped */
    var html = '<table class="grp-table"><thead><tr style="background:linear-gradient(to right,' + gc + ' 50%,#000 100%)">'
      + '<th class="c-pos">#</th>'
      + '<th class="c-team">TEAM</th>'
      + '<th class="c-stat">GP</th><th class="c-stat">W</th><th class="c-stat">D</th>'
      + '<th class="c-stat">L</th><th class="c-stat">GF</th><th class="c-stat">GA</th>'
      + '<th class="c-stat">GD</th><th class="c-stat c-pts">PTS</th>'
      + '</tr></thead><tbody>';

    g.teams.forEach(function (tkey, i) {
      var t = T[tkey];
      if (!t) return;
      var cls = i < 2 ? ' class="qualify"' : '';
      var st = standings[tkey] || { gp:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0 };
      html += '<tr' + cls + '>'
        + '<td class="c-pos">' + (i + 1) + '</td>'
        + '<td class="c-team">' + flagImg(t.code)
          + '<span class="c-tname">' + t.name + '</span></td>'
        + statCell(tkey, 'gp', st.gp)
        + statCell(tkey, 'w', st.w)
        + statCell(tkey, 'd', st.d)
        + statCell(tkey, 'l', st.l)
        + statCell(tkey, 'gf', st.gf)
        + statCell(tkey, 'ga', st.ga)
        + statCell(tkey, 'gd', st.gd)
        + statCell(tkey, 'pts', st.pts)
        + '</tr>';
    });

    html += '</tbody></table><div class="grp-divider"><div class="grp-divider-color"></div></div>';

    /* match schedule / results — CSS-grid rows, flags both sides */
    html += '<div class="grp-sched"><div class="grp-sched-hdr">Schedule &amp; Results</div>';

    g.matches.forEach(function (m) {
      var ht = T[m.h], at = T[m.a];
      if (!ht || !at) return;
      var dow = DOW[m.date] || '';
      html += '<div class="match-row">'
        + '<span class="m-num">'   + m.id                  + '</span>'
        + '<span class="m-dow">'   + dow                   + '</span>'
        + '<span class="m-date">'  + m.date                + '</span>'
        + '<span class="m-time">'  + fmtTime(m.time)        + '</span>'
        + '<span class="m-hflag">' + flagImg(ht.code)      + '</span>'
        + '<span class="m-hcode">' + m.h                   + '</span>'
        + '<span class="m-sb">'    + scoreBox(m.id,'h')     + '</span>'
        + '<span class="m-sb">'    + scoreBox(m.id,'a')     + '</span>'
        + '<span class="m-acode">' + m.a                   + '</span>'
        + '<span class="m-aflag">' + flagImg(at.code)      + '</span>'
        + '<span class="m-city">'  + (CITY[m.id] || '')    + '</span>'
        + '</div>';
    });

    html += '</div><div class="grp-divider"><div class="grp-divider-color"></div></div>';
    html += '<div class="grp-spacer"><div class="grp-spacer-title">Group Notes</div></div>';
    html += '<div class="grp-divider"><div class="grp-divider-color"></div></div>';
    el.innerHTML = html;

    // Scores are now loaded from JSON data - no manual editing
  }

  /* ── Knockout matches ────────────────────────────────────────────── */
  var CITY_KO = {
    73:'Inglewood', 76:'Houston', 74:'Foxborough', 75:'Guadalupe',
    78:'Arlington', 77:'E. Rutherford',  79:'Mexico City', 80:'Atlanta',
    82:'Seattle', 81:'Santa Clara', 84:'Inglewood', 83:'Toronto',
    85:'Vancouver', 88:'Arlington', 86:'Miami', 87:'Kansas City',
    90:'Houston', 89:'Philadelphia', 91:'E. Rutherford',  92:'Mexico City',
    93:'Arlington', 94:'Seattle', 95:'Atlanta', 96:'Vancouver',
    97:'Foxborough', 98:'Inglewood', 99:'Miami', 100:'Kansas City',
    101:'Arlington', 102:'Atlanta', 103:'Miami', 104:'E. Rutherford'
  };
  
  var STADIUM_KO = {
    73:'SoFi Stadium', 76:'NRG Stadium', 74:'Gillette Stadium', 75:'Estadio BBVA',
    78:'AT&T Stadium', 77:'MetLife Stadium', 79:'Estadio Azteca', 80:'Mercedes-Benz Stadium',
    82:'Lumen Field', 81:'Levi\'s Stadium', 84:'SoFi Stadium', 83:'BMO Field',
    85:'BC Place', 88:'AT&T Stadium', 86:'Hard Rock Stadium', 87:'Arrowhead Stadium',
    90:'NRG Stadium', 89:'Lincoln Financial Field', 91:'MetLife Stadium', 92:'Estadio Azteca',
    93:'AT&T Stadium', 94:'Lumen Field', 95:'Mercedes-Benz Stadium', 96:'BC Place',
    97:'Gillette Stadium', 98:'SoFi Stadium', 99:'Hard Rock Stadium', 100:'Arrowhead Stadium',
    101:'AT&T Stadium', 102:'Mercedes-Benz Stadium', 103:'Hard Rock Stadium', 104:'MetLife Stadium'
  };

  var KNOCKOUT = {
    r32: [
      {id:73,date:'Jun 28',time:'3:00p',h:'2A',a:'2B',hs:'',as:''},
      {id:76,date:'Jun 29',time:'1:00p',h:'1C',a:'2F',hs:'',as:''},
      {id:74,date:'Jun 29',time:'4:30p',h:'1E',a:'3ABCDF',hs:'',as:''},
      {id:75,date:'Jun 29',time:'9:00p',h:'1F',a:'2C',hs:'',as:''},
      {id:78,date:'Jun 30',time:'2:00p',h:'2E',a:'2I',hs:'',as:''},
      {id:77,date:'Jun 30',time:'5:00p',h:'1I',a:'3CDFGH',hs:'',as:''},
      {id:79,date:'Jun 30',time:'9:00p',h:'1A',a:'3CEFHI',hs:'',as:''},
      {id:80,date:'Jul 1',time:'12:00p',h:'1L',a:'3EHIJK',hs:'',as:''},
      {id:82,date:'Jul 1',time:'4:00p',h:'1G',a:'3AEHIJ',hs:'',as:''},
      {id:81,date:'Jul 1',time:'8:00p',h:'1D',a:'3BEFIJ',hs:'',as:''},
      {id:84,date:'Jul 2',time:'3:00p',h:'1H',a:'2J',hs:'',as:''},
      {id:83,date:'Jul 2',time:'7:00p',h:'2K',a:'2L',hs:'',as:''},
      {id:85,date:'Jul 2',time:'11:00p',h:'2B',a:'3EFGIJ',hs:'',as:''},
      {id:88,date:'Jul 3',time:'2:00p',h:'2D',a:'2G',hs:'',as:''},
      {id:86,date:'Jul 3',time:'6:00p',h:'1J',a:'2H',hs:'',as:''},
      {id:87,date:'Jul 3',time:'9:30p',h:'1K',a:'3DEIJL',hs:'',as:''}
    ],
    r16: [
      {id:90,date:'Jul 4',time:'1:00p',h:'W73',a:'W75',hs:'',as:''},
      {id:89,date:'Jul 4',time:'5:00p',h:'W74',a:'W77',hs:'',as:''},
      {id:91,date:'Jul 5',time:'4:00p',h:'W76',a:'W78',hs:'',as:''},
      {id:92,date:'Jul 5',time:'8:00p',h:'W79',a:'W80',hs:'',as:''},
      {id:93,date:'Jul 6',time:'3:00p',h:'W83',a:'W84',hs:'',as:''},
      {id:94,date:'Jul 6',time:'8:00p',h:'W81',a:'W82',hs:'',as:''},
      {id:95,date:'Jul 7',time:'12:00p',h:'W86',a:'W88',hs:'',as:''},
      {id:96,date:'Jul 7',time:'4:00p',h:'W85',a:'W87',hs:'',as:''}
    ],
    qf: [
      {id:97,date:'Jul 9',time:'4:00p',h:'W89',a:'W90',hs:'',as:''},
      {id:98,date:'Jul 10',time:'3:00p',h:'W93',a:'W94',hs:'',as:''},
      {id:99,date:'Jul 11',time:'5:00p',h:'W91',a:'W92',hs:'',as:''},
      {id:100,date:'Jul 11',time:'9:00p',h:'W95',a:'W96',hs:'',as:''}
    ],
    sf: [
      {id:101,date:'Jul 14',time:'3:00p',h:'W97',a:'W98',hs:'',as:''},
      {id:102,date:'Jul 15',time:'3:00p',h:'W99',a:'W100',hs:'',as:''}
    ],
    finals: [
      {id:103,date:'Jul 18',time:'5:00p',h:'L101',a:'L102',hs:'',as:''},
      {id:104,date:'Jul 19',time:'3:00p',h:'W101',a:'W102',hs:'',as:''}
    ]
  };

  function renderKnockout(key, elId, title, startIdx, count) {
    var matches = KNOCKOUT[key];
    if (!matches) return;
    var el = document.getElementById(elId);
    if (!el) return;

    var html = '';
    var subset = count ? matches.slice(startIdx || 0, (startIdx || 0) + count) : matches;
    
    html += '<div class="ko-section">';
    subset.forEach(function(m, i) {
      // For p28 multi-section page
      if (elId === 'ko-all') {
        if (key === 'qf' && i === 0) html += '<div class="ko-title">Quarterfinals</div>';
        if (key === 'sf' && i === 0) html += '<div class="ko-title" style="margin-top:6px">Semifinals</div>';
        if (key === 'finals' && i === 0) html += '<div class="ko-title" style="margin-top:6px">3rd Place Match</div>';
        if (key === 'finals' && i === 1) html += '<div class="ko-title" style="margin-top:6px">Final</div>';
      } else if (i === 0 && title) {
        html += '<div class="ko-title">' + title + '</div>';
      }
      
      var hTeam = resolveTeamCode(m.h);
      var aTeam = resolveTeamCode(m.a);
      
      // Show official code + prospective team below in grey
      var hDisplay = m.h;
      if (hTeam !== m.h) {
        hDisplay += '<span class="ko-prospective">' + hTeam + '</span>';
      }
      var aDisplay = m.a;
      if (aTeam !== m.a) {
        aDisplay += '<span class="ko-prospective">' + aTeam + '</span>';
      }
      
      html += '<div class="match-row ko-row">'
        + '<span class="m-num">' + m.id + '</span>'
        + '<span class="m-dow">' + (DOW[m.date] || '') + '</span>'
        + '<span class="m-date">' + m.date + '</span>'
        + '<span class="m-time">' + fmtTime(m.time) + '</span>'
        + '<span class="m-hcode ko-code">' + hDisplay + '</span>'
        + '<span class="m-sb">' + scoreBox(m.id,'h') + '</span>'
        + '<span class="m-sb">' + scoreBox(m.id,'a') + '</span>'
        + '<span class="m-acode ko-code">' + aDisplay + '</span>'
        + '<span class="m-city"><span class="ko-stadium">' + (STADIUM_KO[m.id] || '') + '</span>' + (CITY_KO[m.id] || '') + '</span>'
        + '</div>';
    });

    el.innerHTML = html;

    // Scores are now loaded from JSON data - no manual editing
  }

  /* ── Init ────────────────────────────────────────────────────────── */
  function init() {
    Object.keys(GROUPS).forEach(renderGroup);
    renderDailyBuzz();
    renderAllMatches();
    
    // p25: First 10 R32 matches
    renderKnockout('r32', 'ko-r32-1', 'Round of 32', 0, 10);
    
    // p26: Last 6 R32 + First 3 R16 (9 matches)
    var el26 = document.getElementById('ko-26');
    if (el26) {
      var html26 = '';
      // Last 6 R32 matches (10-16)
      html26 += '<div class="ko-section">';
      KNOCKOUT.r32.slice(10, 16).forEach(function(m, i) {
        if (i === 0) html26 += '<div class="ko-title">Round of 32 (continued)</div>';
        var hTeam = resolveTeamCode(m.h);
        var aTeam = resolveTeamCode(m.a);
        
        // Show official code + prospective team below in grey
        var hDisplay = m.h;
        if (hTeam !== m.h) hDisplay += '<span class="ko-prospective">' + hTeam + '</span>';
        var aDisplay = m.a;
        if (aTeam !== m.a) aDisplay += '<span class="ko-prospective">' + aTeam + '</span>';
        
        html26 += '<div class="match-row ko-row">';
        html26 += '<span class="m-num">' + m.id + '</span>';
        html26 += '<span class="m-dow">' + (DOW[m.date] || '') + '</span>';
        html26 += '<span class="m-date">' + m.date + '</span>';
        html26 += '<span class="m-time">' + fmtTime(m.time) + '</span>';
        html26 += '<span class="m-hcode ko-code">' + hDisplay + '</span>';
        html26 += '<span class="m-sb">' + scoreBox(m.id,'h') + '</span>';
        html26 += '<span class="m-sb">' + scoreBox(m.id,'a') + '</span>';
        html26 += '<span class="m-acode ko-code">' + aDisplay + '</span>';
        html26 += '<span class="m-city"><span class="ko-stadium">' + (STADIUM_KO[m.id] || '') + '</span>' + (CITY_KO[m.id] || '') + '</span>';
        html26 += '</div>';
      });
      html26 += '</div>'; // close R32 section
      // First 3 R16 matches
      html26 += '<div class="ko-section" style="margin-top:13px">';
      KNOCKOUT.r16.slice(0, 3).forEach(function(m, i) {
        if (i === 0) html26 += '<div class="ko-title">Round of 16</div>';
        var hTeam = resolveTeamCode(m.h);
        var aTeam = resolveTeamCode(m.a);
        
        // Show official code + prospective team below in grey
        var hDisplay = m.h;
        if (hTeam !== m.h) hDisplay += '<span class="ko-prospective">' + hTeam + '</span>';
        var aDisplay = m.a;
        if (aTeam !== m.a) aDisplay += '<span class="ko-prospective">' + aTeam + '</span>';
        
        html26 += '<div class="match-row ko-row">';
        html26 += '<span class="m-num">' + m.id + '</span>';
        html26 += '<span class="m-dow">' + (DOW[m.date] || '') + '</span>';
        html26 += '<span class="m-date">' + m.date + '</span>';
        html26 += '<span class="m-time">' + fmtTime(m.time) + '</span>';
        html26 += '<span class="m-hcode ko-code">' + hDisplay + '</span>';
        html26 += '<span class="m-sb">' + scoreBox(m.id,'h') + '</span>';
        html26 += '<span class="m-sb">' + scoreBox(m.id,'a') + '</span>';
        html26 += '<span class="m-acode ko-code">' + aDisplay + '</span>';
        html26 += '<span class="m-city"><span class="ko-stadium">' + (STADIUM_KO[m.id] || '') + '</span>' + (CITY_KO[m.id] || '') + '</span>';
        html26 += '</div>';
      });
      html26 += '</div>'; // close R16 section
      el26.innerHTML = html26;
      // Scores are now loaded from JSON data - no manual editing
    }
    
    // p27: Last 5 R16 + All 4 QF (9 matches)
    var el27 = document.getElementById('ko-27');
    if (el27) {
      var html27 = '';
      // Last 5 R16 matches (3-8)
      html27 += '<div class="ko-section">';
      KNOCKOUT.r16.slice(3, 8).forEach(function(m, i) {
        if (i === 0) html27 += '<div class="ko-title">Round of 16 (continued)</div>';
        var hTeam = resolveTeamCode(m.h);
        var aTeam = resolveTeamCode(m.a);
        
        // Show official code + prospective team below in grey
        var hDisplay = m.h;
        if (hTeam !== m.h) hDisplay += '<span class="ko-prospective">' + hTeam + '</span>';
        var aDisplay = m.a;
        if (aTeam !== m.a) aDisplay += '<span class="ko-prospective">' + aTeam + '</span>';
        
        html27 += '<div class="match-row ko-row">';
        html27 += '<span class="m-num">' + m.id + '</span>';
        html27 += '<span class="m-dow">' + (DOW[m.date] || '') + '</span>';
        html27 += '<span class="m-date">' + m.date + '</span>';
        html27 += '<span class="m-time">' + fmtTime(m.time) + '</span>';
        html27 += '<span class="m-hcode ko-code">' + hDisplay + '</span>';
        html27 += '<span class="m-sb">' + scoreBox(m.id,'h') + '</span>';
        html27 += '<span class="m-sb">' + scoreBox(m.id,'a') + '</span>';
        html27 += '<span class="m-acode ko-code">' + aDisplay + '</span>';
        html27 += '<span class="m-city"><span class="ko-stadium">' + (STADIUM_KO[m.id] || '') + '</span>' + (CITY_KO[m.id] || '') + '</span>';
        html27 += '</div>';
      });
      html27 += '</div>'; // close R16 section
      // All 4 QF matches
      html27 += '<div class="ko-section" style="margin-top:13px">';
      KNOCKOUT.qf.forEach(function(m, i) {
        if (i === 0) html27 += '<div class="ko-title">Quarterfinals</div>';
        var hTeam = resolveTeamCode(m.h);
        var aTeam = resolveTeamCode(m.a);
        
        // Show official code + prospective team below in grey
        var hDisplay = m.h;
        if (hTeam !== m.h) hDisplay += '<span class="ko-prospective">' + hTeam + '</span>';
        var aDisplay = m.a;
        if (aTeam !== m.a) aDisplay += '<span class="ko-prospective">' + aTeam + '</span>';
        
        html27 += '<div class="match-row ko-row">';
        html27 += '<span class="m-num">' + m.id + '</span>';
        html27 += '<span class="m-dow">' + (DOW[m.date] || '') + '</span>';
        html27 += '<span class="m-date">' + m.date + '</span>';
        html27 += '<span class="m-time">' + fmtTime(m.time) + '</span>';
        html27 += '<span class="m-hcode ko-code">' + hDisplay + '</span>';
        html27 += '<span class="m-sb">' + scoreBox(m.id,'h') + '</span>';
        html27 += '<span class="m-sb">' + scoreBox(m.id,'a') + '</span>';
        html27 += '<span class="m-acode ko-code">' + aDisplay + '</span>';
        html27 += '<span class="m-city"><span class="ko-stadium">' + (STADIUM_KO[m.id] || '') + '</span>' + (CITY_KO[m.id] || '') + '</span>';
        html27 += '</div>';
      });
      html27 += '</div>'; // close QF section
      el27.innerHTML = html27;
      // Scores are now loaded from JSON data - no manual editing
    }
    
    // p29: SF + 3rd + Final
    var el29 = document.getElementById('ko-finals');
    if (el29) {
      var html = '';
      
      // Semifinals section
      html += '<div class="ko-section">';
      html += '<div class="ko-title">Semifinals</div>';
      KNOCKOUT.sf.forEach(function(m) {
        var hTeam = resolveTeamCode(m.h);
        var aTeam = resolveTeamCode(m.a);
        var hDisplay = m.h;
        if (hTeam !== m.h) hDisplay += '<span class="ko-prospective">' + hTeam + '</span>';
        var aDisplay = m.a;
        if (aTeam !== m.a) aDisplay += '<span class="ko-prospective">' + aTeam + '</span>';
        html += '<div class="match-row ko-row">';
        html += '<span class="m-num">' + m.id + '</span>';
        html += '<span class="m-dow">' + (DOW[m.date] || '') + '</span>';
        html += '<span class="m-date">' + m.date + '</span>';
        html += '<span class="m-time">' + fmtTime(m.time) + '</span>';
        html += '<span class="m-hcode ko-code">' + hDisplay + '</span>';
        html += '<span class="m-sb">' + scoreBox(m.id,'h') + '</span>';
        html += '<span class="m-sb">' + scoreBox(m.id,'a') + '</span>';
        html += '<span class="m-acode ko-code">' + aDisplay + '</span>';
        html += '<span class="m-city"><span class="ko-stadium">' + (STADIUM_KO[m.id] || '') + '</span>' + (CITY_KO[m.id] || '') + '</span>';
        html += '</div>';
      });
      html += '</div>';
      
      // 3rd Place Match section
      html += '<div class="ko-section" style="margin-top:13px">';
      html += '<div class="ko-title">3rd Place Match</div>';
      var m3 = KNOCKOUT.finals[0];
      var hTeam3 = resolveTeamCode(m3.h);
      var aTeam3 = resolveTeamCode(m3.a);
      var hDisplay3 = m3.h;
      if (hTeam3 !== m3.h) hDisplay3 += '<span class="ko-prospective">' + hTeam3 + '</span>';
      var aDisplay3 = m3.a;
      if (aTeam3 !== m3.a) aDisplay3 += '<span class="ko-prospective">' + aTeam3 + '</span>';
      html += '<div class="match-row ko-row">';
      html += '<span class="m-num">' + m3.id + '</span>';
      html += '<span class="m-dow">' + (DOW[m3.date] || '') + '</span>';
      html += '<span class="m-date">' + m3.date + '</span>';
      html += '<span class="m-time">' + fmtTime(m3.time) + '</span>';
      html += '<span class="m-hcode ko-code">' + hDisplay3 + '</span>';
      html += '<span class="m-sb">' + scoreBox(m3.id,'h') + '</span>';
      html += '<span class="m-sb">' + scoreBox(m3.id,'a') + '</span>';
      html += '<span class="m-acode ko-code">' + aDisplay3 + '</span>';
      html += '<span class="m-city"><span class="ko-stadium">' + (STADIUM_KO[m3.id] || '') + '</span>' + (CITY_KO[m3.id] || '') + '</span>';
      html += '</div>';
      html += '</div>';
      
      // Final section
      html += '<div class="ko-section" style="margin-top:13px">';
      html += '<div class="ko-title">Final</div>';
      var mF = KNOCKOUT.finals[1];
      var hTeamF = resolveTeamCode(mF.h);
      var aTeamF = resolveTeamCode(mF.a);
      var hDisplayF = mF.h;
      if (hTeamF !== mF.h) hDisplayF += '<span class="ko-prospective">' + hTeamF + '</span>';
      var aDisplayF = mF.a;
      if (aTeamF !== mF.a) aDisplayF += '<span class="ko-prospective">' + aTeamF + '</span>';
      html += '<div class="match-row ko-row">';
      html += '<span class="m-num">' + mF.id + '</span>';
      html += '<span class="m-dow">' + (DOW[mF.date] || '') + '</span>';
      html += '<span class="m-date">' + mF.date + '</span>';
      html += '<span class="m-time">' + fmtTime(mF.time) + '</span>';
      html += '<span class="m-hcode ko-code">' + hDisplayF + '</span>';
      html += '<span class="m-sb">' + scoreBox(mF.id,'h') + '</span>';
      html += '<span class="m-sb">' + scoreBox(mF.id,'a') + '</span>';
      html += '<span class="m-acode ko-code">' + aDisplayF + '</span>';
      html += '<span class="m-city"><span class="ko-stadium">' + (STADIUM_KO[mF.id] || '') + '</span>' + (CITY_KO[mF.id] || '') + '</span>';
      html += '</div>';
      html += '</div>';
      
      el29.innerHTML = html;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
