export const uploadToS3 = async (formData) => {
  try {
    const response = await fetch(`/api/v1/message/files`, {
      method: "POST",
      body: formData, 
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json(); 
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};
