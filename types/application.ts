interface LongTextForm {
  reason: string;
  experience: string;
  selfEvaluation: string;
}

interface InterviewRoom {
  id: string;
  name: string;
  time: Date;
  capacity: number;
  currentOccupancy: number;
  place: string;
}

function createEmptyLongTextForm(): LongTextForm {
  return {
    reason: "",
    experience: "",
    selfEvaluation: "",
  };
}

function createEmptyInterviewRoom(): InterviewRoom {
  return {
    id: "",
    name: "",
    time: new Date(),
    capacity: 0,
    currentOccupancy: 0,
    place: "",
  };
}

export type { LongTextForm, InterviewRoom };
export { createEmptyInterviewRoom, createEmptyLongTextForm };
