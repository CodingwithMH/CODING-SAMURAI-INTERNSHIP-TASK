import { Link } from "react-router-dom"

export function Card({ children, className = "", onClick, style,id }) {
  return (
    <Link to={`/post/${id}`} className={`rounded-lg border bg-white shadow-sm ${className}`} onClick={onClick} style={style}>
      {children}
    </Link>
  )
}
export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  )
}
export function CardHeader({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}
