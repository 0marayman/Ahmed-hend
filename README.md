# 💌 دعوة زفاف أحمد وهند | Ahmed & Hend Wedding Invitation

دعوة زفاف رقمية تفاعلية فاخرة مصممة بأحدث تقنيات الويب، مستوحاة من ألوان وتصميم دعوة الزفاف الحقيقية للمهندس **أحمد محى الدين** و الأستاذة **هند أيمن** بمناسبة حفل زفافهما في **مسجد المشير طنطاوي - قاعة الساحة** بالقاهرة.

---

## ✨ المميزات الرئيسية (Features)

- ✉️ **غلاف تفاعلي فاخر (Interactive Envelope)**:
  - ختم شمعي ذهبي بتطريز حرفي A & H.
  - نقوش وزهور طبيعية مفرغة بدون خلفية تندمج مع التصميم.
  - فتح سلس وظهور قصاصات الاحتفال (Confetti).
- 📷 **صورة الطفولة وبطاقة Save The Date**:
  - عرض صورة الذكرى الأولى بالزي الأبيض مع إطار فوتوغرافي مميز وتاريخ المناسبة.
- 📜 **بطاقات أهل العروسين الرسمية**:
  - دعوة رسمية باسم عائلة الأستاذ محى الدين وعائلة الأستاذ أيمن.
- 🖼️ **معرض صور تفاعلي (Photo Carousel)**:
  - صور الزفاف والخطوبة مع سلايدر تلقائي وأسهم تنقل.
  - إمكانية تكبير الصور واستعراضها بملء الشاشة (Fullscreen Lightbox).
- 📅 **تفاصيل الموعد والتقويم**:
  - تاريخ وتوقيت الحفل: **السبت 26 سبتمبر 2026 - الساعة 7:00 مساءً**.
  - عد تنازلي حي ومباشر حتى لحظة الحفل.
  - زر الإضافة المباشرة إلى **Google Calendar** وتنزيل ملف التقويم **Apple / Outlook (.ics)**.
- 📍 **خريطة موقع الحفل (Venue Map)**:
  - مسجد المشير طنطاوي - قاعة الساحة (محور المشير، القاهرة الجديدة).
  - زر ملاحة مباشر يفتح تطبيق **Google Maps**.
- 🎵 **مشغل زفة خلفية تلقائي (Ambient Audio Player)**:
  - يبدأ صوت الزفة تلقائياً مع زر عائم للتشغيل والإيقاف.
- 💬 **مشاركة الدعوة (Share Options)**:
  - زر إرسال ومشاركة مباشرة عبر **WhatsApp** بنص جاهز ومنسق.
  - زر نسخ رابط الدعوة بنقرة واحدة.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **React 19** - واجهات المستخدم التفاعلية الحديثة
- **TypeScript** - دقة وأمان الأنواع البرمجية
- **Vite 6** - أداة بناء فائقة السرعة
- **Tailwind CSS v4** - تصميم عصري ومتجاوب لجميع مقاسات الشاشات
- **Motion (`motion/react`)** - مؤثرات حركية ناعمة وانتقالات فاخرة
- **Canvas Confetti** - احتفالية القصاصات عند فتح الظرف
- **Lucide React** - أيقونات عصرية وخفيفة

---

## 🚀 التشغيل المحلي (Getting Started)

### المتطلبات الأساسية
- تثبيت [Node.js](https://nodejs.org/) (إصدار 18 أو أحدث)
- مدير الحزم `npm` (يأتي مدمجاً مع Node.js)

### خطوات التشغيل

1. **استنساخ المستودع (Clone Repository)**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ahmed-hend-wedding-invitation.git
   cd ahmed-hend-wedding-invitation
   ```

2. **تثبيت الحزم (Install Dependencies)**:
   ```bash
   npm install
   ```

3. **بدء خادم التطوير (Run Development Server)**:
   ```bash
   npm run dev
   ```
   افتح المتصفح على: `http://localhost:3000`

4. **بناء النسخة الإنتاجية (Production Build)**:
   ```bash
   npm run build
   ```

---

## 📤 خطوات الرفع على GitHub (Push to GitHub)

إذا كنت تنشئ مستودعاً جديداً على حسابك في GitHub:

1. أنشئ مستودعاً جديداً (New Repository) على [GitHub](https://github.com/new) باسم مثلاً: `wedding-invitation`.
2. في مجلد المشروع في جهازك، نفّذ الأوامر التالية:

```bash
# 1. تهيئة المستودع المحلي
git init -b main

# 2. إضافة جميع الملفات
git add .

# 3. حفظ أول Commit
git commit -m "feat: initial commit - Ahmed & Hend wedding invitation"

# 4. ربط المستودع برابط GitHub الخاص بك (استبدل بالرابط الخاص بك)
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git

# 5. رفع الكود
git push -u origin main
```

---

## 🌐 خيارات النشر المجاني (Free Deployment)

المشروع عبارة عن تطبيق ويب ثابت (SPA) جاهز للنشر الفوري على أي منصة استضافة مجانية:

### 1. النشر على Vercel (مستحسن ⭐)
- توجه إلى [vercel.com](https://vercel.com) وسجّل الدخول بحساب GitHub.
- اختر **Add New Project** وحدد مستودع الدعوة.
- سيتعرف Vercel على إعدادات Vite تلقائياً. اضغط **Deploy**.

### 2. النشر على Netlify
- توجه إلى [netlify.com](https://netlify.com).
- اختر **Import from Git** وحدد المستودع.
- Build command: `npm run build`
- Publish directory: `dist`
- اضغط **Deploy**.

---

## 📁 هيكل المشروع (Project Structure)

```text
├── public/                 # الصور الثابتة والملفات الصوتية (الزفة والصور الحقيقية)
│   ├── IMG-20260916-WA0002.jpg  # صورة الطفولة
│   ├── IMG-20260916-WA0004.jpg  # صورة دبل الخطوبة
│   ├── IMG-20260916-WA0005.jpg  # صورة العروسين
│   ├── frame_nobg.png           # الورد المفرغ الشفاف
│   └── wedding_zaffa.mp3        # صوت الزفة
├── src/
│   ├── assets/             # الأصول التصميمية
│   ├── components/         # مكونات الدعوة
│   │   ├── AudioPlayer.tsx       # مشغل الزفة
│   │   ├── EnvelopeIntro.tsx     # غلاف الدعوة والختم الشمعي
│   │   ├── NavigationDock.tsx    # شريط التنقل السفلي السريع
│   │   ├── PartyInfoCard.tsx     # بطاقات والد العريس ووالد العروسة
│   │   ├── PhotoCarousel.tsx     # معرض الصور الدائري
│   │   ├── ReceptionCard.tsx     # بطاقة تفاصيل الموعد والتقويم
│   │   ├── SaveTheDateHero.tsx   # بطاقة Save The Date الأولى
│   │   ├── VenueMapCard.tsx      # بطاقة خريطة وموقع الحفل
│   │   └── WhatsAppShareCard.tsx # بطاقة المشاركة عبر واتساب
│   ├── data/
│   │   └── weddingData.ts        # بيانات ومواعيد وأسماء الحفل
│   ├── types.ts            # تعريفات TypeScript
│   ├── App.tsx             # الصفحة الرئيسية للتطبيق
│   ├── main.tsx            # نقطة الدخول
│   └── index.css           # ملف التنسيقات العامة و Tailwind
├── package.json
├── vite.config.ts
└── README.md
```

---

بارك الله للعروسين وجمع بينهما في خير 🤍
