import { Website } from '@/types';

export const PUBLISHED_WEBSITES: Website[] = [
  {
    href: "https://risingelectronics.com",
    slug: "rising-electronics",
    thumbnail: "/assets/websites/published/hero.png",
    tagEn: "Commerce",
    tagZh: "商業",
    titleEn: "Rising Electronics",
    titleZh: "穗升國際有限公司",
    domain: "risingelectronics.com",
    descriptionEn: "An electronics manufacturer based in Hong Kong.",
    descriptionZh: "一家位於香港的電子產品製造商。",
    category: "published" as const,
    quoteEn: "Providing affordable, trusted home electronics across Africa, Middle East.",
    quoteZh: "為非洲和中東地區提供價格合理、值得信賴的家用電子產品。",
    challengeEn: "Rising Electronics needed a modern digital presence to showcase their manufacturing capabilities and reach global clients while maintaining their heritage in Hong Kong.",
    challengeZh: "穗升國際需要一個現代化的數字平台，在保持香港傳統的同時，展示其製造能力並觸及全球客戶。",
    solutionEn: "We developed a clean, professional website that highlights their product categories, manufacturing process, and international quality standards with a focus on ease of navigation.",
    solutionZh: "我們開發了一個簡潔、專業的網站，重點介紹了他們的產品類別、製造流程和國際質量標準，並注重導航的便捷性。",
    skillsEn: ["Web Design & Development", "Content Management System", "Responsive Design", "Third Party Integration"],
    skillsZh: ["網頁設計與開發", "內容管理系統", "響應式設計", "第三方功能整合"],
    logo: "/assets/websites/published/rising_icon.png",
    galleryBg: "transparent",
    stackedBg: "transparent",
    mobileBg: "transparent",
    gallery: {
      hero: "/assets/websites/published/hero.png",
      top: "/assets/websites/published/collection.png",
      bottomLeft: "/assets/websites/published/about.png",
      bottomRight: "/assets/websites/published/contact.png",
      stacked: [
        "/assets/websites/published/search.png",
        "/assets/websites/published/new_arrivals.png",
        "/assets/websites/published/footer.png"
      ],
      mobileLeft: "/assets/websites/published/rising_mobile_left.png",
      mobileRight: "/assets/websites/published/rising_mobile_right.png",
      // footer: "/assets/websites/published/footer.png"
    }
  }
];

export const TEMPLATES: Website[] = [
  {
    href: "/demos/event_template/index.html",
    thumbnail: "/assets/websites/templates/event_template_website_frontpage.png",
    tagEn: "Events",
    tagZh: "活動",
    titleEn: "Event Template",
    titleZh: "活動模板",
    descriptionEn: "A flexible template for events and occasions.",
    descriptionZh: "一個適用於活動和場合的靈活模板。",
    category: "templates" as const,
  },
  {
    href: "/demos/dentist_template/index.html",
    thumbnail: "/assets/websites/templates/dentist_template_website_frontpage.png",
    tagEn: "Medical",
    tagZh: "醫療",
    titleEn: "Hong Kong Dental Clinic",
    titleZh: "香港牙科診所",
    descriptionEn: "A bilingual dental clinic template for Hong Kong.",
    descriptionZh: "一個適合香港的雙語牙科診所模板。",
    category: "templates" as const,
  },
  {
    href: "/demos/gym_template/index.html",
    thumbnail: "/assets/websites/templates/gym_template_website_frontpage.png",
    tagEn: "Fitness",
    tagZh: "健身",
    titleEn: "Hong Kong Functional Fitness",
    titleZh: "香港功能性健身",
    descriptionEn: "A bilingual gym template with EN/ZH switching.",
    descriptionZh: "一個帶有中英文切換的雙語健身模板。",
    category: "templates" as const,
  },
  {
    href: "/demos/hair_salon_template/index.html",
    thumbnail: "/assets/websites/templates/hair_salon_template_website_frontpage.png",
    tagEn: "Beauty",
    tagZh: "美容",
    titleEn: "Hong Kong Hair Salon",
    titleZh: "香港髮廊時尚",
    descriptionEn: "A bilingual hair salon template with EN/ZH switching.",
    descriptionZh: "一個帶有中英文切換的雙語髮廊模板。",
    category: "templates" as const,
  },
  {
    href: "/demos/barefoot_shoe_template/index.html",
    thumbnail: "/assets/websites/templates/barefoot_shoe_template_website_frontpage.png",
    tagEn: "Footwear",
    tagZh: "鞋履",
    titleEn: "Hong Kong Barefoot Shoes",
    titleZh: "香港赤足鞋",
    descriptionEn: "A bilingual barefoot shoe store template with EN/ZH switching.",
    descriptionZh: "一個帶有中英文切換的雙語赤足鞋店模板。",
    category: "templates" as const,
  },
  {
    href: "/demos/phone_repair_template/index.html",
    thumbnail: "/assets/websites/templates/phone_repair_template_website_frontpage.png",
    tagEn: "Tech Repair",
    tagZh: "科技維修",
    titleEn: "FIXHUB Phone Repair",
    titleZh: "FIXHUB 手機維修",
    descriptionEn: "A bilingual phone repair template with tech aesthetic.",
    descriptionZh: "一個帶有科技感雙語風格的手機維修模板。",
    category: "templates" as const,
  }
];

export const INITIAL_PROJECTS = [
  {
    repo: 'jobsdb-scraper',
    icon: 'https://hk.jobsdb.com/static/shared-web/favicon-4e1897dfd0901e8a3bf7e604d3a90636.ico',
    name: 'JobsDB Scraper',
    description: 'A tool to scrape job listings from JobsDB.',
    url: '#',
  },
  {
    repo: 'whatstheweatherlike',
    icon: 'https://ssl.gstatic.com/onebox/weather/64/sunny.png',
    name: "What's the weather like",
    description: 'A simple weather application.',
    url: '#',
  },
  {
    repo: 'chatroom',
    icon: '/assets/live-chat.png',
    name: 'Chatroom',
    description: 'A real-time chat application.',
    url: '#',
  },
];
