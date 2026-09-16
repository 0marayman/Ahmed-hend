export interface CoupleMember {
  name: string;
  parents: string;
  bio: string;
  quote: string;
  avatar: string;
  instagram?: string;
}

export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  location?: string;
  description: string;
  image: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  notes?: string;
  dressCode: string;
  dressColors: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: 'portraits' | 'prewedding' | 'moments' | 'details';
}

export interface GuestWish {
  id: string;
  author: string;
  guestSide: 'groom' | 'bride' | 'mutual';
  message: string;
  likes: number;
  createdAt: string;
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

export interface BankAccount {
  bankName: string;
  ownerName: string;
  accountNumber: string;
  recipientRole: 'Groom' | 'Bride';
}
