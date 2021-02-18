const helpers = {
  getCategoryName: function (role) {
    switch (role) {
      case 1:
        return 'Kıyafet';
      case 2:
        return 'Giyecek';
      default:
        return 'helpers.getCategoryNameFunction';
    }
  },
  getPaymentMethod: function (method) {
    switch (method) {
      case 'Check':
        return 'Çek';
      case 'Indenture':
        return 'Senet';
      case 'Cash':
        return 'Nakit';
      default:
        return 'getPaymentMethod';
    }
  },
  getPaymentMethodString: function (method) {
    switch (method) {
      case 1:
        return 'Akbank';
      case 2:
        return 'YapıKredi';
      case 3:
        return 'Ziraat';
      case 4:
        return 'Elden';
      default:
        return 'getPaymentMethodString';
    }
  },
  getPaymentState: function (state) {
    switch (state) {
      case 'Paid':
        return 'ÖDENDİ';
      case 'Payable':
        return 'ÖDENECEK';
      default:
        return 'getPaymentState';
    }
  },
};

export default helpers;
