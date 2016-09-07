# Scheduling Hero

[![Build Status](https://travis-ci.org/jbw91/scheduling-hero-api.svg?branch=master)](https://travis-ci.org/jbw91/scheduling-hero-api) [![bitHound Dependencies](https://www.bithound.io/github/jbw91/scheduling-hero-api/badges/dependencies.svg)](https://www.bithound.io/github/jbw91/scheduling-hero-api/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/jbw91/scheduling-hero-api/badges/code.svg)](https://www.bithound.io/github/jbw91/scheduling-hero-api)

Scheduling Hero is a web app for determining when is best to meet with a group of people.

## Contributing

Please see [CONTRIBUTING](./CONTRIBUTING.md) for the repository's guidelines for contribution.

### Prerequisites

Ensure you have the following installed on your machine:

* Node.js & NPM
* Docker/Docker for Mac/Docker for Windows

**NOTE:** It is recommended if you are on a Mac or Windows machine you **not** use Docker Toolbox/boot2docker.

## Getting Started

After cloning the repo, `cd` into the directory and run `npm install`.

### Google Credentials

**NOTE: YOU WILL NOT BE ABLE TO RUN THIS APP WITHOUT FOLLOWING THESE INSTRUCTIONS**

This app uses Google OAuth2 for authentication. As such, you will need to set up a Google Cloud Console Project. Follow the instructions below to do so:

- Visit [Google Cloud Console](https://cloud.google.com/console/project)
- Click on the **Create Project** button
- Enter *Project Name*, then click the **Create** button
- Then click on *Enable and manage APIs* under *Use Google APIs* and then select the *Library* tab in the sidebar.
- Click on **Google+ API** under *Social APIs*, then click **Enable**
- Next, click on the *Credentials* tab in the sidebar
- Select the *OAuth consent screen* tab and fill out all the required fields, then click **Save**.
- Click on the *Credentials* tab and select *OAuth Client ID* under the *Create Credentials* dropdown.
- Select *Web Application*, then fill out the required fields. Use the following:
 - **Application Type**: Web Application
 - **Authorized Javascript origins**: http://localhost:3000
 - **Authorized redirect URI**: http://localhost:3000/auth/google/callback
- Click on the **Create** button
- Create a file in the root directory of this project named `.env`. In that file, paste the following:

```
GOOGLE_ID=<GOOGLE CLIENT ID>
GOOGLE_SECRET=<GOOGLE CLIENT SECRET>
```

Copy and paste the *Client ID* and *Client secret* keys from your newly created project into your `.env` file as shown above.

### Running the App

To run the app, in the root directory, simply run the following commands:

```shell
# Build Image
$ docker-compose build
# Run the image and start nodemon for livereload
$ docker-compose up
```

When the image is running successfully, you'll be able to access it by visiting [http://localhost:3000/hello](http://localhost:3000/hello). Any changes you make to the code, nodemon will reload the server upon saving the file.

### API Documentation

For documenting the API this app uses [JSDoc](http://usejsdoc.org/). To serve the docs, simply run `npm run docs`.

### Wireframes

This app is still very heavily being wireframed. If you'd like to follow along with the progress, check out the [Moqups Project](https://app.moqups.com/johnwoodruff91/Eg2wMFKLXy/view).

## License

Scheduling Hero is released under the [MIT License](./LICENSE).
