import { supabase } from './supabaseClient';

/**
 * Upload a file to user-files/{userId}/{filename}
 */
export async function uploadUserFile(userId: string, file: File, onProgress?: (p: number) => void) {
  const path = `${userId}/${file.name}`;
  // If you want private files, keep bucket as private and use download() for secure access
  const { data, error } = await supabase.storage.from('user-files').upload(path, file, { upsert: true });
  if (error) throw error;
  return data;
}

/**
 * List files for a user
 */
export async function listUserFiles(userId: string) {
  const { data, error } = await supabase.storage.from('user-files').list(userId, { limit: 100, offset: 0 });
  if (error) throw error;
  return data;
}

/**
 * Get a public URL (if you want to expose, otherwise use download for private)
 */
export function getPublicUrl(path: string) {
  return supabase.storage.from('user-files').getPublicUrl(path).data?.publicUrl || null;
}

/**
 * Download a file (private)
 */
export async function downloadUserFile(path: string) {
  const { data, error } = await supabase.storage.from('user-files').download(path);
  if (error) throw error;
  return data;
}

/**
 * Remove a file (ensure path includes userId prefix)
 */
export async function deleteUserFile(path: string) {
  const { error } = await supabase.storage.from('user-files').remove([path]);
  if (error) throw error;
  return true;
}
