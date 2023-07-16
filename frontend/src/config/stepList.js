import Txt from "../components/stepList/txt";
import Btn from "../components/stepList/btn";
import Media from "../components/stepList/media";


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
    </>
  )
}