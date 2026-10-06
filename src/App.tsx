import { useState } from 'react'
import { ROLES, type Role } from './data'
import { Btn, Card, Passport, Jobs, Mentors, Events, Hackathons, Alumni, Journey, Admin } from './views'

const NAV: [string, string, Role[] | null][] = [
  ['passport', '🪪 Career Passport', ['Candidate', 'Alumni']], ['jobs', '💼 Jobs', null], ['mentors', '🤝 Mentorship', null],
  ['events', '🎓 Events & Learning', null], ['hack', '🏆 Hackathons', null], ['alumni', '🌟 Alumni', null],
  ['journey', '🧭 Career Journey', ['Candidate', 'Mentor', 'Organizer', 'Admin']], ['admin', '📊 Admin', ['Admin']]]
const PAGES: Record<string, (p: { name: string }) => JSX.Element> = {
  passport: Passport, jobs: Jobs, mentors: Mentors, events: Events, hack: Hackathons, alumni: Alumni, journey: Journey, admin: Admin }

function Landing({ go }: { go: (m: 'login' | 'register') => void }) {
  return <div className="min-h-screen bg-white">
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><span className="font-display text-xl font-extrabold text-indigo-700">Udyoga Pramoda</span>
      <div className="flex gap-2"><Btn ghost onClick={() => go('login')}>Log in</Btn><Btn onClick={() => go('register')}>Get started</Btn></div></header>
    <section className="bg-gradient-to-b from-indigo-50 to-white"><div className="fade mx-auto max-w-4xl px-6 py-24 text-center">
      <span className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-indigo-700 shadow-sm">Careers · Mentors · Community</span>
      <h1 className="font-display mt-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">Your career journey, <span className="text-indigo-700">guided end to end.</span></h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">One platform to build your Career Passport, find matched jobs, learn from mentors and join hackathons, all the way to giving back as alumni.</p>
      <div className="mt-8 flex justify-center gap-3"><Btn onClick={() => go('register')}>Create your passport</Btn><Btn ghost onClick={() => go('login')}>Explore the platform</Btn></div></div></section>
    <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 md:grid-cols-3">
      {[['Career Passport', 'Profile, resume, skills and journey in one place.'], ['Matched Jobs', 'Skill-based matching with one-click applications.'], ['Mentors & Events', 'Workshops, webinars, Vichara Vahini and hackathons.']].map(([t, d]) => <Card key={t}><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-slate-500">{d}</p></Card>)}</section></div>
}

function Auth({ mode, done, swap }: { mode: 'login' | 'register'; done: (n: string, r: Role) => void; swap: () => void }) {
  const [name, setName] = useState(''), [role, setRole] = useState<Role>('Candidate')
  return <div className="grid min-h-screen place-items-center bg-slate-50 p-4"><Card className="w-full max-w-md">
    <h1 className="font-display text-2xl font-extrabold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
    <div className="mt-5 space-y-3">
      {mode === 'register' && <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />}
      <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Email" type="email" />
      <input className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Password" type="password" />
      <div className="grid grid-cols-3 gap-2">{ROLES.map(r => <button key={r} onClick={() => setRole(r)} className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${role === r ? 'border-indigo-700 bg-indigo-50 text-indigo-700' : 'border-slate-300'}`}>{r}</button>)}</div>
      <button onClick={() => done(name || 'Asha Nayak', role)} className="w-full rounded-lg bg-indigo-700 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800">{mode === 'login' ? 'Log in' : 'Register'}</button>
      <p className="text-center text-sm text-slate-500">{mode === 'login' ? 'New here? ' : 'Have an account? '}<button className="font-semibold text-indigo-700" onClick={swap}>{mode === 'login' ? 'Register' : 'Log in'}</button></p></div></Card></div>
}

export default function App() {
  const [mode, setMode] = useState<'landing' | 'login' | 'register'>('landing'), [user, setUser] = useState<{ name: string; role: Role } | null>(null), [page, setPage] = useState('jobs'), [open, setOpen] = useState(false)
  if (!user) return mode === 'landing' ? <Landing go={setMode} /> : <Auth mode={mode} swap={() => setMode(mode === 'login' ? 'register' : 'login')}
    done={(name, role) => { setUser({ name, role }); setPage(role === 'Admin' ? 'admin' : role === 'Candidate' ? 'passport' : 'jobs') }} />
  const items = NAV.filter(([, , r]) => !r || r.includes(user.role)), Page = PAGES[items.some(i => i[0] === page) ? page : items[0][0]]
  return <div className="flex min-h-screen">
    <aside className={`fixed inset-y-0 z-20 w-64 border-r border-slate-200 bg-white p-4 transition md:static md:translate-x-0 ${open ? '' : '-translate-x-full'}`}>
      <p className="font-display mb-6 px-2 text-xl font-extrabold text-indigo-700">Udyoga Pramoda</p>
      <nav className="space-y-1">{items.map(([k, l]) => <button key={k} onClick={() => { setPage(k); setOpen(false) }} className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${page === k ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}>{l}</button>)}</nav></aside>
    <div className="flex-1"><header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button><span className="ml-auto mr-4 text-sm text-slate-500">{user.name} · <b>{user.role}</b></span><Btn ghost onClick={() => { setUser(null); setMode('landing') }}>Log out</Btn></header>
      <main className="mx-auto max-w-6xl p-6"><Page name={user.name} /></main></div></div>
}
