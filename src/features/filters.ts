/**
 * Marke
 */
const brand = {
  "adidas": 259154,
  "Alexander McQUEEN": 259913,
  "Arnette": 59185,
  "BOSS": 259962,
  "Botaniq": 1692,
  "Bottega Veneta": 15285,
  "BRENDEL eyewear": 23255,
  "Burberry": 1758,
  "Calvin Klein Jeans": 35904,
  "Calvin Klein": 1919,
  "Carolina Herrera": 25144,
  "Carrera": 2438,
  "Chiara Ferragni": 14820,
  "Chloé": 2365,
  "Coach": 29097,
  "Comma": 263002,
  "Converse": 23380,
  "David Beckham": 14823,
  "DKNY": 25488,
  "Dolce&Gabbana": 59146,
  "Dsquared2": 14825,
  "Emporio Armani": 2876,
  "Escada": 3178,
  "Eschenbach": 14828,
  "Esprit": 14829,
  "Fielmann": 41,
  "Fila": 14832,
  "Flexon": 267122,
  "Fossil": 22955,
  "FREIGEIST": 32326,
  "Furla": 14833,
  "Gant": 8742,
  "Giorgio Armani": 59149,
  "GIVENCHY": 261219,
  "Gucci": 8468,
  "Guess": 8783,
  "Hackett": 9138,
  "Hugo": 14814,
  "HUMPHREY´S eyewear": 17751,
  "ICEBERG": 264833,
  "Isabel Marant": 14835,
  "Jaguar": 9392,
  "Jette Joop": 267454,
  "Jimmy Choo": 27443,
  "JOOP!": 25539,
  "Just Cavalli": 72207,
  "Karl Lagerfeld": 10002,
  "Kate Spade": 9896,
  "Kenzo": 14838,
  "Lacoste": 10071,
  "Levi's": 14841,
  "Liu Jo": 10337,
  "Longchamp": 10224,
  "Love Moschino": 254226,
  "Lozza": 14840,
  "Marc Jacobs": 10563,
  "Marc O'Polo Eyewear": 54892,
  "Max Mara": 10668,
  "Mexx Eyes": 10942,
  "Michael Kors": 10462,
  "MINI EYEWEAR": 60838,
  "Missoni": 14843,
  "Miu Miu": 245103,
  "Moncler": 29921,
  "Montblanc": 14844,
  "Morgan": 16131,
  "Nike": 14845,
  "Nina Ricci": 25142,
  "O'Neill": 20093,
  "Oakley": 11457,
  "OWP": 11659,
  "Persol": 25120,
  "Polar": 22999,
  "Polaroid": 11799,
  "Police": 14851,
  "Polo Ralph Lauren": 27207,
  "Porsche Design": 14857,
  "Prada Linea Rossa": 245190,
  "Prada": 243399,
  "PUMA": 11697,
  "rag & bone": 262033,
  "Ralph Lauren": 12595,
  "Ray Ban Junior": 261192,
  "Ray-Ban": 14860,
  "Rodenstock": 13451,
  "Saint Laurent": 13523,
  "Salvatore Ferragamo": 264178,
  "Sandro": 67782,
  "Scotch & Soda": 14869,
  "Scuderia Ferrari": 61009,
  "Smith": 13788,
  "Stella McCartney": 25520,
  "Sting": 25942,
  "Superdry": 14862,
  "Swarovski": 54068,
  "Timberland": 13886,
  "Tod´s": 261511,
  "Tom Ford": 14029,
  "Tommy Hilfiger": 14212,
  "Versace": 17023,
  "Victoria Beckham": 57357,
  "Vogue": 14513,
  "Zadig & Voltaire": 14871,
  "Zeiss": 20957,
} as const;

/**
 * Zielgruppe
 */
const targetGroup = {
  "Damen": 1073,
  "Herren": 1031,
  "Kinder": 1795,
  "Teens": 2595,
  "Unisex": 1094,
} as const;

/**
 * Brillenform
 */
