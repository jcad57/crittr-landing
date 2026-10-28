import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Bell, CalendarDays, Check, ChevronDown,
  ChevronLeft, ChevronRight, Dog, Ellipsis, Heart, HeartPulse, Home,
  LayoutGrid, Mars, MessageCircle, PawPrint, Pencil, Plus, Send,
  Settings2, ShieldCheck, Signal, Smartphone, Sparkles, Syringe, Users,
  Wifi, X, BatteryFull,
} from 'lucide-react';
import petsPhoto from '../../src/assets/images/hero-pets-rounded.webp';
import walkIcon from '../../src/assets/icons/walk-dog-icon.png';
import foodIcon from '../../src/assets/icons/food-icon.png';
import medIcon from '../../src/assets/icons/medicine-icon.png';
import boneIcon from './assets/dog-bone-icon.png';
import trainingIcon from './assets/dumbbell-icon.png';
import scaleIcon from './assets/weight-scale-icon.png';
import recordsIcon from './assets/medical-records-icon.png';
import chipIcon from './assets/microchip-icon.png';
import './mockups.css';

const screens = [
  { id: 'home', label: 'Home', note: 'A warmer welcome. Familiar progress rings live on a soft sage card, with clear daily activity and health sections.' },
  { id: 'schedule', label: 'Schedule', note: 'Color follows the activity type. A peach date picker, generous task cards, and the app’s sliding completion control.' },
  { id: 'pets', label: 'My pets', note: 'Individual personalities, shared visual language. Pastel pet cards replace the alternating orange and dark treatment.' },
  { id: 'profile', label: 'Pet profile', note: 'All the same useful details, with a peach identity card, colorful stats, and a lavender invitation to share care.' },
  { id: 'health', label: 'Health', note: 'A calm place for important information. Pastels group records; clear labels and status chips carry the meaning.' },
  { id: 'ai', label: 'CrittrAI', note: 'The same pet assistant, with a friendlier welcome, lavender conversation surfaces, and a prominent orange send action.' },
];
const navItems = [ ['home', 'Home', Home], ['schedule', 'Schedule', CalendarDays], ['pets', 'Pets', PawPrint], ['health', 'Health', HeartPulse], ['ai', 'CrittrAI', Dog] ];

function IconTile({ src, tone = 'sage', small = false }) {
  return <span className={`icon-tile ${tone} ${small ? 'small' : ''}`} aria-hidden="true"><span style={{ maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }} /></span>;
}

function Avatar({ cat = false, size = '', name }) {
  return <span className={`pet-avatar ${cat ? 'cat-avatar' : 'dog-avatar'} ${size}`} role="img" aria-label={name || (cat ? 'Luna, a tabby cat' : 'Milo, a golden retriever')} style={{ backgroundImage: `url(${petsPhoto})` }} />;
}

function Doodle({ type = 'rays', className = '' }) {
  return type === 'heart'
    ? <Heart className={`doodle heart-doodle ${className}`} strokeWidth={2} aria-hidden="true" />
    : <svg className={`doodle ${className}`} viewBox="0 0 34 36" fill="none" aria-hidden="true"><path d="m7 13-4-7M16 8l2-6M23 17l8-4" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" /></svg>;
}

function OrangeButton({ children, onClick, className = '' }) {
  return <button className={`orange-button ${className}`} onClick={onClick}>{children}</button>;
}

function SectionHeading({ children, action, onClick }) {
  return <div className="section-heading"><h3>{children}</h3>{action && <button onClick={onClick}>{action}<ChevronRight size={14} /></button>}</div>;
}

function PetSwitcher({ value, onChange }) {
  return <div className="pet-switcher" aria-label="Choose pet">{['Milo', 'Luna'].map((name, index) => <button aria-pressed={value === name} onClick={() => onChange(name)} key={name}><Avatar cat={index === 1} /><span>{name}</span>{value === name && <Check size={14} />}</button>)}</div>;
}

