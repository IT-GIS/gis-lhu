export type LandingPageKey = "home" | "profile" | "service" | "contact";

export type LandingStaticPage = {
  key: LandingPageKey;
  title: string;
  description: string;
  bodyClass: string;
  styles: string;
  html: string;
};

const WHATSAPP_WIDGET_STYLES = `
  .contact-widget {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1100;
    font-family: "Plus Jakarta Sans", sans-serif;
  }

  .contact-toggle {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    border: none;
    color: #ffffff;
    background: linear-gradient(135deg, #0070F3, #00DFD8);
    box-shadow: 0 18px 36px rgba(0, 112, 243, 0.28);
    font-size: 1.55rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.28s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .contact-toggle:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 22px 44px rgba(0, 112, 243, 0.34);
  }

  .contact-toggle i {
    transition: transform 0.25s ease;
  }

  .contact-toggle.active i {
    transform: rotate(45deg);
  }

  .contact-window.icon-only {
    position: absolute;
    right: 3px;
    bottom: 78px;
    width: auto;
    display: grid;
    gap: 12px;
    padding: 0;
    border-radius: 999px;
    background: transparent;
    box-shadow: none;
    overflow: visible;
    transform: translateY(14px) scale(0.92);
    opacity: 0;
    pointer-events: none;
    transition: all 0.28s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .contact-window.icon-only.active {
    transform: translateY(0) scale(1);
    opacity: 1;
    pointer-events: auto;
  }

  .contact-icon-link {
    width: 56px;
    height: 56px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 1.55rem;
    text-decoration: none;
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.18);
    transition: all 0.25s ease;
  }

  .contact-icon-link:hover {
    transform: translateY(-3px) scale(1.05);
  }

  .contact-icon-link.whatsapp {
    background: #25D366;
  }

  .contact-icon-link.email {
    background: linear-gradient(135deg, #0070F3, #00A3FF);
  }

  .contact-icon-link.instagram {
    background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45);
  }

  @media (max-width: 640px) {
    .contact-widget {
      right: 18px;
      bottom: 18px;
    }

    .contact-toggle {
      width: 58px;
      height: 58px;
      font-size: 1.45rem;
    }

    .contact-window.icon-only {
      bottom: 72px;
      gap: 10px;
    }

    .contact-icon-link {
      width: 52px;
      height: 52px;
      font-size: 1.45rem;
    }
  }
`;

const WHATSAPP_WIDGET_HTML = `
  <div class="contact-widget">
    <div class="contact-window icon-only" id="whatsappWindow">
      <a class="contact-icon-link whatsapp" href="https://wa.me/6285645046160?text=Hello%20GIS%20Laboratory" target="_blank" rel="noopener" aria-label="WhatsApp GIS">
        <i class="fa-brands fa-whatsapp"></i>
      </a>

      <a class="contact-icon-link email" href="mailto:info@gislaboratorium.com?subject=GISLAB%20Service%20Information" aria-label="Email GIS">
        <i class="fa-solid fa-envelope"></i>
      </a>

      <a class="contact-icon-link instagram" href="https://www.instagram.com/ptglobalinspeksisistem/" target="_blank" rel="noopener" aria-label="Instagram GIS">
        <i class="fa-brands fa-instagram"></i>
      </a>
    </div>

    <button class="contact-toggle" id="toggleWhatsapp" aria-label="Open contact menu">
      <i class="fa-solid fa-plus"></i>
    </button>
  </div>
`;

