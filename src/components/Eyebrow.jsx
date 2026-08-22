export default function Eyebrow({ children, className = 'mb-4' }) {
  return <div className={`text-gold text-xs font-bold uppercase tracking-[0.25em] ${className}`}>{children}</div>
}