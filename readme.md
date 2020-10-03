# tweets-to-filler-text

Generate personalised filler text from your tweets.

## Getting started

1. [Register for a twitter developer account](https://developer.twitter.com/en/apply-for-access) and [create a new app](https://developer.twitter.com/en/apps/create)
1. Duplicate `.env.example` in the root, rename it to `.env` and fill in:
    - `TWITTER_API_KEY`, `TWITTER_API_SECRET_KEY`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET` are the credentials from your twitter app
    - `TWITTER_SCREEN_NAME` is the handle of the twitter account you want to use for the source
1. Install dependencies with `npm i`

## Generating text

1. Run `npm run get-tweets`. This should generate a file, `_data/tweets.json` containing tweets.
1. Run `npm run build-corpus`. This should generate a file, `_data/corpus.json` containing the corpus used for generating text.
1. Run `npm run generate-text`. A paragraph of text should now appear in the console.
