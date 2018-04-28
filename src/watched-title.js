/*
 * Simple class to hold information about a watched title.
 */
export default class WatchedTitle {
  constructor(title, date, isSeries) {
    this.title = title;
    this.date = date;
    this.isSeries = isSeries;
    this.count = 1;
  }
}
