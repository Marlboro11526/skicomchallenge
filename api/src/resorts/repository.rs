#![allow(proc_macro_derive_resolution_fallback)]
use crate::db::Conn;
use crate::r2d2_mongodb::mongodb::db::ThreadedDatabase;
use crate::resorts::{InsertableResort, Resort};
use mongodb::{bson, coll::results::DeleteResult, doc, error::Error, oid::ObjectId};
use std::env;

pub fn all(connection: &Conn) -> Result<Vec<Resort>, Error> {
    let cursor = connection.collection("resorts").find(None, None).unwrap();

    cursor
        .map(|result| match result {
            Ok(doc) => match bson::from_bson(bson::Bson::Document(doc)) {
                Ok(result_model) => Ok(result_model),
                Err(_) => Err(Error::DefaultError(String::from(""))),
            },
            Err(err) => Err(err),
        })
        .collect::<Result<Vec<Resort>, Error>>()
}

pub fn insert(resorts: Resort, connection: &Conn) -> Result<ObjectId, Error> {
    let insertable = InsertableResort::from_resort(resorts.clone());
    match bson::to_bson(&insertable) {
        Ok(model_bson) => match model_bson {
            bson::Bson::Document(model_doc) => {
                match connection.collection("resorts").insert_one(model_doc, None) {
                    Ok(res) => match res.inserted_id {
                        Some(res) => match bson::from_bson(res) {
                            Ok(res) => Ok(res),
                            Err(_) => Err(Error::DefaultError(String::from("Failed to read BSON"))),
                        },
                        None => Err(Error::DefaultError(String::from("None"))),
                    },
                    Err(err) => Err(err),
                }
            }
            _ => Err(Error::DefaultError(String::from(
                "Failed to create Document",
            ))),
        },
        Err(_) => Err(Error::DefaultError(String::from("Failed to create BSON"))),
    }
}
