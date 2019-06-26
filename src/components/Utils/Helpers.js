const Helpers = {
  getNow() {
    let now = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
    let minDate = now.substring(0,9).split('/')
    if (minDate[0].length > 1) {
      return [minDate[2], minDate[0], minDate[1]].join('-');  
    } else {
      return [minDate[2], `0${minDate[0]}`, minDate[1]].join('-');
    }
  },

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

  getMonthNum(date_watched) {
    let date = new Date(date_watched);
    return date.getMonth()
  },

  getMonthName(date_watched) {
    let date = new Date(date_watched)
    let options = {month: 'long'}
    let newdate = new Intl.DateTimeFormat('en-us', options).format(date)
    return newdate;
  },
}

export default Helpers