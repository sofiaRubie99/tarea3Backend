"use strict";

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const ObjectId = require('mongodb').ObjectId;

exports.handler = async (event, context) => {

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;
    const id = event.path.split("/").reverse()[0];

    const author = await client.db("bookstore").collection("authors").findOne({ _id: new ObjectId(id) });

    return { statusCode: 200, headers, body: JSON.stringify(author) };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
