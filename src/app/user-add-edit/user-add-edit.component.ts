import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  date;
  userform: FormGroup;
  emailPattern = '^[a-z0-9]+@gmail.com';

  roles:Array<Object> = []
  constructor(
    private router: Router,
    private commonService: CommonService
  ) {
    this.userform = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      role: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.strongpassword,
      ]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.userform.get('email');
  }

  ngOnInit() {
    this.getAllRole()

  }
  adduser() {
    console.log(this.userform.valid);

  }
  getAllRole(){
    this.commonService.getAllRole().subscribe(res=>{
      this.roles = res;
    })
  }

  strongpassword(password: AbstractControl): ValidationErrors | null {
    let isUpper = false;
    let isLower = false;
    let isSpecial = false;
    let isDigit = false;
    let passwordValue = password.value as string;

    if (passwordValue.length < 8) return null;

    for (let i = 0; i < passwordValue.length; i++) {
      if (passwordValue.charAt(i) >= 'A' && passwordValue.charAt(i) <= 'Z') {
        isUpper = true;
      } else if (
        passwordValue.charAt(i) >= 'a' &&
        passwordValue.charAt(i) <= 'z'
      ) {
        isLower = true;
      } else if (
        passwordValue.charAt(i) == '$' ||
        passwordValue.charAt(i) == '#' ||
        passwordValue.charAt(i) == '@'
      ) {
        isSpecial = true;
      } else if (
        passwordValue.charAt(i) >= '0' &&
        passwordValue.charAt(i) <= '9'
      ) {
        isDigit = true;
      }
    }

    if (isLower && isUpper && isSpecial && isDigit) return null;
    else return { strongPassword: true };
  }
}
