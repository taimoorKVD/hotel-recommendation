CREATE TABLE IF NOT EXISTS ranking_weights (
   id INT AUTO_INCREMENT PRIMARY KEY,
   ab_group CHAR(1) NOT NULL,
   vector_weight FLOAT NOT NULL,
   price_weight FLOAT NOT NULL,
   rating_weight FLOAT NOT NULL,
   geo_weight FLOAT NOT NULL,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   UNIQUE KEY uniq_group (ab_group)
);
