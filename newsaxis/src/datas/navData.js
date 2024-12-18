import {
    Home,
    User,
    Drama,
    TrendingUp,
    Tv,
    Trophy,
    HeartPulse,
    GraduationCap,
    Handshake,
    TriangleAlert,
    CloudHail,
    Earth
  } from "lucide-react"; // Import icons from lucide-react


export const navigationData = [
    { text: "Home", href: "/", icon: <Home />, category: [] },
    { text: "World", href: "/world", icon: <Earth />, category: ["India","USA","Australia","Gulf News",'Italy','france','Brazil','African','China','Korean','Japan'] },
    { text: "Politics", href: "/politics", icon: <User />, category: ["Elections", "Government", "Parties", "Policies"] },
    { text: "City ", href: "/latest", icon: <TrendingUp />, category: ['Kochi','Chennai','Bengaluru','Mumbai',"Delhi",'kolkata'] },
    { text: "മലയാളം News", href: "/manoramanews", icon: "", category: ["Latest","Sports"] },
    { text: "മലയാളം Reels", href: "/malayalamreels", icon: "", category: ["Latest","Sports"] },
    { text: "Entertainment", href: "/entertainment", icon: <Drama />, category: ["Movies", "TV Shows", "Music", "Celebrity News"] },
    { text: "Technology", href: "/technology", icon: <Tv />, category: ["SmartPhones", "AI", "Software", "Startups","ChatGpt"] },
    { text: "Sports", href: "/sports", icon: <Trophy />, category: ["All Sports", "Cricket", "Football", "Tennis", "Basketball", "Hockey"] },
    { text: "Health", href: "/health", icon: <HeartPulse />, category: ["Fitness", "Nutrition", "Mental Health", "Medical News"] },
    { text: "Business", href: "/business", icon: <Handshake />, category: ["Startups", "Investment", "Economy", "Companies"] },
    { text: "Education", href: "/education", icon: <GraduationCap />, category: ["Online Courses", "Scholarships", "Schools", "Exams"] },
    { text: "Alerts", href: "/alerts", icon: <TriangleAlert />, category: ["Breaking News", "Alerts", "Updates"] },
    { text: "Weather", href: "/weather", icon: <CloudHail />, category: ["Forecast", "Severe Weather", "Rain", "Temperature"] },

  ];
  