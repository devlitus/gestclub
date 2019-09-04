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
  planning: any[] = [];
  id_team: any;
  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute,
    private _service: TeamService,
    private _service_Pla: PlanningService
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
  }
  showTeam() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this._service.getTeam().subscribe(data => {
      const team = [...data];
      let te = team.filter((t: any) => {
        if (t.id === id) {
          return t;
        }
      });
      this.nameTeam = te[0].team;
    });
  }
  onSubmit() {
    this.id_team = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.planForm.valid) {
      let planning = {
        planning: this.planForm.value.planning,
        data_init: this.planForm.value.dataInit,
        data_finish: this.planForm.value.dataFinish,
        id: this.id_team
      }
      this._service_Pla.insertPlanning(planning).subscribe();
      // this.toast("planificació creada correctament");
      this.router.navigate(["/macro/", this.id_team]);
    } else {
      this.toast("Tots el camps han de ser omplerts");
    }
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
