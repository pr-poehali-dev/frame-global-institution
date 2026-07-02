import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/c4f73199-f60c-466c-bf57-149d7c6c4aac.jpg';
const IMG_ARCH = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/e45b6195-1daa-49d5-b233-a368ef8c4000.jpg';
const IMG_DESERT = 'https://cdn.poehali.dev/projects/872fdb3a-4faa-4c21-b8e9-343c169777ee/files/d089d01e-72fa-455e-a0c9-21513a69bb5b.jpg';

const NAV = ['Magazine', 'Gallery', 'Artists', 'Open Calls', 'Grants', 'Community', 'Exhibitions', 'Residencies', 'Education', 'Shop', 'Membership', 'About'];

const FRAMEMark = ({ className = '' }: { className?: string }) => (
  <span className={`font-display font-semibold tracking-tight leading-none ${className}`}>
    FRAM<span className="text-accent">E</span>
  </span>
);

const artists = [
  { name: 'Elif Karahan', country: 'Turkey', works: 42, img: HERO },
  { name: 'Marcus Vahl', country: 'Germany', works: 28, img: IMG_ARCH },
  { name: 'Aya Tanaka', country: 'Japan', works: 63, img: IMG_DESERT },
];

const gallery = [
  { title: 'Silhouette No. 4', artist: 'Elif Karahan', price: '€2,400', edition: '3 / 15', img: HERO },
  { title: 'Concrete Poem', artist: 'Marcus Vahl', price: '€1,850', edition: '7 / 20', img: IMG_ARCH },
  { title: 'The Long Dusk', artist: 'Aya Tanaka', price: '€3,100', edition: '1 / 8', img: IMG_DESERT },
];

const magazine = [
  { cat: 'Interview', title: 'On light, silence and the space between frames', author: 'Aperture Editorial', img: IMG_ARCH },
  { cat: 'Essay', title: 'Why analog photography refuses to die', author: 'Nadia Bloom', img: IMG_DESERT },
  { cat: 'Artist Story', title: 'Documenting the vanishing coastline of the Bosphorus', author: 'E. Karahan', img: HERO },
];

const calls = [
  { title: 'FRAME Portrait Prize 2026', deadline: '14 days left', fee: '€35', cats: 'Portrait · B&W' },
  { title: 'New Landscapes Open Call', deadline: '29 days left', fee: '€25', cats: 'Landscape · Color' },
  { title: 'Emerging Voices Grant', deadline: '6 days left', fee: 'Free', cats: 'Documentary' },
];

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [seen, setSeen] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.15 });
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return (
    <div ref={setRef} className={seen ? 'reveal' : 'opacity-0'} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const SectionLabel = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-baseline gap-4 mb-10">
    <span className="text-accent text-xs kern font-medium">{n}</span>
    <span className="text-xs kern text-muted-foreground uppercase">{children}</span>
    <span className="flex-1 h-px bg-border" />
  </div>
);

