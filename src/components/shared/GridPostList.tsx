// import { useCallback, useState } from "react";
// import { FileWithPath, useDropzone } from "react-dropzone";

// import { Button } from "@/components/ui";
// import { convertFileToUrl } from "@/lib/utils";

// type FileUploaderProps = {
//   fieldChange: (files: File[]) => void;
//   mediaUrl: string;
// };

// const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
//   const [file, setFile] = useState<File[]>([]);
//   const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

//   const onDrop = useCallback(
//     (acceptedFiles: FileWithPath[]) => {
//       // Update the file state and invoke the fieldChange callback
//       setFile(acceptedFiles);
//       fieldChange(acceptedFiles);
//       // Convert the file to a URL for previewing
//       setFileUrl(convertFileToUrl(acceptedFiles[0]));
//     },
//     [fieldChange]  // No need to include 'file' in dependencies since it's set directly
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpeg", ".jpg"],
//     },
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
//     >
//       <input {...getInputProps()} className="cursor-pointer" />

//       {fileUrl ? (
//         <>
//           <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
//             <img src={fileUrl} alt="Uploaded file" className="file_uploader-img" />
//           </div>
//           <p className="file_uploader-label">Click or drag photo to replace</p>
//         </>
//       ) : (
//         <div className="file_uploader-box">
//           <img
//             src="/assets/icons/file-upload.svg"
//             width={96}
//             height={77}
//             alt="file upload"
//           />

//           <h3 className="base-medium text-light-2 mb-2 mt-6">
//             Drag photo here
//           </h3>
//           <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

//           <Button type="button" className="shad-button_dark_4">
//             Select from computer
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploader;

import { useCallback, useState, useEffect } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Button } from "@/components/ui";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  // Clear state when component unmounts or file is replaced
  useEffect(() => {
    return () => {
      setFile([]);
      setFileUrl("");
    };
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Update file state and invoke fieldChange callback
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);

      // Convert the file to a URL for previewing
      const previewUrl = convertFileToUrl(acceptedFiles[0]);
      setFileUrl(previewUrl);
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="Uploaded file" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
