import axios from "axios";

const BASE = "http://localhost:3001";

export const fetchListings = (params, isAdmin = false) =>
  axios
    .get(`${BASE}/listings`, {
      params,
      headers: isAdmin ? { "x-is-admin": "true" } : {},
    })
    .then((r) => r.data);

export const fetchListing = (id, isAdmin = false) =>
  axios
    .get(`${BASE}/listings/${id}`, {
      headers: isAdmin ? { "x-is-admin": "true" } : {},
    })
    .then((r) => r.data);
