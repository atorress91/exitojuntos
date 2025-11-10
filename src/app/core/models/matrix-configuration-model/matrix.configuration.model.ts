export class MatrixConfiguration {
  id: number;
  uni_level_matrix: boolean;
  force_matrix: boolean;
  binary_matrix: boolean;
  affiliates_front_num: number;
  software_millennium_front_num: number;

  constructor() {
    this.id = 0;
    this.uni_level_matrix = false;
    this.force_matrix = false;
    this.binary_matrix = false;
    this.affiliates_front_num = 0;
    this.software_millennium_front_num = 0;
  }
}
