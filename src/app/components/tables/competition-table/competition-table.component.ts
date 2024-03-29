import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CompetitionService } from 'src/app/services/Competition/competition-service.service';
import { Competition } from '../../../Interfaces/Competition';
import { MemberService } from 'src/app/services/Member/member-services.service';
import { Member } from 'src/app/Interfaces/Member';
import { Router } from '@angular/router';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-competition-table',
  templateUrl: './competition-table.component.html',
  styleUrls: ['./competition-table.component.css'],
})
export class CompetitionTableComponent implements OnInit {

  @Input() isMember: Boolean = false; 
  public competitionForm!: FormGroup;
  public competitionAddMemberForm!: FormGroup;
  public currentPage = 1;
  public itemsPerPage = 4;
  public totalMembers = 0;
  public members: Member[] = [];
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

  constructor(private fb: FormBuilder, private competitionService: CompetitionService,private memberService: MemberService, private router: Router) {}

  public competitions: Competition[] = [];

  newCompetition: Competition = {
    code: '',
    date: new Date(),
    startTime: "",
    endTime: "",
    numberOfParticipants: 0,
    memberIds: [],
    location: '',
  };

  ngOnInit(): void {
    this.initializeForms();
    this.getCompetitions();
    this.getMembers();
  }

  private initializeForms() {
    this.competitionForm = this.initializeForm();
    this.competitionAddMemberForm = this.fb.group({
      competitionId: this.fb.control(null),
      memberId: this.fb.control(null),
      });
  }

  populateAddMemberForm(competition : Competition){
    this.competitionAddMemberForm.patchValue({
      competitionId: competition.id,
    });
  }

  private initializeForm(): FormGroup {
    return this.fb.group({
      id: this.fb.control(null),
      code: this.fb.control('', [Validators.required]),
      date: this.fb.control('', [Validators.required]),
      startTime: this.fb.control({ hours: 0, minutes: 0 }, [Validators.required]),
      endTime: this.fb.control({ hours: 0, minutes: 0 }, [Validators.required]),
      numberOfParticipants: this.fb.control(0, [Validators.required]),
      memberIds: this.fb.control([]),
      location: this.fb.control('', [Validators.required]),
    });
  }
  
  onAddMember(){
    const { competitionId, memberId } = this.competitionAddMemberForm.value;
    this.competitionService.registerMemberInCompetition({ memberId, competitionId }).subscribe(
      (competition) => {
        Swal.fire({
          title: 'Success!',
          text: 'Member added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    )
    this.popupComponent.Toggle();
    this.competitionAddMemberForm.reset();
    this.router.navigate(['/Dashboard']);
  }

  onSubmit() {
    const {
      code,
      date,
      startTime,
      endTime,
      numberOfParticipants,
      location,
    } = this.competitionForm.value;
  
    // Ensure startTime and endTime are defined
    if (!startTime || !endTime) {
      console.error('Start time or end time is undefined.');
      return;
    }
  
    // Format start and end time to HH:mm:ss
    const formattedStartTime = this.formatTime(startTime);
    const formattedEndTime = this.formatTime(endTime);
  
    this.newCompetition = {
      code,
      date,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      numberOfParticipants,
      memberIds: [],
      location,
    };
    console.log('====================================');
    console.log(this.newCompetition);
    console.log('====================================');
  
    this.competitionService.createCompetition(this.newCompetition).subscribe(
      (competition) => {
        this.competitions.push(competition);
        console.log(competition);
        this.competitionForm.reset();
  
        Swal.fire({
          title: 'Success!',
          text: 'Competition created successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        console.error('Error creating competition:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create competition. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
    this.router.navigate(['/Dashboard']);
  }
  
  // Helper function to format time to HH:mm:ss
formatTime(time: { hours?: number, minutes?: number } | string): string {
  if (typeof time === 'string') {
    return `${time}:00`;
  }

  // Ensure time object and its properties are defined
  if (!time || time.hours === undefined || time.minutes === undefined) {
    console.error('Invalid time object:', time);
    return '00:00:00';
  }

  const formattedHours = time.hours.toString().padStart(2, '0');
  const formattedMinutes = time.minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:00`;
}

  
  

  getCompetitions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.competitionService.getAllCompetitions().subscribe(
      (competitions : any) => {
        this.competitions = competitions.slice(startIndex, endIndex);
        this.totalMembers = competitions.lenght;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getCompetitions();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCompetitions();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalMembers / this.itemsPerPage);
  }

  getMembers() {
    this.memberService.getAllMembers().subscribe(
      (members : any) => {
        this.members = members.content;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteCompetition(id: number) {
    this.competitionService.deleteCompetition(id).subscribe(
      (data) => {
        console.log('Competition deleted:', data);
        this.getCompetitions();
      },
      (error) => {
        console.error('Error deleting competition:', error);
      }
    );
  }

  deleteCompetitionConfirmation(id?: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCompetition(id);
          console.log('Deleting competition...');
          Swal.fire('Deleted!', 'Your competition has been deleted.', 'success');
        } else {
          console.log('Delete canceled by the user.');
        }
      });
      this.router.navigate(['/Dashboard']);
    } else {
      console.error('Cannot delete competition without a valid ID.');
    }
  }
  
}
