const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");


const validUser = {
  name: "Jane Jobseeker",
  username: "jane.jobseeker@example.com",
  password: "JobSearch123!",
  phone_number: "+358401234567",
  licenseNumber: "PEANUTS",
  date_of_birth: "1995-06-15",
  address: {
    licenseExpiryDate: "2025-06-15",
    city: "Helsinki",
    yearsOfExperience: 5,
  },
  name: "Jane Jobseeker2",
  username: "jane.jobsee2ker@example.com",
  password: "JobSear2ch123!",
  phone_number: "+358401234527",
  gender: "PEANURTS2",
  date_of_birth: "1995-06-15",
  address: {
    licenseExpiryDate: "2025-06-15",
    city: "Helsinki",
    yearsOfExperience: 5,
  },
};

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

 describe("POST /api/users/signup", () => {
  describe("when the payload is valid", () => {
    it("should return status 201", async () => {
      await api
        .post("/api/users/signup")
        .send(validUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    });

    it("should return an username and token", async () => {
      const response = await api
        .post("/api/users/signup")
        .send(validUser)
        .expect(201);

      expect(response.body).toHaveProperty("token");
      expect(response.body.username).toBe(validUser.username);
    });

    it("should persist the user in the database", async () => {
      await api.post("/api/users/signup").send(validUser).expect(201);

      const savedUser = await User.findOne({ username: validUser.username });
      expect(savedUser).not.toBeNull();
      expect(savedUser.name).toBe(validUser.name);
    });
  });

  describe("when the payload is invalid", () => {
    it("should return status 400 when required fields are missing", async () => {
      const response = await api
        .post("/api/users/signup")
        .send({ username: "missing@example.com" })
        .expect(400);

      expect(response.body).toHaveProperty("error", "Please add all fields");
    });

    it("should not persist a user in the database", async () => {
      await api
        .post("/api/users/signup")
        .send({ username: "missing@example.com" })
        .expect(400);

      const usersAtEnd = await User.find({});
      expect(usersAtEnd).toHaveLength(0);
    });
  });

  describe("when the username is already registered", () => {
    it("should return status 400", async () => {
      await api.post("/api/users/signup").send(validUser).expect(201);

      const response = await api
        .post("/api/users/signup")
        .send({ ...validUser, name: "Another Jobseeker" })
        .expect(400);

      expect(response.body).toHaveProperty("error", "User already exists");
    });
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await api.post("/api/users/signup").send(validUser).expect(201);
  });

  describe("when the credentials are valid", () => {
    it("should return status 200", async () => {
      await api
        .post("/api/users/login")
        .send({
          username: validUser.username,
          password: validUser.password,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    it("should return an username and token", async () => {
      const response = await api
        .post("/api/users/login")
        .send({
          username: validUser.username,
          password: validUser.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty("token");
      expect(response.body.username).toBe(validUser.username);
    });
  });

  describe("when the credentials are invalid", () => {
    it("should return status 400 with a wrong password", async () => {
      const response = await api
        .post("/api/users/login")
        .send({
          username: validUser.username,
          password: "WrongPassword!",
        })
        .expect(400);

      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should return status 400 with an username that does not exist", async () => {
      const response = await api
        .post("/api/users/login")
        .send({
          username: "nobody@example.com",
          password: validUser.password,
        })
        .expect(400);

      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });
  });
});