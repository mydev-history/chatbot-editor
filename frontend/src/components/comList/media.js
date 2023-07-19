import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  IconButton
} from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import { FcSmartphoneTablet, FcMultipleSmartphones } from "react-icons/fc"

import { useComponent } from "../../store";
import { uploadImg } from "../../services/step.service";

export default function Media() {
  const [imgHover, setImgHover] = React.useState(false);
  const [url, setUrl] = React.useState('')
  const [load, setLoad] = React.useState(false);


  const sltCom = useComponent(state => state.sltCom);
  const handleSltCom = useComponent(state => state.handleSltCom);
  const selFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    // Use FileReader to read file contents
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = event.target.result;
      const blob = new Blob([fileContents], { type: file.type });

      // Check if blob is an image
      const image = new Image();
      image.onload = () => {
        const data = sltCom;
        const imgData = new FormData();
        imgData.append('img', file);
        uploadImg(imgData)
          .then(val => {
            data.elements[0].type = "upload";
            data.elements[0].content = val.filename;
            handleSltCom(data);
            setUrl('');
          })
        // Do something if the uploaded file is an image
      };
      image.onerror = () => {
        console.log('Uploaded file is not an image');
        // Do something if the uploaded file is not an image
      };
      image.src = URL.createObjectURL(blob);
    };
    reader.readAsArrayBuffer(file);
  }

  const checkImageExists = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = imageUrl;
    });
  };
  const checkUrl = () => {
    checkImageExists(url)
      .then(val => {
        const data = sltCom;
        data.elements[0].type = "url";
        data.elements[0].content = url;
        handleSltCom(data);
        setLoad(!load);
      })
      .catch(err => {
        console.log("image not existed")
      })
  }

  const changeMData = e => {
    setUrl(e.target.value)
  }

  const delImg = () => {
    const data = sltCom;
    data.elements[0].type = "";
    data.elements[0].content = "";
    handleSltCom(data);
    setUrl('')
    setLoad(!load);
  }
  return (
    <Tabs id="custom-animation" value="upload">
      <TabsHeader>
        <Tab key="upload" value="upload" className="p-1">
          <p className="text-sm font-semibold text-gray-800">
            UPLOAD FILE
          </p>
        </Tab>
        <Tab key="url" value="url" className="p-1">
          <p className="text-sm font-semibold text-gray-800">
            FROM URL
          </p>
        </Tab>
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 300 },
          mount: { y: 0 },
          unmount: { y: 300 },
        }}
      >
        <TabPanel key="upload" value="upload">
          <div className="flex items-center justify-center w-full" onMouseOver={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)}>
            {
              (sltCom.elements[0].type === "upload" && sltCom.elements[0].content) ?

                <div>
                  <button
                    onClick={delImg}
                    className={`${imgHover ? '' : 'hidden'} absolute bottom-8 right-8 bg-blue-gray-300 p-2 text-sm rounded-full text-black hover:bg-blue-gray-400 active:bg-blue-gray-600 z-10`}
                  >
                    <FaTrash />
                  </button>
                  <img
                    src={`http://localhost:5000/${sltCom.elements[0].content}`}
                    alt="uploaded image"
                    className=" z-0"
                  />
                </div> :

                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={selFile}
                    accept="image/*"
                  />
                </label>}
          </div>
        </TabPanel>
        <TabPanel key="url" value="url">
          <div className="flex items-center justify-center w-full" onMouseOver={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)}>
            {
              sltCom.elements[0].type === "url" ?
                <button>
                  <div
                    onClick={delImg}
                    className={`${imgHover ? '' : 'hidden'} absolute bottom-8 right-8 bg-blue-gray-300 p-2 text-sm rounded-full text-black hover:bg-blue-gray-400 active:bg-blue-gray-600 z-10`}
                  >
                    <FaTrash />
                  </div>
                  <div>
                    <img src={sltCom.elements[0].content} className="z-0" />
                  </div>
                </button> :
                <div className="flex flex-col items-center justify-center w-full">
                  <div className=" text-9xl">
                    <FcSmartphoneTablet />
                  </div>
                  <p className="text-2xl font-semibold text-gray-600">Enter a URL</p>
                  <div className="flex flex-row justify-center w-full mt-5 gap-2">
                    <Input
                      color="teal"
                      label="Enter URL"
                      value={url || ""}
                      onChange={changeMData}
                    />
                    <IconButton onClick={checkUrl}>
                      <FcMultipleSmartphones size={30} />
                    </IconButton>
                  </div>
                </div>
            }

          </div>

        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