const pageList = [
  {
    key: "home",
    title: "GISLAB - Global Inspeksi Sistem Testing Laboratory",
    description:
      "Accurate and reliable testing laboratory supported by experienced experts and modern equipment.",
    bodyClass: "",
    styles: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            --primary: #0A2540;
            --secondary: #0070F3;
            --accent: #00DFD8;
            --light-blue: #EBF4F8;
            --white: #FFFFFF;
            --text-dark: #1E293B;
            --text-muted: #64748B;
            --text-light: #F8FAFC;
            --glass-bg: rgba(255, 255, 255, 0.65);
            --glass-border: rgba(255, 255, 255, 0.8);
            --glass-dark-bg: rgba(10, 37, 64, 0.4);
            --glass-dark-border: rgba(255, 255, 255, 0.15);
            --shadow-soft: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
            --shadow-hover: 0 20px 40px -10px rgba(0, 112, 243, 0.15);
            --shadow-glow: 0 0 20px rgba(0, 223, 216, 0.4);
            --radius-pill: 100px;
            --radius-md: 24px;
            --radius-lg: 32px;
            --font-main: 'Plus Jakarta Sans', sans-serif;
            --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-main); color: var(--text-dark); background-color: #FAFCFF; line-height: 1.6; overflow-x: hidden; position: relative; }
        .landing-html { background: #FAFCFF !important; color: var(--text-dark); min-height: 100vh; }
        .landing-html::before { content: ''; position: fixed; inset: 0; background: radial-gradient(circle at 15% 50%, rgba(0, 223, 216, 0.04), transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 112, 243, 0.04), transparent 25%), #FAFCFF; z-index: -1; pointer-events: none; }
        body::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 15% 50%, rgba(0, 223, 216, 0.04), transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 112, 243, 0.04), transparent 25%); z-index: -1; pointer-events: none; }
        a { text-decoration: none; color: inherit; }
        ul { list-style: none; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .glass { background: var(--glass-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--glass-border); box-shadow: var(--shadow-soft); }
        .glass-dark { background: var(--glass-dark-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-dark-border); color: var(--white); }
        .btn { display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; border-radius: var(--radius-pill); font-weight: 600; font-size: 1rem; transition: var(--transition); cursor: pointer; border: none; outline: none; }
        .btn-primary { background: linear-gradient(135deg, var(--secondary), var(--accent)); color: var(--white); box-shadow: 0 4px 15px rgba(0, 112, 243, 0.3); }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: var(--shadow-glow); }
        .btn-sm { padding: 10px 20px; font-size: 0.875rem; }
        .navbar-wrapper { position: fixed; top: 24px; left: 0; width: 100%; z-index: 1000; display: flex; justify-content: center; padding: 0 24px; transition: var(--transition); }
        .navbar-wrapper.scrolled { top: 12px; }
        .navbar { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1100px; padding: 12px 24px; border-radius: var(--radius-pill); background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.6); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); }
        .nav-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.25rem; color: var(--primary); letter-spacing: -0.5px; }
        .nav-brand i { color: var(--secondary); font-size: 1.5rem; }
        .nav-menu { display: flex; gap: 8px; }
        .nav-link { padding: 8px 16px; border-radius: var(--radius-pill); font-weight: 500; font-size: 0.95rem; color: var(--text-muted); transition: var(--transition); }
        .nav-link:hover { color: var(--primary); background: rgba(0, 112, 243, 0.05); }
        .nav-link.active { background: rgba(0, 223, 216, 0.15); color: var(--secondary); font-weight: 600; }
        .mobile-menu-btn { display: none; font-size: 1.5rem; color: var(--primary); background: none; border: none; cursor: pointer; }
        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding-top: 100px; overflow: hidden; }
        .hero-content { position: relative; z-index: 10; text-align: center; width: 100%; max-width: 800px; margin: 0 auto; }
        .hero-panel { padding: 60px 40px; border-radius: var(--radius-lg); margin-bottom: 40px; background: rgba(255, 255, 255, 0.25); border: 1px solid rgba(255, 255, 255, 0.3); box-sizing: border-box; height: 500px !important; min-height: 500px !important; max-height: 500px !important; width: 100% !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; text-align: center; overflow: hidden !important; }
        .hero-title-slot, .hero-subtitle-slot { width: 100%; flex-shrink: 0; overflow: hidden; }
        .hero-title-slot { min-height: 160px; }
        .hero-subtitle-slot { min-height: 100px; margin-top: 16px; margin-bottom: 32px; }
        .hero-title { font-size: 3.5rem; font-weight: 800; color: var(--primary); line-height: 1.2; margin-bottom: 24px; letter-spacing: -1px; position: relative; width: 100%; }
        .hero-title span { background: linear-gradient(135deg, var(--secondary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.125rem; color: var(--text-dark); margin-bottom: 32px; font-weight: 500; position: relative; width: 100%; }
        .typing-ghost { visibility: hidden; }
        .typing-live { position: absolute; inset: 0; display: block;}
        .typing-neutral { background: none !important; color: inherit !important; -webkit-text-fill-color: initial !important; }
        .typing-accent { background: linear-gradient(135deg, var(--secondary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .advantages-wrapper {
  position: relative;
  z-index: 20;
  margin-top: -60px;
  padding-bottom: 60px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.advantage-card {
  position: relative;
  overflow: hidden;
  min-height: 220px;
  padding: 34px 28px;
  border-radius: var(--radius-md);
  text-align: center;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  animation: fadeUp 1s ease-out backwards;
}

.advantage-card::before {
  content: "";
  position: absolute;
  inset: -90px auto auto -90px;
  width: 180px;
  height: 180px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(0, 223, 216, 0.2), transparent 68%);
  opacity: 0;
  transition: var(--transition);
}

.advantage-card::after {
  content: "";
  position: absolute;
  right: 24px;
  bottom: 22px;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  border: 1px solid rgba(0, 112, 243, 0.12);
  opacity: 0.75;
}

.advantage-card:nth-child(2) {
  animation-delay: 0.2s;
}

.advantage-card:nth-child(3) {
  animation-delay: 0.4s;
}

.advantage-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 28px 70px rgba(0, 112, 243, 0.16);
}

.advantage-card:hover::before {
  opacity: 1;
}

.advantage-icon {
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 28px;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(135deg, #0070F3, #00DFD8) border-box;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--secondary);
  margin-bottom: 8px;
  box-shadow:
    0 18px 40px rgba(0, 112, 243, 0.16),
    inset 0 0 0 8px rgba(0, 112, 243, 0.06);
  transition: var(--transition);
}

.advantage-icon::before {
  content: "";
  position: absolute;
  inset: -9px;
  border-radius: 34px;
  border: 1px dashed rgba(0, 112, 243, 0.24);
}

.advantage-icon::after {
  content: "";
  position: absolute;
  right: -6px;
  top: -6px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #00DFD8, #0070F3);
  border: 4px solid #ffffff;
  box-shadow: 0 10px 20px rgba(0, 112, 243, 0.18);
}

.advantage-card:hover .advantage-icon {
  transform: translateY(-4px) scale(1.05);
}

.advantage-title {
  position: relative;
  z-index: 2;
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--primary);
  line-height: 1.35;
}
        .about-section { padding: 100px 0; position: relative; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: stretch; }
        .about-card { padding: 48px; border-radius: var(--radius-lg); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-start; }
        .about-img-small { position: absolute; right: -20px; bottom: -20px; width: 200px; height: 200px; border-radius: 50%; object-fit: cover; border: 8px solid var(--white); box-shadow: var(--shadow-soft); opacity: 0.8; }
        .section-title { font-size: 2.5rem; font-weight: 800; color: var(--primary); margin-bottom: 24px; }
        .about-text { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 32px; position: relative; z-index: 1; }
        .facilities-list { display: flex; flex-direction: column; gap: 20px; margin-top: 32px; }
        .facility-item { display: flex; align-items: flex-start; gap: 16px; }
        .facility-icon { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--secondary), var(--accent)); color: var(--white); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.875rem; }
        .facility-text { font-weight: 600; font-size: 1.1rem; color: var(--primary); }
        .illustration-3d { margin-top: 40px; height: 200px; background: url('https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&q=80&w=800') center/cover; border-radius: var(--radius-md); position: relative; box-shadow: var(--shadow-soft); }
        .illustration-3d::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0, 112, 243, 0.4), rgba(0, 223, 216, 0.4)); border-radius: var(--radius-md); }
        .vision-mission { padding: 100px 0; background: linear-gradient(135deg, var(--primary), #0e4e8a); position: relative; overflow: hidden; }
        .vision-mission::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at center, rgba(0, 48, 223, 0.1) 0%, transparent 50%); animation: rotate 20s linear infinite; }
        .vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; position: relative; z-index: 10; }
        .vm-card { padding: 48px; border-radius: var(--radius-lg); transition: var(--transition); }
        .vm-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 223, 216, 0.15); border-color: rgba(0, 223, 216, 0.3); }
        .vm-title { font-size: 2rem; font-weight: 700; color: #ffffff; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
        .vm-text { font-size: 1.1rem; line-height: 1.8; color: var(--light-blue); }
        .vm-list { display: flex; flex-direction: column; gap: 16px; }
        .vm-list li { display: flex; align-items: flex-start; gap: 12px; color: var(--light-blue); font-size: 1.1rem; }
        .vm-list li::before { content: '\\f058'; font-family: 'Font Awesome 6 Free'; font-weight: 900; color:#0070F3; margin-top: 4px; }
        .services-section { padding: 100px 0; text-align: center; }
        .services-header { margin-bottom: 60px; }
        .carousel-container { position: relative; padding: 20px 0; overflow: hidden; width: 100%; }
        .services-track { display: flex; gap: 32px; width: max-content; animation: scroll-services 20s linear infinite; }
        .services-track:hover { animation-play-state: paused; }
        @keyframes scroll-services { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 16px)); } }
        .service-card { width: 350px; flex-shrink: 0; border-radius: var(--radius-lg); overflow: hidden; text-align: left; transition: var(--transition); display: flex; flex-direction: column; cursor: pointer; color: inherit; text-decoration: none; }
        .service-card:hover { transform: scale(1.02); box-shadow: var(--shadow-hover); }
        .service-card:focus-visible { outline: 4px solid rgba(0, 112, 243, 0.18); outline-offset: 4px; }
        .service-img { height: 200px; width: 100%; object-fit: cover; }
        .service-content { padding: 32px; flex-grow: 1; display: flex; flex-direction: column; }
        .service-title { font-size: 1.25rem; font-weight: 700; color: var(--primary); margin-bottom: 12px; }
        .service-desc { color: var(--text-muted); font-size: 0.95rem; font-weight: 600; line-height: 1.65; margin-bottom: 22px; }
        .service-btn { margin-top: auto; align-self: flex-start; background: transparent; color: var(--secondary); font-weight: 600; border: 1px solid rgba(0, 112, 243, 0.2); padding: 8px 20px; border-radius: var(--radius-pill); transition: var(--transition); }
        .service-card:hover .service-btn { background: var(--secondary); color: var(--white); border-color: var(--secondary); }
        .service-card, .service-btn { position: relative; z-index: 2; pointer-events: auto; cursor: pointer; }
        .service-detail-section { display: none; padding: 24px 0 100px; font-family: var(--font-main); text-align: left; }
        .service-detail-section.active { display: block; }
        .service-detail-layout { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.7fr); gap: 32px; align-items: start; }
        .service-detail-article, .service-detail-sidebar { border-radius: var(--radius-lg); background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.82); box-shadow: var(--shadow-soft); }
        .service-detail-article { overflow: hidden; }
        .detail-cover { width: 100%; height: 360px; object-fit: cover; display: block; }
        .detail-body { padding: 42px; }
        .detail-kicker { display: inline-flex; align-items: center; gap: 10px; color: var(--secondary); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .detail-title { margin-top: 14px; color: var(--primary); font-size: clamp(2rem, 4vw, 3.35rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.02em; }
        .detail-copy { margin-top: 22px; color: #405a70; font-size: 1.02rem; font-weight: 600; line-height: 1.85; text-align: justify; }
        .detail-body h3 { margin-top: 34px; color: var(--primary); font-size: 1.4rem; font-weight: 800; }
        .detail-list { display: grid; gap: 14px; margin-top: 18px; padding: 0; list-style: none; }
        .detail-list li { display: flex; align-items: flex-start; gap: 12px; color: #405a70; font-weight: 600; line-height: 1.7; }
        .detail-list i { margin-top: 6px; color: var(--accent); }
        .service-detail-sidebar { position: sticky; top: 110px; padding: 28px; }
        .sidebar-box + .sidebar-box { margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(10, 37, 64, 0.1); }
        .sidebar-title { color: var(--primary); font-size: 1.1rem; font-weight: 800; margin-bottom: 14px; }
        .sidebar-link { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; border: 0; background: transparent; padding: 12px 0; color: #405a70; font-weight: 700; text-align: left; cursor: pointer; border-bottom: 1px solid rgba(10, 37, 64, 0.08); }
        .sidebar-link:hover { color: var(--secondary); }
        .download-btn, .detail-contact-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; width: 100%; margin-top: 12px; padding: 12px 18px; border-radius: var(--radius-pill); color: var(--white); background: linear-gradient(135deg, var(--secondary), var(--accent)); font-weight: 800; text-decoration: none; transition: var(--transition); }
        .download-btn:hover, .detail-contact-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 34px -22px rgba(0, 112, 243, 0.7); }
        .sidebar-note { color: var(--text-muted); font-size: 0.95rem; font-weight: 600; line-height: 1.7; }
        

        .home-service-details { padding: 0 0 96px; margin-top: -18px; text-align: left; }
        .home-service-detail-card { display: none; overflow: hidden; border-radius: var(--radius-lg); scroll-margin-top: 120px; }
        .home-service-details:has(.home-service-detail-card:target) .home-service-detail-card { display: none; }
        .home-service-detail-card:target { display: grid; grid-template-columns: minmax(280px, 430px) minmax(0, 1fr); }
        .home-service-detail-card:not(:target).default-detail { display: grid; grid-template-columns: minmax(280px, 430px) minmax(0, 1fr); }
        .home-service-details:has(.home-service-detail-card:target) .home-service-detail-card.default-detail:not(:target) { display: none; }
        .home-detail-img { width: 100%; height: 100%; min-height: 430px; object-fit: cover; display: block; }
        .home-detail-body { padding: 42px; }
        .home-detail-kicker { display: inline-flex; align-items: center; gap: 10px; color: var(--secondary); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .home-detail-title { margin-top: 14px; color: var(--primary); font-size: clamp(1.9rem, 4vw, 3rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; }
        .home-detail-copy { margin-top: 18px; color: #405a70; font-size: 1rem; font-weight: 600; line-height: 1.82; text-align: justify; }
        .home-detail-body h3 { margin-top: 28px; color: var(--primary); font-size: 1.28rem; font-weight: 800; }
        .home-detail-list { display: grid; gap: 12px; margin-top: 16px; padding: 0; list-style: none; }
        .home-detail-list li { display: flex; align-items: flex-start; gap: 12px; color: #405a70; font-weight: 600; line-height: 1.7; }
        .home-detail-list i { margin-top: 6px; color: var(--accent); }

        .footer {
          position: relative;
          padding: 90px 0 42px;
          background:
            radial-gradient(circle at 15% 20%, rgba(0, 223, 216, 0.16), transparent 30%),
            radial-gradient(circle at 85% 10%, rgba(255, 255, 255, 0.1), transparent 28%),
            linear-gradient(135deg, var(--primary), #0d4778 52%, #105c96 100%);
          color: var(--white);
          overflow: hidden;
          font-family: var(--font-main);
        }
        .footer::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 54px 54px;
          opacity: 0.45;
          pointer-events: none;
        }
        .footer-panel {
          position: relative;
          z-index: 10;
          padding: clamp(34px, 4vw, 58px);
          border-radius: var(--radius-lg);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.85fr) minmax(220px, 0.6fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }
        .footer-brand { max-width: 520px; }
        .footer-logo-wrap {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }
        .footer-logo {
          width: 74px;
          height: 74px;
          object-fit: contain;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.94);
          padding: 10px;
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
        }
        .footer-brand-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.35rem, 2vw, 1.8rem);
          font-weight: 900;
          letter-spacing: -0.035em;
        }
        .footer-brand-subtitle {
          margin: 5px 0 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .footer-description {
          margin: 0;
          max-width: 500px;
          color: rgba(234, 246, 255, 0.82);
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.85;
        }
        .footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }
        .footer-badges span {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(0, 223, 216, 0.3);
          background: rgba(0, 223, 216, 0.1);
          color: #bffcfb;
          padding: 8px 13px;
          font-size: 0.78rem;
          font-weight: 800;
        }
        .footer-col-title {
          font-size: 1.18rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 24px;
        }
        .footer-text {
          color: rgba(234, 246, 255, 0.82);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 650;
          line-height: 1.65;
        }
        .footer-text i {
          width: 20px;
          color: var(--accent);
          text-align: center;
        }
        .footer-link {
          color: rgba(234, 246, 255, 0.82);
          transition: var(--transition);
          display: block;
          width: fit-content;
          margin-bottom: 13px;
          font-weight: 700;
          text-decoration: none;
        }
        .footer-link:hover {
          color: var(--accent);
          transform: translateX(6px);
        }
        .footer-bottom {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-top: 60px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.9rem;
          font-weight: 600;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer { padding: 64px 0 32px; }
          .footer-panel { padding: 30px 22px; border-radius: 28px; }
          .footer-grid { grid-template-columns: 1fr; gap: 34px; }
          .footer-logo-wrap { align-items: flex-start; }
          .footer-logo { width: 64px; height: 64px; border-radius: 20px; }
          .footer-badges span { font-size: 0.72rem; }
        }
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .cursor { display: inline-block; width: 3px; background-color: var(--primary); margin-left: 4px; animation: blinkCursor 1s step-end infinite; }
        @keyframes blinkCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        
        @media (max-width: 1024px) {
            .hero-title { font-size: 2.75rem; }
            .advantages-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
            .about-grid, .vm-grid { grid-template-columns: 1fr; }
            .about-img-small { display: none; }
            .services-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
            .navbar { padding: 12px 20px; }
            .nav-menu { position: absolute; top: 100%; left: 0; right: 0; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); flex-direction: column; padding: 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-soft); display: none; margin-top: 10px; }
            .nav-menu.active { display: flex; }
            .mobile-menu-btn { display: block; }
            .hero-title { font-size: 2rem; }
            .advantages-wrapper { margin-top: 40px; }
            .advantages-grid { grid-template-columns: 1fr; }
            .services-grid { grid-template-columns: 1fr; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-panel { padding: 32px 20px; }
            .service-detail-layout { grid-template-columns: 1fr; }
            .service-detail-sidebar { position: static; }
            .detail-cover { height: 260px; }
            .detail-body { padding: 28px 22px; }
            .home-service-detail-card:target, .home-service-detail-card:not(:target).default-detail { grid-template-columns: 1fr; }
            .home-detail-img { min-height: 240px; height: 240px; }
            .home-detail-body { padding: 28px 22px; }
        }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .reveal.active { opacity: 1; transform: translateY(0); }

        ${WHATSAPP_WIDGET_STYLES}

    `,
    html: `
    <header class="navbar-wrapper" id="navbar">
        <nav class="navbar">
            <a href="/en" class="nav-brand">
                <img src="/landing/animation/logo-lab.png" style="height: 28px; width: auto; transform: scale(1.8); transform-origin: left center; margin-right: 36px;">
                Global Inspeksi Sistem
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="/en" class="nav-link active">Home</a></li>
                <li><a href="/en/profile" class="nav-link">Profile</a></li>
                <li><a href="/en/service" class="nav-link">Services</a></li>
                <li><a href="/en/ruang-lingkup-pengujian" class="nav-link">Testing Scope</a></li>
                <li class="nav-dropdown">
  <details>
    <summary class="nav-link nav-dropdown-trigger">
      Information <i class="fa-solid fa-chevron-down"></i>
    </summary>
    <div class="nav-dropdown-menu">
      <a href="/en/informasi" class="nav-dropdown-link">
        Articles <i class="fa-solid fa-newspaper"></i>
      </a>
      <a href="/en/informasi/keluhan-dan-banding" class="nav-dropdown-link">
        Complaints and Appeals <i class="fa-solid fa-comments"></i>
      </a>
      <a href="/verify" class="nav-dropdown-link">
        LHU Verification <i class="fa-solid fa-check-circle"></i>
      </a>
    </div>
  </details>
</li>
                <li><a href="/en/contact" class="nav-link">Contact</a></li>
            </ul>
            <div class="nav-actions">
  <a href="/" class="language-switch" id="languageSwitch" aria-label="Switch to Indonesian" title="Switch to Indonesian">
    <i class="fa-solid fa-globe"></i>
    <span>ID</span>
  </a>

  <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">
    <i class="fas fa-bars"></i>
  </button>
</div>
        </nav>
    </header>

    <section class="hero" id="beranda">
        <video autoplay loop muted playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;">
            <source src="/landing/animation/animasi.mp4" type="video/mp4">
        </video>
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(250,252,255,0.8) 100%); z-index: 1;"></div>
        <div class="container" style="position: relative; z-index: 10;">
            <div class="hero-content">
                <div class="hero-panel glass">
                    <div class="hero-title-slot">
                        <h1 class="hero-title" aria-label="Global Inspeksi Sistem Testing Laboratory" style="margin: 0; line-height: 1.3;">
                            <span class="typing-ghost typing-neutral" aria-hidden="true">
                                Testing Laboratory <span class="typing-accent">Global Inspeksi Sistem</span>
                            </span>
                            <span class="typing-live" aria-hidden="true">
                                <span id="type-title-1" class="typing-neutral"></span>
                                <span id="type-title-2" class="typing-accent"></span>
                            </span>
                        </h1>
                    </div>
                    <div class="hero-subtitle-slot">
                        <p class="hero-subtitle" aria-label="Our laboratory provides accurate, reliable testing services supported by experienced experts and modern equipment." style="margin: 0; font-weight: 600; text-shadow: 0 1px 2px rgba(255,255,255,0.8);">
                            <span class="typing-ghost" aria-hidden="true">Our laboratory provides accurate, reliable testing services supported by experienced experts and modern equipment.</span>
                            <span id="type-sub" class="typing-live" aria-hidden="true"></span>
                        </p>
                    </div>
                    <a href="/en/service" class="btn btn-primary" style="flex-shrink: 0;">
                        Explore Services <i class="fa-solid fa-arrow-right ms-2" style="margin-left: 8px;"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <div class="advantages-wrapper">
  <div class="container">
    <div class="advantages-grid">
      <div class="advantage-card glass">
        <div class="advantage-icon">
          <i class="fa-solid fa-flask-vial"></i>
        </div>
        <h3 class="advantage-title">Product Quality Testing</h3>
      </div>

      <div class="advantage-card glass">
        <div class="advantage-icon">
          <i class="fa-solid fa-award"></i>
        </div>
        <h3 class="advantage-title">SNI Certification</h3>
      </div>

      <div class="advantage-card glass">
        <div class="advantage-icon">
          <i class="fa-solid fa-earth-asia"></i>
        </div>
        <h3 class="advantage-title">International Standards</h3>
      </div>
    </div>
  </div>
</div>

    <section class="about-section" id="profile">
        <div class="container">
            <div class="about-grid">
                <div class="about-card glass reveal">
                    <h2 class="section-title">About Us</h2>
                    <p class="about-text">
                        GISLAB is a testing laboratory focused on product quality, environmental, and industrial testing services. We help companies ensure product quality, safety, and conformity with applicable standards.
                    </p>
                    <div>
                        <a href="/en/contact" class="btn btn-primary btn-sm">Learn More</a>
                    </div>
                    <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600" alt="Laboratory personnel" class="about-img-small">
                </div>

                <div class="about-card glass reveal">
                    <h2 class="section-title">Key Facilities</h2>
                    <div class="facilities-list">
                        <div class="facility-item">
                            <div class="facility-icon"><i class="fa-solid fa-check"></i></div>
                            <div class="facility-text">Modern testing equipment</div>
                        </div>
                        <div class="facility-item">
                            <div class="facility-icon"><i class="fa-solid fa-check"></i></div>
                            <div class="facility-text">Experienced experts</div>
                        </div>
                        <div class="facility-item">
                            <div class="facility-icon"><i class="fa-solid fa-check"></i></div>
                            <div class="facility-text">Accurate and documented testing process</div>
                        </div>
                    </div>
                    <div class="illustration-3d glass"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="vision-mission" id="visi-misi">
        <div class="container">
            <div class="vm-grid">
                <div class="vm-card glass-dark reveal">
                    <h2 class="vm-title"><i class="fa-solid fa-eye"></i> Vision</h2>
                    <p class="vm-text">To become a trusted testing laboratory that supports quality, safety, and industrial competitiveness through professional and integrity-driven services.</p>
                </div>
                <div class="vm-card glass-dark reveal" style="transition-delay: 0.2s;">
                    <h2 class="vm-title"><i class="fa-solid fa-bullseye"></i> Mission</h2>
                    <ul class="vm-list">
                        <li>Providing accurate, objective, and timely testing services.</li>
                        <li>Supporting compliance with national and international standards.</li>
                        <li>Continuously developing human resource competency and laboratory technology.</li>
                        <li>Maintaining customer trust through transparent and professional service.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="services-section" id="layanan">
        <div class="container">
            <div class="services-header reveal"><h2 class="section-title">Our Services</h2></div>
            <div class="carousel-container reveal">
                <div class="services-track">
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="quality" aria-label="View details for Product and Material Quality Testing">
                        <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600" alt="Product and material quality testing" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Product & Material Quality Testing</h3>
                            <p class="service-desc">Testing of lubricants, palm-based products, fertilizers, palm cooking oil, red palm cooking oil, and other technical products within the approved scope.</p>
                            <button class="service-btn" type="button" data-service-detail="quality">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="environment" aria-label="View details for Water and Environmental Testing">
                        <img src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=600" alt="Water and environmental testing" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Water & Environmental Testing</h3>
                            <p class="service-desc">Testing of clean water, wastewater, drinking water, mineral water, demineralized water, and natural water sources according to scope parameters.</p>
                            <button class="service-btn" type="button" data-service-detail="environment">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="permit" aria-label="View details for Ambient Air and Emission Testing">
                        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600" alt="Ambient air and emission testing" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Ambient Air & Emission Testing</h3>
                            <p class="service-desc">Ambient air and stationary source emission testing to support air quality monitoring and environmental compliance.</p>
                            <button class="service-btn" type="button" data-service-detail="permit">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="sni" aria-label="View details for SNI Product Testing">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" alt="SNI product testing" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">SNI Product Testing</h3>
                            <p class="service-desc">Product testing based on SNI requirements to support certification and compliance processes.</p>
                            <button class="service-btn" type="button" data-service-detail="sni">Read More</button>
                        </div>
                    </article>
                

                    <!-- Duplicate items for a seamless carousel to prevent empty space -->
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="quality" aria-label="View details for Product and Material Quality Testing">
                        <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600" alt="Product and material quality testing" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Product & Material Quality Testing</h3>
                            <p class="service-desc">Testing of lubricants, palm-based products, fertilizers, palm cooking oil, red palm cooking oil, and other technical products within the approved scope.</p>
                            <button class="service-btn" type="button" data-service-detail="quality">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="environment" aria-label="View details for Water and Environmental Testing">
                        <img src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=600" alt="Water and environmental testing" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Water & Environmental Testing</h3>
                            <p class="service-desc">Testing of clean water, wastewater, drinking water, mineral water, demineralized water, and natural water sources according to scope parameters.</p>
                            <button class="service-btn" type="button" data-service-detail="environment">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="permit" aria-label="View details for Ambient Air and Emission Testing">
                        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600" alt="Ambient air and emission testing" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Ambient Air & Emission Testing</h3>
                            <p class="service-desc">Ambient air and stationary source emission testing to support air quality monitoring and environmental compliance.</p>
                            <button class="service-btn" type="button" data-service-detail="permit">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="sni" aria-label="View details for SNI Product Testing">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" alt="SNI product testing" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">SNI Product Testing</h3>
                            <p class="service-desc">Product testing based on SNI requirements to support certification and compliance processes.</p>
                            <button class="service-btn" type="button" data-service-detail="sni">Read More</button>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <section class="service-detail-section" id="detail-layanan" aria-live="polite">
        <div class="container">
            <div class="service-detail-layout">
                <article class="service-detail-article">
                    <img id="detailCover" class="detail-cover" src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200" alt="Laboratory testing">
                    <div class="detail-body">
                        <span class="detail-kicker"><i class="fa-solid fa-flask-vial"></i> Service Details</span>
                        <h2 class="detail-title" id="detailTitle">Product & Material Quality Testing</h2>
                        <p class="detail-copy" id="detailIntro">Quality testing helps ensure that materials, products, or samples have consistent quality and meet technical standards. GISLAB supports testing needs for quality control, product evaluation, and conformity verification before use or market release.</p>

                        <h3 id="detailWhyTitle">Why is product and material quality testing important?</h3>
                        <p class="detail-copy" id="detailWhy">Without documented testing, companies risk making decisions based only on visual assumptions. Quality testing provides objective data to reduce the risk of product failure, customer complaints, and nonconformity with standards.</p>

                        <h3>Testing services we provide</h3>
                        <ul class="detail-list" id="detailList">
                            <li><i class="fa-solid fa-check"></i><span>Testing of physical and chemical characteristics according to product or material needs.</span></li>
                            <li><i class="fa-solid fa-check"></i><span>Sample quality checks to support quality control and quality assurance.</span></li>
                            <li><i class="fa-solid fa-check"></i><span>Analysis of test results as a basis for evaluating conformity with technical specifications.</span></li>
                        </ul>

                        <h3>Technical consultation and recommendations</h3>
                        <p class="detail-copy" id="detailConsult">The GISLAB team can help customers determine relevant test parameters based on product type, reference standards, and technical document needs, so testing follows the available scope and actual product requirements.</p>

                        <h3>Our Commitment</h3>
                        <p class="detail-copy" id="detailCommitment">GISLAB is committed to providing accurate, documented test results aligned with the available testing scope, giving customers a technically accountable basis for decision-making.</p>
                    </div>
                </article>

                <aside class="service-detail-sidebar">
                    <div class="sidebar-box">
                        <h3 class="sidebar-title">GISLAB Services</h3>
                        <button class="sidebar-link" type="button" data-service-detail="quality">Product & Material Quality Testing <i class="fa-solid fa-arrow-right"></i></button>
                        <button class="sidebar-link" type="button" data-service-detail="environment">Water & Environmental Testing <i class="fa-solid fa-arrow-right"></i></button>
                        <button class="sidebar-link" type="button" data-service-detail="permit">Ambient Air & Emission Testing <i class="fa-solid fa-arrow-right"></i></button>
                        <button class="sidebar-link" type="button" data-service-detail="sni">SNI Product Testing <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                    <div class="sidebar-box">
                        <h3 class="sidebar-title">Download GISLAB Profile</h3>
                        <p class="sidebar-note">Download the company profile for complete information about our testing, analysis, and laboratory support services.</p>
                        <a href="#" class="download-btn"><i class="fa-solid fa-file-pdf"></i> Download PDF</a>
                        <a href="#" class="download-btn"><i class="fa-solid fa-file-word"></i> Download Doc</a>
                    </div>
                    <div class="sidebar-box">
                        <h3 class="sidebar-title">Need parameter recommendations?</h3>
                        <p class="sidebar-note">Contact the GISLAB team to determine the most suitable test parameters for your product or environmental needs.</p>
                        <a href="/en/contact" class="detail-contact-btn"><i class="fa-solid fa-headset"></i> Contact Us</a>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <footer class="footer" id="kontak">
        <div class="container">
            <div class="footer-panel glass-dark">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo-wrap">
                            <img src="/landing/animation/logo-lab.png" alt="GIS Laboratory" class="footer-logo">
                            <div>
                                <h3 class="footer-brand-title">GIS Laboratory</h3>
                                <p class="footer-brand-subtitle">PT. Global Inspeksi Sistem</p>
                            </div>
                        </div>
                        <p class="footer-description">
                            GIS Laboratory serves as a testing partner that helps customers ensure the quality,
                            safety, and conformity of products and the environment through accurate
                            and reliable laboratory services.
                        </p>
                        <div class="footer-badges">
                            <span>Laboratory Testing</span>
                            <span>Environment</span>
                            <span>Lubricants</span>
                            <span>Palm Oil & Fertilizer</span>
                        </div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Contact</h4>
                        <div class="footer-text"><i class="fa-solid fa-envelope"></i><span>info@gislaboratorium.com</span></div>
                        <div class="footer-text" style="align-items: flex-start;">
                            <i class="fa-solid fa-phone" style="margin-top: 4px;"></i>
                            <div>+62 856-4504-6160<br>+62 812-8532-8232<br>+62 817-888-879</div>
                        </div>
                        <div class="footer-text"><i class="fa-solid fa-globe"></i><span>www.gislaboratorium.com</span></div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Link</h4>
                        <a href="/en" class="footer-link">Home</a>
                        <a href="/en/profile" class="footer-link">Profile</a>
                        <a href="/en/service" class="footer-link">Services</a>
                        <a href="/en/ruang-lingkup-pengujian" class="footer-link">Testing Scope</a>
                        <a href="/en/informasi" class="footer-link">Information</a>
                        <a href="/en/contact" class="footer-link">Contact</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">© 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.</div>
        </div>
    </footer>
    ${WHATSAPP_WIDGET_HTML}
`,
  },
  {
    key: "profile",
    title: "Company Profile - GIS Laboratory",
    description:
      "Company profile of Global Inspeksi Sistem Laboratory, including vision, mission, facilities, policies, and company commitments.",
    bodyClass: "liquid-bg font-body-md text-on-background min-h-screen",
    styles: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            --primary: #0A2540; --secondary: #0070F3; --accent: #00DFD8; --light-blue: #EBF4F8;
            --white: #FFFFFF; --text-dark: #1E293B; --text-muted: #64748B;
            --glass-dark-bg: rgba(10, 37, 64, 0.4); --glass-dark-border: rgba(255, 255, 255, 0.15);
            --shadow-soft: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
            --radius-pill: 100px; --radius-md: 24px; --radius-lg: 32px;
            --font-main: 'Plus Jakarta Sans', sans-serif; --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        body { background-color: #FAFCFF; overflow-x: hidden; position: relative; }
        body::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 15% 50%, rgba(0, 223, 216, 0.04), transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 112, 243, 0.04), transparent 25%); z-index: -1; pointer-events: none; }
        .glass-card { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(20px); border: 1px solid transparent; border-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2)) 1; box-shadow: 0px 0px 30px rgba(0, 122, 255, 0.1); }
        .profile-hero-card {
  border: none !important;
  border-image: none !important;
  outline: none !important;
  box-shadow: 0 24px 70px rgba(10, 37, 64, 0.12) !important;
}
        .glass-dark { background: var(--glass-dark-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-dark-border); color: var(--white); }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .liquid-bg { background: #FAFCFF; background-attachment: fixed; }
        .navbar-wrapper { position: fixed; top: 24px; left: 0; width: 100%; z-index: 1000; display: flex; justify-content: center; padding: 0 24px; transition: var(--transition); }
        .navbar-wrapper.scrolled { top: 12px; }
        .navbar { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1100px; padding: 12px 24px; border-radius: var(--radius-pill); background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.6); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); font-family: var(--font-main); }
        .nav-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.25rem; color: var(--primary); letter-spacing: -0.5px; text-decoration: none; }
        .nav-menu { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; }
        .nav-link { display: block; padding: 8px 16px; border-radius: var(--radius-pill); font-weight: 500; font-size: 0.95rem; color: var(--text-muted); transition: var(--transition); text-decoration: none; }
        .nav-link:hover { color: var(--primary); background: rgba(0, 112, 243, 0.05); }
        .nav-link.active { background: rgba(0, 223, 216, 0.15); color: var(--secondary); font-weight: 600; }
        .mobile-menu-btn { display: none; font-size: 1.5rem; color: var(--primary); background: none; border: none; cursor: pointer; }
        .profile-main { padding-top: 140px; }
        .profile-vm-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.profile-vm-card {
  position: relative;
  overflow: hidden;
  min-height: 390px;
  padding: 46px 42px;
  border-radius: 32px;
  border-left: 5px solid var(--primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: var(--transition);
}

.profile-vm-card::before {
  content: "";
  position: absolute;
  top: -90px;
  right: -90px;
  width: 210px;
  height: 210px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(0, 223, 216, 0.18), transparent 68%);
  opacity: 0.9;
}

.profile-vm-card::after {
  content: "";
  position: absolute;
  left: 34px;
  bottom: 30px;
  width: 72px;
  height: 72px;
  border-radius: 999px;
  border: 1px dashed rgba(0, 112, 243, 0.22);
}

.profile-vm-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 70px rgba(0, 112, 243, 0.15);
}

.profile-vm-card.mission {
  border-left-color: var(--primary-container);
}

.profile-vm-icon {
  position: relative;
  z-index: 2;
  width: 104px;
  height: 104px;
  margin: 0 auto 30px;
  border-radius: 34px;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(135deg, #0070F3, #00DFD8) border-box;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
  box-shadow:
    0 22px 46px rgba(0, 112, 243, 0.18),
    inset 0 0 0 10px rgba(0, 112, 243, 0.06);
  transition: var(--transition);
}

.profile-vm-icon::before {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: 40px;
  border: 1px dashed rgba(0, 112, 243, 0.24);
}

.profile-vm-icon::after {
  content: "";
  position: absolute;
  top: -7px;
  right: -7px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, #00DFD8, #0070F3);
  border: 5px solid #ffffff;
  box-shadow: 0 10px 20px rgba(0, 112, 243, 0.2);
}

.profile-vm-icon i {
  position: relative;
  z-index: 2;
  font-size: 2.6rem;
  line-height: 1;
}

.profile-vm-card:hover .profile-vm-icon {
  transform: translateY(-4px) scale(1.05);
}

.profile-vm-title {
  position: relative;
  z-index: 2;
  margin: 0 0 20px;
  color: var(--primary);
  font-size: clamp(1.55rem, 2vw, 2rem);
  font-weight: 900;
  line-height: 1.25;
}

.profile-vm-text {
  position: relative;
  z-index: 2;
  margin: 0;
  color: #334155;
  line-height: 1.85;
  text-align: justify;
  text-align-last: center;
}

.profile-vm-list {
  position: relative;
  z-index: 2;
  width: 100%;
  margin: 0;
  padding-left: 0;
  display: grid;
  gap: 14px;
  list-style: none;
  color: #334155;
  line-height: 1.65;
  text-align: left;
}

.profile-vm-list li {
  position: relative;
  padding-left: 34px;
}

.profile-vm-list li::before {
  content: "\\f058";
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  position: absolute;
  left: 0;
  top: 1px;
  color: var(--secondary);
}
        .specular-edge { border: 1px solid; border-image-source: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 100%); border-image-slice: 1; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .policy-tabs { position: relative; overflow: hidden; }
        .policy-tabs::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0, 112, 243, 0.08), transparent 45%), radial-gradient(circle at 90% 8%, rgba(0, 223, 216, 0.16), transparent 24%); pointer-events: none; }
        .policy-tab-nav { position: relative; z-index: 2; display: flex; gap: 12px; padding: 12px; margin: 0; list-style: none; background: rgba(255, 255, 255, 0.58); border: 1px solid rgba(255, 255, 255, 0.72); border-radius: 28px; }
        .policy-tab-button { flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; padding: 14px 18px; border: 0; border-radius: 20px; color: var(--text-muted); background: transparent; font-family: var(--font-main); font-weight: 800; font-size: 0.82rem; letter-spacing: 0; text-transform: uppercase; cursor: pointer; transition: var(--transition); }
        .policy-tab-button:hover { color: var(--primary); background: rgba(0, 112, 243, 0.06); }
        .policy-tab-button.active { color: #ffffff; background: linear-gradient(135deg, var(--primary), var(--secondary)); box-shadow: 0 16px 34px -18px rgba(0, 88, 188, 0.75); }
        .policy-tab-button .material-symbols-outlined { font-size: 22px; }
        .policy-tab-panel { display: none; position: relative; z-index: 1; padding: 48px; }
        .policy-tab-panel.active { display: block; }
        .policy-kicker { display: inline-flex; align-items: center; gap: 10px; color: var(--secondary); font-family: var(--font-main); font-size: 0.82rem; font-weight: 800; letter-spacing: 0; text-transform: uppercase; }
        .policy-copy { color: var(--text-dark); font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.85; text-align: justify; }
        .policy-signature { border-left: 4px solid var(--accent); padding-left: 18px; color: var(--primary); }
        .policy-contact-list { display: grid; gap: 10px; margin-top: 28px; padding: 0; list-style: none; }
        .policy-contact-list li { display: grid; grid-template-columns: 110px 1fr; gap: 14px; padding: 12px 0; border-top: 1px solid rgba(113, 119, 134, 0.18); color: var(--text-dark); font-family: 'Inter', sans-serif; line-height: 1.55; }
        .policy-contact-list strong { color: var(--primary); font-family: var(--font-main); font-size: 0.78rem; letter-spacing: 0; text-transform: uppercase; }
        .policy-tab-panel {
  width: 100%;
}

.policy-tab-panel.active {
  display: block;
}

.policy-copy {
  max-width: 100%;
}

.policy-tab-panel img,
.policy-tab-panel figure,
.policy-tab-panel picture,
.policy-portrait,
.policy-photo,
.policy-image,
.policy-figure,
.policy-visual,
.policy-panel-image,
.policy-panel-visual {
  display: none !important;
}

.policy-tab-panel > div {
  max-width: 100% !important;
}

.policy-tab-panel [style*="grid-template-columns"],
.policy-tab-panel [style*="display: grid"] {
  display: block !important;
  grid-template-columns: 1fr !important;
}
        .facility-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
  align-items: stretch;
}

.facility-card {
  min-height: 320px;
  padding: 42px 38px;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.facility-card:hover {
  background: rgba(255, 255, 255, 0.82);
  transform: translateY(-6px);
}

.facility-icon {
  position: relative;
  z-index: 2;
  width: 104px;
  height: 104px;
  margin: 0 auto 30px;
  border-radius: 34px;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(135deg, #0070F3, #00DFD8) border-box;
  border: 2px solid transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--secondary);
  box-shadow:
    0 22px 46px rgba(0, 112, 243, 0.18),
    inset 0 0 0 10px rgba(0, 112, 243, 0.06);
  transition: var(--transition);
}

.facility-icon::before {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: 40px;
  border: 1px dashed rgba(0, 112, 243, 0.24);
}

.facility-icon::after {
  content: "";
  position: absolute;
  top: -7px;
  right: -7px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, #00DFD8, #0070F3);
  border: 5px solid #ffffff;
  box-shadow: 0 10px 20px rgba(0, 112, 243, 0.2);
}

.facility-icon i,
.facility-icon .material-symbols-outlined {
  position: relative;
  z-index: 2;
  color: var(--secondary);
  font-size: 2.65rem;
  line-height: 1;
}

.facility-card:hover .facility-icon {
  transform: translateY(-4px) scale(1.05);
  box-shadow:
    0 28px 60px rgba(0, 112, 243, 0.24),
    inset 0 0 0 10px rgba(0, 112, 243, 0.08);
}

.facility-title {
  width: 100%;
  margin: 0 0 16px;
  color: #0A2540;
  font-weight: 900;
  text-align: center;
}

.facility-desc {
  width: 100%;
  margin: 0;
  color: var(--text-muted);
  text-align: justify;
  text-align-last: center;
  line-height: 1.75;
}

        .footer {
          position: relative;
          padding: 90px 0 42px;
          background:
            radial-gradient(circle at 15% 20%, rgba(0, 223, 216, 0.16), transparent 30%),
            radial-gradient(circle at 85% 10%, rgba(255, 255, 255, 0.1), transparent 28%),
            linear-gradient(135deg, var(--primary), #0d4778 52%, #105c96 100%);
          color: var(--white);
          overflow: hidden;
          font-family: var(--font-main);
        }
        .footer::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 54px 54px;
          opacity: 0.45;
          pointer-events: none;
        }
        .footer-panel {
          position: relative;
          z-index: 10;
          padding: clamp(34px, 4vw, 58px);
          border-radius: var(--radius-lg);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.85fr) minmax(220px, 0.6fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }
        .footer-brand { max-width: 520px; }
        .footer-logo-wrap {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }
        .footer-logo {
          width: 74px;
          height: 74px;
          object-fit: contain;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.94);
          padding: 10px;
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
        }
        .footer-brand-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.35rem, 2vw, 1.8rem);
          font-weight: 900;
          letter-spacing: -0.035em;
        }
        .footer-brand-subtitle {
          margin: 5px 0 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .footer-description {
          margin: 0;
          max-width: 500px;
          color: rgba(234, 246, 255, 0.82);
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.85;
        }
        .footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }
        .footer-badges span {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(0, 223, 216, 0.3);
          background: rgba(0, 223, 216, 0.1);
          color: #bffcfb;
          padding: 8px 13px;
          font-size: 0.78rem;
          font-weight: 800;
        }
        .footer-col-title {
          font-size: 1.18rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 24px;
        }
        .footer-text {
          color: rgba(234, 246, 255, 0.82);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 650;
          line-height: 1.65;
        }
        .footer-text i {
          width: 20px;
          color: var(--accent);
          text-align: center;
        }
        .footer-link {
          color: rgba(234, 246, 255, 0.82);
          transition: var(--transition);
          display: block;
          width: fit-content;
          margin-bottom: 13px;
          font-weight: 700;
          text-decoration: none;
        }
        .footer-link:hover {
          color: var(--accent);
          transform: translateX(6px);
        }
        .footer-bottom {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-top: 60px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.9rem;
          font-weight: 600;
        }
        @media (max-width: 900px) {
  .profile-vm-grid {
    grid-template-columns: 1fr;
  }

  .profile-vm-card {
    min-height: auto;
    padding: 36px 28px;
  }

  .profile-vm-icon {
    width: 90px;
    height: 90px;
    border-radius: 30px;
  }

  .profile-vm-icon i {
    font-size: 2.25rem;
  }
}
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer { padding: 64px 0 32px; }
          .footer-panel { padding: 30px 22px; border-radius: 28px; }
          .footer-grid { grid-template-columns: 1fr; gap: 34px; }
          .footer-logo-wrap { align-items: flex-start; }
          .footer-logo { width: 64px; height: 64px; border-radius: 20px; }
          .footer-badges span { font-size: 0.72rem; }
        }
        
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) {
            .navbar { padding: 12px 20px; }
            .nav-menu { position: absolute; top: 100%; left: 0; right: 0; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); flex-direction: column; padding: 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-soft); display: none; margin-top: 10px; }
            .nav-menu.active { display: flex; }
            .mobile-menu-btn { display: block; }
            .policy-tab-nav { flex-direction: column; border-radius: 24px; }
            .policy-tab-panel { padding: 32px 24px; }
            .policy-contact-list li { grid-template-columns: 1fr; gap: 4px; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-panel { padding: 32px 20px; }
        }
            ${WHATSAPP_WIDGET_STYLES}
    `,
    html: `
<header class="navbar-wrapper" id="navbar">
<nav class="navbar">
<a href="/en" class="nav-brand">
<img src="/landing/animation/logo-lab.png" style="height: 28px; width: auto; transform: scale(1.8); transform-origin: left center; margin-right: 36px;">
                Global Inspeksi Sistem
            </a>
<ul class="nav-menu" id="navMenu">
<li><a href="/en" class="nav-link">Home</a></li>
<li><a href="/en/profile" class="nav-link active">Profile</a></li>
<li><a href="/en/service" class="nav-link">Services</a></li>
<li><a href="/en/ruang-lingkup-pengujian" class="nav-link">Testing Scope</a></li>
<li class="nav-dropdown">
  <details>
    <summary class="nav-link nav-dropdown-trigger">
      Information <i class="fa-solid fa-chevron-down"></i>
    </summary>
    <div class="nav-dropdown-menu">
      <a href="/en/informasi" class="nav-dropdown-link">
        Articles <i class="fa-solid fa-newspaper"></i>
      </a>
      <a href="/en/informasi/keluhan-dan-banding" class="nav-dropdown-link">
        Complaints and Appeals <i class="fa-solid fa-comments"></i>
      </a>
      <a href="/verify" class="nav-dropdown-link">
        LHU Verification <i class="fa-solid fa-check-circle"></i>
      </a>
    </div>
  </details>
</li><li><a href="/en/contact" class="nav-link">Contact</a></li>
</ul>
<div class="nav-actions">
  <a href="/" class="language-switch" id="languageSwitch" aria-label="Switch to Indonesian" title="Switch to Indonesian">
    <i class="fa-solid fa-globe"></i>
    <span>ID</span>
  </a>

  <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">
    <i class="fas fa-bars"></i>
  </button>
</div>
</nav>
</header>
<main class="profile-main max-w-7xl mx-auto px-8 pb-16 space-y-[120px]">
<section class="relative h-[600px] rounded-[32px] overflow-hidden flex items-center justify-center">
<div class="absolute inset-0 bg-cover bg-center" data-alt="ultra-modern clean bright laboratory with futuristic glass equipment and scientific instruments in a soft blue atmospheric lighting" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhd3SPju_EcKUitBiUGdi5LM2CgMzbO_Y0lve9StPIQEtp-TWzEIXHOct2041e55OyWnmQVRMZzLsTopIp5xR6ofX60AzBiea6EdGEjr1UTXN1bHqSJ06GIcVBl05Gm6mwCEWf4z28g5R6SYenB8t-wCPCjKBLhXA80G3C0IdAzyxyM9bbofzJo6S4a74EMngUosxO1bsbN3MyqfXdXDVm3yxgG08lmmImklFa1WfWzFBI53c-b2CXLkhfYYPar4fE-gC9Xo_Jjqs\u0027')"></div>
<div class="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px]"></div>
<div class="relative z-10 glass-card profile-hero-card p-16 rounded-[32px] text-center max-w-4xl mx-4">
<h1 class="font-display-lg text-display-lg text-on-surface mb-6">Company Profile</h1>
<p class="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
                    Global Inspeksi Sistem (GIS) Laboratory delivers the highest standards of accuracy in water, environmental, and industrial testing services through future-ready technology innovation.
                </p>
</div>
</section>

<section class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div class="space-y-8">
<div>
<h2 class="font-headline-md text-headline-md text-primary mb-2">About Us</h2>
<div class="h-1 w-24 bg-primary-container rounded-full"></div>
</div>
<div class="glass-card p-12 rounded-[32px] space-y-6">
<p class="font-body-lg text-body-lg leading-relaxed text-on-surface">
                        Global Inspeksi Sistem (GIS) is an independent testing institution dedicated to delivering precise and impartial analytical results. It was established with a vision to become the gold standard for laboratory testing in Indonesia.
                    </p>
<p class="font-body-lg text-body-lg leading-relaxed text-on-surface">
                        Since its establishment, we have been committed to quality and integrity. With an experienced expert team and the support of up-to-date technology, we help industries ensure compliance with strict environmental and occupational safety standards.
                    </p>
</div>
</div>
<div class="relative">
<div class="absolute -inset-4 bg-primary/10 blur-[60px] rounded-full"></div>
<div class="relative glass-card rounded-[40px] overflow-hidden aspect-square">
<img class="w-full h-full object-cover" data-alt="microscopic view of crystalline structures in high-resolution detail with blue light refraction and scientific aesthetics" src="/landing/profile/laboratory-profile.png"/>
</div>
</div>
</section>

<section class="profile-vm-grid">
  <div class="glass-card profile-vm-card">
    <div class="profile-vm-icon">
      <i class="fa-solid fa-eye"></i>
    </div>

    <h3 class="profile-vm-title">Our Vision</h3>

    <p class="font-body-lg text-body-lg profile-vm-text">
      To become a leading water, environmental, and industrial testing laboratory in Indonesia,
      recognized nationally and internationally for accuracy, innovation, and professional integrity.
    </p>
  </div>

  <div class="glass-card profile-vm-card mission">
    <div class="profile-vm-icon">
      <i class="fa-solid fa-bullseye"></i>
    </div>

    <h3 class="profile-vm-title">Our Mission</h3>

    <ul class="font-body-lg text-body-lg profile-vm-list">
      <li>Provide accurate, reliable, and standard-aligned testing services.</li>
      <li>Continuously develop the competence of human resources.</li>
      <li>Integrate digital technology to support service efficiency.</li>
      <li>Support quality and environmental management through accountable testing data.</li>
    </ul>
  </div>
</section>

<section class="space-y-16">
  <div class="text-center space-y-4">
    <h2 class="font-headline-md text-headline-md text-on-surface">Facilities & Advantages</h2>
  </div>

  <div class="facility-grid">
  <div class="glass-card facility-card group">
    <div class="facility-icon">
      <i class="fa-solid fa-microscope"></i>
    </div>
    <h4 class="font-headline-sm text-headline-sm facility-title">Best-in-Class Equipment</h4>
    <p class="font-body-md facility-desc">
      Supported by advanced analytical instrumentation with high precision for reliable results.
    </p>
  </div>

  <div class="glass-card facility-card group">
    <div class="facility-icon">
      <i class="fa-solid fa-certificate"></i>
    </div>
    <h4 class="font-headline-sm text-headline-sm facility-title">Standardized Testing</h4>
    <p class="font-body-md facility-desc">
      Every testing procedure refers to applicable national (SNI) and international standards.
    </p>
  </div>

  <div class="glass-card facility-card group">
    <div class="facility-icon">
      <i class="fa-solid fa-microchip"></i>
    </div>
    <h4 class="font-headline-sm text-headline-sm facility-title">Latest Technology</h4>
    <p class="font-body-md facility-desc">
      Implementation of a digital-based laboratory management system for transparent and faster data access.
    </p>
  </div>
</div>
</section>

<section class="space-y-10">
<div class="text-center space-y-4">
<h2 class="font-headline-md text-headline-md text-on-surface">Policies & Commitments</h2>
<p class="text-secondary font-body-lg">Laboratory service integrity in every testing process</p>
</div>
<div class="glass-card policy-tabs rounded-[32px] p-4">
<ul class="policy-tab-nav mx-auto max-w-fit justify-center" role="tablist" aria-label="Company policies and commitments">
<li>
<button class="policy-tab-button active px-8" type="button" role="tab" aria-selected="true" aria-controls="planning-tab" id="planning-tab-button" data-policy-tab="planning-tab">
<span class="material-symbols-outlined" data-icon="balance">balance</span>
<span>Impartiality Policy</span>
</button>
</li>
<li>
<button class="policy-tab-button px-8" type="button" role="tab" aria-selected="false" aria-controls="research-tab" id="research-tab-button" data-policy-tab="research-tab">
<span class="material-symbols-outlined" data-icon="shield">shield</span>
<span>Anti-Bribery Commitment</span>
</button>
</li>
</ul>
<div class="tab-content">
<article id="planning-tab" class="policy-tab-panel active" role="tabpanel" aria-labelledby="planning-tab-button">
<div class="max-w-4xl mx-auto text-center md:text-left">
<span class="inline-block font-label-caps text-[14pt] bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent uppercase tracking-widest mb-3">Policy</span>
<h5 class="font-headline-md text-3xl font-bold text-slate-800 mb-8">Impartiality</h5>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-6">
                    The testing laboratory services conducted by PT. Global Inspeksi Sistem aim to ensure applicant or client confidence in the resulting products so that they meet the requirements of the National Standard (SNI), management systems, and other established requirements. This also aims to provide consumer protection and improve competitiveness in the domestic market. Every PT. Global Inspeksi Sistem personnel, according to their competence at all organizational levels, must meet the quality requirements of product testing laboratory and management system services, and avoid all forms of pressure, including commercial pressure, that may affect the quality of certification services. Product testing laboratory and management system services by Global Inspeksi Sistem Certification Body are carried out according to the established certification scope.
                </p>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-6">
                    Tangerang, 1 December 2016 <br>
                    PT Global Inspeksi Sistem
                </p>
<p class="text-justify text-on-surface font-body-lg leading-relaxed">
<span class="font-bold">Director</span><br><br>
                    Vera Marini
                </p>
</div>
</article>

<article id="research-tab" class="policy-tab-panel" role="tabpanel" aria-labelledby="research-tab-button">
<div class="max-w-4xl mx-auto text-center md:text-left">
<span class="inline-block font-label-caps text-[14pt] bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent uppercase tracking-widest mb-3">Commitment</span>
<h5 class="font-headline-md text-3xl font-bold text-slate-800 mb-8">Anti-Bribery</h5>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-6">
                    PT. Global Inspeksi Sistem is committed to implementing anti-bribery practices in the delivery of its certification and inspection services and in controlling bribery risks. Any fraud, dishonesty, theft/embezzlement, violations in the procurement of goods and services, abuse of position/authority, bribery, or gratification occurring at PT. Global Inspeksi Sistem or related to PT. Global Inspeksi Sistem should be reported so it can be followed up promptly. PT. Global Inspeksi Sistem analyzes reports and follows up on violation reports based on the evidence provided while protecting the reporter.
                </p>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-6">
                    This reporting is carried out with relevant supporting data and is intended for the interests of the Company, not to pressure any individual. Reports may be submitted to the Director of Global Konstruksi Sertifikasi or to the General Information Department through the following contact information:
                </p>
<div class="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-2xl p-6 md:p-8 mb-6 font-body-md text-on-surface text-left">
<div class="grid grid-cols-[100px_1fr] sm:grid-cols-[160px_1fr] gap-y-3 gap-x-4 break-words">
<div class="font-bold text-primary">Mail</div><div>globalinspeksisistem@gmail.com</div>
<div class="font-bold text-primary">Phone</div><div>+62 856-4504-6160<br>+62 812-8532-8232<br>+62 817-888-879</div>
<div class="font-bold text-primary">Website</div><div>www.gislaboratorium.com</div>
<div class="font-bold text-primary">Mailing Address</div><div>PT. Global Inspeksi Sistem</div>
<div class="font-bold text-primary">Head Office (Surabaya)</div><div>Jl. Pahlawan No.2, Kwadengan Barat, Lemahputro, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61213</div>
</div>
</div>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-8">
                    Reporters must provide their identity when submitting complaints and ensure that all information about the reporter's identity and report is kept confidential. Reporting is carried out under the principles of anonymity, confidentiality, and independence.
                </p>
<p class="text-justify text-on-surface font-body-lg leading-relaxed">
<span class="font-bold">Director</span><br><br>
                    Vera Marini
                </p>
</div>
</article>
</div>
</div>
</section>
</main>

<footer class="footer" id="kontak">
        <div class="container">
            <div class="footer-panel glass-dark">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo-wrap">
                            <img src="/landing/animation/logo-lab.png" alt="GIS Laboratory" class="footer-logo">
                            <div>
                                <h3 class="footer-brand-title">GIS Laboratory</h3>
                                <p class="footer-brand-subtitle">PT. Global Inspeksi Sistem</p>
                            </div>
                        </div>
                        <p class="footer-description">
                            GIS Laboratory serves as a testing partner that helps customers ensure the quality,
                            safety, and conformity of products and the environment through accurate
                            and reliable laboratory services.
                        </p>
                        <div class="footer-badges">
                            <span>Laboratory Testing</span>
                            <span>Environment</span>
                            <span>Lubricants</span>
                            <span>Palm Oil & Fertilizer</span>
                        </div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Contact</h4>
                        <div class="footer-text"><i class="fa-solid fa-envelope"></i><span>info@gislaboratorium.com</span></div>
                        <div class="footer-text" style="align-items: flex-start;">
                            <i class="fa-solid fa-phone" style="margin-top: 4px;"></i>
                            <div>+62 856-4504-6160<br>+62 812-8532-8232<br>+62 817-888-879</div>
                        </div>
                        <div class="footer-text"><i class="fa-solid fa-globe"></i><span>www.gislaboratorium.com</span></div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Link</h4>
                        <a href="/en" class="footer-link">Home</a>
                        <a href="/en/profile" class="footer-link">Profile</a>
                        <a href="/en/service" class="footer-link">Services</a>
                        <a href="/en/ruang-lingkup-pengujian" class="footer-link">Testing Scope</a>
                        <a href="/en/informasi" class="footer-link">Information</a>
                        <a href="/en/contact" class="footer-link">Contact</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">© 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.</div>
        </div>
    </footer>

${WHATSAPP_WIDGET_HTML}
`,
  },
  {
    key: "service",
    title: "Services | GIS Laboratory",
    description:
      "Product and material quality testing, water and environmental testing, ambient air and emission testing, and SNI product testing services by GIS Laboratory.",
    bodyClass:
      "bg-background font-body-md text-on-background selection:bg-primary selection:text-white",
    styles: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            --gis-primary: #0A2540; --gis-secondary: #0070F3; --gis-accent: #00DFD8; --gis-light-blue: #EBF4F8;
            --gis-white: #FFFFFF; --gis-text-muted: #64748B;
            --gis-glass-dark-bg: rgba(10, 37, 64, 0.4); --gis-glass-dark-border: rgba(255, 255, 255, 0.15);
            --gis-shadow-soft: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
            --gis-radius-pill: 100px; --gis-radius-md: 24px; --gis-radius-lg: 32px;
            --gis-font-main: 'Plus Jakarta Sans', sans-serif; --gis-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .navbar-wrapper { position: fixed; top: 24px; left: 0; width: 100%; z-index: 1000; display: flex; justify-content: center; padding: 0 24px; transition: var(--gis-transition); }
        .navbar-wrapper.scrolled { top: 12px; }
        .navbar { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1100px; padding: 12px 24px; border-radius: var(--gis-radius-pill); background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.6); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); font-family: var(--gis-font-main); }
        .nav-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.25rem; color: var(--gis-primary); letter-spacing: -0.5px; text-decoration: none; }
        .nav-brand img { height: 28px; width: auto; transform: scale(1.8); transform-origin: left center; margin-right: 36px; }
        .nav-menu { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; }
        .nav-link { display: block; padding: 8px 16px; border-radius: var(--gis-radius-pill); font-weight: 500; font-size: 0.95rem; color: var(--gis-text-muted); transition: var(--gis-transition); text-decoration: none; }
        .nav-link:hover { color: var(--gis-primary); background: rgba(0, 112, 243, 0.05); }
        .nav-link.active { background: rgba(0, 223, 216, 0.15); color: var(--gis-secondary); font-weight: 600; }
        .mobile-menu-btn { display: none; font-size: 1.5rem; color: var(--gis-primary); background: none; border: none; cursor: pointer; }
        .gis-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .glass-dark { background: var(--gis-glass-dark-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--gis-glass-dark-border); color: var(--gis-white); }
        .glass { background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: var(--gis-shadow-soft); }
        .services-section { padding: 100px 0 58px; text-align: center; font-family: var(--gis-font-main); }
        .services-header { margin-bottom: 42px; }
        .section-title { font-size: 2.5rem; font-weight: 800; color: var(--gis-primary); margin-bottom: 24px; }
        .carousel-container { position: relative; padding: 0; overflow: visible; width: 100%; }
        .services-track { display: flex; flex-direction: column; gap: 24px; width: 100%; animation: none; }
        .services-track:hover { animation-play-state: initial; }
        .service-card { width: 100%; min-height: 220px; border-radius: var(--gis-radius-lg); overflow: hidden; text-align: left; transition: var(--gis-transition); display: grid; grid-template-columns: minmax(260px, 360px) minmax(0, 1fr); cursor: pointer; color: inherit; }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -10px rgba(0, 112, 243, 0.15); }
        .service-card.active-service { border-color: rgba(0, 112, 243, 0.35); box-shadow: 0 22px 46px -18px rgba(0, 112, 243, 0.25); }
        .service-card:focus-visible { outline: 4px solid rgba(0, 112, 243, 0.18); outline-offset: 4px; }
        .service-img { height: 100%; min-height: 220px; width: 100%; object-fit: cover; display: block; }
        .service-content { padding: 34px 38px; min-height: 220px; display: flex; flex-direction: column; justify-content: center; }
        .service-title { font-size: clamp(1.35rem, 2.6vw, 2rem); font-weight: 800; color: var(--gis-primary); margin-bottom: 12px; letter-spacing: -0.01em; }
        .service-desc { max-width: 760px; color: #405a70; font-size: 1rem; font-weight: 600; line-height: 1.75; margin-bottom: 22px; }
        .service-btn { margin-top: auto; align-self: flex-start; background: transparent; color: var(--gis-secondary); font-weight: 800; border: 1px solid rgba(0, 112, 243, 0.2); padding: 10px 22px; border-radius: var(--gis-radius-pill); transition: var(--gis-transition); }
        .service-card:hover .service-btn { background: var(--gis-secondary); color: var(--gis-white); border-color: var(--gis-secondary); }
        .service-detail-section { display: none; padding: 24px 0 100px; font-family: var(--gis-font-main); }
        .service-detail-section.active { display: block; }
        .service-detail-layout { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.7fr); gap: 32px; align-items: start; }
        .service-detail-article, .service-detail-sidebar { border-radius: var(--gis-radius-lg); background: rgba(255, 255, 255, 0.72); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.82); box-shadow: var(--gis-shadow-soft); }
        .service-detail-article { overflow: hidden; }
        .detail-cover { width: 100%; height: 360px; object-fit: cover; display: block; }
        .detail-body { padding: 42px; }
        .detail-kicker { display: inline-flex; align-items: center; gap: 10px; color: var(--gis-secondary); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .detail-title { margin-top: 14px; color: var(--gis-primary); font-size: clamp(2rem, 4vw, 3.35rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.02em; }
        .detail-copy { margin-top: 22px; color: #405a70; font-size: 1.02rem; font-weight: 600; line-height: 1.85; text-align: justify; }
        .detail-body h3 { margin-top: 34px; color: var(--gis-primary); font-size: 1.4rem; font-weight: 800; }
        .detail-list { display: grid; gap: 14px; margin-top: 18px; padding: 0; list-style: none; }
        .detail-list li { display: flex; align-items: flex-start; gap: 12px; color: #405a70; font-weight: 600; line-height: 1.7; }
        .detail-list i { margin-top: 6px; color: var(--gis-accent); }
        .service-detail-sidebar { position: sticky; top: 110px; padding: 28px; }
        .sidebar-box + .sidebar-box { margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(10, 37, 64, 0.1); }
        .sidebar-title { color: var(--gis-primary); font-size: 1.1rem; font-weight: 800; margin-bottom: 14px; }
        .sidebar-link { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; border: 0; background: transparent; padding: 12px 0; color: #405a70; font-weight: 700; text-align: left; cursor: pointer; border-bottom: 1px solid rgba(10, 37, 64, 0.08); }
        .sidebar-link:hover { color: var(--gis-secondary); }
        .download-btn, .detail-contact-btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; width: 100%; margin-top: 12px; padding: 12px 18px; border-radius: var(--gis-radius-pill); color: var(--gis-white); background: linear-gradient(135deg, var(--gis-secondary), var(--gis-accent)); font-weight: 800; text-decoration: none; transition: var(--gis-transition); }
        .download-btn:hover, .detail-contact-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 34px -22px rgba(0, 112, 243, 0.7); }
        .sidebar-note { color: var(--gis-text-muted); font-size: 0.95rem; font-weight: 600; line-height: 1.7; }
        

        .footer {
          position: relative;
          padding: 90px 0 42px;
          background:
            radial-gradient(circle at 15% 20%, rgba(0, 223, 216, 0.16), transparent 30%),
            radial-gradient(circle at 85% 10%, rgba(255, 255, 255, 0.1), transparent 28%),
            linear-gradient(135deg, var(--gis-primary), #0d4778 52%, #105c96 100%);
          color: var(--gis-white);
          overflow: hidden;
          font-family: var(--gis-font-main);
        }
        .footer::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 54px 54px;
          opacity: 0.45;
          pointer-events: none;
        }
        .footer-panel {
          position: relative;
          z-index: 10;
          padding: clamp(34px, 4vw, 58px);
          border-radius: var(--gis-radius-lg);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.85fr) minmax(220px, 0.6fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }
        .footer-brand { max-width: 520px; }
        .footer-logo-wrap {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }
        .footer-logo {
          width: 74px;
          height: 74px;
          object-fit: contain;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.94);
          padding: 10px;
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
        }
        .footer-brand-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.35rem, 2vw, 1.8rem);
          font-weight: 900;
          letter-spacing: -0.035em;
        }
        .footer-brand-subtitle {
          margin: 5px 0 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .footer-description {
          margin: 0;
          max-width: 500px;
          color: rgba(234, 246, 255, 0.82);
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.85;
        }
        .footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }
        .footer-badges span {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(0, 223, 216, 0.3);
          background: rgba(0, 223, 216, 0.1);
          color: #bffcfb;
          padding: 8px 13px;
          font-size: 0.78rem;
          font-weight: 800;
        }
        .footer-col-title {
          font-size: 1.18rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 24px;
        }
        .footer-text {
          color: rgba(234, 246, 255, 0.82);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 650;
          line-height: 1.65;
        }
        .footer-text i {
          width: 20px;
          color: var(--gis-accent);
          text-align: center;
        }
        .footer-link {
          color: rgba(234, 246, 255, 0.82);
          transition: var(--gis-transition);
          display: block;
          width: fit-content;
          margin-bottom: 13px;
          font-weight: 700;
          text-decoration: none;
        }
        .footer-link:hover {
          color: var(--gis-accent);
          transform: translateX(6px);
        }
        .footer-bottom {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-top: 60px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.9rem;
          font-weight: 600;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer { padding: 64px 0 32px; }
          .footer-panel { padding: 30px 22px; border-radius: 28px; }
          .footer-grid { grid-template-columns: 1fr; gap: 34px; }
          .footer-logo-wrap { align-items: flex-start; }
          .footer-logo { width: 64px; height: 64px; border-radius: 20px; }
          .footer-badges span { font-size: 0.72rem; }
        }
        
        .glass-panel { backdrop-filter: blur(20px); background: rgba(255, 255, 255, 0.65); border: 1px solid transparent; border-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2)) 1; }
        .liquid-bg { background: radial-gradient(circle at top left, #f8f9ff 0%, #e5eeff 50%, #d8e2ff 100%); position: fixed; inset: 0; z-index: -1; }
        .glossy-button { position: relative; overflow: hidden; }
        .glossy-button::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent); transform: rotate(45deg); transition: 0.5s; }
        .glossy-button:hover::after { left: 100%; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) {
            .navbar { padding: 12px 20px; }
            .nav-brand { font-size: 1rem; }
            .nav-brand img { margin-right: 26px; transform: scale(1.55); }
            .nav-menu { position: absolute; top: 100%; left: 24px; right: 24px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); flex-direction: column; padding: 20px; border-radius: var(--gis-radius-md); box-shadow: var(--gis-shadow-soft); display: none; margin-top: 10px; }
            .nav-menu.active { display: flex; }
            .mobile-menu-btn { display: block; }
            .footer-grid { grid-template-columns: 1fr; }
            .footer-panel { padding: 32px 20px; }
            .service-card { grid-template-columns: 1fr; min-height: auto; }
            .service-img { min-height: 220px; height: 220px; }
            .service-content { padding: 26px 22px; min-height: auto; }
            .service-detail-layout { grid-template-columns: 1fr; }
            .service-detail-sidebar { position: static; }
            .detail-cover { height: 260px; }
            .detail-body { padding: 28px 22px; }
        }
            ${WHATSAPP_WIDGET_STYLES}
    `,
    html: `
