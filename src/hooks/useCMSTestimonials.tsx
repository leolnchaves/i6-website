
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  page_id: string;
  card_order: number;
  language: string;
  quote: string;
  author_name: string;
  author_title?: string;
  company_name?: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMSTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch testimonials for a specific page and language
  const fetchTestimonials = useCallback(async (pageId: string, language: string = 'en') => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cms_testimonials')
        .select('*')
        .eq('page_id', pageId)
        .eq('language', language)
        .eq('is_active', true)
        .order('card_order');

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: 'Erro ao carregar depoimentos',
        description: 'Não foi possível carregar os depoimentos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Create a new testimonial
  const createTestimonial = useCallback(async (pageId: string, language: string, testimonialData: Omit<Testimonial, 'id' | 'page_id' | 'language' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('cms_testimonials')
        .insert({
          page_id: pageId,
          language,
          ...testimonialData,
        })
        .select()
        .single();

      if (error) throw error;

      setTestimonials(prev => [...prev, data].sort((a, b) => a.card_order - b.card_order));
      
      toast({
        title: 'Depoimento criado',
        description: 'O depoimento foi criado com sucesso.',
      });

      return data;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      toast({
        title: 'Erro ao criar depoimento',
        description: 'Não foi possível criar o depoimento.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Update an existing testimonial
  const updateTestimonial = useCallback(async (testimonialId: string, updates: Partial<Testimonial>) => {
    try {
      const { data, error } = await supabase
        .from('cms_testimonials')
        .update(updates)
        .eq('id', testimonialId)
        .select()
        .single();

      if (error) throw error;

      setTestimonials(prev => 
        prev.map(testimonial => 
          testimonial.id === testimonialId ? { ...testimonial, ...data } : testimonial
        ).sort((a, b) => a.card_order - b.card_order)
      );

      toast({
        title: 'Depoimento atualizado',
        description: 'O depoimento foi atualizado com sucesso.',
      });

      return data;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({
        title: 'Erro ao atualizar depoimento',
        description: 'Não foi possível atualizar o depoimento.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Delete a testimonial (soft delete)
  const deleteTestimonial = useCallback(async (testimonialId: string) => {
    try {
      const { error } = await supabase
        .from('cms_testimonials')
        .update({ is_active: false })
        .eq('id', testimonialId);

      if (error) throw error;

      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== testimonialId));

      toast({
        title: 'Depoimento removido',
        description: 'O depoimento foi removido com sucesso.',
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'Erro ao remover depoimento',
        description: 'Não foi possível remover o depoimento.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [toast]);

  // Reorder testimonials
  const reorderTestimonials = useCallback(async (pageId: string, language: string, testimonialIds: string[]) => {
    try {
      const updates = testimonialIds.map((testimonialId, index) => ({
        id: testimonialId,
        card_order: index + 1,
      }));

      for (const update of updates) {
        await supabase
          .from('cms_testimonials')
          .update({ card_order: update.card_order })
          .eq('id', update.id);
      }

      // Refresh testimonials after reordering
      await fetchTestimonials(pageId, language);

      toast({
        title: 'Ordem atualizada',
        description: 'A ordem dos depoimentos foi atualizada com sucesso.',
      });
    } catch (error) {
      console.error('Error reordering testimonials:', error);
      toast({
        title: 'Erro ao reordenar',
        description: 'Não foi possível reordenar os depoimentos.',
        variant: 'destructive',
      });
      throw error;
    }
  }, [fetchTestimonials, toast]);

  return {
    testimonials,
    loading,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    reorderTestimonials,
  };
};
