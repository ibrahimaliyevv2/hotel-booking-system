import type { BoardType } from "./data";

export type BoardTypeCode = BoardType["code"];

export interface Booking {
  citizenship: string;
  startDate: string;
  days: number;
  destination: string;
  boardTypeCode: BoardTypeCode;
}

export interface DailySelection{
    dayIndex:number;
    hotelId?: number | null;
    lunchId?: number | null;
    dinnerId?: number | null;
}
