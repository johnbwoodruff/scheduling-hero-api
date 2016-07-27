# What Time

[![Build Status](https://travis-ci.org/jbw91/what-time.svg?branch=master)](https://travis-ci.org/jbw91/what-time)

What Time is a web app for determining when is best to meet with a group of people.

## Contributing

Please see [CONTRIBUTING](./CONTRIBUTING.md) for the repository's guidelines for contribution.

### Prerequisites

* Node.js & NPM
* Docker

## Getting Started

Install the global dependencies:

```shell
$ npm install -g typescript typings angular-cli
```

Then, after cloning the repo, `cd` into the directory and run `npm install`.

### Running the App

To run the app, in the root directory, simply run the following commands:

```shell
# Build Image
$ docker-compose build
# Run the image and start nodemon for livereload
$ docker-compose up
```

When the image is running successfully, you'll be able to access it by visiting [http://localhost:3000/hello](http://localhost:3000/hello). Any changes you make to the code, nodemon will reload the server upon saving the file.

### Wireframes

This app is still very heavily being wireframed. If you'd like to follow along with the progress, check out the [Moqups Project](https://app.moqups.com/johnwoodruff91/Eg2wMFKLXy/view).

## License

What Time is released under the [MIT License](./LICENSE).
