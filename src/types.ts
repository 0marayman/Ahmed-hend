export interface CoupleMember {
  name: string;
  role: 'Groom' | 'Bride';
  fullName: string;
  bio: string;
  parents: string;
  avatar: string;
  quote: string;
  instagram?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  time: string;
  timestamp: string; // ISO string for calendar/countdown
  venueName: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dressCode: string;
  dressColors: string[];
  notes?: string;
}

export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  location?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: 'portraits' | 'moments' | 'details' | 'prewedding';
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface RSVPRecord {
  id: string;
  guestName: string;
  phoneOrEmail: string;
  attendance: 'attending' | 'declined' | 'tentative';
  guestCount: number;
  guestSide: 'groom' | 'bride' | 'mutual';
  dietaryNotes: string;
  wishes: string;
  submittedAt: string;
}

export interface GuestWish {
  id: string;
  author: string;
  guestSide: 'groom' | 'bride' | 'mutual';
  message: string;
  likes: number;
  createdAt: string;
}

export interface BankAccount {
  recipientRole: 'Groom' | 'Bride' | 'العريس' | 'العروسة';
  ownerName: string;
  bankName: string;
  accountNumber: string;
  branch?: string;
  qrCodeUrl: string;
}
