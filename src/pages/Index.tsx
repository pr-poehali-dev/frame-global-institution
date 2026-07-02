import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import FrameLogo from '@/components/FrameLogo';

const HERO = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/c4f73199-f60c-466c-bf57-149d7c6c4aac.jpg';
const IMG_ARCH = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/e45b6195-1daa-49d5-b233-a368ef8c4000.jpg';
const IMG_DESERT = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/d089d01e-72fa-455e-a0c9-21513a69bb5b.jpg';
const IMG_ROOM = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/8cf633eb-d338-4602-8a30-b5eab0af44e1.jpg';
const IMG_RED = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/6db9ec48-59a9-4194-ae78-2af825ac2432.jpg';
const IMG_CROWD = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/27746126-5afe-4e23-bd8a-5ff361927f53.jpg';
const IMG_TUNNEL = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/5671614e-da5e-46aa-9ec8-396fbb5f4c48.jpg';

const NAV = ['Magazine', 'Gallery', 'Open Calls', 'Grants', 'Community', 'About'];
const FULL_NAV = ['Magazine', 'Gallery', 'Artists', 'Open Calls', 'Grants', 'Community', 'Exhibitions', 'Residencies', 'Education', 'Shop', 'Membership', 'About'];

const artists = [
  { name: 'Alexander Kovach', country: 'Ukraine', img: IMG_ROOM },
  { name: 'Maria López', country: 'Spain', img: IMG_ARCH },
  { name: 'Hossein Fatemi', country: 'Iran', img: HERO },
  { name: 'Zainab Al Mansoori', country: 'UAE', img: IMG_RED },
  { name: 'Giorgio Barbieri', country: 'Italy', img: IMG_DESERT },
];

const calls = [
  { n: '01', title: 'Fine Art Photography Award 2027', deadline: '15 SEP 2027', label: 'PRIZE', value: '$10,000' },
  { n: '02', title: 'Emerging Voices Grant 2027', deadline: '30 OCT 2027', label: 'PRIZE', value: '$5,000' },
  { n: '03', title: 'FRAME Residency Program 2027', deadline: '20 NOV 2027', label: 'DURATION', value: '1–3 months' },
];

const stories = [
  { cat: 'Interview', title: 'A K Dolven on Memory, Place and Silence', date: 'MAY 28, 2027', img: IMG_ARCH },
  { cat: 'Essay', title: 'The Archive is a Living Thing', date: 'MAY 20, 2027', img: IMG_TUNNEL },
  { cat: 'Artist Spotlight', title: 'Jem Southam: The Quiet Witness', date: 'MAY 16, 2027', img: IMG_DESERT },
];

const opportunities = [
  { icon: 'Box', title: 'Current Grants', desc: 'Financial support for visual artists' },
  { icon: 'User', title: 'Artist Residencies', desc: 'International residency programs' },
  { icon: 'Users', title: 'Partner Opportunities', desc: 'Collaborate with our global network' },
  { icon: 'GraduationCap', title: 'Mentorship Programs', desc: 'Learn from leading professionals' },
];

