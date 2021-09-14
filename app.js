const express = require("express");
const app = express();
const port = 3000;

// Constants used for aggregating scores
const CLASSIC_TOTAL = 100.0;
const OCEAN_TOTAL = 200.0;
const DIMORPHIC_TOTAL = 6.0;
const CLASSIC_WEIGHT = 0.2;
const OCEAN_WEIGHT = 0.5;
const DIMORPHIC_WEIGHT = 0.3;

function classicCalc(person1, person2) {
  // Convert to the fully expanded string (parameters are lower-cased and spaces are not added on purpose)
  const loveString = person1.toLowerCase() + "loves" + person2.toLowerCase();

  // Build a set of letters so we can strike out (remove) any letters when we iterate through string
  let stringSet = new Set(loveString);

  // Iterate through the love string and count number of occurences of letters
  let occurences = [];
  for (let i = 0; i < loveString.length; i++) {
    const theChar = loveString[i];
    if (stringSet.has(theChar)) {
      // Count number of occurences of the character and add to array
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

  // Convert final score to float
  const score = parseFloat(reductionArray.join(""));

  return score;
}

function oceanCalc(person1, person2) {
  // Note: Hardcoded to 100 as I cannot lookup scores (in database for instance) for the given person
  return 100.0;
}

function dimorphicCalc(person1, person2) {
  // Hardcoded to 0
  return 0.0;
}

// Aggregate function. Normalizes scores so it is in a range between 0 and 1 and applies hardcoded weights, then returns the final
// weighted score
function aggregate(classic, ocean, dimorphic) {
  const classicNormalized = classic / CLASSIC_TOTAL;
  const oceanNormalized = ocean / OCEAN_TOTAL;
  const dimorphicNormalized = dimorphic / DIMORPHIC_TOTAL;

  const finalScore =
    classicNormalized * CLASSIC_WEIGHT +
    oceanNormalized * OCEAN_WEIGHT +
    dimorphicNormalized * DIMORPHIC_WEIGHT;

  return finalScore;
}

app.get("/lovecalc", (req, res) => {
  const classic = classicCalc(req.query.person1, req.query.person2);
  const ocean = oceanCalc(req.query.person1, req.query.person2);
  const dimorphic = dimorphicCalc(req.query.person1, req.query.person2);

  const score = aggregate(classic, ocean, dimorphic);

  res.json({ score: score });
});

app.listen(port, () => {
  console.log(
    `App listening. Please open your browser at: http://localhost:${port}`
  );
});
