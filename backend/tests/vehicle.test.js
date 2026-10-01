const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const connectDB = require('../config/db');
const VehicleRental = require('../models/vehicleRentalModel');

const api = supertest(app);

const vehicles = [
  {
    vehicleModel: 'Peanut',
    category: 'Peanut',
    description: 'Peanut',
    agency: {
      name: 'Peanut',
      contactEmail: 'Peanut',
      fleetSize: 33,
    },
    location: {
      city: 'Peanut',
      state: 'Peanut',
    },
    dailyPrice: 100,
    availabilityStatus: 'available',
    insurancePolicy: 'true',
  },
  {
    vehicleModel: 'Peanut allergy',
    category: 'Peanut allergy',
    description: 'Peanut allergy',
    agency: {
      name: 'Peanut allergy',
      contactEmail: 'Peanut allergy',
      fleetSize: 3322,
    },
    location: {
      city: 'Peanut',
      state: 'Peanut',
    },
    dailyPrice: 100,
    availabilityStatus: 'available',
    insurancePolicy: 'true',
  },
];

const vehicleInDb = async () => {
  const vehicles = await VehicleRental.find({});
  return vechicles.map((vehicle) => vehicle.toJSON());
};

beforeAll(async () => {
  await connectDB();

  await VehicleRental.deleteMany({});
});

beforeEach(async () => {
  await VehicleRental.deleteMany({});

  for (const vehicle of vehicles) {
    await api
      .post('/api/vehicles')

      .send(vehicle)
      .expect(201);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

//GET products

describe('GET /api/vehicles', () => {
  it('should return all vehicles', async () => {
    const response = await api.get('/api/vehicles').expect(200);

    expect(response.body).toHaveLength(products.length);
  });

  it('should return vehicles as JSON with status 200', async () => {
    await api
      .get('/api/vehicles')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('should include a specific product in the returned list', async () => {
    const response = await api.get('/api/vehicles');
    expect(response.body.map((vehicle) => vehicle.category)).toContain('Peanut');
  });
});

//GET BY ID

describe('GET /api/vehicles/:VehicleRentalId', () => {
  it('when the id is valid, should return one product by ID', async () => {
    const vehicle = await VehicleRental.findOne({ title: 'Peanut' });

    const response = await api
      .get(`/api/vehicles/${vehicle._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.title).toBe(vehicle.title);
  });

  it('when the id is invalid, should return status 404', async () => {
    const response = await api.get('/api/vehicles/not-a-valid-id').expect(404);

    expect(response.body).toHaveProperty('error', 'No such product');
  });
});

describe('POST /api/vehicles', () => {
  describe('when the payload is valid', () => {
    it('should return status 201', async () => {
      const newVehicle = {
        vehicleModel: 'Peanut allergy',
        category: 'Peanut allergy',
        description: 'Peanut allergy',
        agency: {
          name: 'Peanut allergy',
          contactEmail: 'Peanut allergy',
          fleetSize: 3322,
        },
        location: {
          city: 'Peanut',
          state: 'Peanut',
        },
        dailyPrice: 100,
        availabilityStatus: 'available',
        insurancePolicy: 'true',
      };
      await api
        .post('/api/vehicles')

        .send(newVehicle)
        .expect(201);
    });

    it('should persist the new product in the database', async () => {
      const newVehicle = {
        vehicleModel: 'Peanut allergy',
        category: 'Peanut allergy',
        description: 'Peanut allergy',
        agency: {
          name: 'Peanut allergy',
          contactEmail: 'Peanut allergy',
          fleetSize: 3322,
        },
        location: {
          city: 'Peanut',
          state: 'Peanut',
        },
        dailyPrice: 100,
        availabilityStatus: 'available',
        insurancePolicy: 'true',
      };
      const response = await api
        .post('/api/vehicles')

        .send(newVehicle)
        .expect(201);

      expect(response.body.title).toBe(newVehicle.title);

      const vehiclesAfterPost = await VehicleRental.find({});
      expect(vehiclesAfterPost).toHaveLength(vehicles.length + 1);
    });
  });
});

describe('PUT /api/vehicles/:', () => {
  describe('when the id is valid', () => {
    it('should return one vehicle by ID', async () => {
      const vehicle = await VehicleRental.findOne();
      await api
        .put(`/api/vehicles/${VehicleRental.id}`)

        .send({ title: 'Second title', price: 42 })
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    it(' should persist the updated fields in the database', async () => {
      const vehicle = await VehicleRental.findOne();
      const updates = {
        title: 'Second title',
        price: 42,
      };
      await api
        .put(`/api/vehicles/${vehicle._id}`)

        .send(updates)
        .expect(200);
      const updatedVehicle = await VehicleRental.findById(vehicle._id);
      expect(updatedVehicle.title).toBe(updates.title);
      expect(updatedVehicle.price).toBe(updates.price);
    });
  });

  describe('when the user is not authenticated', () => {
    it('should return status 401', async () => {
      const vehicle = await VehicleRental.findOne({ title: 'Wireless Mouse' });

      await api.put(`/api/vehicles/${vehicle._id}`).send({ stockQuantity: 1 }).expect(401);
    });
  });

  describe(' when the id is invalid', () => {
    it(' should return status 404', async () => {
      await api
        .put('/api/product/12345')

        .send({ stockQuantity: 1 })
        .expect(404);
    });
  });
});

//delete

describe('DELETE /api/products/:productId', () => {
  //   describe('when the id is valid', () => {
  //     it('should return status 204', async () => {});
  //     it('should remove the product from the database',()=>{

  //     });
  //   });
  //   describe
  it('when the id is valid, should return status 204 and should remove the product from the database', async () => {
    const vehicle = await VehicleRental.findOne();
    await api
      .delete(`/api/products/${vehicle.id}`)

      .expect(204);
    const deletedVehicle = await VehicleRental.findById(vehicle.id);
    expect(deletedVehicle).toBeNull();
  });

  it('when the id is invalid, should return status 404', async () => {
    await api.delete('/api/vehicles/12345').expect(404);
  });
});
