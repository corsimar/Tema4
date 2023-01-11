import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  displayError: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, passwordValidator(), Validators.minLength(6)]],
      confirm: [null, [Validators.required, this.passwordConfirm()]],
      comment: [null, Validators.required]
    })
  }

  get username(): FormControl {
    return this.registerForm.get("username") as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }

  get password(): FormControl {
    if(this.registerForm != null) {
      return this.registerForm.get("password") as FormControl;
    }
    return null;
  }

  get confirm(): FormControl {
    return this.registerForm.get("confirm") as FormControl;
  }

  get comment(): FormControl {
    return this.registerForm.get("comment") as FormControl;
  }

  register(): void {
    if(this.registerForm.invalid) {
      return;
    }

    const payload = {
      username: this.username.value, email: this.email.value, password: this.password.value, confirm: this.confirm.value, comment: this.comment.value
    }

    this.authService.register(payload).subscribe({
      next: (response) => {
        window.localStorage["token"] = response.token;
      },
      error: (error) => {
        this.displayError = true;
      }
    })
  }

  validateConfirmPassword(): boolean {
    console.log(this.registerForm.get("password").value + " " + this.registerForm.get("confirm").value);
    return (this.registerForm.get("password").value === this.registerForm.get("confirm").value);
  }

  validateForm(): boolean {
    return (this.registerForm.get("username").valid && this.registerForm.get("email").valid && this.registerForm.get("password").valid && this.registerForm.get("confirm").valid
    && this.registerForm.get("comment").valid);
  }

  public passwordConfirm(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      let password;
      if(this.password != null) password = this.password.value;
      else password = "";
      const valid = (value === password);
  
      return !valid ? { confirm: false }: null;
    }
  }
}
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if(!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true }: null;
  }
}