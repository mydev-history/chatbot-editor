export const elements = {
  "sendmsg": [
    {
      type: "txt",
      header: "Message",
      content: "",
      isNext: true
    }
  ],
  "askquestion": [
    {
      type: "txt",
      header: "Question text",
      content: "Ask anything",
      isNext: true
    }
  ],
  "askname": [
    {
      type: "txt",
      header: "Question text",
      content: "What is your name?",
      isNext: true
    }
  ],
  "asknumber": [
    {
      type: "txt",
      header: "Question text",
      content: "Type a number, please",
      isNext: true
    }
  ],
  "askphone": [
    {
      type: "txt",
      header: "Question text",
      content: "What's your number?",
      isNext: true
    }
  ],
  "askemail": [
    {
      type: "txt",
      header: "Question text",
      content: "What's your email?",
      isNext: true
    }
  ],
  "askdate": [
    {
      type: "txt",
      header: "Question text",
      content: "Select a date, please",
      isNext: true
    }
  ],
  "askaddress": [
    {
      type: "txt",
      header: "Question text",
      content: "Type your address, please",
      isNext: true
    }
  ],
  "askurl": [
    {
      type: "txt",
      header: "Question text",
      content: "Type a Url",
      isNext: true
    }
  ],
  "btn": [
    {
      type: "button",
      content: "",
      placeholder: "Click to edit",
      isNext: true
    },
  ],
  "media": {
    type: "",
    content: "",
    isNext: true
  },
  "keyopt": [
    {
      type: "txt",
      content: "",
      placeholder: "Click to edit",
    },
    {
      type: "button",
      content: "",
      placeholder: "Click",
      isNext: true,
      keywords: [
        {
          type: "keyword",
          content: "sdf",
          placeholder: "Click keyword",
        }
      ]
    }
  ],
  "replybtn": [
    {
      type: "txt",
      content: "Hello",
      placeholder: "Click to edit",
    },
    {
      type: "buttons",
      buttons: [
        {
          type: "button",
          content: "",
          placeholder: "Click",
          isNext: true
        }
      ]
    }
  ],
  "optinout": [
    {
      type: "txt",
      content: "",
      placeholder: "",
    },
    {
      type: "buttons",
      buttons: [
        {
          type: "button",
          content: "Yes",
          placeholder: "Click",
          isNext: true
        },
        {
          type: "button",
          content: "No",
          placeholder: "Click",
          isNext: true
        }
      ]
    }
  ],

}