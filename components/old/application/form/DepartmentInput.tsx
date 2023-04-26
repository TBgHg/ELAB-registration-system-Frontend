import React from "react";
import { Layout, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { dlutFaculties } from "../../../../constants/dlutFaculties";

interface NameInputProps {
  value: string;
  onChangeText: (text: string) => void;
  [key: string]: any | undefined;
}

const DepartmentInput = ({ value, onChangeText }: NameInputProps) => {
  const defaultIndex = 2;
  const [index, setIndex] = React.useState(new IndexPath(defaultIndex));
  React.useEffect(() => {
    const originalIndex = dlutFaculties.findIndex(
      (faculty) => faculty === value
    );
    setIndex(
      new IndexPath(originalIndex === -1 ? defaultIndex : originalIndex)
    );
    if (originalIndex === -1) {
      onChangeText(dlutFaculties[defaultIndex]);
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
        label="学部院系"
        size="large"
        selectedIndex={index}
        onSelect={(targetIndex: IndexPath) => {
          setIndex(targetIndex);
          onChangeText(dlutFaculties[targetIndex.row]);
        }}
      >
        {dlutFaculties.map((faculty, index) => (
          <SelectItem key={index} title={faculty} />
        ))}
      </Select>
    </Layout>
  );
};

export default DepartmentInput;
