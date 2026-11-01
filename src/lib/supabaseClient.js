import { createClient } from '@supabase/supabase-js';

export const STORAGE_BUCKET = 'menu-images';

// Connect strictly using internal environment variables
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.REACT_APP_SUPABASE_URL ||
  '';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.REACT_APP_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-supabase-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Upload an image file to Supabase Storage bucket `menu-images`.
 */
export async function uploadImageToMenuBucket(file) {
  if (!file) throw new Error('No file provided');

  if (supabase) {
    const fileExt = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const safeName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .slice(0, 40);
    const filePath = `items/${Date.now()}-${safeName}.${fileExt}`;

    let { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    // If bucket was not created yet in client Supabase project, attempt creation and retry
    if (uploadError && uploadError.message?.toLowerCase().includes('not found')) {
      try {
        await supabase.storage.createBucket(STORAGE_BUCKET, { public: true });
        const retryResult = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
          });
        uploadError = retryResult.error;
      } catch (bucketErr) {
        console.warn('Auto-create bucket attempt:', bucketErr);
      }
    }

    if (!uploadError) {
      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        return {
          publicUrl: data.publicUrl,
          mode: 'supabase',
          path: filePath,
        };
      }
    } else {
      console.warn(
        `Supabase storage upload failed (${uploadError.message}). Falling back to compressed data URL.`
      );
    }
  }

  const dataUrl = await compressImageToDataUrl(file, 900, 0.82);
  return {
    publicUrl: dataUrl,
    mode: 'local-data-url',
  };
}

function compressImageToDataUrl(file, maxWidth = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
