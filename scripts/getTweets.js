fs = require('fs');
const dotenv = require('dotenv');
const Twit = require('twit');

dotenv.config();

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

T.get(
  '/users/show',
  { screen_name: process.env.TWITTER_SCREEN_NAME },
  (err, data, response) => {
    let tweets = [];
    let remainingTweets = data.statuses_count;
    let maxId = null;

    (function getTweets() {
      if (remainingTweets > 0) {
        T.get(
          'statuses/user_timeline',
          {
            screen_name: process.env.TWITTER_SCREEN_NAME,
            count: 200,
            tweet_mode: 'extended',
            ...(maxId ? { max_id: maxId } : {}),
          },
          (err, data, response) => {
            if (data.length > 0) {
              remainingTweets = remainingTweets - data.length;
              maxId = data[data.length - 1].id;
              tweets = [...tweets, ...data.map(({ full_text }) => full_text)];
            } else {
              remainingTweets = 0
            }
            getTweets()
          }
        );
      } else {
        fs.writeFileSync('_data/tweets.json', JSON.stringify(tweets));
      }
    })();
  }
);
