/**
 * redump-js - Redump Client Library <https://github.com/msikma/msikma-lib-projects>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

/** Indicates the region the game is from. A disc can have multiple regions. */
export const REGIONS = {
  // 'All' has no region section.
  '': 'all',
  // Every other item is included in the /region/:str/ segment.
  'Am': 'America',
  'As': 'Asia',
  'Eu': 'Europe',
  'T': 'Twins',
  'W': 'World',
  // The following regions are not listed in the search navigation.
  'A': 'Asia',
  'Au': 'Australia',
  'B': 'Brazil',
  'C': 'China',
  'E': 'Europe',
  'F': 'France',
  'G': 'Germany',
  'H': 'Hungary',
  'I': 'Italy',
  'J': 'Japan',
  'K': 'South Korea',
  'N': 'Netherlands',
  'P': 'Poland',
  'R': 'Russia',
  'S': 'Spain',
  'Sw': 'Sweden',
  'U': 'USA',
  'W': 'World'
}

/** Indicates whether the dump is confirmed or not. */
export const STATUS = {
  3: 'Possible bad dump',
  4: 'Dumped from original media',
  5: 'Two or more dumps from original media'
}

/** As above, but linked to the image name used for the status. */
export const STATUS_COLORS = {
  yellow: 3,
  blue: 4,
  green: 5
}

/** The systems currently supported by Redump. */
export const SYSTEMS = {
  'mac': 'Apple Macintosh',
  'qis': 'Bandai Playdia Quick Interactive System',
  'pippin': 'Bandai / Apple Pippin',
  'acd': 'Commodore Amiga CD',
  'cd32': 'Commodore Amiga CD32',
  'cdtv': 'Commodore Amiga CDTV',
  'fmt': 'Fujitsu FM Towns series',
  'pc': 'IBM PC compatible',
  'hs': 'Mattel HyperScan',
  'xbox': 'Microsoft Xbox',
  'pc-88': 'NEC PC-88 series',
  'pc-98': 'NEC PC-98 series',
  'pc-fx': 'NEC PC-FX & PC-FXGA',
  'pce': 'NEC PC Engine CD & TurboGrafx CD',
  'gc': 'Nintendo GameCube',
  'palm': 'Palm OS',
  '3do': 'Panasonic 3DO Interactive Multiplayer',
  'cdi': 'Philips CD-i',
  'photo-cd': 'Photo CD',
  'psxgs': 'PlayStation GameShark Updates',
  'dc': 'Sega Dreamcast',
  'mcd': 'Sega Mega CD & Sega CD',
  'ss': 'Sega Saturn',
  'ngcd': 'SNK Neo Geo CD',
  'psx': 'Sony PlayStation',
  'ps2': 'Sony PlayStation 2',
  'quizard': 'TAB-Austria Quizard',
  'ksite': 'Tomy Kiss-Site',
  'vflash': 'VTech V.Flash & V.Smile Pro',
  'gamewave': 'ZAPiT Games Game Wave Family Entertainment System',
  'triforce': 'Namco / Sega / Nintendo Triforce',
  'chihiro': 'Sega Chihiro',
  'lindbergh': 'Sega Lindbergh',
  'naomi': 'Sega Naomi',
  'naomi2': 'Sega Naomi 2',
}
