interface LongTextForm {
  reason: string;
  experience: string;
  self_evaluation: string;
}

interface InterviewRoom {
  room_id: string;
  name: string;
  time: Date;
  capacity: number;
  current_occupancy: number;
  location: string;
}

interface FormContentPageParam {
  preview?: boolean;
}

function createEmptyLongTextForm(): LongTextForm {
  return {
    reason: "",
    experience: "",
    self_evaluation: "",
  };
}

function createEmptyInterviewRoom(): InterviewRoom {
  return {
    room_id: "",
    name: "",
    time: new Date(),
    capacity: 0,
    current_occupancy: 0,
    location: "",
  };
}

export type { LongTextForm, InterviewRoom, FormContentPageParam };
export { createEmptyInterviewRoom, createEmptyLongTextForm };
