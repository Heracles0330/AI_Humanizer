import { useState, useEffect } from 'react';
import { supabase, UserProfile, HumanizedText } from './supabase';
import { getCurrentUser } from './auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    const checkUser = async () => {
      setLoading(true);
      const { user: currentUser } = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data as UserProfile);
      }
      setLoading(false);
    }

    getProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: { message: 'Not authenticated' } };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
      return { error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  return { profile, loading, updateProfile };
}

export function useHumanizedTexts() {
  const { user } = useAuth();
  const [texts, setTexts] = useState<HumanizedText[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHumanizedTexts() {
      if (!user) {
        setTexts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('humanized_texts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching humanized texts:', error);
      } else {
        setTexts(data as HumanizedText[]);
      }
      setLoading(false);
    }

    getHumanizedTexts();
  }, [user]);

  const saveHumanizedText = async (
    originalText: string,
    humanizedText: string,
    title: string = 'Untitled'
  ) => {
    if (!user) return { error: { message: 'Not authenticated' } };

    try {
      const newText = {
        user_id: user.id,
        original_text: originalText,
        humanized_text: humanizedText,
        title,
        character_count: originalText.length,
      };

      const { data, error } = await supabase
        .from('humanized_texts')
        .insert([newText])
        .select();

      if (error) throw error;

      setTexts((prev) => [data[0] as HumanizedText, ...prev]);
      return { data: data[0], error: null };
    } catch (error) {
      console.error('Error saving humanized text:', error);
      return { data: null, error };
    }
  };

  const deleteHumanizedText = async (id: string) => {
    if (!user) return { error: { message: 'Not authenticated' } };

    try {
      const { error } = await supabase
        .from('humanized_texts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTexts((prev) => prev.filter((text) => text.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting humanized text:', error);
      return { error };
    }
  };

  return { texts, loading, saveHumanizedText, deleteHumanizedText };
}