const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [seen, setSeen] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.12 });
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return (
    <div ref={setRef} className={`${seen ? 'reveal' : 'opacity-0'} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function Index() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      {/* HEADER */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          <FrameLogo size={26} />
          <nav className="hidden lg:flex items-center gap-8 text-[12px] kern uppercase text-foreground/80">
            {NAV.map((n) => <a key={n} href="#" className="link-line whitespace-nowrap hover:text-foreground">{n}</a>)}
          </nav>
          <div className="flex items-center gap-5">
            <a href="#" className="hidden sm:block text-[12px] kern uppercase link-line">Sign In</a>
            <button className="hidden sm:block bg-foreground text-background text-[12px] kern uppercase px-5 py-2.5 hover:bg-accent transition-colors">Join FRAME</button>
            <button onClick={() => setMenu(true)} className="lg:hidden"><Icon name="Menu" size={22} /></button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MENU */}
      {menu && (
        <div className="fixed inset-0 z-[60] bg-foreground text-background animate-fade-in overflow-auto">
          <div className="flex items-center justify-between px-6 md:px-10 h-16">
            <FrameLogo size={26} dark />
            <button onClick={() => setMenu(false)}><Icon name="X" size={24} /></button>
          </div>
          <div className="px-6 md:px-10 mt-8 grid gap-1 pb-16">
            {FULL_NAV.map((n, i) => (
              <a key={n} href="#" onClick={() => setMenu(false)}
                className="font-display text-4xl font-light py-1.5 hover:text-accent transition-colors flex items-baseline gap-4">
                <span className="text-xs kern text-background/40">{String(i + 1).padStart(2, '0')}</span>{n}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* HERO — light split layout */}
      <section className="relative min-h-screen grid md:grid-cols-2 items-center pt-16">
        <div className="px-6 md:px-10 py-16 order-2 md:order-1 reveal">
          <FrameLogo size={64} className="mb-8" />
          <p className="font-display text-xl md:text-2xl font-light leading-tight text-graphite max-w-sm">
            Global Platform for<br />Contemporary Photography &amp; Visual Arts
          </p>
          <a href="#featured" className="mt-12 inline-flex items-center gap-3 text-[12px] kern uppercase link-line">
            Explore FRAME <Icon name="ArrowRight" size={15} />
          </a>
        </div>
        <div className="order-1 md:order-2 h-[52vh] md:h-screen relative overflow-hidden">
          <img src={HERO} alt="Featured artwork" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      {/* FEATURED ARTISTS — dark */}
      <section id="featured" className="bg-foreground text-background px-6 md:px-10 py-20 md:py-24">
        <div className="grid md:grid-cols-4 gap-8">
          <Reveal className="md:col-span-1">
            <h2 className="font-display text-3xl md:text-4xl font-light leading-tight">
              We discover and elevate visual artists worldwide.
            </h2>
            <p className="text-sm text-background/60 mt-6 leading-relaxed">
              Through exhibitions, grants, publications, commissions and community.
            </p>
            <a href="#" className="mt-8 inline-flex items-center gap-3 text-[12px] kern uppercase link-line">Learn More <Icon name="ArrowRight" size={14} /></a>
          </Reveal>
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] kern uppercase text-background/50">Featured Artists</span>
              <a href="#" className="text-[11px] kern uppercase text-accent inline-flex items-center gap-2 link-line">View All Artists <Icon name="ArrowRight" size={13} /></a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {artists.map((a, i) => (
                <Reveal key={a.name} delay={i * 90}>
                  <div className="group cursor-pointer">
                    <div className="aspect-[4/5] overflow-hidden bg-graphite/40">
                      <img src={a.img} alt={a.name} className="w-full h-full object-cover hover-grow" />
                    </div>
                    <h3 className="text-[11px] kern uppercase mt-3 font-medium">{a.name}</h3>
                    <p className="text-[10px] kern uppercase text-background/50 mt-1">{a.country}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPEN CALLS + MAGAZINE — light */}
      <section className="px-6 md:px-10 py-20 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Open Calls */}
        <Reveal>
          <div className="flex items-center justify-between mb-8">
            <span className="text-[11px] kern uppercase text-muted-foreground">Current Open Calls</span>
            <a href="#" className="text-[11px] kern uppercase inline-flex items-center gap-2 link-line">View All <Icon name="ArrowRight" size={13} /></a>
          </div>
          <div className="divide-y divide-border">
            {calls.map((c) => (
              <a key={c.n} href="#" className="group grid grid-cols-[auto,1fr,auto,auto] items-center gap-4 md:gap-6 py-6">
                <span className="text-accent text-xs kern">{c.n}</span>
                <h3 className="font-display text-lg md:text-xl font-medium leading-tight group-hover:text-accent transition-colors max-w-[14ch]">{c.title}</h3>
                <div className="hidden md:block">
                  <p className="text-[9px] kern uppercase text-muted-foreground">Deadline</p>
                  <p className="text-[11px] kern mt-1">{c.deadline}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[9px] kern uppercase text-muted-foreground">{c.label}</p>
                    <p className="text-[11px] kern mt-1">{c.value}</p>
                  </div>
                  <Icon name="ArrowRight" size={15} className="text-accent group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Magazine */}
        <Reveal delay={120}>
          <div className="flex items-center justify-between mb-8">
            <span className="text-[11px] kern uppercase text-muted-foreground">Magazine</span>
            <a href="#" className="text-[11px] kern uppercase inline-flex items-center gap-2 link-line">View All Stories <Icon name="ArrowRight" size={13} /></a>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <a href="#" className="group">
              <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                <img src={IMG_DESERT} alt="Featured story" className="w-full h-full object-cover hover-grow" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <span className="text-[10px] kern uppercase text-white/70">Featured Story</span>
                  <h3 className="font-display text-2xl font-light leading-tight mt-2">The New Geography of Contemporary Photography</h3>
                  <p className="text-[10px] kern uppercase text-white/60 mt-3">June 3, 2027</p>
                </div>
              </div>
            </a>
            <div className="flex flex-col divide-y divide-border">
              {stories.map((s) => (
                <a key={s.title} href="#" className="group flex gap-4 py-4 first:pt-0">
                  <div className="w-16 h-16 shrink-0 overflow-hidden bg-muted">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover hover-grow" />
                  </div>
                  <div>
                    <span className="text-[9px] kern uppercase text-accent">{s.cat}</span>
                    <h4 className="font-display text-base leading-tight mt-1 group-hover:text-accent transition-colors">{s.title}</h4>
                    <p className="text-[9px] kern uppercase text-muted-foreground mt-1.5">{s.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* GRANTS + COMMUNITY — dark */}
      <section className="bg-foreground text-background px-6 md:px-10 py-20 md:py-24">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12 lg:gap-16">
          <Reveal>
            <span className="text-[11px] kern uppercase text-background/50">Grants &amp; Opportunities</span>
            <div className="mt-8 space-y-6">
              {opportunities.map((o) => (
                <div key={o.title} className="flex items-start gap-4">
                  <Icon name={o.icon} size={22} className="text-background/80 mt-0.5 shrink-0" fallback="Circle" />
                  <div>
                    <h4 className="text-[12px] kern uppercase font-medium">{o.title}</h4>
                    <p className="text-xs text-background/50 mt-1">{o.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="mt-8 inline-flex items-center gap-3 text-[11px] kern uppercase text-accent link-line">Explore All Opportunities <Icon name="ArrowRight" size={13} /></a>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid md:grid-cols-2 gap-8 items-center h-full">
              <div>
                <span className="text-[11px] kern uppercase text-background/50">Community</span>
                <div className="grid grid-cols-3 gap-4 mt-8 border-b border-background/20 pb-8">
                  {[['24,000+', 'Artists'], ['67', 'Countries'], ['320', 'Published Projects']].map(([num, lbl]) => (
                    <div key={lbl}>
                      <p className="font-display text-3xl md:text-4xl font-light">{num}</p>
                      <p className="text-[9px] kern uppercase text-background/50 mt-2">{lbl}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-background/60 mt-6 leading-relaxed">Join a global community of artists, curators, collectors and art lovers.</p>
                <button className="mt-8 border border-background/40 text-background text-[11px] kern uppercase px-6 py-3 inline-flex items-center gap-3 hover:bg-background hover:text-foreground transition-colors">
                  Become a Member <Icon name="ArrowRight" size={13} />
                </button>
              </div>
              <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                <img src={IMG_CROWD} alt="Community" className="w-full h-full object-cover hover-grow" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXHIBITIONS — light */}
      <section className="px-6 md:px-10 py-20 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] kern uppercase text-muted-foreground">Exhibitions</span>
          <a href="#" className="text-[11px] kern uppercase inline-flex items-center gap-2 link-line">View All Exhibitions <Icon name="ArrowRight" size={13} /></a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { tag: 'Current', city: 'Istanbul', title: 'Future Landscapes', date: 'May – July 2027', img: IMG_TUNNEL },
            { tag: 'Upcoming', city: 'Berlin', title: 'New Voices', date: 'September – November 2027', img: HERO },
          ].map((ex, i) => (
            <Reveal key={ex.title} delay={i * 120}>
              <a href="#" className="group relative block aspect-[16/9] overflow-hidden">
                <img src={ex.img} alt={ex.title} className="absolute inset-0 w-full h-full object-cover hover-grow" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                  <span className="text-[10px] kern uppercase text-accent">{ex.tag}</span>
                  <span className="text-[10px] kern uppercase text-white/60 mt-2">{ex.city}</span>
                  <h3 className="font-display text-3xl md:text-4xl font-light mt-1">{ex.title}</h3>
                  <p className="text-[10px] kern uppercase text-white/60 mt-2">{ex.date}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] kern uppercase text-accent">View Exhibition <Icon name="ArrowRight" size={12} /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER — dark */}
      <footer className="bg-foreground text-background px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-[1.4fr,1fr,1fr,1fr,1.3fr] gap-10">
          <div>
            <FrameLogo size={32} dark />
            <p className="text-[11px] kern uppercase text-background/50 mt-6 leading-relaxed">HQ<br />Istanbul, Turkey</p>
            <div className="flex gap-4 mt-6 text-background/60">
              {['Instagram', 'Linkedin', 'Twitter', 'Video'].map((s) => (
                <a key={s} href="#" className="hover:text-accent transition-colors"><Icon name={s} size={16} fallback="Circle" /></a>
              ))}
            </div>
          </div>
          {[
            ['Magazine', 'Gallery', 'Open Calls'],
            ['Grants', 'Community', 'Exhibitions'],
            ['About', 'Contact', 'FAQ'],
          ].map((col, i) => (
            <ul key={i} className="space-y-3 text-[12px] kern uppercase text-background/70">
              {col.map((it) => <li key={it}><a href="#" className="link-line hover:text-background">{it}</a></li>)}
            </ul>
          ))}
          <div>
            <p className="text-[11px] kern uppercase text-background/50">Newsletter</p>
            <p className="text-xs text-background/60 mt-3 leading-relaxed">Stay updated on open calls, exhibitions and opportunities.</p>
            <div className="mt-5 flex items-center border-b border-background/40 pb-2">
              <input type="email" placeholder="YOUR EMAIL" className="flex-1 bg-transparent outline-none text-[11px] kern uppercase text-background placeholder:text-background/40" />
              <button><Icon name="ArrowRight" size={15} className="text-accent" /></button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-14 pt-6 border-t border-background/15 text-[10px] kern uppercase text-background/40">
          <span>© 2027 FRAME. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="link-line">Privacy Policy</a>
            <a href="#" className="link-line">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
