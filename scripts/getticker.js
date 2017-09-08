// Description:
//   Returns information about crypto coins
//
// Commands:
//   Hubot ticker <coin1> <coin2> - returns price/change of coin2 relative to coin1
//   Hubot stats <coin> - returns information about coin
//   Hubot price <coin> - returns the strike price of coin
//
// Author:
//   leathan

(function() {
  const tickers = {
    '42': '42-coin',
    '611': 'sixeleven',
    '808': '808coin',
    '888': 'octocoin',
    '1337': '1337',
    BTC: 'bitcoin',
    ETH: 'ethereum',
    XRP: 'ripple',
    LTC: 'litecoin',
    ETC: 'ethereum-classic',
    DASH: 'dash',
    XEM: 'nem',
    MIOTA: 'iota',
    XMR: 'monero',
    BTS: 'bitshares',
    EOS: 'eos',
    STRAT: 'stratis',
    ZEC: 'zcash',
    BCC: 'bitconnect',
    WAVES: 'waves',
    STEEM: 'steem',
    VERI: 'veritaseum',
    ANS: 'antshares',
    GNO: 'gnosis-gno',
    GNT: 'golem-network-tokens',
    BCN: 'bytecoin-bcn',
    SC: 'siacoin',
    REP: 'augur',
    ICN: 'iconomi',
    DOGE: 'dogecoin',
    LSK: 'lisk',
    XLM: 'stellar',
    USDT: 'tether',
    GBYTE: 'byteball',
    MAID: 'maidsafecoin',
    FCT: 'factom',
    DCR: 'decred',
    SNT: 'status',
    GAME: 'gamecredits',
    ARDR: 'ardor',
    KMD: 'komodo',
    DGB: 'digibyte',
    PIVX: 'pivx',
    MCAP: 'mcap',
    DGD: 'digixdao',
    NXT: 'nxt',
    BAT: 'batcoin',
    BNT: 'bancor',
    '1ST': 'firstblood',
    SNGLS: 'singulardtv',
    BTCD: 'bitcoindark',
    MGO: 'mobilego',
    ANT: 'aragon',
    SYS: 'syscoin',
    FUN: 'funfair',
    PPC: 'peercoin',
    ARK: 'ark',
    EMC: 'emercoin',
    NXS: 'nexus',
    DCT: 'decent',
    EDG: 'edgeless',
    LKK: 'lykke',
    UBQ: 'ubiq',
    LEO: 'leocoin',
    RDD: 'reddcoin',
    XVG: 'verge',
    ROUND: 'round',
    XAS: 'asch',
    NMR: 'numeraire',
    DBIX: 'dubaicoin-dbix',
    MONA: 'monacoin',
    NMC: 'namecoin',
    MLN: 'melon',
    CLOAK: 'cloakcoin',
    RLC: 'rlc',
    SOAR: 'soarcoin',
    LBC: 'library-credit',
    SJCX: 'storjcoin-x',
    WINGS: 'wings',
    DBIC: 'dubaicoin',
    XAUR: 'xaurum',
    PPY: 'peerplays-ppy',
    OMNI: 'omni',
    DICE: 'etheroll',
    OBITS: 'obits',
    NLG: 'gulden',
    BAY: 'bitbay',
    BLK: 'blackcoin',
    XCP: 'counterparty',
    VSL: 'vslice',
    STORJ: 'storj',
    AMP: 'synereo',
    XZC: 'zcoin',
    QRL: 'quantum-resistant-ledger',
    BLOCK: 'blocknet',
    SWT: 'swarm-city',
    SKY: 'skycoin',
    HMQ: 'humaniq',
    QAU: 'quantum',
    ADT: 'adtoken',
    SIB: 'sibcoin',
    XEL: 'elastic',
    YBC: 'ybcoin',
    AGRS: 'agoras-tokens',
    BURST: 'burst',
    MYST: 'mysterium',
    POT: 'potcoin',
    TRST: 'trust',
    VIA: 'viacoin',
    XDN: 'digitalnote',
    EDR: 'e-dinar-coin',
    CRW: 'crown',
    NAV: 'nav-coin',
    SLS: 'salus',
    VTC: 'vertcoin',
    NEOS: 'neoscoin',
    WGR: 'wagerr',
    UNITY: 'supernet-unity',
    GRC: 'gridcoin',
    EAC: 'earthcoin',
    UNY: 'unity-ingot',
    CFI: 'cofound-it',
    TKN: 'tokencard',
    EXP: 'expanse',
    MCO: 'monaco',
    SHIFT: 'shift',
    TAAS: 'taas',
    IOC: 'iocoin',
    ENRG: 'energycoin',
    GOLOS: 'golos',
    NVC: 'novacoin',
    DTB: 'databits',
    VOX: 'voxels',
    GUP: 'guppy',
    TIME: 'chronobank',
    VRC: 'vericoin',
    PTOY: 'patientory',
    MOON: 'mooncoin',
    NXC: 'nexium',
    FAIR: 'faircoin',
    RADS: 'radium',
    ECN: 'e-coin',
    BCAP: 'bcap',
    BASH: 'luckchain',
    FRST: 'firstcoin',
    MUE: 'monetaryunit',
    CLAM: 'clams',
    ION: 'ion',
    QRK: 'quark',
    BITCNY: 'bitcny',
    XBC: 'bitcoin-plus',
    FTC: 'feathercoin',
    NOTE: 'dnotes',
    GRS: 'groestlcoin',
    HEAT: 'heat-ledger',
    IFC: 'infinitecoin',
    PEPECASH: 'pepe-cash',
    WDC: 'worldcoin',
    RBY: 'rubycoin',
    BCY: 'bitcrystals',
    NLC2: 'nolimitcoin',
    SPR: 'spreadcoin',
    PLU: 'pluton',
    WCT: 'waves-community-token',
    XPM: 'primecoin',
    XBY: 'xtrabytes',
    FLDC: 'foldingcoin',
    EMC2: 'einsteinium',
    LMC: 'lomocoin',
    MGC: 'gulfcoin',
    OK: 'okcash',
    MUSE: 'bitshares-music',
    UNO: 'unobtanium',
    VASH: 'vpncoin',
    DEX: 'instantdex',
    GAM: 'gambit',
    SPHR: 'sphere',
    XCN: 'cryptonite',
    FLO: 'florincoin',
    ZEN: 'zencash',
    SAFEX: 'safe-exchange-coin',
    CRB: 'creditbit',
    JINN: 'jinn',
    ESP: 'espers',
    ZRC: 'zrcoin',
    BELA: 'belacoin',
    PASC: 'pascal-coin',
    AEON: 'aeon',
    SLR: 'solarcoin',
    COVAL: 'circuits-of-value',
    MUSIC: 'musicoin',
    MEC: 'megacoin',
    LUN: 'lunyr',
    RISE: 'rise',
    DMD: 'diamond',
    BITB: 'bitbean',
    BITUSD: 'bitusd',
    DIME: 'dimecoin',
    CADASTRAL: 'bitland',
    EMV: 'ethereum-movie-venture',
    NAUT: 'nautiluscoin',
    GCR: 'global-currency-reserve',
    XSPEC: 'spectrecoin',
    XRB: 'raiblocks',
    PINK: 'pinkcoin',
    DAR: 'darcrus',
    MINT: 'mintcoin',
    MED: 'mediterraneancoin',
    ABY: 'applebyte',
    'B@': 'bankcoin',
    AUR: 'auroracoin',
    ATMS: 'atmos',
    RLT: 'roulettetoken',
    XVC: 'vcash',
    ECC: 'eccoin',
    BLITZ: 'blitzcash',
    MAX: 'maxcoin',
    INCNT: 'incent',
    GLD: 'goldcoin',
    SEQ: 'sequence',
    VRM: 'veriumreserve',
    APX: 'apx',
    SNRG: 'synergy',
    ZCC: 'zccoin',
    CURE: 'curecoin',
    ZET: 'zetacoin',
    BSD: 'bitsend',
    XMY: 'myriad',
    DGC: 'digitalcoin',
    BOST: 'boostcoin',
    RIC: 'riecoin',
    PUT: 'putincoin',
    SBD: 'steem-dollars',
    XBB: 'boolberry',
    SWIFT: 'bitswift',
    TAG: 'tagcoin',
    TRIG: 'triggers',
    HUSH: 'hush',
    INPAY: 'inpay',
    ZENI: 'zennies',
    PING: 'cryptoping',
    PDC: 'project-decorum',
    ADC: 'audiocoin',
    ZCL: 'zclassic',
    KORE: 'korecoin',
    BTA: 'bata',
    BRK: 'breakout',
    BTM: 'bitmark',
    ERC: 'europecoin',
    BRX: 'breakout-stake',
    EL: 'elcoin-el',
    ANC: 'antcoin',
    ZEIT: 'zeitcoin',
    LGD: 'legends-room',
    ICASH: 'icash',
    EB3: 'eb3-coin',
    DOPE: 'dopecoin',
    GEO: 'geocoin',
    QWARK: 'qwark',
    HUC: 'huntercoin',
    JNS: 'janus',
    VTR: 'vtorrent',
    SRC: 'securecoin',
    BLOCKPAY: 'blockpay',
    WBB: 'wild-beast-block',
    TIPS: 'fedoracoin',
    EXCL: 'exclusivecoin',
    DYN: 'dynamic',
    ICE: 'idice',
    TX: 'transfercoin',
    DOT: 'dotcoin',
    CHC: 'chaincoin',
    PTC: 'pesetacoin',
    REE: 'reecoin',
    XWC: 'whitecoin',
    HTC: 'hitcoin',
    '2GIVE': '2give',
    CCRB: 'cryptocarbon',
    EGC: 'evergreencoin',
    OTX: 'octanox',
    CANN: 'cannabiscoin',
    HTML5: 'htmlcoin',
    INSN: 'insanecoin-insn',
    CREA: 'creativecoin',
    START: 'startcoin',
    ADZ: 'adzcoin',
    ADL: 'adelphoi',
    MNE: 'minereum',
    THC: 'hempcoin',
    MER: 'mercury',
    TIX: 'tickets',
    TRUST: 'trustplus',
    VISIO: 'visio',
    XP: 'xp',
    EQT: 'equitrader',
    HKG: 'hacker-gold',
    POSW: 'posw-coin',
    E4ROW: 'ether-for-the-rest-of-the-world',
    FUNC: 'funcoin',
    TKS: 'tokes',
    ALT: 'altcoin-alt',
    XVP: 'virtacoinplus',
    RNS: 'renos',
    PKB: 'parkbyte',
    PEPE: 'memetic',
    CARBON: 'carboncoin',
    EFL: 'e-gulden',
    XMG: 'magi',
    RBX: 'ripto-bux',
    DRACO: 'dt-token',
    SXC: 'sexcoin',
    CRAVE: 'crave',
    BTSR: 'btsr',
    XTC: 'tilecoin',
    XTO: 'tao',
    LDOGE: 'litedoge',
    GLC: 'globalcoin',
    SYNX: 'syndicate',
    NSR: 'nushares',
    XST: 'stealthcoin',
    FJC: 'fujicoin',
    HYP: 'hyperstake',
    MRT: 'miners-reward-token',
    VSM: 'voise',
    PND: 'pandacoin-pnd',
    XHI: 'hicoin',
    USC: 'ultimate-secure-cash',
    FST: 'fastcoin',
    NETKO: 'netko',
    BYC: 'bytecent',
    DVC: 'devcoin',
    CNT: 'centurion',
    KRB: 'karbowanec',
    INFX: 'influxcoin',
    GCN: 'gcoin',
    ITI: 'iticoin',
    BRIT: 'britcoin',
    MOIN: 'moin',
    YOC: 'yocoin',
    CV2: 'colossuscoin-v2',
    BUN: 'bunnycoin',
    CPC: 'capricoin',
    CBX: 'cryptogenic-bullion',
    RAIN: 'condensate',
    FCN: 'fantomcoin',
    PROC: 'procurrency',
    DCY: 'dinastycoin',
    CFT: 'cryptoforecast',
    BITS: 'bitstar',
    PIGGY: 'piggycoin',
    BXT: 'bittokens',
    UIS: 'unitus',
    ZER: 'zero',
    FRN: 'francs',
    TRI: 'triangles',
    UFO: 'ufo-coin',
    HPC: 'happycoin',
    NOBL: 'noblecoin',
    EMD: 'emerald',
    NET: 'netcoin',
    HNC: 'huncoin',
    VRS: 'veros',
    ORB: 'orbitcoin',
    NYC: 'newyorkcoin',
    ECO: 'ecocoin',
    ETB: 'ethbits',
    POST: 'postcoin',
    GB: 'goldblocks',
    TRUMP: 'trumpcoin',
    BTX: 'bitcointx',
    NTRN: 'neutron',
    HODL: 'hodlcoin',
    ZOI: 'zoin',
    ARC: 'arcade-token',
    PASL: 'pascal-lite',
    WGO: 'wavesgo',
    PXC: 'phoenixcoin',
    ASAFE2: 'allsafe',
    CNC: 'chncoin',
    RBIES: 'rubies',
    FLY: 'flycoin',
    MOJO: 'mojocoin',
    BITBTC: 'bitbtc',
    PAK: 'pakcoin',
    GOOD: 'good-karma',
    USNBT: 'nubits',
    XVS: 'vsync',
    BERN: 'berncash',
    CHESS: 'chesscoin',
    DNR: 'denarius-dnr',
    XLR: 'solaris',
    SUMO: 'sumokoin',
    C2: 'coin2-1',
    BITSILVER: 'bitsilver',
    TTC: 'tittiecoin',
    TOR: 'torcoin-tor',
    GLT: 'globaltoken',
    UNB: 'unbreakablecoin',
    TEK: 'tekcoin',
    NEWB: 'newbium',
    UNI: 'universe',
    ECA: 'electra',
    XCT: 'c-bit',
    KLC: 'kilocoin',
    HMP: 'hempcoin-hmp',
    LINX: 'linx',
    PRC: 'prcoin',
    BITEUR: 'biteur',
    NRO: 'neuro',
    BITGOLD: 'bitgold',
    ENT: 'eternity',
    ONX: 'onix',
    DIBC: 'dibcoin',
    GCC: 'thegcccoin',
    OHM: 'ohm-wallet',
    CPN: 'compucoin',
    MAR: 'marijuanacoin',
    QTL: 'quatloo',
    WORM: 'healthywormcoin',
    CJ: 'cryptojacks',
    UNIFY: 'unify',
    WYV: 'wyvern',
    KNC: 'kingn-coin',
    MSCN: 'master-swiscoin',
    GPU: 'gpu-coin',
    PIE: 'piecoin',
    VTA: 'virtacoin',
    PXI: 'prime-xi',
    JIN: 'jin-coin',
    FRC: 'freicoin',
    B3: 'b3coin',
    WEX: 'wexcoin',
    ERY: 'eryllium',
    BNX: 'bnrtxcoin',
    '$$$': 'money',
    SOCC: 'socialcoin-socc',
    XCRE: 'creatio',
    CREVA: 'crevacoin',
    AMMO: 'ammo-rewards',
    ZYD: 'zayedcoin',
    HONEY: 'honey',
    DOLLAR: 'dollar-online',
    LVPS: 'levoplus',
    CASH: 'cashcoin',
    '420G': 'ganjacoin',
    ABN: 'abncoin',
    XBTS: 'beatcoin',
    EBT: 'ebittree-coin',
    CHAO: '23-skidoo',
    CONX: 'concoin',
    XRC: 'rawcoin2',
    ARGUS: 'argus',
    DMB: 'digital-money-bits',
    UET: 'useless-ethereum-token',
    ETT: 'encryptotel',
    BPC: 'bitpark-coin',
    ICOO: 'ico-openledger',
    XC: 'xcurrency',
    PANGEA: 'pangea-poker',
    SPRTS: 'sprouts',
    INSANE: 'insanecoin',
    IXC: 'ixcoin',
    AC: 'asiacoin',
    FUND: 'cryptofund',
    YASH: 'yashcoin',
    FIMK: 'fimkrypto',
    CRYPT: 'cryptcoin',
    NKA: 'incakoin',
    CDN: 'canada-ecoin',
    BTB: 'bitbar',
    BLU: 'bluecoin',
    TRC: 'terracoin',
    TES: 'teslacoin',
    SMLY: 'smileycoin',
    TROLL: 'trollcoin',
    RC: 'russiacoin',
    LOG: 'woodcoin',
    V: 'version',
    SDC: 'shadowcash',
    DSH: 'dashcoin',
    CASINO: 'casino',
    CAGE: 'cagecoin',
    GRE: 'greencoin',
    KOBO: 'kobocoin',
    SMC: 'smartcoin',
    I0C: 'i0coin',
    MZC: 'mazacoin',
    SHORTY: 'shorty',
    TIT: 'titcoin',
    J: 'joincoin',
    FC2: 'fuelcoin',
    PUTIC: 'putin-classic',
    ATOM: 'atomic-coin',
    DEM: 'deutsche-emark',
    AMBER: 'ambercoin',
    MXT: 'martexcoin',
    METAL: 'metalcoin',
    TALK: 'btctalkcoin',
    FUNK: 'the-cypherfunks',
    PSB: 'pesobit',
    LTB: 'litebar',
    NYAN: 'nyancoin',
    AGLC: 'agrolifecoin',
    BUCKS: 'swagbucks',
    MNM: 'mineum',
    RAREPEPEP: 'rare-pepe-party',
    ELE: 'elementrem',
    UTC: 'ultracoin',
    KIC: 'kibicoin',
    LOT: 'lottocoin',
    BITZ: 'bitz',
    XPY: 'paycoin2',
    HBN: 'hobonickels',
    CNO: 'coin',
    DWC: 'deepwebcash',
    FOOT: 'footy-cash',
    AU: 'aurumcoin',
    SWING: 'swing',
    BTPL: 'bitcoin-planet',
    CORG: 'corgicoin',
    TRK: 'truckcoin',
    Q2C: 'qubitcoin',
    '8BIT': '8bit',
    SUPER: 'supercoin',
    DP: 'digitalprice',
    VLT: 'veltor',
    CCN: 'cannacoin',
    ADCN: 'asiadigicoin',
    GAIA: 'gaia',
    STS: 'stress',
    LANA: 'lanacoin',
    MTM: 'mtmgaming',
    FLT: 'fluttercoin',
    VIDZ: 'purevidz',
    MAC: 'machinecoin',
    KURT: 'kurrent',
    MI: 'xiaomicoin',
    XGR: 'goldreserve',
    SLG: 'sterlingcoin',
    QCN: 'quazarcoin',
    UNITS: 'gameunits',
    CAP: 'bottlecaps',
    TSE: 'tattoocoin',
    BTD: 'bitcloud',
    XPTX: 'platinumbar',
    PIP: 'pipcoin',
    CUBE: 'digicube',
    RBT: 'rimbit',
    GUN: 'guncoin',
    TSTR: 'tristar-coin',
    VC: 'virtualcoin',
    UNIC: 'unicoin',
    BLRY: 'billarycoin',
    XRA: 'ratecoin',
    ALL: 'allion',
    YAC: 'yacoin',
    PHO: 'photon',
    BTCR: 'bitcurrency',
    BSTY: 'globalboost-y',
    STV: 'sativacoin',
    XPD: 'petrodollar',
    CACH: 'cachecoin',
    VLTC: 'vault-coin',
    DUO: 'parallelcoin',
    KED: 'darsek',
    CSC: 'casinocoin',
    TGC: 'tigercoin',
    PHS: 'philosopher-stones',
    BOLI: 'bolivarcoin',
    BIGUP: 'bigup',
    BLC: 'blakecoin',
    WAY: 'wayguide',
    VAL: 'valorbit',
    DRS: 'digital-rupees',
    XRE: 'revolvercoin',
    SPACE: 'spacecoin',
    RED: 'redcoin',
    KUSH: 'kushcoin',
    DBTC: 'debitcoin',
    ARI: 'aricoin',
    FRK: 'franko',
    CRX: 'chronos',
    SPEX: 'sproutsextreme',
    GP: 'goldpay-coin',
    DLC: 'dollarcoin',
    PR: 'prototanium',
    FIRE: 'firecoin',
    HXX: 'hexx',
    WMC: 'wmcoin',
    UNIT: 'universal-currency',
    ZNY: 'bitzeny',
    XJO: 'joulecoin',
    DRM: 'dreamcoin',
    ICOB: 'icobid',
    CYP: 'cypher',
    ACOIN: 'acoin',
    FLVR: 'flavorcoin',
    PONZI: 'ponzicoin',
    ATX: 'artex-coin',
    GBC: 'gbcgoldcoin',
    EVIL: 'evil-coin',
    GRT: 'grantcoin',
    GAP: 'gapcoin',
    EVO: 'evotion',
    POP: 'popularcoin',
    CCM100: 'ccminer',
    MAD: 'satoshimadness',
    ARCO: 'aquariuscoin',
    COXST: 'coexistcoin',
    MILO: 'milocoin',
    PX: 'px',
    BUMBA: 'bumbacoin',
    VEC2: 'vector',
    CNNC: 'cannation',
    CAT: 'catcoin',
    HAL: 'halcyon',
    IMS: 'independent-money-system',
    ARG: 'argentum',
    LEA: 'leacoin',
    SPT: 'spots',
    MND: 'mindcoin',
    MST: 'mustangcoin',
    MEOW: 'kittehcoin',
    JWL: 'jewels',
    NEVA: 'nevacoin',
    SOON: 'sooncoin',
    RIDE: 'ride-my-car',
    BOB: 'dobbscoin',
    AMS: 'amsterdamcoin',
    URC: 'unrealcoin',
    XCO: 'x-coin',
    CON: 'paycon',
    BIP: 'bipcoin',
    BVC: 'beavercoin',
    '1CR': '1credit',
    XBTC21: 'bitcoin-21',
    OCEAN: 'burstocean',
    ISL: 'islacoin',
    TAJ: 'tajcoin',
    MCRN: 'macron',
    EUC: 'eurocoin',
    ZMC: 'zetamicron',
    MTLMC3: 'metal-music-coin',
    SLING: 'sling',
    UNIBURST: 'uniburst',
    CESC: 'cryptoescudo',
    REV: 'revenu',
    U: 'ucoin',
    BIOS: 'bios-crypto',
    URO: 'uro',
    LUNA: 'luna-coin',
    RPC: 'ronpaulcoin',
    DES: 'destiny',
    BLZ: 'blazecoin',
    CMT: 'comet',
    ANTI: 'antibitcoin',
    PRX: 'printerium',
    ACP: 'anarchistsprime',
    STEPS: 'steps',
    SONG: 'songcoin',
    AUM: 'alexium',
    CTO: 'crypto',
    WARP: 'warp',
    QBK: 'qibuck-asset',
    LTBC: 'ltbcoin',
    ORLY: 'orlycoin',
    CWXT: 'cryptoworldx-token',
    SCRT: 'secretcoin',
    BTQ: 'bitquark',
    GBT: 'gamebet-coin',
    ZUR: 'zurcoin',
    VIP: 'vip-tokens',
    IMX: 'impact',
    G3N: 'genstake',
    ARB: 'arbit',
    CAB: 'cabbage',
    XOC: 'xonecoin',
    DLISK: 'dappster',
    VPRC: 'vaperscoin',
    PLNC: 'plncoin',
    PULSE: 'pulse',
    LTCR: 'litecred',
    HIRO: 'hirocoin',
    BSTAR: 'blackstar',
    FUZZ: 'fuzzballs',
    SCORE: 'scorecoin',
    DRAGON: 'btcdragon',
    TAGR: 'tagrcoin',
    OS76: 'osmiumcoin',
    ICON: 'iconic',
    FLAX: 'flaxscript',
    IBANK: 'ibank',
    ZNE: 'zonecoin',
    MAY: 'theresa-may-coin',
    EGO: 'ego',
    ALTC: 'antilitecoin',
    LEX: 'lex4all',
    HVCO: 'high-voltage',
    CXT: 'coinonat',
    IMPS: 'impulsecoin',
    JOBS: 'jobscoin',
    DPAY: 'dpay',
    LIR: 'letitride',
    SCS: 'speedcash',
    PEX: 'posex',
    CRT: 'crtcoin',
    BENJI: 'benjirolls',
    BSC: 'bowscoin',
    VOLT: 'bitvolt',
    JIO: 'jio-token',
    SH: 'shilling',
    SFC: 'solarflarecoin',
    SANDG: 'save-and-gain',
    ENV: 'environ',
    BIOB: 'biobar',
    DIX: 'dix-asset',
    IMPCH: 'impeachcoin',
    SDP: 'sydpak',
    ELS: 'elysium',
    CF: 'californium',
    GEERT: 'geertcoin',
    XNG: 'enigma',
    NODC: 'nodecoin',
    MGM: 'magnum',
    P7C: 'p7coin',
    PIZZA: 'pizzacoin',
    SLFI: 'selfiecoin',
    FDC: 'future-digital-currency',
    BOAT: 'doubloon',
    PWR: 'powercoin',
    DGCS: 'digital-credits',
    ZHS: 'zcashshare',
    MUG: 'mikethemug',
    TOKEN: 'swaptoken',
    CALC: 'caliphcoin',
    XEN: 'xenixcoin',
    XBG: 'btcgold',
    GPL: 'gold-pressed-latinum',
    SNAKE: 'snakeeyes',
    NANOX: 'project-x',
    XOT: 'internet-of-things',
    SYNC: 'sync',
    BTU: 'bitcoin-unlimited',
    AMIS: 'amis',
    BITOK: 'bitok',
    MALC: 'malcoin',
    GUC: 'goldunioncoin',
    PAY: 'tenx',
    ELCO: 'elcoin',
    QTUM: 'qtum',
    FRGC: 'fargocoin',
    PLBT: 'polybius',
    GXS: 'gxshares',
    EFYT: 'ergo',
    ABC: 'alphabitcoinfund',
    ETP: 'metaverse',
    WARRANT: 'warrant',
    BTG: 'bitgem',
    IOP: 'internet-of-people',
    XDE2: 'xde-ii',
    DMC: 'dynamiccoin',
    PZM: 'prizm',
    RMC: 'remicoin',
    THS: 'techshares',
    JET: 'jetcoin',
    TROPTIONS: 'troptions',
    AE: 'aeternity',
    CLUB: 'clubcoin',
    GAY: 'gaycoin',
    TESLA: 'teslacoilcoin',
    VOYA: 'voyacoin',
    IVZ: 'invisiblecoin',
    ZENGOLD: 'zengold',
    ADX: 'adex',
    STEX: 'stex',
    EMP: 'emoneypower',
    TLE: 'tattoocoin-limited',
    BET: 'betacoin',
    ZBC: 'zilbercoin',
    APC: 'alpacoin',
    GBG: 'golos-gold',
    QORA: 'qora',
    XLC: 'leviarcoin',
    EBST: 'eboostcoin',
    ELC: 'elacoin',
    BRO: 'bitradio',
    TYCHO: 'tychocoin',
    GARY: 'president-johnson',
    YOG: 'yogold',
    DEUS: 'deuscoin',
    LDCN: 'landcoin',
    WEC: 'wowecoin',
    ATCC: 'atc-coin',
    PCS: 'pabyosi-coin-special',
    OMC: 'omicron',
    TOPAZ: 'topaz',
    BUK: 'cryptobuck',
    XID: 'international-diamond',
    SNM: 'sonm',
    SNC: 'suncontract',
    DCRE: 'deltacredits',
    '4CHN': 'chancoin',
    ECOB: 'ecobit',
    WA: 'wa-space',
    HLB: 'lepaoquan',
    IEC: 'ivugeocoin',
    SHELL: 'shellcoin',
    TP1: 'kolschcoin',
    GYC: 'gycoin',
    EDRC: 'edrcoin',
    DASHS: 'dashs',
    SAK: 'sharkcoin',
    DTF: 'digitalfund',
    RUBIT: 'rublebit',
    EGG: 'eggcoin',
    UNRC: 'universalroyalcoin',
    NBIT: 'netbit',
    BIT: 'first-bitcoin',
    MG: 'mind-gene',
    OPAL: 'opal',
    PI: 'picoin',
    FAZZ: 'fazzcoin',
    XAU: 'xaucoin',
    FLASH: 'flash',
    SKULL: 'pirate-blocks',
    BTCS: 'bitcoin-scrypt',
    PSY: 'psilocybin',
    VGINA: 'vgina',
    ZSE: 'zsecoin',
    XQN: 'quotient',
    AIB: 'advanced-internet-blocks',
    RYCN: 'royalcoin-2',
    TYC: 'tyrocoin',
    MAVRO: 'mavro',
    BCF: 'bitcoinfast',
    AXIOM: 'axiom',
    PRES: 'president-trump',
    OFF: 'cthulhu-offerings',
    '9COIN': '9coin',
    BGC: 'bagcoin',
    AV: 'avatarcoin',
    ACN: 'avoncoin',
    SLM: 'slimcoin',
    MARS: 'marscoin',
    OCOW: 'ocow',
    TRICK: 'trickycoin',
    GML: 'gameleaguecoin',
    CLINT: 'clinton',
    RICHX: 'richcoin',
    MMXVI: 'mmxvi',
    PUTIN: 'putincoin-putin',
    BXC: 'bitcedi',
    ROYAL: 'royalcoin',
    SPORT: 'sportscoin',
    TELL: 'tellurion',
    TODAY: 'todaycoin',
    SKC: 'skeincoin',
    DBG: 'digital-bullion-gold',
    BLAZR: 'blazercoin',
    UR: 'ur',
    WSX: 'wearesatoshi',
    BEST: 'bestchain',
    SHA: 'shacoin',
    TIC: 'true-investment-coin',
    QBC: 'quebecoin',
    BAC: 'bitalphacoin',
    LAZ: 'lazaruscoin',
    MOTO: 'motocoin',
    OPES: 'opescoin',
    SLEVIN: 'slevin',
    QBT: 'cubits',
    NTCC: 'neptune-classic',
    KASHH: 'kashhcoin',
    MARX: 'marxcoin',
    GMB: 'gambleo',
    DON: 'donationcoin',
    DUB: 'dubstep',
    FRWC: 'frankywillcoin',
    CBD: 'cbd-crystals',
    BRAIN: 'braincoin',
    RHFC: 'rhfcoin',
    GMX: 'goldmaxcoin',
    IRL: 'irishcoin',
    CYC: 'cycling-coin',
    MBL: 'mobilecash',
    GAIN: 'ugain',
    OP: 'operand',
    DISK: 'darklisk',
    CHEAP: 'cheapcoin',
    HCC: 'happy-creator-coin',
    PRM: 'prismchain',
    TERA: 'teracoin',
    TCOIN: 't-coin',
    SKR: 'sakuracoin',
    ASC: 'asiccoin',
    MONETA: 'moneta2',
    XVE: 'the-vegan-initiative',
    VGC: 'vegascoin',
    HALLO: 'halloween-coin',
    LTH: 'lathaan',
    KAYI: 'kayi',
    TCR: 'thecreed',
    LKC: 'linkedcoin',
    ANI: 'animecoin',
    FFC: 'fireflycoin',
    PAYP: 'paypeer',
    POKE: 'pokecoin',
    TEAM: 'teamup',
    BGR: 'bongger',
    PDG: 'pinkdog',
    X2: 'x2',
    MONEY: 'moneycoin',
    TURBO: 'turbocoin',
    IFLT: 'inflationcoin',
    ACES: 'aces',
    CC: 'cybercoin',
    LEPEN: 'lepen',
    CME: 'cashme',
    GOLF: 'golfcoin',
    RCN: 'rcoin',
    GBRC: 'global-business-revolution',
    WOW: 'wowcoin',
    XSTC: 'safe-trade-coin',
    ANTX: 'antimatter',
    FEDS: 'fedorashare',
    KARMA: 'karmacoin',
    MRC: 'microcoin',
    UNC: 'uncoin',
    STRB: 'superturbostake',
    SOUL: 'soulcoin',
    SFE: 'safecoin',
    HILL: 'president-clinton',
    VTY: 'victoriouscoin',
    BURN: 'president-sanders',
    QRZ: 'quartz-qrz',
    COUPE: 'coupecoin',
    YES: 'yescoin',
    NBE: 'bitcentavo',
    RBBT: 'rabbitcoin',
    SHND: 'stronghands',
    PAC: 'paccoin',
    BOND: 'bond',
    MIYU: 'miyucoin'
  };

  module.exports = bot => {
    bot.respond(/stats (\w+)$/i, msg => {
      var ticker;
      if(msg.match[1] && tickers[ticker = msg.match[1].toUpperCase()]) {
        bot.http("https://api.coinmarketcap.com/v1/ticker/" + tickers[ticker] + "/").get()((err, res, body) => {
          msg.send(JSON.stringify(JSON.parse(body)[0], null, 2))
        })
      } else {
        msg.send(ticker + " is not listed.")
      }
    });
    bot.respond(/price (\w+)$/i, msg => {
      var ticker;
      if(msg.match[1] && tickers[ticker = msg.match[1].toUpperCase()]) {
        bot.http("https://api.coinmarketcap.com/v1/ticker/" + tickers[ticker] + "/").get()((err, res, body) => {
          msg.send(ticker + " strike price is " + JSON.parse(body)[0].price_usd + "$.")
        })
      } else {
        msg.send(ticker + " is not listed.");
      }
    });
    bot.respond(/ticker (\w+) (\w+)$/i, msg => {
      bot.http("https://api.cryptonator.com/api/ticker/" + msg.match[1] + "-" + msg.match[2]).get()((err, res, body) => {
        body = JSON.parse(body);
        msg.send("One " + body.ticker.base) + " gives you " + body.ticker.price + " " + body.ticker.target + ". [24h Change: " + body.ticker.change + "%]")
      })
    })
  };

}).call(this);