<div class="liquid-bg"></div>
<header class="navbar-wrapper" id="navbar">
<nav class="navbar">
<a href="/en" class="nav-brand">
<img src="/landing/animation/logo-lab.png" alt="GISLAB">
                Global Inspeksi Sistem
            </a>
<ul class="nav-menu" id="navMenu">
<li><a href="/en" class="nav-link">Home</a></li>
<li><a href="/en/profile" class="nav-link">Profile</a></li>
<li><a href="/en/service" class="nav-link active">Services</a></li>
<li><a href="/en/ruang-lingkup-pengujian" class="nav-link">Testing Scope</a></li>
<li class="nav-dropdown">
  <details>
    <summary class="nav-link nav-dropdown-trigger">
      Information <i class="fa-solid fa-chevron-down"></i>
    </summary>
    <div class="nav-dropdown-menu">
      <a href="/en/informasi" class="nav-dropdown-link">
        Articles <i class="fa-solid fa-newspaper"></i>
      </a>
      <a href="/en/informasi/keluhan-dan-banding" class="nav-dropdown-link">
        Complaints and Appeals <i class="fa-solid fa-comments"></i>
      </a>
      <a href="/verify" class="nav-dropdown-link">
        LHU Verification <i class="fa-solid fa-check-circle"></i>
      </a>
    </div>
  </details>
