'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * mandarake-js - Mandarake Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma
 */

var EVERYTHING = exports.EVERYTHING = ['00', 'Everything', 'すべて'];
var COMICS_EVERYTHING = exports.COMICS_EVERYTHING = ['11', 'Comics (everything)', 'コミック（すべて）'];
var BOOKS_EVERYTHING = exports.BOOKS_EVERYTHING = ['01', 'Books (everything)', '本（すべて）'];
var MAGAZINES_EVERYTHING = exports.MAGAZINES_EVERYTHING = ['10', 'Magazines (everything)', '雑誌（すべて）'];
var TOYS_EVERYTHING = exports.TOYS_EVERYTHING = ['02', 'Toys (everything)', 'TOY（すべて）'];
var DOUJIN_EVERYTHING = exports.DOUJIN_EVERYTHING = ['03', 'Doujin (everything)', '同人（すべて）'];
var DISK_GAME_EVERYTHING = exports.DISK_GAME_EVERYTHING = ['04', 'Disk/game (everything)', 'DISK ゲーム（すべて）'];
var IDOL_EVERYTHING = exports.IDOL_EVERYTHING = ['05', 'Idol (everything)', 'アイドル（すべて）'];
var CARD_EVERYTHING = exports.CARD_EVERYTHING = ['06', 'Cards (everything)', 'カード（すべて）'];
var ANIME_CEL_SCRIPT_EVERYTHING = exports.ANIME_CEL_SCRIPT_EVERYTHING = ['07', 'Anime cels/scripts (everything)', 'アニメ セル画・台本（すべて）'];
var GALLERY_EVERYTHING = exports.GALLERY_EVERYTHING = ['08', 'Gallery (everything)', 'ギャラリー（すべて）'];
var MANDARAKE_EVERYTHING = exports.MANDARAKE_EVERYTHING = ['09', 'Mandarake Publishing (everything)', 'まんだらけ出版（すべて）'];
var ARK_EVERYTHING = exports.ARK_EVERYTHING = ['30', 'Ark (everything)', 'ARK（すべて）'];
var OTHERS_EVERYTHING = exports.OTHERS_EVERYTHING = ['99', 'Others (everything)', 'その他（すべて）'];
var COMICS = exports.COMICS = ['1101', 'Comics', 'コミック'];
var SHONEN_COMICS = exports.SHONEN_COMICS = ['110101', 'Shonen Comics', '少年コミック'];
var SHOJO_COMICS = exports.SHOJO_COMICS = ['110102', 'Shojo Comics', '少女コミック'];
var SEINEN_COMICS = exports.SEINEN_COMICS = ['110103', 'Seinen Comics', '青年コミック'];
var ADULT_COMICS = exports.ADULT_COMICS = ['110104', 'Adult Comics', '成年コミック'];
var FOREIGN_COMICS = exports.FOREIGN_COMICS = ['110105', 'Foreign Comics', '海外コミック'];
var BL_COMICS = exports.BL_COMICS = ['110106', 'BL Comics', 'BLコミック'];
var SET = exports.SET = ['110107', 'Set', '全巻・最新刊セット'];
var TRANSLATE_COMICS = exports.TRANSLATE_COMICS = ['110109', 'Translate Comics', '翻訳コミック'];
var CONVENIENCE_STORE_COMICS = exports.CONVENIENCE_STORE_COMICS = ['110110', 'Convenience store Comics', 'コンビニコミック'];
var LITTLE_PRESS = exports.LITTLE_PRESS = ['110111', 'Little press', 'リトルプレス'];
var OTHERS_COMICS = exports.OTHERS_COMICS = ['110199', 'Others', 'その他'];
var VINTAGE_COMICS = exports.VINTAGE_COMICS = ['1102', 'Vintage Comics', 'ヴィンテージコミック'];
var COMICS_BEFORE_1945 = exports.COMICS_BEFORE_1945 = ['110201', 'Comics(before 1945)', '戦前漫画単行本(昭和20年以前)'];
var COMICS_1956_1964 = exports.COMICS_1956_1964 = ['110202', 'Comics(1956-1964)', '戦後漫画単行本(昭和20から30年代)'];
var AKAHON_SENKASHIHON_COMICS = exports.AKAHON_SENKASHIHON_COMICS = ['110203', 'Akahon / Senkashihon (comics)', '赤本/仙花紙本'];
var KASHIHON = exports.KASHIHON = ['110204', 'Kashihon', '貸本'];
var FUROKU_COMICS = exports.FUROKU_COMICS = ['110205', 'Furoku Comics', '付録本'];
var LIMITED_DISTRIBUTION_COMICS = exports.LIMITED_DISTRIBUTION_COMICS = ['110206', 'Limited distribution Comics', '限定流通コミックス'];
var VINTAGE_COMICS_AFTER_1965 = exports.VINTAGE_COMICS_AFTER_1965 = ['110207', 'Vintage Comics(after 1965)', 'コミックス(昭和40年以降)'];
var NOVELS_ALL = exports.NOVELS_ALL = ['1103', 'Novels (all)', '小説・ライトノベル'];
var LIGHT_NOVELS = exports.LIGHT_NOVELS = ['110301', 'Light Novels', 'ライトノベル'];
var BL_NOVELS = exports.BL_NOVELS = ['110302', 'BL Novels', 'BL小説'];
var TL_NOVELS = exports.TL_NOVELS = ['110303', 'TL Novels', 'TL小説'];
var NOVELS = exports.NOVELS = ['110305', 'Novels', '小説'];
var ADULT_NOVELS = exports.ADULT_NOVELS = ['110307', 'Adult Novels', '成年小説'];
var GAME_BOOKS = exports.GAME_BOOKS = ['110309', 'Game Books', 'ゲームブック'];
var TRPG = exports.TRPG = ['110310', 'TRPG', 'TRPG'];
var OTHERS_NOVELS = exports.OTHERS_NOVELS = ['110399', 'Others', 'その他'];
var GOODS = exports.GOODS = ['12', 'Goods', 'グッズ'];
var SHONEN_COMICS_GOODS = exports.SHONEN_COMICS_GOODS = ['1201', 'Shonen Comics', '少年マンガ作品'];
var SHONEN_COMIC_MAGAZINE_GOODS = exports.SHONEN_COMIC_MAGAZINE_GOODS = ['1202', 'Shonen Comic magazine goods', '少年誌付録'];
var MOVIE_THEATER_ORIGINAL_GOODS = exports.MOVIE_THEATER_ORIGINAL_GOODS = ['1203', 'Movie Theater original goods', '劇場特典'];
var TAPESTRY = exports.TAPESTRY = ['1208', 'Tapestry', 'タペストリー'];
var SHOP_BONUS = exports.SHOP_BONUS = ['1209', 'Shop bonus', '店舗特典'];
var SHOJO_COMICS_GOODS = exports.SHOJO_COMICS_GOODS = ['1204', 'Shojo Comics', '少女マンガ作品'];
var GIRL_RETRO = exports.GIRL_RETRO = ['1205', 'Girl retro', '少女レトロ'];
var OTOME_GOODS = exports.OTOME_GOODS = ['1206', 'Otome Goods', '乙女グッズ'];
var BL_GOODS = exports.BL_GOODS = ['1207', 'BL Goods', 'BLグッズ'];
var OTHERS_GOODS = exports.OTHERS_GOODS = ['1299', 'Others', 'その他'];
var BOOKS = exports.BOOKS = ['Books', '', '0102'];
var MOOKS_TOKUSATSU_ANIME = exports.MOOKS_TOKUSATSU_ANIME = ['0133', 'Mooks (Tokusatsu/Anime)', 'ムック(特撮・アニメ)'];
var MOOKS_BISHOJO = exports.MOOKS_BISHOJO = ['0132', 'Mooks (Bishojo)', 'ムック(美少女)'];
var ART_BOOKS = exports.ART_BOOKS = ['0131', 'Art books', '画集'];
var PAMPHLETS = exports.PAMPHLETS = ['0130', 'Pamphlets', 'パンフレット'];
var TV_PICTURE_BOOKS = exports.TV_PICTURE_BOOKS = ['0111', 'TV Picture Books', 'テレビ絵本'];
var TOKUSATSU_ENCYCLOPEDIA_CHILDRENS_BOOKS = exports.TOKUSATSU_ENCYCLOPEDIA_CHILDRENS_BOOKS = ['0112', 'Tokusatsu Encyclopedia, Children\'s Books', '特撮図鑑・児童書'];
var OTHER_RELATED_BOOKS = exports.OTHER_RELATED_BOOKS = ['0134', 'Other Related books', 'その他関連書籍'];
var SUBCULTURE_BOOK = exports.SUBCULTURE_BOOK = ['0103', 'Subculture Book', 'アート・サブカル'];
var PICTURE_BOOKS = exports.PICTURE_BOOKS = ['010301', 'Picture books', '絵本・童話'];
var PHOTOGRAPHS = exports.PHOTOGRAPHS = ['010302', 'Photographs', '写真集'];
var ART_DESIGN = exports.ART_DESIGN = ['010304', 'Art, Design', 'アート・デザイン'];
var SUBCULTURE_SEX_CULTURE = exports.SUBCULTURE_SEX_CULTURE = ['010307', 'Subculture, Sex culture', '趣味・娯楽・カルチャー'];
var MUSIC_SUBCULTURE_BOOK = exports.MUSIC_SUBCULTURE_BOOK = ['010308', 'Music', '音楽'];
var FASHION = exports.FASHION = ['010310', 'Fashion', 'ファッション'];
var PERFORMING_ARTS = exports.PERFORMING_ARTS = ['010311', 'Performing arts', '舞台芸術'];
var MOVIES_TV_SERIES = exports.MOVIES_TV_SERIES = ['010314', 'Movies, TV series', '映画・ドラマ'];
var NATURE = exports.NATURE = ['010315', 'Nature', 'ネイチャー'];
var ARCHITECTURE_INTERIOR = exports.ARCHITECTURE_INTERIOR = ['010316', 'Architecture, Interior', '建築・インテリア'];
var LIFESTYLE = exports.LIFESTYLE = ['010318', 'Lifestyle', '暮らし'];
var OTHERS_SUBCULTURE = exports.OTHERS_SUBCULTURE = ['010399', 'Others', 'その他'];
var YOUNG_READING = exports.YOUNG_READING = ['0106', 'Young reading', '小説・ジュブナイル'];
var LITERATURE = exports.LITERATURE = ['010601', 'Literature', '文芸一般'];
var POETRY = exports.POETRY = ['010602', 'Poetry', '詩・短歌'];
var SCI_FI_MYSTERY = exports.SCI_FI_MYSTERY = ['010603', 'Sci-Fi, Mystery', 'SF・ミステリ･幻想'];
var FICTION = exports.FICTION = ['010604', 'Fiction', 'ジュブナイル'];
var KASHIHON_NOVELS = exports.KASHIHON_NOVELS = ['010605', 'Kashihon novels', '貸本小説'];
var OTHERS_YOUNG_READING = exports.OTHERS_YOUNG_READING = ['010699', 'Others', 'その他'];
var SCIENCE_HUMANITIES = exports.SCIENCE_HUMANITIES = ['0107', 'Science & Humanities', '人文・自然科学'];
var HUMANITIES_SOCIOLOGY = exports.HUMANITIES_SOCIOLOGY = ['010701', 'Humanities & Sociology', '人文・社会'];
var NATURAL_SCIENCE_ENGINEERING = exports.NATURAL_SCIENCE_ENGINEERING = ['010702', 'Natural Science & Engineering', '自然科学・理工'];
var MILITARY = exports.MILITARY = ['010703', 'Military', 'ミリタリ'];
var DICTIONARIES_ENCYCLOPEDIAS = exports.DICTIONARIES_ENCYCLOPEDIAS = ['010704', 'Dictionaries & Encyclopedias', '図鑑・事典'];
var OTHERS_SCIENCE_HUMANITIES = exports.OTHERS_SCIENCE_HUMANITIES = ['010799', 'Others', 'その他'];
var SEXUAL_ADULT_INTERESTS = exports.SEXUAL_ADULT_INTERESTS = ['0108', 'Sexual & Adult Interests', '性風俗・成年向け'];
var S_M = exports.S_M = ['010801', 'S&M', 'SM'];
var FETISHES = exports.FETISHES = ['010802', 'Fetishes', 'フェチ'];
var VINYL_BOOKS = exports.VINYL_BOOKS = ['010803', 'Vinyl Books', 'ビニ本・自販機本'];
var NUDE_PHOTOGRAPHY = exports.NUDE_PHOTOGRAPHY = ['010804', 'Nude Photography', 'ヌード写真'];
var LIGHT_NOVELS_SEXUAL_ADULT_INTERESTS = exports.LIGHT_NOVELS_SEXUAL_ADULT_INTERESTS = ['010805', 'Light Novels', '小説・読み物'];
var ADULT_MAGAZINES = exports.ADULT_MAGAZINES = ['010806', 'Adult Magazines', '成年雑誌'];
var EROTIC_ARTS = exports.EROTIC_ARTS = ['010807', 'Erotic Arts', '春画・艶本'];
var LGBT = exports.LGBT = ['010808', 'LGBT', 'LGBT'];
var OTHERS_SEXUAL_ADULT_INTERESTS = exports.OTHERS_SEXUAL_ADULT_INTERESTS = ['010899', 'Others', 'その他'];
var SPIRIT_WORLD = exports.SPIRIT_WORLD = ['0104', 'Spirit World', '精神世界'];
var PARANORMAL = exports.PARANORMAL = ['010401', 'Paranormal', '超常現象・陰謀論'];
var SPIRITUAL_SPIRIT_WORLD = exports.SPIRITUAL_SPIRIT_WORLD = ['010402', 'Spiritual', 'スピリチュアリティ'];
var ORIENTAL = exports.ORIENTAL = ['010403', 'Oriental', '東洋'];
var HEALTH_BODY_WORK = exports.HEALTH_BODY_WORK = ['010404', 'Health, Body work', '健康・からだ'];
var MARTIAL_ARTS = exports.MARTIAL_ARTS = ['010405', 'Martial arts', '武'];
var JAPAN = exports.JAPAN = ['010406', 'Japan', '日本'];
var NEW_RELIGIOUS_MOVEMENT = exports.NEW_RELIGIOUS_MOVEMENT = ['010407', 'New religious movement', '新宗教'];
var BIG_THREE_RELIGIONS = exports.BIG_THREE_RELIGIONS = ['010408', 'Big three religions', '三大宗教・オリエント'];
var OCCULTISM = exports.OCCULTISM = ['010409', 'Occultism', 'オカルティズム'];
var FORTUNE_TELLING = exports.FORTUNE_TELLING = ['010410', 'Fortune telling', '占い・呪術'];
var OTHERS_SPIRIT_WORLD = exports.OTHERS_SPIRIT_WORLD = ['010499', 'Others', 'その他'];
var MAGAZINES = exports.MAGAZINES = ['1001', 'Magazines', '一般雑誌'];
var ENTERTAINMENTS_IDOL = exports.ENTERTAINMENTS_IDOL = ['100101', 'Entertainments, Idol', '芸能・アイドル'];
var SUBCULTURE = exports.SUBCULTURE = ['100102', 'Subculture', 'サブカルチャー'];
var ART_DESIGN_MAGAZINES = exports.ART_DESIGN_MAGAZINES = ['100103', 'Art, Design', 'アート・デザイン'];
var FASHION_CULTURE = exports.FASHION_CULTURE = ['100104', 'Fashion, Culture', 'ファッション・カルチャー'];
var SF_MYSTERY_FANTASY = exports.SF_MYSTERY_FANTASY = ['100105', 'SF, Mystery, Fantasy', 'SF・ミステリ･幻想'];
var MUSIC_MAGAZINES = exports.MUSIC_MAGAZINES = ['100106', 'Music', '音楽'];
var BOYS_GIRLS_MAGAZINE = exports.BOYS_GIRLS_MAGAZINE = ['100107', 'Boys, Girls Magazine', '少年誌・少女雑誌'];
var LITERATURE_MAGAZINES = exports.LITERATURE_MAGAZINES = ['100108', 'Literature', '文芸・人文系'];
var ARCHITECTURE_INTERIOR_MAGAZINES = exports.ARCHITECTURE_INTERIOR_MAGAZINES = ['100109', 'Architecture, Interior', '建築・インテリア'];
var INNER_WORLD = exports.INNER_WORLD = ['100110', 'Inner world', '精神世界系'];
var PHOTO_MAGAZINES = exports.PHOTO_MAGAZINES = ['100111', 'Photo', '写真'];
var OTHERS_MAGAZINES = exports.OTHERS_MAGAZINES = ['100199', 'Others', 'その他'];
var COMIC_MAGAZINE = exports.COMIC_MAGAZINE = ['1002', 'Comic Magazine', 'マンガ雑誌'];
var GIRLS_MANGA_MAGAZINES = exports.GIRLS_MANGA_MAGAZINES = ['100201', 'Girl\'s manga magazines', '少女マンガ雑誌'];
var WOMAN_COMIC_MAGAZINES = exports.WOMAN_COMIC_MAGAZINES = ['100202', 'Woman comic magazines', '女性マンガ誌'];
var CHILDRENS_TV_MAGAZINES = exports.CHILDRENS_TV_MAGAZINES = ['100203', 'Children\'s TV magazines', '児童向けテレビ雑誌'];
var BOYS_MANGA_MAGAZINES = exports.BOYS_MANGA_MAGAZINES = ['100204', 'Boy\'s manga magazines', '少年マンガ誌'];
var FOR_YOUNG_COMIC_MAGAZINES = exports.FOR_YOUNG_COMIC_MAGAZINES = ['100205', 'For young comic magazines', '青年マンガ誌'];
var GEKIGA_MAGAZINES = exports.GEKIGA_MAGAZINES = ['100206', 'Gekiga magazines', '劇画雑誌'];
var CHILDRENS_MAGAZINES = exports.CHILDRENS_MAGAZINES = ['100207', 'Children\'s magazines', '幼年誌'];
var STUDENTS__MAGAZINES = exports.STUDENTS__MAGAZINES = ['100208', 'Student\'s  magazines', '学年誌'];
var GARO = exports.GARO = ['100281', 'GARO', 'ガロ'];
var COM = exports.COM = ['100282', 'COM', 'COM'];
var HOROR_MANGA_MAGAZINES = exports.HOROR_MANGA_MAGAZINES = ['100296', 'Horor manga magazines', 'ホラーマンガ誌'];
var BOYSLOVE_COMIC_MAGAZINES = exports.BOYSLOVE_COMIC_MAGAZINES = ['100297', 'Boyslove comic magazines', 'BLマンガ雑誌'];
var ADULT_COMIC_MAGAZINES = exports.ADULT_COMIC_MAGAZINES = ['100298', 'Adult comic magazines', '成年マンガ誌'];
var OTHERS_COMIC_MAGAZINES = exports.OTHERS_COMIC_MAGAZINES = ['100299', 'Others', 'その他'];
var ANIME_INFORMATION_MAGAZINES = exports.ANIME_INFORMATION_MAGAZINES = ['1003', 'Anime information magazines', 'アニメ情報誌'];
var COMIC_LIGHT_NOVEL_INFORMATION_MAGAZINES = exports.COMIC_LIGHT_NOVEL_INFORMATION_MAGAZINES = ['1004', 'Comic & light novel information magazines', 'マンガ情報誌'];
var TOKUSATSU_INFORMATION_MAGAZINES = exports.TOKUSATSU_INFORMATION_MAGAZINES = ['1005', 'Tokusatsu information magazines', '特撮情報誌'];
var HOBBY_INFORMATION_MAGAZINES = exports.HOBBY_INFORMATION_MAGAZINES = ['1006', 'Hobby information magazines', '模型&ホビー誌'];
var VOICE_ACTOR_ANIME_SONG_INFORMATION_MAGAZINES = exports.VOICE_ACTOR_ANIME_SONG_INFORMATION_MAGAZINES = ['1007', 'Voice actor & Anime song information magazines', '声優＆アニソン情報誌'];
var COSPLAY_MAGAZINES = exports.COSPLAY_MAGAZINES = ['1008', 'Cosplay magazines', 'コスプレ雑誌'];
var LADIES_GAME_MAGAZINES = exports.LADIES_GAME_MAGAZINES = ['1009', 'Ladies game magazines', '乙女ゲーム雑誌'];
var INFOMATION_MAGAZINE_SUPPLEMENTS = exports.INFOMATION_MAGAZINE_SUPPLEMENTS = ['1097', 'Infomation magazine supplements', '情報誌付録'];
var ADULT_CONTENTS_INFOMATION_MAGAZINES = exports.ADULT_CONTENTS_INFOMATION_MAGAZINES = ['1098', 'Adult contents infomation magazines', '成年メディア情報誌'];
var OTHERS_INFORMATION_MAGAZINES = exports.OTHERS_INFORMATION_MAGAZINES = ['1099', 'Others', 'その他雑誌'];
var GIRLS_NOVEL_MAGAZINES = exports.GIRLS_NOVEL_MAGAZINES = ['101001', 'Girl\'s novel magazines', '少女小説誌'];
var BOYS_LOVE_NOVEL_MAGAZINES = exports.BOYS_LOVE_NOVEL_MAGAZINES = ['101002', 'Boys love novel magazines', 'BL小説誌'];
var SOFT_VINYL = exports.SOFT_VINYL = ['200104', 'Soft Vinyl', 'ソフビ'];
var CHOGOKIN = exports.CHOGOKIN = ['020105', 'Chogokin', '合金'];
var FIGURES = exports.FIGURES = ['020101', 'Figures', 'フィギュア・PVC'];
var BISHOJO_FIGURES = exports.BISHOJO_FIGURES = ['020102', 'Bishojo Figures', '美少女フィギュア'];
var ACTION_FIGURES = exports.ACTION_FIGURES = ['020103', 'Action Figures', 'アクションフィギュア'];
var ARTIST_TOYS = exports.ARTIST_TOYS = ['020112', 'Artist Toys', 'アーティストTOY'];
var HENSHIN_TOYS = exports.HENSHIN_TOYS = ['020104', 'Henshin Toys', '変身・なりきり系TOY'];
var PLASTIC_TOYS = exports.PLASTIC_TOYS = ['020108', 'Plastic Toys', 'プラTOY'];
var AMERICAN_TOYS = exports.AMERICAN_TOYS = ['020113', 'American Toys', 'アメTOY'];
var PRIZE_TOYS = exports.PRIZE_TOYS = ['020111', 'Prize Toys', 'プライズ'];
var DOLLS = exports.DOLLS = ['020114', 'Dolls', 'ドール'];
var PLASTIC_MODEL_KITS = exports.PLASTIC_MODEL_KITS = ['020110', 'Plastic Model Kits', 'プラモデル'];
var GARAGE_KIT = exports.GARAGE_KIT = ['020107', 'Garage Kit', 'ガレージキット'];
var TIN_TOYS_PRE_WAR_TOYS_ETC = exports.TIN_TOYS_PRE_WAR_TOYS_ETC = ['020116', 'Tin Toys, Pre-war Toys etc', 'ブリキ・戦前おもちゃ等'];
var JPA_ENTERPRISE_GOODS = exports.JPA_ENTERPRISE_GOODS = ['020118', 'JPA, Enterprise Goods', 'JPA・企業もの'];
var VEHICLES = exports.VEHICLES = ['020115', 'Vehicles', '乗り物TOY'];
var RUBBER_FIGURES = exports.RUBBER_FIGURES = ['020109', 'Rubber Figures', '塩ビ・消しゴム'];
var BLOCKS_LEGO = exports.BLOCKS_LEGO = ['020117', 'Blocks/LEGO', 'ブロック/LEGO'];
var DISNEY = exports.DISNEY = ['020119', 'Disney', 'ディズニー'];
var OTHERS_TOYS = exports.OTHERS_TOYS = ['020199', 'Others', 'その他'];
var TOKUSATSU = exports.TOKUSATSU = ['020201', 'Tokusatsu', '特撮'];
var ANIME_COMICS = exports.ANIME_COMICS = ['020202', 'Anime/Comics', 'マンガ・アニメ・ゲーム'];
var AMERICAN_COMICS = exports.AMERICAN_COMICS = ['020204', 'American Comics', '洋画・アメコミヒーロー'];
var DOUJINSHI_MALE_AUDIENCE = exports.DOUJINSHI_MALE_AUDIENCE = ['030101', 'Doujinshi', '同人誌'];
var ANIME_PICTURE_COLLECTION = exports.ANIME_PICTURE_COLLECTION = ['030110', 'Anime Picture Collection', 'アニメ原画集'];
var SOUND_HORIZON = exports.SOUND_HORIZON = ['030102', 'Sound Horizon', 'Sound Horizon'];
var DAKIMAKURA = exports.DAKIMAKURA = ['030103', 'Dakimakura', '抱き枕・シーツ類'];
var TOHO_PROJECT = exports.TOHO_PROJECT = ['030106', 'Toho project', '東方Project'];
var VOCALOID_ROMS = exports.VOCALOID_ROMS = ['030105', 'Vocaloid ROMs', 'ボーカロイドROM'];
var COSPLAY_ROMS = exports.COSPLAY_ROMS = ['030104', 'Cosplay ROMs', 'コスプレROM'];
var ADULT_ROMS = exports.ADULT_ROMS = ['030107', 'Adult ROMs', '成年DVD'];
var DOUJIN_MUSIC = exports.DOUJIN_MUSIC = ['030108', 'Doujin Music', '同人音楽'];
var POSTERS_MALE_DOUJINSHI = exports.POSTERS_MALE_DOUJINSHI = ['030111', 'Posters', 'ポスター'];
var DOUJIN_SOFTS = exports.DOUJIN_SOFTS = ['030197', 'Doujin Softs', 'その他同人ソフト'];
var DOUJIN_GOODS = exports.DOUJIN_GOODS = ['030198', 'Doujin Goods', 'その他グッズ'];
var OTHERS_MALE_AUDIENCE_DOUJINSHI = exports.OTHERS_MALE_AUDIENCE_DOUJINSHI = ['030199', 'Others', 'その他'];
var NEW_DOUJINSHI = exports.NEW_DOUJINSHI = ['0302', 'New Doujinshi', '新刊男性同人'];
var PC_GAME_MALE_DOUJINSHI = exports.PC_GAME_MALE_DOUJINSHI = ['030114', 'PC Game', 'PCゲーム'];
var DOUJINSHI_FEMALE_AUDIENCE = exports.DOUJINSHI_FEMALE_AUDIENCE = ['030301', 'Doujinshi', '同人誌'];
var GOODS_FEMALE_AUDIENCE_DOUJINSHI = exports.GOODS_FEMALE_AUDIENCE_DOUJINSHI = ['030304', 'Goods', 'グッズ'];
var GAMES = exports.GAMES = ['030303', 'Games', 'ゲーム'];
var OTHERS_FEMALE_AUDIENCE_DOUJINSHI = exports.OTHERS_FEMALE_AUDIENCE_DOUJINSHI = ['030399', 'Others', 'その他'];
var BRAND_NEW_FANZINES = exports.BRAND_NEW_FANZINES = ['0304', 'Brand new fanzines', '新刊女性同人'];
var DOUJINSHI_REFERENCE_TYPE = exports.DOUJINSHI_REFERENCE_TYPE = ['0305', 'Doujinshi', '資料系'];
var MANGA = exports.MANGA = ['030601', 'Manga', 'マンガ'];
var ANIME = exports.ANIME = ['030602', 'Anime', 'アニメ'];
var TOKUSATSU_REFERENCE_TYPE = exports.TOKUSATSU_REFERENCE_TYPE = ['030603', 'Tokusatsu', '特撮(実写ドラマ含む)'];
var COLLECTION = exports.COLLECTION = ['030604', 'Collection', 'コレクション(TOYなど)'];
var MILITARY_REFERENCE_TYPE = exports.MILITARY_REFERENCE_TYPE = ['030605', 'Military', 'ミリタリー'];
var FOODS_DRINKS = exports.FOODS_DRINKS = ['030606', 'Foods/Drinks', '食べ物・飲み物'];
var OTHERS_BRAND_NEW_REFERENCE_TYPE_DOUJINSHI = exports.OTHERS_BRAND_NEW_REFERENCE_TYPE_DOUJINSHI = ['030699', 'Others', 'その他'];
var ANIME_CD = exports.ANIME_CD = ['040101', 'Anime', 'アニメ'];
var TOKUSATSU_CD = exports.TOKUSATSU_CD = ['040102', 'Tokusatsu', '特撮'];
var KAMEN_RIDER_ULTRAMAN_SENTAI = exports.KAMEN_RIDER_ULTRAMAN_SENTAI = ['040106', 'Kamen rider / Ultraman / Sentai', '仮面ライダー / ウルトラマン / 戦隊'];
var VOICE_ACTOR_CD = exports.VOICE_ACTOR_CD = ['040107', 'Voice Actor', '声優'];
var ANIME_SONG = exports.ANIME_SONG = ['040108', 'Anime Song', 'アニソン歌手'];
var VOCALOID_UTAITE = exports.VOCALOID_UTAITE = ['040109', 'Vocaloid / Utaite', 'ボーカロイド/歌い手'];
var GAME_CD = exports.GAME_CD = ['040105', 'Game', 'ゲーム'];
var MUSIC_CD = exports.MUSIC_CD = ['040104', 'Music', '音楽'];
var OTHERS_CD = exports.OTHERS_CD = ['040199', 'Others', 'その他'];
var OTOME_GAME_CD = exports.OTOME_GAME_CD = ['040112', 'Otome game', '乙女ゲーム'];
var SITUATION_CD = exports.SITUATION_CD = ['040113', 'Situation', 'シチュエーション/企画系'];
var FEMALE_LIGHT_NOVEL_CD = exports.FEMALE_LIGHT_NOVEL_CD = ['040114', 'Female light novel', '女性ライトノベル原作'];
var BL_CD = exports.BL_CD = ['040103', 'BL', 'BL'];
var ANIME_DVD = exports.ANIME_DVD = ['040201', 'Anime', 'アニメ'];
var TOKUSATSU_DVD = exports.TOKUSATSU_DVD = ['040202', 'Tokusatsu', '特撮'];
var VOICE_ACTOR_DVD = exports.VOICE_ACTOR_DVD = ['040209', 'Voice Actor', '声優'];
var DORAMA_DVD = exports.DORAMA_DVD = ['040204', 'Dorama', 'ドラマ'];
var MOVIE_DVD = exports.MOVIE_DVD = ['040205', 'Movie', '洋画'];
var JAPANESE_MOVIE = exports.JAPANESE_MOVIE = ['040206', 'Japanese Movie', '邦画'];
var LIVE_DVD = exports.LIVE_DVD = ['040207', 'Live', 'ライブ'];
var MUSICAL_DVD = exports.MUSICAL_DVD = ['040208', 'Musical', '舞台'];
var GAME_DVD = exports.GAME_DVD = ['040210', 'Game', 'ゲーム'];
var VARIETY_DVD = exports.VARIETY_DVD = ['040211', 'Variety', 'バラエティ'];
var OTHERS_DVD = exports.OTHERS_DVD = ['040299', 'Others', 'その他'];
var OTOME_GAME_DVD = exports.OTOME_GAME_DVD = ['040212', 'Otome game', '乙女ゲーム'];
var SITUATION_DVD = exports.SITUATION_DVD = ['040213', 'Situation', 'シチュエーション/企画系'];
var FEMALE_LIGHT_NOVEL_DVD = exports.FEMALE_LIGHT_NOVEL_DVD = ['040214', 'Female light novel', '女性ライトノベル原作'];
var BL_DVD = exports.BL_DVD = ['040203', 'BL', 'BL'];
var ANIME_BLU_RAY = exports.ANIME_BLU_RAY = ['040301', 'Anime', 'アニメ'];
var TOKUSATSU_BLU_RAY = exports.TOKUSATSU_BLU_RAY = ['040302', 'Tokusatsu', '特撮'];
var DORAMA_BLU_RAY = exports.DORAMA_BLU_RAY = ['040304', 'Dorama', 'ドラマ'];
var MOVIE_BLU_RAY = exports.MOVIE_BLU_RAY = ['040305', 'Movie', '洋画'];
var JAPANESE_MOVIE_BLU_RAY = exports.JAPANESE_MOVIE_BLU_RAY = ['040306', 'Japanese movie', '邦画'];
var LIVE_BLU_RAY = exports.LIVE_BLU_RAY = ['040307', 'Live', 'ライブ'];
var MUSICAL_BLU_RAY = exports.MUSICAL_BLU_RAY = ['040308', 'Musical', '舞台'];
var VOICE_ACTOR_BLU_RAY = exports.VOICE_ACTOR_BLU_RAY = ['040309', 'Voice Actor', '声優'];
var GAME_BLU_RAY = exports.GAME_BLU_RAY = ['0403010', 'Game', 'ゲーム'];
var VARIETY_BLU_RAY = exports.VARIETY_BLU_RAY = ['0403011', 'Variety', 'バラエティ'];
var OTHERS_BLU_RAY = exports.OTHERS_BLU_RAY = ['0403099', 'Others', 'その他'];
var OTOME_GAME_BLU_RAY = exports.OTOME_GAME_BLU_RAY = ['0403012', 'Otome game', '乙女ゲーム'];
var SITUATION_BLU_RAY = exports.SITUATION_BLU_RAY = ['0403013', 'Situation', 'シチュエーション/企画系'];
var BL_BLU_RAY = exports.BL_BLU_RAY = ['040303', 'BL', 'BL'];
var RECORDS = exports.RECORDS = ['0404', 'Records', 'レコード'];
var EP = exports.EP = ['040401', 'EP', 'EP'];
var LP = exports.LP = ['040402', 'LP', 'LP'];
var FLEXI_DISC = exports.FLEXI_DISC = ['040403', 'Flexi disc', 'ソノシート'];
var VHS = exports.VHS = ['0406', 'VHS', 'VHS'];
var OTHER_MEDIA = exports.OTHER_MEDIA = ['0498', 'Other media', 'その他メディア'];
var CONSUMER_GAME = exports.CONSUMER_GAME = ['0451', 'Consumer game', '家庭用ゲーム'];
var PC_GAME = exports.PC_GAME = ['0450', 'PC game', 'PCゲーム'];
var MALE_IDOLS = exports.MALE_IDOLS = ['0501', 'Male Idols', '男性アイドル'];
var JOHNNYS_CD = exports.JOHNNYS_CD = ['05010101', 'Johnny\'s CD', 'ジャニーズ CD'];
var JOHNNYS_DVD = exports.JOHNNYS_DVD = ['05010102', 'Johnny\'s DVD', 'ジャニーズ DVD'];
var JOHNNYS_BLU_RAY = exports.JOHNNYS_BLU_RAY = ['05010103', 'Johnny\'s Blu-ray', 'ジャニーズ Blu-ray'];
var JOHNNYS_BOOKS = exports.JOHNNYS_BOOKS = ['05010110', 'Johnny\'s Books', 'ジャニーズ パンフ・書籍'];
var JOHNNYS_PHOTOS = exports.JOHNNYS_PHOTOS = ['05010120', 'Johnny\'s Photos', 'ジャニーズ 公式写真'];
var JOHNNYS_UCHIWA = exports.JOHNNYS_UCHIWA = ['05010130', 'Johnny\'s Uchiwa', 'ジャニーズ うちわ'];
var JOHNNYS_GOODS = exports.JOHNNYS_GOODS = ['05010140', 'Johnny\'s Goods', 'ジャニーズ グッズ'];
var JOHNNYS_POSTERS = exports.JOHNNYS_POSTERS = ['05010150', 'Johnny\'s Posters', 'ジャニーズ ポスター'];
var JOHNNYS = exports.JOHNNYS = ['050101', 'Johnny\'s', 'ジャニーズ すべて'];
var K_POP = exports.K_POP = ['050102', 'K-POP', '韓流'];
var ACTOR = exports.ACTOR = ['050103', 'Actor', '俳優'];
var TENIMYU = exports.TENIMYU = ['050104', 'Tenimyu', 'テニミュ'];
var VISUAL_KEI = exports.VISUAL_KEI = ['050105', 'Visual Kei', 'ヴィジュアル系'];
var OTHERS_MALE_IDOLS = exports.OTHERS_MALE_IDOLS = ['050199', 'Others', 'その他'];
var FEMALE_IDOLS = exports.FEMALE_IDOLS = ['0502', 'Female Idols', '女性アイドル'];
var VOICE_ACTRESS = exports.VOICE_ACTRESS = ['0504', 'Voice Actress', '女性声優'];
var PHOTO_VOICE_ACTRESS = exports.PHOTO_VOICE_ACTRESS = ['050401', 'Photo', '写真集'];
var MAGAZINE = exports.MAGAZINE = ['050402', 'Magazine', '雑誌・書類'];
var PAMPHLET = exports.PAMPHLET = ['050403', 'Pamphlet', 'パンフレット'];
var BULLETIN = exports.BULLETIN = ['050404', 'Bulletin', '会報'];
var CLOTHING_T_SHIRT = exports.CLOTHING_T_SHIRT = ['050411', 'Clothing / T-shirt', '衣類・Tシャツ'];
var BROMIDE_VOICE_ACTRESS = exports.BROMIDE_VOICE_ACTRESS = ['050412', 'Bromide', 'ブロマイド'];
var OTHER_GOODS = exports.OTHER_GOODS = ['050429', 'Other goods', 'その他グッズ'];
var POSTERS_VOICE_ACTRESS = exports.POSTERS_VOICE_ACTRESS = ['050430', 'Posters', 'ポスター'];
var MALE_CELEBRITIES = exports.MALE_CELEBRITIES = ['0507', 'Male Celebrities', '芸能タレント一般(男性)'];
var PHOTOGRAPH_BOOKS_MALE_CELEBRITIES = exports.PHOTOGRAPH_BOOKS_MALE_CELEBRITIES = ['050701', 'Photograph books', '写真集'];
var WRITTEN_WORKS_MALE_CELEBRITIES = exports.WRITTEN_WORKS_MALE_CELEBRITIES = ['050702', 'Written Works', '読み物'];
var AUDIO_VISUAL_MALE_CELEBRITIES = exports.AUDIO_VISUAL_MALE_CELEBRITIES = ['050703', 'Audio Visual (male celebrities)', '音楽・映像ソフト'];
var GOODS_MALE_CELEBRITIES = exports.GOODS_MALE_CELEBRITIES = ['050704', 'Goods', 'グッズ'];
var OTHERS_MALE_CELEBRITIES = exports.OTHERS_MALE_CELEBRITIES = ['050799', 'Others', 'その他'];
var VOICE_ACTOR = exports.VOICE_ACTOR = ['0503', 'Voice Actor', '男性声優'];
var FEMALE_CELEBRITIES = exports.FEMALE_CELEBRITIES = ['0508', 'Female Celebrities', '芸能タレント一般(女性)'];
var PHOTOGRAPH_BOOKS_FEMALE_CELEBRITIES = exports.PHOTOGRAPH_BOOKS_FEMALE_CELEBRITIES = ['050801', 'Photograph books', '写真集'];
var WRITTEN_WORKS_FEMALE_CELEBRITIES = exports.WRITTEN_WORKS_FEMALE_CELEBRITIES = ['050802', 'Written Works', '読み物'];
var AUDIO_VISUAL_FEMALE_CELEBRITIES = exports.AUDIO_VISUAL_FEMALE_CELEBRITIES = ['050803', 'Audio visual', '音楽・映像ソフト'];
var GOODS_FEMALE_CELEBRITIES = exports.GOODS_FEMALE_CELEBRITIES = ['050804', 'Goods', 'グッズ'];
var OTHERS_FEMALE_CELEBRITIES = exports.OTHERS_FEMALE_CELEBRITIES = ['050899', 'Others', 'その他'];
var TAKARAZUKA = exports.TAKARAZUKA = ['0505', 'Takarazuka', '宝塚'];
var YU_GI_OH_CARDS = exports.YU_GI_OH_CARDS = ['0601', 'Yu-Gi-Oh! Cards', '遊戯王カード'];
var POKEMON_CARDS = exports.POKEMON_CARDS = ['0602', 'Pokemon Cards', 'ポケモンカード'];
var ACG = exports.ACG = ['0603', 'ACG', 'アーケードゲームカード'];
var TCG = exports.TCG = ['0604', 'TCG', 'トレーディングカードゲーム'];
var OLD_KAMEN_RIDER_CARDS = exports.OLD_KAMEN_RIDER_CARDS = ['0605', 'Old Kamen Rider Cards', 'カルビー旧仮面ライダーカード'];
var BASEBALL_CARD = exports.BASEBALL_CARD = ['0606', 'Baseball Card', '70～80年代プロ野球カード'];
var CARDDASS = exports.CARDDASS = ['0607', 'Carddass', 'カードダス'];
var MTG = exports.MTG = ['0619', 'MTG', 'MTG マジック・ザ・ギャザリング'];
var TRADING_CARDS = exports.TRADING_CARDS = ['0608', 'Trading Cards', 'トレカ'];
var TELEPHONE_CARDS = exports.TELEPHONE_CARDS = ['0609', 'Telephone Cards', 'テレホンカード'];
var SHITAJIKI = exports.SHITAJIKI = ['0610', 'Shitajiki', '下敷き'];
var LAMINATED_CARDS = exports.LAMINATED_CARDS = ['0611', 'Laminated Cards', 'ラミカ'];
var BROMIDE_CARDS = exports.BROMIDE_CARDS = ['0613', 'Bromide', '5円引きブロマイド'];
var BIKKURIMAN_STICKERS = exports.BIKKURIMAN_STICKERS = ['0614', 'Bikkuriman Stickers', 'ビックリマンシール'];
var SHINRABANSHO_CHOCO = exports.SHINRABANSHO_CHOCO = ['0615', 'Shinrabansho choco', '神羅万象'];
var SHOKUGAN = exports.SHOKUGAN = ['0616', 'Shokugan', '食玩カード'];
var MINI_CARDS = exports.MINI_CARDS = ['0617', 'Mini cards', 'ミニカード'];
var CLEAR_FILES = exports.CLEAR_FILES = ['0618', 'Clear files', 'クリアファイル'];
var MINOR_CARDS = exports.MINOR_CARDS = ['0698', 'Minor cards', 'マイナーシール'];
var OTHERS_CARDS = exports.OTHERS_CARDS = ['0699', 'Others', 'その他'];
var CELS = exports.CELS = ['0701', 'Cels', 'セル画'];
var ANIME_GENGAS = exports.ANIME_GENGAS = ['0702', 'Anime Gengas', 'アニメ原画'];
var SCRIPTS = exports.SCRIPTS = ['0705', 'Scripts', '台本'];
var SETTINGS_REFERENCES = exports.SETTINGS_REFERENCES = ['0703', 'Settings/References', '設定・資料'];
var GENGAS = exports.GENGAS = ['0801', 'Gengas', '原画'];
var MANUSCRIPTS = exports.MANUSCRIPTS = ['0802', 'Manuscripts', '原稿'];
var AUTOGRAPHS = exports.AUTOGRAPHS = ['0803', 'Autographs', 'サイン'];
var AUTOGRAPH_BOARDS_SHIKISHI = exports.AUTOGRAPH_BOARDS_SHIKISHI = ['0804', 'Autograph Boards(Shikishi)', '色紙'];
var OTHERS_GALLERY = exports.OTHERS_GALLERY = ['0899', 'Others', 'その他'];
var MANDARAKE_ZENBU = exports.MANDARAKE_ZENBU = ['0901', 'Mandarake ZENBU', 'まんだらけZENBU'];
var COMICS_BOOKS = exports.COMICS_BOOKS = ['0904', 'Comics / Books', 'まんが・書籍'];
var SPIRITUAL = exports.SPIRITUAL = ['0913', 'Spiritual', '精神世界'];
var LAZA_COMICS = exports.LAZA_COMICS = ['0902', 'Laza comics', 'ラザコミックス'];
var BL_YAOI = exports.BL_YAOI = ['0908', 'BL / Yaoi', 'BL関連'];
var DOUJIN = exports.DOUJIN = ['0909', 'Doujin', '同人関連'];
var GOODS_MANDARAKE_PROD = exports.GOODS_MANDARAKE_PROD = ['0910', 'Goods', 'アニメグッズ'];
var SILK_SCREEN = exports.SILK_SCREEN = ['0903', 'Silk screen', 'シルクスクリーン'];
var SOFVI_TOYS = exports.SOFVI_TOYS = ['0905', 'Sofvi toys', 'ソフビTOY'];
var CARD_STICKERS = exports.CARD_STICKERS = ['0906', 'Card / Stickers', 'カード・シール'];
var ZAKKA = exports.ZAKKA = ['0907', 'Zakka', '雑貨'];
var COSPLAY_MANDARAKE_PROD = exports.COSPLAY_MANDARAKE_PROD = ['0911', 'Cosplay', 'コスプレ'];
var T_SHIRT = exports.T_SHIRT = ['0912', 'T-shirt', 'Tシャツ'];
var OTHERS_MANDARAKE_PROD = exports.OTHERS_MANDARAKE_PROD = ['0999', 'Others', 'その他'];
var COSPLAY = exports.COSPLAY = ['9901', 'Cosplay', 'コスプレ'];
var POSTERS = exports.POSTERS = ['9904', 'Posters', 'ポスター'];
var MOVIES = exports.MOVIES = ['9903', 'Movies', '映画'];
var STICKER_YOKOCHO = exports.STICKER_YOKOCHO = ['31', 'Sticker yokocho', 'シール横丁'];
var PRO_SPORTS = exports.PRO_SPORTS = ['9902', 'Pro Sports', 'プロスポーツ'];
var MARTIAL_ARTS_AND_PRO_WRESTLING = exports.MARTIAL_ARTS_AND_PRO_WRESTLING = ['9905', 'Martial arts and pro wrestling', '格闘技･プロレス'];
var OTHERS_ETC = exports.OTHERS_ETC = ['9999', 'Others', 'その他'];