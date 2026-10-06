import { useState, type ReactNode } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { jobs, mentors, events, stories, board, growth, STAGES, MY_SKILLS } from './data'

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) =>
  <div className={`fade rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md ${className}`}>{children}</div>
export const Btn = ({ children, onClick, ghost, active }: { children: ReactNode; onClick?: () => void; ghost?: boolean; active?: boolean }) =>
  <button onClick={onClick} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${ghost ? 'border border-slate-300 hover:bg-slate-100' : active ? 'bg-emerald-600 text-white' : 'bg-indigo-700 text-white hover:bg-indigo-800'}`}>{children}</button>
const Tag = ({ children }: { children: ReactNode }) => <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{children}</span>
const Head = ({ t, s }: { t: string; s: string }) => <div className="mb-6"><h1 className="font-display text-2xl font-extrabold">{t}</h1><p className="text-slate-500">{s}</p></div>
const inp = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'

export function Passport({ name }: { name: string }) {
  const rows: [string, string[]][] = [['Education', ['B.E. Computer Science — KLE Tech, 2025']], ['Experience', ['Web Intern — Spark Works (6 mo)']], ['Career journey', ['Registered → Mentoring → Upskilling (current)']]]
  return <><Head t="Career Passport" s="Your profile, skills and journey in one place." />
    <div className="grid gap-4 lg:grid-cols-3">
      <Card><div className="grid h-16 w-16 place-items-center rounded-full bg-indigo-700 text-2xl font-bold text-white">{name[0]}</div>
        <h2 className="mt-3 text-lg font-bold">{name}</h2><p className="text-sm text-slate-500">Aspiring Frontend Engineer</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{MY_SKILLS.map(s => <Tag key={s}>{s}</Tag>)}</div>
        <div className="mt-4 flex gap-2"><Btn>Upload resume</Btn><Btn ghost>Edit</Btn></div></Card>
      <div className="space-y-4 lg:col-span-2">{rows.map(([h, l]) => <Card key={h}><h3 className="font-semibold">{h}</h3>{l.map(x => <p key={x} className="mt-1 text-sm text-slate-600">{x}</p>)}</Card>)}
        <Card><h3 className="font-semibold">Profile strength</h3><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 w-3/4 rounded-full bg-indigo-600" /></div><p className="mt-1 text-xs text-slate-500">75% complete</p></Card></div></div></>
}

export function Jobs() {
  const [q, setQ] = useState(''), [type, setType] = useState('All'), [sel, setSel] = useState(jobs[0].id), [applied, setApplied] = useState<number[]>([])
  const match = (s: string[]) => Math.round(100 * s.filter(x => MY_SKILLS.includes(x)).length / s.length)
  const list = jobs.filter(j => (type === 'All' || j.type === type) && (j.title + j.company + j.loc).toLowerCase().includes(q.toLowerCase()))
  const j = jobs.find(x => x.id === sel)!
  return <><Head t="Jobs" s="Search, filter and apply to roles matched to your skills." />
    <div className="mb-4 flex flex-wrap gap-2"><input className={inp + ' max-w-xs'} placeholder="Search title, company, city" value={q} onChange={e => setQ(e.target.value)} />
      <select className={inp + ' max-w-40'} value={type} onChange={e => setType(e.target.value)}>{['All', 'Full-time', 'Internship', 'Contract'].map(t => <option key={t}>{t}</option>)}</select></div>
    <div className="grid gap-4 lg:grid-cols-5"><div className="space-y-3 lg:col-span-2">{list.map(x => <button key={x.id} onClick={() => setSel(x.id)} className={`block w-full rounded-xl border bg-white p-4 text-left transition hover:border-indigo-400 ${sel === x.id ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200'}`}>
      <div className="flex justify-between"><b>{x.title}</b><span className="text-xs font-semibold text-emerald-600">{match(x.skills)}% match</span></div><p className="text-sm text-slate-500">{x.company} · {x.loc}</p></button>)}</div>
      <Card className="lg:col-span-3"><h2 className="text-xl font-bold">{j.title}</h2><p className="text-slate-500">{j.company} · {j.loc} · {j.type} · {j.level}</p><p className="mt-2 font-semibold">{j.pay}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{j.skills.map(s => <Tag key={s}>{s}</Tag>)}</div>
        <div className="mt-5"><Btn active={applied.includes(j.id)} onClick={() => setApplied(a => a.includes(j.id) ? a : [...a, j.id])}>{applied.includes(j.id) ? 'Applied ✓' : 'Apply now'}</Btn></div></Card></div></>
}

export function Mentors() {
  const [req, setReq] = useState<string[]>([])
  return <><Head t="Mentorship" s="Find a mentor and request a session." /><div className="grid gap-4 md:grid-cols-3">
    {mentors.map(m => <Card key={m.name}><h3 className="font-bold">{m.name}</h3><p className="text-sm text-slate-500">{m.role}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{m.exp.map(e => <Tag key={e}>{e}</Tag>)}</div>
      <p className="mt-3 text-sm">🗓 {m.slots}</p><p className="text-sm">⭐ {m.rating}</p>
      <div className="mt-4"><Btn active={req.includes(m.name)} onClick={() => setReq(r => [...r, m.name])}>{req.includes(m.name) ? 'Requested ✓' : 'Request mentoring'}</Btn></div></Card>)}</div></>
}