</li><li><a href="/en/contact" class="nav-link">Contact</a></li>
</ul>
<div class="nav-actions">
  <a href="/" class="language-switch" id="languageSwitch" aria-label="Switch to Indonesian" title="Switch to Indonesian">
    <i class="fa-solid fa-globe"></i>
    <span>ID</span>
  </a>

  <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">
    <i class="fas fa-bars"></i>
  </button>
</div>
</nav>
</header>
<main>
<section class="relative h-[614px] flex items-center justify-center overflow-hidden">
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover opacity-30" data-alt="A clean, futuristic laboratory interior with white surfaces and blue glowing ambient light. High-end scientific equipment like chromatographs and microscopes are arranged on sleek glass benches. The atmosphere is clinical, visionary, and hyper-modern, reflecting a top-tier digital biotech environment with soft depth of field." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8V5p_RQ85djBobSPDB33E4q8H_dWpqkxXSH1O0Ei07dCwGWxdVAv69f4vCt9keM2BFgJtW3FW10wSrdR9rcumQAL2tNoOUaDFoHsKyVZGpY88MifcLJU5lXEzM9vF44gKlzH2lwrTn3etldj38lFUBIkEbwLUgPuz02BPqaQZTIRNhWS892Pd2rKAqAXRgxlN8PcF5vnqWMtl4FkrIc2xXgmi11G-suRtv2EIlAnH6zE3kPDuZN72t2sIYRdnWa5Ln2QEI0fL57k"/>
</div>
<div class="relative z-10 text-center px-4 max-w-4xl">
<h1 class="font-display-lg text-display-lg text-primary mb-4">GIS Laboratory Services</h1>
<p class="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
                    Delivering accurate testing results through measurable, documented, and scope-aligned analysis processes. GIS Laboratory supports chemical, biological, and environmental testing needs with clear, reliable, and accountable data.
                </p>
