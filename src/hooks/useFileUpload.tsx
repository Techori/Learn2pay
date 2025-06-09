
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File, bucket: string, path?: string) => {
    setUploading(true);
    
    try {
      const fileName = path || `${Date.now()}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      toast({
        title: "Success",
        description: "File uploaded successfully!"
      });

      return { url: publicUrl, path: fileName, error: null };
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message,
        variant: "destructive"
      });
      return { url: null, path: null, error };
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (bucket: string, path: string) => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "File deleted successfully!"
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Delete Error",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  return { uploadFile, deleteFile, uploading };
};
