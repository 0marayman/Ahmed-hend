// Utility to store and load custom user wedding photos via IndexedDB and server upload

const DB_NAME = 'WeddingPhotosDB';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
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

export async function savePhoto(key: string, dataUrl: string, fileName?: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('Could not save to IndexedDB:', e);
  }

  // Also notify active components
  window.dispatchEvent(new CustomEvent('wedding_photos_updated', {
    detail: { key, dataUrl }
  }));

  // Also upload to server if filename provided
  if (fileName) {
    try {
      await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, base64Data: dataUrl })
      });
    } catch (e) {
      console.warn('Could not post to /api/upload-photo:', e);
    }
  }
}

export async function getPhoto(key: string, fallbackUrl: string): Promise<string> {
  try {
    const db = await openDB();
    const dataUrl = await new Promise<string | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    if (dataUrl) return dataUrl;
  } catch (e) {
    console.warn('Could not read from IndexedDB:', e);
  }
  return fallbackUrl;
}
