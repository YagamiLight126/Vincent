/** @jsx jsx */
import * as React from "react";
import { jsx } from "@emotion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { textState, charCountState } from "./data";

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <React.Fragment>Character Count: {count}</React.Fragment>;
}

export default function Recoil() {
  return (
    <React.Fragment>
      <TextInput />
      <CharacterCount />
    </React.Fragment>
  );
}
