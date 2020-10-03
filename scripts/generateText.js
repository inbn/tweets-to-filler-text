const fs = require('fs');
const Markov = require('markov-strings').default;

const CHARACTERS_PER_PARAGRAPH = 500;

const rawData = fs.readFileSync('_data/corpus.json');
const data = JSON.parse(rawData);

// Build the Markov generator
const markov = new Markov();
markov.import(data)

const options = {
  maxTries: 1000,
  prng: Math.random,
  filter: (result) => {
    // Sentences should be at least 5 words long and end with a full stop
    return result.string.split(' ').length >= 5 && result.string.endsWith('.');
  },
};

var output = ''

generateSentence = () => {
  // Generate a sentence
  const result = markov.generate(options);

  if ('string' in result ) {
    output = output.concat(' ', result.string);
  }
}

while (output.length < CHARACTERS_PER_PARAGRAPH) {
  generateSentence()
}

console.log(output);
