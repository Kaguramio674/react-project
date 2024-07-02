import request from "@/utils/request";

export async function imageupload(file: File) {
    const formData = new FormData();
    formData.append('image', file);
  
    const response = await request.post(`/api/recipes/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }