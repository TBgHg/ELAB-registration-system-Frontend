import type { Group, User } from "@/types/user";
import {
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 8,
  },
  input: {
    marginBottom: 16,
  },
});

interface FormProps {
  value: Omit<User, "openid" | "is_elab_member" | "meta" | "email">;
  setValue: React.Dispatch<
    React.SetStateAction<
      Omit<User, "openid" | "is_elab_member" | "meta" | "email">
    >
  >;
  loading: boolean;
}

const groups = ["电子组", "软件组"];

const Form = ({ value, setValue, loading }: FormProps) => {
  const [groupIndex, setGroupIndex] = React.useState(new IndexPath(0));
  const displayGroup = groups[groupIndex.row];
  React.useEffect(() => {
    setValue({ ...value, group: displayGroup as Group });
  }, [groupIndex]);
  return (
    <Layout style={styles.root}>
      <Input
        label="姓名"
        size="large"
        value={value.name}
        onChangeText={(text) => {
          setValue({ ...value, name: text });
        }}
        placeholder="请输入姓名"
        maxLength={12}
        style={styles.input}
        disabled={loading}
      />
      <Input
        label="学号"
        style={styles.input}
        maxLength={12}
        value={value.student_id}
        onChangeText={(text) => {
          setValue({ ...value, student_id: text });
        }}
        size="large"
        inputMode="numeric"
        placeholder="请输入学号"
        disabled={loading}
      />
      <Input
        label="班级"
        style={styles.input}
        maxLength={12}
        value={value.class_name}
        onChangeText={(text) => {
          setValue({ ...value, class_name: text });
        }}
        size="large"
        placeholder={`请输入班级，如"电2301"`}
        disabled={loading}
      />
      <Input
        label="联系方式"
        style={styles.input}
        maxLength={11}
        value={value.contact}
        onChangeText={(text) => {
          setValue({ ...value, contact: text });
        }}
        inputMode="tel"
        size="large"
        caption="支持中国大陆地区的手机号"
        placeholder="请输入手机号，会通过短信发送重要通知"
        disabled={loading}
      ></Input>
      <Select
        selectedIndex={groupIndex}
        onSelect={(index) => {
          setGroupIndex(index as IndexPath);
        }}
        value={value.group}
        label="组别"
        style={styles.input}
        size="large"
        disabled={loading}
      >
        <SelectItem title="电子组" />
        <SelectItem title="软件组" />
      </Select>
    </Layout>
  );
};

export default Form;
