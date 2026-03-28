import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fetchListings } from '../api'
import ListingCard from '../components/ListingCard'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [listings, setListings] = useState([])
    const [meta, setMeta] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const isAdmin = searchParams.get('admin') === 'true'

    const filters = {
        suburb: searchParams.get('suburb') || '',
        price_min: searchParams.get('price_min') || '',
        price_max: searchParams.get('price_max') || '',
        beds: searchParams.get('beds') || '',
        baths: searchParams.get('baths') || '',
        type: searchParams.get('type') || '',
        keyword: searchParams.get('keyword') || '',
        offset: searchParams.get('offset') || 0,
        limit: 6,
    }

    useEffect(() => {
        setLoading(true)
        fetchListings(filters, isAdmin)
            .then(data => { setListings(data.data); setMeta(data) })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [searchParams])

    const updateFilters = (newFilters) => {
        const params = {}
        Object.entries({ ...filters, ...newFilters }).forEach(([k, v]) => {
            if (v) params[k] = v
        })
        setSearchParams(params)
    }

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: 28, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    Property Search
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: 4 }}>
                    {meta.total ?? '...'} properties found
                </p>
            </header>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
                <label style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={e => updateFilters({ admin: e.target.checked ? 'true' : '' })}
                        style={{ marginRight: 6 }}
                    />
                    Admin view
                </label>
            </div>

            <Filters filters={filters} onFilter={updateFilters} />

            {loading ? (
                <p style={{ color: 'var(--color-text-secondary)', padding: '2rem 0' }}>Loading...</p>
            ) : listings.length === 0 ? (
                <p style={{ color: 'var(--color-text-secondary)', padding: '2rem 0' }}>No properties found.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, margin: '1.5rem 0' }}>
                    {listings.map(l => (
                        <ListingCard key={l.id} listing={l} onClick={() => navigate(`/listings/${l.id}${isAdmin ? '?admin=true' : ''}`)} />
                    ))}
                </div>
            )}

            <Pagination meta={meta} filters={filters} onPageChange={offset => updateFilters({ offset })} />
        </div>
    )
}