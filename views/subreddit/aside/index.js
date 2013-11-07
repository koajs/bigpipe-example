exports.aside = function* (type, time) {
  switch (type) {
    case 'top':
      return yield this.asideTop(time)
    case 'about':
      return yield this.asideAbout()
  }
}