const fs = require('fs');
const Markov = require('markov-strings').default;

const CHARACTERS_PER_PARAGRAPH = 500;
const MARKOV_STATE_SIZE = 2

const rawData = fs.readFileSync('tweets.json');
const data = JSON.parse(rawData);

// Build the Markov generator
const markov = new Markov(data, { stateSize: MARKOV_STATE_SIZE });
markov.buildCorpus();

const options = {
  maxTries: 1000,
  prng: Math.random,
  filter: (result) => {
    // Sentences should be at least 5 words long and end with a full stop
    return result.string.split(' ').length >= 5 && result.string.endsWith('.');
  },
};

var output = ''

generateText = () => {
  // Generate a sentence
  const result = markov.generate(options);

  if ('string' in result ) {
    output = output.concat(' ', result.string);
  }
}

while (output.length < CHARACTERS_PER_PARAGRAPH) {
  generateText()
}

console.log(output);
