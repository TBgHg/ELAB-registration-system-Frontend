import type { LongTextForm, InterviewRoom } from "@/types/application";
import type { Client } from ".";

class ApplicationClient {
  rootClient: Client;
  constructor(rootClient: Client) {
    this.rootClient = rootClient;
  }

  getClient() {
    const client = this.rootClient.getClient();
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

  async fetchRooms(): Promise<InterviewRoom[]> {
    const client = this.getClient();
    const { data } = await client.get(`/rooms`);
    return Object.assign(data, {
      time: new Date(data.time),
    });
  }

  async setRoom(roomId: string) {
    const client = this.getClient();
    const { data } = await client.post(`/rooms`, {
      room_id: roomId,
    });
    return data;
  }

  async deleteRoom() {
    const client = this.getClient();
    const { data } = await client.delete(`/rooms`);
    return data;
  }
}

export default ApplicationClient;
