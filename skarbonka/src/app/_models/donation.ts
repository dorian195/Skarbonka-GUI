import {User} from "./user";
import {Fundraising} from "./fundraising";

export class Donation {
  id: number;
  name: string;
  anonymous: boolean;
  user: User;
  fundraising: Fundraising;
  ammount: number;
  createdDate: Date;
}
