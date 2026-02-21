// MongoDB initialization script
// This script runs when the MongoDB container first starts

db = db.getSiblingDB('recruitment_db');

// Create collections with basic validation
db.createCollection('candidates', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "Candidate name - required"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Valid email address - required"
        },
        phone: {
          bsonType: "string",
          description: "Phone number (optional)"
        },
        skills: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "Array of skills (optional)"
        },
        experience: {
          bsonType: "number",
          minimum: 0,
          description: "Years of experience (optional)"
        },
        status: {
          bsonType: "string",
          enum: ["pending", "reviewed", "accepted", "rejected"],
          description: "Application status (optional)"
        },
        createdAt: {
          bsonType: "date",
          description: "Creation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update timestamp"
        }
      }
    }
  }
});

// Create indexes for better performance
db.candidates.createIndex({ "email": 1 }, { unique: true });
db.candidates.createIndex({ "status": 1 });
db.candidates.createIndex({ "createdAt": -1 });

print("Database 'recruitment_db' initialized successfully");
