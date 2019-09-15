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
  disabled: boolean = true;
  nameTeam: string;
  team: any[] = [];
  planning: any[] = [];
  namePlanning: string;
  id_planning: any;
  currentTeam = JSON.parse(localStorage.getItem('t'));
  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute,
    private _service: TeamService,
    private _servicePla: PlanningService
  ) {}
  planForm = new FormGroup({
    planning: new FormControl("", [Validators.required]),
    dataInit: new FormControl("", [Validators.required]),
    dataFinish: new FormControl("", [Validators.required]),
    objColectiu: new FormControl(""),
    objIndividual: new FormControl("")
  });
  ngOnInit() {
    this.showTeam();
    this.showPlanning();
  }
  showTeam() {
    this._service.getTeam().subscribe(data => {
      const team = [...data];
      this.team = team;
      let te = team.filter((t: any) => {
        if (t.id === this.currentTeam.id) {
          return t;
        }
      });
      this.nameTeam = te[0].team;
    });
  }
  showPlanning(){
    this._servicePla.getPLanning()
    .subscribe(data => {
      let planning = [...data];
      for (const team of this.team) {
        for (const plan of planning) {
          if(team.id_planning === plan.id && team.id === this.currentTeam.id){
            this.namePlanning = plan.planning;
            this.id_planning = plan.id;
            console.log(plan.planning);
          }
        }
      }
      // console.log(data)
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
      // this.toast("planificació creada correctament");
      // this.router.navigate(["/macro"]);
      setTimeout(() => {
        this._servicePla.getPLanning().subscribe();
      }, 1000);
    } else {
      this.toast("Tots el camps han de ser omplerts");
    }
  }
  onMacro(){
    let currentPlanning = {
      id: this.id_planning,
      name: this.namePlanning
    }
    localStorage.setItem('p', JSON.stringify(currentPlanning));
    this.router.navigate(['/macro']);
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
