import { CoupleMember, StoryMilestone, WeddingEvent, GalleryPhoto, GuestWish } from '../types';
import { childhoodPhoto, ringsPhoto, couplePhoto } from '../assets';

export const GROOM_DATA: CoupleMember = {
  name: 'احمد محى الدين',
  parents: 'ابن الأستاذ محى الدين وعائلته الكريمة',
  bio: 'مهندس ومحب للحياة والمغامرة، أسعد إنسان بأن اختاره الله شريكاً لهند.',
  quote: 'وجدت فيكِ السكينة، والوطن، وأجمل ما تمنيت في حياتي.',
  avatar: couplePhoto,
  instagram: '@ahmed_mohy'
};

export const BRIDE_DATA: CoupleMember = {
  name: 'هند أيمن',
  parents: 'كريمة الأستاذ أيمن وعائلته الكريمة',
  bio: 'روح تملأ المكان دفئاً وجمالاً، تنتظر بداية فصلها الجديد مع أحمد.',
  quote: 'معك تبدأ كل حكايات السعادة، ولك في قلبي حب لا ينتهي.',
  avatar: couplePhoto,
  instagram: '@hend_ayman'
};

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    id: 'milestone-1',
    date: 'منذ الطفولة',
    title: 'بداية الحكاية',
    location: 'القاهرة، مصر',
    description: 'قصة بريئة جمعت قلبين من الصغر وكتب لها القدر أن تلتقي وتكتمل.',
    image: childhoodPhoto
  },
  {
    id: 'milestone-2',
    date: 'يوم الخطوبة',
    title: 'خاتم العهد والوعد',
    location: 'القاهرة',
    description: 'خطوة نحو الحلم المشترك، وعهد بالمودة والرحمة لبناء حياة مباركة.',
    image: ringsPhoto
  },
  {
    id: 'milestone-3',
    date: '26 سبتمبر 2026',
    title: 'يوم الزفاف الميمون',
    location: 'مسجد المشير طنطاوي - قاعة الساحة',
    description: 'اليوم الذي نتوجه بحضوركم ودعواتكم الصالحة التي تسعد قلوبنا.',
    image: couplePhoto
  }
];

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'ceremony',
    title: 'عقد القران وحفل الزفاف',
    subTitle: 'مراسيم الزفاف واستقبال الأهل والأحباب',
    date: 'السبت، 26 سبتمبر 2026',
    time: '07:00 مساءً',
    venueName: 'مسجد المشير طنطاوي - قاعة الساحة',
    address: 'محور المشير طنطاوي، التجمع الخامس، القاهرة الجديدة',
    notes: 'حضوركم شرف لنا ويزيد بهجتنا، نرجو التواجد قبل الموعد بـ 15 دقيقة.',
    dressCode: 'Formal / الزي الرسمي الأنيق',
    dressColors: ['#520b1b', '#1f2937', '#d4af37', '#ffffff'],
    coordinates: {
      lat: 30.017118,
      lng: 31.382790
    }
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: childhoodPhoto,
    title: 'Save The Date',
    caption: 'أحمد وهند منذ الطفولة',
    category: 'portraits'
  },
  {
    id: 'photo-2',
    url: couplePhoto,
    title: 'أحمد & هند',
    caption: 'معاً في أجمل أيام العمر',
    category: 'prewedding'
  },
  {
    id: 'photo-3',
    url: ringsPhoto,
    title: 'دبل الخطوبة والورد',
    caption: 'رمز الوفاء والرباط المقدس',
    category: 'details'
  }
];

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'wish-1',
    author: 'عائلة العريس والعروسة',
    guestSide: 'mutual',
    message: 'بارك الله لكما وبارك عليكما وجمع بينكما في خير، وجعل أيامكم عامرة بالمودة والرحمة.',
    likes: 12,
    createdAt: 'اليوم'
  },
  {
    id: 'wish-2',
    author: 'أصدقاء أحمد',
    guestSide: 'groom',
    message: 'ألف مبروك يا غالي، ربنا يتمم لك على ألف خير ويسعدكم دائماً يا رب!',
    likes: 8,
    createdAt: 'منذ قليل'
  },
  {
    id: 'wish-3',
    author: 'صديقات هند',
    guestSide: 'bride',
    message: 'أحلى وأجمل عروسة، ربنا يفرح قلبك وينور طريقكم بالخير والبركة.',
    likes: 9,
    createdAt: 'منذ قليل'
  }
];
