#![allow(proc_macro_derive_resolution_fallback)]

pub mod controller;
pub mod repository;
use mongodb::bson;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Resort {
    #[serde(rename = "_id")]
    pub id: Option<bson::oid::ObjectId>,
    name: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InsertableResort {
    pub name: String,
}

impl InsertableResort {
    fn from_resort(resort: Resort) -> InsertableResort {
        InsertableResort { name: resort.name }
    }
}
