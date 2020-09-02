import React, { ChangeEvent } from 'react';
import { BsFileDiff } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import uploadImage from '../utils/upload-image';
import { Connected } from '../types';

type UploadState = {};
type UploadProps = {
  connected: Connected;
  onUploadDone: (obj: { file: File; key: string }) => void;
};

class Upload extends React.Component<UploadProps, UploadState> {
  async onChange(e: ChangeEvent<{ files: File[] }>) {
    const file = e.target.files[0];
    const { connected, onUploadDone } = this.props;

    const uploaded = await uploadImage(file, connected);
    if (onUploadDone) {
      onUploadDone({ file, ...uploaded });
    }
    // eslint-disable-next-line no-console
    console.log(`File uploaded.`, uploaded);
  }

  render() {
    let fileInputRef: HTMLInputElement;

    return (
      <>
        <input
          ref={(inp) => {
            fileInputRef = inp;
          }}
          style={{ display: 'none' }}
          type="file"
          accept="image/png"
          onChange={(evt) => this.onChange(evt as any)}
        />
        <Button variant="primary" onClick={() => fileInputRef.click()}>
          <BsFileDiff style={{ width: '30px', height: '30px' }} />
        </Button>
      </>
    );
  }
}

export default Upload;