function Task({ name, detail, time, icon = foodIcon, tone = 'lavender', initial = false, onToggle }) {
  const [done, setDone] = useState(initial);
  return <div className={`task-card ${done ? 'complete' : ''}`}>
    <IconTile src={icon} tone={tone} />
    <div className="task-copy"><strong>{name}</strong>{detail && <span>{detail}</span>}<span>{time}</span></div>
    <div className="task-actions">{done && <span className="completion-time">{time.split(' ·')[0]}</span>}<span className="task-dots" aria-hidden="true"><Ellipsis size={21} /></span><button className="task-check" aria-label={`${done ? 'Uncheck' : 'Complete'} ${name}`} aria-pressed={done} onClick={() => {setDone(!done);onToggle?.(!done);}}><Check size={22} strokeWidth={2.8} /></button></div>
  </div>;
}

function HomeScreen({ go, log }) {
  const [pet, setPet] = useState('Milo');
  return <>
    <header className="app-page-header"><div><p className="eyebrow">WEDNESDAY, OCTOBER 28</p><h2>Good morning!<span className="sun-mark">✳</span></h2></div><button className="round-button" aria-label="Show notifications" onClick={() => go('health')}><Bell size={21} /><i /></button></header>
    <PetSwitcher value={pet} onChange={setPet} />
    <section className="progress-panel sage"><div className="panel-heading"><h3>Daily progress</h3><span className="mini-label">{pet}’s good day</span></div><div className="progress-rings">{[
      ['Exercise', pet === 'Luna' ? '10/30' : '20/30', .67, walkIcon, 'teal'], ['Meals', '1/2', .5, foodIcon, 'purple'], ['Treats', '1/2', .5, boneIcon, 'green'], ['Meds', '0/1', 0, medIcon, 'gold'],
    ].map(([label, value, progress, icon, tone]) => <div key={label} className={`progress-item ${tone}`}><span className="progress-ring" style={{ '--progress': `${progress * 100}%` }}><IconTile src={icon} tone="clear" small /></span><strong>{label}</strong><span>{value}{label === 'Exercise' ? ' min' : ''}</span></div>)}</div></section>
    <SectionHeading action="See all" onClick={() => go('schedule')}>Today’s activity</SectionHeading>
    <div className="activity-list"><div className="activity-row"><IconTile src={foodIcon} tone="lavender" /><div><strong>Breakfast</strong><span>1 cup · Logged by you</span></div><time>8:30 AM</time></div><div className="activity-row"><IconTile src={walkIcon} tone="sky" /><div><strong>Morning walk</strong><span>20 minutes · Logged by Ashley</span></div><time>8:00 AM</time></div></div>
    <OrangeButton onClick={log}><Plus size={18} />Log an activity</OrangeButton>
    <SectionHeading action="View all" onClick={() => go('health')}>Health & wellbeing</SectionHeading>
    <button className="visit-card peach" onClick={() => go('health')}><span className="visit-date"><strong>04</strong><span>NOV</span></span><div><span className="mini-label">UPCOMING VET VISIT</span><strong>Annual checkup</strong><span>Oakwood Vet · 10:00 AM</span></div><ChevronRight size={18} /></button>
    <div className="small-note"><Heart size={14} /> A little care. A lot of love.</div>
  </>;
}

function ScheduleScreen() {
  const [day, setDay] = useState(28);
  const [pet, setPet] = useState('Milo');
  const [morningDone, setMorningDone] = useState([true, true]);
  return <>
    <header className="app-page-header"><div><p className="eyebrow">ONE LITTLE THING AT A TIME</p><h2>Today’s care<Doodle /></h2></div><Avatar /></header>
    <div className="calendar-panel peach"><div className="month-row"><strong>October 2026</strong><div><ChevronLeft size={17} /><ChevronRight size={17} /></div></div><div className="week-strip">{[26,27,28,29,30,31,1].map((date,i) => <button key={date} aria-pressed={day === date} onClick={() => setDay(date)}><span>{['M','T','W','T','F','S','S'][i]}</span><strong>{date}</strong><i /></button>)}</div></div>
    <PetSwitcher value={pet} onChange={setPet} />
    <div className="schedule-heading"><h3>{day === 28 ? 'Morning' : `October ${day} · Morning`}</h3><span>{morningDone.filter(Boolean).length} of 2 done <Check size={13} /></span></div>
    <Task name="Morning walk" detail={pet === 'Milo' ? 'Neighborhood loop' : 'Playtime at home'} time="8:00 AM" icon={walkIcon} tone="sky" initial onToggle={done=>setMorningDone(previous=>[done,previous[1]])} />
    <Task name="Breakfast" detail="Purina Pro · 1 cup" time="8:30 AM" initial onToggle={done=>setMorningDone(previous=>[previous[0],done])} />
    <div className="schedule-heading evening"><h3>Evening</h3><span>Still to come</span></div>
    <Task name="Dinner" detail="Purina Pro · 1 cup" time="6:30 PM" />
    <Task name="Evening walk" detail="30 minute goal" time="7:00 PM" icon={walkIcon} tone="sky" />
    <Task name="Evening meds" detail="1 tablet · With food" time="7:30 PM" icon={medIcon} tone="butter" />
  </>;
}

