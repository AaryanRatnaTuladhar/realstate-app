-- Agents table
CREATE TABLE agents (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(150) UNIQUE NOT NULL,
  phone     VARCHAR(20),
  agency    VARCHAR(100),
  is_admin  BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties table
CREATE TABLE properties (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  description     TEXT,
  price           NUMERIC(12, 2) NOT NULL,
  property_type   VARCHAR(50) NOT NULL,   -- house, apartment, townhouse, land
  suburb          VARCHAR(100) NOT NULL,
  address         VARCHAR(255) NOT NULL,
  bedrooms        SMALLINT,
  bathrooms       SMALLINT,
  agent_id        INT REFERENCES agents(id),
  status          VARCHAR(50) DEFAULT 'active',  -- active, sold, leased
  internal_notes  TEXT,   -- only visible to admins!
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common search patterns
CREATE INDEX idx_properties_price       ON properties(price);
CREATE INDEX idx_properties_suburb      ON properties(suburb);
CREATE INDEX idx_properties_type        ON properties(property_type);
CREATE INDEX idx_properties_bedrooms    ON properties(bedrooms);
CREATE INDEX idx_properties_bathrooms   ON properties(bathrooms);
CREATE INDEX idx_properties_status      ON properties(status);