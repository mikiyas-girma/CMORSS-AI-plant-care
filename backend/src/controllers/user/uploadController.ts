import { Request, Response } from 'express';
import uploadImage from '../../utils/uploadImage.js';
import { ImageUploadBody } from '../../types/controllers/controllers.types.js';

export const uploadImageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      image,
      fileName = 'upload.jpg',
      username = 'user',
    } = req.body as ImageUploadBody;

    if (!image) {
      res.status(400).json({ message: 'No image data provided' });
      return;
    }

    // Call the utility function to upload the image
    const uploadResult = await uploadImage({
      image,
      name: fileName,
      folder: `${username}/journal/`,
    });

    console.log(uploadResult.imageUrl);
    res.status(200).json({
      message: 'Image uploaded successfully',
      fileUrl: uploadResult.imageUrl,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};
