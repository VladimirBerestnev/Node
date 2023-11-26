function getRandomDate() {

    const maxDate = Date.now();
    const randomDate = Math.floor(Math.random() * maxDate);
    return new Date(randomDate);
}

module.exports = { getRandomDate }