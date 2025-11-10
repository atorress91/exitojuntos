export class ProductConfiguration {
  activate_public_shop: boolean;
  activate_shipping_system: boolean;
  activate_passive_payments_module: boolean;
  currency_symbol: string;
  symbol_commissionable_value: string;
  symbol_points_qualify: string;
  binary_points_symbol: string;
  new_product_label: number;

  constructor() {
    this.activate_public_shop = false;
    this.activate_shipping_system = false;
    this.activate_passive_payments_module = false;
    this.currency_symbol = '';
    this.symbol_commissionable_value = '';
    this.symbol_points_qualify = '';
    this.binary_points_symbol = '';
    this.new_product_label = 0;
  }
}