</div>
</section>
<section class="services-section" id="layanan">
<div class="gis-container">
<div class="services-header">
<h2 class="section-title">Our Services</h2>
</div>

<div class="carousel-container">
<div class="services-track">
<article class="service-card glass" role="button" tabindex="0" data-service-detail="quality" aria-label="View details for Product and Material Quality Testing">
<img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=900"
alt="Product and material quality testing" class="service-img">
<div class="service-content">
<h3 class="service-title">Product & Material Quality Testing</h3>
<p class="service-desc">Product and material quality testing services within the GISLAB scope, including lubricants, palm-based products, fertilizers, palm cooking oil, red palm cooking oil, and other technical products.</p>
<span class="service-btn">Read More</span>
</div>
</article>

<article class="service-card glass" role="button" tabindex="0" data-service-detail="environment" aria-label="View details for Water and Environmental Testing">
<img src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=900"
alt="Water and environmental testing" class="service-img">
<div class="service-content">
<h3 class="service-title">Water & Environmental Testing</h3>
<p class="service-desc">Water and environmental testing to monitor the quality of clean water, wastewater, drinking water, mineral water, demineralized water, and natural water sources based on laboratory data.</p>
<span class="service-btn">Read More</span>
</div>
</article>

<article class="service-card glass" role="button" tabindex="0" data-service-detail="permit" aria-label="View details for Ambient Air and Emission Testing">
<img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=900"
alt="Ambient air and emission testing" class="service-img">
<div class="service-content">
<h3 class="service-title">Ambient Air & Emission Testing</h3>
<p class="service-desc">Ambient air and stationary source emission testing to support monitoring, emission control evaluation, and environmental requirement compliance.</p>
<span class="service-btn">Read More</span>
</div>
</article>

