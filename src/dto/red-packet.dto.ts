export interface AugRedPacket2022Controller {
  code: number;
  message: string;
  data: {
    list: {
      lotId: string;
      ruid: string;
      roomId: string;
      runame: string;
      face: string;
      countDown: number;
    }[];
  };
  errors: Record<string, unknown>;
}
