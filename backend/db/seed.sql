-- Agents
INSERT INTO agents (name, email, phone, agency, is_admin) VALUES
  ('Sarah Johnson', 'sarah@realty.com', '0411-111-111', 'Prime Realty', TRUE),
  ('Mike Chen',     'mike@realty.com',  '0422-222-222', 'Prime Realty', FALSE),
  ('Priya Sharma',  'priya@homes.com',  '0433-333-333', 'Homes & Co',   FALSE);

-- Properties
INSERT INTO properties (title, description, price, property_type, suburb, address, bedrooms, bathrooms, agent_id, status, internal_notes) VALUES
  ('Spacious Family Home', 'A beautiful 4-bed home with large backyard.', 750000, 'house', 'Northside', '12 Oak Street, Northside', 4, 2, 1, 'active', 'Vendor motivated to sell quickly'),
  ('Modern City Apartment', 'Sleek 2-bed apartment in the heart of the city.', 520000, 'apartment', 'CBD', '5/88 Main Road, CBD', 2, 1, 2, 'active', 'New building, strata fees apply'),
  ('Charming Townhouse', 'End-of-terrace townhouse near great schools.', 630000, 'townhouse', 'Southbank', '3 River Lane, Southbank', 3, 2, 3, 'active', NULL),
  ('Budget Studio', 'Cozy studio perfect for first home buyers.', 310000, 'apartment', 'Westfield', '22 Park Ave, Westfield', 1, 1, 2, 'active', 'Some cosmetic work needed'),
  ('Luxury Penthouse', 'Stunning views, rooftop terrace, 3 beds.', 1200000, 'apartment', 'CBD', '2001/1 Sky Tower, CBD', 3, 2, 1, 'active', 'High-profile client - discretion required'),
  ('Vacant Land', 'Prime 600sqm block ready to build.', 420000, 'land', 'Northside', '7 Future Close, Northside', 0, 0, 3, 'active', NULL),
  ('Sold Cottage', 'Quaint 2-bed cottage.', 480000, 'house', 'Eastwood', '9 Elm St, Eastwood', 2, 1, 2, 'sold', 'Sold above asking price'),
  ('3 Bed Brick Home', 'Classic brick home on quiet street.', 680000, 'house', 'Northside', '45 Maple Drive, Northside', 3, 1, 1, 'active', NULL);