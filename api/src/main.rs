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

use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};

struct CORS();

impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to requests",
            kind: Kind::Response,
        }
    }

    fn on_response(&self, _request: &Request, response: &mut Response) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH, OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[catch(500)]
fn internal_error() -> &'static str {
    "We've encountered an unexpected error."
}

fn main() {
    dotenv().ok();
    rocket::ignite()
        .attach(CORS())
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
        .launch();
}
