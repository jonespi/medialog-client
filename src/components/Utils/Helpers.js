const Helpers = {
  getDate(date_watched) {
    let date = date_watched.substring(0,10).split('/')[0].split('-')
    if (date[0].length > 1) {
      return [date[1], date[2], date[0]].join('/');  
    } else {
      return [date[1], date[2], `0${date[0]}`].join('/');
    }
  },

  getYears(date_watched) {
    let date = date_watched.substring(0,10).split('/')[0].split('-')
    return date[0];
  },
}

export default Helpers