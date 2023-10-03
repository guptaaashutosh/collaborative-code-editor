function getRandom(min, max) {
  const floatRandom = Math.random();

  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom);

  const randomWithinRange = random + min;

  return randomWithinRange;
}

const createName = (email) => email.substr(0, email.indexOf('@')) + getRandom(11, 10000);

module.exports = createName;
