export class FundraisingCreateRequest {
  name: string
  description: string
  moneyGoal: number
  endDate: string
  categoryId: number

  constructor(name: string, description: string, moneyGoal: number, endDate: string, categoryId: number) {
    this.name = name;
    this.description = description;
    this.moneyGoal = moneyGoal;
    this.endDate = endDate;
    this.categoryId = categoryId;
  }
}
