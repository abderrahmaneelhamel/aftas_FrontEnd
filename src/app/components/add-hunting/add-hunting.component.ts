import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Competition } from 'src/app/Interfaces/Competition';
import { Fish } from 'src/app/Interfaces/Fish';
import { Member } from 'src/app/Interfaces/Member';
import Swal from 'sweetalert2';
import { CompetitionService } from 'src/app/services/Competition/competition-service.service';
import { FishService } from 'src/app/services/Fish/fish-service.service';
import { MemberService } from 'src/app/services/Member/member-services.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private competitionService: CompetitionService,private memberService: MemberService,private fishService: FishService, private router: Router) {}


  ngOnInit(): void {
    this.huntingForm = this.fb.group({
      competitionId: this.fb.control(null),
      memberId: this.fb.control(null),
      fishId : this.fb.control(null),
    });
    this.getCompetitions();
    this.getMembers();
    this.getFishes();
  }

  onAddHunting(){
    const { competitionId, memberId, fishId } = this.huntingForm.value;
    this.competitionService.updatePointsForFishCaught({ memberId, competitionId, fishId}).subscribe()
    Swal.fire({
      title: 'Success!',
      text: 'hunting added successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    this.huntingForm.reset();
    this.router.navigate(['/Dashboard']);
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

  getCompetitions() {
    this.competitionService.getAllCompetitions().subscribe(
      (competition : any) => {
        this.competitions = competition.content;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getFishes() {
    this.fishService.getAllfishes().subscribe(
      (fish : any) => {
        this.fishes = fish;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
