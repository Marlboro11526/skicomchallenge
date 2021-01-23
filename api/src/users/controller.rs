use crate::db::Conn;
use crate::users;
use mongodb::{doc, error::Error, oid::ObjectId};
use rocket::http::Status;
use rocket_contrib::json::Json;
use users::User;

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

#[get("/users")]
pub fn list_users(connection: Conn) -> Result<Json<Vec<User>>, Status> {
    match users::repository::all(&connection) {
        Ok(res) => Ok(Json(res)),
        Err(err) => Err(error_status(err)),
    }
}

#[post("/users", format = "application/json", data = "<user>")]
pub fn add_user(user: Json<User>, connection: Conn) -> Result<Json<ObjectId>, Status> {
    match users::repository::insert(user.into_inner(), &connection) {
        Ok(res) => Ok(Json(res)),
        Err(err) => Err(error_status(err)),
    }
}
