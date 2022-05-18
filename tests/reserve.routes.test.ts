import axios from "axios";
import { ObjectId } from "mongodb";
import Reservation from "../model/reserve";

var _id: ObjectId = new ObjectId("62833957588311add1402ba8");

describe("reserveRoutes", () => {
  describe("post", () => {
    test("input reservation should return reservation", () => {
      const data = {
        ApartmentName: 'Quinto apartamento',
        checkInDate: '2050/07/15',
        checkOutDate: '2050/08/15',
        guestsQuantity: 1,
        guestsNames: ['joão','ernandes'],
        guestsEmail: ['joão@hotmail.com', 'ernandes@gmail.com'],
        _id
      }
      const options = {
        method: 'POST',
        url: 'http://localhost:8000/',
        headers: {'Content-Type': 'application/json'},
        data
      };
      axios.request(options)
      .then((response)=>{
      expect(response.data).toBe("Reserva(s) criada(s) com sucesso");
      }).catch(function (error) {
        console.error(error);
      });
    });
  });
  describe("get", () => {
    test("should return reservation", () => {
      const options = {method: 'GET', url: 'http://localhost:8000/all'};
      axios.request(options)
      .then((response)=>{
      expect(response.data).toBeInstanceOf(Array);
      }).catch(function (error) {
        console.error(error);
      });
    });
  });
  describe("put/:id", () => {
    test("input id should return success message", () => {
      const options = {
        method: 'PUT',
        url: `http://localhost:8000/${_id}`,
        headers: {'Content-Type': 'application/json'},
        data: {
          ApartmentName: 'Quinto apartamento',
          checkInDate: '15/07/2050',
          checkOutDate: '15/08/2050',
          guestsQuantity: 1,
          guestsNames: ['joão'],
          guestsEmail: ['joão@batman.com']
        }
      };
      axios.request(options)
      .then((response)=>{
      expect(response.data).toBe(`Reserva com id ${_id} atualizada com sucesso!`);
      }).catch(function (error) {
        console.error(error);
      });
    })
  });
  describe("delete/:id", () => {
    test("input id should return success message", () => {
      const options = {method: 'DELETE', url: `http://localhost:8000/${_id}`};
      axios.request(options)
      .then((response)=>{
      expect(response.data).toBe("Sucesso em remover a reserva");
      }).catch(function (error) {
        console.error(error);
      });
    });
  });
});
