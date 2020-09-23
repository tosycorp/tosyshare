import { Storage } from 'aws-amplify';
import { Connected } from '../types';

let fileCount = 0;

const uploadFile = async (
  file: File,
  connected: Connected,
  progressCallback: (progress: ProgressEvent) => void
) => {
  return new Promise<{ key: string }>((res, rej) => {
    const { connectionId, connectorId } = connected;
    const extension = file.name.split('.').pop();
    Storage.put(
      `${connectionId}/${connectorId}_${fileCount}.${extension}`,
      file,
      {
        // level: 'protected',
        contentType: file.type,
        ACL: 'public-read',
        progressCallback,
      }
    )
      .then((result) => {
        fileCount += 1;
        res(result as { key: string });
      })
      .catch(rej);
  });
};

export default uploadFile;
