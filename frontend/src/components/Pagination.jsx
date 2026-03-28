export default function Pagination({ meta, filters, onPageChange }) {
    if (!meta.total || meta.total <= meta.limit) return null
    const { total, limit, offset } = meta
    const current = Math.floor(offset / limit)
    const pages = Math.ceil(total / limit)

    return (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: '1.5rem' }}>
            <button disabled={current === 0} onClick={() => onPageChange((current - 1) * limit)}>← Prev</button>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Page {current + 1} of {pages}</span>
            <button disabled={current >= pages - 1} onClick={() => onPageChange((current + 1) * limit)}>Next →</button>
        </div>
    )
}