function PetsScreen({ go }) {
  const [notice, setNotice] = useState(false);
  return <>
    <header className="app-page-header"><div><p className="eyebrow">YOUR WHOLE LITTLE WORLD</p><h2>My pets<Doodle type="heart" /></h2><p>2 companions. So much love.</p></div><button className="round-button orange-round" aria-label="Add a pet" onClick={() => setNotice(!notice)}><Plus size={25} /></button></header>
    {notice && <div className="local-notice" role="status">The Add a pet flow would open here.</div>}
    <button className="pet-feature-card peach" onClick={() => go('profile', 'Milo')}><div className="pet-feature-top"><span className="type-tag"><Dog size={13} /> DOG</span><ChevronRight size={20} /></div><div className="pet-feature-identity"><div><h3>Milo</h3><p>Golden Retriever · 3 yr</p><span className="role-tag"><Heart size={12} /> Your companion</span></div><Avatar size="large" /></div><div className="pet-feature-bottom"><span><ShieldCheck size={15} /> Microchipped</span><span><Users size={15} /> 2 carers</span></div><Doodle className="pet-card-doodle" /></button>
    <button className="pet-feature-card lavender" onClick={() => go('profile', 'Luna')}><div className="pet-feature-top"><span className="type-tag"><PawPrint size={13} /> CAT</span><ChevronRight size={20} /></div><div className="pet-feature-identity"><div><h3>Luna</h3><p>Tabby · 2 yr</p><span className="role-tag"><Users size={12} /> Co-carer</span></div><Avatar cat size="large" /></div><div className="pet-feature-bottom"><span><ShieldCheck size={15} /> Microchipped</span><span><Users size={15} /> 3 carers</span></div><Doodle type="heart" className="pet-card-doodle" /></button>
    <div className="together-note sage"><Users size={22} /><div><h3>Care is better together.</h3><p>One shared picture of their everyday care.</p></div></div>
    <p className="handwritten pets-footer">Every pet. Every little thing.<Heart size={20} /></p>
  </>;
}

