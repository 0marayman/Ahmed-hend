import { CoupleMember, WeddingEvent, StoryMilestone, GalleryPhoto, GuestWish, BankAccount } from '../types';

export const INITIAL_GROOM: CoupleMember = {
  name: 'Ahmed',
  role: 'Groom',
  fullName: 'احمد محى الدين',
  bio: 'مهندس معماري، عندما التقيت بهند أدركت أن كل خطوة في حياتي كانت تقودني إليها.',
  parents: 'ابن الأستاذ محى الدين & السيدة الفاضلة',
  avatar: '/IMG-20260916-WA0005.jpg',
  quote: '"منذ اللحظة الأولى، علمت أن قلبي قد وجد موطنه الحقيقي."',
  instagram: '@ahmed.mohy'
};

export const INITIAL_BRIDE: CoupleMember = {
  name: 'Hend',
  role: 'Bride',
  fullName: 'هند أيمن',
  bio: 'مهندسة ومصممة، رفيقة الدرب والروح التي أضاءت كل تفاصيل أيامي.',
  parents: 'ابنة الأستاذ أيمن & السيدة الفاضلة',
  avatar: '/IMG-20260916-WA0005.jpg',
  quote: '"أنت لحني المفضل اليوم وكل يوم، وبداية أجمل فصول العمر."',
  instagram: '@hend.ayman'
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'reception',
    title: 'معلومات حفل الزفاف',
    subTitle: 'حفل الزفاف',
    date: 'السبت، 26 سبتمبر 2026',
    time: 'PM 7:00',
    timestamp: '2026-09-26T19:00:00',
    venueName: 'مسجد المشير طنطاوي قاعة الساحة',
    address: 'محور المشير طنطاوي، القاهرة، مصر',
    coordinates: {
      lat: 30.017118,
      lng: 31.382790
    },
    dressCode: 'Formal Chic / أزياء رسمية أنيقة',
    dressColors: ['#520b1b', '#F5EBE6', '#D4AF37', '#2C2725'],
    notes: 'حضوركم شرف لنا ويسعدنا مشاركتكم فرحتنا في هذه الليلة المميزة.'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: '/IMG-20260916-WA0002.jpg',
    title: 'صورة الطفولة البريئة',
    caption: 'منذ الصغر والقدر يكتب حكايتنا الجميلة',
    category: 'portraits',
    aspectRatio: 'square'
  },
  {
    id: 'photo-2',
    url: '/IMG-20260916-WA0005.jpg',
    title: 'لحظات الخطوبة المباركة',
    caption: 'معاً في بداية طريق ملؤه المودة والرحمة',
    category: 'moments',
    aspectRatio: 'square'
  },
  {
    id: 'photo-3',
    url: '/IMG-20260916-WA0004.jpg',
    title: 'خواتم الزفاف والزهور',
    caption: 'عهد المحبة والوفاء لآخر العمر',
    category: 'details',
    aspectRatio: 'square'
  }
];

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'wish-1',
    author: 'كريم & ياسمين',
    guestSide: 'groom',
    message: 'ألف مليون مبروك لأجمل عروسين أحمد وهند! بارك الله لكما وبارك عليكما وجمع بينكما في خير.',
    likes: 24,
    createdAt: 'منذ ساعتين'
  },
  {
    id: 'wish-2',
    author: 'نور الشريف',
    guestSide: 'bride',
    message: 'هنودة الجميلة وأحمد الغالي، فرحتي بيكم ما تتوصفش! ربنا يسعدكم ويجعل كل أيامكم هنا وسرور.',
    likes: 31,
    createdAt: 'منذ 5 ساعات'
  },
  {
    id: 'wish-3',
    author: 'العم طارق وحرمه',
    guestSide: 'mutual',
    message: 'أجمل التهاني القلبية بالزفاف المبارك، دمتم سكنًا وملاذًا لبعضكما البعض دائماً وأبداً.',
    likes: 19,
    createdAt: 'أمس'
  }
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    recipientRole: 'العريس',
    ownerName: 'احمد محى الدين',
    bankName: 'البنك التجاري الدولي (CIB)',
    accountNumber: '1000 4829 9182 04',
    branch: 'فرع القاهرة',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Ahmed%20Mohy%20Eldin%20CIB%2010004829918204'
  },
  {
    recipientRole: 'العروسة',
    ownerName: 'هند أيمن',
    bankName: 'بنك HSBC مصر',
    accountNumber: '028 849102 001',
    branch: 'فرع مصر الجديدة',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Hend%20Ayman%20HSBC%20028849102001'
  }
];
