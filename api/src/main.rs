#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use rocket_contrib::json::Json;
use serde::Deserialize;

#[derive(Deserialize)]
struct Resort {
    id: u32,
    name: String,
}

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/resorts")]
fn list_resorts() -> &'static str {
    "Hello, world!"
}

#[post("/resorts", data = "<resort>")]
fn add_resort(resort: Json<Resort>) -> &'static str {
    "Hello, world!"
}

#[put("/resorts", data = "<resort>")]
fn update_resort(resort: Json<Resort>) -> &'static str {
    "Hello, world!"
}

#[delete("/resorts/<id>")]
fn delete_resort(id: u32) -> &'static str {
    "Hello, world!"
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