function ProfileScreen({ go, petName = 'Milo' }) {
  const [tab, setTab] = useState('Overview');
  const [invited, setInvited] = useState(false);
  const cat = petName === 'Luna';
  return <>
    <header className="stack-header"><button aria-label="Back to pets" onClick={() => go('pets')}><ArrowLeft size={21} /></button><h2>{petName}</h2><button aria-label="Profile settings" onClick={() => setTab('Records')}><Settings2 size={20} /></button></header>
    <div className={`profile-hero ${cat ? 'lavender' : 'peach'}`}><div className="profile-identity"><Avatar cat={cat} size="large" /><div><h2>{petName}<Doodle type="heart" /></h2><p>{cat ? 'Tabby · 2 yr' : 'Golden Retriever · 3 yr'}</p><span>{cat ? 'Your little ray of sunshine.' : 'Your very good boy.'}</span></div><Pencil size={17} /></div><div className="profile-tags"><span>Neutered</span><span>Microchipped</span><span>No insurance</span></div></div>
    <div className="profile-stats">{[[scaleIcon,cat ? '10 lb' : '65 lb','Weight','sage'],[null,'Oct 12','Birthday','lavender'],[null,'Male','Gender','peach']].map(([icon,value,label,tone])=><div key={label} className={tone}>{icon ? <IconTile src={icon} tone="clear" small /> : label === 'Birthday' ? <CalendarDays size={21} /> : <Mars size={21} />}<strong>{value}</strong><span>{label}</span></div>)}</div>
    <div className="profile-tabs" role="tablist" aria-label="Pet profile sections">{['Overview','Care','Records'].map(t=><button key={t} role="tab" aria-selected={tab === t} onClick={()=>setTab(t)}>{t}</button>)}</div>
    {tab === 'Overview' ? <><SectionHeading>Details</SectionHeading><dl className="details-card"><div><dt>Breed</dt><dd>{cat ? 'Tabby' : 'Golden Retriever'}</dd></div><div><dt>Color</dt><dd>{cat ? 'Brown tabby' : 'Golden'}</dd></div><div><dt>Vet clinic</dt><dd>Oakwood Veterinary Care</dd></div><div><dt>Energy level</dt><dd>Medium</dd></div></dl></> : tab === 'Care' ? <><SectionHeading>Daily care</SectionHeading><Task name={cat ? 'Evening play' : 'Evening walk'} detail="Every day · 30 minutes" time="7:00 PM" icon={walkIcon} tone="sky" /><Task name="Dinner" detail="Purina Pro · 1 cup" time="6:30 PM" /></> : <><SectionHeading>Records</SectionHeading><div className="record-links"><div><IconTile src={recordsIcon} tone="peach" /><span>Medical records</span><ChevronRight size={17}/></div><div><IconTile src={chipIcon} tone="sky" /><span>Microchip details</span><ChevronRight size={17}/></div></div></>}
    <div className="share-care lavender"><div><Users size={21} /><h3>A little help goes a long way.</h3></div><p>Share {petName}’s care with the people who love him.</p><button onClick={() => setInvited(!invited)}>{invited ? 'Invite link ready to share' : 'Invite a co-carer'}<ArrowRight size={16} /></button></div>
  </>;
}

function HealthScreen() {
  const [done, setDone] = useState(false);
  return <>
    <header className="app-page-header"><div><p className="eyebrow">MORE PEACE OF MIND</p><h2>Health<Doodle /></h2><p>Milo · Updated today</p></div><Avatar /></header>
    <div className={`health-banner ${done ? 'sage' : 'peach'}`}><span className="banner-icon">{done ? <Check size={23} /> : <HeartPulse size={23}/>}</span><div><h3>{done ? 'All caught up!' : '1 action needed'}</h3><p>{done ? 'Milo’s dose has been logged.' : 'Milo’s medication is due today.'}</p></div><button aria-label={done ? 'Undo medication dose' : 'Log medication dose'} onClick={() => setDone(!done)}><Check size={19}/></button></div>
    <SectionHeading action="Manage">Medications</SectionHeading>
    <div className="health-record"><IconTile src={medIcon} tone="butter" /><div><strong>Daily supplement</strong><span>1 tablet · With dinner</span><span className={`status-chip ${done ? 'green-chip' : 'amber-chip'}`}>{done ? '1/1 doses logged' : '0/1 doses logged'}</span></div><ChevronRight size={17}/></div>
    <SectionHeading action="Manage">Vaccinations</SectionHeading>
    <div className="health-record"><span className="vector-tile lavender"><Syringe size={23}/></span><div><strong>Rabies</strong><span>Next due Oct 12, 2027</span><span className="status-chip green-chip"><Check size={11}/>Up to date</span></div><ChevronRight size={17}/></div>
    <SectionHeading action="Add visit">Vet visits</SectionHeading>
    <div className="health-record"><span className="vector-tile sage"><CalendarDays size={23}/></span><div><strong>Annual checkup</strong><span>Nov 4 · 10:00 AM</span><span>Oakwood Veterinary Care</span></div><ChevronRight size={17}/></div>
    <SectionHeading>All their important things</SectionHeading>
    <div className="records-grid"><button className="lavender"><IconTile src={recordsIcon} tone="clear"/><strong>Medical records</strong><span>Notes & documents <ArrowRight size={13}/></span></button><button className="sky"><IconTile src={chipIcon} tone="clear"/><strong>Microchip</strong><span>Registry & ID <ArrowRight size={13}/></span></button></div>
    <div className="small-note"><ShieldCheck size={15}/> In one place. Ready when you need it.</div>
  </>;
}

