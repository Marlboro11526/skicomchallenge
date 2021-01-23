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

#[get("/resorts/<id>")]
pub fn get_resort(id: String, connection: Conn) -> Result<Json<Resort>, Status> {
    match ObjectId::with_string(&String::from(&id)) {
        Ok(res) => match resorts::repository::get(res, &connection) {
            Ok(res) => Ok(Json(res.unwrap())),
            Err(err) => Err(error_status(err)),
        },
        Err(_) => Err(error_status(Error::DefaultError(String::from(
            "Couldn't parse ObjectId",
        )))),
    }
}

#[post("/resorts", format = "application/json", data = "<resort>")]
pub fn add_resort(resort: Json<Resort>, connection: Conn) -> Result<Json<ObjectId>, Status> {
    match resorts::repository::insert(resort.into_inner(), &connection) {
        Ok(res) => Ok(Json(res)),
        Err(err) => Err(error_status(err)),
    }
}

#[put("/resorts/<id>", format = "application/json", data = "<resort>")]
pub fn update_resort(
    id: String,
    resort: Json<Resort>,
    connection: Conn,
) -> Result<Json<Resort>, Status> {
    match ObjectId::with_string(&String::from(&id)) {
        Ok(res) => match resorts::repository::update(res, resort.into_inner(), &connection) {
            Ok(res) => Ok(Json(res)),
            Err(err) => Err(error_status(err)),
        },
        Err(_) => Err(error_status(Error::DefaultError(String::from(
            "Couldn't parse ObjectId",
        )))),
    }
}

#[delete("/resorts/<id>")]
pub fn delete_resort(id: String, connection: Conn) -> Result<Json<String>, Status> {
    match ObjectId::with_string(&String::from(&id)) {
        Ok(res) => match resorts::repository::delete(res, &connection) {
            Ok(_) => Ok(Json(id)),
            Err(err) => Err(error_status(err)),
        },
        Err(_) => Err(error_status(Error::DefaultError(String::from(
            "Couldn't parse ObjectId",
        )))),
    }
}
