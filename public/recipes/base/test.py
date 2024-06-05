import os
from PIL import Image

def resize_images_to_500x500(directory='.'):
    # 遍历根目录下的所有文件
    for filename in os.listdir(directory):
        # 检查文件是否是jpg图片
        if filename.lower().endswith('.jpg'):
            filepath = os.path.join(directory, filename)
            with Image.open(filepath) as img:
                # 调整图片大小为500x500像素
                resized_img = img.resize((500, 650))
                # 保存调整后的图片，覆盖原文件
                resized_img.save(filepath)
                print(f'Resized and saved {filename}')

if __name__ == '__main__':
    # 调用函数，调整根目录下的所有jpg图片
    resize_images_to_500x500()
