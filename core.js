const app = document.getElementById('app');
const historyStack=[];
const state={
  screen:'welcome', mission:0, selected:null, choices:[],
  soil:100, drainage:100, habitat:100, readiness:100, audit:0,
  evidence:[], completedTheory:[]
};
const missions=[
 {
  title:'Mission 1 · Heavy Platform Transit', subtitle:'Move a 32-ton maintenance platform from the service gate to Hangar 4.',
  objective:'Choose a route that keeps mission readiness high without repeatedly loading wet or ecologically sensitive ground.',
  tip:'Start by comparing route length with terrain sensitivity. Shortest does not automatically mean lowest impact.',
  map:'route',
  choices:[
   {id:'A',name:'Direct cross-site shortcut',desc:'Fastest line across compactable unpaved ground and a shallow drainage swale.',d:{soil:-24,drainage:-22,habitat:-15,readiness:+8,audit:+22},quality:'bad',visual:'routeA',why:'High axle loading on vulnerable ground can reduce pore space; crossing the drainage swale also creates a clear control failure.'},
   {id:'B',name:'Existing reinforced service corridor',desc:'Slightly longer route on already load-bearing surfaces; no drainage crossing.',d:{soil:-3,drainage:0,habitat:-2,readiness:+4,audit:+1},quality:'good',visual:'routeB',why:'Using existing load-bearing corridors concentrates traffic on surfaces designed for it and avoids creating new disturbed tracks.'},
   {id:'C',name:'Perimeter track through habitat edge',desc:'Avoids the swale but clips an unmanaged strip that connects two small habitat patches.',d:{soil:-8,drainage:-2,habitat:-18,readiness:+2,audit:+10},quality:'warn',visual:'routeC',why:'Protecting drainage alone is not enough. Edge damage can fragment or degrade small habitat features.'}
  ], theory:'compaction'
 },
 {
  title:'Mission 2 · Temporary Maintenance Apron', subtitle:'A two-week surge requires a temporary outdoor maintenance area.',
  objective:'Select where and how to establish the temporary footprint. You need capacity, drainage protection and a restoration plan.',
  tip:'Temporary does not mean impact-free. Look at infiltration, repeated loading and what happens when the area is removed.',
  map:'pad',
  choices:[
   {id:'A',name:'Extend onto open soil beside Hangar 2',desc:'Quick setup with crushed aggregate placed directly on the soil.',d:{soil:-22,drainage:-12,habitat:-8,readiness:+9,audit:+18},quality:'bad',visual:'padA',why:'Aggregate over unprotected soil can compact and seal the surface, especially under repeated heavy loads; removal may not restore structure.'},
   {id:'B',name:'Use modular load-spreading mats on a pre-assessed zone',desc:'Defined traffic lanes, geotextile separation, edge protection and post-use inspection.',d:{soil:-5,drainage:-3,habitat:-2,readiness:+5,audit:+1},quality:'good',visual:'padB',why:'Load-spreading and defined lanes reduce pressure and disturbance while keeping the footprint reversible and inspectable.'},
   {id:'C',name:'Use the existing apron but block a surface drain',desc:'No new soil disturbance, but the temporary platform partly obstructs runoff collection.',d:{soil:0,drainage:-25,habitat:-4,readiness:+6,audit:+19},quality:'bad',visual:'padC',why:'Avoiding soil disturbance does not justify blocking drainage. Altered runoff can create ponding, erosion or polluted bypass flows.'}
  ], theory:'footprint'
 },
 {
  title:'Mission 3 · Storm Front & Natural Drainage', subtitle:'A storm warning arrives while heavy equipment is positioned near a natural drainage line.',
  objective:'Protect operational continuity without redirecting runoff into vulnerable areas or creating erosion points.',
  tip:'Ask where water will go, not only where equipment is standing. Flow paths are part of the site system.',
  map:'drain',
  choices:[
   {id:'A',name:'Cut a temporary ditch to bypass the work zone',desc:'Fast excavation sends runoff around the apron toward the site boundary.',d:{soil:-10,drainage:-25,habitat:-18,readiness:+7,audit:+25},quality:'bad',visual:'drainA',why:'Unassessed diversion can concentrate flow, increase erosion and transfer impacts downstream.'},
   {id:'B',name:'Clear existing drainage, install protected crossings and monitor',desc:'Keep the original flow path, prevent sediment entry and define a wet-weather stop criterion.',d:{soil:-2,drainage:+2,habitat:-1,readiness:+3,audit:0},quality:'good',visual:'drainB',why:'Maintaining natural/established flow paths while controlling sediment and crossings addresses the cause instead of shifting it.'},
   {id:'C',name:'Build a soil berm along the drainage line',desc:'Creates a dry operational zone but dams runoff on the upstream side.',d:{soil:-8,drainage:-20,habitat:-10,readiness:+5,audit:+16},quality:'warn',visual:'drainC',why:'A berm can change hydraulic behaviour and create ponding or overtopping if it was not designed as drainage infrastructure.'}
  ], theory:'drainage'
 },
 {
  title:'Mission 4 · Repeated Traffic & Soil Fatigue', subtitle:'Peak maintenance demand triples daily vehicle movements for six weeks.',
  objective:'Manage repeated traffic so short-term productivity does not create a long-lived compacted footprint.',
  tip:'Compaction is cumulative. Repeated passes over the same vulnerable soil can matter more than one isolated movement.',
  map:'traffic',
  choices:[
   {id:'A',name:'Let drivers choose the shortest route each trip',desc:'Flexible and fast, but traffic spreads across several unpaved shortcuts.',d:{soil:-26,drainage:-9,habitat:-12,readiness:+7,audit:+20},quality:'bad',visual:'trafficA',why:'Uncontrolled traffic creates multiple desire lines, widens disturbance and makes impacts difficult to monitor.'},
   {id:'B',name:'Create controlled traffic zones and no-go areas',desc:'One reinforced route, turning pads, wet-soil restrictions and a simple daily inspection.',d:{soil:-4,drainage:-1,habitat:-2,readiness:+4,audit:0},quality:'good',visual:'trafficB',why:'Concentrating traffic on suitable areas and stopping movement under vulnerable conditions is a practical operational control.'},
   {id:'C',name:'Alternate between several unpaved routes',desc:'Spreads the load so no single track looks heavily damaged.',d:{soil:-17,drainage:-7,habitat:-15,readiness:+4,audit:+12},quality:'warn',visual:'trafficC',why:'Spreading disturbance can enlarge the total affected footprint and damage more microhabitats even if rutting looks less intense.'}
  ], theory:'controls'
 },
 {
  title:'Mission 5 · Urgent Recovery Operation', subtitle:'A disabled support unit must be recovered before the next mission window.',
  objective:'Make the urgent recovery safe and fast while applying proportionate environmental controls instead of bypassing them.',
  tip:'Emergency pressure changes the decision threshold, not the need to think. Use the least-damaging feasible option and record why.',
  map:'emergency',
  choices:[
   {id:'A',name:'Immediate cross-country crane access',desc:'Fastest response. Heavy crane crosses wet soil and a drainage depression directly.',d:{soil:-30,drainage:-22,habitat:-12,readiness:+12,audit:+28},quality:'bad',visual:'emA',why:'Urgency can justify trade-offs, but a foreseeable high-impact access route with no mitigation creates both physical damage and weak audit evidence.'},
   {id:'B',name:'Stabilised approach + spotter + protective mats',desc:'Adds a short setup delay, uses the strongest available approach and protects the final unpaved section.',d:{soil:-6,drainage:-2,habitat:-2,readiness:+8,audit:+1},quality:'good',visual:'emB',why:'This keeps the recovery rapid while reducing ground pressure and documenting a proportionate emergency control.'},
   {id:'C',name:'Delay recovery until the ground dries',desc:'Lowest immediate soil pressure, but the unit remains unavailable through the mission window.',d:{soil:0,drainage:0,habitat:0,readiness:-20,audit:+3},quality:'warn',visual:'emC',why:'Environmental protection must be integrated with mission needs. A decision that protects soil but causes unacceptable readiness loss may not be viable.'}
  ], theory:'emergency'
 }
];
