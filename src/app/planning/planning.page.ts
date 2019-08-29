import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { TeamService } from "../api/team.service";

@Component({
  selector: "app-planning",
  templateUrl: "./planning.page.html",
  styleUrls: ["./planning.page.scss"]
})
export class PlanningPage implements OnInit {
  disabled: boolean = true;
  nameTeam: string;
  planning: any[] = [];
  id: any;
  constructor(
    public router: Router,
    public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute,
    private _service: TeamService
  ) {}
  planForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    dataInit: new FormControl("", [Validators.required]),
    dataFinish: new FormControl("", [Validators.required]),
    objColectiu: new FormControl("", [Validators.required]),
    objIndividual: new FormControl("", [Validators.required])
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
      this.nameTeam = te[0].team_name;
    });
  }
  onSubmit(e: any) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.planForm.valid) {
      this.disabled = false;
      localStorage.setItem('p', this.planForm.value.name);
      this.planning.push({
        name: this.planForm.value.name
      })
      // this.toast("planificació creada correctament");
      this.router.navigate(["/macro/", this.id]);
    } else {
      this.toast("Tots el camps han de ser omplerts");
    }
    console.warn(this.planForm.valid);
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
