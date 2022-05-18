import { ObjectId } from "mongodb";

export default class Reservation {
    constructor(
        public ApartmentName: string,
        public checkInDate: Date,
        public checkOutDate: Date,
        public guestsQuantity: number,
        public guestsNames: [string],
        public guestsEmails: [string],
        public _id?: ObjectId)
        {}
}