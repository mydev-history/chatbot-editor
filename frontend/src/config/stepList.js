import Txt from "../components/stepList/txt";
import Btn from "../components/stepList/btn";
import Media from "../components/stepList/media";
import Replybtn from "../components/stepList/replybtn";
import Keyopt from "../components/stepList/keyopt";
import Optinout from "../components/stepList/optinout";

export default function StepList({ com, btnRef }) {
  return (
    <>
      {com.key === "sendmsg" && <Txt com={com} btnRef={btnRef} />}
      {com.key === "askquestion" && <Txt com={com} btnRef={btnRef} />}
      {com.key === "askname" && <Txt com={com} btnRef={btnRef} />}
      {com.key === "asknumber" && <Txt com={com} btnRef={btnRef} />}
      {com.key === "askemail" && <Txt com={com} btnRef={btnRef} />}
      {com.key === "askdate" && <Txt com={com} btnRef={btnRef} />}
      {com.key === "askaddress" && <Txt com={com} btnRef={btnRef} />}
      {com.key === "askurl" && <Txt com={com} btnRef={btnRef} />}
      {com.key === "btn" && <Btn com={com} btnRef={btnRef} />}
      {com.key === "media" && <Media com={com} btnRef={btnRef} />}
      {com.key === "replybtn" && <Replybtn com={com} btnRef={btnRef} />}
      {com.key === "keyopt" && <Keyopt com={com} btnRef={btnRef} />}
      {com.key === "optinout" && <Optinout com={com} btnRef={btnRef} />}
    </>
  )
}