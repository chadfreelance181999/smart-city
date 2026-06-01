import { redirect } from 'next/navigation'

export default function AdminIndexPage() {
    return redirect('/admin/login')
}