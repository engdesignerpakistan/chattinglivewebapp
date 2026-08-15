import supabase from './config.js';

export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }

  return data;
}