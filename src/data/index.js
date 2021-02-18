const categoryPlaceHolder = {
  label: 'Kategori Seç (Zorunlu)',
  value: '',
  color: '#8E9092',
};
const categoryList = [
  {
    label: 'Kıyafet',
    value: 1,
  },
  {
    label: 'Eğitim',
    value: 2,
  },
];
const provincePlaceHolder = {
  label: 'İl Seç (Zorunlu)',
  value: '',
  color: '#8E9092',
};
const provinceList = [
  // "2": "ADIYAMAN",
  // "3": "AFYONKARAHİSAR",
  // "4": "AĞRI",
  // "5": "AMASYA",
  // "6": "ANKARA",
  // "7": "ANTALYA",
  // "8": "ARTVİN",
  // "9": "AYDIN",
  // "10": "BALIKESİR",
  // "11": "BİLECİKK",
  // "12": "BİNGÖL",
  // "13": "BİTLİS",
  // "14": "BOLU",
  // "15": "BURDUR",
  // "16": "BURSA",
  // "17": "ÇANAKKALE",
  // "18": "ÇANKIRI",
  // "19": "ÇORUM",
  // "20": "DENİZLİ",
  // "21": "DİYARBAKIR",
  // "22": "EDİRNE",
  // "23": "ELAZIĞ",
  // "24": "ERZİNCAN",
  // "25": "ERZURUM",
  // "26": "ESKİŞEHİR",
  // "27": "GAZİANTEP",
  // "28": "GİRESUN",
  // "29": "GÜMÜŞHANE",
  // "30": "HAKKARİ",
  // "31": "HATAY",
  // "32": "ISPARTA",
  // "33": "MERSİN",
  // "34": "İSTANBUL",
  // "35": "İZMİR",
  // "36": "KARS",
  // "37": "KASTAMONU",
  // "38": "KAYSERİ",
  // "39": "KIRKLARELİ",
  // "40": "KIRŞEHİR",
  // "41": "KOCAELİ",
  // "42": "KONYA",
  // "43": "KÜTAHYA",
  // "44": "MALATYA",
  // "45": "MANİSA",
  // "46": "KAHRAMANMARAŞ",
  // "47": "MARDİN",
  // "48": "MUĞLA",
  // "49": "MUŞ",
  // "50": "NEVŞEHİR",
  // "51": "NİĞDE",
  // "52": "ORDU",
  // "53": "RİZE",
  // "54": "SAKARYA",
  // "55": "SAMSUN",
  // "56": "SİİRT",
  // "57": "SİNOP",
  // "58": "SİVAS",
  // "59": "TEKİRDAĞ",
  // "60": "TOKAT",
  // "61": "TRABZON",
  // "62": "TUNCELİ",
  // "63": "ŞANLIURFA",
  // "64": "UŞAK",
  // "65": "VAN",
  // "66": "YOZGAT",
  // "67": "ZONGULDAK",
  // "68": "AKSARAY",
  // "69": "BAYBURT",
  // "70": "KARAMAN",
  // "71": "KIRIKKALE",
  // "72": "BATMAN",
  // "73": "ŞIRNAK",
  // "74": "BARTIN",
  // "75": "ARDAHAN",
  // "76": "IĞDIR",
  // "77": "YALOVA",
  // "78": "KARABüK",
  {
    label: 'KARABüK',
    value: 78,
  },
  {
    label: 'KİLİS',
    value: 79,
  },
  {
    label: 'OSMANİYE',
    value: 80,
  },
  {
    label: 'DÜZCE',
    value: 81,
  },
];
const supplierPlaceHolder = {
  label: 'Seç (Zorunlu)',
  value: '',
  color: '#8E9092',
};
const customerPlaceHolder = {
  label: 'Seç (Zorunlu)',
  value: '',
  color: '#8E9092',
};
const productPlaceHolder = {
  label: 'Seç (Zorunlu)',
  value: '',
  color: '#8E9092',
};
const paymentStatePlaceHolder = {
  label: 'Seç (Zorunlu)',
  value: '',
  color: '#8E9092',
};
const paymentStateList = [
  {
    label: 'Ödendi',
    value: 1,
  },
  {
    label: 'Ödenecek',
    value: 2,
  },
];
const paymentMethodPlaceHolder = {
  label: 'Seç (Zorunlu)',
  value: '',
  color: '#8E9092',
};
const paymentMethodList = [
  {
    label: 'Çek',
    value: 1,
  },
  {
    label: 'Senet',
    value: 2,
  },
  {
    label: 'Nakit',
    value: 3,
  },
];
const paymentChannelPlaceHolder = {
  label: 'Seç (Zorunlu)',
  value: '',
  color: '#8E9092',
  key: 0,
};
const paymentChannelList = [
  {
    label: 'Akbank',
    value: 1,
    key: 1,
  },
  {
    label: 'Anadolubank',
    value: 2,
    key: 2,
  },
  {
    label: 'Denizbank',
    value: 3,
    key: 3,
  },
  {
    label: 'FinansBank',
    value: 4,
    key: 4,
  },
  {
    label: 'MNGBank',
    value: 5,
    key: 5,
  },
  {
    label: 'OyakBank',
    value: 6,
    key: 6,
  },
  {
    label: 'Pamukbank',
    value: 7,
    key: 7,
  },
  {
    label: 'ZiraatBankasi',
    value: 8,
    key: 8,
  },
  {
    label: 'GarantiBankasi',
    value: 9,
    key: 9,
  },
  {
    label: 'HalkBankasi',
    value: 10,
    key: 10,
  },
  {
    label: 'IsBankasi',
    value: 11,
    key: 11,
  },
  {
    label: 'VakiflarBankasi',
    value: 12,
    key: 12,
  },
  {
    label: 'YapikrediBankasi',
    value: 13,
    key: 13,
  },
  {
    label: 'Elden',
    value: 14,
    key: 14,
  },
];
export {
  categoryPlaceHolder,
  categoryList,
  provincePlaceHolder,
  provinceList,
  paymentStatePlaceHolder,
  paymentStateList,
  paymentMethodPlaceHolder,
  paymentMethodList,
  paymentChannelPlaceHolder,
  paymentChannelList,
  supplierPlaceHolder,
  productPlaceHolder,
  customerPlaceHolder,
};