export default function Index() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      {/* HEADER */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          <FRAMEMark className={`text-2xl transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`} />
          <nav className={`hidden lg:flex items-center gap-6 text-[13px] transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
            {NAV.slice(0, 7).map((n) => (
              <a key={n} href="#" className="link-line whitespace-nowrap">{n}</a>
            ))}
          </nav>
          <div className={`flex items-center gap-5 transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
            <Icon name="Search" size={18} className="cursor-pointer hover:text-accent transition-colors" />
            <Icon name="User" size={18} className="cursor-pointer hover:text-accent transition-colors hidden sm:block" />
            <button onClick={() => setMenu(true)} className="lg:hidden"><Icon name="Menu" size={22} /></button>
            <button onClick={() => setMenu(true)} className="hidden lg:block text-[13px] kern uppercase link-line">Menu</button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MENU */}
      {menu && (
        <div className="fixed inset-0 z-[60] bg-foreground text-background animate-fade-in overflow-auto">
          <div className="flex items-center justify-between px-6 md:px-10 h-16">
            <FRAMEMark className="text-2xl text-background" />
            <button onClick={() => setMenu(false)}><Icon name="X" size={24} /></button>
          </div>
          <div className="px-6 md:px-10 mt-10 grid md:grid-cols-2 gap-1 pb-16">
            {NAV.map((n, i) => (
              <a key={n} href="#" onClick={() => setMenu(false)}
                className="font-display text-4xl md:text-6xl font-light py-2 hover:text-accent transition-colors flex items-baseline gap-4">
                <span className="text-xs kern text-background/40">{String(i + 1).padStart(2, '0')}</span>{n}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <img src={HERO} alt="Featured artwork" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        <div className="relative h-full flex flex-col justify-end px-6 md:px-10 pb-16 text-white">
          <div className="reveal">
            <p className="text-xs kern uppercase mb-6 text-white/70">Est. Istanbul · Global Cultural Institution</p>
            <h1 className="font-display font-light leading-[0.85] text-[22vw] md:text-[16vw] tracking-tighter">
              FRAM<span className="text-accent">E</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-6">
              <p className="font-display text-2xl md:text-3xl font-light max-w-xl leading-tight">
                Global Platform for Contemporary Photography &amp; Visual Arts
              </p>
              <a href="#gallery" className="inline-flex items-center gap-3 text-sm kern uppercase link-line whitespace-nowrap">
                Enter the Gallery <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border py-4 overflow-hidden whitespace-nowrap">
        <div className="marquee inline-block">
          {[...Array(2)].map((_, r) => (
            <span key={r} className="font-display text-xl font-light">
              {['Exhibitions', 'Publications', 'Grants', 'Education', 'Community', 'Residencies'].map((w) => (
                <span key={w}>{w}<span className="text-accent mx-6">✦</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* MISSION */}
      <section className="px-6 md:px-10 py-24 md:py-32 max-w-6xl">
        <Reveal>
          <SectionLabel n="01">Mission</SectionLabel>
          <p className="font-display text-3xl md:text-5xl font-light leading-[1.15] tracking-tight">
            We discover, elevate and connect exceptional visual artists worldwide — through
            <span className="text-accent"> exhibitions, publications, grants, education</span> and a
            global community devoted to the timeless art of the photograph.
          </p>
        </Reveal>
      </section>

      {/* FEATURED ARTISTS */}
      <section className="px-6 md:px-10 py-16">
        <SectionLabel n="02">Featured Artists</SectionLabel>
        <div className="grid md:grid-cols-3 gap-x-6 gap-y-12">
          {artists.map((a, i) => (
            <Reveal key={a.name} delay={i * 120}>
              <div className="group cursor-pointer">
                <div className="overflow-hidden aspect-[3/4] mb-4 bg-muted">
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover hover-grow grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-medium">{a.name}</h3>
                  <span className="text-xs text-muted-foreground">{a.works} works</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 kern uppercase text-[11px]">{a.country}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="px-6 md:px-10 py-24 md:py-32 bg-foreground text-background mt-16">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="text-accent text-xs kern font-medium">03</span>
          <span className="text-xs kern text-background/50 uppercase">Online Gallery · Limited Editions</span>
          <span className="flex-1 h-px bg-background/20" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {gallery.map((g, i) => (
            <Reveal key={g.title} delay={i * 120}>
              <div className="group cursor-pointer">
                <div className="overflow-hidden aspect-[4/5] mb-5 bg-graphite/40 relative">
                  <img src={g.img} alt={g.title} className="w-full h-full object-cover hover-grow" />
                  <span className="absolute top-4 right-4 bg-background/90 text-foreground text-[10px] kern uppercase px-3 py-1">Ed. {g.edition}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-background/20 pb-4">
                  <div>
                    <h3 className="font-display text-2xl font-medium">{g.title}</h3>
                    <p className="text-sm text-background/60 mt-1">{g.artist}</p>
                  </div>
                  <span className="font-display text-xl">{g.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-3 text-sm kern uppercase link-line">View all works <Icon name="ArrowRight" size={16} /></a>
        </div>
      </section>

      {/* MAGAZINE */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <SectionLabel n="04">Magazine</SectionLabel>
        <div className="grid lg:grid-cols-3 gap-x-6 gap-y-14">
          {magazine.map((m, i) => (
            <Reveal key={m.title} delay={i * 120}>
              <article className="group cursor-pointer">
                <div className="overflow-hidden aspect-[16/10] mb-5 bg-muted">
                  <img src={m.img} alt={m.title} className="w-full h-full object-cover hover-grow" />
                </div>
                <span className="text-[11px] kern uppercase text-accent">{m.cat}</span>
                <h3 className="font-display text-2xl md:text-3xl font-light leading-tight mt-2 group-hover:text-accent transition-colors">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-3">{m.author}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OPEN CALLS */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-t border-border">
        <SectionLabel n="05">Current Open Calls &amp; Grants</SectionLabel>
        <div className="divide-y divide-border">
          {calls.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <a href="#" className="group flex flex-col md:flex-row md:items-center justify-between py-8 gap-4">
                <div className="flex items-baseline gap-6">
                  <span className="text-xs kern text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-2xl md:text-4xl font-light group-hover:text-accent transition-colors">{c.title}</h3>
                    <p className="text-xs kern uppercase text-muted-foreground mt-2">{c.cats}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 pl-12 md:pl-0">
                  <span className="text-sm text-muted-foreground">Fee {c.fee}</span>
                  <span className="text-sm text-accent font-medium whitespace-nowrap">{c.deadline}</span>
                  <Icon name="ArrowUpRight" size={22} className="hidden md:block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXHIBITIONS / RESIDENCIES SPLIT */}
      <section className="grid md:grid-cols-2 border-t border-border">
        <Reveal>
          <div className="relative aspect-square md:aspect-auto md:h-full min-h-[420px] group overflow-hidden">
            <img src={IMG_ARCH} alt="Exhibition" className="absolute inset-0 w-full h-full object-cover hover-grow" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
              <span className="text-xs kern uppercase text-white/70">Upcoming Exhibition</span>
              <h3 className="font-display text-4xl md:text-5xl font-light mt-3">Between Frames</h3>
              <p className="text-white/80 mt-3 max-w-md">A survey of contemporary Turkish photography. Istanbul · March 2026.</p>
              <a href="#" className="mt-6 inline-flex items-center gap-3 text-sm kern uppercase link-line w-fit">Get Tickets <Icon name="ArrowRight" size={16} /></a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative aspect-square md:aspect-auto md:h-full min-h-[420px] group overflow-hidden">
            <img src={IMG_DESERT} alt="Residency" className="absolute inset-0 w-full h-full object-cover hover-grow" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
              <span className="text-xs kern uppercase text-white/70">Residencies</span>
              <h3 className="font-display text-4xl md:text-5xl font-light mt-3">The FRAME Residency</h3>
              <p className="text-white/80 mt-3 max-w-md">Three months of funded studio time for emerging artists worldwide.</p>
              <a href="#" className="mt-6 inline-flex items-center gap-3 text-sm kern uppercase link-line w-fit">Apply Now <Icon name="ArrowRight" size={16} /></a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* NEWSLETTER */}
      <section className="px-6 md:px-10 py-28 md:py-40 text-center bg-foreground text-background">
        <Reveal>
          <span className="text-xs kern uppercase text-background/50">Newsletter</span>
          <h2 className="font-display text-4xl md:text-7xl font-light mt-6 leading-[0.95] tracking-tight max-w-4xl mx-auto">
            Join a global community of <span className="text-accent">image-makers</span>.
          </h2>
          <div className="mt-12 max-w-md mx-auto flex items-center border-b border-background/40 pb-2">
            <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent outline-none text-background placeholder:text-background/40 text-lg" />
            <button className="text-sm kern uppercase link-line whitespace-nowrap">Subscribe</button>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <FRAMEMark className="text-4xl" />
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">A global cultural institution for contemporary fine art photography. Headquartered in Istanbul.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 text-sm">
            {[
              ['Platform', ['Gallery', 'Magazine', 'Artists', 'Shop']],
              ['Opportunities', ['Open Calls', 'Grants', 'Residencies', 'Education']],
              ['Community', ['Forums', 'Events', 'Membership', 'Mentorship']],
              ['Institution', ['About', 'Exhibitions', 'Press', 'Contact']],
            ].map(([h, items]) => (
              <div key={h as string}>
                <p className="text-[11px] kern uppercase text-muted-foreground mb-4">{h as string}</p>
                <ul className="space-y-2">
                  {(items as string[]).map((it) => <li key={it}><a href="#" className="link-line">{it}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-border text-xs text-muted-foreground">
          <span>© 2026 FRAME · Istanbul</span>
          <div className="flex gap-6">
            {['Instagram', 'Youtube', 'Twitter'].map((s) => <a key={s} href="#" className="link-line kern uppercase">{s}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
