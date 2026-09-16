import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, ExternalLink, Calendar, Clock, Sparkles } from 'lucide-react';
import { WeddingEvent } from '../types';

interface WeddingMapProps {
  events: WeddingEvent[];
  selectedEventId?: string;
  onSelectEvent?: (eventId: string) => void;
}

// Elegant custom map styles to match wedding aesthetics (soft warm cream / silver / muted roads)
const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#f7f4ef' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#685e52' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9b7d56' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8c7d6b' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e5ecdf' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b8265' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#ebdcd0' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#f3e6d8' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#dfcebd' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#dbe7ec' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6f8f9e' }]
  }
];

export const WeddingMap: React.FC<WeddingMapProps> = ({
  events,
  selectedEventId = events[0]?.id,
  onSelectEvent
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [activeTab, setActiveTab] = useState<string>(selectedEventId);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const activeEvent = events.find((e) => e.id === activeTab) || events[0];

  useEffect(() => {
    setActiveTab(selectedEventId);
  }, [selectedEventId]);

  // Load Google Maps script if not already present
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDdeFjdALnD1ztPLtriEOmjdd5-QIoa7tE';

    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      existingScript.addEventListener('load', () => setMapLoaded(true));
      existingScript.addEventListener('error', () => setLoadError('Unable to load Google Maps'));
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    script.onerror = () => {
      setLoadError('Google Maps failed to load. Please verify your connection or API key.');
    };
    document.head.appendChild(script);
  }, []);

  // Initialize and render Map & Markers
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || !window.google?.maps) return;

    try {
      const centerPos = activeEvent
        ? { lat: activeEvent.coordinates.lat, lng: activeEvent.coordinates.lng }
        : { lat: 30.0444, lng: 31.2357 };

      if (!mapInstanceRef.current) {
        const map = new google.maps.Map(mapContainerRef.current, {
          center: centerPos,
          zoom: 15,
          styles: MAP_STYLES,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true
        });
        mapInstanceRef.current = map;
        infoWindowRef.current = new google.maps.InfoWindow();
      } else {
        mapInstanceRef.current.panTo(centerPos);
      }

      // Clear existing markers
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];

      // Add markers for all events
      events.forEach((ev) => {
        const isCurrent = ev.id === activeTab;
        const marker = new google.maps.Marker({
          position: { lat: ev.coordinates.lat, lng: ev.coordinates.lng },
          map: mapInstanceRef.current,
          title: ev.title,
          animation: isCurrent ? google.maps.Animation.DROP : undefined,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: isCurrent ? '#C5A880' : '#8A7968',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3,
            scale: isCurrent ? 12 : 9
          }
        });

        marker.addListener('click', () => {
          setActiveTab(ev.id);
          if (onSelectEvent) onSelectEvent(ev.id);

          const contentString = `
            <div style="font-family: 'Montserrat', sans-serif; padding: 10px; max-width: 250px; color: #2c2725;">
              <h4 style="font-weight: 600; font-size: 14px; margin: 0 0 4px 0; color: #93714b;">${ev.title}</h4>
              <p style="font-size: 12px; margin: 0 0 6px 0; font-weight: 500;">${ev.venueName}</p>
              <p style="font-size: 11px; color: #666; margin: 0 0 10px 0;">${ev.address}</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${ev.coordinates.lat},${ev.coordinates.lng}" target="_blank" rel="noopener noreferrer" 
                style="display: inline-block; background-color: #C5A880; color: #ffffff; padding: 6px 12px; font-size: 11px; font-weight: 600; border-radius: 4px; text-decoration: none;">
                Get Directions
              </a>
            </div>
          `;

          if (infoWindowRef.current && mapInstanceRef.current) {
            infoWindowRef.current.setContent(contentString);
            infoWindowRef.current.open(mapInstanceRef.current, marker);
          }
        });

        markersRef.current.push(marker);
      });
    } catch (err) {
      console.error('Error initializing map:', err);
    }
  }, [mapLoaded, events, activeTab]);

  // Center on active event when changed
  useEffect(() => {
    if (mapInstanceRef.current && activeEvent) {
      mapInstanceRef.current.panTo({
        lat: activeEvent.coordinates.lat,
        lng: activeEvent.coordinates.lng
      });
      mapInstanceRef.current.setZoom(16);
    }
  }, [activeTab, activeEvent]);

  const handleDirectionsClick = () => {
    if (!activeEvent) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${activeEvent.coordinates.lat},${activeEvent.coordinates.lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenGoogleMaps = () => {
    if (!activeEvent) return;
    const query = encodeURIComponent(`${activeEvent.venueName}, ${activeEvent.address}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#fcfaf7] border border-[#e8dfd5] rounded-2xl overflow-hidden shadow-sm">
      {/* Venue Switcher Tabs */}
      <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-xs border-b border-[#e8dfd5] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#d4af37]/15 flex items-center justify-center text-[#93714b]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-[#302823]">
              Location & Directions
            </h3>
            <p className="text-xs text-[#7d7065]">Interactive Google Maps Venue Guide</p>
          </div>
        </div>

        {/* Tab Buttons for Multiple Events */}
        <div className="flex items-center gap-2 bg-[#f4eee6] p-1 rounded-xl">
          {events.map((ev) => (
            <button
              key={ev.id}
              id={`tab-map-${ev.id}`}
              onClick={() => {
                setActiveTab(ev.id);
                if (onSelectEvent) onSelectEvent(ev.id);
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === ev.id
                  ? 'bg-white text-[#2c241e] shadow-xs font-semibold'
                  : 'text-[#7d7065] hover:text-[#2c241e]'
              }`}
            >
              {ev.id === 'ceremony' ? 'Ceremony' : 'Reception'}
            </button>
          ))}
        </div>
      </div>

      {/* Map and Venue Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Google Map Display */}
        <div className="lg:col-span-7 h-[360px] sm:h-[420px] relative bg-[#f5f1eb]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Loading or Error Overlay */}
          {!mapLoaded && !loadError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f7f4ef]/90 z-10 p-6 text-center">
              <div className="w-10 h-10 border-3 border-[#d4af37]/30 border-t-[#93714b] rounded-full animate-spin mb-3" />
              <p className="text-sm font-medium text-[#6b5c4d]">Loading Google Maps...</p>
              <p className="text-xs text-[#9d8d7e] mt-1">Preparing high-resolution venue coordinates</p>
            </div>
          )}

          {loadError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fdfaf7] p-6 text-center z-10">
              <MapPin className="w-10 h-10 text-[#c29658] mb-2 animate-bounce" />
              <p className="text-sm font-medium text-[#46382c]">{loadError}</p>
              <button
                onClick={handleDirectionsClick}
                className="mt-3 px-4 py-2 bg-[#93714b] text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-[#7d5f3d]"
              >
                Open directly in Google Maps
              </button>
            </div>
          )}

          {/* Quick Floating Pill on Map */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs border border-[#e8dfd5] flex items-center gap-1.5 text-xs text-[#524438]">
            <Sparkles className="w-3.5 h-3.5 text-[#b88e4f]" />
            <span>Venue: <strong>{activeEvent.venueName}</strong></span>
          </div>
        </div>

        {/* Venue Information Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#fffefd]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#b88e4f]/10 text-[#8f6d3a]">
              {activeEvent.title}
            </div>

            <div>
              <h4 className="font-display text-xl sm:text-2xl text-[#2c241e] font-semibold mb-1">
                {activeEvent.venueName}
              </h4>
              <p className="text-sm text-[#7d7065] flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#b88e4f] shrink-0 mt-0.5" />
                <span>{activeEvent.address}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#faf6f0] p-3 rounded-xl border border-[#efe6db]">
                <div className="flex items-center gap-1.5 text-xs text-[#8f745a] font-medium mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#b88e4f]" />
                  <span>Date</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#2c241e]">
                  {activeEvent.date.split(',')[1]?.trim() || activeEvent.date}
                </p>
              </div>

              <div className="bg-[#faf6f0] p-3 rounded-xl border border-[#efe6db]">
                <div className="flex items-center gap-1.5 text-xs text-[#8f745a] font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#b88e4f]" />
                  <span>Time</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#2c241e]">
                  {activeEvent.time}
                </p>
              </div>
            </div>

            {/* Parking & Arrival Tips */}
            <div className="bg-[#fcfaf7] border border-[#e8dfd5] p-3.5 rounded-xl text-xs text-[#6e6054] space-y-1">
              <p className="font-semibold text-[#3b3027] flex items-center gap-1">
                <span>🚗 Guest Parking & Valet</span>
              </p>
              <p className="leading-relaxed">
                Complimentary guest valet parking is available right at the main entrance. For limousine and ride-share drop-offs, follow the Royal Gate circle.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-2.5">
            <button
              id="btn-get-directions"
              onClick={handleDirectionsClick}
              className="w-full py-3 px-4 bg-[#93714b] hover:bg-[#7e5f3c] text-white font-medium text-sm rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Live Directions in Google Maps</span>
            </button>

            <button
              id="btn-open-in-google-maps"
              onClick={handleOpenGoogleMaps}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#fbf7f2] text-[#6b5847] border border-[#ded4c7] font-medium text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Full Google Maps Listing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
