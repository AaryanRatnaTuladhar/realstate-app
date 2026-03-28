const pool = require("../config/db");

const listingService = {
  async getListings({
    price_min,
    price_max,
    beds,
    baths,
    type,
    keyword,
    suburb,
    limit,
    offset,
    isAdmin,
  }) {
    const conditions = ["status = 'active'"];
    const values = [];
    let i = 1;

    if (price_min) {
      conditions.push(`price >= $${i++}`);
      values.push(price_min);
    }
    if (price_max) {
      conditions.push(`price <= $${i++}`);
      values.push(price_max);
    }
    if (beds) {
      conditions.push(`bedrooms >= $${i++}`);
      values.push(beds);
    }
    if (baths) {
      conditions.push(`bathrooms >= $${i++}`);
      values.push(baths);
    }
    if (type) {
      conditions.push(`property_type = $${i++}`);
      values.push(type);
    }
    if (suburb) {
      conditions.push(
        `(LOWER(suburb) LIKE $${i} OR LOWER(address) LIKE $${i})`,
      );
      values.push(`%${suburb.toLowerCase()}%`);
      i++;
    }
    if (keyword) {
      conditions.push(
        `(LOWER(title) LIKE $${i} OR LOWER(description) LIKE $${i} OR LOWER(address) LIKE $${i} OR LOWER(suburb) LIKE $${i})`,
      );
      values.push(`%${keyword.toLowerCase()}%`);
      i++;
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    // Admin sees internal_notes, regular users do not
    const notesField = isAdmin ? ", internal_notes" : "";

    const query = `
      SELECT p.id, p.title, p.price, p.property_type, p.suburb,
             p.address, p.bedrooms, p.bathrooms, p.status,
             a.name AS agent_name, a.phone AS agent_phone
             ${notesField}
      FROM properties p
      LEFT JOIN agents a ON p.agent_id = a.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT $${i} OFFSET $${i + 1}
    `;

    values.push(limit, offset);

    // Count query for pagination metadata
    const countQuery = `SELECT COUNT(*) FROM properties p ${whereClause}`;
    const countValues = values.slice(0, -2); // remove limit/offset

    const [result, countResult] = await Promise.all([
      pool.query(query, values),
      pool.query(countQuery, countValues),
    ]);

    return {
      data: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset),
    };
  },

  async getListingById(id, isAdmin) {
    const notesField = isAdmin ? ", p.internal_notes" : "";
    const query = `
      SELECT p.*, a.name AS agent_name, a.email AS agent_email,
             a.phone AS agent_phone, a.agency
             ${notesField}
      FROM properties p
      LEFT JOIN agents a ON p.agent_id = a.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },
};

module.exports = listingService;
