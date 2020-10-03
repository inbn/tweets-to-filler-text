const fs = require('fs');
const Markov = require('markov-strings').default;

const MARKOV_STATE_SIZE = 2

const rawData = fs.readFileSync('_data/tweets.json');
const data = JSON.parse(rawData);

// Build the Markov generator
const markov = new Markov({ stateSize: MARKOV_STATE_SIZE });
markov.addData(data)

const builtCorpus = markov.export()

fs.writeFileSync('_data/corpus.json', JSON.stringify(builtCorpus));
