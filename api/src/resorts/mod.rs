#![allow(proc_macro_derive_resolution_fallback)]

pub mod controller;
pub mod repository;
use mongodb::bson;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Resort {
    #[serde(rename = "_id")]
    pub id: Option<bson::oid::ObjectId>,
    name: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InsertableResort {
    pub name: Option<String>,
}

impl InsertableResort {
    fn from_resort(resorts: Resort) -> InsertableResort {
        InsertableResort { name: resorts.name }
    }
}
