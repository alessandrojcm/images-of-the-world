# Images of the world

This project was born as a job application from around mid 2019. A lot has rained since them, so I've chosen to
rewrite it from scratch in order to test some ideas regarding React applications in general.

## Description

### What's it about?
The application is like a game, the user signs up (using only first and last name) and then it's taken through a "journey".
The user will be presented with a search bar, upon writing something in the search bar and hitting enter, three "sellers"
will present one image each related to the term the user searched. Then, the user will select one of the images, and
the corresponding seller will gain 3 points; the first seller to gather 20 points wins the "race".

So, in summary:
* The user searches for images
* Three images are presented to the user
* The user picks one
* Repeat until one of the "sellers" gathers 20 points
* The race ends and the user will be able to see the details in the leaderboard

The images are fetched using the Unsplash API and the data from the "journeys" it's stored using a custom API written in
Python.

## Stack

### Front end

This project has a couple of ideas that I've wanting to try for React applications, it has:

* Parcel 2 as a bundler. This is in beta, at the time of this writing (september 2020) it has several caching and performance issues
* Tailwind CSS
* Emotion
* `twin.macro` to use Tailwind within Emotion
* `react-query` for data fetching
* `rxjs`
* `ky`
* `i18n` using `react-i18next`
* `react-aria` for a11y
* `@loadable/component` for code splitting
* `react-table`
* `react-hook-form`

On the developer experience side:

* Some integration tests with Cypress
* React Testing Library
* MSW for API mocking
* Eslint with Prettier

In general, I wanted to try css-in-js for styling in combination with Tailwind CSS. On the other hand, I wanted to try
a redux-less approach (with `react-query`) in order to make more responsive and more modular applications, where components
are responsible for fetching their own data and have their own loading/error states.

### Back end

This application has a little API written in Python using FastAPI and FaunaDB, check the '/api' folder. Initially
that API was to be deployed as serverless functions in Vercel, but I couldn't make that work quite right [see this](https://github.com/vercel/vercel/discussions/5184).

## Setting up

### Front end

Install dependencies with `yarn install`. You will need an API key from Unsplash, see the `.env.example` for the
environment variables.

Start with `yarn develop`, don't use `yarn start` since that will run it through the Vercel CLI (need to fix that).

### Back end

`cd` into `/api`. You can install the requirements through Poetry or using the provided `requirements.txt` file.
Then, we need to set up FaunaDB; two options:

#### Use provide Docker file

* Spin up the Docker image: `docker-compose up`.
* Run the FaunaDB shell: `docker-compose exec --user root shell /bin/bash`
* Run: `fauna create-database myapp`
* Then, `fauna create-key myapp`
* Copy the key that gets generated

#### Use FaunaDB from the cloud
Easier but not so recommended for development.

* Check out FaunaDB's [getting started](https://docs.fauna.com/fauna/current/start/cloud.html)
* Follow the steps to generate a key for the database you created
* The URL now will be: https://db.fauna.com (hold this)

### Environment variables.

The default environment variables are defined ins `api/models/config` and are as follows:

```ini
FAUNADB_SECRET_KEY # The key you got from the previous step
DEBUG # True or false, if false it won't read from the .env file just from the envars
FAUNA_DB_URL # The FaunaDB URL, only needed if you're using the Docker image
SELLER_MAX_COUNT # Number of sellers generated by the API, default 3. Didn't really test with more than this so I don't recommend touching this
```

The order on which the variables take precedence are:

1) The ones defined in the SO environment
2) The ones defined in the `.env` file (can only be used in dev mode, ie when `DEBUG` is false)
3) The defaults on the config schema

You need to replace `FAUNA_SERVER_KEY` with the key obtained when you set up FaunaDB. Also, if you are using
the cloud version, you need to replace the `FAUNA_DB_URL` with the url stated on that step.

### Create schema

After that, you need to create the FaunaDB schema. You can find it under `/api/fauna_schema'.

If you're using Docker:

* `docker-compose exec --user root shell /bin/bash`
* `fauna eval myapp --secret=the_api_key --file=/home/schema.fql`

If not, go to the Fauna Dashboard. Under "Shell", import the `/api/schema.fql` file and run it.

### Run it

First: `docker-compose up` inside `/api`.

After that, you can run the server with: `python -m uvicorn functions.journey:app --port=3000`

Docs available under `API_URL/redocs`.

## i18n

This project has locales under the `static/locales` folder.

## Improvements

* Fix responsive
* Add animations with Framer Motion

