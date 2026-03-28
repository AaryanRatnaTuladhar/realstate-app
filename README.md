# Real Estate Listing Search API

A full-stack real estate property search application built with Node.js, Express, PostgreSQL, and React.

---

## Project Structure
```
realestate-app/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Request/response handling
│   │   ├── services/       # Business logic + DB queries
│   │   └── routes/         # API route definitions
│   ├── db/
│   │   ├── schema.sql      # Table definitions + indexes
│   │   └── seed.sql        # Sample data
│   └── tests/              # API tests
└── frontend/         # React app (Vite)
    └── src/
        ├── pages/          # SearchPage, DetailPage
        └── components/     # Filters, ListingCard, Pagination
```

---

## Prerequisites

- Node.js v18+
- PostgreSQL 15 or 16 (installed and running)

---

## 1. Database Setup

### Create the database and user

Open a terminal and connect as the postgres superuser:
```bash
psql -U postgres
```

Then run:
```sql
CREATE DATABASE realestate;
CREATE USER realestate_user WITH PASSWORD 'realestate123';
GRANT ALL PRIVILEGES ON DATABASE realestate TO realestate_user;
GRANT ALL ON SCHEMA public TO realestate_user;
ALTER SCHEMA public OWNER TO realestate_user;
\q
```

### Apply the schema
```bash
cd backend
psql -U realestate_user -d realestate -f db/schema.sql
```

### Seed sample data
```bash
psql -U realestate_user -d realestate -f db/seed.sql
```

---

## 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

Server runs at: `http://localhost:3001`

### Environment variables

Create a `.env` file in the `backend/` folder:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=realestate
DB_USER=realestate_user
DB_PASSWORD=realestate123
PORT=3001
```

---

## 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:5173`

---

## 4. Running Tests
```bash
cd backend
npm test
```

Tests cover:
- Listing endpoint returns 200 with data
- Price range filter works correctly
- Internal notes hidden from regular users
- Internal notes visible to admin users
- Returns 404 for non-existent listing

---

## 5. API Reference

### GET /listings

Returns a paginated list of active properties with optional filters.

**Query parameters:**

| Parameter   | Type   | Description                          | Example          |
|-------------|--------|--------------------------------------|------------------|
| suburb      | string | Partial match on suburb or address   | Northside        |
| keyword     | string | Search title, description, address   | modern           |
| price_min   | number | Minimum price                        | 500000           |
| price_max   | number | Maximum price                        | 900000           |
| beds        | number | Minimum bedrooms                     | 3                |
| baths       | number | Minimum bathrooms                    | 2                |
| type        | string | house, apartment, townhouse, land    | house            |
| limit       | number | Results per page (default 10, max 50)| 6                |
| offset      | number | How many results to skip             | 12               |

**Example requests:**
```bash
# All listings (first page)
GET http://localhost:3001/listings

# Filter by suburb
GET http://localhost:3001/listings?suburb=Northside

# Filter by price range and beds
GET http://localhost:3001/listings?price_min=500000&price_max=900000&beds=3

# Search by keyword
GET http://localhost:3001/listings?keyword=modern

# Pagination - page 2 (skip first 6)
GET http://localhost:3001/listings?limit=6&offset=6

# Combined filters
GET http://localhost:3001/listings?suburb=CBD&type=apartment&price_max=600000
```

**Example response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Spacious Family Home",
      "price": "750000.00",
      "property_type": "house",
      "suburb": "Northside",
      "address": "12 Oak Street, Northside",
      "bedrooms": 4,
      "bathrooms": 2,
      "status": "active",
      "agent_name": "Sarah Johnson",
      "agent_phone": "0411-111-111"
    }
  ],
  "total": 25,
  "limit": 6,
  "offset": 0,
  "page": 1,
  "total_pages": 5
}
```

---

### GET /listings/:id

Returns full details for a single property.
```bash
# Regular user
GET http://localhost:3001/listings/1

# Admin user (sees internal_notes field)
GET http://localhost:3001/listings/1
Header: x-is-admin: true
```

**Example response (admin):**
```json
{
  "id": 1,
  "title": "Spacious Family Home",
  "description": "Beautiful 4-bed home with large backyard...",
  "price": "750000.00",
  "property_type": "house",
  "suburb": "Northside",
  "address": "12 Oak Street, Northside",
  "bedrooms": 4,
  "bathrooms": 2,
  "status": "active",
  "agent_name": "Sarah Johnson",
  "agent_email": "sarah@realty.com",
  "agent_phone": "0411-111-111",
  "agency": "Prime Realty",
  "internal_notes": "Vendor motivated to sell quickly"
}
```

---

## 6. Role-based Access

Admin access is controlled via a request header:
```
x-is-admin: true
```

When this header is present, the API includes the `internal_notes` field in responses. Without it, that field is never returned.

In the frontend, tick the **"Admin view"** checkbox on the search page to enable this automatically.

---

## 7. Design Decisions

- **Separation of concerns** — routes handle routing only, controllers handle HTTP request/response, services handle all DB logic
- **Parameterised queries** — all DB queries use `$1, $2...` placeholders to prevent SQL injection
- **Indexes** — added on price, suburb, type, bedrooms, bathrooms and status columns for fast filtering
- **Offset pagination** — simple and effective for this scale; response always includes total, page and total_pages for frontend use
- **URL-based state** — all search filters are stored in the URL so searches are bookmarkable and shareable