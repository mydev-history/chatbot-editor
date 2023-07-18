import { FcBusinessman } from "react-icons/fc";

export default function Answer({ answer }) {
  return (
    <>
      <div className="flex flex-row justify-end items-end">
        <div
          className=" ml-2 py-3 px-4 bg-pink-600 rounded-bl-3xl break-words rounded-tr-3xl rounded-tl-xl text-white font-semibold max-w-full mb-3"
        >
          {answer}
        </div>
        <div className="text-3xl">
          <FcBusinessman />
        </div>
      </div >
    </>
  )
}