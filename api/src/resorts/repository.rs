#![allow(proc_macro_derive_resolution_fallback)]
use crate::db::Conn;
use crate::r2d2_mongodb::mongodb::db::ThreadedDatabase;
use crate::resorts::{InsertableResort, Resort};
use mongodb::{bson, coll::results::DeleteResult, doc, error::Error, oid::ObjectId};

const COLLECTION: &str = "resorts";

pub fn all(connection: &Conn) -> Result<Vec<Resort>, Error> {
    let cursor = connection.collection(COLLECTION).find(None, None).unwrap();

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

pub fn get(id: ObjectId, connection: &Conn) -> Result<Option<Resort>, Error> {
    match connection
        .collection(COLLECTION)
        .find_one(Some(doc! {"_id": id}), None)
    {
        Ok(db_result) => match db_result {
            Some(result_doc) => match bson::from_bson(bson::Bson::Document(result_doc)) {
                Ok(result_model) => Ok(Some(result_model)),
                Err(_) => Err(Error::DefaultError(String::from(
                    "Failed to create reverse BSON",
                ))),
            },
            None => Ok(None),
        },
        Err(err) => Err(err),
    }
}

pub fn insert(resort: Resort, connection: &Conn) -> Result<ObjectId, Error> {
    let insertable = InsertableResort::from_resort(resort.clone());
    match bson::to_bson(&insertable) {
        Ok(model_bson) => match model_bson {
            bson::Bson::Document(model_doc) => {
                match connection
                    .collection(COLLECTION)
                    .insert_one(model_doc, None)
                {
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

pub fn update(id: ObjectId, resort: Resort, connection: &Conn) -> Result<Resort, Error> {
    let mut new_resort = resort.clone();
    new_resort.id = Some(id.clone());
    match bson::to_bson(&new_resort) {
        Ok(model_bson) => match model_bson {
            bson::Bson::Document(model_doc) => {
                match connection.collection(COLLECTION).replace_one(
                    doc! {"_id": id},
                    model_doc,
                    None,
                ) {
                    Ok(_) => Ok(new_resort),
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

pub fn delete(id: ObjectId, connection: &Conn) -> Result<DeleteResult, Error> {
    connection
        .collection(COLLECTION)
        .delete_one(doc! {"_id": id}, None)
}
