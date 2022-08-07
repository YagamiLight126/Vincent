import React from "react";
import { Alert } from "antd";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { textState, charCountState } from "./helloData";

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

  return <>Character Count: {count}</>;
}

export default function Hello() {
  return (
    <>
      <TextInput />
      <CharacterCount />
    </>
  );
}