const shape = {
  "Browline": 9545,
  "Butterfly": 1258,
  "Cateye": 66159,
  "Eckig": 1040,
  "Mehreckig": 60799,
  "Oval": 1129,
  "Panto": 1392,
  "Pilot": 1030,
  "Rund": 1291,
  "Schmal": 36625,
} as const;

/**
 * Gesichtsform
 */
const faceShape = {
  "Eckig": 1020,
  "Herz": 1019,
  "Oval": 1018,
  "Rund": 1036,
  "Trapez": 59137,
} as const;

/**
 * Farbe
 */
const searchColorEcom = {
  "Beige": 1332,
  "Blau": 1086,
  "Braun": 1286,
  "Bronze": 17680,
  "Bunt": 21486,
  "Gelb": 1700,
  "Gold": 17363,
  "Grau": 1083,
  "Grün": 1315,
  "Havanna": 1147,
  "Kupfer": 17983,
  "Lila": 1363,
  "Orange": 1753,
  "Pink": 17332,
  "Rot": 1215,
  "Schwarz": 1007,
  "Silber": 17369,
  "Transparent": 1074,
  "Weiss": 54588,
} as const;

/**
 * Fassungstyp
 */
const rimType = {
  "Randlos": 1443,
  "Halbrand": 59663,
  "Vollrand": 1029,
} as const;

/**
 * Fassungsmaterial
 */
const sapMaterial = {
  "Acetat": 1413,
  "Acetat Metall": 54784,
  "Aluminium": 71628,
  "Beta Titan": 71724,
  "Bio-Acetat": 1552,
  "Bio-Kunststoff": 17358,
  "Blockacetat": 3641,
  "Edelstahl": 1617,
  "ISCC zertifiziertes recyceltes Acetat": 68444,
  "Kunststoff": 55,
  "Kunststoff Metall": 32765,
  "Material Mix": 32311,
  "Memory Titan": 69926,
  "Metall": 42,
  "Nylon": 3884,
  "Propionat": 3680,
  "Recycelt": 6161,
  "Recycled Acetat": 31681,
  "Titan": 2330,
  "Titanflex": 3121,
  "TR90": 31862,
} as const;

/**
 * Kopfbreite
 */
const headWidth = {
  "L": 54379,
  "M": 54377,
  "S": 54389,
} as const;

/**
 * Brillenbreite
 */
const glassesWidth = {
  "99 mm": 54403,
  "108 mm": 54398,
  "110 mm": 54465,
  "111 mm": 54434,
  "111.8 mm": 264998,
  "112 mm": 54394,
  "113 mm": 54442,
  "114 mm": 54445,
  "115 mm": 54440,
  "116 mm": 54393,
  "117 mm": 54402,
  "118 mm": 54421,
  "119 mm": 54410,
  "120 mm": 54395,
  "121 mm": 54433,
  "122 mm": 54427,
  "123 mm": 54431,
  "124": 259548,
  "124 mm": 54401,
  "125 mm": 54418,
  "126 mm": 54376,
  "127 mm": 54386,
  "128": 261902,
  "128 mm": 54414,
  "129 mm": 54382,
  "130 mm": 54380,
  "131 mm": 54387,
  "131.4": 265058,
  "132": 261904,
  "132 mm": 54390,
  "133 mm": 54388,
  "134": 262768,
  "134 mm": 54378,
  "135 mm": 54415,
  "135.5": 265781,
  "136": 264023,
  "136 mm": 54381,
  "136.6": 264840,
  "137 mm": 54420,
  "138 mm": 54407,
  "139 mm": 54385,
  "139.3": 265142,
  "140": 264077,
  "140 mm": 54426,
  "140.5": 272475,
  "141 mm": 54424,
  "142 mm": 54425,
  "142.7": 264314,
  "143 mm": 54408,
  "144": 264024,
  "144 mm": 54396,
  "145": 264172,
  "150": 264917,
} as const;

/**
 * Virtuelle-Anprobe möglich
 */
const virtualTryOnReady = {
  "false": 17435,
  "true": 17342,
} as const;

export {
  brand,
  faceShape,
  glassesWidth,
  headWidth,
  rimType,
  sapMaterial,
  searchColorEcom,
  shape,
  targetGroup,
  virtualTryOnReady,
};
