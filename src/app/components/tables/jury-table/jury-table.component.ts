import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { identityDocumentType } from 'src/app/Interfaces/identityDocumentType';
import { Router } from '@angular/router';
import { PopupComponent } from '../../popup/popup.component';
import { User } from 'src/app/Interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MemberService } from 'src/app/services/Member/member-services.service';


@Component({
  selector: 'app-jury-table',
  templateUrl: './jury-table.component.html',
  styleUrls: ['./jury-table.component.css']
})
export class JuryTableComponent implements OnInit {

  public juryForm!: FormGroup;
  public currentPage = 1;
  public itemsPerPage = 2;
  public totalJurys = 0;
  identityDocumentTypeEnum = identityDocumentType;
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;


  constructor(private fb: FormBuilder, private authService: AuthService,private memberService: MemberService, private router: Router) {}

  public jurys: User[] = [];

  ngOnInit(): void {
    this.initializeForm();
    this.getJurys();
  }

  private initializeForm() {
    this.juryForm = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    const juryForm = new FormData();
          juryForm.append('name', this.juryForm.get('name')!.value);
          juryForm.append('email', this.juryForm.get('email')!.value);
          juryForm.append('password', this.juryForm.get('password')!.value);
          juryForm.append('role', 'JURY');

    this.authService.register(juryForm).subscribe(
      (Jury) => {
        this.jurys.push(Jury);
        console.log(Jury);
        this.juryForm.reset();
        Swal.fire({
          title: 'Success!',
          text: 'Jury created successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.popupComponent.Toggle();
      },
      (error) => {
        console.error('Error creating Jury:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create Jury. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  getJurys() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    this.memberService.getAllJurys().subscribe(
      (Jurys: any) => {
        console.log('====================================');
        console.log(Jurys);
        console.log('====================================');
        this.jurys = Jurys.slice(startIndex, endIndex);
        this.totalJurys = Jurys.totalElements;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  generateJuryshipNumber() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    this.juryForm.patchValue({
      JuryshipNumber: 'M' + randomNumber,
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getJurys();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getJurys();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalJurys / this.itemsPerPage);
  }

}