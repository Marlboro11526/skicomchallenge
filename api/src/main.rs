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
        .launch();
}
