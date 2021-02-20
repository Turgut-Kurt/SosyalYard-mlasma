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
};

export default helpers;
