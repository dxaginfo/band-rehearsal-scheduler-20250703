// Sample seed script to populate database with test data
require('dotenv').config();
const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function seed() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();
    console.log('Connected to the database');

    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const userId1 = uuidv4();
    const userId2 = uuidv4();

    await client.query(`
      INSERT INTO users (id, email, password_hash, first_name, last_name, phone)
      VALUES 
        ('${userId1}', 'john@example.com', '${hashedPassword}', 'John', 'Doe', '+1234567890'),
        ('${userId2}', 'jane@example.com', '${hashedPassword}', 'Jane', 'Smith', '+0987654321')
      ON CONFLICT (email) DO NOTHING;
    `);
    console.log('Inserted test users');

    // Create test bands
    const bandId1 = uuidv4();
    const bandId2 = uuidv4();

    await client.query(`
      INSERT INTO bands (id, name, description, leader_id)
      VALUES 
        ('${bandId1}', 'Rock Stars', 'A rock band for testing', '${userId1}'),
        ('${bandId2}', 'Jazz Ensemble', 'A jazz ensemble for testing', '${userId2}')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Inserted test bands');

    // Create band members
    await client.query(`
      INSERT INTO band_members (id, band_id, user_id, role, instrument)
      VALUES 
        ('${uuidv4()}', '${bandId1}', '${userId1}', 'Leader', 'Guitar'),
        ('${uuidv4()}', '${bandId1}', '${userId2}', 'Member', 'Bass'),
        ('${uuidv4()}', '${bandId2}', '${userId2}', 'Leader', 'Piano'),
        ('${uuidv4()}', '${bandId2}', '${userId1}', 'Member', 'Drums')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Inserted test band members');

    // Create test venues
    const venueId1 = uuidv4();
    const venueId2 = uuidv4();

    await client.query(`
      INSERT INTO venues (id, name, address, capacity, hourly_rate)
      VALUES 
        ('${venueId1}', 'Studio A', '123 Music St, Anytown', 10, 50.00),
        ('${venueId2}', 'Jam Space', '456 Band Ave, Musicville', 5, 30.00)
      ON CONFLICT DO NOTHING;
    `);
    console.log('Inserted test venues');

    // Create test rehearsals
    const rehearsalId1 = uuidv4();
    const rehearsalId2 = uuidv4();

    await client.query(`
      INSERT INTO rehearsals (id, band_id, venue_id, start_time, end_time, status, created_by)
      VALUES 
        ('${rehearsalId1}', '${bandId1}', '${venueId1}', '2025-08-01 18:00:00', '2025-08-01 20:00:00', 'scheduled', '${userId1}'),
        ('${rehearsalId2}', '${bandId2}', '${venueId2}', '2025-08-02 19:00:00', '2025-08-02 21:00:00', 'scheduled', '${userId2}')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Inserted test rehearsals');

    // Create test attendance records
    await client.query(`
      INSERT INTO attendance (id, rehearsal_id, user_id, status)
      VALUES 
        ('${uuidv4()}', '${rehearsalId1}', '${userId1}', 'confirmed'),
        ('${uuidv4()}', '${rehearsalId1}', '${userId2}', 'pending'),
        ('${uuidv4()}', '${rehearsalId2}', '${userId2}', 'confirmed'),
        ('${uuidv4()}', '${rehearsalId2}', '${userId1}', 'confirmed')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Inserted test attendance records');

    // Create test setlists
    const setlistId1 = uuidv4();
    const setlistId2 = uuidv4();

    await client.query(`
      INSERT INTO setlists (id, rehearsal_id, name, created_by)
      VALUES 
        ('${setlistId1}', '${rehearsalId1}', 'Rock Show Setlist', '${userId1}'),
        ('${setlistId2}', '${rehearsalId2}', 'Jazz Night Setlist', '${userId2}')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Inserted test setlists');

    // Create test setlist items
    await client.query(`
      INSERT INTO setlist_items (id, setlist_id, song_name, duration_minutes, position)
      VALUES 
        ('${uuidv4()}', '${setlistId1}', 'Rock Song 1', 4, 1),
        ('${uuidv4()}', '${setlistId1}', 'Rock Song 2', 3, 2),
        ('${uuidv4()}', '${setlistId1}', 'Rock Song 3', 5, 3),
        ('${uuidv4()}', '${setlistId2}', 'Jazz Standard 1', 6, 1),
        ('${uuidv4()}', '${setlistId2}', 'Jazz Standard 2', 4, 2),
        ('${uuidv4()}', '${setlistId2}', 'Jazz Standard 3', 5, 3)
      ON CONFLICT DO NOTHING;
    `);
    console.log('Inserted test setlist items');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await client.end();
  }
}

seed();