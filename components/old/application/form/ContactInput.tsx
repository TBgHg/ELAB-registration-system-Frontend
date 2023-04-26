import React from "react";

import { Text, useStyleSheet } from "@ui-kitten/components";
import InputBase from "./InputBase";
import prebuiltStyles from "./prebuiltStyles";

interface StudentIdInputProps {
  value: string;
  onChangeText: (text: string) => void;
  [key: string]: any | undefined;
}

const ContactInput = (props: StudentIdInputProps) => {
  const [length, setLength] = React.useState(0);
  const { value } = props;
  const styles = useStyleSheet(prebuiltStyles);
  const [isInvalid, setIsInvalid] = React.useState(false);
  React.useEffect(() => {
    setLength(value.length);

    if (value.length === 11) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  }, [value]);
  return (
    <InputBase
      label="手机号码"
      maxLength={11}
      inputMode="tel"
      status={isInvalid ? "danger" : "basic"}
      accessoryRight={() => (
        <Text style={styles.accessoryRightText}>{length}/11</Text>
      )}
      {...props}
    />
  );
};

export default ContactInput;
