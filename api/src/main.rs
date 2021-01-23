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
use rocket::{Request, Rocket};
mod db;
pub mod resorts;

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
                resorts::controller::add_resort,
                resorts::controller::update_resort,
                resorts::controller::delete_resort
            ],
        )
        .launch();
}
