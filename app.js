const express = require("express");
const app = express();
const port = 3000;

app.get("/lovecalc", (req, res) => {
  // Convert to the fully expanded string (parameters are lower-cased and spaces are not added on purpose)
  const loveString =
    req.query.person1.toLowerCase() + "loves" + req.query.person2.toLowerCase();

  // Build a set of letters so we can strike out (remove) any letters when we iterate through string
  let stringSet = new Set(loveString);

  // Iterate through the love string and count number of occurences of letters
  let occurences = [];
  for (let i = 0; i < loveString.length; i++) {
    const theChar = loveString[i];
    if (stringSet.has(theChar)) {
      // Count number of occurences of the character
      occurences.push(
        (loveString.match(new RegExp(theChar, "g")) || []).length
      );

      // Strike out the character by deleting it from set
      stringSet.delete(theChar);
    }
  }

  let reductionArray = occurences;
  while (reductionArray.length > 2) {
    let tempArray = [];
    let firstIndex = 0;
    let lastIndex = reductionArray.length - 1;
    while (firstIndex <= lastIndex) {
      if (firstIndex == lastIndex) {
        // Just copy this character instead of adding
        tempArray.push(reductionArray[firstIndex]);
      } else {
        // Add the first and last character together
        tempArray.push(reductionArray[firstIndex] + reductionArray[lastIndex]);
      }
      firstIndex++;
      lastIndex--;
    }
    reductionArray = tempArray;
  }

  // Convert final score to integer
  const score = parseInt(reductionArray.join(""));

  res.json({ score: score });
});

app.listen(port, () => {
  console.log(
    `App listening. Please open your browser at: http://localhost:${port}`
  );
});