export function Events() {
  const [reg, setReg] = useState<number[]>([])
  return <><Head t="Events & Learning" s="Workshops, webinars, upskilling and Vichara Vahini." /><div className="grid gap-4 md:grid-cols-2">
    {events.map(e => <Card key={e.id}><Tag>{e.kind}</Tag><h3 className="mt-2 font-bold">{e.title}</h3><p className="text-sm text-slate-500">{e.date} · {e.seats} seats</p>
      <div className="mt-4"><Btn active={reg.includes(e.id)} onClick={() => setReg(r => r.includes(e.id) ? r.filter(x => x !== e.id) : [...r, e.id])}>{reg.includes(e.id) ? 'Registered ✓' : 'Register'}</Btn></div></Card>)}</div></>
}

export function Hackathons() {
  const [team, setTeam] = useState(''), [teams, setTeams] = useState(['Byte Bandits']), [link, setLink] = useState(''), [sub, setSub] = useState(false)
  return <><Head t="Hackathons" s="Register, form teams, meet mentors and submit." />
    <div className="grid gap-4 md:grid-cols-2">
      <Card><Tag>Udyoga Hack 2026</Tag><h3 className="mt-2 font-bold">Build for local employment</h3><p className="text-sm text-slate-500">48 hours · Mentors: Anita Rao, Vikram Patil</p>
        <div className="mt-4 flex gap-2"><input className={inp} placeholder="New team name" value={team} onChange={e => setTeam(e.target.value)} />
          <Btn onClick={() => { if (team) { setTeams([...teams, team]); setTeam('') } }}>Create</Btn></div>
        <ul className="mt-3 space-y-1 text-sm">{teams.map(t => <li key={t} className="rounded bg-slate-50 px-3 py-1.5">👥 {t}</li>)}</ul></Card>
      <Card><h3 className="font-bold">Submit project</h3><input className={inp + ' mt-3'} placeholder="Repo or demo link" value={link} onChange={e => setLink(e.target.value)} />
        <div className="mt-3"><Btn active={sub} onClick={() => link && setSub(true)}>{sub ? 'Submitted ✓' : 'Submit'}</Btn></div></Card></div></>
}

export function Alumni() {
  return <><Head t="Alumni" s="Success stories, mentoring and contributions." /><div className="grid gap-4 md:grid-cols-2">
    {stories.map(s => <Card key={s.name}><p className="text-slate-700">“{s.text}”</p><p className="mt-3 text-sm font-semibold">{s.name} <span className="font-normal text-slate-500">· {s.co}</span></p></Card>)}
    <Card><h3 className="font-bold">Give back</h3><p className="mt-1 text-sm text-slate-500">Mentor candidates, host a workshop or post referrals.</p><div className="mt-3 flex gap-2"><Btn>Become a mentor</Btn><Btn ghost>Refer a job</Btn></div></Card></div></>
}

export function Journey() {
  const [cards, setCards] = useState(board), [drag, setDrag] = useState<number | null>(null)
  return <><Head t="Career Journey" s="Drag candidates across stages." /><div className="flex gap-3 overflow-x-auto pb-3">
    {STAGES.map(s => <div key={s} onDragOver={e => e.preventDefault()} onDrop={() => drag && setCards(c => c.map(x => x.id === drag ? { ...x, stage: s } : x))} className="min-w-56 flex-1 rounded-xl bg-slate-100 p-3">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">{s} · {cards.filter(c => c.stage === s).length}</h3>
      {cards.filter(c => c.stage === s).map(c => <div key={c.id} draggable onDragStart={() => setDrag(c.id)} className="mb-2 cursor-grab rounded-lg bg-white p-3 text-sm font-medium shadow-sm">{c.name}</div>)}</div>)}</div></>
}

export function Admin() {
  const pie = STAGES.map(s => ({ name: s, v: board.filter(b => b.stage === s).length || 1 })), cols = ['#4338ca', '#6366f1', '#818cf8', '#f59e0b', '#10b981', '#64748b']
  return <><Head t="Admin Dashboard" s="Platform overview and analytics." />
    <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-6">{[['Users', '1,284'], ['Jobs', '86'], ['Events', '14'], ['Applications', '932'], ['Mentors', '58'], ['Placed', '147']].map(([k, v]) => <Card key={k}><p className="text-xs text-slate-500">{k}</p><p className="text-2xl font-extrabold">{v}</p></Card>)}</div>
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2"><h3 className="mb-2 font-semibold">Users vs placements</h3><div className="h-64"><ResponsiveContainer><LineChart data={growth}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="m" /><YAxis /><Tooltip /><Line dataKey="users" stroke="#4338ca" strokeWidth={2} /><Line dataKey="placed" stroke="#10b981" strokeWidth={2} /></LineChart></ResponsiveContainer></div></Card>
      <Card><h3 className="mb-2 font-semibold">Journey stages</h3><div className="h-64"><ResponsiveContainer><PieChart><Pie data={pie} dataKey="v" nameKey="name" innerRadius={45}>{pie.map((_, i) => <Cell key={i} fill={cols[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></Card>
      <Card className="lg:col-span-3"><h3 className="mb-2 font-semibold">Applications per job</h3><div className="h-56"><ResponsiveContainer><BarChart data={jobs.map(j => ({ n: j.title, a: 40 + j.id * 37 }))}><XAxis dataKey="n" /><YAxis /><Tooltip /><Bar dataKey="a" fill="#6366f1" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></Card></div></>
}
