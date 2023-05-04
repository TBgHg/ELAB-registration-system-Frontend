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
  location: string;
}

interface FormContentPageParam {
  preview?: boolean;
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
    location: "",
  };
}

export type { LongTextForm, InterviewRoom, FormContentPageParam };
export { createEmptyInterviewRoom, createEmptyLongTextForm };
