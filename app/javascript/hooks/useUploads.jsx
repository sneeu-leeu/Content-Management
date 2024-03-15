import { useCallback } from 'react';

const useUploads = () => {
  const uploadFiles = useCallback(async (files, uploadableId) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const uploadPromises = files.map(file => {
      const formData = new FormData();
      formData.append('upload[title]', file.name);
      formData.append('upload[uploadable_type]', 'Folder');
      formData.append('upload[uploadable_id]', uploadableId);
      formData.append('upload[file]', file);

      return fetch(`/api/v1/folders/${uploadableId}/uploads`, {
        method: 'POST',
        headers: { 'X-CSRF-Token': csrfToken },
        credentials: 'include',
        body: formData,
      });
    });

    try {
      await Promise.all(uploadPromises);
      // TODO: Handle success (refresh list, close modal)
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }, []);

  return { uploadFiles };
};

export default useUploads;