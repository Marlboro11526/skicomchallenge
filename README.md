# skicomchallenge

Full stack challenge with React frontend and Rust backend.

## App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It also uses a little bit of TailwindCSS for one page.

I generally use Next.js when doing front-end development, so for this excercise I wanted to brush up on my vanilla React knowledge a little.

### Configure

Set up an enviorenment variable (I used a .env file) with the property `REACT_APP_API_BASE_URL`. My Rocket server's default address is `http://localhost:8000`, so that's what I use.

### Running

Simply install dependencies with `npm` or `yarn` then execute the `start` script.

## API

This project is using Rust with Rocket as the web framework, and uses MongoDB for data persistence.

Given my very limited experience with Rust, this part is heavily based off from [this project](https://github.com/louis030195/rustlang-rocket-mongodb), because my priority was getting something working ASAP.

I had a lot of fun working with this part. That's why I also want to completely remake it, mostly because the dependencies here are pretty out of date. I also want to try using `actix-web`, a web framework alternative to `Rocket`.

### Configure

Set up the following environment variables (I used a .env file):
`MONGO_ADDR`, `MONGO_PORT`, `DB_NAME`.

For `MONGO_ADDR`, `MONGO_PORT`, I'm using the default values (`127.0.0.1` and `27017` respectively).
For `DB_NAME`, I'm using the value `skicom`.

### Setting Up

Rocket needs a nightly version of Rust. I simply followed the instructions on [their getting started guide](https://rocket.rs/v0.4/guide/getting-started/#installing-rust).

In short, they recommend using a tool named [rustup](https://rustup.rs/), a `rust` version manager.
With it, you can then run one of the following:
`rustup default nightly`, to set up nightly globally.
Or `rustup override set nightly`, to set it up only on a per-directory basis.

To launch the project, simply do `cargo run`.
