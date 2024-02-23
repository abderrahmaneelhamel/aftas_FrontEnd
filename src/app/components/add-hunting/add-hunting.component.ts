import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Competition } from 'src/app/Interfaces/Competition';
import { Fish } from 'src/app/Interfaces/Fish';
import { Member } from 'src/app/Interfaces/Member';
import Swal from 'sweetalert2';
import { CompetitionService } from 'src/app/services/Competition/competition-service.service';
import { FishService } from 'src/app/services/Fish/fish-service.service';
import { MemberService } from 'src/app/services/Member/member-services.service';
import { Router } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-add-hunting',
  templateUrl: './add-hunting.component.html',
  styleUrls: ['./add-hunting.component.css']
})
export class AddHuntingComponent implements OnInit {

  public huntingForm!: FormGroup;

  public competitions: Competition[] = [];

  public members: Member[] = [];

  public fishes: Fish[] = [];

  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

  constructor(private fb: FormBuilder, private competitionService: CompetitionService, private memberService: MemberService, private fishService: FishService, private router: Router) {}


  ngOnInit(): void {
    this.huntingForm = this.fb.group({
      competitionId: this.fb.control(null),
      memberId: this.fb.control(null),
      fishId: this.fb.control(null),
      weight: this.fb.control(null),
    });
    this.getCompetitions();
    this.getMembers();
    this.getFishes();
  }

  onAddHunting() {
    const { competitionId, memberId, fishId, weight } = this.huntingForm.value;
  
    this.fishService.checkFishWeight(fishId, weight).subscribe(
      (response: any) => {
        console.log('Response:', response);
  
        if (response.includes('Accepted')) {
  
          this.competitionService.updatePointsForFishCaught({ memberId, competitionId, fishId }).subscribe(
            () => {
              Swal.fire({
                title: 'Success!',
                text: 'Hunting added successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              this.huntingForm.reset();
              this.router.navigate(['/Dashboard']);
            },
            (updateError) => {
              console.error(updateError);
              Swal.fire({
                title: 'Success!',
                text: 'Hunting added successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              this.popupComponent.Toggle();
            }
          );
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Fish weight is below the average range. Please select another fish.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to check fish weight.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  
  

  getMembers() {
    this.memberService.getAllMembers().subscribe(
      (members: any) => {
        this.members = members.content;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCompetitions() {
    this.competitionService.getAllCompetitions().subscribe(
      (competition: any) => {
        this.competitions = competition;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getFishes() {
    this.fishService.getAllfishes().subscribe(
      (fish: any) => {
        this.fishes = fish;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
