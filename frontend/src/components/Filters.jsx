import { useState } from 'react'

export default function Filters({ filters, onFilter }) {
    const [local, setLocal] = useState(filters)
    const set = (k, v) => setLocal(p => ({ ...p, [k]: v }))

    const handleSubmit = (e) => {
        e.preventDefault()
        onFilter({ ...local, offset: 0 })
    }

    const handleReset = () => {
        const reset = { suburb: '', price_min: '', price_max: '', beds: '', baths: '', type: '', keyword: '', offset: 0 }
        setLocal(reset)
        onFilter(reset)
    }

    return (
        <form onSubmit={handleSubmit} style={{ background: 'var(--color-background-secondary)', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '0.5px solid var(--color-border-tertiary)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                <input placeholder="Suburb" value={local.suburb} onChange={e => set('suburb', e.target.value)} />
                <input placeholder="Keyword" value={local.keyword} onChange={e => set('keyword', e.target.value)} />
                <input type="number" placeholder="Min price" value={local.price_min} onChange={e => set('price_min', e.target.value)} />
                <input type="number" placeholder="Max price" value={local.price_max} onChange={e => set('price_max', e.target.value)} />
                <select value={local.beds} onChange={e => set('beds', e.target.value)}>
                    <option value="">Any beds</option>
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+ beds</option>)}
                </select>
                <select value={local.baths} onChange={e => set('baths', e.target.value)}>
                    <option value="">Any baths</option>
                    {[1, 2, 3].map(n => <option key={n} value={n}>{n}+ baths</option>)}
                </select>
                <select value={local.type} onChange={e => set('type', e.target.value)}>
                    <option value="">Any type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                </select>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button type="submit">Search</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </div>
        </form>
    )
}