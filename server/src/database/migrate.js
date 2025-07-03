// Sample migration script to set up database schema
require('dotenv').config();
const { Client } = require('pg');

async function migrate() {
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

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );
    `);
    console.log('Created users table');

    // Create bands table
    await client.query(`
      CREATE TABLE IF NOT EXISTS bands (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        leader_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created bands table');

    // Create band_members table
    await client.query(`
      CREATE TABLE IF NOT EXISTS band_members (
        id UUID PRIMARY KEY,
        band_id UUID REFERENCES bands(id),
        user_id UUID REFERENCES users(id),
        role VARCHAR(100),
        instrument VARCHAR(100),
        join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'active',
        UNIQUE(band_id, user_id)
      );
    `);
    console.log('Created band_members table');

    // Create venues table
    await client.query(`
      CREATE TABLE IF NOT EXISTS venues (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        contact_info TEXT,
        capacity INT,
        hourly_rate DECIMAL(10,2),
        amenities TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created venues table');

    // Create rehearsals table
    await client.query(`
      CREATE TABLE IF NOT EXISTS rehearsals (
        id UUID PRIMARY KEY,
        band_id UUID REFERENCES bands(id),
        venue_id UUID REFERENCES venues(id),
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        status VARCHAR(20) DEFAULT 'scheduled',
        notes TEXT,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created rehearsals table');

    // Create availability table
    await client.query(`
      CREATE TABLE IF NOT EXISTS availability (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        day_of_week SMALLINT NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        preference_level SMALLINT DEFAULT 1,
        recurring BOOLEAN DEFAULT TRUE
      );
    `);
    console.log('Created availability table');

    // Create attendance table
    await client.query(`
      CREATE TABLE IF NOT EXISTS attendance (
        id UUID PRIMARY KEY,
        rehearsal_id UUID REFERENCES rehearsals(id),
        user_id UUID REFERENCES users(id),
        status VARCHAR(20) DEFAULT 'pending',
        response_time TIMESTAMP,
        notes TEXT
      );
    `);
    console.log('Created attendance table');

    // Create setlists table
    await client.query(`
      CREATE TABLE IF NOT EXISTS setlists (
        id UUID PRIMARY KEY,
        rehearsal_id UUID REFERENCES rehearsals(id),
        name VARCHAR(255),
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created setlists table');

    // Create setlist_items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS setlist_items (
        id UUID PRIMARY KEY,
        setlist_id UUID REFERENCES setlists(id),
        song_name VARCHAR(255) NOT NULL,
        duration_minutes INT,
        notes TEXT,
        position INT NOT NULL,
        status VARCHAR(20) DEFAULT 'planned'
      );
    `);
    console.log('Created setlist_items table');

    // Create notifications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        related_id UUID,
        type VARCHAR(50) NOT NULL,
        content TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created notifications table');

    console.log('Database migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await client.end();
  }
}

migrate();