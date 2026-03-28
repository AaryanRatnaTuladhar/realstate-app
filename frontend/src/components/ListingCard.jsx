export default function ListingCard({ listing, onClick }) {
    const fmt = n => Number(n).toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })
    const typeColor = { house: '#185FA5', apartment: '#3B6D11', townhouse: '#854F0B', land: '#993556' }

    return (
        <div onClick={onClick} style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: '1.25rem', cursor: 'pointer', transition: 'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border-tertiary)'}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 500, background: typeColor[listing.property_type] + '22', color: typeColor[listing.property_type], padding: '3px 8px', borderRadius: 6 }}>
                    {listing.property_type}
                </span>
                {listing.internal_notes && (
                    <span style={{ fontSize: 11, color: '#993C1D', background: '#FAECE7', padding: '3px 8px', borderRadius: 6 }}>admin</span>
                )}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 4, color: 'var(--color-text-primary)' }}>{listing.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12 }}>{listing.suburb} · {listing.address}</p>

            <p style={{ fontSize: 20, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 12 }}>{fmt(listing.price)}</p>

            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                {listing.bedrooms > 0 && <span>{listing.bedrooms} bed</span>}
                {listing.bathrooms > 0 && <span>{listing.bathrooms} bath</span>}
            </div>

            {listing.internal_notes && (
                <div style={{ marginTop: 12, padding: '8px 10px', background: '#FAECE7', borderRadius: 6, fontSize: 12, color: '#714B1E' }}>
                    <strong>Note:</strong> {listing.internal_notes}
                </div>
            )}

            <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 12 }}>Agent: {listing.agent_name}</p>
        </div>
    )
}