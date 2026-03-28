import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { fetchListing } from '../api'

export default function DetailPage() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const isAdmin = searchParams.get('admin') === 'true'
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchListing(id, isAdmin)
            .then(setListing)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id])

    const fmt = n => Number(n).toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>
    if (!listing) return <div style={{ padding: '2rem' }}>Property not found.</div>

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem' }}>← Back to search</button>

            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>{listing.property_type}</span>
            <h1 style={{ fontSize: 26, fontWeight: 500, margin: '8px 0 4px', color: 'var(--color-text-primary)' }}>{listing.title}</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>{listing.address}, {listing.suburb}</p>

            <p style={{ fontSize: 28, fontWeight: 500, marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>{fmt(listing.price)}</p>

            <div style={{ display: 'flex', gap: 24, fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                {listing.bedrooms > 0 && <span>{listing.bedrooms} bedrooms</span>}
                {listing.bathrooms > 0 && <span>{listing.bathrooms} bathrooms</span>}
                <span style={{ textTransform: 'capitalize' }}>{listing.status}</span>
            </div>

            <p style={{ lineHeight: 1.7, color: 'var(--color-text-primary)', marginBottom: '2rem' }}>{listing.description}</p>

            <div style={{ background: 'var(--color-background-secondary)', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: 15, fontWeight: 500, marginBottom: 12 }}>Agent</h2>
                <p style={{ fontWeight: 500 }}>{listing.agent_name}</p>
                {listing.agent_email && <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{listing.agent_email}</p>}
                {listing.agent_phone && <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{listing.agent_phone}</p>}
                {listing.agency && <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{listing.agency}</p>}
            </div>

            {isAdmin && listing.internal_notes && (
                <div style={{ background: '#FAECE7', border: '0.5px solid #F0997B', borderRadius: 12, padding: '1.25rem' }}>
                    <h2 style={{ fontSize: 14, fontWeight: 500, color: '#714B1E', marginBottom: 8 }}>Admin Notes</h2>
                    <p style={{ fontSize: 14, color: '#714B1E' }}>{listing.internal_notes}</p>
                </div>
            )}
        </div>
    )
}