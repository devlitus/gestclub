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
  hidden: boolean = false;
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
    private _serviceTeam: TeamService,
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
    this.showForm()
  }
  showOnlyPlanning(id: any){
    this._servicePla.onlyPlanning(id).subscribe(data => {
      this.planning = data;
    })
  }
  showForm(){
    let id = this.currentTeam[0].id;
    this._serviceTeam.onlyTeam(id).subscribe(data => {
      let team = data;
      this.nameTeam = team.team;
      if (team.id_planning === null) {
        this.hidden = true;
      }else{
        this.showOnlyPlanning(team.id_planning);
        this.hidden = false;
      }
    })
  }
  onSubmit() {
    if (this.planForm.valid) {
      let planning = {
        planning: this.planForm.value.planning,
        data_init: this.planForm.value.dataInit,
        data_finish: this.planForm.value.dataFinish,
        id: this.currentTeam[0].id
      }
      this._servicePla.insertPlanning(planning).subscribe();
      
      this.hidden = false;
      this.toast("planificació creada correctament");
      // this.router.navigate(["/macro"]);
    } else {
      this.toast("Tots el camps han de ser omplerts");
    }
  }
  onMacro(id: any){
    this.router.navigate(['/macro', id]);
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
