#![allow(proc_macro_derive_resolution_fallback)]

pub mod controller;
pub mod repository;
use mongodb::bson;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User {
    #[serde(rename = "_id")]
    pub id: Option<bson::oid::ObjectId>,
    first_name: String,
    last_name: String,
    email: String,
    favorite_resort: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InsertableUser {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub favorite_resort: String,
}

impl InsertableUser {
    fn from_user(user: User) -> InsertableUser {
        InsertableUser {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            favorite_resort: user.favorite_resort,
        }
    }
}