<article class="service-card glass" role="button" tabindex="0" data-service-detail="sni" aria-label="View details for SNI Product Testing">
<img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900"
alt="SNI product testing" class="service-img">
<div class="service-content">
<h3 class="service-title">SNI Product Testing</h3>
<p class="service-desc">Product testing based on SNI requirements within the GISLAB scope to support certification, quality verification, and market trust.</p>
<span class="service-btn">Read More</span>
</div>
</article>
</div>
</div>
</div>
</section>
<section class="service-detail-section" id="detail-layanan" aria-live="polite">
<div class="gis-container">
<div class="service-detail-layout">
<article class="service-detail-article">
<img id="detailCover" class="detail-cover" src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=1200" alt="Laboratory testing">
<div class="detail-body">
<span class="detail-kicker"><i class="fa-solid fa-flask-vial"></i> Service Details</span>
<h2 class="detail-title" id="detailTitle">Product & Material Quality Testing</h2>
<p class="detail-copy" id="detailIntro">
Product and material quality testing helps companies ensure that product characteristics meet standards, technical specifications, and customer requirements. This service is aligned with the GISLAB testing scope, including lubricants, palm-based products, fertilizers, palm cooking oil, red palm cooking oil, and other technical products.
</p>

<h3 id="detailWhyTitle">Why is product and material quality testing important?</h3>
<p class="detail-copy" id="detailWhy">
Product quality cannot be assessed from appearance alone. Laboratory data is required to verify parameters such as moisture content, impurity content, viscosity, flash point, pour point, element content, and other technical parameters required by standards.
</p>

<h3>Testing services we provide</h3>
<ul class="detail-list" id="detailList">
<li><i class="fa-solid fa-check"></i><span>Testing of lubricating oils and lubricants, such as kinematic viscosity, flash point, pour point, copper strip corrosion, total base number, density, and certain elemental parameters.</span></li>
<li><i class="fa-solid fa-check"></i><span>Testing of palm products and derivatives, such as Crude Palm Oil, Palm Kernel, RBD Palm Olein, palm cooking oil, and red palm cooking oil.</span></li>
<li><i class="fa-solid fa-check"></i><span>Testing of fertilizers, such as NPK, Urea, KCl, Natural Phosphate, ZA, TSP, SP36, Borate, and Kieserite according to parameters available within the scope.</span></li>
</ul>

<h3>Technical consultation and recommendations</h3>
<p class="detail-copy" id="detailConsult">
The GISLAB team can help customers determine relevant test parameters based on product type, reference standards, and technical document needs, so testing follows the available scope and actual product requirements.
</p>

<h3>Our Commitment</h3>
<p class="detail-copy" id="detailCommitment">
GISLAB is committed to providing accurate, documented test results aligned with the available testing scope, giving customers a technically accountable basis for decision-making.
</p>
</div>
</article>

