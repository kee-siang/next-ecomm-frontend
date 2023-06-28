import { PUBLIC_AWS_REGION, PUBLIC_AWS_BUCKET, PUBLIC_IDENTITY_POOL_ID } from '$env/static/public';


export async function uploadMedia(file, directory = "") {

  // setting up the necessary information for the SDK to interact with AWS services//
  /*This allows your application to securely authenticate and authorize requests to 
  these services using the provided AWS Cognito Identity Pool credentials.*/
  AWS.config.update({
    region: PUBLIC_AWS_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: PUBLIC_IDENTITY_POOL_ID
    })
  });

  const getFileExtension = (str) => str.slice(str.lastIndexOf("."));
  const directoryKey = directory ? directory + "/" : "";
  const fileName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const fileExtention = getFileExtension(file.name)
  const fullKey = directoryKey + fileName + fileExtention;

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: PUBLIC_AWS_BUCKET,
      Key: fullKey,
      Body: file,
    }
  });

  try {
      const res = await upload.promise();
    return [file.name, res.Location];
  } catch (err) {
    return alert(`There was an error uploading your photo: ${err}`);
  }
}