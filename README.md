# Traveller - Trip Planner

Traveller is an SPA built using DarkSky, Geonames and the Pixabay API.

The goal for this was to create a functioning frontend application using Node/Express and Webpack as part of the Udacity Frontend Nanodegree.

I also experimented with using Filesystem in Node and LocalStorage in the browser.

## Instructions

How to get started with the application

### As a Developer

After cloning the repo, cd into the folder and run:

```shell
npm install
```

This will download all the dependencies you need to get the application working.

You would need the darksky, pixabay and geonames api keys in your `.env` file as the app functionality requires it. If you haven't used environment variables; here's a [link](https://www.npmjs.com/package/dotenv) to setting it up.

Geonames is used to convert the user's entered location to co-ordinates which allows us to fetch the user's weather information using [DarkSky's](https://darksky.net/dev/docs#forecast-request) forecast api.

Picture information is fetched from [Pixabay's](https://pixabay.com/api/docs/) API.

### As a User

Enter a location you plan to visit, select the duration of your stay and where you'll be living.

After your trip details, have been published; you can add to-do activities to your trip. If the date of the activity matches with a planned trip; it's automatically added to the trips itinery.

## Issues

1. Trip data is not reactive.
   - Current behaviour: Trip data is not updated after a User adds a to-do. Trip activities are only populated from trips stored in the localStorage.
   - Expected behaviour: Trip data should be reloaded when a user adds a no to-do activity.
