import { Storage } from 'aws-amplify';
import { Connected } from '../types';

let imageCount = 0;

const uploadImage = async (file: File, connected: Connected) => {
  return new Promise<{ key: string }>((res, rej) => {
    const { connectionId, connectorId } = connected;
    Storage.put(`${connectionId}/${connectorId}_${imageCount}.png`, file, {
      // level: 'protected',
      contentType: 'image/png',
      ACL: 'public-read',
    })
      .then((result) => {
        imageCount += 1;
        res(result as { key: string });
      })
      .catch(rej);
  });
};

export default uploadImage;
