import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { observer } from "mobx-react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderColor: "#cfcfcf",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    marginVertical: 8,
  },
  text: {
    marginVertical: 4,
  },
  countDown: {},
});

interface DeadLineCountdownProps {
  deadLine: Date;
}

const DeadLineCountdown = observer(({ deadLine }: DeadLineCountdownProps) => {
  const [date, setDate] = React.useState(new Date());
  const [hour, setHour] = React.useState(0);
  const [minute, setMinute] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  React.useEffect(() => {
    const diff = deadLine.getTime() - date.getTime();
    const hour = Math.floor(diff / 1000 / 60 / 60);
    const minute = Math.floor((diff / 1000 / 60) % 60);
    const second = Math.floor((diff / 1000) % 60);
    setHour(hour);
    setMinute(minute);
    setSecond(second);
  }, [date]);
  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>距离报名结束还有</Text>
      <Text style={[styles.text, styles.countDown]} category="h1">
        {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")}:
        {second.toString().padStart(2, "0")}
      </Text>
    </Layout>
  );
});

export default DeadLineCountdown;
