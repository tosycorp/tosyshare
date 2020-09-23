import React, { ChangeEvent } from 'react';
import { BsFileDiff } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import uploadFile from '../utils/upload-file';
import { Connected } from '../types';

type UploadState = {
  progress: number;
};
type UploadProps = {
  onUploadDone: (obj: { file: File; key: string }) => void;
  connected: Connected;
  onUploadProgress: (progress: number) => void;
};

class Upload extends React.Component<UploadProps, UploadState> {
  constructor(props: UploadProps) {
    super(props);
    this.state = {
      progress: null,
    };
  }

  async onChange(e: ChangeEvent<{ files: File[] }>) {
    const file = e.target.files[0];
    const { connected, onUploadDone, onUploadProgress } = this.props;

    const uploaded = await uploadFile(file, connected, this.progressCallback);
    if (onUploadDone) {
      onUploadDone({ file, ...uploaded });
      this.setState({ progress: null });
      onUploadProgress(null);
    }
    // eslint-disable-next-line no-console
    console.log(`File uploaded.`, uploaded);
  }

  progressCallback = (progress: ProgressEvent) => {
    const progressQuantity = (progress.loaded / progress.total) * 100;
    this.setState({ progress: progressQuantity });
    const { onUploadProgress } = this.props;
    onUploadProgress(progressQuantity);
  };

  render() {
    let fileInputRef: HTMLInputElement;
    const { progress } = this.state;

    return (
      <>
        <input
          ref={(inp) => {
            fileInputRef = inp;
          }}
          style={{ display: 'none' }}
          type="file"
          onChange={(evt) => this.onChange(evt as any)}
        />
        <Button
          variant="primary"
          onClick={() => fileInputRef.click()}
          disabled={progress !== null}
        >
          <BsFileDiff style={{ width: '30px', height: '30px' }} />
        </Button>
      </>
    );
  }
}

export default Upload;
