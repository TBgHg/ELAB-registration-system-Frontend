import { Input, Layout } from "@ui-kitten/components";
import React from "react";

interface InputBaseProps extends React.ComponentProps<typeof Input> {
  children?: any;
}

const InputBase = ({ children, ...props }: InputBaseProps) => {
  return (
    <Layout
      style={{
        marginVertical: 8,
      }}
    >
      <Input
        size="large"
        textStyle={{
          // fontSize: 20,
          fontWeight: "bold",
        }}
        {...props}
      />
    </Layout>
  );
};

export default InputBase;
