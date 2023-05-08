import React from "react";

import { Layout, Text, Icon } from "@ui-kitten/components";
import type { InterviewRoom } from "@/types/application";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 8,
    borderColor: "#cfcfcf",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    padding: 12,
  },
  checkMarkContainer: {
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderColor: "#efefef",
    borderWidth: 1,
    borderStyle: "solid",
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  capacityContainer: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    // flex: 1,
    marginVertical: 4,
  },
  text: {
    marginBottom: 4,
  },
  time: {
    marginTop: 4,
  },
});

interface RoomCardProps {
  room: InterviewRoom;
  selected: boolean;
  alreadySelected: boolean;
}

const RoomCard = ({ room, selected, alreadySelected }: RoomCardProps) => {
  const selectedStyle = StyleSheet.create({
    container: {
      borderColor: "#93db1e",
      borderWidth: 2,
      borderStyle: "solid",
    },
    checkMarkContainer: {
      backgroundColor: "#93db1e",
    },
  });
  return (
    <Layout
      style={[
        styles.container,
        selected ? selectedStyle.container : undefined,
        room.capacity - room.current_occupancy <= 0 || alreadySelected
          ? {
              backgroundColor: "#efefef",
            }
          : undefined,
      ]}
    >
      <Layout
        style={StyleSheet.compose(
          styles.checkMarkContainer,
          selected ? selectedStyle.checkMarkContainer : StyleSheet.create({})
        )}
      >
        <Icon name="checkmark-outline" fill={selected ? "white" : "#cfcfcf"} />
      </Layout>
      <Layout
        style={[
          styles.textContainer,
          room.capacity - room.current_occupancy <= 0 || alreadySelected
            ? {
                backgroundColor: "#efefef",
              }
            : undefined,
        ]}
      >
        <Text style={styles.title} category="h6">
          {room.name}
        </Text>
        <Text style={styles.time} category="p2">
          {room.time.toLocaleString("zh-CN", {
            timeZone: "Asia/Shanghai",
          })}
        </Text>
        <Text style={styles.text} category="p2">
          {room.location}
        </Text>
      </Layout>
      <Layout
        style={[
          styles.capacityContainer,
          room.capacity - room.current_occupancy <= 0 || alreadySelected
            ? {
                backgroundColor: "#efefef",
              }
            : undefined,
        ]}
      >
        <Text category="h5">
          {room.current_occupancy} / {room.capacity}
        </Text>
      </Layout>
    </Layout>
  );
};

export default RoomCard;
