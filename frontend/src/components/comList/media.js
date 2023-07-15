import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
export default function Media() {
  const data = [
    {
      label: "HTML",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.`,
    },
    {
      label: "React",
      value: "react",
      desc: `Because it's about motivating the doers.`,
    },

    {
      label: "Vue",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes.`,
    },

  ];

  return (
    <Tabs id="custom-animation" value="html">
      <TabsHeader>
        <Tab key="html" value="html" className="p-1">
          <p className="text-sm font-semibold text-gray-800">
            UPLOAD FILE
          </p>
        </Tab>
        <Tab key="react" value="react" className="p-1">
          <p className="text-sm font-semibold text-gray-800">
            FROM URL
          </p>
        </Tab>
        <Tab key="vue" value="vue" className="p-1">
          <p className="text-sm font-semibold text-gray-800">
            VIDEO EMBED
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
        <TabPanel key="html" value="html">
          kjlk
        </TabPanel>
        <TabPanel key="react" value="react">
        </TabPanel>
        <TabPanel key="vue" value="vue">
          <img src='http://localhost:5000/b.png' />
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
