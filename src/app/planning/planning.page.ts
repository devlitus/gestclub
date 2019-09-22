import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { TeamService } from "../api/team.service";
import { PlanningService } from '../api/planning.service';

@Component({
  selector: "app-planning",
  templateUrl: "./planning.page.html",
  styleUrls: ["./planning.page.scss"]
})
export class PlanningPage implements OnInit {
  planning: any[] = [];
  isplanning: boolean = false;
  currentTeam = JSON.parse(localStorage.getItem('t'));
  planForm = new FormGroup({
    planning: new FormControl("", [Validators.required]),
    dataInit: new FormControl("", [Validators.required]),
    dataFinish: new FormControl("", [Validators.required]),
    objColectiu: new FormControl(""),
    objIndividual: new FormControl("")
  });
  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute,
    private _servicePla: PlanningService,
    private _serviceTeam: TeamService
  ) { }
  ngOnInit() {
    // this.showPlanningTeam();
  }

  showPlanningTeam() {
    const team = JSON.parse(localStorage.getItem('t'));
    this._servicePla.planningTeam(team.id).subscribe(data => {
      Object.assign(this.planning, data);
    })
  }

  onSubmit() {
    if (this.planForm.valid) {
      let planning = {
        planning: this.planForm.value.planning,
        data_init: this.planForm.value.dataInit,
        data_finish: this.planForm.value.dataFinish,
        id: this.currentTeam.id
      }
      this._servicePla.insertPlanning(planning).subscribe();
      setTimeout(() => {
        
        this.showPlanningTeam();
      }, 1000);
      // this.toast("planificació creada correctament");
      // this.router.navigate(["/macro"]);
    } else {
      this.toast("Tots el camps han de ser omplerts");
    }
  }
  onMacro() {
    this.router.navigate(["/macro"]);
  }
  async toast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: "middle",
      duration: 1000
    });
    await toast.present();
  }
}
