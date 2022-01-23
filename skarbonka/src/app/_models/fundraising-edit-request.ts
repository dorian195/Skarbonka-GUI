export class FundraisingEditRequest {
  name: string
  description: string
  moneyGoal: number
  categoryId: number

  constructor(name: string, description: string, moneyGoal: number, categoryId: number) {
    this.name = name;
    this.description = description;
    this.moneyGoal = moneyGoal;
    this.categoryId = categoryId;
  }
}
