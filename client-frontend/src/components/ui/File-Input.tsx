import React from "react";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FileInput: React.FC<FileInputProps> = (props) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 dark:text-gray-200">Upload File</label>
      <input
        type="file"
        {...props}
        className="block w-full text-sm text-gray-500 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 dark:file:bg-orange-400 dark:file:text-gray-900 dark:hover:file:bg-orange-500"
      />
    </div>
  );
};

export default FileInput;
