export class ConceptList {
  id: number;
  name: string;
  paymentGroupId: number;
  payConcept: number;
  calculateBy: number;
  compression: boolean;
  equalization: boolean;
  ignoreActivationOrder: boolean;
  active: boolean;
  paymentGroup: {
    id: number;
    name: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };

  constructor() {
    this.id = 0;
    this.name = '';
    this.paymentGroupId = 0;
    this.payConcept = 0;
    this.calculateBy = 0;
    this.compression = false;
    this.equalization = false;
    this.ignoreActivationOrder = false;
    this.active = false;
  }
}
