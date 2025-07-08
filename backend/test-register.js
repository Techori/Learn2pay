const axios = require("axios");

async function testRegistration() {
  const testData = {
    institute_name: "Test Institute",
    institute_type: "college",
    description: "Test description",
    contact_person: {
      firstName: "John",
      lastName: "Doe",
    },
    contactEmail: "test@example.com",
    contactPhone: "1234567890",
    address: {
      completeAddress: "123 Test Street",
      city: "Test City",
      state: "Test State",
      pinCode: "12345",
    },
    password: "password123",
    documents: {
      registerationCertificate: true,
      panCard: true,
    },
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/api/institute/register",
      testData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Success:", response.data);
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
  }
}

testRegistration();
