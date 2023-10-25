import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_CONNECTION;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerName = process.env.AZURE_CONTAINER_NAME;

async function uploadImageToAzureStorage(fileBuffer, fileName, contentType) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    await blockBlobClient.uploadData(
      fileBuffer,
      {
        blobHTTPHeaders: { blobContentType: contentType },
      }
    );

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export { uploadImageToAzureStorage };
