use crate::db::Conn;
use crate::resorts;
use mongodb::{doc, error::Error, oid::ObjectId};
use resorts::Resort;
use rocket::http::Status;
use rocket_contrib::json::Json;

fn error_status(error: Error) -> Status {
    match error {
        Error::CursorNotFoundError => Status::NotFound,
        _ => Status::InternalServerError,
    }
}

#[get("/")]
pub fn index() -> &'static str {
    "Service up!"
}

#[get("/resorts")]
pub fn list_resorts(connection: Conn) -> Result<Json<Vec<Resort>>, Status> {
    match resorts::repository::all(&connection) {
        Ok(res) => Ok(Json(res)),
        Err(err) => Err(error_status(err)),
    }
}

#[post("/resorts", format = "application/json", data = "<resort>")]
pub fn add_resort(resort: Json<Resort>, connection: Conn) -> Result<Json<ObjectId>, Status> {
    match resorts::repository::insert(resort.into_inner(), &connection) {
        Ok(res) => Ok(Json(res)),
        Err(err) => Err(error_status(err)),
    }
}

#[put("/resorts", data = "<resort>")]
pub fn update_resort(resort: Json<Resort>) -> &'static str {
    "Hello, world!"
}

#[delete("/resorts/<id>")]
pub fn delete_resort(id: u32) -> &'static str {
    "Hello, world!"
}
