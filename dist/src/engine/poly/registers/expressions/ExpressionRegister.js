import {BaseExpressionRegister} from "./_BaseRegister";
export class ExpressionRegister extends BaseExpressionRegister {
  get_method(name) {
    return super.getMethod(name);
  }
}