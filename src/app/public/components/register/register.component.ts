import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.passwordMatchValidator] });
  }

  register() {
    this.authService.register(this.registerForm.value)
      .subscribe(
        () => {
          this.alertService.success('Register successfully');
          this.authService.login(this.registerForm.value)
            .subscribe(() => {
              this.router.navigate(['/']);
            });
        },
        error => this.alertService.error('Register failed')
      );
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { 'passwordMatch': true };
  }

  controlHasError(controlName: string, errorName?: string): boolean {
    if (!errorName) {
      return this.registerForm.get(controlName).touched
        && !!this.registerForm.get(controlName).errors;
    }

    return this.registerForm.get(controlName).touched
      && this.registerForm.get(controlName).hasError(errorName);
  }

}
