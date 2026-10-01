const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const VehicleRental = require("../models/vehicleRentalModel");


const vehicleRentals = [
  {
    vehicleModel : "Peanut",
    category: "Peanut",
    description: "Peanut",
    agency: {
      name:"Peanut",
      contactEmail : "Pea@nut",
      fleetSize : 33
        },
    location: {
      city : "Peanut",
      state: "Peanut"
      },
    dailyPrice: 100,
    availabilityStatus : "available",
    insurancePolicy:"true"
},
{
    vehicleModel : "Peanut2",
    category: "Peanut2",
    description: "Peanut2",
    agency: {
      name:"Peanu2t",
      contactEmail : "Pe2@anut",
      fleetSize : 33
        },
    location: {
      city : "Pea2nut",
      state: "Pean2ut"
      },
    dailyPrice: 100,
    availabilityStatus : "available",
    insurancePolicy:"true"
},
{
    vehicleModel : "Peanu3t",
    category: "Pean3ut",
    description: "Pea3nut",
    agency: {
      name:"Peanu3t",
      contactEmail : "Pe@anut",
      fleetSize : 33
        },
    location: {
      city : "Pean3ut",
      state: "Pean3t"
      },
    dailyPrice: 100,
    availabilityStatus : "available",
    insurancePolicy:"true"
}
];



describe("VehicleRental Controller", () => {
  beforeEach(async () => {
    await VehicleRental.deleteMany({});
    await VehicleRental.insertMany(vehicleRentals);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  // Test GET /api/vehicleRentals
  it("should return all vehicleRentals as JSON when GET /api/vehicleRentals is called", async () => {
    const response = await api
      .get("/api/vehicleRentals")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(vehicleRentals.length);
  });

  // Test POST /api/vehicleRentals
  it("should create a new vehicleRental when POST /api/vehicleRentals is called", async () => {
    const newVehicleRental = {
    vehicleModel : "Peanu3t",
    category: "Pean3ut",
    description: "Pea3nut",
    agency: {
      name:"Peanu3t",
      contactEmail : "Pe@anut",
      fleetSize : 33
        },
    location: {
      city : "Pean3ut",
      state: "Pean3t"
      },
    dailyPrice: 100,
    availabilityStatus : "available",
    insurancePolicy:"true"
};

    await api
      .post("/api/vehicleRentals")
      .send(newVehicleRental)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const vehicleRentalsAfterPost = await VehicleRental.find({});
    expect(vehicleRentalsAfterPost).toHaveLength(vehicleRentals.length + 1);
    const vehicleRentalTitles = vehicleRentalsAfterPost.map((vehicleRental) => vehicleRental.title);
    expect(vehicleRentalTitles).toContain(newVehicleRental.title);
  });

  // Test GET /api/vehicleRentals/:id
  it("should return one vehicleRental by ID when GET /api/vehicleRentals/:id is called", async () => {
    const vehicleRental = await VehicleRental.findOne();
    await api
      .get(`/api/vehicleRentals/${vehicleRental._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return 404 for a non-existing vehicleRental ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    await api.get(`/api/vehicleRentals/${nonExistentId}`).expect(404);
  });

  // Test PUT /api/vehicleRentals/:id
  it("should update one vehicleRental with partial data when PUT /api/vehicleRentals/:id is called", async () => {
    const vehicleRental = await VehicleRental.findOne();
    const updatedVehicleRental = {
      category: "Pean3ut4",
    description: "Pea3nut4",
    };

    await api
      .put(`/api/vehicleRentals/${vehicleRental._id}`)
      .send(updatedVehicleRental)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedVehicleRentalCheck = await VehicleRental.findById(vehicleRental._id);
    expect(updatedVehicleRentalCheck.description).toBe(updatedVehicleRental.description);
    expect(updatedVehicleRentalCheck.type).toBe(updatedVehicleRental.type);
  });

  it("should return 400 for invalid vehicleRental ID when PUT /api/vehicleRentals/:id", async () => {
    const invalidId = "12345";
    await api.put(`/api/vehicleRentals/${invalidId}`).send({}).expect(404);
  });

  // Test DELETE /api/vehicleRentals/:id
  it("should delete one vehicleRental by ID when DELETE /api/vehicleRentals/:id is called", async () => {
    const vehicleRental = await VehicleRental.findOne();
    await api.delete(`/api/vehicleRentals/${vehicleRental._id}`).expect(204);

    const deletedVehicleRentalCheck = await VehicleRental.findById(vehicleRental._id);
    expect(deletedVehicleRentalCheck).toBeNull();
  });

  it("should return 400 for invalid vehicleRental ID when DELETE /api/vehicleRentals/:id", async () => {
    const invalidId = "12345";
    await api.delete(`/api/vehicleRentals/${invalidId}`).expect(404);
  });
});
