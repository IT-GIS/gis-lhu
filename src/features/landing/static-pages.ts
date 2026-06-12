export type LandingPageKey = "home" | "profile" | "service" | "contact";

export type LandingStaticPage = {
  key: LandingPageKey;
  title: string;
  description: string;
  bodyClass: string;
  styles: string;
  html: string;
};

const pageList = [
  {
    key: "home",
    title: "GISLAB - Laboratorium Pengujian Global Inspeksi Sistem",
    description:
      "Laboratorium pengujian akurat, terpercaya, didukung tenaga ahli berpengalaman dan peralatan modern.",
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
        .advantages-wrapper { position: relative; z-index: 20; margin-top: -60px; padding-bottom: 60px; }
        .advantages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .advantage-card { padding: 32px; border-radius: var(--radius-md); text-align: center; transition: var(--transition); display: flex; flex-direction: column; align-items: center; gap: 16px; animation: fadeUp 1s ease-out backwards; }
        .advantage-card:nth-child(2) { animation-delay: 0.2s; }
        .advantage-card:nth-child(3) { animation-delay: 0.4s; }
        .advantage-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-hover); }
        .advantage-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(0, 112, 243, 0.1); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; color: var(--secondary); margin-bottom: 8px; }
        .advantage-title { font-size: 1.25rem; font-weight: 700; color: var(--primary); }
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
        .footer { position: relative; padding: 80px 0 40px; background: linear-gradient(135deg, var(--primary), #0e4e8a); color: var(--white); overflow: hidden; }
        .footer-panel { position: relative; z-index: 10; padding: 60px; border-radius: var(--radius-lg); }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
        .footer-col-title { font-size: 1.25rem; font-weight: 700; color:#FFFFFF; margin-bottom: 24px; }
        .footer-text { color: var(--light-blue); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .footer-link { color: var(--light-blue); transition: var(--transition); display: block; margin-bottom: 12px; text-decoration: none; }
        .footer-link:hover { color: var(--accent); transform: translateX(5px); }
        .footer-bottom { position: relative; z-index: 10; text-align: center; margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.6); font-size: 0.875rem; }
        
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
    `,
    html: `
    <header class="navbar-wrapper" id="navbar">
        <nav class="navbar">
            <a href="/" class="nav-brand">
                <img src="/landing/animation/logo-lab.png" style="height: 28px; width: auto; transform: scale(1.8); transform-origin: left center; margin-right: 36px;">
                Global Inspeksi Sistem
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="/" class="nav-link active">Beranda</a></li>
                <li><a href="/profile" class="nav-link">Profile</a></li>
                <li><a href="/service" class="nav-link">Layanan</a></li>
                <li><a href="/ruang-lingkup-pengujian" class="nav-link">Ruang Lingkup Pengujian</a></li>
                <li><a href="/informasi" class="nav-link">Informasi</a></li>
                <li><a href="/contact" class="nav-link">Kontak</a></li>
            </ul>
            <button class="mobile-menu-btn" id="mobileMenuBtn">
                <i class="fa-solid fa-bars"></i>
            </button>
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
                        <h1 class="hero-title" aria-label="Laboratorium Pengujian Global Inspeksi Sistem" style="margin: 0; line-height: 1.3;">
                            <span class="typing-ghost typing-neutral" aria-hidden="true">
                                Laboratorium Pengujian <span class="typing-accent">Global Inspeksi Sistem</span>
                            </span>
                            <span class="typing-live" aria-hidden="true">
                                <span id="type-title-1" class="typing-neutral"></span>
                                <span id="type-title-2" class="typing-accent"></span>
                            </span>
                        </h1>
                    </div>
                    <div class="hero-subtitle-slot">
                        <p class="hero-subtitle" aria-label="Laboratorium kami menyediakan layanan pengujian yang akurat, terpercaya, dan didukung oleh tenaga ahli berpengalaman serta peralatan modern." style="margin: 0; font-weight: 600; text-shadow: 0 1px 2px rgba(255,255,255,0.8);">
                            <span class="typing-ghost" aria-hidden="true">Laboratorium kami menyediakan layanan pengujian yang akurat, terpercaya, dan didukung oleh tenaga ahli berpengalaman serta peralatan modern.</span>
                            <span id="type-sub" class="typing-live" aria-hidden="true"></span>
                        </p>
                    </div>
                    <a href="/service" class="btn btn-primary" style="flex-shrink: 0;">
                        Jelajahi Layanan <i class="fa-solid fa-arrow-right ms-2" style="margin-left: 8px;"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <div class="advantages-wrapper">
        <div class="container">
            <div class="advantages-grid">
                <div class="advantage-card glass">
                    <div class="advantage-icon"><i class="fa-solid fa-shield-halved"></i></div>
                    <h3 class="advantage-title">Pengujian Mutu Produk</h3>
                </div>
                <div class="advantage-card glass">
                    <div class="advantage-icon"><i class="fa-solid fa-certificate"></i></div>
                    <h3 class="advantage-title">Sertifikasi SNI</h3>
                </div>
                <div class="advantage-card glass">
                    <div class="advantage-icon"><i class="fa-solid fa-globe"></i></div>
                    <h3 class="advantage-title">Berstandar Internasional</h3>
                </div>
            </div>
        </div>
    </div>

    <section class="about-section" id="profile">
        <div class="container">
            <div class="about-grid">
                <div class="about-card glass reveal">
                    <h2 class="section-title">Tentang Kami</h2>
                    <p class="about-text">
                        GISLAB merupakan laboratorium pengujian yang berfokus pada layanan pengujian mutu produk, lingkungan, dan kebutuhan industri. Kami hadir untuk membantu perusahaan memastikan kualitas, keamanan, dan kesesuaian produk terhadap standar yang berlaku.
                    </p>
                    <div>
                        <a href="/contact" class="btn btn-primary btn-sm">Lihat Selengkapnya</a>
                    </div>
                    <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600" alt="Petugas Laboratorium" class="about-img-small">
                </div>

                <div class="about-card glass reveal">
                    <h2 class="section-title">Fasilitas Keunggulan</h2>
                    <div class="facilities-list">
                        <div class="facility-item">
                            <div class="facility-icon"><i class="fa-solid fa-check"></i></div>
                            <div class="facility-text">Peralatan pengujian modern</div>
                        </div>
                        <div class="facility-item">
                            <div class="facility-icon"><i class="fa-solid fa-check"></i></div>
                            <div class="facility-text">Tenaga ahli berpengalaman</div>
                        </div>
                        <div class="facility-item">
                            <div class="facility-icon"><i class="fa-solid fa-check"></i></div>
                            <div class="facility-text">Proses pengujian akurat dan terdokumentasi</div>
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
                    <h2 class="vm-title"><i class="fa-solid fa-eye"></i> Visi</h2>
                    <p class="vm-text">Menjadi laboratorium pengujian terpercaya yang mendukung kualitas, keamanan, dan daya saing industri melalui layanan yang profesional dan berintegritas.</p>
                </div>
                <div class="vm-card glass-dark reveal" style="transition-delay: 0.2s;">
                    <h2 class="vm-title"><i class="fa-solid fa-bullseye"></i> Misi</h2>
                    <ul class="vm-list">
                        <li>Memberikan layanan pengujian yang akurat, objektif, dan tepat waktu.</li>
                        <li>Mendukung pemenuhan standar nasional dan internasional.</li>
                        <li>Mengembangkan kompetensi SDM dan teknologi laboratorium secara berkelanjutan.</li>
                        <li>Menjaga kepercayaan pelanggan melalui pelayanan yang transparan dan profesional.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="services-section" id="layanan">
        <div class="container">
            <div class="services-header reveal"><h2 class="section-title">Layanan Kami</h2></div>
            <div class="carousel-container reveal">
                <div class="services-track">
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="quality" aria-label="Lihat detail Pengujian Kualitas">
                        <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600" alt="Pengujian Kualitas" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Pengujian Kualitas</h3>
                            <p class="service-desc">Pengujian mutu bahan, produk, dan sampel untuk memastikan kualitas sesuai standar teknis.</p>
                            <button class="service-btn" type="button" data-service-detail="quality">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="environment" aria-label="Lihat detail Pengujian Lingkungan">
                        <img src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=600" alt="Pengujian Lingkungan" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Pengujian Lingkungan</h3>
                            <p class="service-desc">Analisis parameter lingkungan untuk mendukung kepatuhan, pemantauan, dan pengelolaan risiko.</p>
                            <button class="service-btn" type="button" data-service-detail="environment">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="permit" aria-label="Lihat detail Pengujian Produk dan Izin Edar">
                        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600" alt="Pengujian Produk dan Izin Edar" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Pengujian Produk dan Izin Edar</h3>
                            <p class="service-desc">Dukungan pengujian produk untuk kebutuhan dokumen teknis, registrasi, dan izin edar.</p>
                            <button class="service-btn" type="button" data-service-detail="permit">Read More</button>
                        </div>
                    </article>
                    <article class="service-card glass" role="button" tabindex="0" data-service-detail="sni" aria-label="Lihat detail Pengujian SNI Produk">
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" alt="Pengujian SNI Produk" class="service-img">
                        <div class="service-content">
                            <h3 class="service-title">Pengujian SNI Produk</h3>
                            <p class="service-desc">Pengujian produk berdasarkan persyaratan SNI untuk mendukung proses sertifikasi dan kepatuhan.</p>
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
                    <img id="detailCover" class="detail-cover" src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200" alt="Pengujian laboratorium">
                    <div class="detail-body">
                        <span class="detail-kicker"><i class="fa-solid fa-flask-vial"></i> Detail Layanan</span>
                        <h2 class="detail-title" id="detailTitle">Pengujian Kualitas</h2>
                        <p class="detail-copy" id="detailIntro">Pengujian kualitas membantu memastikan bahan, produk, atau sampel memiliki mutu yang konsisten dan sesuai standar teknis. GISLAB mendukung kebutuhan pengujian untuk kontrol mutu, evaluasi produk, dan pembuktian kesesuaian sebelum digunakan atau dipasarkan.</p>

                        <h3 id="detailWhyTitle">Mengapa pengujian ini penting?</h3>
                        <p class="detail-copy" id="detailWhy">Tanpa pengujian yang terdokumentasi, perusahaan berisiko mengambil keputusan berdasarkan asumsi visual saja. Pengujian kualitas memberikan data objektif untuk mengurangi risiko produk gagal, komplain pelanggan, dan ketidaksesuaian terhadap standar.</p>

                        <h3>Layanan pengujian yang kami solusikan</h3>
                        <ul class="detail-list" id="detailList">
                            <li><i class="fa-solid fa-check"></i><span>Pengujian karakteristik fisik dan kimia sesuai kebutuhan produk atau material.</span></li>
                            <li><i class="fa-solid fa-check"></i><span>Pemeriksaan mutu sampel untuk mendukung quality control dan quality assurance.</span></li>
                            <li><i class="fa-solid fa-check"></i><span>Analisis hasil uji sebagai dasar evaluasi kesesuaian terhadap spesifikasi teknis.</span></li>
                        </ul>

                        <h3>Konsultansi dan rekomendasi teknis</h3>
                        <p class="detail-copy" id="detailConsult">Selain pengujian, GISLAB membantu perusahaan dan instansi memahami hasil analisis melalui konsultasi teknis. Tim kami dapat membantu menentukan parameter uji, menyusun rencana pemantauan, dan memberikan rekomendasi awal untuk pengelolaan kualitas lingkungan atau produk.</p>

                        <h3>Komitmen kami</h3>
                        <p class="detail-copy" id="detailCommitment">GISLAB berkomitmen memberikan hasil yang akurat, layanan yang responsif, dan proses yang terdokumentasi. Kami hadir sebagai mitra pengujian profesional untuk mendukung mutu produk, kepatuhan regulasi, perlindungan lingkungan, dan kepercayaan pelanggan.</p>
                    </div>
                </article>

                <aside class="service-detail-sidebar">
                    <div class="sidebar-box">
                        <h3 class="sidebar-title">Layanan GISLAB</h3>
                        <button class="sidebar-link" type="button" data-service-detail="quality">Pengujian Kualitas <i class="fa-solid fa-arrow-right"></i></button>
                        <button class="sidebar-link" type="button" data-service-detail="environment">Pengujian Lingkungan <i class="fa-solid fa-arrow-right"></i></button>
                        <button class="sidebar-link" type="button" data-service-detail="permit">Pengujian Produk dan Izin Edar <i class="fa-solid fa-arrow-right"></i></button>
                        <button class="sidebar-link" type="button" data-service-detail="sni">Pengujian SNI Produk <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                    <div class="sidebar-box">
                        <h3 class="sidebar-title">Download Profil GISLAB</h3>
                        <p class="sidebar-note">Unduh profil perusahaan untuk informasi lengkap mengenai layanan pengujian, analisis, dan dukungan laboratorium kami.</p>
                        <a href="#" class="download-btn"><i class="fa-solid fa-file-pdf"></i> Download PDF</a>
                        <a href="#" class="download-btn"><i class="fa-solid fa-file-word"></i> Download Doc</a>
                    </div>
                    <div class="sidebar-box">
                        <h3 class="sidebar-title">Butuh rekomendasi parameter?</h3>
                        <p class="sidebar-note">Hubungi tim GISLAB untuk menentukan parameter uji yang paling sesuai dengan kebutuhan produk atau lingkungan Anda.</p>
                        <a href="/contact" class="detail-contact-btn"><i class="fa-solid fa-headset"></i> Kontak Kami</a>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <footer class="footer" id="kontak">
        <div class="container">
            <div class="footer-panel glass-dark">
                <div class="footer-grid">
                    <div>
                        <h4 class="footer-col-title">Contact</h4>
                        <div class="footer-text"><i class="fa-solid fa-envelope"></i> info@gislaboratorium.com</div>
                        <div class="footer-text" style="align-items: flex-start;">
                            <i class="fa-solid fa-phone" style="margin-top: 4px;"></i>
                            <div>+62 812-8532-8232<br>+62 817-888-879<br>+62 812-1704-7976</div>
                        </div>
                        <div class="footer-text"><i class="fa-solid fa-globe"></i> www.gislaboratorium.com</div>
                    </div>
                    <div>
                        <h4 class="footer-col-title">Link</h4>
                        <a href="/" class="footer-link">Beranda</a>
                        <a href="/profile" class="footer-link">Profile</a>
                        <a href="/service" class="footer-link">Layanan</a>
                        <a href="/ruang-lingkup-pengujian" class="footer-link">Ruang Lingkup Pengujian</a>
                        <a href="/informasi" class="footer-link">Informasi</a>
                        <a href="/contact" class="footer-link">Kontak</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">© 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.</div>
        </div>
    </footer>
`,
  },
  {
    key: "profile",
    title: "Profil Perusahaan - GIS Laboratorium",
    description:
      "Profil Global Inspeksi Sistem Laboratorium, visi misi, fasilitas, kebijakan, dan komitmen perusahaan.",
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
        
        .footer { position: relative; padding: 80px 0 40px; background: linear-gradient(135deg, var(--primary), #0e4e8a); color: var(--white); overflow: hidden; font-family: var(--font-main); }
        .footer-panel { position: relative; z-index: 10; padding: 60px; border-radius: var(--radius-lg); }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
        .footer-col-title { font-size: 1.25rem; font-weight: 700; color: #FFFFFF; margin-bottom: 24px; }
        .footer-text { color: var(--light-blue); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .footer-link { color: var(--light-blue); transition: var(--transition); display: block; margin-bottom: 12px; text-decoration: none; }
        .footer-link:hover { color: var(--accent); transform: translateX(5px); }
        .footer-bottom { position: relative; z-index: 10; text-align: center; margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.6); font-size: 0.875rem; }
        
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
    `,
    html: `
<header class="navbar-wrapper" id="navbar">
<nav class="navbar">
<a href="/" class="nav-brand">
<img src="/landing/animation/logo-lab.png" style="height: 28px; width: auto; transform: scale(1.8); transform-origin: left center; margin-right: 36px;">
                Global Inspeksi Sistem
            </a>
<ul class="nav-menu" id="navMenu">
<li><a href="/" class="nav-link">Beranda</a></li>
<li><a href="/profile" class="nav-link active">Profile</a></li>
<li><a href="/service" class="nav-link">Layanan</a></li>
<li><a href="/ruang-lingkup-pengujian" class="nav-link">Ruang Lingkup Pengujian</a></li>
<li><a href="/informasi" class="nav-link">Informasi</a></li>
<li><a href="/contact" class="nav-link">Kontak</a></li>
</ul>
<button class="mobile-menu-btn" id="mobileMenuBtn">
<i class="fa-solid fa-bars"></i>
</button>
</nav>
</header>
<main class="profile-main max-w-7xl mx-auto px-8 pb-16 space-y-[120px]">
<section class="relative h-[600px] rounded-[32px] overflow-hidden flex items-center justify-center">
<div class="absolute inset-0 bg-cover bg-center" data-alt="ultra-modern clean bright laboratory with futuristic glass equipment and scientific instruments in a soft blue atmospheric lighting" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhd3SPju_EcKUitBiUGdi5LM2CgMzbO_Y0lve9StPIQEtp-TWzEIXHOct2041e55OyWnmQVRMZzLsTopIp5xR6ofX60AzBiea6EdGEjr1UTXN1bHqSJ06GIcVBl05Gm6mwCEWf4z28g5R6SYenB8t-wCPCjKBLhXA80G3C0IdAzyxyM9bbofzJo6S4a74EMngUosxO1bsbN3MyqfXdXDVm3yxgG08lmmImklFa1WfWzFBI53c-b2CXLkhfYYPar4fE-gC9Xo_Jjqs\u0027')"></div>
<div class="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px]"></div>
<div class="relative z-10 glass-card p-16 rounded-[32px] text-center max-w-4xl mx-4">
<span class="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-4 block">IDENTITAS KAMI</span>
<h1 class="font-display-lg text-display-lg text-on-surface mb-6">Profil Perusahaan</h1>
<p class="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
                    Global Inspeksi Sistem (GIS) Laboratorium menghadirkan standar akurasi tertinggi dalam layanan pengujian lingkungan dan industri melalui inovasi teknologi masa depan.
                </p>
</div>
</section>

<section class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div class="space-y-8">
<div>
<h2 class="font-headline-md text-headline-md text-primary mb-2">Tentang Kami</h2>
<div class="h-1 w-24 bg-primary-container rounded-full"></div>
</div>
<div class="glass-card p-12 rounded-[32px] space-y-6">
<p class="font-body-lg text-body-lg leading-relaxed text-on-surface">
                        Global Inspeksi Sistem (GIS) adalah lembaga pengujian independen yang didedikasikan untuk memberikan hasil analisis yang presisi dan tidak memihak. Didirikan dengan visi untuk menjadi standar emas dalam pengujian laboratorium di Indonesia.
                    </p>
<p class="font-body-lg text-body-lg leading-relaxed text-on-surface">
                        Sejak awal berdiri, kami telah berkomitmen pada kualitas dan integritas. Dengan tim ahli yang berpengalaman dan dukungan teknologi terkini, kami membantu industri memastikan kepatuhan terhadap standar lingkungan dan keselamatan kerja yang ketat.
                    </p>
</div>
</div>
<div class="relative">
<div class="absolute -inset-4 bg-primary/10 blur-[60px] rounded-full"></div>
<div class="relative glass-card rounded-[40px] overflow-hidden aspect-square">
<img class="w-full h-full object-cover" data-alt="microscopic view of crystalline structures in high-resolution detail with blue light refraction and scientific aesthetics" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Pm37V_Jw3Efy8Fsq0z-MWl51-bYCkPs3dSIJfK6Qtho4LZZfhMJnd6_ciQRRKE8lepnmnAopX4DHExWK8OiHYpO3Ecx9GSD51MdC25swVUSoiUlloRQngbVpxUXXoj1uwilV183VLj1gm1rFeXBFJSikxcaCyLklULPQM_VDvYiyGUHFjy8uPHneNCVZNf_hzLrFq7W2MWwlnq2I6YdYaMniX5XNw__va4oFVwF27zLlwLIsqBMH7k04O7CEFhH2QGDFY94yF9Y"/>
</div>
</div>
</section>

<section class="grid grid-cols-1 md:grid-cols-2 gap-8">
<div class="glass-card p-12 rounded-[32px] border-l-4 border-l-primary flex flex-col items-center text-center">
<div class="w-20 h-20 rounded-2xl bg-primary-container/20 flex items-center justify-center mb-8">
<span class="material-symbols-outlined text-primary text-4xl" data-icon="visibility">visibility</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary mb-6">Visi Kami</h3>
<p class="font-body-lg text-body-lg text-on-surface">
                    Menjadi laboratorium pengujian lingkungan dan industri terkemuka di Indonesia yang diakui secara internasional dalam hal akurasi, inovasi, dan integritas profesional.
                </p>
</div>
<div class="glass-card p-12 rounded-[32px] border-l-4 border-l-primary-container flex flex-col items-center text-center">
<div class="w-20 h-20 rounded-2xl bg-primary-container/20 flex items-center justify-center mb-8">
<span class="material-symbols-outlined text-primary text-4xl" data-icon="rocket_launch">rocket_launch</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-primary mb-6">Misi Kami</h3>
<ul class="font-body-lg text-body-lg text-on-surface text-left space-y-4 list-disc pl-5">
<li>Memberikan layanan pengujian dengan standar ISO/IEC 17025.</li>
<li>Mengembangkan kompetensi sumber daya manusia secara berkelanjutan.</li>
<li>Mengintegrasikan teknologi digital terbaru untuk efisiensi operasional.</li>
<li>Mendukung pelestarian lingkungan melalui data analisis yang akurat.</li>
</ul>
</div>
</section>

<section class="space-y-16">
<div class="text-center space-y-4">
<h2 class="font-headline-md text-headline-md text-on-surface">Fasilitas & Keunggulan</h2>
<p class="text-secondary font-body-lg">Standar operasional dengan teknologi masa depan</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="glass-card p-8 rounded-[32px] group hover:bg-white/80 transition-all duration-500">
<div class="mb-6 inline-block p-4 bg-primary/10 rounded-2xl group-hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all">
<span class="material-symbols-outlined text-primary text-3xl" data-icon="biotech">biotech</span>
</div>
<h4 class="font-headline-sm text-headline-sm mb-4">Peralatan Terbaik</h4>
<p class="text-secondary font-body-md">Didukung oleh instrumentasi analisis tercanggih dengan tingkat presisi tinggi untuk hasil yang tak terbantahkan.</p>
</div>
<div class="glass-card p-8 rounded-[32px] group hover:bg-white/80 transition-all duration-500">
<div class="mb-6 inline-block p-4 bg-primary/10 rounded-2xl group-hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all">
<span class="material-symbols-outlined text-primary text-3xl" data-icon="verified">verified</span>
</div>
<h4 class="font-headline-sm text-headline-sm mb-4">Pengujian Standar</h4>
<p class="text-secondary font-body-md">Setiap prosedur pengujian mengacu pada standar nasional (SNI) dan internasional (Standard Methods) yang berlaku.</p>
</div>
<div class="glass-card p-8 rounded-[32px] group hover:bg-white/80 transition-all duration-500">
<div class="mb-6 inline-block p-4 bg-primary/10 rounded-2xl group-hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all">
<span class="material-symbols-outlined text-primary text-3xl" data-icon="sensors">sensors</span>
</div>
<h4 class="font-headline-sm text-headline-sm mb-4">Teknologi Terkini</h4>
<p class="text-secondary font-body-md">Implementasi sistem manajemen laboratorium berbasis digital untuk transparansi dan kecepatan akses data real-time.</p>
</div>
</div>
</section>

<section class="space-y-10">
<div class="text-center space-y-4">
<h2 class="font-headline-md text-headline-md text-on-surface">Kebijakan & Komitmen</h2>
<p class="text-secondary font-body-lg">Integritas layanan laboratorium dalam setiap proses pengujian</p>
</div>
<div class="glass-card policy-tabs rounded-[32px] p-4">
<ul class="policy-tab-nav mx-auto max-w-fit justify-center" role="tablist" aria-label="Kebijakan dan komitmen perusahaan">
<li>
<button class="policy-tab-button active px-8" type="button" role="tab" aria-selected="true" aria-controls="planning-tab" id="planning-tab-button" data-policy-tab="planning-tab">
<span class="material-symbols-outlined" data-icon="balance">balance</span>
<span>Kebijakan Ketidakberpihakan</span>
</button>
</li>
<li>
<button class="policy-tab-button px-8" type="button" role="tab" aria-selected="false" aria-controls="research-tab" id="research-tab-button" data-policy-tab="research-tab">
<span class="material-symbols-outlined" data-icon="shield">shield</span>
<span>Komitmen Anti Suap</span>
</button>
</li>
</ul>
<div class="tab-content">
<article id="planning-tab" class="policy-tab-panel active" role="tabpanel" aria-labelledby="planning-tab-button">
<div class="max-w-4xl mx-auto text-center md:text-left">
<span class="inline-block font-label-caps text-[14pt] bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent uppercase tracking-widest mb-3">Kebijakan</span>
<h5 class="font-headline-md text-3xl font-bold text-slate-800 mb-8">Ketidakberpihakan</h5>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-6">
                    Layanan laboratorium pengujian yang diselenggarakan oleh PT. Global Inspeksi Sistem bertujuan untuk memastikan kepercayaan pemohon atau klien terhadap produk yang dihasilkan, sehingga memenuhi persyaratan Standar Nasional (SNI), Sistem Manajemen, dan persyaratan lainnya yang telah ditetapkan. Hal ini juga bertujuan untuk memberikan perlindungan kepada konsumen serta meningkatkan daya saing dalam pasar domestik. Setiap personel di PT. Global Inspeksi Sistem, sesuai dengan kompetensinya di semua tingkatan organisasi, wajib memenuhi tuntutan mutu layanan laboratorium pengujian produk dan sistem manajemen, dan menghindari segala bentuk tekanan, termasuk tekanan komersial, yang dapat mempengaruhi mutu pelayanan sertifikasi. Layanan laboratorium pengujian produk dan Sistem Manajemen oleh Lembaga Sertifikasi Global Inspeksi Sistem dilaksanakan sesuai dengan lingkup sertifikasi yang telah ditetapkan.
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
<span class="inline-block font-label-caps text-[14pt] bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent uppercase tracking-widest mb-3">Komitmen</span>
<h5 class="font-headline-md text-3xl font-bold text-slate-800 mb-8">Anti Suap</h5>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-6">
                    PT. Global Inspeksi Sistem berkomitmen untuk menjalankan anti-suap dalam melaksanakan layanannya baik dalam sertifikasi, inspeksi, dan juga mengendalikan risiko suap. Setiap penipuan, penipuan, ketidakjujuran, pencurian/penggelapan, pelanggaran dalam proses pengadaan barang dan jasa, penyalahgunaan posisi/otoritas, penyuapan/gratifikasi yang terjadi di PT. Global Inspeksi Sistem atau terkait dengan PT. Global Inspeksi Sistem harap dapat dilaporkan agar dapat segera ditindaklanjuti. PT. Global Inspeksi Sistem menganalisis laporan dan menindaklanjuti laporan pelanggaran berdasarkan bukti yang diberikan dan melindungi Pelapor.
                </p>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-6">
                    Pelaporan ini dilakukan dengan dukungan data yang relevan dan dimaksudkan untuk kepentingan Perusahaan, tidak dimaksudkan untuk memaksakan seseorang. Pelaporan dapat disampaikan kepada Direktur Global Konstruksi Sertifikasi atau Bagian Informasi Umum, melalui informasi sebagai berikut:
                </p>
<div class="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-2xl p-6 md:p-8 mb-6 font-body-md text-on-surface text-left">
<div class="grid grid-cols-[100px_1fr] sm:grid-cols-[160px_1fr] gap-y-3 gap-x-4 break-words">
<div class="font-bold text-primary">Mail</div><div>globalinspeksisistem@gmail.com</div>
<div class="font-bold text-primary">Telp</div><div>+62 812-8532-8232<br>+62 817-888-879<br>+62 812-1704-7976</div>
<div class="font-bold text-primary">Site web</div><div>www.gislaboratorium.com</div>
<div class="font-bold text-primary">Letter</div><div>PT. Global Inspeksi Sistem</div>
<div class="font-bold text-primary">Head Office (Surabaya)</div><div>Jl. Pahlawan No.2, Kwadengan Barat, Lemahputro, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61213</div>
<div class="font-bold text-primary">Branch Office (Jakarta)</div><div>Jl. Raya Daan Mogot No. 89 RT.2/RW.2, Wijaya Kusuma, Kec. Grogol Petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11460</div>
</div>
</div>
<p class="text-justify text-on-surface font-body-lg leading-relaxed mb-8">
                    Pelapor harus memberikan identitas mereka dalam melaporkan keluhan dan memastikan bahwa setiap informasi tentang identitas pihak pelapor dan laporannya dijaga kerahasiaannya. Pelaporan dilakukan di bawah prinsip anonim, rahasia dan independen.
                </p>
<p class="text-justify text-on-surface font-body-lg leading-relaxed">
<span class="font-bold">Director</span><br><br>
                    Vera marini
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
<div>
<h4 class="footer-col-title">Contact</h4>
<div class="footer-text"><i class="fa-solid fa-envelope"></i> info@gislaboratorium.com</div>
<div class="footer-text" style="align-items: flex-start;">
<i class="fa-solid fa-phone" style="margin-top: 4px;"></i>
<div>+62 812-8532-8232<br>+62 817-888-879<br>+62 812-1704-7976</div>
</div>
<div class="footer-text"><i class="fa-solid fa-globe"></i> www.gislaboratorium.com</div>
</div>
<div>
<h4 class="footer-col-title">Link</h4>
<a href="/" class="footer-link">Beranda</a>
<a href="/profile" class="footer-link">Profile</a>
<a href="/service" class="footer-link">Layanan</a>
<a href="/ruang-lingkup-pengujian" class="footer-link">Ruang Lingkup Pengujian</a>
<a href="/informasi" class="footer-link">Informasi</a>
<a href="/contact" class="footer-link">Kontak</a>
</div>
</div>
</div>
<div class="footer-bottom">
© 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.
</div>
</div>
</footer>

<div id="whatsapp-widget" class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-['Inter']">
    <div id="whatsapp-window" class="hidden w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transition-all origin-bottom-right">
        <div class="bg-[#075E54] p-4 flex items-center justify-between text-white">
            <div class="flex items-center gap-3">
                <div class="bg-white p-1 rounded-full">
                    <img src="https://giscert.com/assets/client/images/GISlogo.png" class="w-8 h-8 object-contain" alt="Logo">
                </div>
                <div>
                    <div class="font-bold text-sm">PT Global Inspeksi Sistem</div>
                    <div class="text-xs text-white/80">Membalas secepatnya</div>
                </div>
            </div>
            <button id="close-wa" class="text-white/80 hover:text-white transition-colors">
                <span class="material-symbols-outlined text-[24px]">close</span>
            </button>
        </div>
        <div class="bg-[#ECE5DD] p-4 min-h-[240px] relative before:content-[''] before:absolute before:inset-0 before:bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] before:opacity-10 before:mix-blend-multiply before:pointer-events-none">
            <div class="bg-white rounded-xl p-3 shadow-sm text-sm text-gray-800 w-[85%] mb-4 relative ml-0 border-l-4 border-[#25D366]">
                Halo! Ada yang bisa kami bantu mengenai layanan sertifikasi dan inspeksi GIS?
            </div>
            <a href="https://wa.me/6281285328232?text=Halo%20GIS%20Laboratorium" target="_blank" class="relative flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all group w-full border border-transparent hover:border-[#25D366]/30">
                <div class="relative flex-shrink-0">
                    <img src="https://2.bp.blogspot.com/-y6xNA_8TpFo/XXWzkdYk0MI/AAAAAAAAA5s/RCzTBJ_FbMwVt5AEZKekwQqiDNqdNQJjgCLcBGAs/s70/supportmale.png" class="w-12 h-12 rounded-full bg-blue-50 object-cover" alt="CS">
                    <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-white"></div>
                </div>
                <div class="flex-1">
                    <div class="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Support</div>
                    <div class="text-sm font-bold text-gray-800 group-hover:text-[#075E54]">Customer Service 1</div>
                </div>
                <div class="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <i class="fa-brands fa-whatsapp text-lg"></i>
                </div>
            </a>
        </div>
    </div>
    
    <button id="toggle-wa" class="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-transform hover:scale-110 relative group">
        <span class="absolute right-full mr-4 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-2 after:border-8 after:border-transparent after:border-l-white">
            Butuh Bantuan?
        </span>
        <i class="fa-brands fa-whatsapp text-3xl"></i>
    </button>
</div>
`,
  },
  {
    key: "service",
    title: "Services | GIS Laboratorium",
    description:
      "Layanan pengujian kualitas, lingkungan, produk dan izin edar, serta SNI produk GIS Laboratorium.",
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
        
        .footer { position: relative; padding: 80px 0 40px; background: linear-gradient(135deg, var(--gis-primary), #0e4e8a); color: var(--gis-white); overflow: hidden; font-family: var(--gis-font-main); }
        .footer-panel { position: relative; z-index: 10; padding: 60px; border-radius: var(--gis-radius-lg); }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
        .footer-col-title { font-size: 1.25rem; font-weight: 700; color: #FFFFFF; margin-bottom: 24px; }
        .footer-text { color: var(--gis-light-blue); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .footer-link { color: var(--gis-light-blue); transition: var(--gis-transition); display: block; margin-bottom: 12px; text-decoration: none; }
        .footer-link:hover { color: var(--gis-accent); transform: translateX(5px); }
        .footer-bottom { position: relative; z-index: 10; text-align: center; margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.6); font-size: 0.875rem; }
        
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
    `,
    html: `
<div class="liquid-bg"></div>
<header class="navbar-wrapper" id="navbar">
<nav class="navbar">
<a href="/" class="nav-brand">
<img src="/landing/animation/logo-lab.png" alt="GISLAB">
                Global Inspeksi Sistem
            </a>
<ul class="nav-menu" id="navMenu">
<li><a href="/" class="nav-link">Beranda</a></li>
<li><a href="/profile" class="nav-link">Profile</a></li>
<li><a href="/service" class="nav-link active">Layanan</a></li>
<li><a href="/ruang-lingkup-pengujian" class="nav-link">Ruang Lingkup Pengujian</a></li>
<li><a href="/informasi" class="nav-link">Informasi</a></li>
<li><a href="/contact" class="nav-link">Kontak</a></li>
</ul>
<button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Buka menu">
<i class="fa-solid fa-bars"></i>
</button>
</nav>
</header>
<main>
<section class="relative h-[614px] flex items-center justify-center overflow-hidden">
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover opacity-30" data-alt="A clean, futuristic laboratory interior with white surfaces and blue glowing ambient light. High-end scientific equipment like chromatographs and microscopes are arranged on sleek glass benches. The atmosphere is clinical, visionary, and hyper-modern, reflecting a top-tier digital biotech environment with soft depth of field." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8V5p_RQ85djBobSPDB33E4q8H_dWpqkxXSH1O0Ei07dCwGWxdVAv69f4vCt9keM2BFgJtW3FW10wSrdR9rcumQAL2tNoOUaDFoHsKyVZGpY88MifcLJU5lXEzM9vF44gKlzH2lwrTn3etldj38lFUBIkEbwLUgPuz02BPqaQZTIRNhWS892Pd2rKAqAXRgxlN8PcF5vnqWMtl4FkrIc2xXgmi11G-suRtv2EIlAnH6zE3kPDuZN72t2sIYRdnWa5Ln2QEI0fL57k"/>
</div>
<div class="relative z-10 text-center px-4 max-w-4xl">
<h1 class="font-display-lg text-display-lg text-primary mb-4">GIS Modern Laboratory Services</h1>
<p class="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
                    Merintis analisis presisi melalui kerangka diagnostik berakurasi tinggi. Kami memberikan integritas struktural absolut dalam setiap penilaian kimia, biologi, dan lingkungan.
                </p>
</div>
</section>
<section class="services-section" id="layanan">
<div class="gis-container">
<div class="services-header">
<h2 class="section-title">Layanan Kami</h2>
</div>

<div class="carousel-container">
<div class="services-track">
<article class="service-card glass" role="button" tabindex="0" data-service-detail="quality" aria-label="Lihat detail Pengujian Kualitas">
<img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=900"
alt="Pengujian Kualitas" class="service-img">
<div class="service-content">
<h3 class="service-title">Pengujian Kualitas</h3>
<p class="service-desc">Layanan pengujian mutu bahan, produk, dan sampel untuk membantu perusahaan memastikan kualitas, keamanan, konsistensi, serta kesesuaian terhadap standar teknis yang berlaku.</p>
<span class="service-btn">Read More</span>
</div>
</article>

<article class="service-card glass" role="button" tabindex="0" data-service-detail="environment" aria-label="Lihat detail Pengujian Lingkungan">
<img src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=900"
alt="Pengujian Lingkungan" class="service-img">
<div class="service-content">
<h3 class="service-title">Pengujian Lingkungan</h3>
<p class="service-desc">Analisis parameter lingkungan untuk mendukung pemantauan kualitas, kepatuhan regulasi, pengendalian pencemaran, dan pengambilan keputusan berbasis data laboratorium.</p>
<span class="service-btn">Read More</span>
</div>
</article>

<article class="service-card glass" role="button" tabindex="0" data-service-detail="permit" aria-label="Lihat detail Pengujian Produk dan Izin Edar">
<img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=900"
alt="Pengujian Produk dan Izin Edar" class="service-img">
<div class="service-content">
<h3 class="service-title">Pengujian Produk dan Izin Edar</h3>
<p class="service-desc">Dukungan pengujian produk sebagai dasar teknis dokumen registrasi, izin edar, evaluasi kesesuaian, dan pemenuhan persyaratan administrasi produk.</p>
<span class="service-btn">Read More</span>
</div>
</article>

<article class="service-card glass" role="button" tabindex="0" data-service-detail="sni" aria-label="Lihat detail Pengujian SNI Produk">
<img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900"
alt="Pengujian SNI Produk" class="service-img">
<div class="service-content">
<h3 class="service-title">Pengujian SNI Produk</h3>
<p class="service-desc">Pengujian produk berdasarkan persyaratan SNI untuk mendukung proses sertifikasi, pembuktian mutu, serta kepercayaan konsumen dan pasar.</p>
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
<img id="detailCover" class="detail-cover" src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=1200" alt="Pengujian laboratorium">
<div class="detail-body">
<span class="detail-kicker"><i class="fa-solid fa-flask-vial"></i> Detail Layanan</span>
<h2 class="detail-title" id="detailTitle">Pengujian Kualitas Tanah & Sedimen</h2>
<p class="detail-copy" id="detailIntro">
Kualitas tanah dan sedimen yang baik sangat penting untuk menjaga kesehatan ekosistem, aktivitas industri, pertanian, dan sumber daya air. GISLAB menyediakan layanan pengujian komprehensif untuk membantu mendeteksi kontaminan berbahaya serta memastikan hasil analisis dapat digunakan sebagai dasar pengambilan keputusan.
</p>

<h3 id="detailWhyTitle">Mengapa pengujian ini penting?</h3>
<p class="detail-copy" id="detailWhy">
Tanah atau sedimen yang terkontaminasi dapat memengaruhi produktivitas lahan, kualitas air tanah, keamanan produk, dan kesehatan ekosistem secara keseluruhan. Pengujian menjadi langkah penting untuk memantau kondisi lingkungan, mengelola risiko kontaminasi, dan memastikan kepatuhan terhadap standar yang berlaku.
</p>

<h3>Layanan pengujian yang kami solusikan</h3>
<ul class="detail-list" id="detailList">
<li><i class="fa-solid fa-check"></i><span>Pengujian tanah untuk mendeteksi logam berat, pestisida, dan senyawa organik berbahaya.</span></li>
<li><i class="fa-solid fa-check"></i><span>Pengujian sedimen dari sungai, danau, area pesisir, atau area industri untuk mengetahui kadar kontaminan.</span></li>
<li><i class="fa-solid fa-check"></i><span>Analisis kesuburan tanah untuk mendukung pengelolaan lahan yang lebih efektif dan berkelanjutan.</span></li>
</ul>

<h3>Konsultansi dan rekomendasi teknis</h3>
<p class="detail-copy" id="detailConsult">
Selain pengujian, GISLAB membantu perusahaan dan instansi memahami hasil analisis melalui konsultasi teknis. Tim kami dapat membantu menentukan parameter uji, menyusun rencana pemantauan, dan memberikan rekomendasi awal untuk pengelolaan kualitas lingkungan atau produk.
</p>

<h3>Komitmen kami</h3>
<p class="detail-copy" id="detailCommitment">
GISLAB berkomitmen memberikan hasil yang akurat, layanan yang responsif, dan proses yang terdokumentasi. Kami hadir sebagai mitra pengujian profesional untuk mendukung mutu produk, kepatuhan regulasi, perlindungan lingkungan, dan kepercayaan pelanggan.
</p>
</div>
</article>

<aside class="service-detail-sidebar">
<div class="sidebar-box">
<h3 class="sidebar-title">Layanan GISLAB</h3>
<button class="sidebar-link" type="button" data-service-detail="quality">Pengujian Kualitas <i class="fa-solid fa-arrow-right"></i></button>
<button class="sidebar-link" type="button" data-service-detail="environment">Pengujian Lingkungan <i class="fa-solid fa-arrow-right"></i></button>
<button class="sidebar-link" type="button" data-service-detail="permit">Pengujian Produk dan Izin Edar <i class="fa-solid fa-arrow-right"></i></button>
<button class="sidebar-link" type="button" data-service-detail="sni">Pengujian SNI Produk <i class="fa-solid fa-arrow-right"></i></button>
</div>
<div class="sidebar-box">
<h3 class="sidebar-title">Download Profil GISLAB</h3>
<p class="sidebar-note">Unduh profil perusahaan untuk informasi lengkap mengenai layanan pengujian, analisis, dan dukungan laboratorium kami.</p>
<a href="#" class="download-btn"><i class="fa-solid fa-file-pdf"></i> Download PDF</a>
<a href="#" class="download-btn"><i class="fa-solid fa-file-word"></i> Download Doc</a>
</div>
<div class="sidebar-box">
<h3 class="sidebar-title">Butuh rekomendasi parameter?</h3>
<p class="sidebar-note">Hubungi tim GISLAB untuk menentukan parameter uji yang paling sesuai dengan kebutuhan produk atau lingkungan Anda.</p>
<a href="/contact" class="detail-contact-btn"><i class="fa-solid fa-headset"></i> Kontak Kami</a>
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
<div>
<h4 class="footer-col-title">Contact</h4>
<div class="footer-text"><i class="fa-solid fa-envelope"></i> info@gislaboratorium.com</div>
<div class="footer-text" style="align-items: flex-start;">
<i class="fa-solid fa-phone" style="margin-top: 4px;"></i>
<div>+62 812-8532-8232<br>+62 817-888-879<br>+62 812-1704-7976</div>
</div>
<div class="footer-text"><i class="fa-solid fa-globe"></i> www.gislaboratorium.com</div>
</div>

<div>
<h4 class="footer-col-title">Link</h4>
<a href="/" class="footer-link">Beranda</a>
<a href="/profile" class="footer-link">Profile</a>
<a href="/service" class="footer-link">Layanan</a>
<a href="/ruang-lingkup-pengujian" class="footer-link">Ruang Lingkup Pengujian</a>
<a href="/informasi" class="footer-link">Informasi</a>
<a href="/contact" class="footer-link">Kontak</a>
</div>

</div>
</div>
<div class="footer-bottom">
© 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.
</div>
</div>
</footer>
`,
  },
  {
    key: "contact",
    title: "Kontak - GIS Laboratorium",
    description:
      "Hubungi GIS Laboratorium untuk kebutuhan pengujian, sertifikasi, inspeksi, dan konsultasi parameter laboratorium.",
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
        
        .footer { position: relative; padding: 80px 0 40px; background: linear-gradient(135deg, var(--primary), #0e4e8a); color: var(--white); overflow: hidden; }
        .footer-panel { position: relative; z-index: 10; padding: 60px; border-radius: var(--radius-lg); }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
        .footer-col-title { font-size: 1.25rem; font-weight: 700; color: #FFFFFF; margin-bottom: 24px; }
        .footer-text { color: var(--light-blue); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .footer-link { color: var(--light-blue); transition: var(--transition); display: block; margin-bottom: 12px; text-decoration: none; }
        .footer-link:hover { color: var(--accent); transform: translateX(5px); }
        .footer-bottom { position: relative; z-index: 10; text-align: center; margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.6); font-size: 0.875rem; }
        
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
    `,
    html: `
    <header class="navbar-wrapper" id="navbar">
        <nav class="navbar">
            <a href="/" class="nav-brand">
                <img src="/landing/animation/logo-lab.png" alt="GISLAB">
                Global Inspeksi Sistem
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="/" class="nav-link">Beranda</a></li>
                <li><a href="/profile" class="nav-link">Profile</a></li>
                <li><a href="/service" class="nav-link">Layanan</a></li>
                <li><a href="/ruang-lingkup-pengujian" class="nav-link">Ruang Lingkup Pengujian</a></li>
                <li><a href="/informasi" class="nav-link">Informasi</a></li>
                <li><a href="/contact" class="nav-link active">Kontak</a></li>
            </ul>
            <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Buka menu">
                <i class="fa-solid fa-bars"></i>
            </button>
        </nav>
    </header>

    <main class="contact-main">
        <section class="container">
            <div class="contact-hero">
                <div class="hero-content">
                    <span class="eyebrow"><i class="fa-solid fa-headset"></i> Kontak kami</span>
                    <h1 class="hero-title">Mari diskusikan kebutuhan pengujian Anda.</h1>
                    <p class="hero-text">
                        Tim GIS Laboratorium siap membantu kebutuhan pengujian produk, lingkungan, inspeksi, dan
                        sertifikasi dengan proses yang profesional dan responsif.
                    </p>
                </div>
            </div>

            <div class="quick-contact">
                <a class="quick-card glass" href="mailto:globalinspeksisistem@gmail.com">
                    <span class="quick-icon"><i class="fa-solid fa-envelope"></i></span>
                    <h2 class="quick-label">Email</h2>
                    <p class="quick-value">globalinspeksisistem@gmail.com</p>
                </a>
                <a class="quick-card glass" href="tel:+6281285328232">
                    <span class="quick-icon"><i class="fa-solid fa-phone"></i></span>
                    <h2 class="quick-label">Telepon</h2>
                    <p class="quick-value">+62 812-8532-8232<br>+62 817-888-879<br>+62 812-1704-7976</p>
                </a>
                <a class="quick-card glass" href="https://wa.me/6281285328232?text=Halo%20GIS%20Laboratorium"
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
                        <h2 class="section-title">Kunjungi kantor GIS Laboratorium.</h2>
                    </div>
                    <p class="section-copy">
                        GIS Laboratorium melayani pelanggan melalui kantor Jakarta dan Surabaya. Pilih lokasi terdekat
                        untuk koordinasi sampel, konsultasi parameter, atau kebutuhan administrasi pengujian.
                    </p>
                </div>

                <div class="office-grid">
                    <article class="office-card glass">
                        <div class="office-image">
                            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1100"
                                alt="Gedung perkantoran Jakarta">
                        </div>
                        <div class="office-body">
                            <p class="office-kicker">Head Office</p>
                            <h3 class="office-title">Jakarta</h3>
                            <ul class="office-list">
                                <li><i class="fa-solid fa-location-dot"></i><span>Jl. Raya Daan Mogot No. 89 RT.2/RW.2,
                                        Wijaya Kusuma, Kec. Grogol Petamburan, Kota Jakarta Barat, DKI Jakarta
                                        11460</span></li>
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
                                alt="Ruang kantor modern untuk layanan Surabaya">
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
                        <h2 class="section-title">Butuh rekomendasi parameter uji?</h2>
                        <p>
                            Kirim kebutuhan Anda melalui form atau hubungi kontak langsung. Tim GIS akan membantu
                            menentukan layanan dan parameter yang paling sesuai.
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
                                    <span>+62 812-8532-8232<br>+62 817-888-879<br>+62 812-1704-7976</span>
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
                                    <strong>Alamat</strong>
                                    <span>DELREY Biztown Blok B1 No. 5, Jl. Lingkar Bumi Botanika Utara, Desa Lengkong
                                        Kulon, Kecamatan Pagedangan, Kabupaten Tangerang, Banten 15331</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <section class="form-panel glass" aria-labelledby="contactFormTitle">
                        <h2 class="form-title" id="contactFormTitle">Kirim pesan</h2>
                        <p class="form-copy">Isi data singkat berikut agar tim kami bisa menghubungi Anda kembali.</p>
                        <form class="contact-form" id="contactForm">
                            <div class="form-row">
                                <div class="field">
                                    <label for="name">Nama</label>
                                    <input type="text" id="name" name="name" placeholder="Nama Anda" required>
                                </div>
                                <div class="field">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" name="email" placeholder="email@perusahaan.com"
                                        required>
                                </div>
                            </div>
                            <div class="field">
                                <label for="subject">Subjek</label>
                                <input type="text" id="subject" name="subject" placeholder="Kebutuhan pengujian">
                            </div>
                            <div class="field">
                                <label for="message">Pesan</label>
                                <textarea id="message" name="message"
                                    placeholder="Ceritakan sampel, parameter, atau layanan yang Anda butuhkan."
                                    required></textarea>
                            </div>
                            <button class="btn btn-primary" type="submit">
                                Kirim Pesan <i class="fa-solid fa-paper-plane"></i>
                            </button>
                            <p class="form-message" id="formMessage">Terima kasih. Draft pesan sudah siap di email Anda.
                            </p>
                        </form>
                    </section>
                </div>
            </div>
        </section>

        <section class="map-section">
            <div class="container">
                <div class="map-shell glass">
                    <iframe title="Peta lokasi kantor GIS Laboratorium"
                        src="https://www.google.com/maps?q=Jl.%20Raya%20Daan%20Mogot%20No.%2089%20Wijaya%20Kusuma%20Grogol%20Petamburan%20Jakarta%20Barat\u0026output=embed"
                        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer" id="kontak">
        <div class="container">
            <div class="footer-panel glass-dark">
                <div class="footer-grid">
                    <div>
                        <h4 class="footer-col-title">Contact</h4>
                        <div class="footer-text">
                            <i class="fa-solid fa-envelope"></i> info@gislaboratorium.com
                        </div>
                        <div class="footer-text" style="align-items: flex-start;">
                            <i class="fa-solid fa-phone" style="margin-top: 4px;"></i>
                            <div>
                                +62 812-8532-8232<br>
                                +62 817-888-879<br>
                                +62 812-1704-7976
                            </div>
                        </div>
                        <div class="footer-text">
                            <i class="fa-solid fa-globe"></i> www.gislaboratorium.com
                        </div>
                    </div>

                    <div>
                        <h4 class="footer-col-title">Link</h4>
                        <a href="/" class="footer-link">Beranda</a>
                        <a href="/profile" class="footer-link">Profile</a>
                        <a href="/service" class="footer-link">Layanan</a>
                        <a href="/ruang-lingkup-pengujian" class="footer-link">Ruang Lingkup Pengujian</a>
                        <a href="/informasi" class="footer-link">Informasi</a>
                        <a href="/contact" class="footer-link">Kontak</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                © 2026 GISLAB - Global Inspeksi Sistem. All rights reserved.
            </div>
        </div>
    </footer>

    <div class="whatsapp-widget">
        <div class="whatsapp-window" id="whatsappWindow">
            <div class="wa-header">
                <div class="wa-brand">
                    <img src="/landing/animation/logo-lab.png" alt="GISLAB">
                    <span>PT Global Inspeksi Sistem</span>
                </div>
                <button class="wa-close" id="closeWhatsapp" aria-label="Tutup WhatsApp">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="wa-body">
                <div class="wa-bubble">Halo! Ada yang bisa kami bantu mengenai layanan pengujian GIS?</div>
                <a class="wa-link" href="https://wa.me/6281285328232?text=Halo%20GIS%20Laboratorium" target="_blank"
                    rel="noopener">
                    <i class="fa-brands fa-whatsapp"></i>
                    <span>Customer Service 1</span>
                </a>
            </div>
        </div>
        <button class="whatsapp-toggle" id="toggleWhatsapp" aria-label="Buka WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
        </button>
    </div>

    
`,
  },
] as LandingStaticPage[];

export const landingPages = Object.fromEntries(
  pageList.map((page) => [page.key, page]),
) as Record<LandingPageKey, LandingStaticPage>;
