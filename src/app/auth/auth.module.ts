import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzButtonModule,
    NzInputModule,
    NzTypographyModule,
    NzFormModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
