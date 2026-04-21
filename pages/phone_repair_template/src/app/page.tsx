"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Language = "zh" | "en";

const content = {
  zh: {
    nav: {
      services: "維修服務",
      pricing: "價目表",
      tracking: "維修追蹤",
      contact: "聯絡我們",
      book: "立即預約",
    },
    hero: {
      badge: "⚡ 旺角 | 銅鑼灣 | 荃灣",
      title: "快速維修",
      titleHighlight: "30分鐘即取",
      subtitle: "你的手機急救站",
      description: "專業維修各款iPhone、三星、Google、小米手機。屏幕、電池、主板，全部原廠品質。我們的目標：讓你盡快取回手機。",
      cta1: "查看價目",
      cta2: "預約維修",
      stats: {
        time: "30分鐘",
        timeLabel: "平均維修時間",
        repairs: "50,000+",
        repairsLabel: "已完成維修",
        warranty: "90日",
        warrantyLabel: "原廠保養",
      },
    },
    services: {
      title: "// 服務項目",
      heading: "我們維修什麼",
      items: [
        { name: "屏幕維修", desc: "碎裂屏幕、觸控失靈、顯示問題", price: "由 HK$380 起", icon: "📱", time: "30-60分鐘" },
        { name: "電池更換", desc: "耗電快、意外關機、膨脹電池", price: "由 HK$280 起", icon: "🔋", time: "20-30分鐘" },
        { name: "主機板維修", desc: "無法開機、充電問題、浸水處理", price: "由 HK$480 起", icon: "🔧", time: "1-3日" },
        { name: "相機維修", desc: "前置、後置鏡頭故障、閃光燈", price: "由 HK$350 起", icon: "📷", time: "30-60分鐘" },
        { name: "喇叭/咪高峰", desc: "聲音問題、錄音不清、聽筒", price: "由 HK$250 起", icon: "🔊", time: "30分鐘" },
        { name: "按鍵/尾插", desc: "Home鍵、静音鍵、充電口", price: "由 HK$220 起", icon: "⌨️", time: "30分鐘" },
      ],
    },
    pricing: {
      title: "// 熱門維修",
      heading: "iPhone 屏幕維修價目",
      description: "使用原廠品質零件，提供90日保養",
      items: [
        { model: "iPhone 14 Pro Max", price: "HK$1,280", original: "HK$1,680" },
        { model: "iPhone 14 Pro", price: "HK$1,180", original: "HK$1,580" },
        { model: "iPhone 14", price: "HK$980", original: "HK$1,280" },
        { model: "iPhone 13", price: "HK$880", original: "HK$1,180" },
        { model: "iPhone 13 mini", price: "HK$780", original: "HK$1,080" },
        { model: "iPhone 12", price: "HK$680", original: "HK$980" },
        { model: "Samsung S24 Ultra", price: "HK$1,480", original: "HK$1,980" },
        { model: "Google Pixel 8", price: "HK$980", original: "HK$1,280" },
      ],
    },
    process: {
      title: "// 維修流程",
      heading: "簡單四步完成維修",
      steps: [
        { step: "01", name: "預約/walk-in", desc: "網上預約或直接到店" },
        { step: "02", name: "檢測報價", desc: "免費檢測，15分鐘內報價" },
        { step: "03", name: "開始維修", desc: "原廠品質零件，專業師傅" },
        { step: "04", name: "取機付款", desc: "測試確認，90日保養" },
      ],
    },
    contact: {
      title: "// 聯絡我們",
      heading: "立即開始維修",
      locations: [
        { name: "旺角店", address: "旺角彌敦道580號A大廈12樓", hours: "11:00 - 21:00", status: "available" },
        { name: "銅鑼灣店", address: "銅鑼灣軒尼詩道489號18樓", hours: "11:00 - 21:00", status: "available" },
        { name: "荃灣店", address: "荃灣大壩街4-30號13樓", hours: "11:00 - 20:00", status: "busy" },
      ],
      phone: "+852 2881 6881",
      whatsapp: "+852 9888 6881",
      form: {
        name: "姓名",
        phone: "電話/WhatsApp",
        model: "手機型號",
        issue: "故障情況",
        submit: "發送預約",
      },
    },
    footer: {
      tagline: "FIXHUB - 專業手機維修",
      rights: "© 2024 FIXHUB Phone Repair. All rights reserved.",
    },
  },
  en: {
    nav: {
      services: "Services",
      pricing: "Pricing",
      tracking: "Track Repair",
      contact: "Contact",
      book: "Book Now",
    },
    hero: {
      badge: "⚡ Mong Kok | Causeway Bay | Tsuen Wan",
      title: "Fast Repair",
      titleHighlight: "30 Mins",
      subtitle: "Your Phone Emergency Center",
      description: "Professional repair for iPhone, Samsung, Google, Xiaomi. Screens, batteries, motherboards - all with genuine parts. Our goal: get your phone back fast.",
      cta1: "View Pricing",
      cta2: "Book Repair",
      stats: {
        time: "30 mins",
        timeLabel: "Avg Repair Time",
        repairs: "50,000+",
        repairsLabel: "Repairs Done",
        warranty: "90 days",
        warrantyLabel: "Warranty",
      },
    },
    services: {
      title: "// SERVICES",
      heading: "What We Fix",
      items: [
        { name: "Screen Repair", desc: "Cracked screen, touch issues, display problems", price: "From HK$380", icon: "📱", time: "30-60 mins" },
        { name: "Battery Replace", desc: "Draining fast, shutting down, swollen battery", price: "From HK$280", icon: "🔋", time: "20-30 mins" },
        { name: "Motherboard", desc: "Won't turn on, charging issues, water damage", price: "From HK$480", icon: "🔧", time: "1-3 days" },
        { name: "Camera Repair", desc: "Front/rear camera, flash issues", price: "From HK$350", icon: "📷", time: "30-60 mins" },
        { name: "Speaker/Mic", desc: "Sound issues, recording problems, earpiece", price: "From HK$250", icon: "🔊", time: "30 mins" },
        { name: "Buttons/Port", desc: "Home button, mute switch, charging port", price: "From HK$220", icon: "⌨️", time: "30 mins" },
      ],
    },
    pricing: {
      title: "// POPULAR",
      heading: "iPhone Screen Repair Prices",
      description: "Genuine quality parts with 90-day warranty",
      items: [
        { model: "iPhone 14 Pro Max", price: "HK$1,280", original: "HK$1,680" },
        { model: "iPhone 14 Pro", price: "HK$1,180", original: "HK$1,580" },
        { model: "iPhone 14", price: "HK$980", original: "HK$1,280" },
        { model: "iPhone 13", price: "HK$880", original: "HK$1,180" },
        { model: "iPhone 13 mini", price: "HK$780", original: "HK$1,080" },
        { model: "iPhone 12", price: "HK$680", original: "HK$980" },
        { model: "Samsung S24 Ultra", price: "HK$1,480", original: "HK$1,980" },
        { model: "Google Pixel 8", price: "HK$980", original: "HK$1,280" },
      ],
    },
    process: {
      title: "// HOW IT WORKS",
      heading: "4 Simple Steps",
      steps: [
        { step: "01", name: "Book/Walk-in", desc: "Online booking or walk in anytime" },
        { step: "02", name: "Diagnosis", desc: "Free checkup, quote in 15 mins" },
        { step: "03", name: "Repair", desc: "Genuine parts, expert technicians" },
        { step: "04", name: "Pick Up", desc: "Test & pay, 90-day warranty" },
      ],
    },
    contact: {
      title: "// CONTACT",
      heading: "Start Your Repair",
      locations: [
        { name: "Mong Kok", address: "12/F, Block A, 580 Nathan Road", hours: "11:00 - 21:00", status: "available" },
        { name: "Causeway Bay", address: "18/F, 489 Hennessy Road", hours: "11:00 - 21:00", status: "available" },
        { name: "Tsuen Wan", address: "13/F, 4-30 Tai Pa Tsui", hours: "11:00 - 20:00", status: "busy" },
      ],
      phone: "+852 2881 6881",
      whatsapp: "+852 9888 6881",
      form: {
        name: "Name",
        phone: "Phone/WhatsApp",
        model: "Phone Model",
        issue: "Issue Description",
        submit: "Send Booking",
      },
    },
    footer: {
      tagline: "FIXHUB - Professional Phone Repair",
      rights: "© 2024 FIXHUB Phone Repair. All rights reserved.",
    },
  },
};

