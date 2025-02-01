import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const FileUploader = () => {
    const [fileUrl, setfileUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-x1 cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {
        fileUrl ?(
            <div>test 1</div>
        ) : (
            <div className='file_uploader-box'>
                <img src="/assets/icon/file-upload.svg" width={96} height={77} alt="file-upload" />
            </div>
        )
      }
    </div>
  )
}

export default FileUploader
