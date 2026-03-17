// Mock data store - replace with database integration when ready

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  recap?: string;
};

export type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  createdAt: string;
};

export type GalleryImage = {
  src: string;
  category: "Runs" | "Events" | "Community";
  alt: string;
};

// Initial mock events
export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Sunday Morning Run",
    description:
      "Join us for our weekly Sunday morning community run around Ana Sagar Lake. Perfect for all fitness levels with different pace groups available.",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Ana Sagar Lake, Ajmer",
  },
  {
    id: "2",
    title: "Monsoon Trail Challenge",
    description:
      "Experience the beauty of Ajmer hills during monsoon. A 10km trail run through scenic routes with post-run refreshments.",
    date: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Taragarh Hill, Ajmer",
  },

  {
    id: "5",
    title: "Spring Marathon 2025",
    description:
      "Our annual half marathon event covering the beautiful heritage routes of Ajmer. Categories: 5K, 10K, 21K.",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Ajmer Junction to Pushkar",
    recap:
      "An incredible event with over 500 participants! Thank you to everyone who made it special.",
  },
  {
    id: "6",
    title: "Republic Day Run",
    description:
      "Patriotic themed run celebrating our nation. Wear orange, white, and green!",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Government College Grounds, Ajmer",
    recap:
      "A memorable morning with 300+ runners showing their patriotic spirit!",
  },
];

// Gallery images - using placeholder images
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
    category: "Runs",
    alt: "Morning run group",
  },
  {
    src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&h=500&fit=crop",
    category: "Runs",
    alt: "Trail running",
  },
  {
    src: "https://images.unsplash.com/photo-1461896836934-28cb41c26e12?w=600&h=450&fit=crop",
    category: "Runs",
    alt: "Runners at sunrise",
  },
  {
    src: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=600&h=400&fit=crop",
    category: "Events",
    alt: "Marathon finish line",
  },
  {
    src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=500&fit=crop",
    category: "Events",
    alt: "Running event",
  },
  {
    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop",
    category: "Community",
    alt: "Team celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=450&fit=crop",
    category: "Community",
    alt: "Group stretching",
  },
  {
    src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=500&fit=crop",
    category: "Runs",
    alt: "Running in nature",
  },
  {
    src: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=600&h=400&fit=crop",
    category: "Events",
    alt: "Night run",
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=450&fit=crop",
    category: "Community",
    alt: "Yoga session",
  },
];

// Stats for homepage
export const STATS = [
  { label: "Active Runners", value: 24, suffix: "+" },
  { label: "Runs Completed", value: 13, suffix: "+" },
  { label: "Upcoming Events", value: 4, suffix: "" },
  { label: "km Run Together", value: 60, suffix: "km+" },
];

// Local storage helpers for registrations
const REGISTRATIONS_KEY = "strike_run_registrations";

export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(REGISTRATIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export function addRegistration(
  reg: Omit<Registration, "id" | "createdAt">,
): Registration {
  const registrations = getRegistrations();
  const newReg: Registration = {
    ...reg,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  };
  registrations.push(newReg);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  return newReg;
}

export function getEvents(): Event[] {
  return MOCK_EVENTS;
}

export function getEventById(id: string): Event | undefined {
  return MOCK_EVENTS.find((e) => e.id === id);
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return MOCK_EVENTS.filter((e) => new Date(e.date) >= now).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function getPastEvents(): Event[] {
  const now = new Date();
  return MOCK_EVENTS.filter((e) => new Date(e.date) < now).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getNextEvent(): Event | undefined {
  return getUpcomingEvents()[0];
}