export default function Home() {
  const [lang, setLang] = useState<Language>("zh");

  useEffect(() => {
    const savedLang = localStorage.getItem("fixhub-lang") as Language;
    if (savedLang && (savedLang === "zh" || savedLang === "en")) {
      setLang(savedLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "zh" ? "en" : "zh";
    setLang(newLang);
    localStorage.setItem("fixhub-lang", newLang);
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-tech-darker text-white grid-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-tech-dark/95 backdrop-blur-md border-b border-tech-purple/20">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-tech-purple to-tech-cyan rounded-lg flex items-center justify-center animate-pulse-glow">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h1 className="font-mono text-xl font-bold tracking-wider">FIXHUB</h1>
                <p className="text-xs text-tech-cyan font-mono">{lang === "zh" ? "香港專業維修" : "HK PRO REPAIR"}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 font-mono text-sm">
              <Link href="#services" className="text-white/70 hover:text-tech-cyan transition-colors">{t.nav.services}</Link>
              <Link href="#pricing" className="text-white/70 hover:text-tech-cyan transition-colors">{t.nav.pricing}</Link>
              <Link href="#process" className="text-white/70 hover:text-tech-cyan transition-colors">{t.nav.tracking}</Link>
              <Link href="#contact" className="text-white/70 hover:text-tech-cyan transition-colors">{t.nav.contact}</Link>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLang}
                className="font-mono text-xs bg-tech-gray px-3 py-1.5 rounded border border-tech-purple/30 hover:border-tech-purple transition-colors"
              >
                {lang === "zh" ? "EN" : "中"}
              </button>
              <Link href="#contact" className="btn-primary text-sm hidden md:inline">
                {t.nav.book}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding pt-32 relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-tech-purple/20 text-tech-purple px-4 py-2 rounded-full text-sm font-mono mb-6 border border-tech-purple/30">
                <span className="animate-pulse">●</span> {t.hero.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="glow-text">{t.hero.title}</span>
                <br />
                <span className="text-tech-cyan">{t.hero.titleHighlight}</span>
              </h1>
              <p className="text-xl text-white/60 mb-2 font-mono">{t.hero.subtitle}</p>
              <p className="text-white/50 mb-8 max-w-lg">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="#pricing" className="btn-primary">
                  {t.hero.cta1}
                </Link>
                <Link href="#contact" className="btn-urgent">
                  {t.hero.cta2}
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="card-tech text-center">
                  <p className="text-2xl font-bold text-tech-cyan">{t.hero.stats.time}</p>
                  <p className="text-xs text-white/50 font-mono">{t.hero.stats.timeLabel}</p>
                </div>
                <div className="card-tech text-center">
                  <p className="text-2xl font-bold text-tech-purple">{t.hero.stats.repairs}</p>
                  <p className="text-xs text-white/50 font-mono">{t.hero.stats.repairsLabel}</p>
                </div>
                <div className="card-tech text-center">
                  <p className="text-2xl font-bold text-tech-yellow">{t.hero.stats.warranty}</p>
                  <p className="text-xs text-white/50 font-mono">{t.hero.stats.warrantyLabel}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card-tech p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-tech-purple/10 to-tech-cyan/10" />
                <div className="relative text-center">
                  <div className="text-8xl mb-4">📱</div>
                  <h3 className="font-mono text-xl mb-2">{lang === "zh" ? "原廠品質零件" : "Genuine Parts"}</h3>
                  <p className="text-white/50 text-sm">{lang === "zh" ? "所有零件均為原廠品質" : "All parts are OEM quality"}</p>
                  <div className="mt-6 flex justify-center gap-2">
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">📱</span>
                    <span className="text-3xl">📱</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-tech-orange px-4 py-2 rounded-full font-mono text-sm font-bold animate-pulse">
                ⚡ {lang === "zh" ? "30分鐘快修" : "30min Fast"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-tech-dark/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="font-mono text-tech-cyan">{t.services.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              <span className="glow-text">{t.services.heading}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((service, index) => (
              <div key={index} className="card-tech group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{service.icon}</span>
                  <span className="font-mono text-xs text-tech-cyan bg-tech-cyan/10 px-2 py-1 rounded">{service.time}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-white/50 text-sm mb-4">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-tech-purple font-bold">{service.price}</span>
                  <Link href="#contact" className="text-xs text-tech-cyan hover:underline">
                    {lang === "zh" ? "預約 →" : "Book →"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="font-mono text-tech-yellow">{t.pricing.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              <span className="glow-text">{t.pricing.heading}</span>
            </h2>
            <p className="text-white/50">{t.pricing.description}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.pricing.items.map((item, index) => (
              <div key={index} className="card-tech text-center">
                <h4 className="font-mono text-sm mb-2">{item.model}</h4>
                <p className="text-2xl font-bold text-tech-cyan">{item.price}</p>
                <p className="text-xs text-white/40 line-through">{item.original}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-padding bg-tech-dark/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="font-mono text-tech-success">{t.process.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              <span className="glow-text">{t.process.heading}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {t.process.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card-tech text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-tech-purple to-tech-cyan rounded-full flex items-center justify-center">
                    <span className="font-mono text-xl font-bold">{step.step}</span>
                  </div>
                  <h3 className="font-bold mb-2">{step.name}</h3>
                  <p className="text-white/50 text-sm">{step.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-tech-purple">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="font-mono text-tech-purple">{t.contact.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              <span className="glow-text">{t.contact.heading}</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Locations */}
            <div>
              <div className="grid gap-4 mb-8">
                {t.contact.locations.map((loc, index) => (
                  <div key={index} className="card-tech flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{loc.name}</h3>
                      <p className="text-white/50 text-sm">{loc.address}</p>
                      <p className="text-white/50 text-xs font-mono">{loc.hours}</p>
                    </div>
                    <span className={loc.status === "available" ? "tag-status tag-available" : "tag-status tag-busy"}>
                      <span className={loc.status === "available" ? "animate-pulse" : ""}>●</span>
                      {loc.status === "available" ? (lang === "zh" ? "可Walk-in" : "Walk-in OK") : (lang === "zh" ? "繁忙" : "Busy")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={`tel:${t.contact.phone}`} className="card-tech flex-1 text-center">
                  <span className="text-2xl mb-2 block">📞</span>
                  <p className="font-mono text-sm">{t.contact.phone}</p>
                </a>
                <a href={`https://wa.me/${t.contact.whatsapp.replace(/\s/g, '')}`} className="card-tech flex-1 text-center">
                  <span className="text-2xl mb-2 block">💬</span>
                  <p className="font-mono text-sm">WhatsApp</p>
                </a>
              </div>
            </div>
            
            {/* Form */}
            <div className="card-tech">
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    className="w-full bg-tech-dark border border-tech-purple/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-tech-cyan focus:outline-none transition-colors font-mono"
                    placeholder={t.contact.form.name}
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    className="w-full bg-tech-dark border border-tech-purple/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-tech-cyan focus:outline-none transition-colors font-mono"
                    placeholder={t.contact.form.phone}
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    className="w-full bg-tech-dark border border-tech-purple/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-tech-cyan focus:outline-none transition-colors font-mono"
                    placeholder={t.contact.form.model}
                  />
                </div>
                <div>
                  <textarea 
                    className="w-full bg-tech-dark border border-tech-purple/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-tech-cyan focus:outline-none transition-colors font-mono h-24 resize-none"
                    placeholder={t.contact.form.issue}
                  />
                </div>
                <button type="submit" className="w-full btn-primary text-lg font-mono">
                  {t.contact.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-tech-purple/20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-tech-purple to-tech-cyan rounded flex items-center justify-center">
                <span className="text-sm">⚡</span>
              </div>
              <span className="font-mono font-bold">{t.footer.tagline}</span>
            </div>
            <p className="text-white/40 text-sm font-mono">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}