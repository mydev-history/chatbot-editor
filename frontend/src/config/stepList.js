import Txt from "../components/stepList/txt";
import Btn from "../components/stepList/btn";
import Media from "../components/stepList/media";
import Replybtn from "../components/stepList/replybtn";
import Keyopt from "../components/stepList/keyopt";
import Optinout from "../components/stepList/optinout";

export default function StepList({ com }) {
  return (
    <>
      {com.key === "sendmsg" && <Txt com={com} />}
      {com.key === "askquestion" && <Txt com={com} />}
      {com.key === "askname" && <Txt com={com} />}
      {com.key === "asknumber" && <Txt com={com} />}
      {com.key === "askemail" && <Txt com={com} />}
      {com.key === "askdate" && <Txt com={com} />}
      {com.key === "askaddress" && <Txt com={com} />}
      {com.key === "askurl" && <Txt com={com} />}
      {com.key === "btn" && <Btn com={com} />}
      {com.key === "media" && <Media com={com} />}
      {com.key === "replybtn" && <Replybtn com={com} />}
      {com.key === "keyopt" && <Keyopt com={com} />}
      {com.key === "optinout" && <Optinout com={com} />}
    </>
  )
}