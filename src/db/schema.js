export const createHotelsTable = `
  CREATE TABLE IF NOT EXISTS hotels
  (
      id              INT AUTO_INCREMENT PRIMARY KEY,
      name            VARCHAR(255) NOT NULL,
      description     TEXT,
      city            VARCHAR(100) NOT NULL,
      country         VARCHAR(100) NOT NULL,
      address         TEXT,
      star_rating     DECIMAL(2, 1),
      price_per_night DECIMAL(10, 2),
      amenities       JSON,
      hotel_type      VARCHAR(50),
      image_url       TEXT,
      latitude        DECIMAL(10, 8),
      longitude       DECIMAL(11, 8),
      created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_city (city),
      INDEX idx_country (country),
      INDEX idx_price (price_per_night),
      INDEX idx_rating (star_rating)
  )
`;

export const createRoomsTable = `
  CREATE TABLE IF NOT EXISTS rooms
  (
      id              INT AUTO_INCREMENT PRIMARY KEY,
      hotel_id        INT            NOT NULL,
      room_type       VARCHAR(100)   NOT NULL,
      capacity        INT            NOT NULL,
      price_per_night DECIMAL(10, 2) NOT NULL,
      available_rooms INT            NOT NULL,
      room_amenities  JSON,
      FOREIGN KEY (hotel_id) REFERENCES hotels (id) ON DELETE CASCADE,
      INDEX idx_hotel (hotel_id),
      INDEX idx_capacity (capacity)
  )
`;

export const createBookingsTable = `
  CREATE TABLE IF NOT EXISTS bookings
  (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      hotel_id    INT            NOT NULL,
      room_id     INT            NOT NULL,
      guest_name  VARCHAR(255)   NOT NULL,
      guest_email VARCHAR(255)   NOT NULL,
      check_in    DATE           NOT NULL,
      check_out   DATE           NOT NULL,
      num_guests  INT            NOT NULL,
      total_price DECIMAL(10, 2) NOT NULL,
      status      ENUM ('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
      created_at  TIMESTAMP                                  DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hotel_id) REFERENCES hotels (id),
      FOREIGN KEY (room_id) REFERENCES rooms (id),
      INDEX idx_dates (check_in, check_out),
      INDEX idx_hotel (hotel_id)
  )
`;