<aside class="service-detail-sidebar">
<div class="sidebar-box">
<h3 class="sidebar-title">GISLAB Services</h3>
<button class="sidebar-link" type="button" data-service-detail="quality">Product & Material Quality Testing <i class="fa-solid fa-arrow-right"></i></button>
<button class="sidebar-link" type="button" data-service-detail="environment">Water & Environmental Testing <i class="fa-solid fa-arrow-right"></i></button>
<button class="sidebar-link" type="button" data-service-detail="permit">Ambient Air & Emission Testing <i class="fa-solid fa-arrow-right"></i></button>
<button class="sidebar-link" type="button" data-service-detail="sni">SNI Product Testing <i class="fa-solid fa-arrow-right"></i></button>
</div>
<div class="sidebar-box">
<h3 class="sidebar-title">Download GISLAB Profile</h3>
<p class="sidebar-note">Download the company profile for complete information about our testing, analysis, and laboratory support services.</p>
<a href="#" class="download-btn"><i class="fa-solid fa-file-pdf"></i> Download PDF</a>
<a href="#" class="download-btn"><i class="fa-solid fa-file-word"></i> Download Doc</a>
</div>
<div class="sidebar-box">
<h3 class="sidebar-title">Need parameter recommendations?</h3>
<p class="sidebar-note">Contact the GISLAB team to determine the most suitable test parameters for your product or environmental needs.</p>
<a href="/en/contact" class="detail-contact-btn"><i class="fa-solid fa-headset"></i> Contact Us</a>
</div>
</aside>
</div>
</div>
</section>
</main>
<footer class="footer" id="kontak">
        <div class="gis-container">
            <div class="footer-panel glass-dark">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo-wrap">
                            <img src="/landing/animation/logo-lab.png" alt="GIS Laboratory" class="footer-logo">
                            <div>
                                <h3 class="footer-brand-title">GIS Laboratory</h3>
                                <p class="footer-brand-subtitle">PT. Global Inspeksi Sistem</p>
                            </div>
                        </div>
                        <p class="footer-description">
                            GIS Laboratory serves as a testing partner that helps customers ensure the quality,
                            safety, and conformity of products and the environment through accurate
                            and reliable laboratory services.
                        </p>
                        <div class="footer-badges">
                            <span>Laboratory Testing</span>
                            <span>Environment</span>
                            <span>Lubricants</span>
                            <span>Palm Oil & Fertilizer</span>
                        </div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Contact</h4>
                        <div class="footer-text"><i class="fa-solid fa-envelope"></i><span>info@gislaboratorium.com</span></div>
                        <div class="footer-text" style="align-items: flex-start;">
                            <i class="fa-solid fa-phone" style="margin-top: 4px;"></i>
                            <div>+62 856-4504-6160<br>+62 812-8532-8232<br>+62 817-888-879</div>
                        </div>
                        <div class="footer-text"><i class="fa-solid fa-globe"></i><span>www.gislaboratorium.com</span></div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Link</h4>
                        <a href="/en" class="footer-link">Home</a>
                        <a href="/en/profile" class="footer-link">Profile</a>
                        <a href="/en/service" class="footer-link">Services</a>
                        <a href="/en/ruang-lingkup-pengujian" class="footer-link">Testing Scope</a>
                        <a href="/en/informasi" class="footer-link">Information</a>
                        <a href="/en/contact" class="footer-link">Contact</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">© 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.</div>
        </div>
    </footer>
    ${WHATSAPP_WIDGET_HTML}
