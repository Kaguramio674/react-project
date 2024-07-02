import { imageupload } from '@/api/upload';
import { useState } from 'react';


export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  
  const onSelectFile = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onUpload = async () => {
    if (selectedFile) {
      try {
        const response = await imageupload(selectedFile);
        console.log('Upload successful:', response.url);
        
        // 处理上传成功后的逻辑，例如显示成功消息或重置选择的文件
      } catch (error) {
        console.error('Upload failed:', error);
        // 处理上传失败的逻辑，例如显示错误消息
      }
    }
  };

  return (
    <>
      <input type="file" accept={validFileTypes.join(',')} onChange={onSelectFile} />
      <button onClick={onUpload}>Upload</button>
    </>
  );
}