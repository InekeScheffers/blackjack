// module to calculate score of hand
const getScore = (array) => {

  let total = 0;

  // calculate total value of cards
  for (let i = 0; i < array.length; i++) {
    // if rank is ace total + 1, first count it as 1
    if (array[i].rank == "A"){
      total++;
    } else {
      // if it's a jack, queen  or king
      if (array[i].rank == "J" || array[i].rank == "Q" ||
          array[i].rank == "K") {
        // add 10
        total += 10;
      } else {
        // add value of rank
        total += parseInt(array[i].rank, 10);
      }
    }
  }

  // second loop to add 10 (makes 11) for as many aces without going over 21
  for (i = 0; i < array.length; i++) {
    if (array[i].rank == "A" && total <= 11){
      total += 10;
    }
  }

  return total;
}

module.exports = {getScore:getScore}
