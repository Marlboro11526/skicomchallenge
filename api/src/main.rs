#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

use rocket_contrib::json::Json;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct Resort {
    id: u32,
    name: String,
}

#[get("/")]
fn index() -> &'static str {
    "Service up!"
}

#[get("/resorts")]
fn list_resorts() -> Json<Vec<Resort>> {
    let mut resorts = Vec::new();

    resorts.push(Resort {
        id: 1,
        name: "Ensenada Hotel".to_string(),
    });

    resorts.push(Resort {
        id: 2,
        name: "Rosarito Hotel".to_string(),
    });

    return Json(resorts);
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
    rocket::ignite()
        .mount(
            "/",
            routes![
                index,
                list_resorts,
                add_resort,
                update_resort,
                delete_resort
            ],
        )
        .launch();
}
