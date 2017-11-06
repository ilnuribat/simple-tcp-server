module.exports = (pinCodes) => {
  for (let i = 1; i < 10; i ++) {
    pinCodes[i] = {
      busy: false,
      partner: null,
      cashbox: null,
    };
  }
}