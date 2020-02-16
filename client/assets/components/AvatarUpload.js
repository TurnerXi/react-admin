import React, { useState } from 'react';
import { Upload, Icon, Modal, Layout, Avatar, notification } from 'antd';
import ReactCrop from 'react-image-crop';
import { base64ToBlob } from '@/utils';
import 'react-image-crop/dist/ReactCrop.css';
import '@/assets/css/comp/AvatarUpload.css';

const { Sider, Content } = Layout;
/** 可以进行裁剪的图片格式 */
const ImageTypeReg = /.(jpg|jpeg|png|gif)$/i;
const mockAction = 'https://www.mocky.io/v2/5185415ba171ea3a00704eed';

/**
 * @param {string} uploaderType circle|square 上传组件样式，圆形或方形
 * @param {string} action "https://www.mocky.io/v2/5185415ba171ea3a00704eed" 上传地址
 * @param {function} beforeUpload 上传前回调函数
 * @param {function} afterUpload 上传完成后回调函数
 */
export default function AvatarUpload({
  uploaderType = 'circle',
  action = mockAction,
  beforeUpload,
  afterUpload,
  ...restProps
}) {
  const initalCrop = {
    aspect: 1,
    unit: '%',
    width: 100,
  };
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resolveFunc, setResolveFunc] = useState(function() {});
  const [rejectFunc, setRejectFunc] = useState(function() {});
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState(initalCrop);
  const [preview, setPreview] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [file, setFile] = useState(null);

  const handleBeforeUpload = file => {
    if (!ImageTypeReg.test(file.name)) {
      notification.error({ message: '错误', description: '文件格式不支持' });
      console.error('文件格式不支持,受支持的文件格式为：jpg|jpeg|png|gif');
      return false;
    }
    setFile(file);
    return new Promise((resolve, reject) => {
      setResolveFunc(() => resolve);
      setRejectFunc(() => reject);
      const reader = new FileReader();
      reader.onload = e => {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCancel = e => {
    setSrc(null);
    setCrop(initalCrop);
    rejectFunc();
  };

  const handleOk = e => {
    // 上传时重建file
    const blob = base64ToBlob(preview);
    const { name, type, uid } = file;
    const newFile = new File([blob], name, { type, lastModified: Date.now() });
    newFile.uid = uid;
    newFile.thumbUrl = preview;

    if (beforeUpload) {
      beforeUpload(newFile);
    }
    resolveFunc(newFile);
    setLoading(true);
    handleCancel();
  };

  const handleChange = e => {
    if (e.file.status === 'done') {
      setLoading(false);
      setImageUrl(e.file.thumbUrl);
      if (afterUpload) {
        afterUpload(e);
      }
    }
  };

  /* 裁剪头像 begin */
  const onCropLoaded = image => {
    // 图像加载完成后保存图像，预览时使用
    setImageRef(image);
    setCropPreview(image);
  };

  const onCropChange = newCrop => {
    const { x, y, width, height } = newCrop;
    // should not overflow
    if (x < 0 || y < 0 || (imageRef && (x > imageRef.width - width || y > imageRef.height - height))) {
      return false;
    }
    // should not to samll
    if (width < 20 || height < 20) {
      return false;
    }

    setCrop(newCrop);
  };
  const onCropComplete = (pixelCrop, b, c) => {
    if (!imageRef) {
      return;
    }
    setCropPreview(imageRef, pixelCrop);
  };

  const setCropPreview = (image, pixelCrop) => {
    const { x = 0, y = 0, width = image.width, height = image.height } = pixelCrop || {};
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, width, height);
    setPreview(canvas.toDataURL('image/jepg'));
  };
  /* 裁剪头像 end */

  const UploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        multiple={false}
        className={uploaderType === 'circle' ? 'c-avatar-upload__circle' : ''}
        action={action}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        {...restProps}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : UploadButton}
      </Upload>
      <Modal visible={!!src} title="裁剪照片" width={800} maskClosable={false} onCancel={handleCancel} onOk={handleOk}>
        <Layout>
          <Content className="c-avatar-upload__cropper">
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={onCropLoaded}
                onComplete={onCropComplete}
                onChange={onCropChange}
              />
            )}
          </Content>
          <Sider theme="light">
            <div className="preview">
              {preview && <Avatar size={80} className="avatarShadow" src={preview} />}
              {preview && <Avatar size={80} className="avatarShadow" src={preview} shape="square" />}
            </div>
          </Sider>
        </Layout>
      </Modal>
    </div>
  );
}
