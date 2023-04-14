import React from "react";
import { Layout, Select, SelectItem, IndexPath } from "@ui-kitten/components";

interface NameInputProps {
  value: string;
  onChangeText: (text: "电子组" | "软件组" | "助课组") => void;
  [key: string]: any | undefined;
}

const groups = ["电子组", "软件组", "助课组"];

const GroupInput = ({ value, onChangeText }: NameInputProps) => {
  const defaultIndex = 0;
  const [index, setIndex] = React.useState(new IndexPath(defaultIndex));
  React.useEffect(() => {
    const originalIndex = groups.findIndex((group) => group === value);
    setIndex(
      new IndexPath(originalIndex === -1 ? defaultIndex : originalIndex)
    );
    if (originalIndex === -1) {
      onChangeText(groups[defaultIndex] as "电子组" | "软件组" | "助课组");
    }
  }, []);
  return (
    <Layout
      style={{
        marginVertical: 8,
      }}
    >
      <Select
        value={value}
        label="申报组别"
        size="large"
        selectedIndex={index}
        onSelect={(targetIndex: IndexPath) => {
          setIndex(targetIndex);
          onChangeText(
            groups[targetIndex.row] as "电子组" | "软件组" | "助课组"
          );
        }}
      >
        {groups.map((faculty, index) => (
          <SelectItem key={index} title={faculty} />
        ))}
      </Select>
    </Layout>
  );
};

export default GroupInput;
