const getScore = (array) => {

  let total = 0;

  // Total card values counting Aces as one.
  for (let i = 0; i < array.length; i++)
    if (array[i].rank == "A")
      total++;
    else {
      if (array[i].rank == "J" || array[i].rank == "Q" ||
          array[i].rank == "K")
        total += 10;
      else
        total += parseInt(array[i].rank, 10);
    }

  // Change as many ace values to 11 as possible.

  for (i = 0; i < array.length; i++)
    if (array[i].rank == "A" && total <= 11)
      total += 10;

  return total;
}

module.exports = {getScore:getScore}
