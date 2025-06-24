import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  standalone: false,
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.css',
})
export class CheckoutForm {
  @Output() close = new EventEmitter<void>();
  @Output() finishOrder = new EventEmitter<void>();

  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  submit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    console.log('Order submitted:', this.checkoutForm.value);
    this.finishOrder.emit();
    this.close.emit();
  }

  cancel() {
    this.close.emit();
  }
}
