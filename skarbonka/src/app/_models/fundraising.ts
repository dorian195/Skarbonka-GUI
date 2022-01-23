import {User} from "./user";
import {Category} from "./category";

export class Fundraising {
  id: number;
  name: string;
  createdDate: Date;
  endDate: Date;
  description: string;
  accountBalance: number;
  modificationDate: Date;
  deleteDate: Date;
  user: User;
  category: Category;
  comment: string;
  moneyGoal: number;
  url: string;

  public constructor(
  ) {}
}
export const URL: string[] = ["http://2.bp.blogspot.com/-afbqtZkTcik/VhgBva798jI/AAAAAAAAPuA/wYfQXj_EqXQ/s1600/Bez%2Bnazwy-7.png",
"https://bedietcatering.pl/wp-content/uploads/2019/06/dieta-na-wakacjach-1-min.jpg",
  "https://ocdn.eu/pulscms-transforms/1/1x8k9kqTURBXy9mNTZmNDBjMDJiYWZiMDNlNDMwMjEzYzgxYTY0MTA3Ni5qcGVnkZMCzQNIAIKhMAGhMQE"
];
