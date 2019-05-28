import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from "@angular/core";

enum WheelType {
  INTEGER = "integer",
  DECIMAL = "decimal"
}

enum WheelOperator {
  INCREASE,
  DECREASE
}

@Directive({
  selector: "[wheelOn]"
})
export class WheelDirective {
  @Input() wheelOn: string = WheelType.INTEGER;
  @Input() wheelDecimalPlaces: number = 2;
  @Input() wheelUpNumber: number = 1;
  @Input() wheelDownNumber: number = 1;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  private operators: any = {
    [WheelOperator.INCREASE]: (a: number, b: number): number =>
      this.handleParse(a) + this.handleParse(b),
    [WheelOperator.DECREASE]: (a: number, b: number): number =>
      this.handleParse(a) - this.handleParse(b)
  };

  @HostListener("mousewheel", ["$event"])
  onMouseWheel(event) {
    const nativeValue: number = this.handleParse(this.el.nativeElement.value);

    if (event.wheelDelta > 0) {
      this.el.nativeElement.value = this.handleOperation(
        nativeValue,
        WheelOperator.INCREASE
      );
    } else {
      this.el.nativeElement.value = this.handleOperation(
        nativeValue,
        WheelOperator.DECREASE
      );
    }
    //propagate ngModel changes
    this.ngModelChange.emit(this.el.nativeElement.value);
    return false;
  }

  handleOperation(value: number, operator: WheelOperator): number {
    return this.handleParse(
      this.operators[operator](value, this.getRangeNumber(operator))
    );
  }

  getRangeNumber(operator: WheelOperator): number {
    if (operator === WheelOperator.INCREASE) {
      return this.wheelUpNumber;
    } else if (operator === WheelOperator.DECREASE) {
      return this.wheelDownNumber;
    }
  }

  handleParse(value: any): number {
    if (this.wheelOn === WheelType.INTEGER) {
      return parseInt(value, 10);
    } else if (this.wheelOn === WheelType.DECIMAL) {
      return +parseFloat(value).toFixed(this.wheelDecimalPlaces);
    }
  }

  constructor(private el: ElementRef) {
    //el.nativeElement.value = this.handleParse(el.nativeElement.value);
    el.nativeElement.step = this.wheelUpNumber;
  }
}