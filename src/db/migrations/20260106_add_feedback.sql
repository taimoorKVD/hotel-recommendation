CREATE TABLE IF NOT EXISTS user_events (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   user_id VARCHAR(64) NOT NULL,
   hotel_id INT NOT NULL,
   event_type ENUM('impression','click','booking') NOT NULL,
   ab_group CHAR(1) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   INDEX idx_user (user_id),
   INDEX idx_hotel (hotel_id),
   INDEX idx_event (event_type),
   INDEX idx_time (created_at)
);
