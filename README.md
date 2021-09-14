# Love calculator assessment

This is a basic implementation of the love calculator when given two strings. It uses express as the framework for exposing the calculator endpoint

### Requirements

- Node installation. This code was tested with node 14
- Yarn

### Running the app

To run the app: Clone this repository and `cd` into the project root, then run `yarn` and `node app.js`. Open your browser as instructed in the console. The app
exposes just one endpoint: `/lovecalc`. To specify the two persons to match, use query parameters (e.g. `/lovecalc?person1=tom&person2=amy`).

### Stuff remaining to be done

- Check that only alphabetic characters are given in the input strings. No numeric characters
