import { Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, Pressable } from "react-native";
import type { Room } from "../../../lib/store/ApplicationStore";
import RoomCard from "./RoomCard";

const styles = StyleSheet.create({
  container: {},
});

interface RoomCardGroupProps {
  rooms: Room[];
  value: number | null;
  onChange: (value: number) => void;
}

const RoomCardGroup = ({ rooms, value, onChange }: RoomCardGroupProps) => {
  return (
    <Layout style={styles.container}>
      {rooms.map((room, index) => (
        <Pressable
          onPress={() => {
            onChange(index);
          }}
          disabled={room.capacity - room.currentOccupancy <= 0}
          key={index}
          style={{
            marginVertical: 8,
          }}
        >
          <RoomCard room={room} selected={index === value} />
        </Pressable>
      ))}
    </Layout>
  );
};

export default RoomCardGroup;
