#![feature(decl_macro, proc_macro_hygiene)]
#[macro_use]
extern crate rocket;
extern crate dotenv;
extern crate mongodb;
extern crate r2d2;
extern crate r2d2_mongodb;
extern crate rocket_contrib;
#[macro_use]
extern crate serde;

use dotenv::dotenv;
mod db;

pub mod resorts;
pub mod users;

use rocket::http::Method;
use rocket_cors::{AllowedHeaders, AllowedOrigins, Cors, CorsOptions};

fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::All;

    CorsOptions {
        // 5.
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post, Method::Put, Method::Delete]
            .into_iter()
            .map(From::from)
            .collect(),
        allowed_headers: AllowedHeaders::some(&[
            "Authorization",
            "Accept",
            "Access-Control-Allow-Origin",
        ]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("error while building CORS")
}

#[catch(500)]
fn internal_error() -> &'static str {
    "We've encountered an unexpected error."
}

fn main() {
    dotenv().ok();
    rocket::ignite()
        .register(catchers![internal_error])
        .manage(db::init_pool())
        .mount(
            "/",
            routes![
                resorts::controller::index,
                resorts::controller::list_resorts,
                resorts::controller::get_resort,
                resorts::controller::add_resort,
                resorts::controller::update_resort,
                resorts::controller::delete_resort,
                users::controller::list_users,
                users::controller::add_user,
            ],
        )
        .attach(make_cors())
        .launch();
}
