import React from "react";
import type { Input } from "@ui-kitten/components";
import InputBase from "./InputBase";

interface NameInputProps extends React.ComponentProps<typeof Input> {
  value: string;
  onChangeText: (text: string) => void;
  [key: string]: any | undefined;
}

const NameInput = (props: NameInputProps) => {
  const { value } = props;
  const [isInvalid, setIsInvalid] = React.useState(false);
  React.useEffect(() => {
    if (value.length === 0) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [value]);
  return (
    <InputBase
      label="你的姓名"
      maxLength={20}
      status={isInvalid ? "danger" : "basic"}
      {...props}
    />
  );
};

export default NameInput;
