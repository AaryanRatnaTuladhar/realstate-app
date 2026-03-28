-- Agents
INSERT INTO agents (name, email, phone, agency, is_admin) VALUES
  ('Sarah Johnson', 'sarah@realty.com',  '0411-111-111', 'Prime Realty', TRUE),
  ('Mike Chen',     'mike@realty.com',   '0422-222-222', 'Prime Realty', FALSE),
  ('Priya Sharma',  'priya@homes.com',   '0433-333-333', 'Homes & Co',   FALSE),
  ('David Lee',     'david@estates.com', '0444-444-444', 'Lee Estates',  FALSE),
  ('Emma Wilson',   'emma@realty.com',   '0455-555-555', 'Prime Realty', FALSE);

-- Properties (25 total so pagination is clearly visible with 6 per page = 5 pages)
INSERT INTO properties (title, description, price, property_type, suburb, address, bedrooms, bathrooms, agent_id, status, internal_notes) VALUES
  ('Spacious Family Home',       'Beautiful 4-bed home with large backyard and double garage.',         750000,  'house',     'Northside',  '12 Oak Street, Northside',          4, 2, 1, 'active', 'Vendor motivated to sell quickly'),
  ('Modern City Apartment',      'Sleek 2-bed apartment in the heart of the city with gym access.',    520000,  'apartment', 'CBD',        '5/88 Main Road, CBD',               2, 1, 2, 'active', 'New building, strata fees apply'),
  ('Charming Townhouse',         'End-of-terrace townhouse near great schools and parks.',             630000,  'townhouse', 'Southbank',  '3 River Lane, Southbank',           3, 2, 3, 'active', NULL),
  ('Budget Studio',              'Cozy studio perfect for first home buyers or investors.',            310000,  'apartment', 'Westfield',  '22 Park Ave, Westfield',            1, 1, 2, 'active', 'Some cosmetic work needed'),
  ('Luxury Penthouse',           'Stunning city views, rooftop terrace, premium finishes throughout.', 1200000, 'apartment', 'CBD',        '2001/1 Sky Tower, CBD',             3, 2, 1, 'active', 'High-profile client - discretion required'),
  ('Vacant Land Northside',      'Prime 600sqm block in quiet street, ready to build your dream home.',420000,  'land',      'Northside',  '7 Future Close, Northside',         0, 0, 3, 'active', NULL),
  ('Classic Brick Home',         'Well-maintained 3-bed brick home on a quiet tree-lined street.',     680000,  'house',     'Northside',  '45 Maple Drive, Northside',         3, 1, 1, 'active', NULL),
  ('Riverside Apartment',        'Bright 2-bed apartment with stunning river views and balcony.',      595000,  'apartment', 'Southbank',  '12/4 Riverside Drive, Southbank',   2, 2, 4, 'active', NULL),
  ('Cozy Cottage',               'Renovated 2-bed cottage with original charm and modern kitchen.',    465000,  'house',     'Eastwood',   '9 Elm Street, Eastwood',            2, 1, 2, 'active', NULL),
  ('Executive Townhouse',        'Stylish 4-bed townhouse with rooftop entertaining area.',            890000,  'townhouse', 'CBD',        '7 Collins Lane, CBD',               4, 3, 1, 'active', 'Body corp approval needed for pets'),
  ('Investor Special',           'Tenanted 2-bed unit with strong rental yield in growth suburb.',     398000,  'apartment', 'Westfield',  '3/10 Station Road, Westfield',      2, 1, 5, 'active', 'Tenant lease expires March 2026'),
  ('Grand Victorian Home',       'Stunning 5-bed Victorian with original features and wine cellar.',   1450000, 'house',     'Eastwood',   '1 Heritage Avenue, Eastwood',       5, 3, 4, 'active', 'Heritage listed - renovation restrictions apply'),
  ('Garden Apartment',           'Ground floor 2-bed with private courtyard garden.',                  480000,  'apartment', 'Northside',  '1/33 Blossom Street, Northside',    2, 1, 3, 'active', NULL),
  ('Northside Knockdown',        'Large 700sqm block with old dwelling, prime development opportunity.',550000, 'land',      'Northside',  '88 Redgum Road, Northside',         0, 0, 1, 'active', 'DA already approved for 3 townhouses'),
  ('Sunny 3 Bed Home',           'Light-filled home with solar panels, new kitchen and alfresco area.',710000,  'house',     'Southbank',  '14 Horizon Street, Southbank',      3, 2, 5, 'active', NULL),
  ('CBD Studio Investment',      'Compact studio in prime CBD location, high rental demand.',          285000,  'apartment', 'CBD',        '509/22 Queen Street, CBD',          1, 1, 2, 'active', 'Building has short-term rental restrictions'),
  ('Westfield Family Home',      'Spacious 4-bed home near top schools, shops and transport.',         725000,  'house',     'Westfield',  '67 Greenview Drive, Westfield',     4, 2, 4, 'active', NULL),
  ('Hilltop Retreat',            'Peaceful 3-bed home with sweeping valley views and large deck.',     820000,  'house',     'Eastwood',   '3 Summit Court, Eastwood',          3, 2, 1, 'active', NULL),
  ('Affordable First Home',      'Neat 2-bed home ideal for first home buyers, close to amenities.',   395000,  'house',     'Westfield',  '22 Lemon Tree Lane, Westfield',     2, 1, 3, 'active', NULL),
  ('Penthouse with Pool',        'Luxury 3-bed penthouse with private pool and 24hr concierge.',       1800000, 'apartment', 'CBD',        '4201/8 Pinnacle Tower, CBD',        3, 2, 1, 'active', 'Vendor will consider offers over 1.75M'),
  ('Southbank Townhouse',        'Modern 3-bed townhouse walking distance to cafes and river.',        675000,  'townhouse', 'Southbank',  '2/19 Promenade Way, Southbank',     3, 2, 5, 'active', NULL),
  ('Eastwood Bungalow',          'Character-filled bungalow on large block with workshop.',            510000,  'house',     'Eastwood',   '31 Wattle Grove, Eastwood',         3, 1, 3, 'active', NULL),
  ('New Development Apartment',  'Brand new 2-bed apartment off the plan, developer incentives.',      560000,  'apartment', 'Northside',  '204/6 Nova Rise, Northside',        2, 2, 4, 'active', 'Developer offering $10k furniture package'),
  ('Large Suburban Block',       'Flat 850sqm block in quiet cul-de-sac, all services connected.',    370000,  'land',      'Westfield',  '5 Cul-de-sac Court, Westfield',     0, 0, 5, 'active', NULL),
  ('Waterfront Home',            'Rare 4-bed waterfront home with private jetty and boat shed.',       2100000, 'house',     'Southbank',  '1 Jetty Road, Southbank',           4, 3, 1, 'active', 'Off market - do not advertise publicly');