function AiScreen() {
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState('');
  return <>
    <header className="app-page-header"><div><p className="eyebrow">A LITTLE EXTRA HELP</p><h2>CrittrAI<Sparkles className="title-sparkles" size={23}/></h2></div><button className="round-button" aria-label="Start a new conversation" onClick={()=>{setSent('');setQuestion('');}}><Plus size={23}/></button></header>
    <div className="ai-welcome lavender"><div className="ai-symbol"><Dog size={34}/><Sparkles size={17}/></div><h3>Big questions.<br/>Little questions.<br/><span>Ask away.</span></h3><Doodle type="heart" className="ai-heart"/><p>A helping paw for everyday pet care.</p></div>
    <div className="assistant-label"><span><Dog size={15}/></span><strong>CrittrAI</strong></div>
    <div className="assistant-bubble">Hi! I’m CrittrAI — ask me anything about your pet!<br/><br/>Try asking “How much should my dog eat?”</div>
    <div className="ai-context"><Avatar/><span>Thinking about <strong>Milo</strong></span><ChevronDown size={14}/></div>
    {sent ? <><div className="user-bubble">{sent}</div><div className="local-notice" role="status">Design preview · Your question hasn’t been sent.</div></> : <div className="suggested-questions">{['How much should my dog eat?','Ideas for a rainy-day walk?'].map(q=><button key={q} onClick={()=>setQuestion(q)}>{q}<ArrowUpRightIcon/></button>)}</div>}
    <form className="ai-composer" onSubmit={e=>{e.preventDefault();if(question.trim()){setSent(question);setQuestion('');}}}><input aria-label="Ask CrittrAI" placeholder="Ask about your pets…" value={question} onChange={e=>setQuestion(e.target.value)}/><button aria-label="Preview sending question" type="submit"><Send size={19}/></button></form>
    <p className="ai-footnote">A helping hand, never a substitute for your vet.</p>
  </>;
}

function ArrowUpRightIcon() { return <ArrowRight size={15} style={{ transform: 'rotate(-35deg)' }} />; }

function LogSheet({ close }) {
  const [selected, setSelected] = useState('Exercise');
  return <div className="sheet-backdrop"><section className="log-sheet" role="dialog" aria-modal="true" aria-label="Log an activity"><div className="sheet-grabber"/><header><h2>Log an activity</h2><button onClick={close} aria-label="Close activity preview"><X size={22}/></button></header><p>What has Milo been up to?</p><div className="log-options">{[['Exercise',walkIcon,'sky'],['Food',foodIcon,'lavender'],['Medication',medIcon,'butter'],['Training',trainingIcon,'peach'],['Potty',boneIcon,'sage'],['Weigh-in',scaleIcon,'sky']].map(([label,icon,tone])=><button className={selected===label?'selected':''} aria-pressed={selected===label} onClick={()=>setSelected(label)} key={label}><IconTile src={icon} tone={tone}/><strong>{label}</strong>{selected===label&&<Check size={15}/>}</button>)}</div><OrangeButton onClick={close}>Continue with {selected.toLowerCase()}<ArrowRight size={17}/></OrangeButton><p className="sheet-preview-note">Design preview · No activity is saved</p></section></div>;
}

