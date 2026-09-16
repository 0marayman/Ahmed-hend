import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RSVPRecord } from '../types';
import { 
  Heart, 
  Send, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  User, 
  Phone, 
  Users, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Download,
  Share2,
  Lock,
  ListFilter
} from 'lucide-react';

interface RSVPSectionProps {
  onRSVPSubmit: (record: RSVPRecord) => void;
  rsvps: RSVPRecord[];
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ onRSVPSubmit, rsvps }) => {
  // Read query params for personalized guest greeting (e.g. ?guest=John+Doe or ?to=Sarah)
  const [guestName, setGuestName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declined' | 'tentative'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [guestSide, setGuestSide] = useState<'groom' | 'bride' | 'mutual'>('mutual');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [wishes, setWishes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<RSVPRecord | null>(null);
  const [showAdminList, setShowAdminList] = useState(false);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get('guest') || urlParams.get('to') || urlParams.get('name');
      if (guestParam) {
        setGuestName(guestParam.replace(/\+/g, ' '));
      }
    } catch {
      // url search param fallback
    }
  }, []);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E5C07B', '#F7E7CE', '#C5A880', '#F27D92']
      });
    } catch {
      // fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newRecord: RSVPRecord = {
      id: 'rsvp-' + Date.now(),
      guestName: guestName.trim(),
      phoneOrEmail: phoneOrEmail.trim(),
      attendance,
      guestCount: attendance === 'attending' ? guestCount : 0,
      guestSide,
      dietaryNotes: dietaryNotes.trim(),
      wishes: wishes.trim(),
      submittedAt: new Date().toISOString()
    };

    onRSVPSubmit(newRecord);
    setSubmittedRecord(newRecord);
    setIsSubmitted(true);

    if (attendance === 'attending') {
      triggerCelebration();
    }
  };

  const handleExportCSV = () => {
    if (rsvps.length === 0) return;
    const headers = 'ID,Name,Contact,Status,Count,Side,Dietary,Wishes,Date\n';
    const rows = rsvps
      .map(
        (r) =>
          `"${r.id}","${r.guestName.replace(/"/g, '""')}","${r.phoneOrEmail}","${r.attendance}","${r.guestCount}","${r.guestSide}","${r.dietaryNotes.replace(/"/g, '""')}","${r.wishes.replace(/"/g, '""')}","${r.submittedAt}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-rsvps-mohyeldin-hend.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Container with elegant gold frame accent */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-[#e8dfd5] shadow-lg shadow-[#93714b]/5">
        {/* Subtle decorative stamp */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="w-12 h-12 rounded-full border border-dashed border-[#b88e4f]/40 flex items-center justify-center text-[#93714b]/60">
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <p className="font-script text-2xl sm:text-3xl text-[#b88e4f]">
            R.S.V.P
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2c241e] mt-1">
            Will You Join Us?
          </h3>
          <p className="text-xs sm:text-sm text-[#7d7065] mt-2">
            Please kindly confirm your attendance by October 1st, 2026 to help us prepare the warmest celebration for you.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="rsvp-name" className="block text-xs font-semibold text-[#4a3f35] uppercase tracking-wider mb-2">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a39485]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  placeholder="e.g. Karim Mansour / Sarah & Guest"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#fdfaf6] border border-[#e4d8cb] focus:border-[#93714b] focus:ring-2 focus:ring-[#93714b]/20 rounded-xl text-sm text-[#2c241e] transition-all outline-none"
                />
              </div>
            </div>

            {/* Phone or Email */}
            <div>
              <label htmlFor="rsvp-contact" className="block text-xs font-semibold text-[#4a3f35] uppercase tracking-wider mb-2">
                Phone Number or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a39485]">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="rsvp-contact"
                  type="text"
                  placeholder="For invitation reminders & updates"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#fdfaf6] border border-[#e4d8cb] focus:border-[#93714b] focus:ring-2 focus:ring-[#93714b]/20 rounded-xl text-sm text-[#2c241e] transition-all outline-none"
                />
              </div>
            </div>

            {/* Attendance Options */}
            <div>
              <label className="block text-xs font-semibold text-[#4a3f35] uppercase tracking-wider mb-2.5">
                Attendance Confirmation <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  id="attendance-attending"
                  onClick={() => setAttendance('attending')}
                  className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    attendance === 'attending'
                      ? 'bg-[#93714b] text-white border-[#93714b] shadow-xs ring-2 ring-[#93714b]/20'
                      : 'bg-[#fdfaf6] text-[#5e5043] border-[#e4d8cb] hover:border-[#b88e4f]'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 mb-1 ${attendance === 'attending' ? 'text-white' : 'text-emerald-600'}`} />
                  <span className="font-semibold text-xs sm:text-sm">Joyfully Accept</span>
                  <span className="text-[11px] opacity-80 mt-0.5">I will be there!</span>
                </button>

                <button
                  type="button"
                  id="attendance-declined"
                  onClick={() => setAttendance('declined')}
                  className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    attendance === 'declined'
                      ? 'bg-[#524438] text-white border-[#524438] shadow-xs'
                      : 'bg-[#fdfaf6] text-[#5e5043] border-[#e4d8cb] hover:border-[#b88e4f]'
                  }`}
                >
                  <XCircle className={`w-5 h-5 mb-1 ${attendance === 'declined' ? 'text-white' : 'text-rose-500'}`} />
                  <span className="font-semibold text-xs sm:text-sm">Regretfully Decline</span>
                  <span className="text-[11px] opacity-80 mt-0.5">Celebrating in spirit</span>
                </button>

                <button
                  type="button"
                  id="attendance-tentative"
                  onClick={() => setAttendance('tentative')}
                  className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    attendance === 'tentative'
                      ? 'bg-[#7d6957] text-white border-[#7d6957] shadow-xs'
                      : 'bg-[#fdfaf6] text-[#5e5043] border-[#e4d8cb] hover:border-[#b88e4f]'
                  }`}
                >
                  <HelpCircle className={`w-5 h-5 mb-1 ${attendance === 'tentative' ? 'text-white' : 'text-amber-500'}`} />
                  <span className="font-semibold text-xs sm:text-sm">Not Sure Yet</span>
                  <span className="text-[11px] opacity-80 mt-0.5">Will update soon</span>
                </button>
              </div>
            </div>

            {/* If Attending: Number of Guests & Guest Side */}
            {attendance === 'attending' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#faf5ef] border border-[#ebdcd0]">
                {/* Number of Attendees */}
                <div>
                  <label htmlFor="rsvp-count" className="block text-xs font-semibold text-[#4a3f35] uppercase tracking-wider mb-2">
                    Party Size (Including You)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a39485]">
                      <Users className="w-4 h-4" />
                    </div>
                    <select
                      id="rsvp-count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e4d8cb] focus:border-[#93714b] rounded-xl text-sm text-[#2c241e] outline-none"
                    >
                      <option value={1}>1 Guest (Just myself)</option>
                      <option value={2}>2 Guests (Me + 1)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests (Family)</option>
                    </select>
                  </div>
                </div>

                {/* Guest Connection / Side */}
                <div>
                  <label htmlFor="rsvp-side" className="block text-xs font-semibold text-[#4a3f35] uppercase tracking-wider mb-2">
                    Guest of
                  </label>
                  <select
                    id="rsvp-side"
                    value={guestSide}
                    onChange={(e) => setGuestSide(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-white border border-[#e4d8cb] focus:border-[#93714b] rounded-xl text-sm text-[#2c241e] outline-none"
                  >
                    <option value="groom">Mohyeldin's Family & Friends</option>
                    <option value="bride">Hend's Family & Friends</option>
                    <option value="mutual">Mutual Friends & Colleagues</option>
                  </select>
                </div>
              </div>
            )}

            {/* Dietary notes */}
            {attendance === 'attending' && (
              <div>
                <label htmlFor="rsvp-diet" className="block text-xs font-semibold text-[#4a3f35] uppercase tracking-wider mb-2">
                  Dietary Preferences / Allergies (Optional)
                </label>
                <input
                  id="rsvp-diet"
                  type="text"
                  placeholder="e.g. Vegetarian, Nut Allergy, Gluten-free"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#fdfaf6] border border-[#e4d8cb] focus:border-[#93714b] rounded-xl text-sm text-[#2c241e] outline-none"
                />
              </div>
            )}

            {/* Heartfelt Wishes / Blessing */}
            <div>
              <label htmlFor="rsvp-wishes" className="block text-xs font-semibold text-[#4a3f35] uppercase tracking-wider mb-2">
                Congratulatory Message / Blessing for the Couple
              </label>
              <textarea
                id="rsvp-wishes"
                rows={3}
                placeholder="Write your wishes, blessings, or sweet memories for Mohyeldin & Hend..."
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                className="w-full px-4 py-3 bg-[#fdfaf6] border border-[#e4d8cb] focus:border-[#93714b] rounded-xl text-sm text-[#2c241e] outline-none resize-none"
              />
              <p className="text-[11px] text-[#938477] mt-1">
                Your blessing will also be placed on the digital Guest Wishes Wall!
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-submit-rsvp"
              className="w-full py-3.5 px-6 bg-[#93714b] hover:bg-[#7d5f3d] text-white font-medium text-sm sm:text-base rounded-xl shadow-md shadow-[#93714b]/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Send RSVP Confirmation</span>
            </button>
          </form>
        ) : (
          /* Confirmation Pass / Digital Wedding Pass */
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-display text-2xl text-[#2c241e] font-bold">
                Thank You, {submittedRecord?.guestName}!
              </h4>
              <p className="text-sm text-[#6c5d51] mt-1">
                {submittedRecord?.attendance === 'attending'
                  ? 'Your RSVP has been confirmed! We cannot wait to celebrate our big day with you.'
                  : 'We have received your response. Thank you so much for your warm thoughts and blessings!'}
              </p>
            </div>

            {/* Digital Pass Card */}
            {submittedRecord?.attendance === 'attending' && (
              <div
                id="digital-wedding-pass"
                className="max-w-md mx-auto bg-gradient-to-br from-[#faf6f0] to-[#f4ebe1] border-2 border-dashed border-[#b88e4f]/50 rounded-2xl p-6 text-left shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-[#ebd8c5] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#93714b] font-bold">
                      Wedding Guest Pass
                    </span>
                    <h5 className="font-display text-lg font-bold text-[#2c241e]">
                      Mohyeldin & Hend
                    </h5>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#b88e4f]" />
                </div>

                <div className="space-y-2 text-xs text-[#524438]">
                  <div className="flex justify-between">
                    <span className="text-[#877769]">Guest Name:</span>
                    <span className="font-semibold text-[#2c241e]">{submittedRecord.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#877769]">Reserved Seats:</span>
                    <span className="font-semibold text-[#2c241e]">{submittedRecord.guestCount} {submittedRecord.guestCount > 1 ? 'Guests' : 'Guest'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#877769]">Date:</span>
                    <span className="font-semibold text-[#2c241e]">Saturday, October 24, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#877769]">Venue:</span>
                    <span className="font-semibold text-[#2c241e]">Grand Palm Gardens & Ballroom</span>
                  </div>
                </div>

                {/* Mock Barcode / Stamp */}
                <div className="mt-5 pt-3 border-t border-[#ebd8c5] flex items-center justify-between">
                  <div className="font-mono text-[10px] tracking-widest text-[#9c8978]">
                    PASS-{submittedRecord.id.toUpperCase().slice(-8)}
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#93714b]/15 text-[#856133]">
                    Confirmed
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 text-xs font-medium text-[#7d6957] border border-[#d6c7b7] rounded-lg hover:bg-[#faf5ee]"
              >
                Edit My Response
              </button>
            </div>
          </div>
        )}

        {/* Host / Organizer RSVP Dashboard Toggle */}
        <div className="mt-10 pt-6 border-t border-[#efe6db] flex items-center justify-between">
          <button
            onClick={() => setShowAdminList(!showAdminList)}
            className="text-xs text-[#9c8978] hover:text-[#4a3f35] flex items-center gap-1.5 cursor-pointer"
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>{showAdminList ? 'Hide Host Guestlist' : `Host Dashboard (${rsvps.length} RSVPs)`}</span>
          </button>

          {rsvps.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="text-xs text-[#93714b] font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export to Excel / CSV</span>
            </button>
          )}
        </div>

        {/* Host RSVP Summary List */}
        {showAdminList && (
          <div className="mt-4 p-4 rounded-2xl bg-[#faf6f0] border border-[#e8ded3] text-xs space-y-3">
            <div className="flex items-center justify-between font-semibold text-[#4a3f35] pb-2 border-b border-[#e4d8cb]">
              <span>Attendee List</span>
              <div className="flex gap-3">
                <span className="text-emerald-700">Attending: {rsvps.filter((r) => r.attendance === 'attending').length}</span>
                <span className="text-rose-700">Declined: {rsvps.filter((r) => r.attendance === 'declined').length}</span>
                <span className="text-amber-700">Total Seats: {rsvps.reduce((acc, r) => acc + (r.guestCount || 0), 0)}</span>
              </div>
            </div>

            {rsvps.length === 0 ? (
              <p className="text-center py-4 text-[#8a7a6c]">No guest responses recorded yet.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto divide-y divide-[#ebd8c5] pr-1">
                {rsvps.map((record) => (
                  <div key={record.id} className="py-2.5 flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-[#2c241e]">{record.guestName}</p>
                      <p className="text-[11px] text-[#786a5e]">{record.phoneOrEmail || 'No contact provided'} • Side: {record.guestSide}</p>
                      {record.dietaryNotes && (
                        <p className="text-[10px] text-amber-800 italic mt-0.5">Dietary: {record.dietaryNotes}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md font-medium text-[10px] ${
                          record.attendance === 'attending'
                            ? 'bg-emerald-100 text-emerald-800'
                            : record.attendance === 'declined'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {record.attendance === 'attending' ? `${record.guestCount} Guest(s)` : record.attendance}
                      </span>
                      <p className="text-[10px] text-[#a09081] mt-0.5">
                        {new Date(record.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
