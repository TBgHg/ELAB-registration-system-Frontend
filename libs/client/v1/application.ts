import type { LongTextForm, InterviewRoom } from "@/types/application";
import Client from "@/libs/client/v1/index";
import axios from "axios";

class ApplicationClient extends Client {
  getClient() {
    const client = super.getClient();
    client.defaults.baseURL =
      (client.defaults.baseURL as string) + "/application";
    return client;
  }

  async getStatus(): Promise<{
    long_text_form: boolean;
    room_selection: boolean;
  }> {
    const client = this.getClient();
    const { data } = await client.get(`/status`);
    return data;
  }

  async fetchLongTextForm(): Promise<LongTextForm> {
    const client = this.getClient();
    const { data } = await client.get(`/longTextForm`);
    return data;
  }

  async updateLongTextForm(
    longTextForm: Partial<LongTextForm>
  ): Promise<LongTextForm> {
    const client = this.getClient();
    const { data } = await client.patch(`/longTextForm`, longTextForm);
    return data;
  }

  async fetchCurrentRoomSelection(): Promise<{
    openid: string;
    room_id: string;
  } | null> {
    const client = this.getClient();
    try {
      const { data } = await client.get(`/current_room`);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        return null;
      }
      throw err;
    }
  }

  async fetchRooms(): Promise<InterviewRoom[]> {
    const client = this.getClient();
    const { data } = await client.get(`/room`);
    const rooms = data.rooms.map((room: any) => {
      return {
        ...room,
        time: new Date(room.time * 1000),
      };
    });
    return rooms;
  }

  async setRoom(roomId: string) {
    const client = this.getClient();
    const { data } = await client.post(`/room`, {
      room_id: roomId,
    });
    return data;
  }

  async deleteRoom() {
    const client = this.getClient();
    const { data } = await client.delete(`/room`);
    return data;
  }

  async getCountdown(): Promise<number> {
    const client = this.getClient();
    const { data } = await client.get(`/countdown`);
    return data.time;
  }
}

export default ApplicationClient;
