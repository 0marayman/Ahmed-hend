// Utility to store and retrieve custom wedding audio with IndexedDB and server persistence

const DB_NAME = 'WeddingAudioDB';
const STORE_NAME = 'audio_store';
const DB_VERSION = 1;
const AUDIO_KEY = 'active_wedding_audio';
const TITLE_KEY = 'active_wedding_audio_title';

function openAudioDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioTrack(dataUrl: string, title?: string, fileName?: string): Promise<void> {
  try {
    const db = await openAudioDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(dataUrl, AUDIO_KEY);
      if (title) {
        store.put(title, TITLE_KEY);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('Could not save audio in IndexedDB:', e);
  }

  if (title) {
    try {
      localStorage.setItem('wedding_audio_track_title', title);
    } catch {}
  }

  // Notify AudioPlayer
  window.dispatchEvent(
    new CustomEvent('wedding_audio_updated', {
      detail: { url: dataUrl, title: title || 'زفة الزفاف الخاصة' }
    })
  );

  // Upload to server endpoint if possible
  if (dataUrl.startsWith('data:')) {
    try {
      await fetch('/api/upload-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: fileName || 'wedding_audio.mp3', base64Data: dataUrl })
      });
    } catch (e) {
      console.warn('Could not upload audio to server:', e);
    }
  }
}

export async function getAudioTrack(): Promise<{ url: string; title: string }> {
  const fallbackUrl = '/wedding_audio.mp3';
  const defaultTitle = 'زفة أفراح - طلي بالأبيض';

  try {
    const db = await openAudioDB();
    const result = await new Promise<{ url?: string; title?: string }>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const reqAudio = store.get(AUDIO_KEY);
      const reqTitle = store.get(TITLE_KEY);

      tx.oncomplete = () => {
        resolve({
          url: reqAudio.result,
          title: reqTitle.result
        });
      };
      tx.onerror = () => reject(tx.error);
    });

    if (result.url) {
      return {
        url: result.url,
        title: result.title || defaultTitle
      };
    }
  } catch (e) {
    console.warn('Could not load audio from IndexedDB:', e);
  }

  const storedTitle = typeof window !== 'undefined' ? localStorage.getItem('wedding_audio_track_title') : null;
  return {
    url: fallbackUrl,
    title: storedTitle || defaultTitle
  };
}
