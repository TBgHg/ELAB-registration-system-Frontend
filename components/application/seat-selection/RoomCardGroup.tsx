import { Layout } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, Pressable } from "react-native";
import type { InterviewRoom } from "@/types/application";
import RoomCard from "./RoomCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface RoomCardGroupProps {
  rooms: InterviewRoom[];
  value: number | null;
  onChange: (value: number) => void;
  alreadySelected: boolean;
}

const RoomCardGroup = ({
  rooms,
  value,
  onChange,
  alreadySelected,
}: RoomCardGroupProps) => {
  return (
    <Layout style={styles.container}>
      {rooms.map((room, index) => {
        const capacityFull = room.capacity - room.current_occupancy <= 0;
        return (
          <Pressable
            onPress={() => {
              onChange(index);
            }}
            disabled={capacityFull || alreadySelected}
            key={index}
            style={{
              marginVertical: 8,
            }}
          >
            <RoomCard
              room={room}
              selected={index === value}
              alreadySelected={alreadySelected}
            />
          </Pressable>
        );
      })}
    </Layout>
  );
};

export default RoomCardGroup;
