import { ObjectId, DeleteResult, UpdateResult, InsertOneResult, WithId, Document } from "mongodb";
import Reservation from "../model/reserve"
import { collections } from "../config/db"
import filterInterface from "../interfaces/filterInterface";


async function reserveVerification(checkInDate: Date, checkOutDate: Date, ApartmentName: string, _id?: ObjectId) {
  var reservationFilter: any = {
    ApartmentName, 
    $or: [
      {checkInDate: {$gte: checkInDate}, checkOutDate: {$lte: checkInDate}},
      {checkInDate: {$gte: checkOutDate}, checkOutDate: {$lte: checkOutDate}},
      {checkInDate: {$lte: checkInDate}, checkOutDate: {$gte: checkOutDate}}
    ]
  };
  if (_id !== undefined) {
    reservationFilter._id = {$ne:_id};
  }
  var document = await collections.reservations?.findOne(reservationFilter);
  return document == null;
};

export async function getAllService(filter: filterInterface, skip: number = 0, limit: number = 10 ): Promise<Array<Document> | undefined> {
  let filterVerified: any = filter;
  Object.keys(filterVerified).forEach(key => filterVerified[key] === undefined && delete filterVerified[key])
  return await collections.reservations?.find(filterVerified).skip(skip).limit(limit).toArray();
};

export async function getter(id: string): Promise<WithId<Document> | null | undefined> {
  const query = { _id: new ObjectId(id) };
  return await collections.reservations?.findOne(query);
};
  
export async function creater(newReserve: Reservation): Promise<InsertOneResult<Document> | undefined> {
  if(await reserveVerification(newReserve.checkInDate, newReserve.checkOutDate, newReserve.ApartmentName)){
    return await collections.reservations?.insertOne(newReserve);
  }
};

export async function updater(id: string, updatedReserve: Reservation): Promise<UpdateResult | undefined> {
  const query = { _id: new ObjectId(id) };
  return await collections.reservations?.updateOne(query, { $set: updatedReserve});
};

export async function deleter(id: string ): Promise<DeleteResult | undefined> {
  const query = { _id: new ObjectId(id) };
  return await collections.reservations?.deleteOne(query);
};