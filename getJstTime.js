function getJSTTime() {
    const now = new Date();
    const options = { timeZone: 'Asia/Tokyo' };
    const jstTime = now.toLocaleString('ja-JP', options);
    return jstTime;
  }

module.exports = { getJSTTime };
