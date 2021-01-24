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

#[get("/users/<id>")]
pub fn get_user(id: String, connection: Conn) -> Result<Json<User>, Status> {
    match ObjectId::with_string(&String::from(&id)) {
        Ok(res) => match users::repository::get(res, &connection) {
            Ok(res) => Ok(Json(res.unwrap())),
            Err(err) => Err(error_status(err)),
        },
        Err(_) => Err(error_status(Error::DefaultError(String::from(
            "Couldn't parse ObjectId",
        )))),
    }
}

#[post("/users", format = "application/json", data = "<user>")]
pub fn add_user(user: Json<User>, connection: Conn) -> Result<Json<ObjectId>, Status> {
    match users::repository::insert(user.into_inner(), &connection) {
        Ok(res) => Ok(Json(res)),
        Err(err) => Err(error_status(err)),
    }
}