function Phone({ initial, isolated = false }) {
  const [screen, setScreen] = useState(initial);
  const [logging, setLogging] = useState(false);
  const [petName, setPetName] = useState('Milo');
  const content = { home: HomeScreen, schedule: ScheduleScreen, pets: PetsScreen, profile: ProfileScreen, health: HealthScreen, ai: AiScreen };
  const Content = content[screen];
  return <div className={`phone ${isolated ? 'isolated-phone' : ''}`} data-screen={initial}>
    <div className="phone-screen"><div className="status-bar" aria-hidden="true"><strong>9:41</strong><span className="dynamic-island"/><span><Signal size={15}/><Wifi size={15}/><BatteryFull size={19}/></span></div>
    <div className={`screen-scroll screen-${screen}`} key={screen}><Content petName={petName} go={(next, pet) => { if (pet) setPetName(pet); setScreen(next); }} log={()=>setLogging(true)}/></div>
    <nav className="bottom-nav" aria-label={`${screens.find(s=>s.id===initial)?.label} preview navigation`}>{navItems.map(([id,label,Icon])=><button key={id} aria-current={(screen===id||(id==='pets'&&screen==='profile'))?'page':undefined} onClick={()=>setScreen(id)}><span><Icon size={21} strokeWidth={1.9}/></span>{label}</button>)}</nav><div className="home-indicator" aria-hidden="true"/>
    {logging&&<LogSheet close={()=>setLogging(false)}/>}
    </div>
  </div>;
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const exportScreen = screens.find(s=>s.id===params.get('screen'));
  const [view, setView] = useState(params.get('view')==='focus'?'focus':'board');
  const [selected, setSelected] = useState('home');
  if (exportScreen) return <main className="screen-export"><Phone initial={exportScreen.id} isolated /></main>;
  return <main className="design-gallery">
    <header className="gallery-header"><a href="./index.html" className="wordmark">Crittr<PawPrint size={29} fill="currentColor"/></a><span className="concept-label">MOBILE APP · DESIGN EXPLORATION</span><a className="gallery-home" href="/">Website<ArrowRight size={15}/></a></header>
    <section className="gallery-intro"><div><p className="eyebrow">THE SAME CRITTR. A LITTLE MORE COLOR.</p><h1>Good care.<br/><span>Brighter days.</span><Doodle/></h1><p>The website’s warmth, made for everyday pet care.</p></div><div className="design-system"><div className="font-samples"><span><b>Aa</b>Fredoka <small>Headings</small></span><span><b>Aa</b>Nunito <small>Body & interface</small></span></div><div className="palette-swatches" aria-label="Website color palette">{[['#FD8A2D','Orange'],['#E6ECD7','Sage'],['#ECE1F5','Lavender'],['#FFE5D5','Peach'],['#FAF7F1','Cream']].map(([color,label])=><span key={label}><i style={{background:color}}/>{label}</span>)}</div></div></section>
    <div className="gallery-toolbar"><span><strong>6 screens</strong> · One happy little family</span><div role="group" aria-label="Mockup display"><button aria-pressed={view==='board'} onClick={()=>setView('board')}><LayoutGrid size={16}/>All screens</button><button aria-pressed={view==='focus'} onClick={()=>setView('focus')}><Smartphone size={16}/>Explore a screen</button></div></div>
    {view==='board'?<section className="phone-grid" aria-label="All six app mockups">{screens.map((s,i)=><article className="screen-study" key={s.id}><div className="study-label"><span>0{i+1}</span><h2>{s.label}</h2><a href={`?screen=${s.id}`} aria-label={`Open ${s.label} at full size`}><ArrowUpRightIcon/></a></div><Phone initial={s.id}/><p className="study-note">{s.note}</p></article>)}</section>:<section className="focus-layout"><div className="focus-sidebar"><h2>Everyday care,<br/>with a little character.</h2><div role="tablist" aria-label="Choose a screen">{screens.map(s=><button key={s.id} role="tab" aria-selected={selected===s.id} onClick={()=>setSelected(s.id)}>{s.label}<ChevronRight size={16}/></button>)}</div><p>{screens.find(s=>s.id===selected).note}</p><span className="prototype-hint"><MessageCircle size={16}/> Try the navigation, task checkmarks, pet tabs, and Log an activity button.</span></div><Phone key={selected} initial={selected}/></section>}
    <footer className="gallery-footer"><span className="wordmark">Crittr<PawPrint size={21} fill="currentColor"/></span><p>Fredoka + Nunito · Website palette · Existing app icons</p><span>Interactive design mockups · Sample data</span></footer>
  </main>;
}