`,
  },
  {
    key: "contact",
    title: "Contact - GIS Laboratory",
    description:
      "Contact GIS Laboratory for testing, certification, inspection, and laboratory parameter consultation needs.",
    bodyClass: "",
    styles: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            --primary: #0A2540; --secondary: #0070F3; --accent: #00DFD8; --light-blue: #EBF4F8;
            --white: #FFFFFF; --text-dark: #1E293B; --text-muted: #64748B;
            --glass-bg: rgba(255, 255, 255, 0.72); --glass-border: rgba(255, 255, 255, 0.82);
            --glass-dark-bg: rgba(10, 37, 64, 0.4); --glass-dark-border: rgba(255, 255, 255, 0.15);
            --shadow-soft: 0 10px 40px -10px rgba(0, 0, 0, 0.08); --shadow-hover: 0 22px 46px -20px rgba(0, 112, 243, 0.28);
            --radius-pill: 100px; --radius-md: 24px; --radius-lg: 32px;
            --font-main: 'Plus Jakarta Sans', sans-serif; --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-main); color: var(--text-dark); background-color: #FAFCFF; line-height: 1.6; overflow-x: hidden; position: relative; }
        body::before { content: ''; position: fixed; inset: 0; background: radial-gradient(circle at 14% 34%, rgba(0, 223, 216, 0.08), transparent 27%), radial-gradient(circle at 88% 14%, rgba(0, 112, 243, 0.08), transparent 28%), linear-gradient(180deg, #FAFCFF 0%, #EFF6FF 100%); z-index: -2; pointer-events: none; }
        a { color: inherit; text-decoration: none; }
        ul { list-style: none; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        .glass { background: var(--glass-bg); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid var(--glass-border); box-shadow: var(--shadow-soft); }
        .glass-dark { background: var(--glass-dark-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-dark-border); color: var(--white); }
        .navbar-wrapper { position: fixed; top: 24px; left: 0; width: 100%; z-index: 1000; display: flex; justify-content: center; padding: 0 24px; transition: var(--transition); }
        .navbar-wrapper.scrolled { top: 12px; }
        .navbar { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1100px; padding: 12px 24px; border-radius: var(--radius-pill); background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.6); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); }
        .nav-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.25rem; color: var(--primary); letter-spacing: 0; }
        .nav-brand img { height: 28px; width: auto; transform: scale(1.8); transform-origin: left center; margin-right: 36px; }
        .nav-menu { display: flex; gap: 8px; }
        .nav-link { display: block; padding: 8px 16px; border-radius: var(--radius-pill); font-weight: 500; font-size: 0.95rem; color: var(--text-muted); transition: var(--transition); }
        .nav-link:hover { color: var(--primary); background: rgba(0, 112, 243, 0.05); }
        .nav-link.active { background: rgba(0, 223, 216, 0.15); color: var(--secondary); font-weight: 600; }
        .mobile-menu-btn { display: none; font-size: 1.5rem; color: var(--primary); background: none; border: none; cursor: pointer; }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 24px; border-radius: var(--radius-pill); border: none; cursor: pointer; font-family: inherit; font-size: 1rem; font-weight: 800; transition: var(--transition); }
        .btn-primary { color: var(--white); background: linear-gradient(135deg, var(--secondary), var(--accent)); box-shadow: 0 16px 34px -22px rgba(0, 112, 243, 0.85); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }
        .contact-main { padding-top: 118px; }
        .contact-hero { position: relative; min-height: 560px; display: flex; align-items: center; overflow: hidden; border-radius: var(--radius-lg); margin: 24px auto 0; }
        .contact-hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10, 37, 64, 0.82), rgba(10, 37, 64, 0.42), rgba(250, 252, 255, 0.26)), url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1800') center/cover; z-index: 0; }
        .contact-hero::after { content: ''; position: absolute; inset: auto 0 0; height: 40%; background: linear-gradient(0deg, rgba(250, 252, 255, 0.96), transparent); z-index: 1; }
        .hero-content { position: relative; z-index: 2; width: min(680px, 100%); padding: 72px 56px; color: var(--white); }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 20px; color: var(--accent); font-size: 0.82rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .hero-title { color: var(--white); font-size: clamp(2.4rem, 5vw, 4.6rem); font-weight: 800; line-height: 1.05; letter-spacing: 0; margin-bottom: 22px; }
        .hero-text { max-width: 600px; color: rgba(255, 255, 255, 0.86); font-size: 1.1rem; font-weight: 600; }
        .quick-contact { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: -58px; position: relative; z-index: 5; }
        .quick-card { min-height: 150px; padding: 28px; border-radius: var(--radius-md); transition: var(--transition); }
        .quick-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }
        .quick-icon { width: 48px; height: 48px; display: inline-flex; align-items: center; justify-content: center; border-radius: 16px; color: var(--secondary); background: rgba(0, 112, 243, 0.1); font-size: 1.25rem; margin-bottom: 18px; }
        .quick-label { color: var(--primary); font-size: 1.05rem; font-weight: 800; margin-bottom: 8px; }
        .quick-value { color: #405a70; font-weight: 700; overflow-wrap: anywhere; }
        .section { padding: 96px 0; }
        .section-header { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 40px; align-items: end; margin-bottom: 42px; }
        .section-title { color: var(--primary); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800; line-height: 1.12; letter-spacing: 0; }
        .section-copy { color: #405a70; font-size: 1.05rem; font-weight: 600; line-height: 1.8; }
        .office-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
        .office-card { display: grid; grid-template-rows: 230px 1fr; overflow: hidden; border-radius: var(--radius-lg); }
        .office-image { position: relative; overflow: hidden; }
        .office-image img { width: 100%; height: 100%; display: block; object-fit: cover; transition: transform 0.45s ease; }
        .office-card:hover .office-image img { transform: scale(1.05); }
        .office-body { padding: 34px; }
        .office-kicker { color: var(--secondary); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
        .office-title { color: var(--primary); font-size: 1.5rem; font-weight: 800; margin-bottom: 18px; }
        .office-list { display: grid; gap: 14px; }
        .office-list li { display: flex; align-items: flex-start; gap: 12px; color: #405a70; font-weight: 650; }
        .office-list i { width: 20px; margin-top: 5px; color: var(--accent); }
        .contact-panel { display: grid; grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.18fr); gap: 28px; align-items: stretch; }
        .contact-info-panel, .form-panel { border-radius: var(--radius-lg); padding: 38px; }
        .contact-info-panel { color: var(--white); background: linear-gradient(135deg, rgba(10, 37, 64, 0.96), rgba(0, 88, 188, 0.84)), url('https://images.unsplash.com/photo-1581092919535-7146ff1a590b?auto=format&fit=crop&q=80&w=1200') center/cover; box-shadow: var(--shadow-soft); }
        .contact-info-panel .section-title { color: var(--white); font-size: clamp(2rem, 4vw, 2.8rem); margin-bottom: 18px; }
        .contact-info-panel p { color: rgba(255, 255, 255, 0.82); font-weight: 600; margin-bottom: 28px; }
        .info-list { display: grid; gap: 18px; }
        .info-item { display: flex; gap: 14px; align-items: flex-start; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.16); }
        .info-item i { width: 44px; height: 44px; flex: 0 0 44px; display: inline-flex; align-items: center; justify-content: center; border-radius: 14px; background: rgba(255, 255, 255, 0.12); color: var(--accent); }
        .info-item strong { display: block; color: var(--white); font-weight: 800; margin-bottom: 4px; }
        .info-item span { color: rgba(255, 255, 255, 0.82); font-weight: 600; overflow-wrap: anywhere; }
        .form-panel { position: relative; overflow: hidden; }
        .form-panel::before { content: ''; position: absolute; top: -80px; right: -80px; width: 220px; height: 220px; border-radius: 50%; background: rgba(0, 223, 216, 0.12); pointer-events: none; }
        .form-title { position: relative; color: var(--primary); font-size: 2rem; font-weight: 800; margin-bottom: 10px; }
        .form-copy { position: relative; color: var(--text-muted); font-weight: 600; margin-bottom: 28px; }
        .contact-form { position: relative; display: grid; gap: 18px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .field { display: grid; gap: 8px; }
        .field label { color: var(--primary); font-size: 0.88rem; font-weight: 800; }
        .field input, .field textarea { width: 100%; border: 1px solid rgba(10, 37, 64, 0.1); border-radius: 18px; padding: 15px 16px; color: var(--text-dark); background: rgba(255, 255, 255, 0.82); font: inherit; outline: none; transition: var(--transition); }
        .field textarea { min-height: 150px; resize: vertical; }
        .field input:focus, .field textarea:focus { border-color: rgba(0, 112, 243, 0.45); box-shadow: 0 0 0 4px rgba(0, 112, 243, 0.1); }
        .form-message { display: none; color: #0f766e; font-weight: 800; }
        .form-message.active { display: block; }
        .map-section { padding: 0 0 96px; }
        .map-shell { overflow: hidden; border-radius: var(--radius-lg); min-height: 420px; }
        .map-shell iframe { width: 100%; height: 420px; display: block; border: 0; filter: saturate(0.98) contrast(1.02); }
        

        .footer {
          position: relative;
          padding: 90px 0 42px;
          background:
            radial-gradient(circle at 15% 20%, rgba(0, 223, 216, 0.16), transparent 30%),
            radial-gradient(circle at 85% 10%, rgba(255, 255, 255, 0.1), transparent 28%),
            linear-gradient(135deg, var(--primary), #0d4778 52%, #105c96 100%);
          color: var(--white);
          overflow: hidden;
          font-family: var(--font-main);
        }
        .footer::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 54px 54px;
          opacity: 0.45;
          pointer-events: none;
        }
        .footer-panel {
          position: relative;
          z-index: 10;
          padding: clamp(34px, 4vw, 58px);
          border-radius: var(--radius-lg);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.035));
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.85fr) minmax(220px, 0.6fr);
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }
        .footer-brand { max-width: 520px; }
        .footer-logo-wrap {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 22px;
        }
        .footer-logo {
          width: 74px;
          height: 74px;
          object-fit: contain;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.94);
          padding: 10px;
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
        }
        .footer-brand-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.35rem, 2vw, 1.8rem);
          font-weight: 900;
          letter-spacing: -0.035em;
        }
        .footer-brand-subtitle {
          margin: 5px 0 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.78rem;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .footer-description {
          margin: 0;
          max-width: 500px;
          color: rgba(234, 246, 255, 0.82);
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.85;
        }
        .footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }
        .footer-badges span {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid rgba(0, 223, 216, 0.3);
          background: rgba(0, 223, 216, 0.1);
          color: #bffcfb;
          padding: 8px 13px;
          font-size: 0.78rem;
          font-weight: 800;
        }
        .footer-col-title {
          font-size: 1.18rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 24px;
        }
        .footer-text {
          color: rgba(234, 246, 255, 0.82);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 650;
          line-height: 1.65;
        }
        .footer-text i {
          width: 20px;
          color: var(--accent);
          text-align: center;
        }
        .footer-link {
          color: rgba(234, 246, 255, 0.82);
          transition: var(--transition);
          display: block;
          width: fit-content;
          margin-bottom: 13px;
          font-weight: 700;
          text-decoration: none;
        }
        .footer-link:hover {
          color: var(--accent);
          transform: translateX(6px);
        }
        .footer-bottom {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-top: 60px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.9rem;
          font-weight: 600;
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer { padding: 64px 0 32px; }
          .footer-panel { padding: 30px 22px; border-radius: 28px; }
          .footer-grid { grid-template-columns: 1fr; gap: 34px; }
          .footer-logo-wrap { align-items: flex-start; }
          .footer-logo { width: 64px; height: 64px; border-radius: 20px; }
          .footer-badges span { font-size: 0.72rem; }
        }
        
        .whatsapp-widget { position: fixed; right: 24px; bottom: 24px; z-index: 1100; }
        .whatsapp-toggle { width: 58px; height: 58px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 50%; color: var(--white); background: #25D366; font-size: 1.9rem; box-shadow: 0 18px 34px -18px rgba(37, 211, 102, 0.9); cursor: pointer; transition: var(--transition); }
        .whatsapp-toggle:hover { transform: scale(1.06); background: #128C7E; }
        .whatsapp-window { display: none; position: absolute; right: 0; bottom: 72px; width: min(340px, calc(100vw - 48px)); overflow: hidden; border-radius: 22px; background: var(--white); box-shadow: 0 22px 55px -20px rgba(10, 37, 64, 0.42); }
        .whatsapp-window.active { display: block; }
        .wa-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px; color: var(--white); background: #075E54; }
        .wa-brand { display: flex; align-items: center; gap: 12px; font-weight: 800; }
        .wa-brand img { width: 34px; height: 34px; object-fit: contain; border-radius: 50%; background: var(--white); }
        .wa-close { border: none; color: var(--white); background: transparent; font-size: 1.1rem; cursor: pointer; }
        .wa-body { padding: 16px; background: #ECE5DD; }
        .wa-bubble { width: 86%; padding: 12px; border-radius: 14px; background: var(--white); color: #1f2937; font-size: 0.9rem; font-weight: 600; margin-bottom: 14px; border-left: 4px solid #25D366; }
        .wa-link { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 14px; background: var(--white); color: #1f2937; font-weight: 800; }
        .wa-link i { color: #25D366; font-size: 1.5rem; }
        
        @media (max-width: 1024px) {
            .quick-contact, .footer-grid { grid-template-columns: 1fr 1fr; }
            .section-header, .contact-panel { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
            .navbar { padding: 12px 20px; }
            .nav-brand { font-size: 1rem; }
            .nav-brand img { margin-right: 26px; transform: scale(1.55); }
            .nav-menu { position: absolute; top: 100%; left: 24px; right: 24px; margin-top: 10px; display: none; flex-direction: column; padding: 20px; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); box-shadow: var(--shadow-soft); }
            .nav-menu.active { display: flex; }
            .mobile-menu-btn { display: block; }
            .contact-main { padding-top: 100px; }
            .contact-hero { min-height: 500px; border-radius: 24px; }
            .hero-content { padding: 56px 24px; }
            .quick-contact, .office-grid, .form-row, .footer-grid { grid-template-columns: 1fr; }
            .quick-contact { margin-top: 28px; }
            .section { padding: 72px 0; }
            .office-body, .contact-info-panel, .form-panel, .footer-panel { padding: 28px 22px; }
        }
            ${WHATSAPP_WIDGET_STYLES}
    `,
    html: `
    <header class="navbar-wrapper" id="navbar">
        <nav class="navbar">
            <a href="/en" class="nav-brand">
                <img src="/landing/animation/logo-lab.png" alt="GISLAB">
                Global Inspeksi Sistem
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="/en" class="nav-link">Home</a></li>
                <li><a href="/en/profile" class="nav-link">Profile</a></li>
                <li><a href="/en/service" class="nav-link">Services</a></li>
                <li><a href="/en/ruang-lingkup-pengujian" class="nav-link">Testing Scope</a></li>
                <li class="nav-dropdown">
  <details>
    <summary class="nav-link nav-dropdown-trigger">
      Information <i class="fa-solid fa-chevron-down"></i>
    </summary>
    <div class="nav-dropdown-menu">
      <a href="/en/informasi" class="nav-dropdown-link">
        Articles <i class="fa-solid fa-newspaper"></i>
      </a>
      <a href="/en/informasi/keluhan-dan-banding" class="nav-dropdown-link">
        Complaints and Appeals <i class="fa-solid fa-comments"></i>
      </a>
      <a href="/verify" class="nav-dropdown-link">
        LHU Verification <i class="fa-solid fa-check-circle"></i>
      </a>
    </div>
  </details>
</li>
                <li><a href="/en/contact" class="nav-link active">Contact</a></li>
            </ul>
            <div class="nav-actions">
  <a href="/" class="language-switch" id="languageSwitch" aria-label="Switch to Indonesian" title="Switch to Indonesian">
    <i class="fa-solid fa-globe"></i>
    <span>ID</span>
  </a>

  <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">
    <i class="fas fa-bars"></i>
  </button>
</div>
        </nav>
    </header>

    <main class="contact-main">
        <section class="container">
            <div class="contact-hero">
                <div class="hero-content">
                    <span class="eyebrow"><i class="fa-solid fa-headset"></i> Contact Us</span>
                    <h1 class="hero-title">Let’s discuss your testing needs.</h1>
                    <p class="hero-text">
                        The GIS Laboratory team is ready to support your product testing, environmental testing, inspection, and
                        certification needs through a professional and responsive process.
                    </p>
                </div>
            </div>

            <div class="quick-contact">
                <a class="quick-card glass" href="mailto:globalinspeksisistem@gmail.com">
                    <span class="quick-icon"><i class="fa-solid fa-envelope"></i></span>
                    <h2 class="quick-label">Email</h2>
                    <p class="quick-value">globalinspeksisistem@gmail.com</p>
                </a>
                <a class="quick-card glass" href="tel:+6285645046160">
                    <span class="quick-icon"><i class="fa-solid fa-phone"></i></span>
                    <h2 class="quick-label">Phone</h2>
                    <p class="quick-value">+62 856-4504-6160<br>+62 812-8532-8232<br>+62 817-888-879</p>
                </a>
                <a class="quick-card glass" href="https://wa.me/6285645046160?text=Hello%20GIS%20Laboratory"
                    target="_blank" rel="noopener">
                    <span class="quick-icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <h2 class="quick-label">WhatsApp</h2>
                    <p class="quick-value">Customer Service GIS</p>
                </a>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <div class="section-header">
                    <div>
                        <span class="eyebrow"><i class="fa-solid fa-building"></i> Office</span>
                        <h2 class="section-title">Visit the GIS Laboratory offices.</h2>
                    </div>
                    <p class="section-copy">
                        GIS Laboratory serves customers through its Jakarta and Surabaya offices. Choose the nearest location
                        for sample coordination, parameter consultation, or testing administration needs.
                    </p>
                </div>

                <div class="office-grid">
                    <article class="office-card glass">
                        <div class="office-image">
                            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1100"
                                alt="Jakarta office building">
                        </div>
                        <div class="office-body">
                            <p class="office-kicker">Head Office</p>
                            <h3 class="office-title">Jakarta</h3>
                            <ul class="office-list">
                                <li><i class="fa-solid fa-location-dot"></i><span>Jl. Pahlawan No.2, Kwadengan Barat, Lemahputro, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61213</span></li>
                                <li><i class="fa-solid fa-phone"></i><span>031 99726239</span></li>
                                <li><i class="fa-solid fa-fax"></i><span>031 99726239</span></li>
                                <li><i class="fa-solid fa-envelope"></i><span>globalinspeksisistem@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                    </article>

                    <article class="office-card glass">
                        <div class="office-image">
                            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1100"
                                alt="Modern office space for Surabaya services">
                        </div>
                        <div class="office-body">
                            <p class="office-kicker">Branch Office</p>
                            <h3 class="office-title">Surabaya</h3>
                            <ul class="office-list">
                                <li><i class="fa-solid fa-location-dot"></i><span>Jl. Pahlawan No.2, Kwadengan Barat,
                                        Lemahputro, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61213</span></li>
                                <li><i class="fa-solid fa-phone"></i><span>+031 99726239</span></li>
                                <li><i class="fa-solid fa-fax"></i><span>+031 99726239</span></li>
                                <li><i class="fa-solid fa-envelope"></i><span>globalinspeksisistem@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="section" id="discuss">
            <div class="container">
                <div class="contact-panel">
                    <aside class="contact-info-panel">
                        <span class="eyebrow"><i class="fa-solid fa-comments"></i> Discuss with us</span>
                        <h2 class="section-title">Need test parameter recommendations?</h2>
                        <p>
                            Send your requirements through the form or contact us directly. The GIS team will help
                            determine the most suitable service and parameters.
                        </p>
                        <div class="info-list">
                            <div class="info-item">
                                <i class="fa-solid fa-envelope"></i>
                                <div>
                                    <strong>Email</strong>
                                    <span>globalinspeksisistem@gmail.com</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fa-solid fa-phone"></i>
                                <div>
                                    <strong>Phone</strong>
                                    <span>+62 856-4504-6160<br>+62 812-8532-8232<br>+62 817-888-879</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fa-solid fa-globe"></i>
                                <div>
                                    <strong>Website</strong>
                                    <span>www.gislaboratorium.com</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fa-solid fa-location-dot"></i>
                                <div>
                                    <strong>Address</strong>
                                    <span>DELREY Biztown Blok B1 No. 5, Jl. Lingkar Bumi Botanika Utara, Desa Lengkong
                                        Kulon, Kecamatan Pagedangan, Kabupaten Tangerang, Banten 15331</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <section class="form-panel glass" aria-labelledby="contactFormTitle">
                        <h2 class="form-title" id="contactFormTitle">Send a Message</h2>
                        <p class="form-copy">Fill in the brief details below so our team can contact you back.</p>
                        <form class="contact-form" id="contactForm">
                            <div class="form-row">
                                <div class="field">
                                    <label for="name">Name</label>
                                    <input type="text" id="name" name="name" placeholder="Your name" required>
                                </div>
                                <div class="field">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" name="email" placeholder="email@company.com"
                                        required>
                                </div>
                            </div>
                            <div class="field">
                                <label for="subject">Subject</label>
                                <input type="text" id="subject" name="subject" placeholder="Testing requirements">
                            </div>
                            <div class="field">
                                <label for="message">Message</label>
                                <textarea id="message" name="message"
                                    placeholder="Tell us about the sample, parameter, or service you need."
                                    required></textarea>
                            </div>
                            <button class="btn btn-primary" type="submit">
                                Send Message <i class="fa-solid fa-paper-plane"></i>
                            </button>
                            <p class="form-message" id="formMessage">Thank you. A draft message is ready in your email.
                            </p>
                        </form>
                    </section>
                </div>
            </div>
        </section>

        <section class="map-section">
            <div class="container">
                <div class="map-shell glass">
                    <iframe title="GIS Laboratory office location map"
  src="https://www.google.com/maps?q=Jl.%20Pahlawan%20No.2%2C%20Kwadengan%20Barat%2C%20Lemahputro%2C%20Kec.%20Sidoarjo%2C%20Kabupaten%20Sidoarjo%2C%20Jawa%20Timur%2061213&output=embed"
  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer" id="kontak">
        <div class="container">
            <div class="footer-panel glass-dark">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo-wrap">
                            <img src="/landing/animation/logo-lab.png" alt="GIS Laboratory" class="footer-logo">
                            <div>
                                <h3 class="footer-brand-title">GIS Laboratory</h3>
                                <p class="footer-brand-subtitle">PT. Global Inspeksi Sistem</p>
                            </div>
                        </div>
                        <p class="footer-description">
                            GIS Laboratory serves as a testing partner that helps customers ensure the quality,
                            safety, and conformity of products and the environment through accurate
                            and reliable laboratory services.
                        </p>
                        <div class="footer-badges">
                            <span>Laboratory Testing</span>
                            <span>Environment</span>
                            <span>Lubricants</span>
                            <span>Palm Oil & Fertilizer</span>
                        </div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Contact</h4>
                        <div class="footer-text"><i class="fa-solid fa-envelope"></i><span>info@gislaboratorium.com</span></div>
                        <div class="footer-text" style="align-items: flex-start;">
                            <i class="fa-solid fa-phone" style="margin-top: 4px;"></i>
                            <div>+62 856-4504-6160<br>+62 812-8532-8232<br>+62 817-888-879</div>
                        </div>
                        <div class="footer-text"><i class="fa-solid fa-globe"></i><span>www.gislaboratorium.com</span></div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Link</h4>
                        <a href="/en" class="footer-link">Home</a>
                        <a href="/en/profile" class="footer-link">Profile</a>
                        <a href="/en/service" class="footer-link">Services</a>
                        <a href="/en/ruang-lingkup-pengujian" class="footer-link">Testing Scope</a>
                        <a href="/en/informasi" class="footer-link">Information</a>
                        <a href="/en/contact" class="footer-link">Contact</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">© 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.</div>
        </div>
    </footer>
    ${WHATSAPP_WIDGET_HTML}
    
`,
  },
] as LandingStaticPage[];

export const landingPagesEn = Object.fromEntries(
  pageList.map((page) => [page.key, page]),
) as Record<LandingPageKey, LandingStaticPage>;
