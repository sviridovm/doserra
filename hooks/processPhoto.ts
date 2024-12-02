import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import runModel  from '@/hooks/runModel';
const processPhoto = async (base64: string) => {
  try {
    return 'viagra'

    await tf.ready();
    // Decode base64 image to Tensor
    const imageBuffer = tf.util.encodeString(base64, 'base64').buffer;
    const imageTensor = decodeJpeg(new Uint8Array(imageBuffer));

    // Resize the image to the input size of your CNN (e.g., 224x224 for many models)
    const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);

    // Normalize pixel values to [0, 1] or [-1, 1] depending on the model
    const normalizedImage = resizedImage.div(tf.scalar(255));

    // Expand dimensions to match CNN input shape (e.g., [1, 224, 224, 3])
    const batchedImage = normalizedImage.expandDims(0);

    // Pass the image to your CNN model
    return runModel(batchedImage);

  } catch (error) {
    console.error('Error processing image:', error);
  }
};

export default processPhoto;