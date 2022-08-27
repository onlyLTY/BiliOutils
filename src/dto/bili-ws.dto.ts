export interface RedPackListDto {
  lot_id: number;
  total_num: number;
  winner_info: [number, string, number, number][];
  awards: Awards;
  version: number;
}

type Awards = Record<number, AwardType>;

interface AwardType {
  award_type: number;
  award_name: string;
  award_pic: string;
  award_big_pic: string;
  award_price: number;
}
